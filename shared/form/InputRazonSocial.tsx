import { FocusEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { IEmpresas } from '@shared/interfaces';
import { IGenericInput } from '@shared/interfaces/common/Form';

import { EmpresasAutoComplete } from '@shared/components/Legacy/CustomInputs';

interface IWildcardRazonSocial extends IGenericInput {
  nameToSet: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onSelect?: (e: IEmpresas) => void;
  valueName?: string;
  valueToSet?: string;
}

const InputRazonSocial = ({
  data,
  grupoEmpresas = false,
  label: inputLabel,
  isDisabled = false,
  name: inputName,
  nameToSet: inputNameToSet,
  onBlur = () => {},
  onSelect = () => {},
  required = false,
  valueName = 'razonSocial',
  valueToSet = 'id',
}: IWildcardRazonSocial): JSX.Element => {
  const {
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const getDefaultValue = () => {
    if (data?.librador) {
      return data.librador[inputName];
    }
    if (data?.librado) {
      return data.librado[inputName];
    }
    if (data) {
      return data[inputName];
    }

    return '';
  };

  return (
    <div className="flex-auto w-full">
      <label htmlFor={inputName} className="text-text">
        {inputLabel}
      </label>
      <Controller
        rules={{
          required: {
            value: required,
            message: `El campo ${inputLabel} es requerido`,
          },
        }}
        render={({ field: { onChange, value, name } }) => (
          <>
            <EmpresasAutoComplete
              grupoEmpresas={grupoEmpresas}
              disabled={isDisabled}
              name={name}
              onBlur={onBlur}
              onChange={(e: string) => {
                onChange(e);
              }}
              onSelect={(e: IEmpresas) => onSelect(e)}
              setValue={(newValue: string) => {
                setValue(inputNameToSet, newValue);
                trigger(inputNameToSet);
              }}
              value={value}
              valueName={valueName}
              valueToSet={valueToSet}
            />
            {errors[name] && (
              <small className="p-error">
                {errors[name]?.message?.toString()}
              </small>
            )}
          </>
        )}
        control={control}
        defaultValue={getDefaultValue()}
        name={inputName}
      />
    </div>
  );
};

export default InputRazonSocial;
