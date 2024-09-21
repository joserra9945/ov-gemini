import { useCallback, useContext, useEffect, useState } from 'react';

import { PDFViewer } from '@shared/components/PDFViewer';
import { ESTADOS_DIRECTLENDING_ENUM } from '@shared/enum/enumEstadosDirectLending';
import {
  useDocumentoDeFinanciacion,
  useFichero,
  usePrestamo,
} from '@shared/hooks';

import DirectLendingContext from '../context/DirectLendingContext';

const Contrato = () => {
  const [pdf, setPdf] = useState<Blob>();

  const { ficheroPDFByDocumentoIdGet, loading: loadingPdf } = useFichero();
  const { prestamoIdBorradorContratoGet, loading } = usePrestamo();
  const { documentoDeFinanciacionByFinanciacionIdByTipoIdDocumentoGet } =
    useDocumentoDeFinanciacion();

  const { directLendingResumen } = useContext(DirectLendingContext);

  const fetchPdf = useCallback(async () => {
    if (
      directLendingResumen.estado.id >=
      ESTADOS_DIRECTLENDING_ENUM.PENDIENTE_FIRMA
    ) {
      const finalContratoPrestamo =
        await documentoDeFinanciacionByFinanciacionIdByTipoIdDocumentoGet(
          directLendingResumen.id,
          ESTADOS_DIRECTLENDING_ENUM.PAGADO
        );
      if (finalContratoPrestamo) {
        const pdfStream = await ficheroPDFByDocumentoIdGet(
          finalContratoPrestamo.id
        );
        if (pdfStream) {
          setPdf(pdfStream);
        }
      }
    } else {
      const resPdf = await prestamoIdBorradorContratoGet(
        directLendingResumen.id
      );
      if (resPdf) {
        setPdf(resPdf);
      }
    }
  }, [
    directLendingResumen.estado.id,
    directLendingResumen.id,
    ficheroPDFByDocumentoIdGet,
    prestamoIdBorradorContratoGet,
    documentoDeFinanciacionByFinanciacionIdByTipoIdDocumentoGet,
  ]);

  useEffect(() => {
    fetchPdf();
  }, [fetchPdf]);

  return (
    <div className="h-screen w-full">
      <PDFViewer pdf={pdf} loading={loading || loadingPdf} />
    </div>
  );
};

export default Contrato;
