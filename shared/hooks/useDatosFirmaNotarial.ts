import { useCallback, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { isEmpty } from 'lodash';

import { useGetNotarios } from '@shared/components/LugarFecha/useGetNotarios';
import { firmaNotarialEnum, tipoFirmaEnum } from '@shared/enum/firmaNotarial';
import {
  ICustomOptionDescription,
  ICustomOptionLabel,
} from '@shared/forms/Interfaces/Interfaces';
import { useEnum, useFirmaNotarial, useNotario } from '@shared/hooks';
import useModal from '@shared/hooks/useModal';
import { useRepresentante } from '@shared/hooks/useRepresentante';
import {
  IFirmaNotarialIdGet,
  IFirmaNotarialPut,
} from '@shared/interfaces/api/IFirmaNotarial';
import {
  IRepresentanteGetByEmpresaId,
  IRepresentanteGetByEmpresaIdG,
} from '@shared/interfaces/IRepresentante';
import { initialQueryState, tipoFirmasEnum } from '@shared/utils/constants';
import { dateUTCtoCalendar } from '@shared/utils/formatters';
import notifications from '@shared/utils/notifications';

import { IEnum } from '@shared/interfaces/Legacy/IEnum';

type IHandleSubmitParams = {
  formData: FieldValues;
  isAdUser: boolean;
  callback?: () => Promise<void>;
  tipo?: number;
  id?: string;
};

type IHandleVincularFirmaParams = {
  option: string;
  id: string;
  callback: () => Promise<void>;
  tipo: tipoFirmaEnum;
};
const useDatosFirmaNotarial = ({
  empresaInternaId,
  libradorId,
  firmaNotarialId,
}: any) => {
  const navigate = useNavigate();
  const { representanteByEmpresaIdGet } = useRepresentante();
  const { representanteByEmpresaInternaIdGet } = useRepresentante();
  const { enumTiposFirmaNotarial } = useEnum();
  const { notarioByProvinciaId, notarioProvinciaByLibradorId } = useNotario();
  const {
    firmaById,
    getActivaByEmpresaInternaId,
    putAddCesiones,
    postFirmaNotarial,
    postInternoFirmaNotarial,
    putFirmaNotarialInterno,
    firmaNotarialAddDirectLendingPut,
    loading,
  } = useFirmaNotarial();
  const { parseNotarios, parseNotariosLocales } = useGetNotarios();
  const [representantes, setRepresentantes] = useState<ICustomOptionLabel[]>(
    []
  );

  const [apoderados, setApoderados] = useState<ICustomOptionDescription[]>([]);
  const [notariosLocales, setNotariosLocales] = useState<
    ICustomOptionDescription[]
  >([]);
  const [notariosProvincia, setNotariosProvincia] = useState<
    ICustomOptionDescription[]
  >([]);
  const [tiposFirmaNotarial, setTiposFirmaNotarial] = useState<IEnum[]>([]);
  const [hasFirmaNotarial, setHasFirmaNotarial] = useState<boolean | null>(
    null
  );
  const [firmaNotarial, setFirmaNotarial] = useState<IFirmaNotarialIdGet>(
    {} as IFirmaNotarialIdGet
  );
  const { isOpen, closeModal, openModal } = useModal(undefined, false);

  const parseRepresentantes = useCallback(
    (data: IRepresentanteGetByEmpresaIdG) => {
      if (data.items !== undefined) {
        const result = data.items.map((item) => ({
          label: `${item.persona.nombre} ${item.persona.apellidos}`,
          value: item.id,
        }));

        setRepresentantes(result);
      }
    },
    []
  );

  const parseApoderados = useCallback(
    (data: IRepresentanteGetByEmpresaId[]) => {
      return data.map((item) => {
        return {
          description: `${item.persona.nombre} ${item.persona.apellidos}`,
          id: item.id,
        };
      });
    },
    []
  );

  const fetchRepresentantes = useCallback(async () => {
    const data = await representanteByEmpresaIdGet(
      initialQueryState,
      libradorId
    );
    parseRepresentantes(data);
  }, [libradorId, parseRepresentantes, representanteByEmpresaIdGet]);

  const fetchTipos = useCallback(async () => {
    const data = await enumTiposFirmaNotarial();
    setTiposFirmaNotarial(data);
  }, [enumTiposFirmaNotarial]);

  const fetchNotariosLocales = useCallback(async () => {
    const data = await notarioByProvinciaId('48', {
      ...initialQueryState,
    });
    const parsedData = parseNotariosLocales(data.items);
    setNotariosLocales(parsedData);
  }, [notarioByProvinciaId, parseNotariosLocales]);

  const fetchNotariosProvincia = useCallback(async () => {
    const data = await notarioProvinciaByLibradorId(libradorId);
    const parsedData = parseNotarios(data.items);
    setNotariosProvincia(parsedData);
  }, [libradorId, notarioProvinciaByLibradorId, parseNotarios]);

  const fetchApoderados = useCallback(async () => {
    const data = await representanteByEmpresaInternaIdGet(
      initialQueryState,
      empresaInternaId
    );
    const parsedData = parseApoderados(data.items);
    setApoderados(parsedData);
  }, [empresaInternaId, parseApoderados, representanteByEmpresaInternaIdGet]);

  const getFirmaNotarial = useCallback(async () => {
    return firmaById(firmaNotarialId);
  }, [firmaById, firmaNotarialId]);

  const getFirmaNotarialActive = useCallback(async () => {
    return getActivaByEmpresaInternaId(empresaInternaId, libradorId);
  }, [empresaInternaId, libradorId, getActivaByEmpresaInternaId]);

  const setUpFirmaNotarial = useCallback(async () => {
    let firma;

    if (firmaNotarialId) {
      firma = await getFirmaNotarial();
      setHasFirmaNotarial(true);
    } else {
      firma = await getFirmaNotarialActive();
      setHasFirmaNotarial(false);

      if (!isEmpty(firma)) {
        openModal();
      }
    }

    if (firma && !isEmpty(firma)) {
      setFirmaNotarial(firma);
    }
  }, [firmaNotarialId, getFirmaNotarial, getFirmaNotarialActive, openModal]);

  const mapFirmaNotarialFromApi = () => {
    return {
      tipo: firmaNotarial?.tipo?.id || tipoFirmasEnum.COMPLETA,
      fechaPrevista: firmaNotarial?.fechaPrevista
        ? dateUTCtoCalendar(firmaNotarial?.fechaPrevista)
        : null,
      administradorApoderador: firmaNotarial?.representanteInternoId,
      notarioLocalId: firmaNotarial?.notarioLocal?.id,
      notarioId: firmaNotarial?.notario?.id,
      email: firmaNotarial?.email,
      telefono: firmaNotarial?.telefono,
      representantes: representantes?.filter(({ value }) =>
        firmaNotarial?.representanteExternoIds?.includes(value as string)
      ),
    };
  };

  const handleSubmit = async ({
    formData,
    isAdUser,
    callback,
    tipo,
    id = '',
  }: IHandleSubmitParams) => {
    if (firmaNotarialId) {
      const params: IFirmaNotarialPut = {
        id: firmaNotarialId,
        email: formData.email,
        fechaPrevista: formData.fechaPrevista,
        notarioId: formData.notarioId,
        notarioLocalId: formData.notarioLocalId,
        representanteExternoIds: formData.representantes?.map(
          (representante: FieldValues) => representante.value
        ),
        representanteInternoId: formData.administradorApoderador,
        telefono: formData.telefono,
        tipo: formData.tipo,
      };
      const res = await putFirmaNotarialInterno(params);
      res &&
        notifications.success({
          body: 'Firma notarial modificada correctamente.',
        });
      res && callback?.();
    } else {
      const params = {
        email: formData.email,
        fechaPrevista: formData.fechaPrevista,
        libradorId,
        notarioId: formData.notarioId,
        representanteExternoIds: formData.representantes?.map(
          (representante: FieldValues) => representante.value
        ),
        telefono: formData.telefono,
        empresaInternaId,
      };
      let resIdFirmaNotarial;
      if (isAdUser) {
        resIdFirmaNotarial = await postInternoFirmaNotarial({
          ...params,
          representanteInternoId: formData.administradorApoderador,
          tipo: formData.tipo,
        });
      } else {
        resIdFirmaNotarial = await postFirmaNotarial(params);
      }

      if (resIdFirmaNotarial) {
        let resAsociarAFirmaNotarial;
        switch (tipo) {
          case tipoFirmaEnum.PRESTAMOS:
            resAsociarAFirmaNotarial = await firmaNotarialAddDirectLendingPut(
              resIdFirmaNotarial,
              [id]
            );
            resAsociarAFirmaNotarial &&
              notifications.success({
                body: 'Firma notarial creada correctamente.',
              });
            closeModal();
            break;
          case tipoFirmaEnum.CESIONES:
            resIdFirmaNotarial = await putAddCesiones(resIdFirmaNotarial, [id]);
            resIdFirmaNotarial &&
              notifications.success({
                body: 'Firma notarial creada correctamente.',
              });
            closeModal();
            break;
          default:
            resIdFirmaNotarial = null;
        }
      }
      resIdFirmaNotarial && callback?.();
    }
  };

  const handleVincularFirma = async ({
    option,
    id,
    callback,
    tipo,
  }: IHandleVincularFirmaParams) => {
    if (option === 'cancelar') {
      closeModal();
    } else {
      let res;
      switch (tipo) {
        case tipoFirmaEnum.PRESTAMOS:
          res = await firmaNotarialAddDirectLendingPut(firmaNotarial.id, [id]);
          break;
        case tipoFirmaEnum.CESIONES:
          res = await putAddCesiones(firmaNotarial.id, [id]);
          break;
        default:
          res = null;
      }

      if (res) {
        setHasFirmaNotarial(true);
        closeModal();
        callback?.();
      }
    }
  };

  const handleCanEdit = ({ isAdUser, canEdit }: any) => {
    if (firmaNotarial?.estado?.id >= firmaNotarialEnum.DOCUMENTACIO_GENERADA) {
      return false;
    }

    if (!firmaNotarialId) return true;
    if (canEdit) {
      if (hasFirmaNotarial && !isAdUser) return false;
    }
    return canEdit;
  };

  const handleCreateFirmaNotarial = () => {
    setHasFirmaNotarial(true);
  };

  const handleClickGoTo = () => {
    navigate(`/firma-notarial/${firmaNotarialId}`, {
      state: { firmaNotarial },
    });
  };

  return {
    representantes,
    apoderados,
    notariosLocales,
    notariosProvincia,
    tiposFirmaNotarial,
    hasFirmaNotarial,
    loading,
    firmaNotarial,
    isOpen,
    fetchRepresentantes,
    fetchTipos,
    fetchNotariosLocales,
    fetchNotariosProvincia,
    fetchApoderados,
    setUpFirmaNotarial,
    handleSubmit,
    handleVincularFirma,
    handleCanEdit,
    handleCreateFirmaNotarial,
    closeModal,
    handleClickGoTo,
    mapFirmaNotarialFromApi,
  };
};

export default useDatosFirmaNotarial;
