import React from 'react';
import { Card } from '@/shared/components/ui/ui/card';
import { Badge } from '@/shared/components/ui/ui/badge';
import { Trophy, RotateCcw } from 'lucide-react';
import { Button } from '@/shared/components/ui/ui/button';

interface QuizGameOverScreenProps {
  score: number;
  totalRounds: number;
  resultPhrase: string;
  onReset: () => void;
}

const QuizGameOverScreen: React.FC<QuizGameOverScreenProps> = ({ score, totalRounds, resultPhrase, onReset }) => (
  <Card className="p-8 max-w-md w-full text-center shadow-card animate-bounce-in">
    <Trophy className="w-16 h-16 mx-auto mb-4 text-accent" />
    <h1 className="text-3xl font-bold mb-4">Quiz Complete!</h1>
    <p className="text-xl mb-6">
      Your Score: <span className="font-bold text-primary">{score}/{totalRounds}</span>
    </p>
    <div className="mb-6">
      <Badge className="bg-super-effective text-white text-lg py-2 px-4">
        {resultPhrase}
      </Badge>
    </div>
    <Button onClick={onReset} className="w-full" size="lg">
      <RotateCcw className="w-4 h-4 mr-2" />
      Play Again
    </Button>
  </Card>
);

export default QuizGameOverScreen; 