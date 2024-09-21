/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from 'react-hook-form';

import {
  DropdownFilter,
  Error,
  IDropdownFilterProps,
} from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildcardSelectFilter
  extends IWildcardFields,
    Omit<IDropdownFilterProps, 'onChange'> {
  inputLabel: string;
  inputName: string;
  required?: boolean;
  selectName?: string;
  className?: string;
}

const WildcardSelectFilter = ({
  options = [],
  rhForm,
  data,
  inputLabel,
  inputName,
  index,
  required = false,
  isDisabled = false,
  isMulti = false,
  className = '',
  placeholder = '',
  labelProperty = 'nombre',
  valueProperty = 'id',
  noOptionsMessageText = 'Sin opciones',
  selectName = 'react-select',
  formatOptionLabel,
  setterOnChange,
  formatGroupLabel,
  hideSelectedOptions,
  closeMenuOnSelect,
  formatSingleValue,
  optionTemplate,
  menuPortalTarget,
  isClearable,
  ...rest
}: IWildcardSelectFilter): JSX.Element => {
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
        <div className="p-field p-field--select-filter">
          <Controller
            render={({ field }) => {
              const { onChange, onBlur, value } = field;
              return (
                <DropdownFilter
                  value={value}
                  name={selectName}
                  options={options}
                  disabled={isDisabled}
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  inputClass={className}
                  placeholder={placeholder}
                  labelProperty={labelProperty}
                  valueProperty={valueProperty}
                  setterOnChange={setterOnChange}
                  formatOptionLabel={formatOptionLabel}
                  isMulti={isMulti}
                  noOptionsMessageText={noOptionsMessageText}
                  error={fieldHasError(errors, inputName)}
                  formatGroupLabel={formatGroupLabel}
                  hideSelectedOptions={hideSelectedOptions}
                  closeMenuOnSelect={closeMenuOnSelect}
                  formatSingleValue={formatSingleValue}
                  optionTemplate={optionTemplate}
                  menuPortalTarget={menuPortalTarget}
                  isClearable={isClearable}
                  {...rest}
                />
              );
            }}
            rules={{
              required: {
                value: required,
                message: `El campo ${inputLabel} es obligatorio`,
              },
            }}
            defaultValue={data && data[inputName] ? data[inputName] : ''}
            name={`${inputName}` as const}
            control={control}
          />
          <Error property={inputName} errors={errors} index={index} />
        </div>
      </div>
    </div>
  );
};

export default WildcardSelectFilter;
