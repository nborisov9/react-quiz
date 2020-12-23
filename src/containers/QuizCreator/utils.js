import { createControl } from '../../form/formFramework';

export const createOptionControl = (number) => {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMesage: 'Значение не может быть пустым',
      id: number,
    },
    { required: true },
  );
};

export const initialFormState = {
  question: createControl(
    { label: 'Введите вопрос', errorMesage: 'Вопрос не может быть пустым' },
    { required: true },
  ),
  option1: createOptionControl(1),
  option2: createOptionControl(2),
  option3: createOptionControl(3),
  option4: createOptionControl(4),
};

export const createFormControls = () => {
  return {
    ...initialFormState,
  };
};
