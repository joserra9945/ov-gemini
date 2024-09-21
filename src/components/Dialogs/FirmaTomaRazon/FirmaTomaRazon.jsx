import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TomaRazonService from 'utils/services/toma-razon-service';

import notifications from '@shared/utils/notificationsOv';
import {
  base64toBlob,
  downloadFile,
  FileToBase64,
} from '@shared/utils/utilsOv';

import { Dialog } from '@shared/components/Legacy/Dialog';

import FirmaManual from './FirmaManual';

import './firmaTomaRazon.scss';

const tomaRazonService = new TomaRazonService();
const eSignatureDimensions = {
  height: 85,
  width: 170,
};
const MySwal = withReactContent(Swal);

const FirmaTomaRazon = ({ isOpen, toggle, data, onSubmit }) => {
  const [tomaRazonId, setTomaRazonId] = useState(null);
  const [firmaDigital, setFirmaDigital] = useState(true);
  const [pdfjs, setPdfjs] = useState(null);

  useEffect(() => {
    const initPdfLibrary = async () => {
      const auxpdfjs = await import('pdfjs-dist/build/pdf');
      const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');

      auxpdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
      setPdfjs(auxpdfjs);
    };
    initPdfLibrary();
  }, []);

  const getTomaRazonId = useCallback(async () => {
    const res = await tomaRazonService.getTomaRazonIdByEfectoId(data?.efectoId);
    if (res) {
      setTomaRazonId(res);
    }
  }, [data?.efectoId]);

  const downloadFileB64 = (b64) => {
    const a = document.createElement('a');
    a.href = `data:application/pdf;base64,${b64}`;
    a.download = 'TomaRazonFirmada.pdf';
    a.click();
  };

  const signResultCallback = async (signatureB64) => {
    downloadFileB64(signatureB64);
    const file = base64toBlob(signatureB64, 'application/pdf');
    const res = await tomaRazonService.uploadTomaRazonFirmada(
      tomaRazonId,
      file
    );
    if (res) {
      notifications.success({
        body: 'La toma de razón firmada se ha subido correctamente',
      });
    }
    onSubmit();
    toggle();
  };

  const signErrorCallback = (errorType, errorMessage) => {
    MySwal.fire({
      title: 'Descargue el programa Autofirma@',
      html: `<p>No ha sido posible conectar con el programa <a target="_blank" rel="noopener noreferrer" href="https://firmaelectronica.gob.es/Home/Descargas.html">AutoFirma@</a>. <br> Desgargue el programa haciendo click <a target="_blank" rel="noopener noreferrer" href="https://firmaelectronica.gob.es/Home/Descargas.html">aquí</a>, revise su instalación, o realice la descarga manual respondiendo <b>NO</b> en la venta anterior.</p><p><i><small>(${errorMessage})</small></i></p>`,
      icon: 'info',
      customClass: {
        container: 'swal2-container-position-afterbanks',
        popup: 'swal-toma-razon',
      },
      allowOutsideClick: false,
    });
  };

  const signTomaRazon = async (files) => {
    if (files && files[0]) {
      const b64 = await FileToBase64(files[0]);
      const blobUrl = URL.createObjectURL(files[0]);
      const doc = await pdfjs.getDocument(blobUrl).promise;
      const pages = [...new Array(doc.numPages)];
      pages.forEach(async (numPage, index) => {
        const page = await doc.getPage(index + 1);
        const content = await page.getTextContent();
        const item = content.items.find((it) => it.str === 'firma_electronica');
        if (item) {
          const lowerLeftX = Math.round(item.transform[4]);
          const lowerLeftY = Math.round(
            item.transform[5] - eSignatureDimensions.height / 2
          );
          const upperRightX = Math.round(
            item.transform[4] + eSignatureDimensions.width
          );
          const upperRightY = Math.round(
            item.transform[5] + eSignatureDimensions.height / 2
          );
          // eslint-disable-next-line no-undef
          [, pdfBase64] = b64.split(',');
          // eslint-disable-next-line no-undef
          doSignAndSave(
            {
              page: 1,
              upperRightX,
              upperRightY,
              lowerLeftX,
              lowerLeftY,
            },
            signResultCallback,
            signErrorCallback
          );
        }
      });
    }
  };

  const downloadTomaRazon = async (download = true) => {
    const file = await tomaRazonService.getTomaRazonFile(tomaRazonId);
    if (download) {
      downloadFile({ file, tipoDocumentoNombre: 'TomasDeRazón' });
    } else {
      signTomaRazon([file]);
    }
  };

  const uploadTomaRazon = async (file) => {
    const res = await tomaRazonService.uploadTomaRazonFirmada(
      tomaRazonId,
      file
    );

    if (res) {
      notifications.success({
        body: 'La toma de razón firmada se ha subido correctamente',
      });
    }
    onSubmit();
    toggle();
  };

  useEffect(() => {
    if (!tomaRazonId && data?.efectoId && isOpen) {
      getTomaRazonId();
    }
  }, [tomaRazonId, getTomaRazonId, data, isOpen]);

  return (
    <Dialog
      isOpen={isOpen}
      close={toggle}
      header="Firma toma de razón"
      closeButtonLinkAppareance
      clickOutsideToClose={false}
      closeButtonColor="secondary"
      className="firma-toma-razon-dialog"
    >
      <>
        <div className="separator" />

        <div className="fila">
          <div className="columna">
            {firmaDigital && (
              <FirmaManual
                tomaRazonId={tomaRazonId}
                uploadTomaRazon={uploadTomaRazon}
                downloadTomaRazon={downloadTomaRazon}
                setFirmaDigital={setFirmaDigital}
              />
            )}
          </div>
        </div>
      </>
    </Dialog>
  );
};

export default FirmaTomaRazon;
