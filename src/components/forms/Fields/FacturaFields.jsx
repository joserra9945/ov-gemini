/* eslint-disable @typescript-eslint/no-shadow */
import { Controller } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

import { validateSpanishID } from '@shared/utils/DNIValidator';
import { fieldHasError } from '@shared/utils/utils';

import { InputCurrency } from '@shared/components/Legacy/CustomInputs';

import { InputCalendar, InputText } from 'components/CustomInputs';
import EmpresasAutocomplete from 'components/EmpresasAutocomplete';

import Error from './Error';

const FacturaFields = ({
  rhForm,
  factura,
  updateProperty,
  canShow = true,
  isDisabled = false,
  libradorCif = null,
  isFacturaPagare = false,
  showFechaVencimiento = true,
}) => {
  const { formState, control, setValue, trigger, setError, clearErrors } =
    rhForm;
  const { errors } = formState;
  const location = useLocation();

  const isDisabledFromDocReq = location?.state?.fromDocReq;

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
    <div className="factura-fields">
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
                      disabled={
                        isDisabled || isFacturaPagare || isDisabledFromDocReq
                      }
                      onChange={(e) => {
                        onChange(e);
                        updateProperty(e, 'libradoCif');
                        trigger('libradoCif');
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
                defaultValue={factura?.libradoCif}
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
                      libradorCif={libradorCif}
                      onBlur={onBlur}
                      onChange={(e) => {
                        onChange(e);
                        updateProperty(e, 'libradoRazonSocial');
                        trigger('libradoRazonSocial');
                      }}
                      valueName="razonsocial"
                      valueToSet="cif"
                      disabled={
                        isDisabled || isFacturaPagare || isDisabledFromDocReq
                      }
                      setValue={(value) => {
                        setValue('libradoCif', value);
                        updateProperty(value, 'libradoCif');
                        trigger('libradoCif');
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
                defaultValue={factura?.libradoRazonSocial}
              />
              <Error property="libradoRazonSocial" errors={errors} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="numero">
                Número de factura {canShow ? '' : '(opcional)'}
              </label>
              <Controller
                render={({ field }) => {
                  const { onChange, onBlur, name, value, ref } = field;
                  return (
                    <InputText
                      className="data-hj-allow"
                      onChange={(e) => {
                        onChange(e);
                        updateProperty(e, 'numero');
                      }}
                      disabled={isDisabled}
                      value={value}
                      inputRef={ref}
                      name={name}
                      placeholder=""
                      onBlur={onBlur}
                      error={fieldHasError(errors, 'numero') ? true : null}
                    />
                  );
                }}
                rules={{
                  required: {
                    value: canShow,
                    message: 'Número de Factura obligatorio',
                  },
                }}
                name="numero"
                control={control}
                defaultValue={factura?.efectoNumero}
              />
              <Error property="numero" errors={errors} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-fluid">
            <div className="p-field" id="importeFactura">
              <label htmlFor="importeNominal">Importe de la factura</label>
              <Controller
                render={({ field }) => {
                  const { onChange, onBlur, name, ref, value } = field;
                  return (
                    <InputCurrency
                      className="data-hj-allow"
                      onChange={(valor) => {
                        updateProperty(valor, 'importeNominal');
                        onChange(valor);
                      }}
                      value={value}
                      isDisabled={isDisabled || isDisabledFromDocReq}
                      inputRef={ref}
                      onBlur={onBlur}
                      name={name}
                      error={
                        fieldHasError(errors, 'importeNominal') ? true : null
                      }
                    />
                  );
                }}
                control={control}
                defaultValue={factura?.importeNominal}
                name="importeNominal"
                rules={{
                  required: {
                    value: true,
                    message: 'Importe de la factura obligatorio',
                  },
                }}
              />
              <Error property="importeNominal" errors={errors} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="fechaEmision">Fecha de emisión</label>
              <Controller
                render={({ field }) => {
                  const { onChange, name, ref } = field;
                  return (
                    <InputCalendar
                      className="data-hj-allow"
                      onChange={(e) => {
                        onChange(e);
                        updateProperty(e, 'fechaEmision');
                      }}
                      maxDate={new Date()}
                      value={factura?.fechaEmision}
                      onSelect={() => validateDates(factura)}
                      inputRef={ref}
                      placeholder="DD/MM/YYYY"
                      name={name}
                      disabled={isDisabled}
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
                defaultValue={factura?.fechaEmision}
              />
              <Error property="fechaEmision" errors={errors} />
            </div>
          </div>
        </div>
        {!showFechaVencimiento && (
          <div className="col-md-6">
            <div className="p-fluid">
              <div className="p-field">
                <label htmlFor="fechaVencimiento">Fecha de vencimiento</label>
                <Controller
                  render={({ field }) => {
                    const { onChange, name, ref } = field;
                    return (
                      <InputCalendar
                        className="data-hj-allow"
                        onChange={(e) => {
                          updateProperty(e, 'fechaVencimiento');
                          onChange(e);
                        }}
                        value={factura?.fechaVencimiento}
                        onSelect={() => validateDates(factura)}
                        inputRef={ref}
                        placeholder="DD/MM/YYYY"
                        name={name}
                        disabled={isDisabled}
                        error={
                          fieldHasError(errors, 'fechaVencimiento')
                            ? true
                            : null
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
                  defaultValue={factura?.fechaVencimiento}
                />
                <Error property="fechaVencimiento" errors={errors} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacturaFields;
