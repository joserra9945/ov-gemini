import { Controller } from 'react-hook-form';

import { Error, Filepond } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';

interface IWildcardFilepond extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  className?: string;
  data?: any[];
  setData?: any;
  maxFiles?: number;
  acceptedFileTypes?: string[];
}

interface IIndexedArray {
  [key: string]: any;
}

const WildcardFilepond = ({
  rhForm,
  inputName,
  inputLabel,
  data,
  index,
  required = false,
  isDisabled = false,
  maxFiles = 3,
  acceptedFileTypes = ['image/png', 'image/jpeg', 'application/pdf'],
}: IWildcardFilepond): JSX.Element => {
  const {
    control,
    setError,
    clearErrors,
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
              const { onChange } = field;
              return (
                <Filepond
                  data={data ? (data as IIndexedArray)[inputName] : []}
                  setData={(e) => {
                    if (required && e?.length) {
                      clearErrors(inputName);
                    } else if (required && !e?.length) {
                      setError(inputName, {
                        type: 'manual',
                        message: 'El documento es obligatorio.',
                      });
                    }
                    onChange(e);
                  }}
                  isDisabled={isDisabled}
                  maxFiles={maxFiles}
                  acceptedFileTypes={acceptedFileTypes}
                />
              );
            }}
            rules={{
              required: {
                value: required,
                message: `El campo ${inputLabel} es obligatorio`,
              },
            }}
            name={`${inputName}` as const}
            control={control}
            defaultValue={
              data && (data as IIndexedArray)[inputName]
                ? (data as IIndexedArray)[inputName]
                : []
            }
          />

          <Error property={inputName} errors={errors} index={index} />
        </div>
      </div>
    </div>
  );
};

export default WildcardFilepond;
