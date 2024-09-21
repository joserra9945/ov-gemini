import { useState } from 'react';
import { faEye } from '@fortawesome/pro-light-svg-icons';

import { Button } from '@shared/components/Button';
import { Modal } from '@shared/components/Modal';
import { PDFViewer } from '@shared/components/PDFViewer';
import { Tooltip } from '@shared/components/Tooltip';
import { useDocumento } from '@shared/hooks';

type AccionesTemplateProps = {
  documentoId: string;
};

const AccionesTemplate = ({
  documentoId,
}: AccionesTemplateProps): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pdf, setPdf] = useState<Blob>();
  const { documentoPdfByIdGet } = useDocumento();

  const showModalPdf = async (id: string) => {
    const res = await documentoPdfByIdGet(id);
    if (res) {
      setShowModal(true);
      setPdf(res);
    }
  };

  return (
    <>
      <Tooltip
        content={documentoId ? 'Visualizar documento' : ''}
        classNameTrigger="flex justify-center"
      >
        <Button
          disabled={Boolean(!documentoId)}
          icon={faEye}
          onClick={() => showModalPdf(documentoId)}
        />
      </Tooltip>
      {pdf && (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          className="w-1/2 h-5/6"
        >
          <PDFViewer pdf={pdf} />
        </Modal>
      )}
    </>
  );
};

export default AccionesTemplate;
