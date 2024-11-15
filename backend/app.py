from flask import Flask, jsonify, redirect, url_for, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_admin.base import AdminIndexView
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import os
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# Configure SQLite database
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'products.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-here'  # Change this to a secure secret key

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# User Model for Admin Login
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Product Model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.String(20), nullable=False)
    image_url = db.Column(db.String(500), nullable=False)
    features = db.Column(db.Text, nullable=False)  # Store as JSON string
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url,
            'features': eval(self.features),  # Convert string back to list
            'created_at': self.created_at.isoformat()
        }

# Secure ModelView that requires authentication
class SecureModelView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated

    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('login', next=request.url))

# Custom Admin Index View with authentication
class MyAdminIndexView(AdminIndexView):
    def is_accessible(self):
        return current_user.is_authenticated

    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('login', next=request.url))

# Initialize Flask-Admin
admin = Admin(app, name='CCTV Admin', template_mode='bootstrap3', index_view=MyAdminIndexView())
admin.add_view(SecureModelView(Product, db.session))

# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = User.query.filter_by(username=username).first()
        
        if user and user.check_password(password):
            login_user(user)
            next_page = request.args.get('next')
            return redirect(next_page or url_for('admin.index'))
        
        return 'Invalid username or password'

    return '''
        <form method="POST">
            <p>Username: <input type="text" name="username"></p>
            <p>Password: <input type="password" name="password"></p>
            <p><input type="submit" value="Login"></p>
        </form>
    '''

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

# Routes
@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@app.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict())

# Create initial data
def create_initial_data():
    with app.app_context():
        db.create_all()
        
        # Create admin user if it doesn't exist
        if not User.query.filter_by(username='admin').first():
            admin_user = User(username='admin')
            admin_user.set_password('admin123')  # Change this password!
            db.session.add(admin_user)
            db.session.commit()
        
        # Only create initial products if the table is empty
        if Product.query.count() == 0:
            initial_products = [
                Product(
                    title='Pro Dome Camera',
                    description='Professional grade dome camera with advanced features',
                    price='AED 299',
                    image_url='https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80',
                    features=str([
                        "4K Ultra HD",
                        "Night Vision",
                        "Motion Detection",
                        "Weather Resistant"
                    ])
                ),
                Product(
                    title='Bullet Camera System',
                    description='High-performance bullet camera system for outdoor surveillance',
                    price='AED 399',
                    image_url='https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80',
                    features=str([
                        "1080p HD",
                        "Wide Angle Lens",
                        "Two-Way Audio",
                        "Smart Alerts"
                    ])
                ),
                Product(
                    title='TEST Camera System',
                    description='High-performance bullet camera system for outdoor surveillance',
                    price='AED 599',
                    image_url='https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80',
                    features=str([
                        "1080p HD",
                        "Wide Angle Lens",
                        "Two-Way Audio",
                        "Smart Alerts"
                    ])
                ),
                Product(
                    title='PTZ Camera',
                    description='Pan-Tilt-Zoom camera with advanced tracking capabilities',
                    price='AED 499',
                    image_url='https://images.unsplash.com/photo-1615730263595-fd9ddad37a24?auto=format&fit=crop&q=80',
                    features=str([
                        "360° Coverage",
                        "30x Zoom",
                        "Auto Tracking",
                        "IP67 Rated"
                    ])
                )
            ]
            
            for product in initial_products:
                db.session.add(product)
            db.session.commit()

if __name__ == '__main__':
    create_initial_data()
    app.run(debug=True, port=5000)
