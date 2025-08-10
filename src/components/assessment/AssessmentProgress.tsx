import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AssessmentSection } from '@/types/assessment';
import { SECTION_INFO } from '@/data/questions';
import { Clock, CheckCircle } from 'lucide-react';

interface AssessmentProgressProps {
  currentSection: AssessmentSection;
  currentQuestionIndex: number;
  totalQuestions: number;
  sectionsCompleted: AssessmentSection[];
  timeElapsed: number;
}

const AssessmentProgress = ({
  currentSection,
  currentQuestionIndex,
  totalQuestions,
  sectionsCompleted,
  timeElapsed
}: AssessmentProgressProps) => {
  const progressPercentage = Math.round((currentQuestionIndex / totalQuestions) * 100);
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  const sections = [
    AssessmentSection.PSYCHOMETRIC,
    AssessmentSection.TECHNICAL,
    AssessmentSection.WISCAR
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Data Science Career Assessment</h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>
            </div>
            <Badge variant="outline">
              {progressPercentage}% Complete
            </Badge>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mb-4">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            <span>{progressPercentage}% Complete</span>
          </div>
        </div>

        {/* Section Progress */}
        <div className="grid grid-cols-3 gap-2">
          {sections.map((section) => {
            const sectionInfo = SECTION_INFO[section];
            const isCompleted = sectionsCompleted.includes(section);
            const isCurrent = currentSection === section;
            
            return (
              <Card 
                key={section}
                className={`transition-all duration-200 ${
                  isCurrent
                    ? 'bg-primary/5 border-primary/30 shadow-soft'
                    : isCompleted
                    ? 'bg-success/5 border-success/30'
                    : 'bg-muted/30'
                }`}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{sectionInfo.icon}</span>
                    {isCompleted && (
                      <CheckCircle className="w-4 h-4 text-success" />
                    )}
                  </div>
                  <h4 className="text-xs font-medium leading-tight mb-1">
                    {sectionInfo.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {sectionInfo.estimatedTime}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AssessmentProgress;