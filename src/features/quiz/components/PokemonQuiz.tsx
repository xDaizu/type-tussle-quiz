import React, { useEffect } from 'react';
import QuizGameContainer from './QuizGameContainer';
import QuizGameOverScreen from './QuizGameOverScreen';
import QuizActiveGame from './QuizActiveGame';
import { useQuizGame } from '../hooks/useQuizGame';
import { useQuizFeedback } from '../hooks/useQuizFeedback';
import { useQuizTimer } from '../hooks/useQuizTimer';
import { useQuizNavigation } from '../hooks/useQuizNavigation';
import { FeedbackFlavourProvider } from '../services/FeedbackService';

const PokemonQuiz = () => {
  const game = useQuizGame(10);

  // Initialize the first battle when the component mounts
  useEffect(() => {
    if (!game.attacker && !game.defender && !game.gameOver) {
      game.generateBattle();
    }
  }, [game.attacker, game.defender, game.gameOver, game.generateBattle]);
  const feedback = useQuizFeedback(game.attacker, game.defender);
  const navigation = useQuizNavigation({
    currentRound: game.currentRound,
    totalRounds: game.totalRounds,
    setCurrentRound: game.setCurrentRound,
    setGameOver: game.setGameOver,
    generateBattle: game.generateBattle,
    resetGame: game.resetGame,
  });

  const timer = useQuizTimer({
    showResult: feedback.showResult,
    onAdvance: navigation.advanceRound,
    currentRound: game.currentRound,
    totalRounds: game.totalRounds,
  });

  const handleAnswer = (effectiveness: any) => {
    return feedback.handleAnswer(effectiveness);
  };

  const getResultPhrase = (score: number, totalRounds: number): string => {
    const percentage = (score / totalRounds) * 100;
    if (percentage >= 80) return "Type Expert!";
    if (percentage >= 60) return "Well Done!";
    if (percentage >= 40) return "Keep Training!";
    return "Try Again!";
  };

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
          handleAnswer={handleAnswer}
          setScore={game.setScore}
          feedbackText=""
        />
      )}
    </QuizGameContainer>
  );
};

export default PokemonQuiz; 