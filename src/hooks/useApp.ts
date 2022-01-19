import { useState } from "react";
import { fetchQuizQuestiond } from "../logic/API";
import { Diffculty, QuestionState } from "../logic/models";
import { AnswerObject } from "../logic/models";

const useApp = () => {
  const TOTAL_QUESTIONS = 10;

  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Array<QuestionState>>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Array<AnswerObject>>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const startIrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestiond(
      TOTAL_QUESTIONS,
      Diffculty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return {
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
  };
};

export default useApp;
