import QuizGameContainer from '@/features/quiz/components/QuizGameContainer';
import QuizActiveGame from '@/features/quiz/components/QuizActiveGame';

const Index = () => {
  return (
    <QuizGameContainer gameOver={false}>
      <QuizActiveGame />
    </QuizGameContainer>
  );
};

export default Index;
