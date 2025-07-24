import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ScoreDisplayProps {
  round: number;
  score: number;
  totalRounds: number;
}

const ScoreDisplay = ({ round, score, totalRounds }: ScoreDisplayProps) => {
  const progressValue = ((round - 1) / totalRounds) * 100;

  return (
    <Card className="p-2 mb-2 shadow-card">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Pokemon Type Quiz
          </h1>
          <p className="text-muted-foreground mt-1">
            Test your knowledge of type effectiveness!
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-xl font-bold text-primary">
              Round {round}/{totalRounds}
            </div>
            <Progress value={progressValue} className="w-24 mt-2" />
          </div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Score</div>
            <Badge variant="secondary" className="text-xl font-bold px-4 py-2">
              {score}/{round}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScoreDisplay;