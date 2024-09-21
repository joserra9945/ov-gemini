import { useCallback } from 'react';

import { alertasEnum } from '@shared/enum/alertasOperaciones';
import {
  IAlertaPrasRealizadaPutData,
  IAlertaPrasRevisarPutData,
  IAlertasPrasByFiltersGetG,
  IAlertasPrasByFiltersGetGP,
} from '@shared/interfaces/api/IAlertaPras';
import {
  IAlertasUltimaByIdExternoGet,
  IAlertasUltimaByIdExternoGetP,
} from '@shared/interfaces/api/IAlertaPras/IAlertasPrasUltimaByIdExternoGet';
import notifications from '@shared/utils/notifications';

import { useFetch } from './useFetch';

const useAlertaPras = () => {
  const { get: getAlertasPras, put: putAlertaPras } = useFetch(
    'api/gefintech/alertas/AlertaPras'
  );

  const getAlertasPrasPorEstudioYTipo = useCallback(
    async (
      estudioId: string,
      tipoAlerta: number
    ): IAlertasPrasByFiltersGetGP => {
      const query = `/by-filters?Estados=${alertasEnum.ACTIVA}&Estados=${alertasEnum.INACTIVA}&IdExterno=${estudioId}&Tipo=${tipoAlerta}&MaxResultCount=100`;
      let res;
      try {
        res = await getAlertasPras<IAlertasPrasByFiltersGetG>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IAlertasPrasByFiltersGetGP);
    },
    [getAlertasPras]
  );

  const getAlertasPrasActivasPorEstudioYTipo = useCallback(
    async (
      estudioId: string,
      tipoAlerta: number
    ): IAlertasPrasByFiltersGetGP => {
      const query = `/by-filters?Estados=${alertasEnum.ACTIVA}&IdExterno=${estudioId}&Tipo=${tipoAlerta}&MaxResultCount=100`;
      let res;
      try {
        res = await getAlertasPras<IAlertasPrasByFiltersGetG>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IAlertasPrasByFiltersGetGP);
    },
    [getAlertasPras]
  );

  const alertaPrasRevisarPut = useCallback(
    async (data: IAlertaPrasRevisarPutData) => {
      const query = '/revisadas';
      try {
        await putAlertaPras(query, data);
        notifications.success();
      } catch (err) {
        notifications.unknownError(err);
      }
    },
    [putAlertaPras]
  );

  const alertaPrasRealizadaPut = useCallback(
    async (data: IAlertaPrasRealizadaPutData) => {
      const query = `/accion-pras/realizada`;
      try {
        await putAlertaPras(query, data);
        notifications.success();
      } catch (err) {
        notifications.unknownError(err);
      }
    },
    [putAlertaPras]
  );

  const getAlertasPrasUltimaByIdExterno = useCallback(
    async (idExterno: string): IAlertasUltimaByIdExternoGetP => {
      const query = `/ultima/by-id-externo/${idExterno}`;
      let res;
      try {
        res = await getAlertasPras<IAlertasUltimaByIdExternoGet>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IAlertasUltimaByIdExternoGet);
    },
    [getAlertasPras]
  );

  return {
    getAlertasPras,
    getAlertasPrasPorEstudioYTipo,
    getAlertasPrasActivasPorEstudioYTipo,
    alertaPrasRevisarPut,
    alertaPrasRealizadaPut,
    getAlertasPrasUltimaByIdExterno,
  };
};

export default useAlertaPras;
