import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useEmpresaExterna, useEnum } from '@shared/hooks';
import { IEmpresaExternaById } from '@shared/interfaces/api/IEmpresaExterna';
import { IEnum } from '@shared/interfaces/IEnum';
import { IFirmaCesion } from '@shared/interfaces/IFirmaCesion';
import { INotariaForForm } from '@shared/interfaces/INotaria';
import { BasicLoadingDropdownTemplate } from '@shared/templates';
import {
  initialQueryState,
  PROVINCIA_ID,
  tipoDireccionEnum,
} from '@shared/utils/constants';

import { IQueryState } from './interfaces';
import { useGetNotarios } from './useGetNotarios';

type OvOrigin = {
  empresa: IEmpresaExternaById;
};

type GiOrigin = {
  libradorId: string;
};

export const useLugarFecha = (
  data: IFirmaCesion,
  disabled: boolean,
  origin: OvOrigin | GiOrigin
) => {
  const [tipos, setTipos] = useState<IEnum[]>([]);
  const [notarios, setNotarios] = useState<INotariaForForm[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalLocalCount, setLocalTotalCount] = useState(0);

  const [queryState] = useState({
    ...initialQueryState,
    maxResult: 20,
  });

  const [notariosLocales, setNotariosLocales] = useState<INotariaForForm[]>([]);
  const [empresaInfo, setEmpresaInfo] = useState<IEmpresaExternaById>();
  const [params, setParams] = useState({
    currentPages: 20,
    currentFilterValue: '',
  });

  const [localParams, setLocalParams] = useState({
    currentPages: 20,
    currentFilterValue: '',
  });

  const { empresaExternaIdGet } = useEmpresaExterna();
  const { enumTiposFirmaNotarial } = useEnum();
  const rhForm = useFormContext();
  const {
    getAllNotarios,
    getNotariosByProvincia,
    getNotariosValencia,
    parseNotarios,
    loadingNotarios,
  } = useGetNotarios();

  const tipoWatch = rhForm.watch('tipo', data?.tipo);

  const TIPO_PARCIAL = 1;

  const fetchEmpresaInfo = useCallback(
    async (id: string) => {
      const res = await empresaExternaIdGet(id);
      if (res) {
        setEmpresaInfo(res);
      }
    },
    [empresaExternaIdGet]
  );

  const getProvinciaId = useCallback(() => {
    const direccionSocial = empresaInfo?.direcciones?.find(
      (direccion) => direccion.tipoDireccion?.id === tipoDireccionEnum.SOCIAL
    );
    return direccionSocial?.provinciaId;
  }, [empresaInfo?.direcciones]);

  const setUpNotarios = useCallback(async () => {
    const provinciaId = getProvinciaId();

    let res = await getNotariosByProvincia(
      provinciaId ? provinciaId.toString() : ''
    );
    if (!res.items.length) {
      res = await getAllNotarios();
    }
    const newNotarios = parseNotarios(res.items);
    setTotalCount(res.totalCount);
    setNotarios(newNotarios);
  }, [getAllNotarios, getNotariosByProvincia, getProvinciaId, parseNotarios]);

  const setUpNotariosLocales = useCallback(async () => {
    let res = await getNotariosValencia({ maxResult: 20 } as IQueryState);
    if (!res.items.length) {
      res = await getAllNotarios();
    }
    const newData = parseNotarios(res.items);
    setLocalTotalCount(res.totalCount);
    setNotariosLocales(newData);
  }, [getAllNotarios, getNotariosValencia, parseNotarios]);

  const canShow = useCallback(() => {
    if (tipoWatch) {
      return tipoWatch === TIPO_PARCIAL;
    }
    return data?.tipo?.id === TIPO_PARCIAL;
  }, [data?.tipo, tipoWatch]);

  useEffect(() => {
    if ('libradorId' in origin && !empresaInfo) {
      fetchEmpresaInfo(origin.libradorId);
    }
    if ('empresa' in origin) {
      setEmpresaInfo(origin.empresa as IEmpresaExternaById);
    }
  }, [empresaInfo, fetchEmpresaInfo, origin]);

  useEffect(() => {
    if (empresaInfo !== undefined && !notarios.length) {
      setUpNotarios();
    }
  }, [empresaInfo, notarios.length, setUpNotarios]);

  const fetchTipos = useCallback(async () => {
    try {
      const res = await enumTiposFirmaNotarial();
      if (res) {
        setTipos(res || []);
      }
    } catch {
      setTipos([]);
    }
  }, [enumTiposFirmaNotarial]);

  useEffect(() => {
    if (!tipos.length) {
      fetchTipos();
    }
  }, [tipos, fetchTipos]);

  useEffect(() => {
    if (notariosLocales.length <= 0 && canShow()) {
      setUpNotariosLocales();
    }
  }, [notariosLocales, canShow, setUpNotariosLocales]);

  const getDisableds = useCallback(() => {
    return disabled;
  }, [disabled]);

  const addNewNotarios = useCallback(
    async (qS: IQueryState) => {
      const provinciaId = getProvinciaId();
      let res = await getNotariosByProvincia(
        provinciaId ? provinciaId.toString() : '',
        qS
      );
      if (!res.items.length) {
        res = await getAllNotarios(qS);
      }
      const newNotarios = parseNotarios(res.items);
      setNotarios((prev) => [...prev, ...newNotarios]);
    },
    [getAllNotarios, getNotariosByProvincia, getProvinciaId, parseNotarios]
  );

  const addNewNotariosLocales = useCallback(
    async (qS: IQueryState) => {
      const provinciaId = getProvinciaId();
      let res = await getNotariosByProvincia(
        provinciaId ? provinciaId.toString() : '',
        qS
      );
      if (!res.items.length) {
        res = await getAllNotarios(qS);
      }
      const newNotarios = parseNotarios(res.items);
      setNotarios((prev) => [...prev, ...newNotarios]);
    },
    [getAllNotarios, getNotariosByProvincia, getProvinciaId, parseNotarios]
  );

  const onHandleScroll = useCallback(
    (value: IQueryState) => {
      const { last } = value;
      if (
        (last as number) >= params.currentPages &&
        notarios &&
        notarios.length <= totalCount
      ) {
        const queryParam = {
          ...queryState,
          skipCount: params.currentPages,
        };
        setParams((prevParams) => ({
          ...prevParams,
          currentPages: prevParams.currentPages + 20,
        }));
        addNewNotarios(queryParam);
      }
    },
    [params.currentPages, notarios, totalCount, queryState, addNewNotarios]
  );

  const onHandleScrollLocal = useCallback(
    (value: IQueryState) => {
      const { last } = value;
      if (
        (last as number) >= localParams.currentPages &&
        notariosLocales &&
        notariosLocales.length <= totalLocalCount
      ) {
        const queryParam = {
          ...initialQueryState,
          params: `&ProvinciaId=${PROVINCIA_ID.VALENCIA}`,
          maxResult: 20,
          skipCount: localParams.currentPages,
        };
        setLocalParams((prevParams) => ({
          ...prevParams,
          currentPages: prevParams.currentPages + 20,
        }));
        // poner setup notarios pasandole qs
        addNewNotariosLocales(queryParam);
      }
    },
    [
      localParams.currentPages,
      notariosLocales,
      totalLocalCount,
      addNewNotariosLocales,
    ]
  );

  const virtualScroller = {
    lazy: true,
    onLazyLoad: onHandleScroll,
    itemSize: 52,
    showLoader: true,
    loading: loadingNotarios,
    loadingTemplate: BasicLoadingDropdownTemplate,
  };

  const virtualScrollerLocal = {
    lazy: true,
    onLazyLoad: onHandleScrollLocal,
    itemSize: 52,
    showLoader: true,
    loading: loadingNotarios,
    loadingTemplate: BasicLoadingDropdownTemplate,
  };

  return {
    notarios,
    virtualScroller,
    virtualScrollerLocal,
    notariosLocales,
    tipos,
    TIPO_PARCIAL,
    tipoWatch,
    rhForm,
    loadingNotarios,
    canShow,
    getDisableds,
  };
};
