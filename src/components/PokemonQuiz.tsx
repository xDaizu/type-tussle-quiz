import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, RotateCcw, Trophy } from 'lucide-react';
import PokemonCard from './PokemonCard';
import BattleArena from './BattleArena';
import ScoreDisplay from './ScoreDisplay';

// Pokemon data
export const POKEMON = [
  {
    id: 'charmander',
    name: 'Charmander',
    type: 'fire',
    sprite: '/src/assets/charmander.png'
  },
  {
    id: 'squirtle',
    name: 'Squirtle',
    type: 'water',
    sprite: '/src/assets/squirtle.png'
  },
  {
    id: 'chikorita',
    name: 'Chikorita',
    type: 'grass',
    sprite: '/src/assets/chikorita.png'
  },
  {
    id: 'pikachu',
    name: 'Pikachu',
    type: 'electric',
    sprite: '/src/assets/pikachu.png'
  }
] as const;

// Type effectiveness chart
const TYPE_EFFECTIVENESS = {
  fire: {
    grass: 2,    // Fire > Grass
    water: 0.5,  // Fire < Water
    fire: 1,     // Fire = Fire
    electric: 1  // Fire = Electric
  },
  water: {
    fire: 2,     // Water > Fire
    grass: 0.5,  // Water < Grass
    water: 1,    // Water = Water
    electric: 1  // Water = Electric
  },
  grass: {
    water: 2,    // Grass > Water
    fire: 0.5,   // Grass < Fire
    grass: 1,    // Grass = Grass
    electric: 1  // Grass = Electric
  },
  electric: {
    water: 2,    // Electric > Water
    fire: 1,     // Electric = Fire
    grass: 1,    // Electric = Grass
    electric: 1  // Electric = Electric
  }
} as const;

type Pokemon = typeof POKEMON[number];
type EffectivenessType = 0 | 0.5 | 1 | 2;

const PokemonQuiz = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [attacker, setAttacker] = useState<Pokemon | null>(null);
  const [defender, setDefender] = useState<Pokemon | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState<{correct: boolean, effectiveness: EffectivenessType} | null>(null);

  const generateBattle = () => {
    const randomAttacker = POKEMON[Math.floor(Math.random() * POKEMON.length)];
    const randomDefender = POKEMON[Math.floor(Math.random() * POKEMON.length)];
    setAttacker(randomAttacker);
    setDefender(randomDefender);
    setShowResult(null);
  };

  useEffect(() => {
    generateBattle();
  }, []);

  const handleAnswer = (selectedEffectiveness: EffectivenessType) => {
    if (!attacker || !defender || showResult) return;

    const correctEffectiveness = TYPE_EFFECTIVENESS[attacker.type as keyof typeof TYPE_EFFECTIVENESS][defender.type as keyof typeof TYPE_EFFECTIVENESS[typeof attacker.type]];
    const isCorrect = selectedEffectiveness === correctEffectiveness;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult({ correct: isCorrect, effectiveness: correctEffectiveness });

    setTimeout(() => {
      if (currentRound >= 3) {
        setGameOver(true);
      } else {
        setCurrentRound(currentRound + 1);
        generateBattle();
      }
    }, 2000);
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
      case 2: return 'super-effective';
      case 0.5: return 'not-very-effective';
      case 0: return 'no-effect';
      default: return 'normal-effective';
    }
  };

  const getEffectivenessText = (effectiveness: EffectivenessType) => {
    switch (effectiveness) {
      case 2: return 'Super Effective!';
      case 0.5: return 'Not Very Effective...';
      case 0: return 'It has no effect...';
      default: return 'Normal effectiveness';
    }
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-arena-gradient flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center shadow-card animate-bounce-in">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-accent" />
          <h1 className="text-3xl font-bold mb-4">Quiz Complete!</h1>
          <p className="text-xl mb-6">
            Your Score: <span className="font-bold text-primary">{score}/3</span>
          </p>
          <div className="mb-6">
            {score === 3 && (
              <Badge className="bg-super-effective text-white text-lg py-2 px-4">
                Perfect Score! 🎉
              </Badge>
            )}
            {score === 2 && (
              <Badge className="bg-accent text-accent-foreground text-lg py-2 px-4">
                Great Job! 👏
              </Badge>
            )}
            {score <= 1 && (
              <Badge className="bg-not-very-effective text-white text-lg py-2 px-4">
                Keep Practicing! 💪
              </Badge>
            )}
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
        <ScoreDisplay round={currentRound} score={score} totalRounds={3} />
        
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
          </Card>
        )}

        {!showResult && (
          <Card className="mt-6 p-6 shadow-card">
            <h2 className="text-xl font-semibold mb-4 text-center">
              How effective is this attack?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleAnswer(2)}
                className="h-16 text-lg font-semibold border-super-effective hover:bg-super-effective hover:text-white transition-all duration-200"
              >
                Super Effective
                <div className="text-sm opacity-75">(×2)</div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleAnswer(1)}
                className="h-16 text-lg font-semibold border-normal-effective hover:bg-normal-effective hover:text-white transition-all duration-200"
              >
                Normal
                <div className="text-sm opacity-75">(×1)</div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleAnswer(0.5)}
                className="h-16 text-lg font-semibold border-not-very-effective hover:bg-not-very-effective hover:text-white transition-all duration-200"
              >
                Not Very Effective
                <div className="text-sm opacity-75">(×0.5)</div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleAnswer(0)}
                className="h-16 text-lg font-semibold border-no-effect hover:bg-no-effect hover:text-white transition-all duration-200"
              >
                No Effect
                <div className="text-sm opacity-75">(×0)</div>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PokemonQuiz;