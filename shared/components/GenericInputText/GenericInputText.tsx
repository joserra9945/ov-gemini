import { FC } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { InputText as PrimeInputText } from 'primereact/inputtext';
import { nanoid } from 'nanoid';
import { IconDefinition } from '@fortawesome/pro-light-svg-icons';

import { InputTextPassThrough } from '@shared/styles/primereact/passThrough';

import GenericInputTextInsideIcon from './components/InsideIcon';

interface ILibraryParams {
  value?: string;
  onChange?: (e: string) => void;
  className?: string;
  onBlur?: (e: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxlength?: string;
  disabled?: boolean;
}

interface IProps extends ILibraryParams {
  wrapperClassName?: string;
  label?: string;
  helpText?: string;
  invalid?: boolean;
  leftIcon?: IconDefinition;
  rightIcon?: IconDefinition;
}

const GenericInputText: FC<IProps> = ({
  wrapperClassName,
  label,
  helpText,
  invalid,
  onChange,
  onBlur,
  onKeyDown,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  const id = nanoid();

  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: {
          inputtext: InputTextPassThrough,
        },
      }}
    >
      <div className={wrapperClassName}>
        {label && <label htmlFor={id}>{label}</label>}
        <div className="relative inline-block w-full">
          <GenericInputTextInsideIcon icon={rightIcon} position="right" />
          <PrimeInputText
            id={id}
            type="text"
            aria-describedby={`${id}-help`}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={(e) => onBlur?.(e.target.value)}
            invalid={invalid}
            onKeyDown={onKeyDown}
            {...rest}
          />
        </div>

        {helpText && <small id={`${id}-help`}>{helpText}</small>}
      </div>
    </PrimeReactProvider>
  );
};

export default GenericInputText;
