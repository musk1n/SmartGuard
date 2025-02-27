import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">SmartGuard</h3>
            <p className="text-gray-300">
              An AI-powered tool for analyzing smart contracts and identifying potential vulnerabilities.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a 
                  href="#documentation" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('documentation')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="#api-reference" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('api-reference')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a 
                  href="#best-practices" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('best-practices')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  Security Best Practices
                </a>
              </li>
              <li>
                <a 
                  href="#blog" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/musk1n" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://twitter.com/Muskan863482" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="mailto:muskan.4063@iitg.ac.in" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SmartGuard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;