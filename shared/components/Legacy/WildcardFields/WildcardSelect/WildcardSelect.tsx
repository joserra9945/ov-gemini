/* eslint-disable @typescript-eslint/no-explicit-any */

import { Controller } from 'react-hook-form';
import { isNumber } from 'lodash';

import { Dropdown, Error } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildcardSelect extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  optionLabel?: string;
  required?: boolean;
  className?: string;
  optionValue?: string;
  placeholder?: string;
  tooltip?: string;
  options: any[];
  onFocus?: any;
  defaultValue?: any;
  valueTemplate?: any;
  itemTemplate?: any;
  additionalFunction?: boolean | ((e: any) => void);
  panelClassName?: string;
}

const WildcardSelect = ({
  rhForm,
  data,
  required = false,
  inputName,
  options,
  inputLabel,
  optionLabel = '',
  isDisabled = false,
  onFocus = false,
  className,
  placeholder,
  valueTemplate,
  optionValue,
  itemTemplate,
  tooltip,
  defaultValue,
  additionalFunction = false,
  index,
  panelClassName,
}: IWildcardSelect): JSX.Element => {
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
            render={({ field }) => {
              const { onChange, onBlur, name, value } = field;
              return (
                <Dropdown
                  value={value}
                  name={name}
                  options={options}
                  optionLabel={optionLabel}
                  disabled={isDisabled}
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e);
                    if (
                      additionalFunction &&
                      typeof additionalFunction === 'function'
                    ) {
                      additionalFunction(e);
                    }
                  }}
                  className={className}
                  onFocus={(e: any) => onFocus && onFocus(e)}
                  placeholder={placeholder}
                  valueTemplate={valueTemplate}
                  optionValue={optionValue}
                  itemTemplate={itemTemplate}
                  tooltip={tooltip}
                  error={fieldHasError(errors, inputName)}
                  panelClassName={panelClassName}
                />
              );
            }}
            rules={{
              required: {
                value: required,
                message: `El campo ${inputLabel} es obligatorio`,
              },
            }}
            defaultValue={
              isNumber(defaultValue)
                ? defaultValue
                : data && data[inputName] !== null
                ? data[inputName]
                : null
            }
            name={`${inputName}` as const}
            control={control}
          />
          <Error property={inputName} errors={errors} index={index} />
        </div>
      </div>
    </div>
  );
};

export default WildcardSelect;
