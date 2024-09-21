import { Controller } from 'react-hook-form';
import { isEmpty } from 'lodash';

import {
  Error,
  IRadioProps,
  RadioList,
} from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildcardInputRadio extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  items?: IRadioProps[];
  col?: string;
  inline?: boolean;
  defaultValue?: number;
}

const WildcardInputRadio = ({
  rhForm,
  isDisabled,
  inputName,
  inputLabel,
  required = false,
  data,
  items = [],
  col = '12',
  index,
  inline = false,
  defaultValue,
}: IWildcardInputRadio): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = rhForm;
  return (
    <div
      className={`g-field g-radio ${inputName}-field${
        inline ? ' g-flex radio-inline' : ''
      }`}
    >
      <div className="label">
        <label htmlFor={inputName}>{inputLabel}</label>
      </div>
      <div className="p-fluid">
        <div className="p-field">
          <Controller
            render={({ field }) => {
              const { onChange, name, value } = field;
              return (
                <RadioList
                  items={items}
                  isDisabled={isDisabled}
                  selectedOption={value}
                  defaultValue={defaultValue}
                  name={name}
                  onChange={onChange}
                  error={fieldHasError(errors, inputName)}
                  col={col}
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
            defaultValue={
              defaultValue ?? isEmpty(data)
                ? ''
                : data && data[inputName]
                ? items[0].value
                : items[1].value
            }
          />
          <Error property={inputName} errors={errors} index={index} />
        </div>
      </div>
    </div>
  );
};

export default WildcardInputRadio;
