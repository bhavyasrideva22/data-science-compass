import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResults as ResultsType } from '@/types/assessment';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Brain, 
  Code, 
  Users,
  CheckCircle,
  AlertCircle,
  XCircle,
  Download,
  Share2
} from 'lucide-react';

interface AssessmentResultsProps {
  results: ResultsType;
  onRestart: () => void;
}

const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationIcon = (shouldPursue: string) => {
    switch (shouldPursue) {
      case 'yes':
        return <CheckCircle className="w-6 h-6 text-success" />;
      case 'maybe':
        return <AlertCircle className="w-6 h-6 text-warning" />;
      case 'no':
        return <XCircle className="w-6 h-6 text-destructive" />;
      default:
        return <Target className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getRecommendationColor = (shouldPursue: string) => {
    switch (shouldPursue) {
      case 'yes':
        return 'default';
      case 'maybe':
        return 'secondary';
      case 'no':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const RadarChart = () => {
    const scores = results.wiscarScores;
    const data = [
      { label: 'Will', value: scores.will },
      { label: 'Interest', value: scores.interest },
      { label: 'Skill', value: scores.skill },
      { label: 'Cognitive', value: scores.cognitive },
      { label: 'Ability', value: scores.ability },
      { label: 'Real-World', value: scores.realWorld }
    ];

    return (
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{item.label}</span>
              <span className={`font-semibold ${getScoreColor(item.value)}`}>
                {item.value}%
              </span>
            </div>
            <Progress value={item.value} className="h-2" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            {getRecommendationIcon(results.recommendation.shouldPursue)}
            <h1 className="text-4xl font-bold">Your Results Are In!</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here's your personalized Data Science career assessment based on psychological, technical, and readiness factors.
          </p>
        </div>

        {/* Main Recommendation Card */}
        <Card className="mb-8 shadow-strong border-2 border-primary/30">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              {getRecommendationIcon(results.recommendation.shouldPursue)}
              <CardTitle className="text-2xl">
                {results.recommendation.shouldPursue === 'yes' && 'You\'re Ready for Data Science!'}
                {results.recommendation.shouldPursue === 'maybe' && 'You Have Potential - With Preparation'}
                {results.recommendation.shouldPursue === 'no' && 'Consider Alternative Paths'}
              </CardTitle>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Badge variant={getRecommendationColor(results.recommendation.shouldPursue)} className="text-lg px-4 py-2">
                {results.recommendation.confidence}% Confidence
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                Overall Score: {results.overallScore}/100
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-center text-lg text-muted-foreground leading-relaxed">
              {results.recommendation.reasoning}
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Score Breakdown */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Score Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="font-medium">Psychometric Fit</span>
                  </div>
                  <span className={`font-bold text-lg ${getScoreColor(results.psychometricScore)}`}>
                    {results.psychometricScore}%
                  </span>
                </div>
                <Progress value={results.psychometricScore} className="h-2" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-secondary" />
                    <span className="font-medium">Technical Readiness</span>
                  </div>
                  <span className={`font-bold text-lg ${getScoreColor(results.technicalScore)}`}>
                    {results.technicalScore}%
                  </span>
                </div>
                <Progress value={results.technicalScore} className="h-2" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="font-medium">Overall Readiness</span>
                  </div>
                  <span className={`font-bold text-lg ${getScoreColor(results.overallScore)}`}>
                    {results.overallScore}%
                  </span>
                </div>
                <Progress value={results.overallScore} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Framework */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>WISCAR Framework Analysis</CardTitle>
              <p className="text-sm text-muted-foreground">
                Six key dimensions of career readiness
              </p>
            </CardHeader>
            <CardContent>
              <RadarChart />
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-warning" />
                Growth Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-warning mt-1 flex-shrink-0" />
                    <span className="text-sm">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="shadow-medium mb-8">
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              {results.recommendation.nextSteps.map((step, index) => (
                <li key={index} className="text-sm">{step}</li>
              ))}
            </ol>
            
            {results.recommendation.alternativePaths && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Alternative Career Paths to Consider:</h4>
                <div className="flex flex-wrap gap-2">
                  {results.recommendation.alternativePaths.map((path, index) => (
                    <Badge key={index} variant="outline">{path}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Career Matches */}
        <Card className="shadow-medium mb-8">
          <CardHeader>
            <CardTitle>Top Career Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.recommendation.careerMatches.map((career, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{career.title}</h4>
                    <Badge variant="secondary">{career.matchScore}% Match</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                  <div className="grid md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <h5 className="font-medium mb-1">Requirements:</h5>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {career.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-1">Growth Path:</h5>
                      <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                        {career.growthPath.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </Button>
          <Button variant="outline" size="lg" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Results
          </Button>
          <Button variant="secondary" size="lg" onClick={onRestart}>
            Take Assessment Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;