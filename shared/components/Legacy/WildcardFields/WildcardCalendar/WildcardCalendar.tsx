import { Controller } from 'react-hook-form';

import { changeSpanishFormatIntoDefaultFormat } from '@shared/utils/formatters';

import { CustomCalendar, Error } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildcardCalendar extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  showTime?: boolean;
  maxDate?: Date;
  minDate?: Date;
  onSelect?: (e?: Date | Date[]) => void;
  placeholder?: string;
  yearRange?: string;
  defaultValue?: string;
}
const WildcardCalendar = ({
  inputName,
  inputLabel,
  maxDate,
  minDate,
  onSelect,
  isDisabled = false,
  rhForm,
  data,
  required = false,
  placeholder,
  index,
  showTime = false,
  yearRange = '1890:2050',
}: IWildcardCalendar): JSX.Element => {
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
              const { onChange, name, value, onBlur } = field;
              return (
                <CustomCalendar
                  value={
                    !value && data && data[inputName]
                      ? typeof data[inputName] === 'string'
                        ? new Date(
                            changeSpanishFormatIntoDefaultFormat(
                              data[inputName]
                            )
                          )
                        : data[inputName]
                      : value
                  }
                  onBlur={onBlur}
                  onChange={onChange}
                  name={name}
                  error={fieldHasError(errors, inputName)}
                  minDate={minDate}
                  maxDate={maxDate}
                  placeholder={placeholder}
                  onSelect={onSelect}
                  isDisabled={isDisabled}
                  showTime={showTime}
                  yearRange={yearRange}
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
              data && data[inputName]
                ? typeof data[inputName] === 'string'
                  ? new Date(
                      changeSpanishFormatIntoDefaultFormat(data[inputName])
                    )
                  : data[inputName]
                : null
            }
          />
          <Error property={inputName} errors={errors} index={index} />
        </div>
      </div>
    </div>
  );
};

export default WildcardCalendar;
