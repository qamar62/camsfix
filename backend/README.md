# CCTV Project Backend

This is the backend API for the CCTV project, built with Flask.

## Setup Instructions

1. Create a virtual environment (Windows):
```bash
python -m venv venv
venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python app.py
```

The server will start at `http://localhost:5000`

## API Endpoints

- GET `/api/products` - Get all products
- GET `/api/products/<id>` - Get a specific product by ID

## Database

The application uses SQLite database (`products.db`) which will be created automatically when you run the application for the first time. Initial product data will also be populated automatically.
