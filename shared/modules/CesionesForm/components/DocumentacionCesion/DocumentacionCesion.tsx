import { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { Spinner } from '@shared/components/Spinner';
import { useFetch } from '@shared/hooks/useFetch';
import { IColumn } from '@shared/interfaces';
import { initialQueryState } from '@shared/utils/constants';
import { IQueryReducer } from '@shared/utils/queryReducer';
import { queryFixer } from '@shared/utils/utils';

import { TurboTable } from '@shared/components/Legacy/TurboTable';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

import Actions from './templates/Actions';
import { columns } from './constants';

interface IDocumentacionProps {
  type: string;
  id: string;
}

const DocumentacionCesion = ({ type, id }: IDocumentacionProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [queryState, setQueryState] = useState<IQueryReducer>();
  const [finalColumns, setFinalColumns] = useState<IColumn[]>();
  const [data, setData] = useState<IGenericResponse>();

  const { get: getDocumentoCesion } = useFetch(
    '/api/gefintech/DocumentoDeCesion'
  );

  const fetchData = useCallback(async () => {
    if (!queryState) return;
    try {
      setIsLoading(true);
      const query = queryFixer(`by-cesion-id/${id}`, queryState);
      const res = await getDocumentoCesion<IGenericResponse>(query);
      if (res) {
        setData(res);
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  }, [getDocumentoCesion, id, queryState]);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [fetchData, id]);

  useEffect(() => {
    if (columns) {
      const tmpColumns: IColumn[] = [
        ...columns,
        {
          key: nanoid(),
          header: '',
          body: (e: any) => Actions(e.rowData),
          className: 'actions__column',
          isFunctionComponent: true,
        },
      ];
      setFinalColumns(tmpColumns);
    }
  }, [type]);

  if (!finalColumns) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="documentacion__container">
      <TurboTable
        columns={finalColumns}
        isLoading={!finalColumns || isLoading}
        value={data?.items}
        totalRecords={data?.totalCount}
        setQueryState={setQueryState}
        initialQueryState={{
          ...initialQueryState,
          sortingCriteria: {
            property: 'creationTime',
            sort: 'DESC',
          },
        }}
        scrollable
        scrollHeight="flex"
        showSelectColumns={false}
        showFilter={false}
        paginator
      />
    </div>
  );
};

export default DocumentacionCesion;
