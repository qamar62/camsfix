import React from 'react';

import { Shield, Camera, Wrench, Phone, ChevronRight, Star, Sun, Moon } from 'lucide-react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import { useTheme } from './hooks/useTheme';
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image_url: string;
  features: string[];
  created_at: string;
}

function App() {
  const { isDark, toggleTheme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const webhookUrl = 'https://n8n.qamdm.xyz/webhook/42361a1a-c909-4ae3-a704-609c5d5e918b';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (response.ok) {
        console.log('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        console.error('Error sending message:', response.status);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/971562333263"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>

      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 p-2 rounded-full bg-blue-600 text-white z-50 hover:bg-blue-700 transition-colors"
      >
        {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>

      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="pt-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-white">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Secure Your Space with Advanced CCTV Solutions
              </h1>
              <p className="mt-4 text-xl text-blue-300">
                Professional installation and top-quality surveillance systems for your home and business
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="#products" className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                  View Products
                </a>
                <a href="#contact" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Get Quote
                </a>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80"
                alt="CCTV Camera"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">24/7 Protection</h3>
              <p className="text-gray-600 dark:text-gray-300">Round-the-clock surveillance for complete peace of mind</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <Camera className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">HD Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">Crystal clear footage with our high-definition cameras</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <Wrench className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Expert Installation</h3>
              <p className="text-gray-600 dark:text-gray-300">Professional setup by certified technicians</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Featured Products</h2>
          {loading ? (
            <div className="text-center text-gray-600 dark:text-gray-300">Loading products...</div>
          ) : error ? (
            <div className="text-center text-red-600 dark:text-red-400">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  image={product.image_url}
                  price={product.price}
                  features={product.features}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Installation Services */}
      <section id="services" className="py-20 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Professional Installation Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ChevronRight className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Site Survey & Planning</h3>
                  <p className="text-gray-600 dark:text-gray-300">Comprehensive assessment of your property to determine optimal camera placement</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ChevronRight className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Professional Installation</h3>
                  <p className="text-gray-600 dark:text-gray-300">Expert mounting, wiring, and configuration by certified technicians</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ChevronRight className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">System Setup & Training</h3>
                  <p className="text-gray-600 dark:text-gray-300">Complete configuration and hands-on training for your new system</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80"
                alt="Installation Service"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                </div>
                <p className="mt-2 text-sm font-medium dark:text-white">Rated 5/5 by our customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-blue-300 mb-6">Ready to secure your property? Contact us for a free consultation.</p>
              <div className="flex items-center mb-4">
                <Phone className="h-5 w-5 mr-2" />
                <span>+971 562333263</span>
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
                ></textarea>
                <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-blue-300 hover:text-white transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-8 w-8 text-blue-300" />
              <span className="ml-2 text-xl font-bold">CamsFix</span>
            </div>
            <div className="text-sm text-blue-300">
              &copy; 2024 CamsFix. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;