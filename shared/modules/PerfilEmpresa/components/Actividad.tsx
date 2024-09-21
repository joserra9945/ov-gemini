/* eslint-disable */
// @ts-nocheck

import { useCallback, useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useEmpresa, useEnum } from '@shared/hooks';
import Notifications from '@shared/utils/notifications';

import { Spinner } from '@shared/components/Legacy/Spinner';
import { WildcardFields } from '@shared/components/Legacy/WildcardFields';
import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IEnumPaises } from '@shared/interfaces/Legacy/IEnum/IEnum';

import { ACTIVIDAD_FIELDS } from '../constants/fields';
import { defaultCountrySelectFilter, esAutonomo } from '../constants/utils';
import PerfilEmpresaContext from '../context/PerfilEmpresaContext';
import { ICnaIndustria } from '../interfaces';

const DEFAULT_REQUIRED = [
  'actividadPrincipal',
  'CNAE',
  'paisesOperantes',
  'origen',
  'finalidad',
];

export const Actividad = () => {
  const rhForm = useFormContext();
  const { watch } = rhForm;
  const {
    getCnaByIndustria,
    fetchIndustrias,
    fetchPaises,
    fetchFinalidades,
    fetchOrigenes,
    fetchKycEmpresaActiva,
    loadingKycEmpresa,
  } = useEmpresa();

  const { enumPorcentajesCobrosEnEfectivo } = useEnum();

  const [cnaes, setCnaes] = useState<ICnaIndustria[]>();
  const [cnaesSecundario, setCnaesSecundario] = useState<ICnaIndustria[]>();
  const [actividades, setActividades] = useState<IEnum[]>([]);
  const [paises, setPaises] = useState<IEnumPaises[]>([]);
  const [finalidades, setFinalidades] = useState<IEnum[]>([]);
  const [origenes, setOrigenes] = useState<IEnum[]>([]);
  const [porcentajesCobro, setPorcentajesCobro] = useState<IEnum[]>([]);
  const actividadWatcher = rhForm.watch('actividadPrincipal');
  const actividadSecundariaWatcher = rhForm.watch('actividadSecundaria');
  const { hasData, setHasData, kyc, setKyc, active } =
    useContext(PerfilEmpresaContext);
  const autonomo = !!esAutonomo();

  useEffect(() => {
    !finalidades.length &&
      fetchFinalidades()
        .then((res) => {
          res && setFinalidades(res);
        })
        .catch((e) => notifications.unknownError(e));
  }, [fetchFinalidades, finalidades.length]);

  useEffect(() => {
    !origenes.length &&
      fetchOrigenes()
        .then((res) => {
          res && setOrigenes(res);
        })
        .catch((e) => notifications.unknownError(e));
  }, [fetchOrigenes, origenes]);

  useEffect(() => {
    if (!paises.length) {
      fetchPaises()
        .then((res) => {
          if (res) {
            setPaises(res);
          }
        })
        .catch((e) => notifications.unknownError(e));
    }
  }, [fetchPaises, paises]);

  useEffect(() => {
    !actividades.length &&
      fetchIndustrias()
        .then((res) => res && setActividades(res.items))
        .catch((e) => notifications.unknownError(e));
  }, [fetchIndustrias, actividades]);

  const fetchPorcentajesCobros = useCallback(async () => {
    const res = await enumPorcentajesCobrosEnEfectivo();
    res && setPorcentajesCobro(res);
  }, [enumPorcentajesCobrosEnEfectivo]);

  useEffect(() => {
    !porcentajesCobro?.length && fetchPorcentajesCobros();
  }, [porcentajesCobro, fetchPorcentajesCobros]);

  useEffect(() => {
    actividadWatcher?.id &&
      getCnaByIndustria(actividadWatcher.id).then((res) => {
        const cnaesNombreCodigo =
          res &&
          res.items.map((cnae: ICnaIndustria) => {
            const newCna = {
              id: cnae.id,
              codigo: cnae.codigo,
              descripcion: `${cnae.codigo} - ${cnae.descripcion} `,
              industriaDescripcion: cnae.industriaDescripcion,
              industriaId: cnae.industriaId,
            };
            return newCna;
          });
        cnaesNombreCodigo && setCnaes(cnaesNombreCodigo);
      });
  }, [actividadWatcher, getCnaByIndustria]);

  useEffect(() => {
    actividadSecundariaWatcher?.id &&
      getCnaByIndustria(actividadSecundariaWatcher.id)
        .then((res) => {
          const cnaesNombreCodigo =
            res &&
            res.items.map((cnae: ICnaIndustria) => {
              const newCna = {
                id: cnae.id,
                codigo: cnae.codigo,
                descripcion: `${cnae.codigo} - ${cnae.descripcion} `,
                industriaDescripcion: cnae.industriaDescripcion,
                industriaId: cnae.industriaId,
              };
              return newCna;
            });
          cnaesNombreCodigo && setCnaesSecundario(cnaesNombreCodigo);
        })
        .catch((e) => notifications.unknownError(e));
  }, [actividadSecundariaWatcher, getCnaByIndustria]);

  useEffect(() => {
    fetchKycEmpresaActiva()
      .then((res) => {
        if (res) {

          const newKyc = {
            id: res.empresaId,
            paisesOperantes: res.paisesOperantes.length
              ? res.paisesOperantes
              : defaultCountrySelectFilter,
            finalidad: res.finalidad,
            origen: res.origen,
            porcentajeDeCobroEnEfectivo: {
              id: res?.porcentajeDeCobroEnEfectivo?.id,
              description: res?.porcentajeDeCobroEnEfectivo?.description,
            },
          }

          if (res.industria?.id) {
            newKyc.actividadPrincipal = {
              id: res.industria?.id,
              descripcion: res.industria?.descripcion,
            }
          }

          if ( res.industriaSecundaria?.id) {
            newKyc.actividadSecundaria = {
              id: res.industriaSecundaria?.id,
              descripcion: res.industriaSecundaria?.descripcion,
            }
          }

          if (res?.cnae?.id) {
            newKyc.CNAE = {
              id: res?.cnae?.id,
              descripcion: res?.cnae?.descripcion
                ? `${res?.cnae?.codigo} - ${res?.cnae?.descripcion}`
                : null,
            }
          }

          if (res?.cnaeSecundario?.id) {
            newKyc.cnaeSecundario = {
              id: res?.cnaeSecundario?.id,
              descripcion: res?.cnaeSecundario?.descripcion
                ? `${res?.cnaeSecundario?.codigo} - ${res?.cnaeSecundario?.descripcion}`
                : null,
            }
          }

          setKyc(newKyc);
        }
      })
      .catch((e) => notifications.unknownError(e));
  }, [fetchKycEmpresaActiva, paises, setKyc]);

  useEffect(() => {
    const subscription = watch((watcher) => {
      const paisesForm = rhForm.getValues('paisesOperantes');
      if (
        watcher.actividadPrincipal?.id &&
        watcher.CNAE?.id &&
        paisesForm.length &&
        watcher.finalidad?.id &&
        watcher.origen?.id
      ) {
        const newData = [...hasData];
        newData[active - 1] = true;
        setHasData(newData);
      } else {
        const newData = [...hasData];
        newData[active - 1] = false;

        setHasData(newData);
      }
    });
    return () => subscription.unsubscribe();
  }, [hasData, rhForm, setHasData, watch, active]);

  if (
    !actividades.length ||
    !paises.length ||
    !finalidades.length ||
    !porcentajesCobro.length ||
    loadingKycEmpresa
  ) {
    return (
      <div className="spinner-div margin30">
        <Spinner loading color="#435dbc" size={100} />
      </div>
    );
  }

  return (
    <WildcardFields
      fields={ACTIVIDAD_FIELDS(
        actividades,
        paises,
        finalidades,
        origenes,
        cnaes,
        autonomo,
        rhForm.getValues('finalidad'),
        rhForm.getValues('origen'),
        kyc,
        porcentajesCobro,
        cnaesSecundario
      )}
      data={kyc}
      rhForm={rhForm}
      requireds={DEFAULT_REQUIRED}
    />
  );
};
