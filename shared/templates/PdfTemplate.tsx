import { useCallback, useState } from 'react';
import { faEye } from '@fortawesome/pro-light-svg-icons';

import { Button } from '@shared/components/Button';
import { Modal } from '@shared/components/Modal';
import { PDFViewer } from '@shared/components/PDFViewer';
import { useFacturaERP } from '@shared/hooks';

const PdfTemplate = ({ id }: { id: string }) => {
  const [pdf, setPdf] = useState<Blob>();
  const [showModalPdf, setShowModalPdf] = useState(false);

  const { facturaERPGeneratePdfGet } = useFacturaERP();

  const fetchData = useCallback(async () => {
    const resPdf = await facturaERPGeneratePdfGet(id);
    resPdf && setPdf(resPdf);
    setShowModalPdf(true);
  }, [facturaERPGeneratePdfGet, id]);

  return (
    <>
      <div className="!w-fit">
        <Button
          icon={faEye}
          onClick={() => fetchData()}
          tooltipText="Ir a detalle del pdf"
        />
      </div>
      {showModalPdf && pdf && (
        <Modal
          className="h-full w-2/3"
          open={showModalPdf}
          onClose={() => setShowModalPdf(false)}
        >
          <PDFViewer pdf={pdf} />
        </Modal>
      )}
    </>
  );
};

export default PdfTemplate;
