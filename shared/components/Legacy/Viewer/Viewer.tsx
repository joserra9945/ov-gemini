/* eslint-disable */
// @ts-nocheck

import { useCallback, useEffect, useState } from 'react';
import ReactViewer from 'react-viewer';
import { ProgressSpinner } from 'primereact/progressspinner';

import { usePrevious } from '@shared/utils';

import { IViewer } from './Interface';
import { Modal } from '@shared/components/Modal';

const b64toBlob = (b64Data: string, cType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

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

const Viewer = ({
  file,
  contentType = 'application/pdf',
  onClose = null,
}: IViewer): JSX.Element => {
  const [finalFile, setFinalFile] = useState<string | null>(null);

  const preFile = usePrevious(file);

  const parseFile = useCallback(() => {
    let tmpFile;
    switch (file?.type) {
      case 'stream':
        tmpFile = new Blob([file], { type: contentType });
        break;
      case 'base64':
        tmpFile = b64toBlob(file as string, contentType);
        break;
      default:
        tmpFile = file;
    }
    const urlFile = URL.createObjectURL(tmpFile);
    setFinalFile(`${urlFile}`);
  }, [contentType, file]);

  useEffect(() => {
    if (
      !finalFile ||
      (file && !preFile) ||
      (file && preFile && file !== preFile)
    ) {
      parseFile();
    }
  }, [file, finalFile, parseFile, preFile]);

  if (!finalFile) {
    return (
      <div className="text-center">
        <ProgressSpinner />
      </div>
    );
  }

  if (contentType === 'application/pdf') {
    return (
      <Modal
        open
        onClose={() => onClose && onClose()}
        draggable
        className="w-1/2 h-4/5"
      >
        <embed
          src={`${finalFile}`}
          width="100%"
          height="100%"
          type={contentType}
        />
      </Modal>
    );
  }

  return (
    <div className="viewer__container">
      <ReactViewer
        visible
        onClose={() => onClose && onClose()}
        images={[{ src: finalFile }]}
      />
    </div>
  );
};

export default Viewer;
