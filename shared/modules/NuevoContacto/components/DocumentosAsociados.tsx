/* eslint-disable */
// @ts-nocheck

import { useContext, useEffect } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';

import { useEmpresa } from '@shared/hooks';

import { Accordion, AccordionTab } from '@shared/components/Legacy/Accordion';

import { docAsociadosField } from '../constants';

import PersonaContext from './personaContext';

const DocumentosAsociados = () => {
  const rhForm = useFormContext();
  const { getRepresentanteByPersonaId } = useEmpresa();
  const { representanteByPersona, persona, setRepresentanteByPersona } =
    useContext(PersonaContext);
  useEffect(() => {
    (async () => {
      if (!representanteByPersona.id) {
        const resRepresentante = await getRepresentanteByPersonaId(persona.id);
        resRepresentante && setRepresentanteByPersona(resRepresentante);
      }
    })();
  }, [
    getRepresentanteByPersonaId,
    persona.id,
    representanteByPersona.id,
    setRepresentanteByPersona,
  ]);
  return (
    <Accordion controlled className="accordion__DocumentosAsociados">
      <FormProvider {...rhForm}>
        {docAsociadosField.map((field, i: number) => {
          return (
            <AccordionTab id={field.id} title={field.title} key={i}>
              {field.body}
            </AccordionTab>
          );
        })}
      </FormProvider>
    </Accordion>
  );
};
export default DocumentosAsociados;
