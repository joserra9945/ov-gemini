import { useCallback, useEffect, useState } from 'react';

import { Spinner } from '@shared/components/Legacy/Spinner';

import defaultPdf from './documents/defaultPdf.pdf';
import { INativePDFViewer } from './INativePDFViewer';

import './styles.scss';

const NativePDFViewer = ({
  pdf,
  height,
  type = 'stream',
  contentType = 'application/pdf',
  panel = '#navpanes=0',
  emptyPdf = false,
}: INativePDFViewer): JSX.Element => {
  const [finalUrl, setFinalUrl] = useState<string | null>(null);

  const b64toBlob = (b64Data: string, cType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays: Uint8Array[] = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: cType });
  };

  const transformPdf = useCallback(() => {
    if (pdf) {
      let blob;
      switch (type) {
        case 'stream':
          blob = new Blob([pdf], { type: contentType });
          break;
        case 'base64':
          blob = b64toBlob(pdf as string, contentType);
          break;
        default:
          blob = pdf as Blob;
      }
      const blobUrl = URL.createObjectURL(blob);
      setFinalUrl(`${blobUrl}${panel}`);
    }
  }, [pdf, type, panel, contentType]);

  useEffect(() => {
    if (pdf) {
      transformPdf();
    } else {
      setFinalUrl(null);
    }
  }, [pdf, transformPdf]);

  if (!emptyPdf && !finalUrl) {
    return (
      <div
        className="pdf-reader--no-file"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {pdf == null ? (
          'No se ha encontrado el fichero asociado a este documento.'
        ) : (
          <Spinner loading />
        )}
      </div>
    );
  }

  return (
    <div className="pdf-reader">
      <embed
        src={`${
          emptyPdf && finalUrl
            ? finalUrl
            : !emptyPdf && finalUrl
            ? finalUrl
            : defaultPdf
        }`}
        type={contentType}
        width="100%"
        height={height || '100%'}
      />
    </div>
  );
};

export default NativePDFViewer;
