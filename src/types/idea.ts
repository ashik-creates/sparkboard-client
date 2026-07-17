export interface Idea {
  _id?: string;

  title: string;

  description: string;

  image?: string;

  category: string;

  status: "Draft" | "Validated";

  isPublic: boolean;

  createdAt: string;
}

export interface ValidationReport {
  _id?: string;

  ideaId: string;

  feasibilityScore: number;

  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };

  summary: string;

  generatedAt: string;
}

export interface ChatMessage {
  _id?: string;

  ideaId: string;

  role: "user" | "assistant";

  message: string;

  createdAt: string;
}