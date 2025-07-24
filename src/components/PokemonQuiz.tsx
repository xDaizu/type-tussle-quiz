import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, RotateCcw } from 'lucide-react';

import BattleArena from './BattleArena';
import ScoreDisplay from './ScoreDisplay';
import { getTypeEffectiveness, Effectiveness, getResultPhrase } from '@/lib/utils';
import { PokemonType } from '@/types/PokemonType';
import { PokemonProvider } from '@/lib/PokemonProvider';
import { quizAnswerOptions } from '@/lib/quizAnswerOptions';
import QuizAnswerButton from './QuizAnswerButton';
import { FeedbackProvider } from '@/lib/FeedbackProvider';


type Pokemon = ReturnType<typeof PokemonProvider.getAll>[number];
type EffectivenessType = Effectiveness;

const PokemonQuiz = ({ totalRounds = 10 }: { totalRounds?: number }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [attacker, setAttacker] = useState<Pokemon | null>(null);
  const [defender, setDefender] = useState<Pokemon | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState<{correct: boolean, effectiveness: EffectivenessType} | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const skipEnabled = useRef(false);

  const pokemonList = PokemonProvider.getAll();

  const getRandomType = (): PokemonType => {
    const types = Object.values(PokemonType);
    return types[Math.floor(Math.random() * types.length)];
  };

  const generateBattle = () => {
    let randomAttacker = null;
    let randomDefender = null;
    let attackerType: PokemonType;
    let defenderType: PokemonType;

    // Keep trying until we get a valid attacker
    while (!randomAttacker) {
      try {
        attackerType = getRandomType();
        randomAttacker = PokemonProvider.getRandomByType(attackerType);
      } catch (e) {
        // Try again
      }
    }

    // Keep trying until we get a valid defender
    while (!randomDefender) {
      try {
        defenderType = getRandomType();
        randomDefender = PokemonProvider.getRandomByType(defenderType);
      } catch (e) {
        // Try again
      }
    }

    setAttacker(randomAttacker);
    setDefender(randomDefender);
    setShowResult(null);
  };

  useEffect(() => {
    generateBattle();
  }, []);

  useEffect(() => {
    if (!showResult) return;

    skipEnabled.current = false;
    const enableSkip = setTimeout(() => { skipEnabled.current = true; }, 50);

    const advance = () => {
      if (!skipEnabled.current) return;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (currentRound >= totalRounds) {
        setGameOver(true);
      } else {
        setCurrentRound(currentRound + 1);
        generateBattle();
      }
      setShowResult(null); // Prevent double advance
    };

    // Set up timeout
    timeoutRef.current = setTimeout(advance, showResult.correct ? 1000 : 2000);

    // Set up click-to-skip
    const handleClick = () => advance();
    window.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      window.removeEventListener('click', handleClick);
      clearTimeout(enableSkip);
    };
  }, [showResult, currentRound, totalRounds]);

  const handleAnswer = (selectedEffectiveness: EffectivenessType) => {
    if (!attacker || !defender || showResult) return;

    const correctEffectiveness = getTypeEffectiveness(attacker.type as PokemonType, defender.type as PokemonType);
    const isCorrect = selectedEffectiveness === correctEffectiveness;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setShowResult({ correct: isCorrect, effectiveness: correctEffectiveness });
    // Timeout and click-to-skip handled in useEffect
  };

  const resetGame = () => {
    setCurrentRound(1);
    setScore(0);
    setGameOver(false);
    setShowResult(null);
    generateBattle();
  };

  const getEffectivenessColor = (effectiveness: EffectivenessType) => {
    switch (effectiveness) {
      case Effectiveness.SuperEffective: return 'super-effective';
      case Effectiveness.NotVeryEffective: return 'not-very-effective';
      case Effectiveness.NoEffect: return 'no-effect';
      default: return 'normal-effective';
    }
  };

  const getEffectivenessText = (effectiveness: EffectivenessType) => {
    switch (effectiveness) {
      case Effectiveness.SuperEffective: return 'Super Effective!';
      case Effectiveness.NotVeryEffective: return 'Not Very Effective...';
      case Effectiveness.NoEffect: return 'It has no effect...';
      default: return 'Normal effectiveness';
    }
  };

  if (gameOver) {
    const resultPhrase = getResultPhrase(score, 10);
    return (
      <div className="min-h-screen bg-arena-gradient flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center shadow-card animate-bounce-in">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-accent" />
          <h1 className="text-3xl font-bold mb-4">Quiz Complete!</h1>
          <p className="text-xl mb-6">
            Your Score: <span className="font-bold text-primary">{score}/10</span>
          </p>
          <div className="mb-6">
            <Badge className="bg-super-effective text-white text-lg py-2 px-4">
              {resultPhrase}
            </Badge>
          </div>
          <Button onClick={resetGame} className="w-full" size="lg">
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-arena-gradient p-4">
      <div className="max-w-4xl mx-auto">
        <ScoreDisplay round={currentRound} score={score} totalRounds={totalRounds} />
        
        {attacker && defender && (
          <BattleArena 
            attacker={attacker} 
            defender={defender}
            showResult={showResult}
          />
        )}

        {showResult && (
          <Card className="mt-6 p-6 text-center shadow-card animate-bounce-in">
            <div className={`text-2xl font-bold mb-2 text-${getEffectivenessColor(showResult.effectiveness)}`}>
              {showResult.correct ? '✅ Correct!' : '❌ Wrong!'}
            </div>
            <p className="text-lg">
              {getEffectivenessText(showResult.effectiveness)} (×{showResult.effectiveness})
            </p>
            <p className="text-m">
              {attacker ? FeedbackProvider.getFeedback(attacker.type, showResult.correct ? 'pass' : 'fail') : ''}
            </p>
          </Card>
        )}

        {!showResult && (
          <Card className="mt-2 p-2 shadow-card border-0">
            <h2 className="text-l font-bold mb-2 text-center text-foreground">
              How effective is this attack?
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {quizAnswerOptions.map(option => (
                <QuizAnswerButton
                  key={option.effectiveness}
                  label={option.label}
                  multiplier={option.multiplier}
                  onClick={() => handleAnswer(option.effectiveness)}
                  colorClass={option.colorClass}
                  style={option.style}
                  textColorClass={option.textColorClass}
                  ringClass={option.ringClass}
                  onMouseOverBoxShadow={option.onMouseOverBoxShadow}
                  onMouseOutBoxShadow={option.onMouseOutBoxShadow}
                />
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PokemonQuiz;