import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-12 footer">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Company Info */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-bold mb-4 text-indigo-400">StoreRatings</h3>
          <p className="text-gray-400">
            Connecting you with the best local stores and helping businesses grow.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-1">
          <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">Contact</a></li>
            <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">FAQ</a></li>
            <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="md:col-span-1">
          <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">Help Center</a></li>
            <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">Terms of Service</a></li>
            <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">Sitemap</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="md:col-span-1">
          <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.873v-6.985h-2.54V12h2.54V9.797c0-2.505 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.77-1.63 1.563V12h2.77l-.44 2.89h-2.33v6.985C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16.3 3.5c.2-.2.5-.3.8-.3s.5.1.8.3c.3.2.4.5.4.8s-.1.5-.3.8c-.2.3-.5.4-.8.4s-.5-.1-.8-.4c-.3-.2-.4-.5-.4-.8s.1-.5.3-.8zM12 5.5c-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5 6.5-2.9 6.5-6.5-2.9-6.5-6.5-6.5zm0 11.5c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" />
                <path d="M12 8c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.3 2.2H5.7c-1.9 0-3.5 1.6-3.5 3.5v12.6c0 1.9 1.6 3.5 3.5 3.5h12.6c1.9 0 3.5-1.6 3.5-3.5V5.7c0-1.9-1.6-3.5-3.5-3.5zm-5.3 15.6c-.6.6-1.5 1.2-2.5 1.2-1.6 0-2.9-1.3-2.9-2.9 0-1.6 1.3-2.9 2.9-2.9 1 0 1.9.6 2.5 1.2.6-.6 1.5-1.2 2.5-1.2 1.6 0 2.9 1.3 2.9 2.9 0 1.6-1.3 2.9-2.9 2.9-1 0-1.9-.6-2.5-1.2zm5.8-9.4c-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3 2.3-1 2.3-2.3-1-2.3-2.3-2.3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        &copy; 2024 StoreRatings. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
