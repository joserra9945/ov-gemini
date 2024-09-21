import { useCallback, useEffect, useState } from 'react';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';

import { useDocumentoDeFinanciacion, useFichero } from '@shared/hooks';
import {
  estadosOperaciones,
  tipoDocumentoOperacion,
} from '@shared/utils/constants';

import Messages from 'components/Messages/Messages';
import ContratoViewer from 'components/VerContrato/ContratoViewer';

const Contrato = ({ operacionId, estado }) => {
  const [document, setDocument] = useState('');

  const { documentoDeFinanciacionByFinanciacionIdByTipoIdDocumentoGet } =
    useDocumentoDeFinanciacion();
  const { ficheroPDFByDocumentoIdGet } = useFichero();

  const fetchData = useCallback(async () => {
    const res =
      await documentoDeFinanciacionByFinanciacionIdByTipoIdDocumentoGet(
        operacionId,
        tipoDocumentoOperacion.CONTRATO
      );
    if (res) {
      const success = await ficheroPDFByDocumentoIdGet(res?.id);
      if (success) {
        setDocument(success);
      }
    }
  }, [
    documentoDeFinanciacionByFinanciacionIdByTipoIdDocumentoGet,
    ficheroPDFByDocumentoIdGet,
    operacionId,
  ]);

  useEffect(() => {
    if (estado && estado !== estadosOperaciones.GENERANDO_CONTRATO) {
      fetchData();
    }
  }, [fetchData, estado]);

  return (
    <div style={{ height: '67vh' }}>
      {estado === estadosOperaciones.INVALIDADA && (
        <Messages
          message="Se va a
          generar un nuevo contrato. El contrato que estás visualizando ya no
          es válido."
          icon={faInfoCircle}
          severity="info"
        />
      )}
      {document ? <ContratoViewer document={document} /> : null}
    </div>
  );
};

export default Contrato;
