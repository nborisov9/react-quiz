import React from 'react';
import { Link } from 'react-router-dom';

import classes from './FinishedQuiz.module.scss';
import { Button } from '../Button';

export const FinishedQuiz = ({ quiz, results, onRetry }) => {
  const successCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === 'success') {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className={classes.Finished}>
      <ul>
        {quiz.map((obj, i) => {
          const cls = [
            'fa',
            results[obj.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[results[obj.id]],
          ];
          return (
            <li key={i + obj.id}>
              <strong>{i + 1}. </strong>
              {obj.question}
              <i className={cls.join(' ')}></i>
            </li>
          );
        })}
      </ul>
      <p className={classes['right-answer']}>
        Правильно {successCount} из {quiz.length}
      </p>
      <div className={classes.btn}>
        <Button onClick={onRetry} type="primary">
          Повторить
        </Button>
        <Link to="/">
          <Button type="success">Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  );
};
