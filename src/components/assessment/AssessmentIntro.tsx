import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, TrendingUp, Brain, Code, Target } from 'lucide-react';

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

const AssessmentIntro = ({ onStartAssessment }: AssessmentIntroProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Career Assessment</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            Are You Ready for Data Science?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover your potential in the field of Data Science through our comprehensive assessment. 
            Get personalized insights about your technical readiness, personality fit, and career alignment.
          </p>
        </div>

        {/* Assessment Overview Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Psychometric Analysis</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Evaluate your personality traits, interests, and work preferences using scientifically validated frameworks.
              </p>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Technical Readiness</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Assess your current knowledge and aptitude for data science concepts, tools, and methodologies.
              </p>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">WISCAR Framework</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Comprehensive evaluation across six key dimensions: Will, Interest, Skill, Cognitive, Ability, and Real-world alignment.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What You'll Get */}
        <Card className="shadow-medium mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center mb-8">What You'll Receive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Personalized Career Recommendation</h3>
                    <p className="text-sm text-muted-foreground">
                      Clear guidance on whether Data Science is the right career path for you, with confidence scores and reasoning.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Skill Gap Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Detailed breakdown of your current strengths and areas for improvement with actionable next steps.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Career Path Suggestions</h3>
                    <p className="text-sm text-muted-foreground">
                      Curated list of data science roles that match your profile, from entry-level to advanced positions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">25-30</div>
                  <div className="text-sm text-muted-foreground">Minutes to Complete</div>
                </div>

                <div className="space-y-4">
                  <Badge variant="secondary" className="w-full justify-center py-2">
                    <Clock className="w-4 h-4 mr-2" />
                    Save and Resume Anytime
                  </Badge>
                  <Badge variant="outline" className="w-full justify-center py-2">
                    Mobile-Friendly Design
                  </Badge>
                  <Badge variant="outline" className="w-full justify-center py-2">
                    Instant Results
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career Paths Preview */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-8">Data Science Career Paths</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              'Data Scientist',
              'ML Engineer',
              'Data Analyst',
              'BI Developer',
              'AI Researcher'
            ].map((role) => (
              <div key={role} className="bg-primary/5 rounded-lg p-4 text-center border border-primary/10">
                <div className="font-medium text-sm">{role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-md mx-auto gradient-hero text-white shadow-strong">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Ready to Begin?</h3>
              <p className="mb-6 text-sm opacity-90">
                Take the first step toward your Data Science career
              </p>
              <Button 
                onClick={onStartAssessment}
                size="lg"
                variant="secondary"
                className="w-full bg-white text-primary hover:bg-white/90 glow"
              >
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssessmentIntro;