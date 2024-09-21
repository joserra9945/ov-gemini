import React, { useCallback, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import { fieldHasError } from '@shared/utils/utils';

import { InputCurrency } from '@shared/components/Legacy/CustomInputs';

import {
  DropdownFilter,
  InputCalendar,
  InputText,
} from 'components/CustomInputs';
import EmpresasAutocomplete from 'components/EmpresasAutocomplete';

import Error from './Error';

const FormField = ({ children }) => {
  return (
    <div className="col-md-12">
      <div className="p-fluid">
        <div className="p-field">{children}</div>
      </div>
    </div>
  );
};

const CesionFuturoFields = ({
  rhForm,
  cesion,
  updateProperty,
  isDisabled = false,
  countries,
  accionRequerida,
}) => {
  const {
    formState: { errors },
    control,
    setValue,
    trigger,
  } = rhForm;
  const libradorCif = sessionStorage.getItem('libradorCif');
  const [reorderedCountries, setReorderedCountries] = useState([]);

  const reorderPaises = useCallback(() => {
    const auxArray = countries.filter((row) => row.nombre !== 'España');
    const auxItem = countries.filter((row) => row.nombre === 'España');
    auxArray.unshift(auxItem[0]);
    return auxArray;
  }, [countries]);

  useEffect(() => {
    if (countries?.length) {
      setReorderedCountries(reorderPaises());
    }
  }, [countries, reorderPaises]);

  useEffect(() => {
    if (!reorderedCountries) return;
    setValue('pais', reorderedCountries[0]);
    updateProperty(reorderedCountries[0], 'pais');
    trigger('pais');
  }, [reorderedCountries, setValue, trigger, updateProperty]);

  return (
    <div className="cesion-fields">
      <div className="ui-fluid p-formgrid p-grid">
        <FormField>
          <label htmlFor="libradoCif">NIF / CIF*</label>
          <Controller
            render={({ field }) => {
              const { onChange, value, name } = field;
              return (
                <EmpresasAutocomplete
                  value={value}
                  name={name}
                  disabled={isDisabled || accionRequerida}
                  onChange={(e) => {
                    onChange(e);
                    updateProperty(e, 'librado.cif');
                    trigger('librado.cif');
                  }}
                  valueName="cif"
                  valueToSet="razonsocial"
                  setValue={(newValue) => {
                    setValue('librado.razonSocial', newValue);
                    updateProperty(newValue, 'librado.razonSocial');
                    trigger('librado.razonSocial');
                  }}
                  error={fieldHasError(errors, 'librado.cif') ? true : null}
                  empresasFormInfocif
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: 'El nif/cif es obligatorio',
              },
            }}
            name="librado.cif"
            control={control}
            defaultValue={cesion?.libradoCif || ''}
          />
          <Error property="librado.cif" errors={errors} />
        </FormField>
        <FormField>
          <label htmlFor="librado.razonSocial">Razón Social*</label>
          <Controller
            render={({ field }) => {
              const { onChange, value, name } = field;
              return (
                <EmpresasAutocomplete
                  value={value}
                  name={name}
                  libradorCif={libradorCif}
                  onChange={(e) => {
                    onChange(e);
                    updateProperty(e, 'librado.razonSocial');
                    trigger('librado.razonSocial');
                  }}
                  valueName="razonsocial"
                  valueToSet="cif"
                  disabled={isDisabled || accionRequerida}
                  setValue={(newValue) => {
                    setValue('librado.cif', newValue);
                    updateProperty(newValue, 'librado.cif');
                    trigger('librado.cif');
                  }}
                  error={
                    fieldHasError(errors, 'librado.razonSocial') ? true : null
                  }
                  empresasFormInfocif
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: 'Razón social del Deudor obligatorio',
              },
            }}
            name="librado.razonSocial"
            control={control}
            defaultValue={cesion?.libradoRazonSocial || ''}
          />
          <Error property="librado.razonSocial" errors={errors} />
        </FormField>
        <FormField>
          <label htmlFor="pais">País*</label>
          <Controller
            render={({ field }) => {
              const { onChange, value, name, ref } = field;
              return (
                <DropdownFilter
                  onChange={(e) => {
                    onChange(e);
                    updateProperty(e, 'pais');
                  }}
                  value={value}
                  inputRef={ref}
                  name={name}
                  options={reorderedCountries}
                  error={fieldHasError(errors, 'pais') ? true : null}
                  showClear={false}
                  filter
                  disabled={isDisabled}
                  emptyFilterMessage="Sin resultados"
                  className="cesion__dropdown"
                />
              );
            }}
            rules={{ required: true }}
            onChange={([e]) => {
              return { value: e };
            }}
            defaultValue={cesion?.pais || ''}
            name="pais"
            control={control}
          />
          <Error property="pais" errors={errors} />
        </FormField>
        <FormField>
          <label htmlFor="descripcion">Descripción*</label>
          <Controller
            render={({ field }) => {
              const { onChange, value, name } = field;
              return (
                <InputText
                  className="data-hj-allow"
                  onChange={(e) => {
                    onChange(e);
                    updateProperty(e, 'descripcion');
                  }}
                  disabled={isDisabled}
                  value={value}
                  name={name}
                  placeholder="(Sin descripción)"
                  error={fieldHasError(errors, 'descripcion') ? true : null}
                />
              );
            }}
            name="descripcion"
            rules={{
              required: {
                value: true,
                message: 'Descripción obligatoria',
              },
              minLength: {
                value: 10,
                message: 'Mínimo 10 caracteres',
              },
            }}
            control={control}
            value={cesion?.descripcion}
            defaultValue={cesion?.descripcion || ''}
          />
          <Error property="descripcion" errors={errors} />
        </FormField>
        <FormField>
          <label htmlFor="importe">Ventas anuales estimadas*</label>
          <Controller
            render={({ field }) => {
              const { onChange, name, ref } = field;
              return (
                <InputCurrency
                  className="data-hj-allow"
                  onChange={(valor) => {
                    onChange(valor);
                    updateProperty(valor, 'importe');
                  }}
                  value={cesion?.importe}
                  isDisabled={isDisabled}
                  inputRef={ref}
                  name={name}
                  error={fieldHasError(errors, 'importe') ? true : null}
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: 'Ventas anuales estimadas obligatorias',
              },
              min: {
                value: 1,
                message: 'Debe insertar un importe mínimo',
              },
            }}
            name="importe"
            control={control}
            defaultValue={cesion?.importe || ''}
          />
          <Error property="importe" errors={errors} />
        </FormField>
        <FormField>
          <label htmlFor="fechaInicio">Fecha de inicio*</label>
          <Controller
            render={({ field }) => {
              const { onChange, name, ref } = field;
              return (
                <InputCalendar
                  className="data-hj-allow"
                  onChange={(e) => {
                    onChange(e);
                    updateProperty(e, 'fechaInicio');
                  }}
                  value={cesion?.fechaInicio}
                  inputRef={ref}
                  placeholder="DD/MM/YYYY"
                  name={name}
                  disabled={isDisabled || cesion?.id}
                  error={fieldHasError(errors, 'fechaInicio') ? true : null}
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: 'Fecha contrato obligatoria',
              },
            }}
            name="fechaInicio"
            control={control}
            defaultValue={cesion?.fechaInicio || ''}
          />
          <Error property="fechaInicio" errors={errors} />
        </FormField>
      </div>
      <div className="p-field" style={{ textAlign: 'right' }}>
        * Campos obligatorios
      </div>
    </div>
  );
};

export default CesionFuturoFields;
