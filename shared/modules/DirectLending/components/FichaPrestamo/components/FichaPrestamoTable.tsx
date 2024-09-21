import { useCallback, useState } from 'react';

import { Modal } from '@shared/components/Modal';
import { PDFViewer } from '@shared/components/PDFViewer';
import TurboTable from '@shared/components/TurboTable';
import { IMappedQueryState } from '@shared/components/TurboTable/interfaces/TurboTableType';
import { TurboTableHeader } from '@shared/components/TurboTable/templates/TurboTableHeader';
import { useFichero, usePagare, usePrestamo } from '@shared/hooks';
import {
  IPagareByPrestamoIdGet,
  IPagareByPrestamoIdGetGP,
} from '@shared/interfaces/api/IPagare';
import { IPrestamoIdAmortizacionesGet } from '@shared/interfaces/IPrestamo';

import { fichaPrestamoColumns } from './columns/FichaPrestamoColumns';

interface IFichaPrestamoProps {
  id: string;
  libradorRazonSocial: string;
  tienePagares: boolean;
}

const FichaPrestamoTable = ({
  id,
  libradorRazonSocial,
  tienePagares,
}: IFichaPrestamoProps) => {
  const { prestamoIdAmortizacionesGet } = usePrestamo();
  const { pagareByPrestamoIdGet } = usePagare();
  const { ficheroPDFByDocumentoIdGet, loading: loadingPdf } = useFichero();

  const [pdf, setPdf] = useState<Blob>();
  const [showModalPdf, setShowModalPdf] = useState<boolean>(false);
  const [selectedPrestamo, setSelectedPrestamo] =
    useState<IPagareByPrestamoIdGet>({} as IPagareByPrestamoIdGet);

  const fetchPdf = useCallback(
    async (rowData: IPagareByPrestamoIdGet) => {
      setSelectedPrestamo(rowData);
      const res = await ficheroPDFByDocumentoIdGet(rowData?.id);
      if (res) {
        setPdf(res);
        setShowModalPdf(true);
      }
    },
    [ficheroPDFByDocumentoIdGet]
  );

  const fetchAmortizaciones = useCallback(
    async (params: IMappedQueryState) => {
      const res = await prestamoIdAmortizacionesGet(id, params);
      return res;
    },
    [prestamoIdAmortizacionesGet, id]
  );

  const fetchHistorialDePagos = useCallback(
    async (params: IMappedQueryState) => {
      if (tienePagares) {
        const res = await pagareByPrestamoIdGet(params, id);
        return res;
      }
      return {} as IPagareByPrestamoIdGetGP;
    },
    [tienePagares, pagareByPrestamoIdGet, id]
  );

  return (
    <>
      <TurboTable<IPrestamoIdAmortizacionesGet | IPagareByPrestamoIdGet>
        header={
          <TurboTableHeader
            title={
              <div className="p-4">
                {tienePagares
                  ? 'Historial de pagos'
                  : 'Calendario de amortizaciones'}
              </div>
            }
          />
        }
        columns={fichaPrestamoColumns(
          libradorRazonSocial,
          tienePagares,
          fetchPdf
        )}
        serviceCall={tienePagares ? fetchHistorialDePagos : fetchAmortizaciones}
        defaultQueryState={{
          maxResult: 100,
          params: {},
        }}
      />
      {showModalPdf && (
        <Modal
          header={`Préstamo ${selectedPrestamo.numero}`}
          open={showModalPdf}
          onClose={() => setShowModalPdf(false)}
          className="h-[95%] w-[95%]"
        >
          <PDFViewer pdf={pdf} loading={loadingPdf} />
        </Modal>
      )}
    </>
  );
};

export default FichaPrestamoTable;
