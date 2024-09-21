import { useContext } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';

import { InputRadioList } from '@shared/form';

import PersonaContext from './personaContext';

const TipoContacto = () => {
  const rhForm = useFormContext();
  const {
    persona,
    setEsRepresentanteForm,
    esRepresentanteForm,
    comeFromDirectLending,
  } = useContext(PersonaContext);

  return (
    <FormProvider {...rhForm}>
      <span>¿Es representante?</span>
      <InputRadioList
        isDisabled={persona.esRepresentante || comeFromDirectLending}
        name="esRepresentante"
        onChange={(e: any) => {
          setEsRepresentanteForm(e);
        }}
        selectedOption={esRepresentanteForm}
      />
    </FormProvider>
  );
};

export default TipoContacto;
