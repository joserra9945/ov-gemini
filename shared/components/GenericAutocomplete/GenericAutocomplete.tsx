import { FC } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { AutoComplete as PrimeAutocomplete } from 'primereact/autocomplete';
import { nanoid } from 'nanoid';
import { faXmark } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AutoCompletePassThrough } from '@shared/styles/primereact/passThrough';

import { IOption } from '../Interfaces/IGenericComponents';

interface ILibraryParams {
  value: string;
  onChange: (e: string) => void;
  field?: string;
  searchMethod: (e: string) => void;
  multiple?: boolean;
  className?: string;
  dropdown?: boolean;
  invalid?: boolean;
  placeholder?: string;
}

interface IProps extends ILibraryParams {
  wrapperClassName?: string;
  options?: IOption[];
}

const GenericAutoComplete: FC<IProps> = ({
  wrapperClassName,
  options,
  onChange,
  searchMethod,
  value,
  multiple,
  placeholder,
  ...rest
}) => {
  const id = nanoid();

  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: { autocomplete: AutoCompletePassThrough },
      }}
    >
      <div className={wrapperClassName}>
        <PrimeAutocomplete
          id={id}
          suggestions={options}
          onChange={(e) => onChange(e.value)}
          completeMethod={(e) => searchMethod(e.query)}
          value={value}
          multiple={multiple}
          removeTokenIcon={
            <FontAwesomeIcon icon={faXmark} className="cursor-pointer" />
          }
          placeholder={
            multiple && value && value.length
              ? 'Seleccione otra opción si lo desee'
              : placeholder
          }
          {...rest}
        />
      </div>
    </PrimeReactProvider>
  );
};

export default GenericAutoComplete;
