import { FC, useCallback, useState } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import {
  AutoComplete as PrimeAutocomplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete';

import { useEmpresaExterna } from '@shared/hooks';
import { IEmpresaExternaByRazonSocialIdGet } from '@shared/interfaces/api/IEmpresaExterna';
import { AutoCompletePassThrough } from '@shared/styles/primereact/passThrough';
import { AccordionPassThrough } from '@shared/styles/primereact/passThrough/AccordionPT';

interface ILibraryParams {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  wrapperClassName?: string;
  onChange: (e: any) => void;
  value: any;
  optionLabel?: string;
  optionValue?: string;
}

const GenericRazonSocialAutocomplete: FC<ILibraryParams> = ({
  wrapperClassName = '',
  placeholder = 'Razón social...',
  disabled = false,
  onChange,
  value,
  ...rest
}) => {
  const [empresasByRazonSocial, setEmpresasByRazonSocial] = useState<
    IEmpresaExternaByRazonSocialIdGet[]
  >([]);

  const { getEmpresaExternaByRazonSocial } = useEmpresaExterna();

  const fetchEmpresasByRazonSocial = useCallback(
    async (razonSocial: string) => {
      const res = await getEmpresaExternaByRazonSocial(razonSocial);
      setEmpresasByRazonSocial(res?.items || []);
    },
    [getEmpresaExternaByRazonSocial]
  );

  const search = (event: AutoCompleteCompleteEvent) => {
    if (event.query) {
      fetchEmpresasByRazonSocial(event.query);
    } else {
      setEmpresasByRazonSocial([]);
    }
  };

  return (
    <div
      className={`${wrapperClassName} card flex justify-content-center w-full`}
    >
      <PrimeReactProvider
        value={{
          unstyled: true,
          pt: {
            accordion: AccordionPassThrough,
            autocomplete: AutoCompletePassThrough,
            // TODO: CODIGO COMENTADO PORQUE NO FUNCIONA BIEN, SI LE PASAMOS EL PT AL PROVIDER, SI LO PASAMOS DIRECTAMENTE AL COMPONENTE ES OK!!
            // accordiontab: AccordionTabPassThrough,
          },
        }}
      >
        <PrimeAutocomplete
          field="razonSocial"
          inputClassName="w-full"
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          suggestions={empresasByRazonSocial}
          completeMethod={search}
          onChange={(e: AutoCompleteChangeEvent) => {
            onChange(e.value);
          }}
          dropdown
          {...rest}
        />
      </PrimeReactProvider>
    </div>
  );
};

export default GenericRazonSocialAutocomplete;
