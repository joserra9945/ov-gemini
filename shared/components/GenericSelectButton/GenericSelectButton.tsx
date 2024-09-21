import { FC } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { DataTableValueArray } from 'primereact/datatable';
import { SelectButton as PrimeSelectButton } from 'primereact/selectbutton';
import { nanoid } from 'nanoid';

import {
  CheckboxPassThrough,
  DataTablePassThrough,
  ListBoxPassThrough,
  OverlayPanelPassThrough,
  SelectButtonPassThrough,
  TooltipPassThrough,
} from '@shared/styles/primereact/passThrough';
import InputRadioSwithchPassThrough from '@shared/styles/primereact/passThrough/InputRadioPT';

import { IOption } from '../Interfaces/IGenericComponents';

interface ILibraryParams {
  value?: any;
  onChange: (e: string | number) => void;
  multiple?: boolean;
  optionLabel?: string;
  optionValue?: string;
  options: IOption[];
  disabled?: boolean;
}

interface IProps extends ILibraryParams {
  wrapperClassName?: string;
}

const GenericSelectButton: FC<IProps> = ({
  wrapperClassName,
  onChange,
  optionLabel = 'label',
  optionValue = 'value',
  ...rest
}) => {
  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        // TODO: CODIGO COMENTADO PORQUE NO FUNCIONA BIEN SI LE PASAMOS EL PT AL PROVIDER, PIERDEN LOS ESTILOS AL HACER CLICK,   SI LO PASAMOS DIRECTAMENTE AL COMPONENTE ES OK!!
        pt: {
          datatable: DataTablePassThrough<DataTableValueArray>(),
          overlaypanel: OverlayPanelPassThrough,
          listbox: ListBoxPassThrough,
          selectbutton: SelectButtonPassThrough,
          checkbox: CheckboxPassThrough,
          radiobutton: InputRadioSwithchPassThrough,
          tooltip: TooltipPassThrough,
        },
      }}
    >
      <div
        className={`${wrapperClassName} flex p-1 !gap-4 bg-neutral-10 rounded`}
      >
        <PrimeSelectButton
          pt={SelectButtonPassThrough}
          key={nanoid()}
          optionValue={optionValue}
          optionLabel={optionLabel}
          onChange={(e) => onChange(e.value)}
          {...rest}
        />
      </div>
    </PrimeReactProvider>
  );
};

export default GenericSelectButton;
