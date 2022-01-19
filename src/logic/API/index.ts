import { shuffelArray } from "../../utils";

import { Diffculty, Question } from "../models";

export const fetchQuizQuestiond = async (
  amount: number,
  diffculty: Diffculty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${diffculty}&type=multiple`;

  const data = await (await fetch(endpoint)).json();

  return data?.results.map((question: Question) => ({
    ...question,
    answers: shuffelArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
