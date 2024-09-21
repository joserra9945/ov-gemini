/* eslint-disable import/no-extraneous-dependencies */

import { Controller } from 'react-hook-form';
import { Checkbox } from 'primereact/checkbox';

import { Error } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';

interface IWildcardCheckbox extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  className?: string;
  myValue?: string | number;
}

const WildcardCheckbox = ({
  rhForm,
  isDisabled,
  inputName,
  inputLabel,
  required = false,
  data,
  className,
  index,
  myValue,
}: IWildcardCheckbox): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = rhForm;
  return (
    <div className={`g-field ${inputName}-field`}>
      <div className="g-checkbox">
        <Controller
          name={`${inputName}` as const}
          control={control}
          defaultValue={
            data ? (data[inputName] ? data[inputName] : false) : false
          }
          render={({ field }) => {
            const { onChange, name, value } = field;
            return (
              <Checkbox
                onChange={(e) => {
                  if (typeof myValue !== 'undefined') {
                    onChange(e.checked ? myValue : false);
                  } else {
                    onChange(e);
                  }
                }}
                checked={!!value}
                className={className}
                name={name}
                disabled={isDisabled}
                value={value}
              />
            );
          }}
          rules={
            !isDisabled
              ? {
                  required: {
                    value: required,
                    message: `El campo ${inputLabel} es obligatorio`,
                  },
                }
              : {}
          }
        />

        <label className="label-right" htmlFor={inputName}>
          {inputLabel}
        </label>
      </div>
      <Error property={inputName} errors={errors} index={index} />
    </div>
  );
};

export default WildcardCheckbox;
