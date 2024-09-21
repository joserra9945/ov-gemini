import { useEffect, useState } from 'react';

import useWindowSize from '@shared/hooks/useWindowsSize';

import PDFViewer from 'components/PDFViewer/PDFViewer';

import './contratoViewer.scss';

const ContratoViewer = ({ document }) => {
  const windowSize = useWindowSize();
  const [base64Img, setBase64Img] = useState(null);

  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  useEffect(() => {
    blobToBase64(document).then((res) => {
      setBase64Img(res);
    });
  }, [document]);

  return (
    <div className="generar-contrato-container">
      <object
        data={base64Img}
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <p className="download__pdf">
          Haga
          <a download="PDF.pdf" href={base64Img}>
            clic aquí para descargar
          </a>
          y ver su documento
        </p>
      </object>
    </div>
  );
};

export default ContratoViewer;
