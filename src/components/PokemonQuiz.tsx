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
          <Card className="mt-8 p-8 shadow-card border-0">
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground">
              How effective is this attack?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => handleAnswer(2)}
                className="group relative h-20 text-lg font-bold transition-all duration-300 rounded-2xl shadow-button hover:shadow-button-pressed active:shadow-button-pressed bg-gradient-to-br from-background to-muted border-2 border-super-effective/30 hover:border-super-effective/60 hover:from-super-effective/10 hover:to-super-effective/5"
              >
                <div className="flex flex-col items-center justify-center h-full text-super-effective group-hover:text-super-effective">
                  <span className="text-lg font-bold">Super Effective</span>
                  <span className="text-sm opacity-75">(×2)</span>
                </div>
              </button>
              <button
                onClick={() => handleAnswer(1)}
                className="group relative h-20 text-lg font-bold transition-all duration-300 rounded-2xl shadow-button hover:shadow-button-pressed active:shadow-button-pressed bg-gradient-to-br from-background to-muted border-2 border-normal-effective/30 hover:border-normal-effective/60 hover:from-normal-effective/10 hover:to-normal-effective/5"
              >
                <div className="flex flex-col items-center justify-center h-full text-normal-effective group-hover:text-normal-effective">
                  <span className="text-lg font-bold">Normal</span>
                  <span className="text-sm opacity-75">(×1)</span>
                </div>
              </button>
              <button
                onClick={() => handleAnswer(0.5)}
                className="group relative h-20 text-lg font-bold transition-all duration-300 rounded-2xl shadow-button hover:shadow-button-pressed active:shadow-button-pressed bg-gradient-to-br from-background to-muted border-2 border-not-very-effective/30 hover:border-not-very-effective/60 hover:from-not-very-effective/10 hover:to-not-very-effective/5"
              >
                <div className="flex flex-col items-center justify-center h-full text-not-very-effective group-hover:text-not-very-effective">
                  <span className="text-lg font-bold">Not Very Effective</span>
                  <span className="text-sm opacity-75">(×0.5)</span>
                </div>
              </button>
              <button
                onClick={() => handleAnswer(0)}
                className="group relative h-20 text-lg font-bold transition-all duration-300 rounded-2xl shadow-button hover:shadow-button-pressed active:shadow-button-pressed bg-gradient-to-br from-background to-muted border-2 border-no-effect/30 hover:border-no-effect/60 hover:from-no-effect/10 hover:to-no-effect/5"
              >
                <div className="flex flex-col items-center justify-center h-full text-no-effect group-hover:text-no-effect">
                  <span className="text-lg font-bold">No Effect</span>
                  <span className="text-sm opacity-75">(×0)</span>
                </div>
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PokemonQuiz;