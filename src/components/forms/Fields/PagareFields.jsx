/* eslint-disable @typescript-eslint/no-shadow */
import { Controller } from 'react-hook-form';
import EjemploPagare from 'assets/ejemploPagare.png';
import moment from 'moment';

import { instrumentos } from '@shared/utils/constants';
import { validateSpanishID } from '@shared/utils/DNIValidator';
import { fieldHasError } from '@shared/utils/utilsOv';

import { InputCurrency } from '@shared/components/Legacy/CustomInputs';
import { WildcardInputLocation } from '@shared/components/Legacy/WildcardFields';

import { Dropdown, InputCalendar, InputText } from 'components/CustomInputs';
import EmpresasAutocomplete from 'components/EmpresasAutocomplete';
import InfoIconToOverlay from 'components/InfoIconToOverlay';

import Error from './Error';

const PagareFields = ({
  rhForm,
  pagare,
  updateProperty,
  isDisabled = false,
  canShow = true,
}) => {
  const { formState, control, trigger, setValue, setError, clearErrors } =
    rhForm;
  const { errors } = formState;

  const validateDates = (item) => {
    const fEmision = item.fechaEmision;
    const fVencimiento = item.fechaVencimiento;
    if (
      fEmision !== null &&
      fEmision !== '' &&
      fVencimiento !== null &&
      fVencimiento !== ''
    ) {
      const d1 = new Date(fEmision);
      const d2 = new Date(fVencimiento);
      const res = d1.getTime() >= d2.getTime();
      setTimeout(() => {
        if (res)
          setError(`fechaEmision`, {
            type: 'manual',
            message:
              'Fecha de emisión no puede ser posterior que la fecha de vencimiento.',
          });
        else {
          clearErrors(`fechaEmision`);
        }
      }, 500);
    }
  };

  const parseToNumber = (variable) =>
    typeof variable === 'boolean' ? (variable ? 2 : 1) : variable;

  return (
    <div className="pagare-fields">
      <div className="row">
        <div className="col-md-6">
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="libradoCif">NIF/CIF de su cliente</label>
              <Controller
                render={({ field }) => {
                  const { onChange, onBlur, value, name } = field;
                  return (
                    <EmpresasAutocomplete
                      value={value}
                      name={name}
                      disabled={isDisabled}
                      onChange={(e) => {
                        onChange(e);
                        trigger('libradoCif');
                        updateProperty(e, 'libradoCif');
                      }}
                      valueName="cif"
                      onBlur={onBlur}
                      valueToSet="razonsocial"
                      setValue={(value) => {
                        setValue('libradoRazonSocial', value);
                        updateProperty(value, 'libradoRazonSocial');
                        trigger('libradoRazonSocial');
                      }}
                      error={fieldHasError(errors, 'libradoCif') ? true : null}
                      empresasFormInfocif
                    />
                  );
                }}
                rules={{
                  required: {
                    value: true,
                    message: 'El nif/cif es obligatorio',
                  },
                  validate: (value) => {
                    if (!validateSpanishID(value)) {
                      return 'CIF/NIF no válido.';
                    }
                  },
                }}
                name="libradoCif"
                control={control}
                defaultValue={pagare?.libradoCif}
              />
              <Error property="libradoCif" errors={errors} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="libradoRazonSocial">
                Razón social de su cliente
              </label>
              <Controller
                render={({ field }) => {
                  const { onChange, onBlur, value, name } = field;
                  return (
                    <EmpresasAutocomplete
                      value={value}
                      name={name}
                      disabled={isDisabled}
                      onChange={(e) => {
                        onChange(e);
                        updateProperty(e, 'libradoRazonSocial');

                        trigger('libradoRazonSocial');
                      }}
                      valueName="razonsocial"
                      valueToSet="cif"
                      onBlur={onBlur}
                      setValue={(value) => {
                        setValue('libradoCif', value);
                        trigger('libradoCif');
                        updateProperty(value, 'libradoCif');
                      }}
                      error={
                        fieldHasError(errors, 'libradoRazonSocial')
                          ? true
                          : null
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
                name="libradoRazonSocial"
                control={control}
                defaultValue={pagare?.libradoRazonSocial}
              />
              <Error property="libradoRazonSocial" errors={errors} />
            </div>
          </div>
        </div>
        {canShow && (
          <div className="col-md-6">
            <div className="p-fluid">
              <div className="p-field">
                <label htmlFor="numero">Número del pagaré</label>&nbsp;
                <InfoIconToOverlay
                  title="Ejemplo de pagaré"
                  tooltipContent="Haga click aquí para ver un ejemplo de pagaré"
                  content={
                    <img
                      style={{ width: '100%' }}
                      src={EjemploPagare}
                      alt="ejemplo-pagare"
                    />
                  }
                  type="modal"
                />
                <Controller
                  render={({ field }) => {
                    const { onChange, onBlur, value, name, ref } = field;
                    return (
                      <InputText
                        onChange={(e) => {
                          onChange(e);
                          updateProperty(e, 'numero');
                        }}
                        disabled={isDisabled}
                        value={value}
                        inputRef={ref}
                        onBlur={onBlur}
                        name={name}
                        placeholder=""
                        error={fieldHasError(errors, 'numero') ? true : null}
                      />
                    );
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: 'Número de pagaré obligatorio',
                    },
                  }}
                  name="numero"
                  control={control}
                  value={pagare?.numero}
                  defaultValue={pagare?.numero}
                />
                <Error property="numero" errors={errors} />
              </div>
            </div>
          </div>
        )}
        <div className="col-md-6">
          <div className="p-fluid">
            <div className="p-field" id="importeFactura">
              <label htmlFor="importeNominal">Importe del pagaré</label>
              <Controller
                render={({ field }) => {
                  const { onChange, onBlur, value, name, ref } = field;
                  return (
                    <InputCurrency
                      onChange={(valor) => {
                        onChange(valor);
                        updateProperty(valor, 'importeNominal');
                      }}
                      onBlur={onBlur}
                      value={value}
                      isDisabled={isDisabled}
                      inputRef={ref}
                      name={name}
                      error={
                        fieldHasError(errors, 'importeNominal') ? true : null
                      }
                    />
                  );
                }}
                control={control}
                defaultValue={pagare?.importeNominal}
                name="importeNominal"
                rules={{
                  required: {
                    value: true,
                    message: 'Importe del pagaré obligatorio',
                  },
                }}
              />
              <Error property="importeNominal" errors={errors} />
            </div>
          </div>
        </div>

        <div className="col-md-6 lugar-emision-wildcard">
          <WildcardInputLocation
            inputName="lugarEmision"
            inputLabel="Lugar de emisión"
            rhForm={rhForm}
            updateProperty={updateProperty}
            isDisabled={isDisabled}
          />
        </div>
        {canShow && (
          <div className="col-md-6">
            <div className="p-fluid">
              <div className="p-field">
                <label htmlFor="tipo">Tipo de pagaré</label>
                <Controller
                  render={({ field }) => {
                    const { onChange, value } = field;
                    return (
                      <Dropdown
                        className="tipoPagare"
                        name="tipoPagare"
                        disabled={isDisabled}
                        value={value || 'PAGOR'}
                        options={instrumentos}
                        optionLabel="name"
                        onChange={(valor) => {
                          onChange(valor);
                          updateProperty(valor, 'tipo');
                        }}
                        placeholder=""
                      />
                    );
                  }}
                  name="tipo"
                  control={control}
                  defaultValue={pagare.tipo}
                />
                <Error property="tipo" errors={errors} />
              </div>
            </div>
          </div>
        )}
        <div className="col-md-6">
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="fechaEmision">Fecha de emisión</label>
              <Controller
                render={({ field }) => {
                  const { onChange, value, name, ref } = field;
                  return (
                    <InputCalendar
                      onChange={(e) => {
                        onChange(e);
                        updateProperty(e, 'fechaEmision');
                      }}
                      maxDate={new Date()}
                      value={value}
                      disabled={isDisabled}
                      inputRef={ref}
                      onSelect={() => validateDates(pagare)}
                      placeholder="DD/MM/YYYY"
                      name={name}
                      error={
                        fieldHasError(errors, 'fechaEmision') ? true : null
                      }
                    />
                  );
                }}
                rules={{
                  required: {
                    value: true,
                    message: 'Fecha emisión obligatoria',
                  },
                }}
                id="fechaEmision"
                name="fechaEmision"
                control={control}
                defaultValue={pagare.fechaEmision}
              />
              <Error property="fechaEmision" errors={errors} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="fechaVencimiento">Fecha de vencimiento</label>
              <Controller
                render={({ field }) => {
                  const { onChange, value, name, ref } = field;
                  return (
                    <InputCalendar
                      onChange={(e) => {
                        onChange(e);
                        updateProperty(e, 'fechaVencimiento');
                      }}
                      value={value}
                      disabled={isDisabled}
                      onSelect={() => validateDates(pagare)}
                      inputRef={ref}
                      placeholder="DD/MM/YYYY"
                      name={name}
                      error={
                        fieldHasError(errors, 'fechaVencimiento') ? true : null
                      }
                    />
                  );
                }}
                rules={{
                  required: {
                    value: true,
                    message: 'Fecha vencimiento obligatoria',
                  },
                  validate: (e) => {
                    const today = moment(new Date(2000, 0, 1));
                    const selectedDay = moment(e);
                    if (selectedDay.diff(today, 'days') < 0)
                      return 'La fecha de vencimiento debe ser posterior al 01/01/2000.';
                  },
                }}
                id="fechaVencimiento"
                name="fechaVencimiento"
                control={control}
                defaultValue={pagare.fechaVencimiento}
              />
              <Error property="fechaVencimiento" errors={errors} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagareFields;
