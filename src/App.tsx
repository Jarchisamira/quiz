import useApp from "./hooks/useApp";
import QuestionCard from "./components/QuestionCard";
import { GlobalStyle, Wrapper } from "./styles/App.styles";

const App = () => {
  const {
    startIrivia,
    checkAnswer,
    nextQuestion,
    loading,
    questions,
    number,
    userAnswers,
    score,
    gameOver,
    TOTAL_QUESTIONS,
  } = useApp();

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1> QUIZ</h1>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startIrivia}>
            Start
          </button>
        ) : null}

        {!gameOver && <p className="score">Score : {score}</p>}
        {loading && <p className="">Loading Questions ...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number]?.question}
            answers={questions[number]?.answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
