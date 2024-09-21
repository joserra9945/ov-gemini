import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { tipoFirmas, tipoFirmasEnum } from '@shared/utils/constants';
import { fieldHasError } from '@shared/utils/utils';

import {
  CustomPhone,
  isValidPhoneNumber,
} from '@shared/components/Legacy/CustomInputs';

import {
  DropdownFilter,
  InputCalendar,
  InputText,
} from 'components/CustomInputs';
import CustomDropdown from 'components/CustomInputs/Dropdown';

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

const CesionFirmarContratoFields = ({
  rhForm,
  firma,
  updateProperty,
  isDisabled = false,
  notarios,
  notariosLocales,
  apoderados,
  firmantes,
}) => {
  const {
    formState: { errors },
    control,
    trigger,
  } = rhForm;
  const [tipoFirma, setTipoFirma] = useState(2);
  const { isAdUser } = useSelector((state) => state.userState);

  useEffect(() => {
    if (firma?.tipo?.id) {
      setTipoFirma(firma?.tipo?.id);
    }
  }, [firma]);

  return (
    <div className="firma-fields">
      <div className="ui-fluid p-formgrid p-grid">
        <FormField>
          <label htmlFor="notarioId">Notaría*</label>
          <Controller
            render={({ field }) => {
              const { onChange, value, name, ref } = field;
              return (
                <CustomDropdown
                  onChange={(e) => {
                    onChange(e);
                    updateProperty(e, 'notarioId');
                    trigger('notarioId');
                  }}
                  value={value}
                  inputRef={ref}
                  name={name}
                  options={notarios}
                  error={fieldHasError(errors, 'notarioId') ? true : null}
                  className="firma__dropdown"
                  disabled={isDisabled}
                />
              );
            }}
            rules={{ required: !isDisabled }}
            defaultValue={firma?.notarioId || ''}
            name="notarioId"
            control={control}
          />
          <Error property="notarioId" errors={errors} />
        </FormField>
        {isAdUser && tipoFirma === tipoFirmasEnum.PARCIAL && (
          <FormField>
            <label htmlFor="notarioLocalId">Notario (Notificación)*</label>
            <Controller
              render={({ field }) => {
                const { onChange, value, name, ref } = field;
                return (
                  <CustomDropdown
                    onChange={(e) => {
                      onChange(e);
                      updateProperty(e, 'notarioLocalId');
                      trigger('notarioLocalId');
                    }}
                    value={value}
                    inputRef={ref}
                    name={name}
                    options={notariosLocales}
                    error={
                      fieldHasError(errors, 'notarioLocalId') ? true : null
                    }
                    className="firma__dropdown"
                    disabled={isDisabled}
                  />
                );
              }}
              rules={{ required: !isDisabled }}
              defaultValue={firma?.notarioLocalId || notariosLocales[0]}
              name="notarioLocalId"
              control={control}
            />
            <Error property="notarioLocalId" errors={errors} />
          </FormField>
        )}
        <FormField>
          <label htmlFor="fechaPrevista">Fecha prevista*</label>
          <Controller
            render={({ field }) => {
              const { onChange, value, name } = field;
              return (
                <InputCalendar
                  className="data-hj-allow"
                  onChange={(e) => {
                    updateProperty(e, name);
                    onChange(e);
                  }}
                  value={value}
                  placeholder="DD/MM/YYYY"
                  name={name}
                  error={fieldHasError(errors, 'fechaPrevista') ? true : null}
                  disabled={isDisabled}
                  showTime
                  showCloseIcon
                />
              );
            }}
            rules={{
              required: {
                value: !isDisabled,
                message: 'Fecha prevista obligatoria',
              },
              validate: (e) => {
                const today = moment(new Date());
                const selectedDay = moment(e);
                if (today.isSameOrAfter(selectedDay))
                  return 'La fecha prevista no puede ser anterior a este momento';
              },
            }}
            name="fechaPrevista"
            control={control}
            defaultValue={firma?.fechaPrevista || ''}
          />
          <Error property="fechaPrevista" errors={errors} />
        </FormField>
        {isAdUser && (
          <FormField>
            <label htmlFor="tipo">Tipo*</label>
            <Controller
              render={({ field }) => {
                const { onChange, value, name, ref } = field;
                return (
                  <CustomDropdown
                    onChange={(e) => {
                      onChange(e);
                      updateProperty(e, 'tipo');
                      trigger('tipo');
                      setTipoFirma(e.id);
                    }}
                    value={value}
                    inputRef={ref}
                    name={name}
                    options={tipoFirmas}
                    error={fieldHasError(errors, 'tipo') ? true : null}
                    className="firma__dropdown"
                    disabled={isDisabled}
                  />
                );
              }}
              rules={{ required: !isDisabled }}
              defaultValue={firma?.tipo || ''}
              name="tipo"
              control={control}
            />
            <Error property="tipo" errors={errors} />
          </FormField>
        )}
        {isAdUser && (
          <FormField>
            <label htmlFor="representanteInternoIds">Apoderado*</label>
            <Controller
              render={({ field }) => {
                const { onChange, value, name } = field;
                return (
                  <CustomDropdown
                    onChange={(e) => {
                      onChange(e);
                      updateProperty(e, 'representanteInternoIds');
                      trigger('representanteInternoIds');
                    }}
                    value={value}
                    name={name}
                    options={apoderados}
                    error={
                      fieldHasError(errors, 'representanteInternoIds')
                        ? true
                        : null
                    }
                    className="firma__dropdown"
                    disabled={isDisabled}
                  />
                );
              }}
              rules={{ required: !isDisabled }}
              defaultValue={firma?.representanteInternoIds || ''}
              name="representanteInternoIds"
              control={control}
            />
            <Error property="representanteInternoIds" errors={errors} />
          </FormField>
        )}
        <FormField>
          <label htmlFor="representanteEmail">
            {isAdUser
              ? 'Email del cliente para notificar*'
              : 'Email para notificarle*'}
          </label>
          <Controller
            render={({ field }) => {
              const { onChange, value, name } = field;
              return (
                <InputText
                  className="data-hj-allow"
                  onChange={(e) => {
                    onChange(e);
                    updateProperty(e, 'representanteEmail');
                  }}
                  disabled={isDisabled}
                  value={value || ''}
                  name={name}
                  placeholder=""
                  error={
                    fieldHasError(errors, 'representanteEmail') ? true : null
                  }
                />
              );
            }}
            rules={{
              required: {
                value: !isDisabled,
                message: 'Email obligatorio',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            }}
            name="representanteEmail"
            control={control}
            defaultValue={firma?.representanteEmail || ''}
          />
          <Error property="representanteEmail" errors={errors} />
        </FormField>
        <FormField>
          <label htmlFor="representanteTelefono">
            {isAdUser
              ? 'Teléfono del cliente para notificar*'
              : 'Teléfono para notificar*'}
          </label>
          <Controller
            render={({ field }) => {
              const { onChange, value, name } = field;
              return (
                <CustomPhone
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="ES"
                  value={value || ''}
                  className="p-inputtext"
                  name={name}
                  onChange={(e) => {
                    onChange(e);
                    updateProperty(e, 'representanteTelefono');
                  }}
                  isDisabled={isDisabled}
                />
              );
            }}
            rules={{
              required: {
                value: !isDisabled,
                message: 'Teléfono obligatorio',
              },
              validate: (e) => {
                if (e?.length > 0 && !isValidPhoneNumber(e))
                  return 'Teléfono no válido';
              },
            }}
            name="representanteTelefono"
            control={control}
            defaultValue={firma?.representanteTelefono || ''}
          />
          <Error property="representanteTelefono" errors={errors} />
        </FormField>
        <FormField>
          <label htmlFor="representanteIds">Firmantes* </label>
          <Controller
            render={({ field }) => {
              const { onChange, value, name } = field;
              return (
                <DropdownFilter
                  value={value}
                  name={name}
                  options={firmantes}
                  error={
                    fieldHasError(errors, 'representanteIds') ? true : null
                  }
                  className="firma__dropdown"
                  isMulti
                  onChange={(e) => {
                    onChange(e);
                    updateProperty(e, 'representanteIds');
                    trigger('representanteIds');
                  }}
                  optionDisabled={(option) => !option.esCompleto}
                  placeholder="Seleccione opción"
                  property="nombre"
                  disabled={isDisabled}
                />
              );
            }}
            rules={{
              validate: (e) => {
                return e !== null && e.length > 0;
              },
            }}
            defaultValue={firma?.representanteIds || ''}
            name="representanteIds"
            control={control}
          />
          <Error property="representanteIds" errors={errors} />
        </FormField>
      </div>
      <div className="p-field" style={{ textAlign: 'right' }}>
        * Campos obligatorios
      </div>
    </div>
  );
};

export default CesionFirmarContratoFields;
