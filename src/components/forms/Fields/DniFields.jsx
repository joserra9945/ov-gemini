/* eslint-disable @typescript-eslint/no-shadow */
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import InputCalendar from 'utils/forms/Calendar';

import { InputMask, InputText } from 'components/CustomInputs';

const DniFields = ({ dni, updateProperty, rhForm }) => {
  const [validNIF, setValidNIF] = useState(true);
  const { errors, control } = rhForm;

  return (
    <div className="formulario-container-dni">
      <div className="titulo-stepper-card">
        <h2>Datos del DNI</h2>
      </div>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="dni">Nº DNI*</label>
          <Controller
            render={({ field }) => {
              const { onChange, value, name, ref } = field;
              return (
                <InputMask
                  onFocus={(e) => {
                    e.target.setSelectionRange(0, e.target.value.length);
                  }}
                  onChange={(e) => {
                    onChange(e);
                    updateProperty(e, 'numeroDni');
                  }}
                  value={value}
                  inputRef={ref}
                  name={name}
                  mask="*9999999*"
                  error={errors ? errors?.dni : null}
                />
              );
            }}
            rules={{
              required: true,
              validate: (dni) => {
                let numero;
                let letr;
                let letra;
                const expresionRegularDni = /^\d{8}[a-zA-Z]$/;
                if (expresionRegularDni.test(dni) === true) {
                  numero = dni.substr(0, dni.length - 1);
                  letr = dni.substr(dni.length - 1, 1);
                  numero %= 23;
                  letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
                  letra = letra.substring(numero, numero + 1);
                  if (letra !== letr.toUpperCase()) {
                    setValidNIF(false);
                    return false;
                  }
                  setValidNIF(true);
                  return true;
                }
                setValidNIF(false);
                return false;
              },
            }}
            name="dni"
            control={control}
            defaultValue={dni.numeroDni ? dni.numeroDni : ''}
          />
          {errors?.dni && !validNIF && (
            <small id="dni" className="p-invalid">
              Introduzca un DNI válido
            </small>
          )}
          {errors?.dni && validNIF && (
            <small id="dni" className="p-invalid">
              El DNI es obligatorio
            </small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="lastname1">Nombre*</label>
          <Controller
            render={({ field }) => {
              const { onChange, value, name, ref } = field;
              return (
                <InputText
                  onChange={(e) => {
                    onChange(e);
                    updateProperty(e, 'Nombre');
                  }}
                  value={value}
                  inputRef={ref}
                  name={name}
                  error={errors ? errors?.nombre : null}
                />
              );
            }}
            rules={{ required: true }}
            name="nombre"
            control={control}
            defaultValue={dni.Nombre ? dni.Nombre : ''}
          />
          {errors?.nombre && (
            <small id="nombre" className="p-invalid">
              El Nombre es obligatorio
            </small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="lastname1">Apellidos*</label>
          <Controller
            render={({ field }) => {
              const { onChange, value, name, ref } = field;
              return (
                <InputText
                  onChange={(e) => {
                    onChange(e);
                    updateProperty(e, 'Apellidos');
                  }}
                  value={value}
                  inputRef={ref}
                  name={name}
                  error={errors ? errors?.apellidos : null}
                />
              );
            }}
            rules={{ required: true }}
            name="apellidos"
            control={control}
            defaultValue={dni.Apellidos ? dni.Apellidos : ''}
          />
          {errors?.apellidos && (
            <small id="apellidos" className="p-invalid">
              Los apellidos son obligatorios
            </small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="validez">Fecha validez*</label>

          <Controller
            render={({ field }) => {
              const { onChange, value, name, ref } = field;
              return (
                <InputCalendar
                  onChange={(e) => {
                    onChange(e);
                    updateProperty(e, 'Validez');
                  }}
                  value={value}
                  inputRef={ref}
                  name={name}
                  minDate={new Date()}
                  error={errors ? errors?.validez : null}
                />
              );
            }}
            rules={{ required: true }}
            name="validez"
            control={control}
            defaultValue={dni.Validez ? dni.Validez : ''}
          />
          {errors?.validez && (
            <small id="validez" className="p-invalid">
              La fecha de caducidad es obligatoria
            </small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="direccion">Dirección*</label>
          <Controller
            render={({ field }) => {
              const { onChange, value, name, ref } = field;
              return (
                <InputText
                  onChange={(e) => {
                    onChange(e);
                    updateProperty(e, 'Direccion');
                  }}
                  value={value}
                  inputRef={ref}
                  name={name}
                  error={errors ? errors?.direccion : null}
                />
              );
            }}
            rules={{ required: true }}
            name="direccion"
            control={control}
            defaultValue={dni.Direccion ? dni.Direccion : ''}
          />
          {errors?.direccion && (
            <small id="direccion" className="p-invalid">
              La dirección es obligatoria
            </small>
          )}
        </div>
        <div className="p-field" style={{ textAlign: 'right' }}>
          * Campos obligatorios
        </div>
      </div>
    </div>
  );
};

export default DniFields;
