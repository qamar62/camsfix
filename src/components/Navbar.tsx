import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">CamsFix</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light">Home</a>
            <a href="#products" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light">Products</a>
            <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light">Services</a>
            <a href="#contact" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light">
              Contact Us
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light">Home</a>
            <a href="#products" className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light">Products</a>
            <a href="#services" className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light">Services</a>
            <a href="#contact" className="block px-3 py-2 text-primary dark:text-primary-light font-medium">Contact Us</a>
          </div>
        </div>
      )}
    </nav>
  );
}