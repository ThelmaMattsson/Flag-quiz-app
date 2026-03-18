import { useState } from "react";
import { Country } from "../types/Country";

export function useQuiz(countries: Country[]) {
  const [quizCountries, setQuizCountries] = useState<Country[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [filteredByRegion, setFilteredByRegion] = useState<Country[]>([]);

  const shuffle = (array: Country[]) => {
    return [...array].sort(() => 0.5 - Math.random());
  };

  const startQuiz = (region: string, amount: number) => {
    const filtered =
      region === "All"
        ? countries
        : countries.filter((c) => c.region === region);

    const shuffled = shuffle(filtered);

    const selected = amount === 249 ? shuffled : shuffled.slice(0, amount);

    setQuizCountries(selected);
    setQuestionIndex(0);
    setFilteredByRegion(filtered);
    setScore(0);
    setWrongAnswers(0);
    setQuizFinished(false);
    setSelectedAnswer(null);
  };

  const current = quizCountries[questionIndex];

  const generateQuestion = () => {
    if (!current) return;

    const wrong = shuffle(
      filteredByRegion.filter((c) => c.name.common !== current.name.common),
    ).slice(0, 3);
    const answers = shuffle([current, ...wrong]);
    setOptions(answers.map((c) => c.name.common));
  }; //ksk ej quizCOuntries här ? blir ju samma alternativ hela tiden då typ? om man ex kör 10

  const answer = (selected: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(selected);

    if (selected === current.name.common) {
      setScore((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => prev + 1);
    }

    setTimeout(() => {
      if (questionIndex + 1 < quizCountries.length) {
        setQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizFinished(true);
      }
    }, 1000);
  };

  return {
    quizCountries,
    current,
    options,
    questionIndex,
    score,
    wrongAnswers,
    selectedAnswer,
    quizFinished,
    startQuiz,
    generateQuestion,
    answer,
  };
}
