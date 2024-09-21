import { FieldValues, useForm } from 'react-hook-form';

import WildcardInputEmail from './WildcardInputEmail';

import '@shared/styles/main.scsss';

export const BasicInputEmal = (): JSX.Element => {
  const rhForm = useForm({ mode: 'onBlur' });

  const handleSubmit = (fieldValues: FieldValues) => {
    console.log(fieldValues);
  };

  return (
    <form onSubmit={rhForm.handleSubmit(handleSubmit)}>
      <WildcardInputEmail
        rhForm={rhForm}
        data={{}}
        inputName="emails"
        inputLabel="Input Email"
        required
      />
      <button type="submit">Guardar</button>
    </form>
  );
};
