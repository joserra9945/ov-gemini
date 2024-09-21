/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import {
  faCircleCheck,
  faCircleInfo,
  faPlusCircle,
} from '@fortawesome/pro-light-svg-icons';

import { Button } from '@shared/components/Button';
import { estadoCuentaBancariaEnum } from '@shared/utils/constants';

import { DropdownFilter } from 'components/CustomInputs';
import { Error } from 'components/forms/Fields';
import InfoIconToOverlay from 'components/InfoIconToOverlay';

import {
  selectItemTemplate,
  selectMultiValueLabelTemplate,
  SingleValue,
} from './selectTemplates';

import './fields.scss';

const Fields = ({
  optionsRepresentante,
  optionsCuenta,
  setSelectedCuenta,
  setSelectedRepresentantes,
  infoIcon,
  addRepresentantes,
  addCuenta,
  rhForm,
}) => {
  const {
    control,
    formState: { errors },
  } = rhForm;

  const itemTemplate = useCallback(
    (props) => selectItemTemplate(props, addRepresentantes, infoIcon),
    [addRepresentantes, infoIcon]
  );

  const multiValueLabelTemplate = useCallback(
    (props) => selectMultiValueLabelTemplate(props),
    []
  );

  const infoCuentaIcon = (isCompleted) => (
    <InfoIconToOverlay
      iconClasses={isCompleted ? 'text-success' : 'text-danger'}
      icon={isCompleted ? faCircleCheck : faCircleInfo}
      tooltipContent={isCompleted ? 'Cuenta validada' : 'Cuenta sin validar'}
      type="tooltip"
    />
  );

  const cuentaTemplate = (props) => {
    const {
      data,
      innerProps,
      innerRef,
      getStyles,
      isDisabled,
      isFocused,
      isSelected,
    } = props;
    const { estado, iban, id } = data;
    if (id === 0) {
      return (
        <>
          <div
            className="d-flex justify-content-between"
            type="button"
            tabIndex="-1"
            role="button"
            onClick={addCuenta}
          >
            <Button
              type="text-button"
              text="Añadir cuenta bancaria"
              link
              icon={faPlusCircle}
              className="mr-1 py-2 px-4 hover:bg-primary bg-white hover:text-white text-black "
            />
          </div>
          <div className="separator" />
        </>
      );
    }
    return (
      <article
        {...innerProps}
        className="cuentas__item-template"
        ref={innerRef}
        style={{
          ...getStyles('option', props),
          option: true,
          optionIsDisabled: isDisabled,
          optionIsFocused: isFocused,
          optionIsSelected: isSelected,
        }}
      >
        {estado.id === estadoCuentaBancariaEnum.VALIDADA ? (
          <>
            <span>{iban.completo}</span>
            {infoCuentaIcon(true)}
          </>
        ) : (
          <>
            <span>{iban.completo}</span>
            {infoCuentaIcon(false)}
          </>
        )}
      </article>
    );
  };

  return (
    <div className="fields">
      <div className="row">
        <div className="col-md-6">
          <div className="label">Firmantes</div>
          <div className="input select-firmantes">
            <Controller
              render={({ field }) => {
                const { onChange, name, value } = field;
                return (
                  <DropdownFilter
                    value={value}
                    options={optionsRepresentante}
                    isMulti
                    onChange={(e) => {
                      setSelectedRepresentantes(e);
                      onChange(e);
                    }}
                    name={name}
                    formatOptionLabel={itemTemplate}
                    multiValueLabel={multiValueLabelTemplate}
                    placeholder="Seleccione opción"
                    property="nombre"
                    className={`ignore-zindex${
                      errors?.selectFirmantes ? ' p-invalid-validation' : ''
                    }`}
                  />
                );
              }}
              rules={{
                required: {
                  value: true,
                  message: 'Campo obligatorio',
                },
              }}
              name="selectFirmantes"
              control={control}
            />
            <Error property="selectFirmantes" errors={errors} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="label">Cuentas</div>
          <div className="input select-cuenta">
            <Controller
              render={({ field }) => {
                const { onChange, value, name } = field;
                return (
                  <DropdownFilter
                    value={value}
                    options={optionsCuenta}
                    onChange={(e) => {
                      setSelectedCuenta(e);
                      onChange(e);
                    }}
                    placeholder="Selecciona una cuenta"
                    formatOptionLabel={cuentaTemplate}
                    formatSingleValue={SingleValue}
                    name={name}
                    className={`ignore-zindex${
                      errors?.selectCuentas ? ' p-invalid-validation' : ''
                    }`}
                  />
                );
              }}
              rules={{
                required: {
                  value: true,
                  message: 'Campo obligatorio',
                },
              }}
              defaultValue={null}
              name="selectCuentas"
              control={control}
            />
            <Error property="selectCuentas" errors={errors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fields;
