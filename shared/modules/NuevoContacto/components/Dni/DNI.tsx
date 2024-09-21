/* eslint-disable */
// @ts-nocheck

import { useCallback, useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { isEmpty } from 'lodash';
import { faCircleInfo } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import dniAnverso from '@shared/assets/dni-anverso.png';
import dniReverso from '@shared/assets/dni-reverso.png';
import { IGenericResponse } from '@shared/interfaces';
import { useFetch } from '@shared/utils';
import { formatDateUTC, newFormatDateUTC } from '@shared/utils/formatters';
import Notifications from '@shared/utils/notifications';

import { Button } from '@shared/components/Legacy/Button';
import Modal from '@shared/components/Legacy/Modal';
import { Spinner } from '@shared/components/Legacy/Spinner';
import { WildcardFields } from '@shared/components/Legacy/WildcardFields';

import { DNIArchivos, DNIField } from '../../constants/fields';
import { IDocumentoRepresentante } from '../../interfaces';
import PersonaContext from '../personaContext';

import './dni.scss';

const DNI = () => {
  const rhForm = useFormContext();
  const { representanteByPersona } = useContext(PersonaContext);
  const [documentosByRepresentante, setdocumentosByRepresentante] = useState(
    {}
  );
  const [fechaVenc, setFechaVenc] = useState<string>('');
  const [disabledFields, setDisabledFields] = useState<string[]>(['numeroDni']);
  const [disableFilepond, setDisableFilepond] = useState<string[]>([]);
  const [documentoId, setDocumentoId] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const tipoDocumento = { dni: '3' };
  const { id } = representanteByPersona;

  const { getValues, handleSubmit } = rhForm;

  const {
    post: postDni,
    get: getDni,
    remove: deleteDni,
    loading: loadingDni,
  } = useFetch('/api/gefintech/DocumentoDeRepresentante');

  const { get: getDocumentoFichero, loading: loadingDocumentoFichero } =
    useFetch('/api/gefintech/Documento');

  const onClose = () => {
    setShowModal(!showModal);
  };

  const getDocumentos = useCallback(async () => {
    setIsLoading(true);
    try {
      const resGetDNI = await getDni<IGenericResponse<IDocumentoRepresentante>>(
        `/by-filters?RepresentanteId=${id}&TipoDocumentoId=${tipoDocumento.dni}`
      );
      if (resGetDNI && !resGetDNI.items.length) return;
      if (resGetDNI && resGetDNI.items[0].id) {
        const resGetDniFichero = await getDocumentoFichero(
          `/pdf/by-id/${resGetDNI.items[0].id}`,
          {
            responseType: 'blob',
          }
        );
        rhForm.setValue(
          'fechaVencimiento',
          new Date(resGetDNI.items[0].fechaVencimiento)
        );
        setDocumentoId(resGetDNI.items[0].id);
        setFechaVenc(formatDateUTC(resGetDNI.items[0].fechaVencimiento));
        setDisabledFields([...disabledFields, 'fechaVencimiento']);
        setDisableFilepond(['files']);
        const DniFichero = { files: [{ file: resGetDniFichero, name: 'DNI' }] };
        setdocumentosByRepresentante(DniFichero);
      }
    } catch (e) {
      notifications.unknownError(e);
    } finally {
      setIsLoading(false);
    }
  }, [
    disabledFields,
    getDni,
    getDocumentoFichero,
    id,
    rhForm,
    tipoDocumento.dni,
  ]);

  const saveDniFields = async () => {
    const { files, fechaVencimiento } = getValues();
    if (isEmpty(files)) {
      Notifications.errorServidor({
        body: 'Debes agregar al menos un archivo para poder guardar',
      });
      return;
    }
    setIsLoading(true);
    const filesFinal = files.map((doc: any) => doc.file);
    const data = new FormData();
    data.append('FechaVencimiento', newFormatDateUTC(fechaVencimiento));
    data.append('RepresentanteId', id);
    data.append('TipoDocumentoId', tipoDocumento.dni);
    data.append('formFiles', filesFinal[0]);
    filesFinal[1] && data.append('formFiles', filesFinal[1]);
    try {
      const res = await postDni('', data);
      res && Notifications.success({ body: 'DNI guardado correctamente' });
      getDocumentos();
    } catch (e) {
      notifications.unknownError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDniFields = async () => {
    setIsLoading(true);
    try {
      const res = await deleteDni(`/${documentoId}`);
      res && Notifications.success({ body: 'DNI eliminado correctamente' });
      setdocumentosByRepresentante({});
      setDisabledFields(['numeroDni']);
      setDisableFilepond([]);
      setFechaVenc('');
    } catch (e) {
      notifications.unknownError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDocumentos();
  }, []);

  if (isLoading || loadingDni || loadingDocumentoFichero) {
    return (
      <div className="spinner-div">
        <Spinner loading color="#435dbc" size={100} />
      </div>
    );
  }

  return (
    <>
      <WildcardFields
        fields={DNIField}
        data={representanteByPersona}
        rhForm={rhForm}
        disableds={disabledFields}
      />
      <div className="col-span-6">
        DNI (Sube ambas caras del DNI){' '}
        <span className="info-icon" onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faCircleInfo} color="#0069AA" />
        </span>
      </div>

      <div
        className="col-span-6 justify-content-end ver_ejemplo link-primary"
        onClick={() => setShowModal(true)}
      >
        Ver ejemplo
      </div>
      <WildcardFields
        fields={DNIArchivos(fechaVenc)}
        data={documentosByRepresentante}
        rhForm={rhForm}
        disableds={disableFilepond}
      />
      {!isEmpty(documentosByRepresentante) ? (
        <Button
          className="button-next"
          label="Eliminar DNI"
          onClick={deleteDniFields}
        />
      ) : (
        <Button
          className="button-next"
          label="Guardar"
          onClick={handleSubmit(saveDniFields)}
        />
      )}
      <Modal
        className="dni-ejemplo-dialog"
        isOpen={showModal}
        onClose={onClose}
        title="Información DNI"
      >
        <div className="dni-content">
          <div className="dni-anverso-content">
            <span className="title">ANVERSO</span>
            <div className="col-span-6">
              {' '}
              <img
                className="dni-anverso-image"
                alt="Dni-anverso"
                src={dniAnverso}
              />
            </div>
            <div>
              <span className="sub-title">
                {' '}
                Información que aparece en el <span>anverso</span>:{' '}
              </span>
              <ul className="lista-anverso">
                <li>Fotografía</li>
                <li>Datos de filiación</li>
                <li>Nº DNI letra identificación fiscal</li>
                <li>Firma</li>
                <li>Fecha de validez</li>
              </ul>
            </div>
          </div>
          <div className="dni-reverso-content">
            <span className="title">REVERSO</span>
            <div className="col-span-6">
              {' '}
              <img
                className="dni-reverso-image"
                alt="Dni-reverso"
                src={dniReverso}
              />
            </div>
            <div>
              <span className="sub-title">
                {' '}
                Información que aparece en el <span>reverso</span>:{' '}
              </span>
              <ul className="lista-reverso">
                <li>Caracteres OCR</li>
                <li>Equipo expendidor</li>
                <li>Domicilio</li>
                <li>Lugar de nacimiento</li>
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DNI;
