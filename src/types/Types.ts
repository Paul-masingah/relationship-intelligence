export interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sentiment?: string;
}

export type SentimentAnalysis = {
  sentiment: string;
  confidence: number;
  keyThemes: string[];
};
