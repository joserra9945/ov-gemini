import { useCallback, useEffect, useState } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useDebounce from '@shared/hooks/useDebounce';
import { useFetch } from '@shared/hooks/useFetch';
import { estadoCesionEnum } from '@shared/utils/constants';
import { formatCurrency } from '@shared/utils/formatters';
import notifications from '@shared/utils/notifications';
import { queryFixer } from '@shared/utils/utils';

import { Button } from '@shared/components/Legacy/Button';
import { InputText } from '@shared/components/Legacy/CustomInputs';
import { TurboTable } from '@shared/components/Legacy/TurboTable';
import { IQueryReducer } from '@shared/components/Legacy/TurboTable/helpers';

import { ICesion } from 'interfaces/ICesion/ICesion';
import { IEfectoCesion } from 'interfaces/IEfectos/IEfectos';
import { IGenericResponse } from 'interfaces/IReponse/IGenericResponse';
import { IOnRowToggle } from 'interfaces/ITable/ITableProps';

import { columns } from './constants';

import './efectosAsociadosCesiones.scss';

interface IEfectosAsociadosCesionesProps {
  cesion: ICesion;
}

const EfectosAsociadosCesiones = ({
  cesion,
}: IEfectosAsociadosCesionesProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [queryState, setQueryState] = useState<IQueryReducer>();
  const [selected, setSelected] = useState<IEfectoCesion[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [data, setData] = useState<IGenericResponse<IEfectoCesion>>();

  const { put: putCesion } = useFetch('/api/gefintech/Cesion');
  const { get: getEfectos } = useFetch('/api/gefintech/Efecto');

  const cesionId = cesion?.estado?.id;
  const isCanceladaFinalizada =
    cesionId === estadoCesionEnum.Cancelada ||
    cesionId === estadoCesionEnum.Finalizada;

  const asociarEfectos = async () => {
    try {
      setIsLoading(true);
      const res = await putCesion(
        `/efectos/by-id/${cesion.id}`,
        selected.map((efecto) => efecto.id)
      );
      if (res) {
        notifications.success({ body: 'Acción realizada correctamente' });
      }
      setIsLoading(false);
    } catch (e) {
      notifications.unknownError(e);
      setIsLoading(false);
    }
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchData = useCallback(
    async (source: CancelTokenSource) => {
      if (!queryState || !cesion?.id) return;
      try {
        setIsLoading(true);
        const query = queryFixer(
          `asociables-a-cesion/by-filters?CesionId=${cesion.id}`,
          queryState
        );
        const res = await getEfectos<IGenericResponse<IEfectoCesion>>(
          `${query}${
            debouncedSearchTerm ? `&numero=${debouncedSearchTerm}` : ''
          }`,
          {
            cancelToken: source?.token,
          }
        );
        if (res) {
          setData(res);
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    },
    [cesion.id, debouncedSearchTerm, getEfectos, queryState]
  );

  const onRowSelect = (e: IOnRowToggle) => {
    setSelected([...selected, e.data]);
  };

  const onRowUnselect = (e: IOnRowToggle) => {
    const tmpSelected = selected.filter((item) => {
      return e?.data?.id !== item?.id;
    });
    setSelected(tmpSelected);
  };

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();
    fetchData(source);
    return () => {
      source.cancel();
    };
  }, [fetchData]);

  useEffect(() => {
    if (!data?.items?.length) return;
    const asociados = data?.items?.filter((efecto) => efecto?.asociado);
    setSelected(asociados);
  }, [data]);

  const cleanUndefined = selected?.filter((item) => item !== undefined);

  const total =
    cleanUndefined?.reduce(
      (accum, item) => accum + (item?.importeNominal || 0),
      0
    ) || 0;

  return (
    <div className="efectos-asociados-cesiones__container">
      <TurboTable
        tableTitle="Seleccione los efectos a vincular:"
        HeaderCustomComponent={
          <div className="custom-header__right">
            <span className="p-input-icon-left">
              <FontAwesomeIcon icon={faSearch} />
              <InputText
                placeholder="Buscar efecto"
                value={searchTerm}
                onChange={setSearchTerm}
              />
            </span>
          </div>
        }
        columns={columns}
        isLoading={isLoading}
        value={data?.items}
        totalRecords={data?.totalCount}
        setQueryState={setQueryState}
        scrollable
        scrollHeight="50%"
        showSelectColumns={false}
        multiple
        selectionMode="multiple"
        handleSelectedFromParent
        selection={selected}
        onRowSelect={onRowSelect}
        onRowUnselect={onRowUnselect}
        showFilter={false}
        paginator={data?.items && data.items.length >= 1}
      />
      <div className="summary-footer__container">
        <div className="importe-total">TOTAL: {formatCurrency(total)} </div>
        <Button
          label="Asociar efectos"
          loading={isLoading}
          disabled={isLoading || isCanceladaFinalizada || !data?.items?.length}
          onClick={asociarEfectos}
        />
      </div>
    </div>
  );
};

export default EfectosAsociadosCesiones;
