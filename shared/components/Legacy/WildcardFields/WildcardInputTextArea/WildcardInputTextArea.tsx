import { Controller } from 'react-hook-form';
import { TooltipOptions } from 'primereact/tooltip/tooltipoptions';

import {
  CustomInputTextArea,
  Error,
} from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildCardInputTextArea extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  className?: string;
  autoResize?: boolean;
  tooltip?: string;
  tooltipOptions?: TooltipOptions;
  rows?: number;
  cols?: number;
}

const WildCardInputTextArea = ({
  rhForm,
  inputName,
  inputLabel,
  required = false,
  data,
  className,
  isDisabled = false,
  autoResize = false,
  tooltip,
  tooltipOptions,
  rows = 5,
  cols = 20,
  index,
  ...props
}: IWildCardInputTextArea): JSX.Element => {
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
                <CustomInputTextArea
                  className={className}
                  isDisabled={isDisabled}
                  value={value}
                  onBlur={onBlur}
                  name={name}
                  error={fieldHasError(errors, inputName)}
                  onChange={onChange}
                  autoResize={autoResize}
                  tooltip={tooltip}
                  tooltipOptions={tooltipOptions}
                  rows={rows}
                  cols={cols}
                  {...props}
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
            control={control}
            name={`${inputName}` as const}
            defaultValue={data ? data[inputName] : 0}
          />
          <Error property={inputName} errors={errors} index={index} />
        </div>
      </div>
    </div>
  );
};

export default WildCardInputTextArea;
