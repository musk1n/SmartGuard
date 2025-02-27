import { AnalysisReport, AnalysisResult, VulnerabilityType } from '../types';
import { vulnerabilities } from '../vulnerabilities';

export function analyzeSmartContract(code: string): AnalysisReport {
  const lines = code.split('\n');
  const results: AnalysisResult[] = [];
  
  // Initialize with empty results to avoid undefined errors
  const report: AnalysisReport = {
    results: [],
    summary: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      informational: 0
    }
  };
  
  if (!code.trim()) {
    return report;
  }
  
  lines.forEach((line, index) => {
    vulnerabilities.forEach(vulnerability => {
      vulnerability.patterns.forEach(pattern => {
        if (pattern.test(line)) {
          // Check if this vulnerability at this line is already reported
          const isDuplicate = results.some(
            result => 
              result.lineNumber === index + 1 && 
              result.vulnerability.id === vulnerability.id
          );
          
          if (!isDuplicate) {
            results.push({
              lineNumber: index + 1,
              code: line.trim(),
              vulnerability: vulnerability
            });
          }
        }
      });
    });
  });
  
  // Sort results by severity and line number
  results.sort((a, b) => {
    const severityOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3, 'Informational': 4 };
    if (severityOrder[a.vulnerability.severity] !== severityOrder[b.vulnerability.severity]) {
      return severityOrder[a.vulnerability.severity] - severityOrder[b.vulnerability.severity];
    }
    return a.lineNumber - b.lineNumber;
  });
  
  // Generate summary
  const summary = {
    critical: results.filter(r => r.vulnerability.severity === 'Critical').length,
    high: results.filter(r => r.vulnerability.severity === 'High').length,
    medium: results.filter(r => r.vulnerability.severity === 'Medium').length,
    low: results.filter(r => r.vulnerability.severity === 'Low').length,
    informational: results.filter(r => r.vulnerability.severity === 'Informational').length
  };
  
  return {
    results,
    summary
  };
}

export function getExampleContract(): string {
  return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableContract {
    mapping(address => uint256) public balances;
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // Vulnerable to reentrancy
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        balances[msg.sender] -= amount;
    }
    
    function getBlockTimestamp() public view returns (uint256) {
        // Timestamp dependence
        return block.timestamp;
    }
    
    function isOwner() public view returns (bool) {
        // tx.origin vulnerability
        return tx.origin == msg.sender;
    }
    
    function riskyOperation() public {
        // Unchecked return value
        address(0x123).send(1 ether);
    }
    
    function generateRandomNumber() public view returns (uint256) {
        // Weak randomness
        return uint256(keccak256(abi.encodePacked(block.timestamp, block.number)));
    }
    
    function processLargeArray(uint256[] memory data) public {
        // Potential DoS with gas limit
        for (uint256 i = 0; i < data.length; i++) {
            // Do something with each element
            balances[msg.sender] += data[i];
        }
    }
    
    function dangerousFunction(address target, bytes memory data) public {
        // Dangerous delegatecall
        (bool success, ) = target.delegatecall(data);
        require(success, "Delegatecall failed");
    }
}`;
}