import { useState, useEffect } from 'react';
import { AssessmentState, AssessmentSection, Answer, AssessmentResults as ResultsType } from '@/types/assessment';
import { ASSESSMENT_QUESTIONS } from '@/data/questions';
import { AssessmentEngine } from '@/utils/assessmentEngine';
import AssessmentIntro from './AssessmentIntro';
import AssessmentProgress from './AssessmentProgress';
import QuestionCard from './QuestionCard';
import AssessmentResults from './AssessmentResults';

const Assessment = () => {
  const [state, setState] = useState<AssessmentState>({
    currentSection: AssessmentSection.INTRO,
    currentQuestionIndex: 0,
    answers: [],
    startTime: new Date(),
    sectionStartTime: new Date(),
    isComplete: false
  });

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [results, setResults] = useState<ResultsType | null>(null);

  // Timer effect
  useEffect(() => {
    if (state.currentSection === AssessmentSection.INTRO || state.isComplete) return;

    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - state.startTime.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [state.startTime, state.currentSection, state.isComplete]);

  const startAssessment = () => {
    const now = new Date();
    setState(prev => ({
      ...prev,
      currentSection: AssessmentSection.PSYCHOMETRIC,
      startTime: now,
      sectionStartTime: now
    }));
  };

  const handleAnswer = (answer: Answer) => {
    setState(prev => {
      const existingIndex = prev.answers.findIndex(a => a.questionId === answer.questionId);
      const newAnswers = [...prev.answers];
      
      if (existingIndex >= 0) {
        newAnswers[existingIndex] = answer;
      } else {
        newAnswers.push(answer);
      }

      return {
        ...prev,
        answers: newAnswers
      };
    });
  };

  const goToNext = () => {
    const currentQuestion = ASSESSMENT_QUESTIONS[state.currentQuestionIndex];
    const nextIndex = state.currentQuestionIndex + 1;

    if (nextIndex >= ASSESSMENT_QUESTIONS.length) {
      // Assessment complete
      const assessmentResults = AssessmentEngine.calculateResults(state.answers);
      setResults(assessmentResults);
      setState(prev => ({
        ...prev,
        currentSection: AssessmentSection.RESULTS,
        isComplete: true
      }));
      return;
    }

    const nextQuestion = ASSESSMENT_QUESTIONS[nextIndex];
    const newSection = nextQuestion.section;
    const sectionChanged = currentQuestion.section !== newSection;

    setState(prev => ({
      ...prev,
      currentQuestionIndex: nextIndex,
      currentSection: newSection,
      sectionStartTime: sectionChanged ? new Date() : prev.sectionStartTime
    }));
  };

  const goToPrevious = () => {
    if (state.currentQuestionIndex > 0) {
      const prevIndex = state.currentQuestionIndex - 1;
      const prevQuestion = ASSESSMENT_QUESTIONS[prevIndex];
      const currentQuestion = ASSESSMENT_QUESTIONS[state.currentQuestionIndex];
      const sectionChanged = currentQuestion.section !== prevQuestion.section;

      setState(prev => ({
        ...prev,
        currentQuestionIndex: prevIndex,
        currentSection: prevQuestion.section,
        sectionStartTime: sectionChanged ? new Date() : prev.sectionStartTime
      }));
    }
  };

  const restartAssessment = () => {
    const now = new Date();
    setState({
      currentSection: AssessmentSection.INTRO,
      currentQuestionIndex: 0,
      answers: [],
      startTime: now,
      sectionStartTime: now,
      isComplete: false
    });
    setResults(null);
    setTimeElapsed(0);
  };

  // Get completed sections
  const getCompletedSections = (): AssessmentSection[] => {
    const sections: AssessmentSection[] = [];
    const currentQuestionSection = ASSESSMENT_QUESTIONS[state.currentQuestionIndex]?.section;
    
    if (currentQuestionSection !== AssessmentSection.PSYCHOMETRIC) {
      sections.push(AssessmentSection.PSYCHOMETRIC);
    }
    if (currentQuestionSection === AssessmentSection.WISCAR || state.isComplete) {
      sections.push(AssessmentSection.TECHNICAL);
    }
    if (state.isComplete) {
      sections.push(AssessmentSection.WISCAR);
    }

    return sections;
  };

  // Render different sections
  if (state.currentSection === AssessmentSection.INTRO) {
    return <AssessmentIntro onStartAssessment={startAssessment} />;
  }

  if (state.currentSection === AssessmentSection.RESULTS && results) {
    return <AssessmentResults results={results} onRestart={restartAssessment} />;
  }

  // Render assessment questions
  const currentQuestion = ASSESSMENT_QUESTIONS[state.currentQuestionIndex];
  const currentAnswer = state.answers.find(a => a.questionId === currentQuestion.id);
  const completedSections = getCompletedSections();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <AssessmentProgress
        currentSection={state.currentSection}
        currentQuestionIndex={state.currentQuestionIndex}
        totalQuestions={ASSESSMENT_QUESTIONS.length}
        sectionsCompleted={completedSections}
        timeElapsed={timeElapsed}
      />
      
      <div className="pt-32">
        <QuestionCard
          question={currentQuestion}
          currentAnswer={currentAnswer}
          onAnswer={handleAnswer}
          onNext={goToNext}
          onPrevious={goToPrevious}
          isFirst={state.currentQuestionIndex === 0}
          isLast={state.currentQuestionIndex === ASSESSMENT_QUESTIONS.length - 1}
          questionNumber={state.currentQuestionIndex + 1}
          totalQuestions={ASSESSMENT_QUESTIONS.length}
        />
      </div>
    </div>
  );
};

export default Assessment;