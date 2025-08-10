import { Answer, AssessmentResults, WISCARScores, Recommendation, CareerMatch } from '@/types/assessment';
import { ASSESSMENT_QUESTIONS } from '@/data/questions';

export class AssessmentEngine {
  static calculateResults(answers: Answer[]): AssessmentResults {
    const psychometricScore = this.calculatePsychometricScore(answers);
    const technicalScore = this.calculateTechnicalScore(answers);
    const wiscarScores = this.calculateWISCARScores(answers);
    const overallScore = this.calculateOverallScore(psychometricScore, technicalScore, wiscarScores);
    
    const recommendation = this.generateRecommendation(
      psychometricScore,
      technicalScore,
      wiscarScores,
      overallScore
    );
    
    const strengths = this.identifyStrengths(psychometricScore, technicalScore, wiscarScores);
    const improvements = this.identifyImprovements(psychometricScore, technicalScore, wiscarScores);

    return {
      psychometricScore,
      technicalScore,
      wiscarScores,
      overallScore,
      recommendation,
      strengths,
      improvements
    };
  }

  private static calculatePsychometricScore(answers: Answer[]): number {
    const psychQuestions = ASSESSMENT_QUESTIONS.filter(q => q.section === 'psychometric');
    let totalScore = 0;
    let totalWeight = 0;

    for (const question of psychQuestions) {
      const answer = answers.find(a => a.questionId === question.id);
      if (answer !== undefined) {
        // Convert answer value to 0-100 scale
        let score = 0;
        if (question.type === 'likert') {
          score = (answer.value / 4) * 100; // 0-4 scale to 0-100
        } else if (question.type === 'multiple-choice') {
          // Score based on the "best" answer for psychological fit
          score = this.getMultipleChoiceScore(question.id, answer.value);
        }
        
        totalScore += score * question.weight;
        totalWeight += question.weight;
      }
    }

    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  }

  private static calculateTechnicalScore(answers: Answer[]): number {
    const techQuestions = ASSESSMENT_QUESTIONS.filter(q => q.section === 'technical');
    let totalScore = 0;
    let totalWeight = 0;

    for (const question of techQuestions) {
      const answer = answers.find(a => a.questionId === question.id);
      if (answer !== undefined) {
        let score = 0;
        if (question.type === 'multiple-choice' || question.type === 'scenario') {
          score = this.getTechnicalScore(question.id, answer.value);
        }
        
        totalScore += score * question.weight;
        totalWeight += question.weight;
      }
    }

    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  }

  private static calculateWISCARScores(answers: Answer[]): WISCARScores {
    const wiscarQuestions = ASSESSMENT_QUESTIONS.filter(q => q.section === 'wiscar');
    
    const categories = {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0
    };

    const categoryCounts = {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0
    };

    for (const question of wiscarQuestions) {
      const answer = answers.find(a => a.questionId === question.id);
      if (answer !== undefined) {
        let score = 0;
        if (question.type === 'likert') {
          score = (answer.value / 4) * 100;
        } else {
          score = this.getWISCARScore(question.id, answer.value);
        }

        const category = this.mapCategoryToWISCAR(question.category);
        if (category) {
          categories[category] += score;
          categoryCounts[category]++;
        }
      }
    }

    // Calculate averages
    return {
      will: categoryCounts.will > 0 ? Math.round(categories.will / categoryCounts.will) : 0,
      interest: categoryCounts.interest > 0 ? Math.round(categories.interest / categoryCounts.interest) : 0,
      skill: categoryCounts.skill > 0 ? Math.round(categories.skill / categoryCounts.skill) : 0,
      cognitive: categoryCounts.cognitive > 0 ? Math.round(categories.cognitive / categoryCounts.cognitive) : 0,
      ability: categoryCounts.ability > 0 ? Math.round(categories.ability / categoryCounts.ability) : 0,
      realWorld: categoryCounts.realWorld > 0 ? Math.round(categories.realWorld / categoryCounts.realWorld) : 0
    };
  }

  private static calculateOverallScore(
    psychometricScore: number,
    technicalScore: number,
    wiscarScores: WISCARScores
  ): number {
    const wiscarAverage = Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6;
    
    // Weighted average: 30% psychometric, 35% technical, 35% WISCAR
    const overall = (psychometricScore * 0.3) + (technicalScore * 0.35) + (wiscarAverage * 0.35);
    
    return Math.round(overall);
  }

  private static generateRecommendation(
    psychometricScore: number,
    technicalScore: number,
    wiscarScores: WISCARScores,
    overallScore: number
  ): Recommendation {
    let shouldPursue: 'yes' | 'maybe' | 'no' = 'no';
    let confidence = 0;
    let reasoning = '';
    let nextSteps: string[] = [];
    let alternativePaths: string[] = [];

    if (overallScore >= 75) {
      shouldPursue = 'yes';
      confidence = Math.min(95, overallScore);
      reasoning = 'You demonstrate strong potential across all key areas for Data Science success. Your combination of technical aptitude, personality fit, and career readiness suggests you would thrive in this field.';
      nextSteps = [
        'Begin with a structured Data Science course or bootcamp',
        'Start building a portfolio with real-world projects',
        'Network with Data Science professionals',
        'Consider specialization areas (ML, AI, Business Analytics)',
        'Apply for entry-level Data Science positions'
      ];
    } else if (overallScore >= 50) {
      shouldPursue = 'maybe';
      confidence = 70;
      reasoning = 'You show promise for Data Science but would benefit from targeted preparation in specific areas. With focused effort, you could develop the skills needed for success.';
      nextSteps = [
        'Identify and address your lowest-scoring areas',
        'Take foundational courses in statistics and programming',
        'Practice with online Data Science challenges',
        'Build analytical thinking through projects',
        'Reassess your readiness in 6-12 months'
      ];
      
      if (technicalScore < 50) {
        nextSteps.unshift('Focus on building technical skills first');
      }
      if (psychometricScore < 50) {
        alternativePaths = ['Business Analytics', 'Data Visualization', 'Product Management'];
      }
    } else {
      shouldPursue = 'no';
      confidence = 80;
      reasoning = 'Based on your current assessment, other career paths might be a better fit for your interests and strengths. Consider roles that leverage your natural abilities.';
      nextSteps = [
        'Explore the alternative career paths suggested',
        'Consider roles that use some data skills but aren\'t pure Data Science',
        'Focus on developing your identified strengths',
        'If still interested in data, consider supportive roles first'
      ];
      alternativePaths = ['Business Analysis', 'Project Management', 'UX Research', 'Technical Writing', 'Quality Assurance'];
    }

    const careerMatches = this.generateCareerMatches(overallScore, technicalScore, psychometricScore);

    return {
      shouldPursue,
      confidence,
      reasoning,
      nextSteps,
      alternativePaths: alternativePaths.length > 0 ? alternativePaths : undefined,
      careerMatches
    };
  }

  private static identifyStrengths(
    psychometricScore: number,
    technicalScore: number,
    wiscarScores: WISCARScores
  ): string[] {
    const strengths: string[] = [];

    if (psychometricScore >= 70) {
      strengths.push('Strong personality fit for analytical work');
      strengths.push('Good motivation and interest alignment');
    }

    if (technicalScore >= 70) {
      strengths.push('Solid technical foundation and analytical thinking');
      strengths.push('Good understanding of data science concepts');
    }

    if (wiscarScores.will >= 70) {
      strengths.push('High persistence and determination');
    }

    if (wiscarScores.cognitive >= 70) {
      strengths.push('Strong cognitive abilities and pattern recognition');
    }

    if (wiscarScores.ability >= 70) {
      strengths.push('Excellent learning ability and growth mindset');
    }

    if (strengths.length === 0) {
      strengths.push('Willingness to learn and grow');
      strengths.push('Interest in exploring new career opportunities');
    }

    return strengths;
  }

  private static identifyImprovements(
    psychometricScore: number,
    technicalScore: number,
    wiscarScores: WISCARScores
  ): string[] {
    const improvements: string[] = [];

    if (technicalScore < 50) {
      improvements.push('Build foundational technical skills in programming and statistics');
      improvements.push('Practice with data manipulation and analysis tools');
    }

    if (psychometricScore < 50) {
      improvements.push('Consider if analytical, detail-oriented work suits your preferences');
    }

    if (wiscarScores.will < 50) {
      improvements.push('Develop persistence and resilience for challenging problems');
    }

    if (wiscarScores.cognitive < 50) {
      improvements.push('Practice analytical and logical thinking exercises');
    }

    if (wiscarScores.skill < 50) {
      improvements.push('Gain hands-on experience with data science tools and methods');
    }

    return improvements;
  }

  // Helper methods for scoring specific questions
  private static getMultipleChoiceScore(questionId: string, answerValue: number): number {
    const scoringRules: Record<string, number[]> = {
      'psych_4': [40, 100, 90, 80, 60], // Motivation question - intellectual challenge is best
    };

    return scoringRules[questionId]?.[answerValue] || 50;
  }

  private static getTechnicalScore(questionId: string, answerValue: number): number {
    const scoringRules: Record<string, number[]> = {
      'tech_1': [0, 100, 20, 30, 0], // Data cleaning question
      'tech_2': [20, 100, 40, 60, 0], // Sampling question
      'tech_3': [0, 0, 0, 60, 100], // Programming languages - COBOL is not used
      'tech_4': [0, 80, 20, 40, 100], // Analysis problem - checking patterns is best
    };

    return scoringRules[questionId]?.[answerValue] || 50;
  }

  private static getWISCARScore(questionId: string, answerValue: number): number {
    const scoringRules: Record<string, number[]> = {
      'wiscar_3': [20, 100, 40, 30, 50], // Scenario question - systematic approach is best
      'wiscar_4': [70, 60, 90, 80, 75], // Learning style - hands-on is good for DS
    };

    return scoringRules[questionId]?.[answerValue] || 50;
  }

  private static mapCategoryToWISCAR(category: string): keyof WISCARScores | null {
    const mapping: Record<string, keyof WISCARScores> = {
      'will': 'will',
      'interest': 'interest',
      'skill': 'skill',
      'cognitive': 'cognitive',
      'ability_to_learn': 'ability',
      'learning_style': 'ability',
      'real_world': 'realWorld'
    };

    return mapping[category] || null;
  }

  private static generateCareerMatches(
    overallScore: number,
    technicalScore: number,
    psychometricScore: number
  ): CareerMatch[] {
    const careers: CareerMatch[] = [
      {
        title: 'Data Scientist',
        description: 'Extract insights from complex datasets using statistical methods and machine learning',
        matchScore: Math.min(100, overallScore + 10),
        requirements: ['Python/R programming', 'Statistics & ML', 'Domain expertise', 'Communication skills'],
        growthPath: ['Junior Data Scientist', 'Data Scientist', 'Senior Data Scientist', 'Lead Data Scientist']
      },
      {
        title: 'Data Analyst',
        description: 'Analyze data to help organizations make informed business decisions',
        matchScore: Math.min(100, overallScore + 5),
        requirements: ['SQL & Excel', 'Statistical analysis', 'Data visualization', 'Business acumen'],
        growthPath: ['Data Analyst', 'Senior Data Analyst', 'Analytics Manager', 'Director of Analytics']
      },
      {
        title: 'Machine Learning Engineer',
        description: 'Design and implement ML systems and algorithms in production environments',
        matchScore: Math.max(0, Math.min(100, technicalScore + 20)),
        requirements: ['Strong programming', 'ML algorithms', 'Software engineering', 'System design'],
        growthPath: ['ML Engineer', 'Senior ML Engineer', 'ML Architect', 'AI Research Lead']
      }
    ];

    if (overallScore < 60) {
      careers.push({
        title: 'Business Intelligence Developer',
        description: 'Create dashboards and reports to support business decision-making',
        matchScore: overallScore + 20,
        requirements: ['SQL', 'BI tools (Tableau, Power BI)', 'Database design', 'Business knowledge'],
        growthPath: ['BI Developer', 'Senior BI Developer', 'BI Architect', 'Analytics Director']
      });
    }

    return careers.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  }
}