import React, { useState } from 'react';
import is from 'is_js';
import axios from 'axios';

import { Button, Input } from '../../components';
import { validateForm } from '../../form/formFramework';
import { formInitialState } from './utils';
import classes from './Auth.module.scss';

const SIGN_IN_URL = process.env.REACT_APP_SIGN_IN_URL;
const SIGN_UP_URL = process.env.REACT_APP_SIGN_UP_URL;

export const Auth = () => {
  const [formControls, setFormControls] = useState(formInitialState);
  const [isFormValid, setIsFormValid] = useState(false);

  const loginHandler = () => {
    const authData = {
      email: formControls.email.value,
      password: formControls.password.value,
      returnSecureToken: true,
    };
    axios
      .post(SIGN_IN_URL, authData)
      .then(({ data }) => console.log(data))
      .catch((e) => console.error(e));
  };

  const registerHandler = () => {
    const authData = {
      email: formControls.email.value,
      password: formControls.password.value,
      returnSecureToken: true,
    };
    axios
      .post(SIGN_UP_URL, authData)
      .then(({ data }) => console.log(data))
      .catch((e) => console.error(e));
  };
  const submitHandler = (event) => {
    event.preventDefault();
  };

  const validateControl = (value, validation) => {
    if (!validation) return true;

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    return isValid;
  };

  const onChangeHandler = (event, controlName) => {
    const formControlsCopy = { ...formControls };
    const control = { ...formControlsCopy[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    formControlsCopy[controlName] = control;

    setFormControls((state) => ({ ...state, ...formControlsCopy }));
    setIsFormValid(validateForm(formControlsCopy));
  };

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const {
        type,
        label,
        value,
        valid,
        touched,
        errorMessage,
        validation,
      } = formControls[controlName];

      return (
        <Input
          key={controlName + index}
          type={type}
          value={value}
          valid={valid}
          touched={touched}
          label={label}
          shouldValidate={!!validation}
          errorMessage={errorMessage}
          onChange={(event) => onChangeHandler(event, controlName)}
        />
      );
    });
  };

  return (
    <div className={classes.Auth}>
      <div>
        <h1>Авторизация</h1>
        <form onSubmit={submitHandler} className={classes.AuthForm}>
          {renderInputs()}
          <Button type="success" onClick={loginHandler} disabled={!isFormValid}>
            Войти
          </Button>
          <Button type="primary" onClick={registerHandler} disabled={!isFormValid}>
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
};
