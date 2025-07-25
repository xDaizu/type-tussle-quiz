import React, { useState } from 'react';
import { Menu, Trophy, Settings, Info } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Badge } from '@/shared/components/ui/badge';

interface ScoreDisplayProps {
  round: number;
  score: number;
  totalRounds: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ round, score, totalRounds }) => {
  const [gameMode, setGameMode] = useState('Classic');
  
  const scorePercentage = totalRounds > 0 ? Math.round((score / totalRounds) * 100) : 0;
  const currentPercentage = round > 1 ? Math.round((score / (round - 1)) * 100) : 0;

  return (
    <div className="bg-gradient-to-r from-card/95 to-card/90 backdrop-blur-sm border-b border-border/50 shadow-card-inset">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Burger Menu */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-10 w-10 p-0 hover:bg-primary/10 hover:text-primary transition-colors rounded-xl"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 shadow-card">
                <DropdownMenuLabel className="text-primary font-semibold">
                  Game Mode
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setGameMode('Classic')}
                  className={gameMode === 'Classic' ? 'bg-primary/10 text-primary' : ''}
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  Classic Mode
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setGameMode('Speed')}
                  className={gameMode === 'Speed' ? 'bg-primary/10 text-primary' : ''}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Speed Mode
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setGameMode('Expert')}
                  className={gameMode === 'Expert' ? 'bg-primary/10 text-primary' : ''}
                >
                  <Info className="mr-2 h-4 w-4" />
                  Expert Mode
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="hidden sm:block">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {gameMode}
              </Badge>
            </div>
          </div>

          {/* Center - Game Title (hidden on mobile) */}
          <div className="hidden md:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Type Tussle Quiz
            </h1>
          </div>

          {/* Right side - Score and Round Info */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Round Progress */}
            <div className="text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                Round
              </div>
              <div className="text-lg font-bold text-foreground">
                {round} <span className="text-muted-foreground text-sm">/ {totalRounds}</span>
              </div>
            </div>

            {/* Score Display */}
            <div className="text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                Score
              </div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-bold text-foreground">
                  {score} <span className="text-muted-foreground text-sm">/ {totalRounds}</span>
                </div>
                {round > 1 && (
                  <Badge 
                    variant={currentPercentage >= 80 ? "default" : currentPercentage >= 60 ? "secondary" : "destructive"}
                    className="text-xs px-1.5 py-0.5 h-5"
                  >
                    {currentPercentage}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Progress Bar (hidden on mobile) */}
            <div className="hidden sm:block w-16 lg:w-24">
              <div className="text-xs text-muted-foreground mb-1 text-center">Progress</div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
                  style={{ width: `${(round / totalRounds) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay; 