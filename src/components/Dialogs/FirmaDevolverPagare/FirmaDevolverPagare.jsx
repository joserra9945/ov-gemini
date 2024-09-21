// ******IMPORTANTE **********
// El código comentado de este componente es de la autofirm@ que se pone en pausa porque aún faltan cosas para que funcione bien
// se deja la parte de firma manual que si está completa
import { useCallback, useEffect, useState } from 'react';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
import DevolverPagareService from 'utils/services/devolver-pagare-service';

// import { base64toBlob, downloadFile, FileToBase64 } from '@shared/utils/utils';
import notifications from '@shared/utils/notificationsOv';
// import { base64toBlob, downloadFile, FileToBase64 } from '@shared/utils/utils';
import { downloadFileFromBinary } from '@shared/utils/utils';

import { Dialog } from '@shared/components/Legacy/Dialog';
import { Spinner } from '@shared/components/Legacy/Spinner';

import FirmaManualDevolverPagare from './FirmaManualDevolverPagare';

// import FirmaDigitalDevolverPagare from './FirmaDigitalDevolverPagare';
import './firmaDevolverPagare.scss';

const devolverPagareService = new DevolverPagareService();
// const eSignatureDimensions = {
//   height: 85,
//   width: 170,
// };
// const MySwal = withReactContent(Swal);

const FirmaDevolverPagare = ({ isOpen, toggle, data, onSubmit }) => {
  // const [firmaDigital, setFirmaDigital] = useState(true);
  // const [disabledButtons, setDisabledButtons] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [pdfjs, setPdfjs] = useState(null);

  // useEffect(() => {
  //   const initPdfLibrary = async () => {
  //     const auxpdfjs = await import('pdfjs-dist/build/pdf');
  //     const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');

  //     auxpdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  //     setPdfjs(auxpdfjs);
  //   };
  //   initPdfLibrary();
  // }, []);

  // const downloadFileB64 = (b64) => {
  //   const a = document.createElement('a');
  //   a.href = `data:application/pdf;base64,${b64}`;
  //   a.download = 'DevolverPagare.pdf';
  //   a.click();
  // };

  // const signResultCallback = async (signatureB64) => {
  //   downloadFileB64(signatureB64);
  //   const file = base64toBlob(signatureB64, 'application/pdf');
  //   const res = await devolverPagareService.uploadDevolucionPagareFirmada(
  //     data.devolucionDePagaresId,
  //     file
  //   );
  //   res &&
  //     notifications.success({
  //       body: 'La devolución de pagaré firmada se ha subido correctamente',
  //     });
  //   onSubmit();
  //   toggle();
  //   setDisabledButtons(false);
  // };

  // const signErrorCallback = (errorType, errorMessage) => {
  //   MySwal.fire({
  //     title: 'Descargue el programa Autofirma@',
  //     html: `<p>No ha sido posible conectar con el programa <a target="_blank" rel="noopener noreferrer" href="https://firmaelectronica.gob.es/Home/Descargas.html">AutoFirma@</a>. <br> Desgargue el programa haciendo click <a target="_blank" rel="noopener noreferrer" href="https://firmaelectronica.gob.es/Home/Descargas.html">aquí</a>, revise su instalación, o realice la descarga manual respondiendo <b>NO</b> en la venta anterior.</p><p><i><small>(${errorMessage})</small></i></p>`,
  //     icon: 'info',
  //     customClass: {
  //       container: 'swal2-container-position-afterbanks',
  //       popup: 'swal-toma-razon',
  //     },
  //     allowOutsideClick: false,
  //   }).then(() => {
  //     setDisabledButtons(false);
  //   });
  // };

  // const signDevolverPagare = async (files) => {
  //   setDisabledButtons(true);
  //   if (files && files[0]) {
  //     const b64 = await FileToBase64(files[0]);
  //     const blobUrl = URL.createObjectURL(files[0]);
  //     const doc = await pdfjs.getDocument(blobUrl).promise;
  //     const pages = [doc._pdfInfo.numPages];
  //     pages.forEach(async (numPages, index) => {
  //       const page = await doc.getPage(index + 1);
  //       const content = await page.getTextContent();
  //       const item = content.items.find((it) => it.str === 'firma_electronica');
  //       if (item) {
  //         const lowerLeftX = Math.round(item.transform[4]);
  //         const lowerLeftY = Math.round(
  //           item.transform[5] - eSignatureDimensions.height / 2
  //         );
  //         const upperRightX = Math.round(
  //           item.transform[4] + eSignatureDimensions.width
  //         );
  //         const upperRightY = Math.round(
  //           item.transform[5] + eSignatureDimensions.height / 2
  //         );
  //         // eslint-disable-next-line no-undef
  //         [, pdfBase64] = b64.split(',');
  //         // eslint-disable-next-line no-undef
  //         doSignAndSave(
  //           {
  //             page: 1,
  //             upperRightX,
  //             upperRightY,
  //             lowerLeftX,
  //             lowerLeftY,
  //           },
  //           signResultCallback,
  //           signErrorCallback
  //         );
  //       }
  //     });
  //   }
  // };

  const downloadDevolverPagare = useCallback(async () => {
    setLoading(true);
    const file = await devolverPagareService.getDevolverPagareFile(
      data.devolucionDePagaresId
    );
    downloadFileFromBinary({ file, tipoDocumentoNombre: 'Devolver pagares' });
    // : signDevolverPagare([file]);
    setLoading(false);
  }, [data.devolucionDePagaresId]);

  const uploadDevolverPagare = async (file) => {
    const res = await devolverPagareService.uploadDevolucionPagareFirmada(
      data.devolucionDePagaresId,
      file
    );
    res &&
      notifications.success({
        body: 'El devolver pagaré firmado se ha subido correctamente',
      });
    onSubmit();
    toggle();
  };

  useEffect(() => {
    downloadDevolverPagare();
  }, [downloadDevolverPagare]);

  return (
    <Dialog
      isOpen={isOpen}
      close={toggle}
      header="Firma devolución pagaré"
      closeButtonLinkAppareance
      clickOutsideToClose={false}
      closeButtonColor="secondary"
      className="firma-devolver-pagare-dialog"
    >
      {loading ? (
        <div className="firmaDevolverPagareSpinner">
          <Spinner loading color="#0069aa" />
        </div>
      ) : (
        // firmaDigital ? (
        //   <FirmaDigitalDevolverPagare
        //     devolverPagareId={data.devolucionDePagaresId}
        //     setFirmaDigital={setFirmaDigital}
        //     downloadDevolverPagare={downloadDevolverPagare}
        //     disabledButtons={disabledButtons}
        //   />
        // ) :
        <FirmaManualDevolverPagare
          devolucionPagareId={data.devolucionDePagaresId}
          uploadDevolverPagare={uploadDevolverPagare}
        />
      )}
    </Dialog>
  );
};
export default FirmaDevolverPagare;
