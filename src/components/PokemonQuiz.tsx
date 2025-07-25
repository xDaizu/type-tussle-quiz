import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, RotateCcw } from 'lucide-react';
import BattleArena from './BattleArena';
import ScoreDisplay from './ScoreDisplay';
import { getResultPhrase, Effectiveness } from '@/lib/utils';
import { quizAnswerOptions } from '@/lib/quizAnswerOptions';
import QuizAnswerButton from './QuizAnswerButton';
import { FeedbackFlavourProvider } from '@/lib/FeedbackProvider';
import { useQuizGame } from '@/hooks/useQuizGame';
import { useQuizFeedback } from '@/hooks/useQuizFeedback';
import { useQuizTimer } from '@/hooks/useQuizTimer';
import { useQuizNavigation } from '@/hooks/useQuizNavigation';

const PokemonQuiz = ({ totalRounds = 10 }: { totalRounds?: number }) => {
  const game = useQuizGame(totalRounds);
  const feedback = useQuizFeedback(game.attacker, game.defender);
  const navigation = useQuizNavigation({
    currentRound: game.currentRound,
    totalRounds: game.totalRounds,
    setCurrentRound: game.setCurrentRound,
    setGameOver: game.setGameOver,
    generateBattle: game.generateBattle,
    resetGame: game.resetGame,
  });

  useQuizTimer({
    showResult: feedback.showResult,
    onAdvance: () => {
      if (feedback.showResult) {
        feedback.resetFeedback();
        navigation.advanceRound();
      }
    },
    currentRound: game.currentRound,
    totalRounds: game.totalRounds,
  });

  if (game.gameOver) {
    const resultPhrase = getResultPhrase(game.score, game.totalRounds);
    return (
      <div className="min-h-screen bg-arena-gradient flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center shadow-card animate-bounce-in">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-accent" />
          <h1 className="text-3xl font-bold mb-4">Quiz Complete!</h1>
          <p className="text-xl mb-6">
            Your Score: <span className="font-bold text-primary">{game.score}/{game.totalRounds}</span>
          </p>
          <div className="mb-6">
            <Badge className="bg-super-effective text-white text-lg py-2 px-4">
              {resultPhrase}
            </Badge>
          </div>
          <Button onClick={navigation.restartGame} className="w-full" size="lg">
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
        </Card>
      </div>
    );
  }

  const getEffectivenessText = (effectiveness: Effectiveness) => {
    switch (effectiveness) {
      case Effectiveness.SuperEffective: return 'Super Effective!';
      case Effectiveness.NotVeryEffective: return 'Not Very Effective...';
      case Effectiveness.NoEffect: return 'It has no effect...';
      default: return 'Normal effectiveness';
    }
  };

  return (
    <div className="min-h-screen bg-arena-gradient p-4">
      <div className="max-w-4xl mx-auto">
        <ScoreDisplay round={game.currentRound} score={game.score} totalRounds={game.totalRounds} />
        {game.attacker && game.defender && (
          <BattleArena attacker={game.attacker} defender={game.defender} showResult={feedback.showResult} />
        )}
        <div className="min-h-[180px] overflow-hidden transition-all duration-300">
          {feedback.showResult && (
            <Card className="mt-6 p-6 text-center shadow-card animate-bounce-in">
              <div className={`text-2xl font-bold mb-2 text-${feedback.showResult.correct ? 'super-effective' : 'not-very-effective'}`}>
                {feedback.showResult.correct ? '✅ Correct!' : '❌ Wrong!'}
              </div>
              <p id="effectiveness-text" className="text-lg">
                {feedback.showResult.correct ? (
                  (() => {
                    const correctOption = quizAnswerOptions.find(option => option.effectiveness === feedback.showResult.effectiveness);
                    return (
                      <span className={`font-bold inline-block px-3 py-1 rounded drop-shadow ${correctOption?.gradientClass || ''} ${correctOption?.textColorClass || ''} ${correctOption?.ringClass || ''}`}>
                        {getEffectivenessText(feedback.showResult.effectiveness)} (×{feedback.showResult.effectiveness})
                      </span>
                    );
                  })()
                ) : (
                  (() => {
                    const correctOption = quizAnswerOptions.find(option => option.effectiveness === feedback.showResult.effectiveness);
                    return (
                      <>
                        <span className="line-through text-gray-400 mr-2">
                          {feedback.selectedEffectiveness !== null ? getEffectivenessText(feedback.selectedEffectiveness) + ` (×${feedback.selectedEffectiveness})` : ''}
                        </span>
                        <span className={`font-bold inline-block px-3 py-1 rounded drop-shadow ${correctOption?.gradientClass || ''} ${correctOption?.textColorClass || ''} ${correctOption?.ringClass || ''}`}>
                          {getEffectivenessText(feedback.showResult.effectiveness)} (×{feedback.showResult.effectiveness})
                        </span>
                      </>
                    );
                  })()
                )}
              </p>
              <p className="text-m">
                {game.attacker ? FeedbackFlavourProvider.getFeedback(game.attacker.type, feedback.showResult.correct ? 'pass' : 'fail') : ''}
              </p>
            </Card>
          )}
          {!feedback.showResult && (
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
                    onClick={() => {
                      const isCorrect = feedback.handleAnswer(option.effectiveness);
                      if (isCorrect) game.setScore(game.score + 1);
                    }}
                    gradientClass={option.gradientClass}
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
    </div>
  );
};

export default PokemonQuiz;