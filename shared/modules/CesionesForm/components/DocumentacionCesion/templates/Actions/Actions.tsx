import { useCallback, useState } from 'react';
import { faArrowDownToBracket, faEye } from '@fortawesome/pro-light-svg-icons';

import { Button } from '@shared/components/Button';
import { Modal } from '@shared/components/Modal';
import { PDFViewer } from '@shared/components/PDFViewer';
import { useFetch } from '@shared/hooks/useFetch';
import { downloadBlobFile } from '@shared/utils/utils';

interface IActionsProps {
  hasFichero: boolean;
  pdfFicheroId: string;
  tipoDocumentoNombre: string;
}

const Actions = ({
  hasFichero,
  pdfFicheroId,
  tipoDocumentoNombre,
}: IActionsProps) => {
  const [fichero, setFichero] = useState<Blob>();
  const [isOpen, setIsOpen] = useState(false);
  const { get: getFichero, loading } = useFetch('/api/gefintech/Fichero');

  const toggleIsOpen = () => setIsOpen(!isOpen);

  const fetchFichero = useCallback(async () => {
    const res = await getFichero<Blob>(`/stream/by-id/${pdfFicheroId}`, {
      responseType: 'blob',
    });
    if (res) {
      setFichero(res);
    }
  }, [getFichero, pdfFicheroId]);

  const downloadFichero = async () => {
    if (fichero) {
      downloadBlobFile(fichero, tipoDocumentoNombre, 'pdf');
    }
  };

  return (
    <div className="flex">
      <Button
        color="primary"
        disabled={loading || !hasFichero}
        icon={faEye}
        onClick={() => {
          if (hasFichero) {
            fetchFichero();
          }
          toggleIsOpen();
        }}
        tooltipText="Ver documento"
        type="icon-button"
      />
      <Button
        color="primary"
        disabled={loading || !hasFichero}
        icon={faArrowDownToBracket}
        onClick={() => {
          downloadFichero();
        }}
        tooltipText="Descargar documento"
        type="icon-button"
      />
      {fichero && isOpen ? (
        <Modal
          className="h-[90%] w-2/3"
          onClose={() => toggleIsOpen()}
          open={isOpen}
        >
          <PDFViewer pdf={fichero} />
        </Modal>
      ) : null}
    </div>
  );
};

export default Actions;
