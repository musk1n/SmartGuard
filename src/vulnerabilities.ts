import { VulnerabilityType } from './types';

export const vulnerabilities: VulnerabilityType[] = [
  {
    id: 'reentrancy',
    name: 'Reentrancy Vulnerability',
    description: 'Functions that could be exploited through reentrancy attacks where an external call is made before state changes.',
    severity: 'Critical',
    patterns: [
      /msg\.sender\.call\{.*\}\(.*\)/i,
      /\.call\{.*\}\(.*\).*\n.*balances\[.*\]\s*-=/i
    ],
    suggestion: 'Implement the checks-effects-interactions pattern. Always update state variables before making external calls. Consider using ReentrancyGuard from OpenZeppelin.'
  },
  {
    id: 'tx-origin',
    name: 'tx.origin Authentication',
    description: 'Using tx.origin for authentication is vulnerable to phishing attacks.',
    severity: 'High',
    patterns: [/tx\.origin/i],
    suggestion: 'Use msg.sender instead of tx.origin for authentication.'
  },
  {
    id: 'unchecked-return',
    name: 'Unchecked Return Values',
    description: 'Not checking the return value of functions that could fail.',
    severity: 'Medium',
    patterns: [
      /\.send\s*\([^;]*\)\s*(?!\s*require|\s*if)/i
    ],
    suggestion: 'Always check return values of low-level calls. Consider using OpenZeppelin\'s SafeERC20 for token transfers.'
  },
  {
    id: 'integer-overflow',
    name: 'Integer Overflow/Underflow',
    description: 'Arithmetic operations that could result in integer overflow or underflow.',
    severity: 'High',
    patterns: [
      /\+\=/i,
      /\-\=/i
    ],
    suggestion: 'Use SafeMath library for Solidity versions < 0.8.0. For Solidity >= 0.8.0, use the built-in overflow/underflow protection or unchecked blocks when appropriate.'
  },
  {
    id: 'timestamp-dependence',
    name: 'Timestamp Dependence',
    description: 'Relying on block.timestamp for critical logic can be manipulated by miners.',
    severity: 'Medium',
    patterns: [/block\.timestamp/i, /now/i],
    suggestion: 'Avoid using block.timestamp for random number generation or precise timing. If needed, consider using an oracle for time-sensitive operations.'
  },
  {
    id: 'delegatecall',
    name: 'Dangerous delegatecall',
    description: 'Using delegatecall with user-supplied addresses or data can lead to contract takeover.',
    severity: 'Critical',
    patterns: [/\.delegatecall\s*\(/i],
    suggestion: 'Avoid using delegatecall with user-supplied inputs. If necessary, implement strict validation and whitelisting.'
  },
  {
    id: 'self-destruct',
    name: 'Unprotected Self-Destruct',
    description: 'Self-destruct functionality that could be triggered by attackers.',
    severity: 'Critical',
    patterns: [/selfdestruct\s*\(/i, /suicide\s*\(/i],
    suggestion: 'Ensure self-destruct functionality is protected by proper access controls. Consider removing it if not absolutely necessary.'
  },
  {
    id: 'default-visibility',
    name: 'Missing Function Visibility',
    description: 'Functions without explicit visibility default to public.',
    severity: 'Medium',
    patterns: [/function\s+[a-zA-Z0-9_]+\s*\([^)]*\)\s*(?!(public|private|internal|external))/i],
    suggestion: 'Always specify function visibility (public, external, internal, private).'
  },
  {
    id: 'unchecked-math',
    name: 'Unchecked Math',
    description: 'Mathematical operations without overflow/underflow checks.',
    severity: 'High',
    patterns: [/unchecked\s*\{/i],
    suggestion: 'Only use unchecked blocks when you are absolutely certain overflow/underflow cannot occur. Otherwise, rely on Solidity 0.8.0+ built-in checks or SafeMath for earlier versions.'
  },
  {
    id: 'arbitrary-send',
    name: 'Arbitrary Send',
    description: 'Allowing arbitrary addresses to receive Ether can lead to fund theft.',
    severity: 'High',
    patterns: [
      /\.transfer\s*\(\s*[^,\)]*\)/i,
      /\.send\s*\(\s*[^,\)]*\)/i,
      /\.call\s*\{.*value\s*\:/i
    ],
    suggestion: 'Implement proper access controls for functions that transfer Ether. Consider using a withdrawal pattern instead of direct transfers.'
  },
  {
    id: 'weak-randomness',
    name: 'Weak Randomness',
    description: 'Using predictable values for randomness can be exploited.',
    severity: 'High',
    patterns: [
      /keccak256\s*\(\s*abi\.encodePacked\s*\(\s*block\.timestamp/i,
      /keccak256\s*\(\s*abi\.encodePacked\s*\(\s*.*block\.number/i
    ],
    suggestion: 'Use a secure randomness source like Chainlink VRF for random number generation.'
  },
  {
    id: 'dos-gas-limit',
    name: 'DoS with Gas Limit',
    description: 'Operations in unbounded loops can cause transactions to run out of gas.',
    severity: 'Medium',
    patterns: [/for\s*\([^;]*;\s*[^;]*;\s*[^\)]*\)\s*\{/i],
    suggestion: 'Avoid operations on unbounded arrays. Implement pull payment patterns instead of push. Consider pagination for large data sets.'
  },
  {
    id: 'shadowing',
    name: 'State Variable Shadowing',
    description: 'Local variables with the same name as state variables can lead to confusion and bugs.',
    severity: 'Medium',
    patterns: [/^\s*[a-zA-Z0-9_]+\s+[a-zA-Z0-9_]+\s*\=/i],
    suggestion: 'Use different naming conventions for state variables vs local variables (e.g., prefix state variables with "_").'
  },
  {
    id: 'tx-gas-price',
    name: 'tx.gasprice Usage',
    description: 'Relying on tx.gasprice for logic can be manipulated by users.',
    severity: 'Low',
    patterns: [/tx\.gasprice/i],
    suggestion: 'Avoid using tx.gasprice for critical logic. If gas price is important, consider using a gas price oracle.'
  },
  {
    id: 'assembly-usage',
    name: 'Inline Assembly Usage',
    description: 'Using inline assembly bypasses Solidity safety features.',
    severity: 'Medium',
    patterns: [/assembly\s*\{/i],
    suggestion: 'Minimize use of inline assembly. If necessary, thoroughly document and test assembly code.'
  }
];