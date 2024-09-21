import { FC } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { RadioButton } from 'primereact/radiobutton';
import { nanoid } from 'nanoid';

import InputRadioSwithchPassThrough from '@shared/styles/primereact/passThrough/InputRadioPT';

interface ILibraryParams {
  checked?: boolean;
  disabled?: boolean;
  onChange: (e: any) => void;
  value?: any;
}

interface IProps extends ILibraryParams {
  wrapperClassName?: string;
  label?: string;
}

const GenericInpuRadio: FC<IProps> = ({
  wrapperClassName,
  onChange,
  label,
  ...rest
}) => {
  const id = nanoid();
  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: {
          radiobutton: InputRadioSwithchPassThrough,
        },
      }}
    >
      <div className={`flex align-items-center ${wrapperClassName}`}>
        <RadioButton
          inputId={id}
          onChange={(e) => onChange(e.value)}
          {...rest}
        />
        {label && <label htmlFor={id}>{label}</label>}
      </div>
    </PrimeReactProvider>
  );
};

export default GenericInpuRadio;
