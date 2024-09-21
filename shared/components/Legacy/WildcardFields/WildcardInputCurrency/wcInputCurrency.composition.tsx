
import { useForm } from 'react-hook-form';

import WildcardInputCurrency from '.';

// import '@shared/styles/main.scss';
import '@shared/styles/main.scsss';

export const BasicWCInputCurrency = (): JSX.Element => {
  const rhForm = useForm({ mode: 'onBlur' });

  return (
    <WildcardInputCurrency
      rhForm={rhForm}
      data={{ currency: 0 }}
      inputName="currency"
      inputLabel="Currency example"
      required
      min={1}
      // max={3}
    />
  );
};
