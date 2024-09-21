import { useCallback } from 'react';
import { isEmpty } from 'lodash';

import {
  IRepresentanteByIdsGetG,
  IRepresentanteByIdsGetGP,
  IRepresentanteGetByEmpresaIdG,
  IRepresentanteGetByEmpresaIdGP,
  IRepresentanteValidarCargo,
} from '@shared/interfaces/IRepresentante';
import { useFetch } from '@shared/utils';
import notifications from '@shared/utils/notifications';
import { queryFixer } from '@shared/utils/utils';

import { IQueryReducer } from '@shared/components/Legacy/TurboTable/helpers';

import { representante } from './endpoints';
import { useCancelToken } from './useCancelToken';

const useRepresentante = () => {
  const {
    get: getRepresentante,
    put: putRepresentante,
    loading,
  } = useFetch(representante);
  const { newCancelToken } = useCancelToken();

  const representanteByEmpresaIdGet = useCallback(
    async (
      queryState: IQueryReducer,
      empresaId: string | undefined
    ): IRepresentanteGetByEmpresaIdGP => {
      if (!isEmpty(queryState)) {
        const query = queryFixer(`by-empresa-id/${empresaId}`, queryState);
        let res;
        try {
          res = await getRepresentante<IRepresentanteGetByEmpresaIdG>(query, {
            cancelToken: newCancelToken(),
          });
        } catch (e) {
          notifications.unknownError(e);
        }
        return res || ({} as IRepresentanteGetByEmpresaIdGP);
      }
      return {} as IRepresentanteGetByEmpresaIdGP;
    },
    [getRepresentante, newCancelToken]
  );

  const representanteByEmpresaInternaIdGet = useCallback(
    async (
      queryState: IQueryReducer,
      empresaId: string
    ): IRepresentanteGetByEmpresaIdGP => {
      if (!isEmpty(queryState)) {
        const query = queryFixer(`by-empresa-id/${empresaId}`, queryState);
        let res;
        try {
          res = await getRepresentante<IRepresentanteGetByEmpresaIdG>(query, {
            cancelToken: newCancelToken(),
          });
        } catch (e) {
          notifications.unknownError(e);
        }
        return res || ({} as IRepresentanteGetByEmpresaIdGP);
      }
      return {} as IRepresentanteGetByEmpresaIdGP;
    },
    [getRepresentante, newCancelToken]
  );

  const representanteByIdsGet = useCallback(
    async (ids: string[]): IRepresentanteByIdsGetGP => {
      const query = `/by-ids?${ids.map((id) => `ids=${id}`).join('&')}`;
      let res;
      try {
        res = await getRepresentante<IRepresentanteByIdsGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IRepresentanteByIdsGetG);
    },
    [getRepresentante, newCancelToken]
  );

  const representanteValidarCargoPut = useCallback(
    async (body: IRepresentanteValidarCargo) => {
      let res;
      const query = '/validar-cargo';
      try {
        res = await putRepresentante(query, body);
      } catch (err) {
        notifications.unknownError(err);
      }
      return !!res;
    },
    [putRepresentante]
  );
  return {
    loading,
    representanteByEmpresaIdGet,
    representanteValidarCargoPut,
    representanteByEmpresaInternaIdGet,
    representanteByIdsGet,
  };
};

export { useRepresentante };
