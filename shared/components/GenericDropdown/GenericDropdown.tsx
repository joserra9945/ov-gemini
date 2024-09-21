import { FC } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { Dropdown as PrimeDropdown } from 'primereact/dropdown';

import { DropdownPassThrough } from '@shared/styles/primereact/passThrough';

import { IOption } from '../Interfaces/IGenericComponents';

import { ITooltipOptions } from './IGenericDropdown';

interface ILibraryParams {
  placeholder?: string;
  name?: string;
  options: IOption[];
  selectedValue?: IOption;
  className?: string;
  optionValue?: string;
  optionLabel?: string;
  disabled?: boolean;
  tooltip?: string;
  tooltipOptions?: ITooltipOptions;
  onChange: (result: string | number) => void;
  invalid?: boolean;
  value?: string | number;
  emptyMessage?: string;
}

interface IProps extends ILibraryParams {
  wrapperClassName?: string;
}

const GenericDropdown: FC<IProps> = ({
  wrapperClassName,
  onChange,
  optionLabel = 'label',
  optionValue = 'value',
  tooltipOptions = { position: 'bottom' },
  placeholder = 'Seleccione una opción',
  emptyMessage = 'Sin resultados',
  value,
  ...rest
}) => {
  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: { dropdown: DropdownPassThrough },
      }}
    >
      <div className={wrapperClassName}>
        <PrimeDropdown
          optionValue={optionValue}
          optionLabel={optionLabel}
          tooltipOptions={tooltipOptions}
          placeholder={placeholder}
          emptyMessage={emptyMessage}
          value={value}
          onChange={(e) => onChange(e.value)}
          {...rest}
        />
      </div>
    </PrimeReactProvider>
  );
};

export default GenericDropdown;
