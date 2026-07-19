interface ValidationReport {
  overallScore: number;
  marketPotential: string;
  technicalDifficulty: string;
 competitionLevel: string;
  strengths: string[];
  weaknesses: string[];
  risks: string[];
  recommendations: string[];
  verdict: string;
}

interface ImprovementReport {
  improvedTitle: string;
  improvedShortDescription: string;
  improvedDescription: string;
  newFeatures: string[];
  targetCustomers: string[];
  businessModel: string;
  goToMarket: string[];
  marketingIdeas: string[];
}

export interface Idea {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  createdAt: string;

  validationReport?: ValidationReport;
  improvementReport?: ImprovementReport;
}

