import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { getExampleContract } from '../utils/analyzer';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  onAnalyze: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, onAnalyze }) => {
  const [isEditing, setIsEditing] = useState(true);

  const handleLoadExample = () => {
    const exampleCode = getExampleContract();
    setCode(exampleCode);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="flex justify-between items-center bg-gray-900 px-4 py-2">
        <h2 className="text-white font-medium">Smart Contract Code</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
          >
            {isEditing ? 'View' : 'Edit'}
          </button>
          <button
            onClick={handleLoadExample}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
          >
            Load Example
          </button>
          <button
            onClick={onAnalyze}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
            disabled={!code.trim()}
          >
            Analyze
          </button>
        </div>
      </div>
      
      {isEditing ? (
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-96 bg-gray-800 text-gray-200 p-4 font-mono text-sm focus:outline-none"
          placeholder="Paste your smart contract code here..."
        />
      ) : (
        <div className="h-96 overflow-auto">
          {code ? (
            <SyntaxHighlighter
              language="solidity"
              style={vs2015}
              showLineNumbers
              customStyle={{ margin: 0, height: '100%', background: '#1e293b' }}
            >
              {code}
            </SyntaxHighlighter>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No code to display. Paste code or load an example.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;