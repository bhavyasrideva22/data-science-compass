export interface Question {
  id: string;
  section: AssessmentSection;
  type: 'multiple-choice' | 'likert' | 'scenario';
  question: string;
  options?: string[];
  likertLabels?: [string, string]; // [low, high]
  scenario?: string;
  weight: number;
  category: string;
}

export interface Answer {
  questionId: string;
  value: number; // 0-4 for likert, 0-based index for multiple choice
  rawAnswer?: string;
}

export interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: WISCARScores;
  overallScore: number;
  recommendation: Recommendation;
  strengths: string[];
  improvements: string[];
}

export interface WISCARScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface Recommendation {
  shouldPursue: 'yes' | 'maybe' | 'no';
  confidence: number;
  reasoning: string;
  nextSteps: string[];
  alternativePaths?: string[];
  careerMatches: CareerMatch[];
}

export interface CareerMatch {
  title: string;
  description: string;
  matchScore: number;
  requirements: string[];
  growthPath: string[];
}

export enum AssessmentSection {
  INTRO = 'intro',
  PSYCHOMETRIC = 'psychometric',
  TECHNICAL = 'technical',
  WISCAR = 'wiscar',
  RESULTS = 'results'
}

export interface AssessmentState {
  currentSection: AssessmentSection;
  currentQuestionIndex: number;
  answers: Answer[];
  startTime: Date;
  sectionStartTime: Date;
  isComplete: boolean;
}