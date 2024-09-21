import { Controller } from 'react-hook-form';
import { InputSwitch } from 'primereact/inputswitch';

import { Error } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';

interface IWildcardSwitch extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  className?: string;
}

const WildcardSwitch = ({
  rhForm,
  isDisabled,
  inputName,
  inputLabel,
  required = false,
  data,
  className,
  index,
}: IWildcardSwitch): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = rhForm;
  return (
    <div className={`g-field ${inputName}-field`}>
      <div className="flex-direction-row">
        <Controller
          name={`${inputName}` as const}
          control={control}
          defaultValue={
            data ? (data[inputName] ? data[inputName] : false) : false
          }
          render={({ field }) => {
            const { onChange, name, value } = field;
            return (
              <InputSwitch
                onChange={(e) => onChange(e.value)}
                checked={value}
                className={className}
                name={name}
                disabled={isDisabled}
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

        <h4 className="label-right">{inputLabel}</h4>
      </div>
      <Error property={inputName} errors={errors} index={index} />
    </div>
  );
};

export default WildcardSwitch;
