import React, { useState } from 'react';
import axios from 'axios';

import classes from './QuizCreator.module.scss';
import { Input, Button, Select } from '../../components';
import { validate } from '../../form/formFramework';
import { createFormControls } from './utils';

const URL = process.env.REACT_APP_DB_URL;

export const QuizCreator = () => {
  const [quiz, setQuiz] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [rightAnswerId, setRightAnswerId] = useState(1);
  const [formControls, setFormControls] = useState(createFormControls());

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const changeHadnler = (value, controlName) => {
    const formControlsCopy = { ...formControls };
    const control = formControlsCopy[controlName];

    control.touched = true;
    control.value = value;
    control.valid = validate(value, control.validation);

    formControlsCopy[controlName] = control;

    setFormControls({ ...formControlsCopy });
    setIsFormValid(validate(formControlsCopy));
  };

  const addQuestionHandler = () => {
    const quizCopy = [...quiz];
    const index = quizCopy.length + 1;
    const { question, option1, option2, option3, option4 } = formControls;

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    quizCopy.push(questionItem);

    setQuiz(quizCopy);
    setIsFormValid(false);
    setRightAnswerId(1);
    setFormControls((state) => ({
      ...state,
      ...(state.question.value = ''),
      ...(state.option1.value = ''),
      ...(state.option2.value = ''),
      ...(state.option3.value = ''),
      ...(state.option4.value = ''),
    }));
  };

  const createQuizHandler = (event) => {
    event.preventDefault();
    axios
      .post(`${URL}/quizes.json`, quiz)
      .then(() => {
        setQuiz([]);
        setIsFormValid(false);
        setRightAnswerId(1);
      })
      .catch((error) => console.error(error));
  };

  const selectChangeHandler = (event) => {
    setRightAnswerId(+event.target.value);
  };

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const { valid, label, value, touched, errorMessage, validation } = formControls[
        controlName
      ];
      return (
        <Input
          key={index + controlName}
          label={label}
          value={value}
          touched={touched}
          errorMessage={errorMessage}
          shouldValidate={!!validation}
          valid={valid}
          onChange={(event) => changeHadnler(event.target.value, controlName)}
        />
      );
    });
  };

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Создание теста</h1>

        <form onSubmit={submitHandler}>
          {renderInputs()}
          <Select
            label="Выберите правильный ответ"
            value={rightAnswerId}
            onChange={selectChangeHandler}
            options={[
              { text: 1, value: 1 },
              { text: 2, value: 2 },
              { text: 3, value: 3 },
              { text: 4, value: 4 },
            ]}
          />
          <Button type="primary" onClick={addQuestionHandler} disabled={!isFormValid}>
            Добавить вопрос
          </Button>
          <Button type="success" onClick={createQuizHandler} disabled={quiz.length === 0}>
            Создать тест
          </Button>
        </form>
      </div>
    </div>
  );
};
