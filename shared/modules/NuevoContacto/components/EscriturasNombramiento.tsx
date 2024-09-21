/* eslint-disable */
// @ts-nocheck

import { useCallback, useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { isEmpty } from 'lodash';

import { IGenericResponse } from '@shared/interfaces';
import { useFetch } from '@shared/utils';
import { newFormatDateUTC } from '@shared/utils/formatters';
import Notifications from '@shared/utils/notifications';

import { Button } from '@shared/components/Legacy/Button';
import { Spinner } from '@shared/components/Legacy/Spinner';
import { WildcardFields } from '@shared/components/Legacy/WildcardFields';

import { escriturasDeNombramiento } from '../constants/fields';
import { IDocumentoRepresentante } from '../interfaces';

import PersonaContext from './personaContext';

const EscriturasNombramiento = () => {
  const rhForm = useFormContext();
  const { representanteByPersona } = useContext(PersonaContext);
  const {
    post: postEDN,
    get: getEDN,
    remove: deleteEDN,
  } = useFetch('/api/gefintech/DocumentoDeRepresentante');
  const { get: getEDNFichero } = useFetch('/api/gefintech/Documento');
  const [escrituraNombramiento, setEscrituraNombramiento] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [documentoId, setDocumentoId] = useState<string>('');
  const [disabledFields, setDisabledFields] = useState<string[]>(['cargoEDN']);

  const { getValues, handleSubmit } = rhForm;

  const { cargo, id } = representanteByPersona;

  const tipoDocumento = { Escritura: '28' };

  const getEscrituraDeNombramiento = useCallback(async () => {
    setIsLoading(true);
    try {
      const resGetEDN = await getEDN<IGenericResponse<IDocumentoRepresentante>>(
        `/by-filters?RepresentanteId=${id}&TipoDocumentoId=${tipoDocumento.Escritura}`
      );
      if (
        resGetEDN &&
        resGetEDN.items.length &&
        resGetEDN.items[0].fechaVencimiento
      ) {
        rhForm.setValue(
          'fechaVencimientoEDN',
          new Date(resGetEDN.items[0].fechaVencimiento)
        );
      }
      cargo && rhForm.setValue('cargoEDN', cargo.description);

      if (resGetEDN && !resGetEDN.items.length) return;
      if (resGetEDN && resGetEDN.items[0].id) {
        const resGetEDNFichero = await getEDNFichero(
          `/pdf/by-id/${resGetEDN.items[0].id}`,
          {
            responseType: 'blob',
          }
        );
        setDocumentoId(resGetEDN.items[0].id);
        setDisabledFields([
          ...disabledFields,
          'fechaVencimientoEDN',
          'filesEDN',
        ]);
        const EDNFichero = {
          filesEDN: [
            { file: resGetEDNFichero, name: 'Escritura de nombramiento' },
          ],
        };
        setEscrituraNombramiento(EDNFichero);
      }
    } catch (e) {
      notifications.unknownError(e);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [cargo, getEDN, getEDNFichero, id, rhForm, tipoDocumento.Escritura]);

  const saveEDNFields = async () => {
    const { filesEDN, fechaVencimientoEDN } = getValues();
    if (isEmpty(filesEDN)) {
      Notifications.errorServidor({
        body: 'Debes agregar un archivo para poder guardar',
      });
      return;
    }
    setIsLoading(true);
    const data = new FormData();
    data.append('FechaVencimiento', newFormatDateUTC(fechaVencimientoEDN));
    data.append('RepresentanteId', id);
    data.append('TipoDocumentoId', tipoDocumento.Escritura);
    data.append('formFiles', filesEDN[0].file);
    try {
      const res = await postEDN('', data);
      res &&
        Notifications.success({
          body: 'Escrituras de nombramiento guardado correctamente',
        });
      getEscrituraDeNombramiento();
    } catch (e) {
      notifications.unknownError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEscrituraDeNombramiento = async () => {
    setIsLoading(true);
    try {
      const res = await deleteEDN(`/${documentoId}`);
      res &&
        Notifications.success({
          body: 'Escrituras de nombramiento eliminado correctamente',
        });
      setEscrituraNombramiento({});
      setDisabledFields(['cargoEN']);
    } catch (e) {
      notifications.unknownError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEscrituraDeNombramiento();
  }, [getEscrituraDeNombramiento]);

  if (isLoading) {
    return (
      <div className="spinner-div">
        <Spinner loading color="#435dbc" size={100} />
      </div>
    );
  }

  return (
    <>
      <WildcardFields
        fields={escriturasDeNombramiento}
        data={escrituraNombramiento}
        rhForm={rhForm}
        disableds={disabledFields}
      />
      {!isEmpty(escrituraNombramiento) ? (
        <Button
          className="button-next"
          label="Eliminar"
          onClick={deleteEscrituraDeNombramiento}
        />
      ) : (
        <Button
          className="button-next"
          label="Guardar"
          onClick={handleSubmit(saveEDNFields)}
        />
      )}
    </>
  );
};
export default EscriturasNombramiento;
