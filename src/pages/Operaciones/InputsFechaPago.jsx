import { FormProvider, useForm } from 'react-hook-form';

import { InputEmail, InputSelect, InputTelefono } from '@shared/form';
import {
  optionsPlazoDePago,
  tipoFormaContactoEnum,
} from '@shared/utils/constants';

import { Button } from '@shared/components/Legacy/Button';

const InputsFechaPago = ({
  efecto,
  handleFormSubmit,
  activeTab,
  handleBack,
}) => {
  const rhForm = useForm({ mode: 'onBlur' });

  return (
    <FormProvider {...rhForm}>
      <div className="mb-4 mt-1 font-medium text-base">
        <InputSelect
          name="periodoDePago"
          options={optionsPlazoDePago}
          required
          placeholder="Seleccione el periodo de pago"
          optionValue="value"
          optionLabel="name"
          label="Periodo de pago"
          labelClassName="block font-semibold"
          defaultValue={efecto.plazoDePago.plazoDePago}
          filter={false}
        />
      </div>
      <div className="font-semibold text-base">
        Forma de contacto de su cliente (opcional)
      </div>
      <div className="grid gap-4 xl:flex xl:flex-row">
        <div className="w-full">
          Email
          <InputEmail
            name="email"
            className="mt-1"
            defaultValue={
              efecto.formasContacto.find(
                (forma) => forma.tipo === tipoFormaContactoEnum.EMAIL
              )?.valor
            }
            placeholder="Correo electrónico"
          />
        </div>
        <div className="w-full">
          Teléfono
          <InputTelefono
            name="telefono"
            className="mt-1"
            defaultValue={
              efecto.formasContacto.find(
                (forma) => forma.tipo === tipoFormaContactoEnum.MOVIL
              )?.valor
            }
          />
        </div>
      </div>

      <div className="flex flex-row gap-4 justify-end mt-4">
        {activeTab > 1 && (
          <Button
            className={`button-prev ${
              activeTab === 0 && 'button__prev-nuevoContacto'
            }`}
            label="Atrás"
            onClick={handleBack}
          />
        )}

        <Button
          className="button-next"
          cy-id="continuar"
          label="Continuar"
          onClick={rhForm.handleSubmit(handleFormSubmit)}
        />
      </div>
    </FormProvider>
  );
};

export default InputsFechaPago;
