/* eslint-disable @typescript-eslint/no-explicit-any */

import { Controller } from 'react-hook-form';

import { ElkSearchInput, Error } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface Props extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  onSelect?: (e: any) => void;
  type?: number;
}

const WildcardElkSearchInput = ({
  data,
  rhForm,
  isDisabled = false,
  index,
  inputName,
  inputLabel,
  required = false,
  onSelect = undefined,
  type,
}: Props): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = rhForm;
  return (
    <div className={`g-field ${inputName}-field`}>
      <div className="label">
        <label htmlFor={inputName}>{inputLabel}</label>
      </div>
      <div className="p-fluid">
        <div className="p-field">
          <Controller
            render={({ field: { onChange, onBlur, value, name } }) => (
              <ElkSearchInput
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                onSelect={(e: any) => onSelect && onSelect(e)}
                error={fieldHasError(errors, inputName)}
                disabled={isDisabled}
                type={type}
              />
            )}
            rules={{
              required: {
                value: required,
                message: `El campo ${inputLabel} es obligatorio`,
              },
            }}
            name={inputName}
            control={control}
            defaultValue={data ? data[inputName] : ''}
          />
          <Error property={inputName} errors={errors} index={index} />
        </div>
      </div>
    </div>
  );
};

export default WildcardElkSearchInput;
