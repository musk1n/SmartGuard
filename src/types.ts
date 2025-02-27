export interface VulnerabilityType {
  id: string;
  name: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';
  patterns: RegExp[];
  suggestion: string;
}

export interface AnalysisResult {
  lineNumber: number;
  code: string;
  vulnerability: VulnerabilityType;
}

export interface AnalysisReport {
  results: AnalysisResult[];
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    informational: number;
  };
}