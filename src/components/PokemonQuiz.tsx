import React from 'react';
import QuizGameContainer from './QuizGameContainer';
import QuizGameOverScreen from './QuizGameOverScreen';
import QuizActiveGame from './QuizActiveGame';
import { getResultPhrase } from '@/lib/utils';
import { useQuizGame } from '@/hooks/useQuizGame';
import { useQuizFeedback } from '@/hooks/useQuizFeedback';
import { useQuizTimer } from '@/hooks/useQuizTimer';
import { useQuizNavigation } from '@/hooks/useQuizNavigation';
import { FeedbackFlavourProvider } from '@/lib/FeedbackProvider';

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

  return (
    <QuizGameContainer gameOver={game.gameOver}>
      {game.gameOver ? (
        <QuizGameOverScreen
          score={game.score}
          totalRounds={game.totalRounds}
          resultPhrase={getResultPhrase(game.score, game.totalRounds)}
          onReset={navigation.restartGame}
        />
      ) : (
        <QuizActiveGame
          currentRound={game.currentRound}
          score={game.score}
          totalRounds={game.totalRounds}
          attacker={game.attacker}
          defender={game.defender}
          showResult={feedback.showResult}
          selectedEffectiveness={feedback.selectedEffectiveness}
          handleAnswer={feedback.handleAnswer}
          setScore={game.setScore}
          feedbackText={game.attacker ? FeedbackFlavourProvider.getFeedback(game.attacker.type, feedback.showResult && feedback.showResult.correct ? 'pass' : 'fail') : ''}
        />
      )}
    </QuizGameContainer>
  );
};

export default PokemonQuiz;