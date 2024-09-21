/* eslint-disable */
// @ts-nocheck

import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete';

import {
  IPoblacion,
  IPoblacionGenericResponse,
} from '@shared/interfaces/IPoblacion';
import { useFetch } from '@shared/utils';
import notifications from '@shared/utils/notifications';

import { Error } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';
import useDebounce from '../WildcardElkSearchIndustriaCnae/helpers/useDebounce';

interface IWildcardInputLocation extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  placeholder?: string;
  updateProperty?: (e: string, x: string) => void;
}

const WildcardInputLocation = ({
  rhForm,
  inputName,
  data,
  inputLabel,
  required = false,
  placeholder,
  isDisabled = false,
  index,
  updateProperty,
}: IWildcardInputLocation): JSX.Element => {
  const {
    control,
    formState: { errors },
    trigger,
  } = rhForm;
  const [poblaciones, setPoblaciones] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>();
  const { get: getPoblacionByNombre } = useFetch('/api/gefintech/Poblacion');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchPoblacionByNombre = async () => {
      try {
        let resArrayPoblaciones = [];
        const res = await getPoblacionByNombre<IPoblacionGenericResponse>(
          `/by-nombre/${debouncedSearchTerm}`
        );
        if (res) {
          resArrayPoblaciones = res.items.map(
            (item: IPoblacion) => item.nombre
          );
          setPoblaciones(resArrayPoblaciones);
        }
      } catch (e) {
        notifications.unknownError(e);
      }
    };

    if (debouncedSearchTerm) {
      fetchPoblacionByNombre();
    }
  }, [debouncedSearchTerm, getPoblacionByNombre, rhForm, trigger]);

  const searchList = (e: AutoCompleteCompleteEvent) => {
    setSearchTerm(e.query.trim());
  };

  return (
    <div className={`g-field ${inputName}-field`}>
      <div className="label">
        <label htmlFor={inputName}>{inputLabel}</label>
      </div>
      <div className="p-fluid">
        <div className="p-field">
          <Controller
            render={({ field }) => {
              const { onChange, onBlur, name, value } = field;
              return (
                <div className="autocomplete_container">
                  <AutoComplete
                    inputClassName="data-hj-allow"
                    value={value}
                    completeMethod={searchList}
                    suggestions={poblaciones}
                    className={
                      fieldHasError(errors, inputName) ? 'p-invalid' : 'p-valid'
                    }
                    name={name}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    id={name}
                    disabled={isDisabled}
                    onChange={(e) => {
                      onChange(e.target.value);
                      updateProperty &&
                        updateProperty(e.target.value, 'lugarEmision');
                    }}
                  />
                </div>
              );
            }}
            rules={{
              required: {
                value: required,
                message: `El campo ${inputLabel} es obligatorio`,
              },
            }}
            name={`${inputName}` as const}
            control={control}
            defaultValue={data && data[inputName] ? data[inputName] : ''}
          />
          <Error property={inputName} errors={errors} index={index} />
        </div>
      </div>
    </div>
  );
};

export default WildcardInputLocation;
