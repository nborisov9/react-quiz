export const formInitialState = {
  email: {
    value: '',
    type: 'email',
    label: 'Email',
    errorMessage: 'Введите корректный email',
    valid: false,
    touched: false,
    validation: {
      required: true,
      email: true,
    },
  },
  password: {
    value: '',
    type: 'password',
    label: 'Пароль',
    errorMessage: 'Введите корректный пароль',
    valid: false,
    touched: false,
    validation: {
      required: true,
      minLength: 6,
    },
  },
};
