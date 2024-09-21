import { FormProvider } from 'react-hook-form';

import { InputEmail, InputTelefono } from '@shared/form';
import { tipoFormaContactoEnum } from '@shared/utils/constants';

const FormFormasContacto = ({ librado, index, rhForm }) => {
  return (
    <FormProvider {...rhForm}>
      <div className="flex flex-row gap-4 mt-4 w-full">
        <div className="w-1/2">
          <InputEmail
            name={`email${index}`}
            label="Email"
            defaultValue={
              librado.formasContacto.find(
                (forma) => forma.tipo === tipoFormaContactoEnum.EMAIL
              )?.valor
            }
          />
        </div>
        <div className="w-1/2">
          <InputTelefono
            name={`telefono${index}`}
            label="Teléfono"
            defaultValue={
              librado.formasContacto.find(
                (forma) => forma.tipo === tipoFormaContactoEnum.MOVIL
              )?.valor
            }
            placeholder="Teléfono"
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default FormFormasContacto;
