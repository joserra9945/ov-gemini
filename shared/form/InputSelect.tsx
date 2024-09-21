import { Controller, useFormContext } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';

import { ISelectInput } from '@shared/interfaces/common/Form';

const InputSelect = ({
  name,
  label,
  labelClassName,
  className,
  options,
  required = false,
  optionLabel = 'nombre',
  optionValue = 'id',
  defaultValue,
  onChange,
  filterOption = false,
  virtualScrollerOptions,
  ...rest
}: ISelectInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex-auto w-full">
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: {
            value: required,
            message: `El campo ${label} es requerido`,
          },
        }}
        render={({ field }) => (
          <div className="flex flex-col">
            <Dropdown
              value={field.value}
              options={options}
              optionLabel={optionLabel}
              placeholder="Seleccione una opción"
              filter={filterOption}
              className={className}
              optionValue={optionValue}
              virtualScrollerOptions={virtualScrollerOptions}
              onChange={(e) => {
                onChange && onChange(e);
                field.onChange(e.value);
              }}
              {...rest}
            />
            {errors[name] && (
              <small className="p-error">
                {errors[name]?.message?.toString()}
              </small>
            )}
          </div>
        )}
      />
    </div>
  );
};
export default InputSelect;
