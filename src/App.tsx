import React from 'react';


import { Shield, Camera, Wrench, Phone, ChevronRight, Star, Sun, Moon } from 'lucide-react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import { useTheme } from './hooks/useTheme';
import { useState } from 'react';


function App() {
  const { isDark, toggleTheme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

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
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 p-2 rounded-full bg-primary text-white z-50 hover:bg-primary-light transition-colors"
      >
        {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>

      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="pt-20 bg-gradient-to-r from-primary to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-white">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Secure Your Space with Advanced CCTV Solutions
              </h1>
              <p className="mt-4 text-xl text-primary-light">
                Professional installation and top-quality surveillance systems for your home and business
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="#products" className="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                  View Products
                </a>
                <a href="#contact" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-primary transition-colors">
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
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">24/7 Protection</h3>
              <p className="text-gray-600 dark:text-gray-300">Round-the-clock surveillance for complete peace of mind</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <Camera className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">HD Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">Crystal clear footage with our high-definition cameras</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <Wrench className="h-12 w-12 text-primary mb-4" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProductCard
              title="Pro Dome Camera"
              image="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80"
              price="$299"
              features={[
                "4K Ultra HD",
                "Night Vision",
                "Motion Detection",
                "Weather Resistant"
              ]}
            />
            <ProductCard
              title="Bullet Camera System"
              image="https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80"
              price="$399"
              features={[
                "1080p HD",
                "Wide Angle Lens",
                "Two-Way Audio",
                "Smart Alerts"
              ]}
            />
            <ProductCard
              title="PTZ Camera"
              image="https://images.unsplash.com/photo-1615730263595-fd9ddad37a24?auto=format&fit=crop&q=80"
              price="$499"
              features={[
                "360° Coverage",
                "30x Zoom",
                "Auto Tracking",
                "IP67 Rated"
              ]}
            />
          </div>
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
                  <ChevronRight className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Site Survey & Planning</h3>
                  <p className="text-gray-600 dark:text-gray-300">Comprehensive assessment of your property to determine optimal camera placement</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ChevronRight className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Professional Installation</h3>
                  <p className="text-gray-600 dark:text-gray-300">Expert mounting, wiring, and configuration by certified technicians</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ChevronRight className="h-6 w-6 text-primary" />
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
      <section id="contact" className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-primary-light mb-6">Ready to secure your property? Contact us for a free consultation.</p>
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
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:border-primary-light focus:ring-1 focus:ring-primary-light"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:border-primary-light focus:ring-1 focus:ring-primary-light"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:border-primary-light focus:ring-1 focus:ring-primary-light"
                ></textarea>
                <button className="w-full bg-white text-primary py-2 px-4 rounded-md hover:bg-primary-light hover:text-white transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-8 w-8 text-primary-light" />
              <span className="ml-2 text-xl font-bold">CamsFix</span>
            </div>
            <div className="text-sm text-primary-light">
              © 2024 CamsFix. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;