import React, { useState } from 'react';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import AnalysisResults from './components/AnalysisResults';
import Footer from './components/Footer';
import { analyzeSmartContract, getExampleContract } from './utils/analyzer';
import { AnalysisReport } from './types';
import { Shield, ShieldAlert, FileCode, BookOpen, FileWarning, BookCheck, Code2 } from 'lucide-react';

function App() {
  const [code, setCode] = useState<string>('');
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleAnalyze = () => {
    if (!code.trim()) {
      // If no code is entered, load the example contract
      const exampleCode = getExampleContract();
      setCode(exampleCode);
      
      setIsAnalyzing(true);
      
      // Simulate analysis delay for better UX
      setTimeout(() => {
        const results = analyzeSmartContract(exampleCode);
        setReport(results);
        setIsAnalyzing(false);
      }, 1500);
      
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay for better UX
    setTimeout(() => {
      const results = analyzeSmartContract(code);
      setReport(results);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {!code && !report ? (
          <div className="text-center py-12">
            <ShieldAlert size={64} className="mx-auto text-indigo-600 mb-4" />
            <h1 className="text-4xl font-bold mb-4">SmartGuard</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              AI-powered smart contract analyzer that identifies vulnerabilities and provides actionable suggestions to secure your code.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Shield className="text-indigo-600 mb-3" size={32} />
                <h3 className="text-lg font-bold mb-2">Vulnerability Detection</h3>
                <p className="text-gray-600">
                  Identifies common smart contract vulnerabilities like reentrancy, overflow/underflow, and more.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FileCode className="text-indigo-600 mb-3" size={32} />
                <h3 className="text-lg font-bold mb-2">Code Analysis</h3>
                <p className="text-gray-600">
                  Analyzes your Solidity code for security issues and best practices violations.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <BookOpen className="text-indigo-600 mb-3" size={32} />
                <h3 className="text-lg font-bold mb-2">Actionable Suggestions</h3>
                <p className="text-gray-600">
                  Provides clear recommendations to fix identified vulnerabilities.
                </p>
              </div>
            </div>
            
            <button
              onClick={handleAnalyze}
              className="mt-12 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Get Started
            </button>
          </div>
        ) : (
          <>
            <CodeEditor 
              code={code} 
              setCode={setCode} 
              onAnalyze={handleAnalyze} 
            />
            
            {isAnalyzing ? (
              <div className="mt-8 text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <h3 className="text-xl font-medium text-gray-700">Analyzing smart contract...</h3>
                <p className="text-gray-500">Our AI is scanning for vulnerabilities and security issues.</p>
              </div>
            ) : (
              <AnalysisResults report={report} />
            )}
          </>
        )}
        
        {/* Documentation Section */}
        <section id="documentation" className="py-16 border-t border-gray-200 mt-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Documentation</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <BookCheck className="text-indigo-600 mr-2" size={24} />
                Getting Started
              </h3>
              <p className="mb-4">
                SmartGuard is an AI-powered tool designed to analyze Solidity smart contracts for security vulnerabilities and best practice violations. 
                Our tool helps developers identify potential issues before deployment, reducing the risk of exploits and financial losses.
              </p>
              <p>
                To begin, simply paste your Solidity code into the editor or use our example contract. Click "Analyze" to scan your code for vulnerabilities.
                The results will show any detected issues categorized by severity, along with explanations and suggestions for fixing them.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FileWarning className="text-indigo-600 mr-2" size={24} />
                Vulnerability Types
              </h3>
              <p className="mb-4">
                SmartGuard detects a wide range of common smart contract vulnerabilities, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Reentrancy:</strong> When external contract calls allow attackers to re-enter the original function before state updates.</li>
                <li><strong>Integer Overflow/Underflow:</strong> When arithmetic operations exceed the maximum or minimum value of the data type.</li>
                <li><strong>Unchecked Return Values:</strong> When the return values of low-level calls are not properly checked.</li>
                <li><strong>Timestamp Dependence:</strong> When critical logic relies on block timestamps that can be manipulated by miners.</li>
                <li><strong>Dangerous Delegatecall:</strong> When delegatecall is used with user-supplied inputs, potentially leading to contract takeover.</li>
              </ul>
              <p>
                Each vulnerability is assigned a severity level (Critical, High, Medium, Low, or Informational) based on its potential impact.
              </p>
            </div>
          </div>
        </section>
        
        {/* API Reference Section */}
        <section id="api-reference" className="py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">API Reference</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Code2 className="text-indigo-600 mr-2" size={24} />
                REST API
              </h3>
              <p className="mb-4">
                SmartGuard offers a REST API for integrating contract analysis into your development workflow.
                The API allows you to programmatically analyze smart contracts and retrieve detailed vulnerability reports.
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <h4 className="font-bold mb-2">Endpoint: POST /api/analyze</h4>
                <p className="mb-2">Analyzes a smart contract for vulnerabilities.</p>
                <p className="font-semibold">Request Body:</p>
                <pre className="bg-gray-800 text-gray-200 p-3 rounded overflow-x-auto mb-2">
{`{
  "code": "string",  // Solidity code to analyze
  "options": {
    "includeInformational": boolean,  // Include informational findings
    "detailedReport": boolean         // Include detailed explanations
  }
}`}
                </pre>
                <p className="font-semibold">Response:</p>
                <pre className="bg-gray-800 text-gray-200 p-3 rounded overflow-x-auto">
{`{
  "results": [
    {
      "lineNumber": number,
      "code": "string",
      "vulnerability": {
        "id": "string",
        "name": "string",
        "description": "string",
        "severity": "Critical" | "High" | "Medium" | "Low" | "Informational",
        "suggestion": "string"
      }
    }
  ],
  "summary": {
    "critical": number,
    "high": number,
    "medium": number,
    "low": number,
    "informational": number
  }
}`}
                </pre>
              </div>
              
              <p>
                For API access and documentation, please contact our team at api@smartguard.example.com.
              </p>
            </div>
          </div>
        </section>
        
        {/* Best Practices Section */}
        <section id="best-practices" className="py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Security Best Practices</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Smart Contract Security Guidelines</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">1. Follow the Checks-Effects-Interactions Pattern</h4>
                  <p>
                    Always perform checks first, then make state changes, and finally interact with other contracts.
                    This pattern helps prevent reentrancy attacks by ensuring state changes are complete before external calls.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-2">2. Use SafeMath or Solidity 0.8.0+</h4>
                  <p>
                    For Solidity versions below 0.8.0, always use SafeMath for arithmetic operations to prevent overflow/underflow.
                    Solidity 0.8.0 and above includes built-in overflow checking, but be cautious with unchecked blocks.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-2">3. Implement Proper Access Controls</h4>
                  <p>
                    Use modifiers to restrict function access to authorized users only.
                    Consider implementing multi-signature requirements for critical functions.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-2">4. Avoid Timestamp Dependence</h4>
                  <p>
                    Don't rely on block.timestamp for critical logic, as miners can manipulate it slightly.
                    For random number generation, use a secure source like Chainlink VRF.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-2">5. Always Check Return Values</h4>
                  <p>
                    Check return values of low-level calls like send() and delegatecall().
                    Consider using OpenZeppelin's SafeERC20 for token transfers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">About SmartGuard</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="mb-4">
              SmartGuard is an AI-powered tool designed to analyze Solidity smart contracts for security vulnerabilities and best practice violations. Our tool helps developers identify potential issues before deployment, reducing the risk of exploits and financial losses.
              </p>
              
              <p className="mb-4">
                The mission is to make blockchain technology safer by providing developers with accessible tools to identify
                security issues early in the development process, before they can be exploited.
              </p>
              
              <p>
                While SmartGuard can help identify many common vulnerabilities, we always recommend a professional audit
                for contracts that will handle significant value or sensitive operations.
              </p>
            </div>
          </div>
        </section>
        
        {/* Blog Section */}
        <section id="blog" className="py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Blog</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Understanding Reentrancy Attacks</h3>
                  <p className="text-gray-500 mb-4">May 15, 2025</p>
                  <p className="mb-4">
                    Reentrancy attacks have been responsible for some of the largest hacks in DeFi history.
                    Learn how these attacks work and how to prevent them in your smart contracts.
                  </p>
                  <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Read more →</a>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">The Dangers of Flash Loans</h3>
                  <p className="text-gray-500 mb-4">April 28, 2025</p>
                  <p className="mb-4">
                    Flash loans allow attackers to borrow massive amounts of capital without collateral.
                    Discover how they can be used in price manipulation attacks and how to protect your protocols.
                  </p>
                  <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Read more →</a>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Secure Randomness in Smart Contracts</h3>
                  <p className="text-gray-500 mb-4">April 10, 2025</p>
                  <p className="mb-4">
                    Generating secure random numbers in smart contracts is notoriously difficult.
                    Learn about the pitfalls of on-chain randomness and solutions like Chainlink VRF.
                  </p>
                  <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Read more →</a>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Access Control Best Practices</h3>
                  <p className="text-gray-500 mb-4">March 22, 2025</p>
                  <p className="mb-4">
                    Proper access control is essential for smart contract security.
                    Explore different patterns for implementing robust access controls in your contracts.
                  </p>
                  <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Read more →</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;