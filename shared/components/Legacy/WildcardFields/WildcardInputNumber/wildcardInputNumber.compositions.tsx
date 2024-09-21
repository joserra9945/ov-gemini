
import { useForm } from 'react-hook-form';

import WildcardInputNumber from './WildcardInputNumber';

import '@shared/styles/main.scsss';

export const WildcardInputNumberExample = (): JSX.Element => {
  const rhForm = useForm({ mode: 'onBlur' });
  const numberWatch = rhForm.watch('number');
  return (
    <>
      {numberWatch}
      <WildcardInputNumber
        rhForm={rhForm}
        data={{}}
        inputName="number"
        inputLabel="Example number"
        max={9}
      />
    </>
  );
};
