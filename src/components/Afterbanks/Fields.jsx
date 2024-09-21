/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect } from 'react';
import { Controller } from 'react-hook-form';

import { InputIban } from 'components/CustomInputs';
import { Error } from 'components/forms/Fields';

import './styles.scss';

const Fields = ({ data, setData, rhForm, assignURL }) => {
  const {
    formState: { errors },
    control,
    setValue,
    trigger,
  } = rhForm;

  const updateProperty = useCallback(
    (value, key) => {
      const res = data;
      res[key] = value;
      setData({ ...res });
    },
    [data, setData]
  );

  useEffect(() => {
    if (data.iban === '') {
      setValue('iban', '');
      trigger('iban');
    }
  }, [data, setValue, trigger]);

  return (
    <div className="iban-fields">
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="iban" className="p-d-block">
            IBAN
            {/* <InfoIconToOverlay
                content="Si pulsa el botón 'Continuar' en el momento de tener un IBAN válido insertará una cuenta manualmente y tendrá que validarla posteriormente."
                type="tooltip"
              /> */}
          </label>
          <Controller
            render={({ field }) => {
              const { onChange, value, name } = field;
              return (
                <InputIban
                  onChange={(e) => {
                    onChange(e.iban);
                    updateProperty(e.iban, name);
                    trigger(name);
                    assignURL();
                  }}
                  value={value.value}
                  iban={value.iban}
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: 'Iban obligatorio',
              },
              validate: (value) => {
                const reg =
                  /^([a-zA-Z]{2})\s*\t*(\d{2})\s*\t*(\d{4})\s*\t*(\d{4})\s*\t*(\d{2})\s*\t*(\d{10})$/;
                if (!reg.test(value)) {
                  return 'Introduce un IBAN válido';
                }
              },
            }}
            name="iban"
            control={control}
            value={data.iban || ''}
            defaultValue={data.iban || ''}
          />
          <Error property="iban" errors={errors} />
        </div>
      </div>
    </div>
  );
};

export default Fields;
