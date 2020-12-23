import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ActiveQuize } from '../../components/ActiveQuize';
import { FinishedQuiz } from '../../components/FinishedQuiz';
import { Loading } from '../../components/Loading';
import classes from './Quiz.module.scss';

const URL = process.env.REACT_APP_DB_URL;

const QuizeContext = React.createContext();
export const useQuizeContext = () => React.useContext(QuizeContext);

export const Quiz = ({ match }) => {
  const ID = match.params.id;

  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answerState, setAnswerState] = useState(null);
  const [isFinished, setFinished] = useState(false);
  const [results, setResults] = useState({});

  useEffect(() => {
    axios
      .get(`${URL}/quizes/${ID}.json`)
      .then(({ data }) => {
        setQuiz(data);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, [ID]);

  const isQouizFinished = () => {
    return activeQuestion + 1 === quiz.length;
  };

  const onAnswerClickHandler = (answerId) => {
    if (answerState) {
      const key = Object.keys(answerState)[0];
      if (answerState[key] === 'success') {
        return;
      }
    }

    const { rightAnswerId } = quiz[activeQuestion];
    const { id } = quiz[activeQuestion];

    if (rightAnswerId === answerId) {
      if (!results[id]) {
        setResults((prev) => ({ ...prev, [id]: 'success' }));
      }

      setAnswerState({ [answerId]: 'success' });
      const timeout = window.setTimeout(() => {
        if (isQouizFinished()) {
          setFinished(true);
        } else {
          setActiveQuestion(activeQuestion + 1);
          setAnswerState(null);
        }
        window.clearTimeout(timeout);
      }, 500);
    } else {
      setResults((prev) => ({ ...prev, [id]: 'error' }));
      setAnswerState({ [answerId]: 'error' });
    }
  };

  const retryHandler = () => {
    setActiveQuestion(0);
    setAnswerState(null);
    setFinished(false);
    setResults({});
  };

  console.log(quiz);

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>
        <QuizeContext.Provider value={{ onAnswerClickHandler }}>
          {loading ? (
            <Loading />
          ) : isFinished ? (
            <FinishedQuiz onRetry={retryHandler} results={results} quiz={quiz} />
          ) : (
            <ActiveQuize
              question={quiz[activeQuestion].question}
              answers={quiz[activeQuestion].answers}
              quizLength={quiz.length}
              answerNumber={activeQuestion + 1}
              state={answerState}
            />
          )}
        </QuizeContext.Provider>
      </div>
    </div>
  );
};
