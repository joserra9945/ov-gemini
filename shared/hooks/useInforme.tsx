import { useCallback } from 'react';
import { isEmpty } from 'lodash';

import {
  IInformeDetalleOpGetByCifG,
  IInformeDetalleOpGetByCifGP,
  IInformeGetByCif,
  IInformeGetByCifGP,
  IInformeGetResumenByCifG,
  IInformeGetResumenByCifGP,
  IInformeRAIGetByCifG,
  IInformeRAIGetByCifGP,
} from '@shared/interfaces/api/IInforme';
import { useFetch } from '@shared/utils';
import notifications from '@shared/utils/notifications';
import { queryFixer } from '@shared/utils/utils';

import { IQueryReducer } from '@shared/components/Legacy/TurboTable/helpers';

import { informeEquifax, informeExperian } from './endpoints';
import { useCancelToken } from './useCancelToken';

const useInforme = () => {
  const { newCancelToken } = useCancelToken();

  const { get: getInformeaASNEF } = useFetch(informeEquifax);

  const { get: getInformeRAI } = useFetch(informeExperian);

  const informeResumenByCifGet = useCallback(
    async (cif: string): IInformeGetResumenByCifGP => {
      let res;
      const query = `/resumenes-mensuales/by-cif/${cif}?MaxResultCount=100`;
      try {
        res = await getInformeaASNEF<IInformeGetResumenByCifG>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IInformeGetResumenByCifGP);
    },
    [getInformeaASNEF]
  );

  const informeByCifGet = useCallback(
    async (cif: string): IInformeGetByCifGP => {
      let res;
      const query = `/by-cif/${cif}`;
      try {
        res = await getInformeaASNEF<IInformeGetByCif>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IInformeGetByCif);
    },
    [getInformeaASNEF]
  );

  const informeDetalleOpByCifGet = useCallback(
    async (
      cif: string,
      queryState: IQueryReducer
    ): IInformeDetalleOpGetByCifGP => {
      if (!isEmpty(queryState)) {
        let res;
        const query = queryFixer(
          `detalles-operaciones/by-cif/${cif}`,
          queryState
        );
        try {
          res = await getInformeaASNEF<IInformeDetalleOpGetByCifG>(query, {
            cancelToken: newCancelToken(),
          });
        } catch (err) {
          notifications.unknownError(err);
        }
        return res || ({} as IInformeDetalleOpGetByCifGP);
      }
      return {} as IInformeDetalleOpGetByCifGP;
    },
    [getInformeaASNEF, newCancelToken]
  );

  const informeUltimoRAIGet = useCallback(
    async (cif: string): IInformeGetByCifGP => {
      let res;
      const query = `/ultimo/by-cif/${cif}`;
      try {
        res = await getInformeRAI<IInformeGetByCif>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IInformeGetByCif);
    },
    [getInformeRAI]
  );

  const informeRAIGet = useCallback(
    async (cif: string): IInformeRAIGetByCifGP => {
      let res;
      const query = `/by-cif/${cif}?MaxResultCount=100`;
      try {
        res = await getInformeRAI<IInformeRAIGetByCifG>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IInformeRAIGetByCifGP);
    },
    [getInformeRAI]
  );

  return {
    informeResumenByCifGet,
    informeByCifGet,
    informeDetalleOpByCifGet,
    informeUltimoRAIGet,
    informeRAIGet,
  };
};

export { useInforme };
