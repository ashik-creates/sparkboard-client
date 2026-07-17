export interface LeanCanvas {
  problem: string[];
  solution: string[];
  keyMetrics: string[];
  valueProposition: string[];
  unfairAdvantage: string[];
  channels: string[];
  customerSegments: string[];
  costStructure: string[];
  revenueStreams: string[];
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface Competitor {
  name: string;
  url?: string;
  description: string;
  differentiation: string;
}

export interface FeasibilityScores {
  technical: number;
  marketSize: number;
  financialViability: number;
  overallScore: number;
}

export interface ValidationReport {
  ideaId: string;
  feasibility: FeasibilityScores;
  swot: SwotAnalysis;
  competitors: Competitor[];
  summaryReport: string;
  generatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}

export interface Idea {
  id: string;
  title: string;
  oneLiner: string;
  description: string;
  industry: string;
  tags: string[];
  status: "draft" | "improving" | "validated" | "archived";
  leanCanvas?: LeanCanvas;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  validationReport?: ValidationReport;
  chatHistory?: ChatMessage[];
}
