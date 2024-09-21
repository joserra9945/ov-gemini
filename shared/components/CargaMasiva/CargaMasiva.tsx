import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { faArrowLeft } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useFactura } from '@shared/hooks';
import { IColumn } from '@shared/interfaces';
import { IEfectoByGestionFiltersGet } from '@shared/interfaces/api/IEfecto';
import { IFacturaDetallesByFiltersGetG } from '@shared/interfaces/api/IPagare';
import { initialQueryState } from '@shared/utils/constants';

import { TurboTable } from '../Legacy/TurboTable';

import { columnsCargaMasiva } from './columns';

type CargaMasivaProps = {
  efecto: IEfectoByGestionFiltersGet;
  columns: IColumn[];
  setShowCarga: Dispatch<SetStateAction<boolean>>;
};
export const CargaMasiva = ({
  columns,
  efecto,
  setShowCarga,
}: CargaMasivaProps) => {
  const { facturaDetallesByFiltersGet, loading } = useFactura();
  const [data, setData] = useState({} as IFacturaDetallesByFiltersGetG);
  const [queryState, setQueryState] = useState(initialQueryState);

  const fetchData = useCallback(async () => {
    const res = await facturaDetallesByFiltersGet(efecto.id);
    setData(res);
  }, [efecto.id, facturaDetallesByFiltersGet]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div>
        <div className="flex ">
          <FontAwesomeIcon
            className="cursor-pointer"
            size="xl"
            icon={faArrowLeft}
            onClick={() => setShowCarga(false)}
          />
          <span className="ml-4 text-lg font-semibold font-roboto ">
            {efecto.numero}
          </span>
        </div>

        <TurboTable
          columns={columns}
          showColumnOptions={false}
          value={[efecto]}
          totalRecords={[efecto].length}
          emptyMessage="No hay resultados"
          className="!w-full"
          selectionMode="single"
          dataKey="id"
          scrollable
          scrollHeight="flex"
        />
      </div>
      <div className="pt-6 h-3/4">
        {!loading && (
          <TurboTable
            showColumnOptions={false}
            columns={columnsCargaMasiva}
            value={data.items}
            totalRecords={data.totalCount}
            emptyMessage="No hay resultados"
            dataKey="idcargaMasiva"
            scrollable
            scrollHeight="flex"
            paginator
            setQueryState={setQueryState}
            initialQueryState={queryState}
            loading={loading}
          />
        )}
      </div>
    </>
  );
};
