import React from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { AnalysisReport } from '../types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface AnalysisResultsProps {
  report: AnalysisReport | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ report }) => {
  if (!report) return null;

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return <AlertCircle className="text-red-500" />;
      case 'High':
        return <AlertTriangle className="text-orange-500" />;
      case 'Medium':
        return <AlertTriangle className="text-yellow-500" />;
      case 'Low':
        return <Info className="text-blue-500" />;
      default:
        return <CheckCircle className="text-green-500" />;
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
      
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-800">{report.summary.critical}</div>
          <div className="text-sm text-red-600">Critical</div>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-800">{report.summary.high}</div>
          <div className="text-sm text-orange-600">High</div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-800">{report.summary.medium}</div>
          <div className="text-sm text-yellow-600">Medium</div>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-800">{report.summary.low}</div>
          <div className="text-sm text-blue-600">Low</div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-800">{report.summary.informational}</div>
          <div className="text-sm text-green-600">Info</div>
        </div>
      </div>
      
      {report.results.length === 0 ? (
        <div className="bg-green-100 p-6 rounded-lg text-center">
          <CheckCircle className="mx-auto text-green-500 mb-2" size={48} />
          <h3 className="text-xl font-bold text-green-800">No vulnerabilities detected!</h3>
          <p className="text-green-600">Your smart contract appears to be secure based on our analysis.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {report.results.map((result, index) => (
            <div 
              key={index} 
              className={`border rounded-lg overflow-hidden ${getSeverityClass(result.vulnerability.severity)}`}
            >
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {getSeverityIcon(result.vulnerability.severity)}
                  <h3 className="text-lg font-bold">{result.vulnerability.name}</h3>
                  <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                    getSeverityClass(result.vulnerability.severity)
                  }`}>
                    {result.vulnerability.severity}
                  </span>
                </div>
                
                <p className="mb-3">{result.vulnerability.description}</p>
                
                <div className="bg-gray-800 rounded overflow-hidden mb-3">
                  <div className="bg-gray-900 px-3 py-1 text-gray-300 text-xs">
                    Line {result.lineNumber}
                  </div>
                  <SyntaxHighlighter
                    language="solidity"
                    style={vs2015}
                    customStyle={{ margin: 0 }}
                  >
                    {result.code}
                  </SyntaxHighlighter>
                </div>
                
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <h4 className="font-bold mb-1">Suggestion:</h4>
                  <p>{result.vulnerability.suggestion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;