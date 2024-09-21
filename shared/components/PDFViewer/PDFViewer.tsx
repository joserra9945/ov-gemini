import { useEffect, useRef } from 'react';
import { faImage } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import notifications from '@shared/utils/notifications';

import { Spinner } from '../Spinner';

type PDFViewerProps = {
  pdf: Blob | undefined;
  loading?: boolean;
};

const PDFViewer = ({ pdf, loading = false }: PDFViewerProps) => {
  const pdfObjectRef = useRef<HTMLObjectElement>(null);

  useEffect(() => {
    if (pdf) {
      try {
        const pdfURL = URL.createObjectURL(pdf);
        const objectElement = pdfObjectRef.current;
        if (objectElement) {
          objectElement.data = pdfURL;
        }
        return () => {
          URL.revokeObjectURL(pdfURL);
        };
      } catch (e) {
        notifications.unknownError(e);
      }
    }
  }, [pdf]);

  return (
    <div className="w-100 h-100">
      {pdf ? (
        <object
          ref={pdfObjectRef}
          type="application/pdf"
          width="100%"
          height="100%"
          aria-label="PDF Viewer"
        />
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full text-primary-50">
          {loading ? (
            <>
              <span>Se está generando el documento.</span>
              <Spinner size={30} />
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faImage} size="9x" />
              <span>No hay documento.</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
