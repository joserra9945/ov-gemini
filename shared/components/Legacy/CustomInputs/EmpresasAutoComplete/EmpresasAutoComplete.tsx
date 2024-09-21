/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
  AutoCompleteSelectEvent,
} from 'primereact/autocomplete';
import { AxiosRequestConfig } from 'axios';
import classNames from 'classnames';

// eslint-disable-next-line import/no-cycle
import { useGruposDeEmpresas } from '@shared/hooks';
import { IEmpresas, IEmpresasGenericResponse } from '@shared/interfaces';
import { IUseFetch, useFetch } from '@shared/utils';
import { initialQueryState } from '@shared/utils/constants';

import { validateSpanishID } from './helpers/spanishIdValidator';
import useDebounce from './helpers/useDebounce';
import { IEmpresasAutoComplete } from './interface';

const elasticSearchConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_ELASTICSEARCH,
};

const getBasicSearchConfig = (): AxiosRequestConfig => ({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json',
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
});

const EmpresasAutocomplete = ({
  value,
  name,
  onChange,
  setValue,
  setCheckIfNewRequestNeeded,
  checkIfNewRequestNeeded,
  placeholder,
  valueToSet,
  valueName,
  error,
  currentLibradorCif = '',
  empresasFormInfocif = false,
  disabled = false,
  onSelect,
  onBlur,
  environment = process.env.REACT_APP_API_ENV,
  grupoEmpresas = false,
}: IEmpresasAutoComplete): JSX.Element => {
  const [razonSociales, setRazonSociales] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [empresas, setEmpresas] = useState<IEmpresas[]>([]);
  const [basicSearchConfig, setBasicSearchConfig] =
    useState<AxiosRequestConfig>();
  const {
    get: getEmpresaByRazonSocialOrCif,
  }: IUseFetch<IEmpresasGenericResponse> = useFetch(
    '/api/gefintech/EmpresaExterna'
  );
  const { get: getEmpresaByRazonSocialOrCifElasticSearch }: IUseFetch =
    useFetch('', elasticSearchConfig);

  const { getEmpresaByFilters } = useGruposDeEmpresas();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const isGenericResponse = (
    res: IEmpresasGenericResponse | IEmpresas
  ): res is IEmpresasGenericResponse => {
    return (res as IEmpresasGenericResponse).items !== undefined;
  };

  useEffect(() => {
    const fetchEmpresasByName = async () => {
      const resRazonSocial: string[] = [];
      if (empresasFormInfocif) {
        let response = await getEmpresaByRazonSocialOrCifElasticSearch<any>(
          `indice_empresas/_search?source_content_type=application/json&source={"size":10,"sort":{"peso":"desc"},"query": {"query_string": {"default_operator" : "AND","query" : "${debouncedSearchTerm?.toLowerCase()}*","fields": ["cif","razonsocial"]}}}`
        );
        response = response?.data?.hits?.hits;
        if (response?.length > 0) {
          if (Array.isArray(response) && response.length) {
            response.forEach((item: any) => {
              if (item._source.cif !== currentLibradorCif)
                resRazonSocial.push(item._source.razonsocial);
            });
            setRazonSociales(resRazonSocial);
            const empresasToSet = response.reduce(
              (accumulator, currentValue) => {
                if (currentValue._source.cif !== currentLibradorCif) {
                  accumulator.push(currentValue._source);
                }
                return accumulator;
              },
              []
            );
            setEmpresas(empresasToSet);
          } else {
            setEmpresas([]);
          }
        } else {
          setRazonSociales([]);
        }
      } else {
        const isValidCif = validateSpanishID(debouncedSearchTerm);
        let newData;
        if (grupoEmpresas) {
          const query = { ...initialQueryState };
          query.params = `&${[
            isValidCif ? 'cif' : 'razonSocial',
          ]}=${debouncedSearchTerm.toLowerCase()}`;

          newData = await getEmpresaByFilters(query);
        } else {
          const { data } = await getEmpresaByRazonSocialOrCif<any>(
            `/${
              isValidCif ? 'by-cif' : 'by-razon-social'
            }/${debouncedSearchTerm?.toLowerCase()}`,
            basicSearchConfig
          );
          newData = data;
        }
        if (
          newData &&
          isGenericResponse(newData) &&
          newData?.items?.length > 0 &&
          !isValidCif
        ) {
          const { items } = newData as IEmpresasGenericResponse;
          if (Array.isArray(items) && items.length) {
            items.forEach((item) => {
              resRazonSocial.push(item.razonSocial);
            });
            setRazonSociales(resRazonSocial);
            setEmpresas(items);
          } else {
            setEmpresas([]);
          }
        } else if (isValidCif && newData) {
          resRazonSocial.push((newData as IEmpresas)?.razonSocial);
          setRazonSociales(resRazonSocial);
          setEmpresas([newData] as Array<IEmpresas>);
        } else {
          setRazonSociales([]);
        }
      }
    };
    if (debouncedSearchTerm) {
      fetchEmpresasByName();
    }
  }, [
    basicSearchConfig,
    currentLibradorCif,
    debouncedSearchTerm,
    empresasFormInfocif,
    getEmpresaByFilters,
    getEmpresaByRazonSocialOrCif,
    getEmpresaByRazonSocialOrCifElasticSearch,
    grupoEmpresas,
  ]);

  useEffect(() => {
    const tmpBasicConfig = getBasicSearchConfig();
    setBasicSearchConfig(tmpBasicConfig);
  }, [environment]);

  const searchList = (e: AutoCompleteCompleteEvent) => {
    setSearchTerm(e.query.trim());
  };

  const getSelectedEmpresa = (e: AutoCompleteSelectEvent) => {
    if (empresas?.length > 0 && empresasFormInfocif) {
      return empresas.find((empresa) => empresa.razonsocial === e.value);
    }
    if (empresas?.length > 0) {
      return empresas.find((empresa) => empresa.razonSocial === e.value);
    }
  };
  const inputClass = classNames({
    'p-invalid p-mr-2': error,
  });

  return (
    <div className="autocomplete_container">
      <AutoComplete
        className={inputClass}
        completeMethod={searchList}
        disabled={disabled}
        id={name}
        inputClassName="data-hj-allow"
        name={name}
        onBlur={(e) => {
          if (setCheckIfNewRequestNeeded) {
            setCheckIfNewRequestNeeded(!checkIfNewRequestNeeded);
          }
          if (onBlur) {
            onBlur(e);
          }
        }}
        onChange={(e) => {
          onChange(e.value.toUpperCase());
        }}
        onSelect={(e) => {
          const res = getSelectedEmpresa(e);
          if (res) {
            const propertyIdName = 'cif';
            const valueToUpdate =
              valueName === propertyIdName ? res[propertyIdName] : e.value;

            onChange(valueToUpdate);
            if (onSelect) {
              onSelect(res);
            }
            if (valueToSet) {
              setValue(`${res[valueToSet as keyof IEmpresas]}`);
            }
          }

          if (setCheckIfNewRequestNeeded) {
            setCheckIfNewRequestNeeded(!checkIfNewRequestNeeded);
          }
        }}
        placeholder={placeholder}
        suggestions={razonSociales}
        value={value}
      />
    </div>
  );
};

export default EmpresasAutocomplete;
