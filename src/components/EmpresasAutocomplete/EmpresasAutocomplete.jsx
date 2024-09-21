/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import classNames from 'classnames';
import InfocifService from 'utils/services/infocif-service';
import RazonSocialService from 'utils/services/razon-social-service';

import useDebounce from '@shared/hooks/useDebounce';

const infocifService = new InfocifService();
const razonSocialService = new RazonSocialService();

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
  libradorCif = null,
  empresasFormInfocif = false,
  disabled = false,
  defaultValue = null,
  onSelect = null,
  onBlur,
}) => {
  const [razonSociales, setRazonSociales] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [empresas, setEmpresas] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchEmpresasByName = async () => {
      let response = null;
      let empresas = [];
      let razonSociales = [];

      if (empresasFormInfocif) {
        response = await infocifService.getByRazonSocialOrCif(
          debouncedSearchTerm.toLowerCase()
        );
        empresas = (response?.data?.hits?.hits ?? []).filter(
          (hit) => hit._source.cif !== libradorCif
        );
        razonSociales = empresas.map((empresa) => empresa._source.razonsocial);
      } else {
        response = await razonSocialService.getNameFilteredByStr(
          debouncedSearchTerm.toLowerCase()
        );
        empresas = response?.items ?? [];
        razonSociales = empresas.map((empresa) => empresa.razonSocial);
      }

      setEmpresas(empresas);
      setRazonSociales(razonSociales);
    };
    if (debouncedSearchTerm) {
      fetchEmpresasByName();
    }
  }, [debouncedSearchTerm, empresasFormInfocif, libradorCif]);

  const searchList = (e) => {
    setSearchTerm(e.query.trim());
  };

  const getSelectedEmpresa = (e) => {
    if (empresas?.length > 0 && empresasFormInfocif) {
      return empresas.find(
        (empresa) => empresa._source.razonsocial === e.value
      );
    }
    if (empresas?.length > 0) {
      return empresas.find((empresa) => empresa.razonSocial === e.value);
    }
  };
  const inputClass = classNames({
    'p-invalid p-mr-2': error,
  });

  return (
    <AutoComplete
      inputClassName="data-hj-allow"
      value={value}
      defaultValue={defaultValue}
      suggestions={razonSociales}
      completeMethod={searchList}
      className={inputClass}
      name={name}
      placeholder={placeholder}
      id={name}
      disabled={disabled}
      onChange={(e) => {
        onChange(
          valueName === 'cif'
            ? e.value.toUpperCase().replace(/\s/g, '').replace('-', '')
            : e.value.toUpperCase()
        );
      }}
      onBlur={(e) => {
        if (setCheckIfNewRequestNeeded)
          setCheckIfNewRequestNeeded(!checkIfNewRequestNeeded);
        if (onBlur) {
          onBlur(e);
        }
      }}
      onSelect={(e) => {
        const res = getSelectedEmpresa(e);
        if (res) {
          const propertyIdName = 'cif'; // empresasFormInfocif ? 'cif' : 'cif';
          if (valueName === propertyIdName) {
            onChange(res._source[propertyIdName]);
            if (onSelect) onSelect(res._source);
          } else {
            onChange(e.value);
            if (onSelect) onSelect(e);
          }
          setValue(res._source[valueToSet]);
        }
        if (setCheckIfNewRequestNeeded)
          setCheckIfNewRequestNeeded(!checkIfNewRequestNeeded);
      }}
    />
  );
};

export default EmpresasAutocomplete;
