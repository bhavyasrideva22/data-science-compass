import { Question, AssessmentSection } from '@/types/assessment';

export const ASSESSMENT_QUESTIONS: Question[] = [
  // Psychometric Section - Interest & Personality
  {
    id: 'psych_1',
    section: AssessmentSection.PSYCHOMETRIC,
    type: 'likert',
    question: 'I enjoy analyzing patterns and trends in data',
    likertLabels: ['Strongly Disagree', 'Strongly Agree'],
    weight: 1.2,
    category: 'interest'
  },
  {
    id: 'psych_2',
    section: AssessmentSection.PSYCHOMETRIC,
    type: 'likert',
    question: 'I prefer working with concrete facts rather than abstract theories',
    likertLabels: ['Strongly Disagree', 'Strongly Agree'],
    weight: 1.0,
    category: 'personality'
  },
  {
    id: 'psych_3',
    section: AssessmentSection.PSYCHOMETRIC,
    type: 'likert',
    question: 'I am comfortable working independently for long periods',
    likertLabels: ['Strongly Disagree', 'Strongly Agree'],
    weight: 1.1,
    category: 'work_style'
  },
  {
    id: 'psych_4',
    section: AssessmentSection.PSYCHOMETRIC,
    type: 'multiple-choice',
    question: 'What motivates you most about a potential career in Data Science?',
    options: [
      'High salary potential',
      'Intellectual challenges and problem-solving',
      'Making data-driven business impact',
      'Working with cutting-edge technology',
      'Job market demand and security'
    ],
    weight: 1.3,
    category: 'motivation'
  },
  {
    id: 'psych_5',
    section: AssessmentSection.PSYCHOMETRIC,
    type: 'likert',
    question: 'I can maintain focus on detailed tasks for hours at a time',
    likertLabels: ['Never', 'Always'],
    weight: 1.2,
    category: 'conscientiousness'
  },

  // Technical & Aptitude Section
  {
    id: 'tech_1',
    section: AssessmentSection.TECHNICAL,
    type: 'multiple-choice',
    question: 'What is the primary purpose of data cleaning in the data science process?',
    options: [
      'To make data look prettier in visualizations',
      'To remove errors, inconsistencies, and prepare data for analysis',
      'To reduce the size of datasets',
      'To convert all data to the same format',
      'I\'m not sure'
    ],
    weight: 1.0,
    category: 'domain_knowledge'
  },
  {
    id: 'tech_2',
    section: AssessmentSection.TECHNICAL,
    type: 'multiple-choice',
    question: 'If a dataset has 1000 rows and you want to randomly select 100 for analysis, what is this process called?',
    options: [
      'Data mining',
      'Sampling',
      'Data sorting',
      'Filtering',
      'I\'m not sure'
    ],
    weight: 0.8,
    category: 'statistics'
  },
  {
    id: 'tech_3',
    section: AssessmentSection.TECHNICAL,
    type: 'multiple-choice',
    question: 'Which of these is NOT a common programming language used in Data Science?',
    options: [
      'Python',
      'R',
      'SQL',
      'JavaScript',
      'COBOL'
    ],
    weight: 0.6,
    category: 'tools'
  },
  {
    id: 'tech_4',
    section: AssessmentSection.TECHNICAL,
    type: 'scenario',
    scenario: 'A company notices that their website traffic drops every weekend. They want to understand why.',
    question: 'What would be your first step in analyzing this problem?',
    options: [
      'Immediately redesign the website',
      'Collect more data about user behavior patterns',
      'Assume it\'s normal and ignore it',
      'Survey all customers about weekend preferences',
      'Check if this pattern is consistent over time'
    ],
    weight: 1.4,
    category: 'analytical_thinking'
  },

  // WISCAR Framework Section
  {
    id: 'wiscar_1',
    section: AssessmentSection.WISCAR,
    type: 'likert',
    question: 'When I encounter a difficult problem, I persist until I find a solution',
    likertLabels: ['Never', 'Always'],
    weight: 1.2,
    category: 'will'
  },
  {
    id: 'wiscar_2',
    section: AssessmentSection.WISCAR,
    type: 'likert',
    question: 'I actively seek out opportunities to learn new technical skills',
    likertLabels: ['Never', 'Always'],
    weight: 1.1,
    category: 'ability_to_learn'
  },
  {
    id: 'wiscar_3',
    section: AssessmentSection.WISCAR,
    type: 'scenario',
    scenario: 'You\'re working on a machine learning model that\'s not performing well. Your manager is pressuring you for results.',
    question: 'What would you most likely do?',
    options: [
      'Submit the current model and hope for the best',
      'Systematically test different approaches and document findings',
      'Ask a colleague to take over the project',
      'Recommend abandoning the project',
      'Present the current results as "preliminary findings"'
    ],
    weight: 1.5,
    category: 'real_world'
  },
  {
    id: 'wiscar_4',
    section: AssessmentSection.WISCAR,
    type: 'multiple-choice',
    question: 'How do you typically approach learning a new concept or tool?',
    options: [
      'Watch tutorials and follow along',
      'Read documentation thoroughly first',
      'Jump in and experiment hands-on',
      'Find a mentor or expert to guide me',
      'Take a structured course or class'
    ],
    weight: 1.0,
    category: 'learning_style'
  },
  {
    id: 'wiscar_5',
    section: AssessmentSection.WISCAR,
    type: 'likert',
    question: 'I can quickly identify patterns in complex, ambiguous information',
    likertLabels: ['Very Difficult', 'Very Easy'],
    weight: 1.3,
    category: 'cognitive'
  }
];

export const SECTION_INFO = {
  [AssessmentSection.PSYCHOMETRIC]: {
    title: 'Personality & Interest Assessment',
    description: 'Understanding your motivations and work preferences',
    icon: '🧠',
    estimatedTime: '8 minutes'
  },
  [AssessmentSection.TECHNICAL]: {
    title: 'Technical Knowledge & Aptitude',
    description: 'Evaluating your current knowledge and analytical thinking',
    icon: '💻',
    estimatedTime: '10 minutes'
  },
  [AssessmentSection.WISCAR]: {
    title: 'Career Readiness Framework',
    description: 'Comprehensive evaluation of your readiness across six key dimensions',
    icon: '📊',
    estimatedTime: '7 minutes'
  }
};