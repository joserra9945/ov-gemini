import { useCallback } from 'react';

import {
  IFirmaNotarialAddCesionesPut,
  IFirmaNotarialByFIltersGetG,
  IFirmaNotarialByFIltersGetGP,
  IFirmaNotarialIdGet,
  IFirmaNotarialIdGetP,
  IFirmaNotarialPost,
  IFirmaNotarialPostInterno,
  IFirmaNotarialProximaGet,
  IFirmaNotarialProximaGetP,
  IFirmaNotarialPut,
  IFirmaNotarialSolicitarEnvioEmailNotarioPost,
} from '@shared/interfaces/api/IFirmaNotarial';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';
import { queryFixer } from '@shared/utils/utils';

import { firmaNotarial } from './endpoints';
import { useFetch } from './useFetch';

const useFirmaNotarial = () => {
  const { get, put, loading, post } = useFetch(firmaNotarial);

  const firmaNotarialByFilter = useCallback(
    async (qS: IQueryReducer): IFirmaNotarialByFIltersGetGP => {
      const query = queryFixer('by-filters', qS);
      let res;
      try {
        res = await get<IFirmaNotarialByFIltersGetG>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IFirmaNotarialByFIltersGetG);
    },
    [get]
  );

  const firmaNotarialSolicitarEnvioEmailNotarioPost = useCallback(
    async (
      body: IFirmaNotarialSolicitarEnvioEmailNotarioPost
    ): Promise<boolean> => {
      const query = '/solicitar-envio-email-notario';
      let res;
      try {
        res = await post(query, body);
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [post]
  );

  const firmaById = useCallback(
    async (id: string): IFirmaNotarialIdGetP => {
      const query = `/${id}`;
      let res;
      try {
        res = await get<IFirmaNotarialIdGet>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IFirmaNotarialIdGet);
    },
    [get]
  );

  const getActivaByEmpresaInternaId = useCallback(
    async (empresaInternaId: string, libradorId: string) => {
      const query = `/activa/by-empresa-interna-id/${empresaInternaId}/by-librador-id/${libradorId}`;
      let res;
      try {
        res = await get<IFirmaNotarialIdGet>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IFirmaNotarialIdGet);
    },
    [get]
  );

  const putEditInterno = useCallback(
    async (firma: IFirmaNotarialIdGet) => {
      const query = `/interno`;
      let res;
      try {
        res = await put<IFirmaNotarialIdGet>(query, { data: firma });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IFirmaNotarialIdGet);
    },
    [put]
  );

  const putAddCesiones = useCallback(
    async (firmaNotarialId: string, cesionIds: string[]) => {
      const query = `/add-cesiones`;
      let res;
      try {
        res = await put<IFirmaNotarialIdGet>(query, {
          id: firmaNotarialId,
          cesionIds,
        });
      } catch (e) {
        notifications.unknownError(e);
      }

      return !!res;
    },
    [put]
  );
  const firmaNotarialAddCesionesPut = useCallback(
    async (body: IFirmaNotarialAddCesionesPut): Promise<boolean> => {
      const query = '/add-cesiones';
      let res;
      try {
        res = await put(query, body);
        notifications.success({
          body: 'Se han añadido correctamente',
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [put]
  );

  const firmaNotarialAddDirectLendingPut = useCallback(
    async (firmaNotarialId: string, directLendingIds: string[]) => {
      const query = '/add-direct-lendings';
      let res;
      try {
        res = await put<IFirmaNotarialIdGet>(query, {
          id: firmaNotarialId,
          directLendingIds,
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [put]
  );

  const postFirmaNotarial = useCallback(
    async (data: IFirmaNotarialPost): Promise<string | null | undefined> => {
      let res;
      try {
        res = await post<string>(undefined, { ...data });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res;
    },
    [post]
  );

  const postInternoFirmaNotarial = useCallback(
    async (
      data: IFirmaNotarialPostInterno
    ): Promise<string | null | undefined> => {
      let res;
      const query = `/interno`;

      try {
        res = await post<string>(query, { ...data });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res;
    },
    [post]
  );

  const putFirmaNotarialInterno = useCallback(
    async (data: IFirmaNotarialPut) => {
      let res;
      const query = `/interno`;

      try {
        res = await put<IFirmaNotarialIdGet>(query, { ...data });
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [put]
  );

  const firmaNotarialProximaGet = useCallback(
    async (libradorId: string): IFirmaNotarialProximaGetP => {
      const query = `/proxima/by-librador-id/${libradorId}`;
      let res;
      try {
        res = await get<IFirmaNotarialProximaGet>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IFirmaNotarialProximaGet);
    },
    [get]
  );

  return {
    firmaNotarialByFilter,
    firmaNotarialSolicitarEnvioEmailNotarioPost,
    firmaNotarialAddCesionesPut,
    firmaById,
    getActivaByEmpresaInternaId,
    putEditInterno,
    putAddCesiones,
    postFirmaNotarial,
    postInternoFirmaNotarial,
    putFirmaNotarialInterno,
    firmaNotarialProximaGet,
    firmaNotarialAddDirectLendingPut,
    loading,
  };
};

export default useFirmaNotarial;
