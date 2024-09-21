/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import classNames from 'classnames/bind';

import usePrevious from '@shared/hooks/usePrevious';
import { validateSpanishID } from '@shared/utils/DNIValidator';

import {
  CustomPhone,
  isValidPhoneNumber,
} from '@shared/components/Legacy/CustomInputs';

import EmpresasAutocomplete from 'components/EmpresasAutocomplete';
import { nifTypes } from 'pages/SignUp/helpers';

import './SignUpForm.scss';

// #region COMPONENTS

const InputPass = ({ value, onChange, name, error }) => {
  const inputClass = classNames('data-hj-allow', {
    'input-text-login': true,
    'p-invalid p-mr-2': error,
  });
  return (
    <Password
      className={inputClass}
      feedback={false}
      id={name}
      value={value}
      name={name}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

// #endregion COMPONENTS

const SignUpForm = ({
  rhForm,
  setAcceptTerms,
  acceptTerms,
  onSubmit,
  comesFromLogin = false,
  librador,
  acceptCommunications,
  setAcceptCommunications,
}) => {
  const {
    formState: { errors },
    control,
    setValue,
    handleSubmit,
    trigger,
    clearErrors,
    setError,
    watch,
  } = rhForm;
  const getErrorMessageIfExists = (property) => {
    if (!errors[property]) return null;
    return errors[property].message;
  };
  const prevNifType = usePrevious(librador?.nifType);

  const onError = (errors) => {
    console.log('error', errors); // eslint-disable-line
  };

  const inputTextComponent = (onChange, name, value) => (
    <InputText
      id={name}
      name={name}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      className="data-hj-allow"
    />
  );

  useEffect(() => {
    if (
      librador?.nifType !== nifTypes.DNI &&
      prevNifType !== librador?.nifType &&
      errors?.telefono
    ) {
      clearErrors('telefono');
    } else if (librador?.nifType === nifTypes.DNI && errors?.telefono) {
      setError('telefono', {
        type: 'manual',
        message: 'Teléfono obligatorio.',
      });
    }
  }, [clearErrors, errors?.telefono, librador?.nifType, prevNifType, setError]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="general-form">
      {comesFromLogin && (
        <h2 className="text-lg font-medium text-info">Datos de tu empresa</h2>
      )}
      <div className="flex mt-1 form-field flex-column">
        <label htmlFor="libradorCif">CIF de tu empresa o NIF</label>
        <Controller
          render={({ field }) => {
            const { onChange, name, value } = field;
            return (
              <EmpresasAutocomplete
                value={value}
                name={name}
                onChange={(e) => {
                  onChange(e);
                  trigger('libradorCif');
                }}
                valueName="cif"
                valueToSet="razonsocial"
                setValue={(value) => {
                  setValue('libradorRazonSocial', value);
                  trigger('libradorRazonSocial');
                }}
                empresasFormInfocif
              />
            );
          }}
          rules={{
            required: {
              value: true,
              message: 'CIF/NIF obligatorio',
            },
            validate: (value) => {
              if (!validateSpanishID(value)) {
                return 'CIF/NIF no válido.';
              }
            },
          }}
          name="libradorCif"
          control={control}
        />
        <small id="libradorCif" className="p-invalid">
          {getErrorMessageIfExists('libradorCif')}
        </small>
      </div>
      {librador?.nifType === nifTypes.NIF && (
        <div className="flex mt-1 form-field flex-column">
          <label htmlFor="libradorRazonSocial">
            Razón social de tu empresa
          </label>
          <Controller
            render={({ field }) => {
              const { onChange, name, value } = field;
              return (
                <EmpresasAutocomplete
                  value={value}
                  name={name}
                  onChange={(e) => {
                    onChange(e);
                    trigger('libradorRazonSocial');
                  }}
                  valueName="razonsocial"
                  valueToSet="cif"
                  setValue={(value) => {
                    setValue('libradorCif', value);
                    trigger('libradorCif');
                  }}
                  empresasFormInfocif
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: 'Razón social obligatoria',
              },
            }}
            name="libradorRazonSocial"
            control={control}
          />
          <small id="libradorRazonSocial" className="p-invalid">
            {getErrorMessageIfExists('libradorRazonSocial')}
          </small>
        </div>
      )}
      {comesFromLogin && (
        <h2 className="mt-6 text-lg font-medium text-info">Datos personales</h2>
      )}
      <div className="flex row flex-column">
        <div className="w-full">
          <div className="mt-1 form-field">
            <label htmlFor="firstName">Nombre</label>
            <Controller
              render={({ field }) => {
                const { onChange, name, value } = field;
                return inputTextComponent(onChange, name, value);
              }}
              name="firstName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'El nombre es obligatorio',
                },
              }}
            />
            <small id="firstName" className="p-invalid">
              {getErrorMessageIfExists('firstName')}
            </small>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-1 form-field">
            <label htmlFor="lastName">Apellidos</label>
            <Controller
              render={({ field }) => {
                const { onChange, name, value } = field;
                return inputTextComponent(onChange, name, value);
              }}
              name="lastName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Los apellidos son obligatorios',
                },
              }}
            />
            <small id="lastName" className="p-invalid">
              {getErrorMessageIfExists('lastName')}
            </small>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-1 form-field">
            <label htmlFor="telefono">
              Móvil {librador?.nifType !== nifTypes.DNI ? '(Opcional)' : ''}
            </label>
            <Controller
              render={({ field }) => {
                const { onChange, name, value } = field;
                return (
                  <CustomPhone
                    countryCallingCodeEditable={false}
                    international
                    required
                    defaultCountry="ES"
                    value={value || null}
                    className="p-inputtext"
                    name={name}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                );
              }}
              rules={{
                required: {
                  value: librador?.nifType === nifTypes.DNI,
                  message: 'Teléfono obligatorio',
                },
                validate: (e) => {
                  if (e?.length > 0 && !isValidPhoneNumber(e))
                    return 'Teléfono no válido';
                },
              }}
              name="telefono"
              control={control}
            />
            <small id="telefono" className="p-invalid">
              {getErrorMessageIfExists('telefono')}
            </small>
          </div>
        </div>
      </div>
      {!comesFromLogin && (
        <>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <Controller
              render={({ field }) => {
                const { onChange, name, value } = field;
                return (
                  <InputText
                    id={name}
                    name={name}
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    className="data-hj-allow"
                  />
                );
              }}
              rules={{
                required: {
                  value: true,
                  message: 'Email obligatorio',
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                },
              }}
              name="email"
              control={control}
            />
            <small id="email" className="p-invalid">
              {getErrorMessageIfExists('email')}
            </small>
          </div>
          <div className="form-field-group">
            <div className="form-field">
              <label htmlFor="password">Contraseña</label>
              <Controller
                render={({ field }) => {
                  const { onChange, name, value } = field;
                  return (
                    <InputPass
                      onChange={(e) => {
                        onChange(e);
                      }}
                      name={name}
                      error={errors?.password}
                      value={value}
                    />
                  );
                }}
                rules={{
                  required: {
                    value: true,
                    message: 'Contraseña obligatoria',
                  },
                  validate: (value) => {
                    const pattern =
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&/\\()?¿*\-+=^,;.:_{}[\]]).{8,}$/;
                    if (!pattern.test(value)) {
                      return 'La contraseña debe tener al menos 8 carácteres, entre ellos, números, minúsculas, máyusculas y carácteres especiales';
                    }
                  },
                }}
                name="password"
                control={control}
              />
              <small id="password" className="p-invalid">
                {getErrorMessageIfExists('password')}
              </small>
            </div>
          </div>
        </>
      )}
      <div className="flex mt-6 flex-column">
        <div className="flex items-center form-field --checkbox">
          <Checkbox
            className="mr-2"
            id="terminos"
            onChange={(e) => setAcceptTerms(e.checked)}
            checked={acceptTerms}
            name="accept-terms"
            required
          />
          <label htmlFor="accept-terms">
            <p>
              He leído y acepto las{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://finanedi.es/aviso-legal.html"
              >
                condiciones de uso
              </a>
            </p>
          </label>
        </div>
        <div className="flex items-center form-field --checkbox">
          <Checkbox
            className="mr-2"
            id="newsletter"
            onChange={(e) => setAcceptCommunications(e.checked)}
            checked={acceptCommunications}
            name="accept-communications"
          />
          <label htmlFor="accept-communications">
            Consiento comunicaciones comerciales
          </label>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
