import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, RotateCcw, Trophy } from 'lucide-react';
import { PokemonType } from '@/types/PokemonType';
import PokemonCard from './PokemonCard';
import BattleArena from './BattleArena';
import ScoreDisplay from './ScoreDisplay';
import { getTypeEffectiveness, Effectiveness, getResultPhrase } from '@/lib/utils';
import { PokemonProvider } from '@/lib/PokemonProvider';


type Pokemon = ReturnType<typeof PokemonProvider.getAll>[number];
type EffectivenessType = Effectiveness;

const PokemonQuiz = ({ totalRounds = 10 }: { totalRounds?: number }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [attacker, setAttacker] = useState<Pokemon | null>(null);
  const [defender, setDefender] = useState<Pokemon | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState<{correct: boolean, effectiveness: EffectivenessType} | null>(null);

  const pokemonList = PokemonProvider.getAll();

  const generateBattle = () => {
    const randomAttacker = PokemonProvider.getRandom();
    const randomDefender = PokemonProvider.getRandom();
    setAttacker(randomAttacker);
    setDefender(randomDefender);
    setShowResult(null);
  };

  useEffect(() => {
    generateBattle();
  }, []);

  const handleAnswer = (selectedEffectiveness: EffectivenessType) => {
    if (!attacker || !defender || showResult) return;

    const correctEffectiveness = getTypeEffectiveness(attacker.type, defender.type);
    const isCorrect = selectedEffectiveness === correctEffectiveness;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setShowResult({ correct: isCorrect, effectiveness: correctEffectiveness });

    setTimeout(() => {
      if (currentRound >= totalRounds) {
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
          </Card>
        )}

        {!showResult && (
          <Card className="mt-8 p-8 shadow-card border-0">
            <h2 className="text-l font-bold mb-2 text-center text-foreground">
              How effective is this attack?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => handleAnswer(Effectiveness.SuperEffective)}
                className="group relative h-20 text-lg font-bold rounded-2xl border-2 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-300/40"
                style={{
                  background: 'linear-gradient(135deg, rgba(178,255,214,0.7) 0%, rgba(102,232,180,0.6) 100%)',
                  backdropFilter: 'blur(8px)',
                  borderColor: 'rgba(102,232,180,0.5)',
                }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(102,232,180,0.25)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = ''}
              >
                <div className="flex flex-col items-center justify-center h-full text-white drop-shadow-md">
                  <span className="text-lg font-bold">Super Effective</span>
                  <span className="text-sm opacity-75">(×2)</span>
                </div>
              </button>
              <button
                onClick={() => handleAnswer(Effectiveness.Normal)}
                className="group relative h-20 text-lg font-bold rounded-2xl border-2 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300/40"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(220,220,220,0.5) 100%)',
                  backdropFilter: 'blur(8px)',
                  borderColor: 'rgba(200,200,200,0.5)',
                }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(180,180,180,0.18)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = ''}
              >
                <div className="flex flex-col items-center justify-center h-full text-black drop-shadow-md">
                  <span className="text-lg font-bold">Normal</span>
                  <span className="text-sm opacity-75">(×1)</span>
                </div>
              </button>
              <button
                onClick={() => handleAnswer(Effectiveness.NotVeryEffective)}
                className="group relative h-20 text-lg font-bold rounded-2xl border-2 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300/40"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,183,183,0.7) 0%, rgba(255,127,127,0.6) 100%)',
                  backdropFilter: 'blur(8px)',
                  borderColor: 'rgba(255,127,127,0.5)',
                }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(255,127,127,0.22)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = ''}
              >
                <div className="flex flex-col items-center justify-center h-full text-white drop-shadow-md">
                  <span className="text-lg font-bold">Not Very Effective</span>
                  <span className="text-sm opacity-75">(×0.5)</span>
                </div>
              </button>
              <button
                onClick={() => handleAnswer(Effectiveness.NoEffect)}
                className="group relative h-20 text-lg font-bold rounded-2xl border-2 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-700/40"
                style={{
                  background: 'linear-gradient(135deg, rgba(60,60,60,0.7) 0%, rgba(30,30,30,0.6) 100%)',
                  backdropFilter: 'blur(8px)',
                  borderColor: 'rgba(60,60,60,0.5)',
                }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(60,60,60,0.22)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = ''}
              >
                <div className="flex flex-col items-center justify-center h-full text-white drop-shadow-md">
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