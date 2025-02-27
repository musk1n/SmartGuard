import React from 'react';
import { ShieldAlert } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldAlert size={32} />
          <div>
            <h1 className="text-2xl font-bold">SmartGuard</h1>
            <p className="text-sm opacity-80">Smart Contract Vulnerability Analyzer</p>
          </div>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-blue-200 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#documentation" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('documentation')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-blue-200 transition-colors"
              >
                Documentation
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-blue-200 transition-colors"
              >
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;