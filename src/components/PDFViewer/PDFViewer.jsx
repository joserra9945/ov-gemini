import React from 'react';

import { binaryToBlob } from '@shared/utils/utils';

// Import styles

// Create new plugin instance

const PDFViewer = ({ pdf = '' }) => {
  let finalUlr;

  if (pdf) {
    const blob = binaryToBlob(pdf);
    const blobUrl = URL.createObjectURL(blob);
    finalUlr = `${blobUrl}#toolbar=0`;
  }

  return (
    <div className="pdf-reader">
      {pdf ? (
        // <object
        //   data={`data:application/pdf;#toolbar=0&navpanes=0&scrollbar=0&;base64,${pdf}`}
        //   type="application/pdf"
        //   width="100%"
        //   height="100%"
        // >
        //   <p>
        //     Haga
        //     <a download="PDF.pdf" href={`data:application/pdf;base64,${pdf}`}>
        //       clic aquí para descargar
        //     </a>
        //     y ver su documento
        //   </p>
        // </object>
        <embed
          src={finalUlr}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      ) : (
        <div className="pdf-reader--no-file">
          {' '}
          No se ha encontrado el fichero asociado a este documento.{' '}
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
