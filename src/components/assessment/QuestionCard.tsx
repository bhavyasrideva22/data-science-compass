import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Question, Answer } from '@/types/assessment';
import { ChevronRight } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  currentAnswer?: Answer;
  onAnswer: (answer: Answer) => void;
  onNext: () => void;
  onPrevious?: () => void;
  isFirst: boolean;
  isLast: boolean;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard = ({
  question,
  currentAnswer,
  onAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  questionNumber,
  totalQuestions
}: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(
    currentAnswer?.value ?? null
  );

  const handleAnswer = (value: number, rawAnswer?: string) => {
    setSelectedValue(value);
    onAnswer({
      questionId: question.id,
      value,
      rawAnswer
    });
  };

  const renderLikertScale = () => {
    const labels = question.likertLabels || ['Strongly Disagree', 'Strongly Agree'];
    const values = [0, 1, 2, 3, 4];
    const descriptions = ['', 'Disagree', 'Neutral', 'Agree', ''];

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>{labels[0]}</span>
          <span>{labels[1]}</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {values.map((value) => (
            <div key={value} className="text-center">
              <button
                onClick={() => handleAnswer(value)}
                className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                  selectedValue === value
                    ? 'bg-primary border-primary text-primary-foreground shadow-medium'
                    : 'bg-card border-border hover:border-primary/50 hover:shadow-soft'
                }`}
              >
                {value + 1}
              </button>
              {descriptions[value] && (
                <div className="mt-1 text-xs text-muted-foreground">
                  {descriptions[value]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMultipleChoice = () => {
    return (
      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index, option)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
              selectedValue === index
                ? 'bg-primary/5 border-primary text-primary shadow-soft'
                : 'bg-card border-border hover:border-primary/30 hover:shadow-soft'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                selectedValue === index
                  ? 'bg-primary border-primary'
                  : 'border-muted-foreground'
              }`}>
                {selectedValue === index && (
                  <div className="w-full h-full rounded-full bg-primary-foreground scale-50" />
                )}
              </div>
              <span className="text-sm">{option}</span>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const renderScenarioQuestion = () => {
    return (
      <div className="space-y-6">
        {question.scenario && (
          <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-secondary">
            <h4 className="font-medium text-secondary mb-2">Scenario</h4>
            <p className="text-sm text-muted-foreground">{question.scenario}</p>
          </div>
        )}
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index, option)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                selectedValue === index
                  ? 'bg-secondary/5 border-secondary text-secondary shadow-soft'
                  : 'bg-card border-border hover:border-secondary/30 hover:shadow-soft'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1 ${
                  selectedValue === index
                    ? 'bg-secondary border-secondary'
                    : 'border-muted-foreground'
                }`}>
                  {selectedValue === index && (
                    <div className="w-full h-full rounded-full bg-secondary-foreground scale-50" />
                  )}
                </div>
                <span className="text-sm">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-medium">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline">
              Question {questionNumber} of {totalQuestions}
            </Badge>
            <Badge variant="secondary">
              {question.section.charAt(0).toUpperCase() + question.section.slice(1)}
            </Badge>
          </div>
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {question.type === 'likert' && renderLikertScale()}
          {question.type === 'multiple-choice' && renderMultipleChoice()}
          {question.type === 'scenario' && renderScenarioQuestion()}
          
          <div className="flex justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={isFirst}
            >
              Previous
            </Button>
            
            <Button
              onClick={onNext}
              disabled={selectedValue === null}
              className="min-w-[120px]"
            >
              {isLast ? 'View Results' : 'Next'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionCard;