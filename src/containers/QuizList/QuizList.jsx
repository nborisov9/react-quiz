import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { Loading } from '../../components/Loading';
import classes from './QuizList.module.scss';

const URL = process.env.REACT_APP_DB_URL;

export const QuizList = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${URL}/quizes.json`)
      .then(({ data }) => {
        const currentListId = Object.keys(data);
        const currentListData = currentListId.reduce(
          // eslint-disable-next-line
          (acc, key, index) => (acc.push({ id: key, name: `TEST - ${index + 1}` }), acc),
          [],
        );
        setLoading(false);
        setQuizes(currentListData);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>
        {loading && <Loading />}
        <ul>
          {quizes.map(({ id, name }) => (
            <li key={id}>
              <NavLink to={`/quiz/${id}`}>{name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
