/* eslint-disable */
// @ts-nocheck

import { useCallback, useContext, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';

import { useCancelToken, useCodigoPostal, useEmpresa } from '@shared/hooks';
import Notifications from '@shared/utils/notifications';
import { initialQueryState } from '@shared/utils/constants';

import { Button } from '@shared/components/Button';
import { Spinner } from '@shared/components/Legacy/Spinner';
import { WildcardFields } from '@shared/components/Legacy/WildcardFields';
import { IDireccionesEmpresa } from '@shared/interfaces/Legacy/IDireccionesEmpresa';
import { IEnum, IEnumPaises } from '@shared/interfaces/Legacy/IEnum/IEnum';

import { ZERO_VALUE } from '../constants/constants';
import { DIRECCIONES_FIELDS } from '../constants/fields';
import { validatePostalCode } from '../constants/utils';
import PerfilEmpresaContext from '../context/PerfilEmpresaContext';
import { DireccionProps, IDireccionToBe, IProvincias } from '../interfaces';
import { ICodigoPostal } from '@shared/interfaces/ICodigoPostal';

import './estilos.scss';

export const Direccion = ({
  setIsOpen,
  indice = 0,
  editarDireccion = {} as IDireccionesEmpresa,
  empresaGi,
  comesFromGi,
  fetchDirecciones,
}: DireccionProps) => {
  const {
    fetchPaises,
    fetchTipos,
    fetchProvincias,
    getProvinciasByCodigoPostal,
    getPoblacionesByProvinciaId,
    getPoblacionByCodigoPostal,
    enviarDireccionesEmpresa,
    editarDireccionesEmpresa,
    obtenerDireccionesById,
    loadingTipos,
    loadingPaises,
    loadingProvincias,
    loadingDireccionesId,
  } = useEmpresa();

  const { getCodigoPostalId } = useCodigoPostal();

  const { empresa, hasData, setHasData, direcciones, setDirecciones, active } =
    useContext(PerfilEmpresaContext);

  const direccion = comesFromGi ? editarDireccion : direcciones[indice];
  const [poblaciones, setPoblaciones] = useState<IEnumPaises[]>([]);
  const rhForm = useForm();
  const [ternario, setTernario] = useState(0);
  const [paises, setPaises] = useState<IEnumPaises[]>([]);

  const [tipos, setTipos] = useState<IEnum[]>([]);
  const [provincias, setProvincias] = useState<IProvincias[]>([]);
  const [codigoPostalId, setCodigoPostalId] = useState<ICodigoPostal>();
  const { newCancelToken } = useCancelToken();

  const cancelToken = newCancelToken();

  useEffect(() => {
    if (!paises.length) {
      fetchPaises()
        .then((res) => {
          res && setPaises(res);
        })
        .catch((e) => notifications.unknownError(e));
    }
  }, [fetchPaises, paises.length]);

  useEffect(() => {
    if (!tipos.length) {
      fetchTipos()
        .then((res) => {
          res && setTipos(res);
        })
        .catch((e) => notifications.unknownError(e));
    }
  }, [fetchTipos, tipos.length]);

  useEffect(() => {
    if (!provincias.length) {
      fetchProvincias()
        .then((res) => {
          res && setProvincias(res.items);
        })
        .catch((e) => notifications.unknownError(e));
    }
  }, [fetchProvincias, provincias.length]);

  const cpWatcher = rhForm.watch('codigoPostal');
  const provinciaWatcher = rhForm.watch('provincia');

  const getFormValues = useCallback(() => {
    if (!isEmpty(editarDireccion)) {
      const infoProvincia = {
        id: editarDireccion.provincia.id,
        nombre: editarDireccion.provincia.nombre,
      };
      const infoPoblacion = {
        id: editarDireccion.poblacion.id,
        nombre: editarDireccion.poblacion.nombre,
      };
      rhForm.setValue('pais', editarDireccion.pais.id);
      rhForm.setValue('provincia', infoProvincia);
      rhForm.setValue('poblacion', infoPoblacion);
    }
  }, [editarDireccion, rhForm]);

  useEffect(() => {
    if (ternario === ZERO_VALUE) {
      getFormValues();
    }
    setTernario(1);
  }, [getFormValues, ternario]);

  const generadorDeDireccionesEditar = (
    fieldValues: FieldValues,
    direccion: IDireccionesEmpresa
  ) => {
    if (
      fieldValues.tipoDireccion === direccion.tipo &&
      fieldValues.calle === direccion.calle &&
      fieldValues.codigoPostal === direccion.codigoPostal &&
      fieldValues.pais === direccion.pais.id &&
      fieldValues.poblacion.id === direccion.poblacion.id &&
      fieldValues.provincia.id === direccion.provincia.id
    ) {
      return false;
    }

    const nuevaDireccion: IDireccionToBe = {
      id: direccion.id,
      calle: fieldValues.calle,
      codigoPostalId: codigoPostalId,
      // empresaId: comesFromGi ? empresaGi.id : empresa.id,
      poblacionId: fieldValues.poblacion.id,
      tipo: fieldValues.tipoDireccion,
    };
    return nuevaDireccion;
  };

  useEffect(() => {
    provinciaWatcher &&
      getPoblacionesByProvinciaId(provinciaWatcher.id)
        .then((res) => {
          res && setPoblaciones(res);
        })
        .catch((e) => notifications.unknownError(e));
  }, [getPoblacionesByProvinciaId, provinciaWatcher]);

  const infoByCp = useCallback(
    async (cpWatcher: string) => {
      const resCodigoPostalId = await getCodigoPostalId(cpWatcher);
      resCodigoPostalId && setCodigoPostalId(resCodigoPostalId?.items[0]?.id);
      if (resCodigoPostalId?.items[0]?.id) {
        const res = await getProvinciasByCodigoPostal(
          resCodigoPostalId?.items[0]?.id
        );
        if (res) {
          const infoProvincia = {
            id: res.id,
            nombre: res.nombre,
          };
          rhForm.setValue('pais', res.pais.id);
          rhForm.setValue('provincia', infoProvincia);
        }
        const resPobla = await getPoblacionByCodigoPostal(
          resCodigoPostalId?.items[0]?.id
        );
        if (resPobla) {
          const poblacionTmp = {
            id: resPobla[0].id,
            nombre: resPobla[0].nombre,
          };
          rhForm.setValue('poblacion', poblacionTmp);
        }
      }
    },
    [getProvinciasByCodigoPostal, getPoblacionByCodigoPostal, rhForm]
  );

  useEffect(() => {
    if (validatePostalCode(cpWatcher)) {
      infoByCp(cpWatcher);
    }
  }, [cpWatcher, infoByCp, direccion]);

  const generadorDeDireccionesDirectasParaElBackend = (
    fieldValues: FieldValues
  ) => {
    const nuevaDireccion: IDireccionToBe = {
      calle: fieldValues.calle,
      codigoPostalId: codigoPostalId,
      empresaId: comesFromGi ? empresaGi.id : empresa.id,
      notificacionesActivas: false,
      poblacionId: fieldValues.poblacion.id,
      tipo: fieldValues.tipoDireccion,
    };
    return nuevaDireccion;
  };

  const handleNuevaDireccion = async (fieldValues: FieldValues) => {
    const nuevaDireccion =
      generadorDeDireccionesDirectasParaElBackend(fieldValues);
    const resPost = await enviarDireccionesEmpresa(
      comesFromGi ? empresaGi.id : empresa.id,
      [nuevaDireccion]
    );
    if (resPost) {
      const resDirecciones = await obtenerDireccionesById(
        comesFromGi ? empresaGi.id : empresa.id
      );
      if (resDirecciones) {
        if (!comesFromGi) {
          setDirecciones(resDirecciones.items);
          const newData = [...hasData];
          newData[active - 1] = true;
          setHasData(newData);
          setTernario(0);
        } else {
          fetchDirecciones(cancelToken, initialQueryState);
        }
        rhForm.reset();
        setIsOpen(false);
      }
    }
  };

  const handleEditDireccion = async (fieldValues: FieldValues) => {
    const nuevaDireccion = generadorDeDireccionesEditar(
      fieldValues,
      editarDireccion
    );
    if (nuevaDireccion) {
      const resEditar = await editarDireccionesEmpresa(
        comesFromGi ? empresaGi.id : empresa.id,
        [nuevaDireccion]
      );
      if (resEditar) {
        const resDirecciones = await obtenerDireccionesById(
          comesFromGi ? empresaGi.id : empresa.id
        );
        if (resDirecciones) {
          if (!comesFromGi) {
            setDirecciones(resDirecciones.items);
            setTernario(0);
          } else {
            fetchDirecciones(cancelToken, initialQueryState);
          }
          rhForm.reset();
          setIsOpen(false);
        }
      }
    }
  };

  if (loadingTipos || loadingPaises || loadingProvincias) {
    return (
      <div className="spinner-div margin30">
        <Spinner loading color="#435dbc" size={100} />
      </div>
    );
  }
  return (
    <form
      onSubmit={
        isEmpty(editarDireccion)
          ? rhForm.handleSubmit(handleNuevaDireccion)
          : rhForm.handleSubmit(handleEditDireccion)
      }
    >
      <div className="direccion-container_modal">
        {!!paises.length && !!tipos.length && !!provincias.length && (
          <>
            <WildcardFields
              fields={DIRECCIONES_FIELDS(
                tipos,
                paises,
                provincias,
                poblaciones,
                direccion
              )}
              disableds={['pais']}
              data={editarDireccion || {}}
              rhForm={rhForm}
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button
                color="blank"
                text="Cancelar"
                onClick={() => {
                  rhForm.reset();
                  setIsOpen(false);
                }}
                type="button"
              />
              <Button
                color="primary"
                text={
                  !isEmpty(editarDireccion)
                    ? 'Editar dirección'
                    : 'Añadir dirección'
                }
                type="button"
              />
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default Direccion;
