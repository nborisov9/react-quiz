import React from 'react';
import classes from './ActiveQuize.module.scss';
import { AnswersList } from '../AnswersList';

export const ActiveQuize = ({ answers, question, quizLength, answerNumber, state }) => {
  return (
    <div className={classes.ActiveQuize}>
      <p className={classes.Question}>
        <span>
          <strong>{answerNumber}. </strong>
          {question}
        </span>
        <small>
          {answerNumber} из {quizLength}
        </small>
      </p>

      <AnswersList state={state} answers={answers} />
    </div>
  );
};
