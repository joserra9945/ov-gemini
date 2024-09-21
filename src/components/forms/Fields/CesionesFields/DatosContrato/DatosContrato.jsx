import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import CesionService from 'utils/services/cesion-service';
import DocumentoDeCesionService from 'utils/services/documento-cesion-service';

import { checkInitDateIsHigher } from '@shared/utils/utilsOv';

import { WildcardFields } from '@shared/components/Legacy/WildcardFields';

import { Fieldset } from 'components/Hocs/Forms';

import { fields } from './constants';

const cesionService = new CesionService();
const documentoCesionService = new DocumentoDeCesionService();

const F_INICIO_NAME = 'fechaInicioContrato';
const F_FIN_NAME = 'fechaFinalizacion';

const DatosContrato = ({ data, disabled = false }) => {
  const rhForm = useFormContext();
  const [fichero, setFichero] = useState();
  const fInicioWatch = rhForm?.watch(
    F_INICIO_NAME,
    data[F_INICIO_NAME] || undefined
  );
  const fFinWatch = rhForm?.watch(F_FIN_NAME, data[F_FIN_NAME] || undefined);

  const fetchFichero = useCallback(async () => {
    const contratoObra = await documentoCesionService.getContratoObraByCesionId(
      data?.id
    );
    if (contratoObra?.hasFichero) {
      const file = await cesionService.getFilesById(contratoObra?.id);
      setFichero(file ? [{ file, id: 0 }] : []);
    }
  }, [data?.id]);

  const validateDates = useCallback(
    (fInicio, fFin) => {
      const res = checkInitDateIsHigher(fInicio, fFin);
      if (res && !rhForm?.formState?.errors[F_FIN_NAME]) {
        rhForm.setError(F_FIN_NAME, {
          type: 'manual',
          message: 'Fecha de inicio no puede ser posterior a la fecha fin.',
        });
      } else if (!res && rhForm?.formState?.errors[F_FIN_NAME]) {
        rhForm.clearErrors(F_FIN_NAME);
      }
    },
    [rhForm]
  );

  useEffect(() => {
    if (fInicioWatch && fFinWatch) {
      validateDates(fInicioWatch, fFinWatch);
    }
  }, [fFinWatch, fInicioWatch, validateDates]);

  useEffect(() => {
    if (data?.id) {
      fetchFichero();
    } else {
      setFichero([]);
    }
  }, [data?.id, fetchFichero]);

  const memFields = useMemo(() => {
    return (
      <WildcardFields
        rhForm={rhForm}
        data={{ ...data, files: data?.files || fichero } || {}}
        fields={fields}
        disableds={disabled}
      />
    );
  }, [data, disabled, fichero, rhForm]);

  return (
    <Fieldset className="datos-contrato-fields" legend="Datos del contrato">
      {memFields}
    </Fieldset>
  );
};

export default DatosContrato;
