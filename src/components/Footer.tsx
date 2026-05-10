import { Compass } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0B121A] text-gray-400 py-10 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-6 h-6 text-white" />
              <Link to="/" className="text-xl font-bold text-white tracking-tight">
                Traveloop
              </Link>
            </div>
            <p className="text-sm">
              © 2026 Traveloop Adventure Platform. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm pt-2">
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/sustainability" className="hover:text-white transition-colors">Sustainability</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
