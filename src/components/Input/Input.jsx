import React from 'react';

import classes from './Input.module.scss';

const isInvalid = (valid, touched, shouldValidate) => {
  return !valid && shouldValidate && touched;
};

export const Input = ({
  type,
  label,
  value,
  onChange,
  errorMessage,
  valid,
  touched,
  shouldValidate,
}) => {
  const inputType = type || 'text';
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(valid, touched, shouldValidate)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{label}</label>
      <input id={htmlFor} type={inputType} value={value} onChange={onChange} />
      {isInvalid(valid, touched, shouldValidate) && (
        <span>{errorMessage || 'Введите верное значение'}</span>
      )}
    </div>
  );
};
