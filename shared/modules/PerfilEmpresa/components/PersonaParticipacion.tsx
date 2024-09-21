/* eslint-disable */
// @ts-nocheck

import { useContext, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';

import { useEmpresa } from '@shared/hooks';
import { newFormatDateUTC } from '@shared/utils/formatters';

import { Button } from '@shared/components/Legacy/Button';
import { Error } from '@shared/components/Legacy/CustomInputs';
import { Spinner } from '@shared/components/Legacy/Spinner';
import { WildcardFields } from '@shared/components/Legacy/WildcardFields';
import { IEnumPaises } from '@shared/interfaces/Legacy/IEnum/IEnum';

import { PERSONA_PARTICIPACION } from '../constants/fields';
import PerfilEmpresaContext from '../context/PerfilEmpresaContext';
import { ISocios, ParticipacionPersonaProps } from '../interfaces';

import './estilos.scss';
import notifications from '@shared/utils/notifications';
import { validateDniNie } from '@shared/utils/DNIValidator';

export const MIN_VALUE = 25;
export const PersonaParticipacion = ({
  setIsOpen,
  editarPersona = {} as ISocios,
}: ParticipacionPersonaProps) => {
  const { empresa, setSocios } = useContext(PerfilEmpresaContext);
  const [paises, setPaises] = useState<IEnumPaises[]>([]);
  const { hasData, setHasData, active } = useContext(PerfilEmpresaContext);
  const rhForm = useForm();
  const {
    clearErrors,
    setError,
    trigger,
    formState: { errors },
  } = rhForm;

  const {
    crearSocio,
    modificarSocio,
    fetchSocios,
    loadingSocios,
    fetchPaises,
  } = useEmpresa();

  const watchPorcentaje = rhForm.watch('porcentajeParticipacion');
  const watchDni = rhForm.watch('dni');

  const isValidDniNIe = () => {
    if (watchDni && !validateDniNie(watchDni)) {
      setError('dni', {
        type: 'manual',
        message: 'Debe introducir un DNI o NIE válido',
      });
      return false;
    } else {
      clearErrors('dni');
    }

    return true;
  };
  const generadorDeSocios = (fieldValues: FieldValues) => {
    const nuevoSocio = {
      id: empresa.id,
      esPuestoPublico: fieldValues.responsabilidadUnica,
      fechaNacimiento: newFormatDateUTC(fieldValues.fechaNacimiento),
      dni: fieldValues.dni,
      nombreCompleto: fieldValues.nombreCompleto,
      paisNacionalidadId: fieldValues.paisNacionalidad,
      paisResidenciaId: fieldValues.paisResidencia,
      porcentajeParticipacion: fieldValues.porcentajeParticipacion,
    };
    return nuevoSocio;
  };
  const generadorDeSociosparaModificar = (fieldValues: FieldValues) => {
    const nuevoSocio = {
      id: empresa.id,
      esPuestoPublico: fieldValues.responsabilidadUnica,
      fechaNacimiento: newFormatDateUTC(fieldValues.fechaNacimiento),
      dni: fieldValues.dni,
      nombreCompleto: fieldValues.nombreCompleto,
      paisNacionalidadId: fieldValues.paisNacionalidad,
      paisResidenciaId: fieldValues.paisResidencia,
      porcentajeParticipacion: fieldValues.porcentajeParticipacion,
      socioId: editarPersona.id,
    };
    return nuevoSocio;
  };

  const handleNuevoSocio = async (fieldValues: FieldValues) => {
    if (!isValidDniNIe()) return false;
    const socioNuevo = generadorDeSocios(fieldValues);
    const resSocio = await crearSocio(socioNuevo);
    if (resSocio) {
      const resFetchSocios = await fetchSocios(empresa.id);
      resFetchSocios && setSocios(resFetchSocios);

      const sociosConResidencia = resFetchSocios.every(
        (socio) => socio.paisResidencia
      );
      const newData = [...hasData];
      newData[active - 1] = sociosConResidencia;
      setHasData(newData);
    }

    rhForm.reset();
    setIsOpen(false);
  };

  const handleEditarSocio = async (fieldValues: FieldValues) => {
    if (!isValidDniNIe()) return false;
    const nuevoSocio = generadorDeSociosparaModificar(fieldValues);
    const resSocio = await modificarSocio(nuevoSocio);
    if (resSocio) {
      const resFetchSocios = await fetchSocios(empresa.id);
      resFetchSocios && setSocios(resFetchSocios);
      const sociosConResidencia = resFetchSocios.every(
        (socio) => socio.paisResidencia
      );
      const newData = [...hasData];
      newData[active - 1] = sociosConResidencia;
      setHasData(newData);
    }
    setIsOpen(false);
  };
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
    if (watchPorcentaje >= MIN_VALUE) {
      clearErrors('porcentaje-field');
    } else {
      setError('porcentaje-field', {
        type: 'manual',
        message: 'El porcentaje debe ser mayor o igual al 25%',
      });
      trigger('porcentajeParticipacion');
    }
  }, [clearErrors, setError, trigger, watchPorcentaje]);

  useEffect(() => {
    isValidDniNIe();
  }, [clearErrors, setError, watchDni]);

  if (loadingSocios) {
    return (
      <div className="spinner-div margin20">
        <Spinner loading color="#435dbc" size={100} />
      </div>
    );
  }
  return (
    <form
      onSubmit={
        isEmpty(editarPersona)
          ? rhForm.handleSubmit(handleNuevoSocio)
          : rhForm.handleSubmit(handleEditarSocio)
      }
    >
      <div className="direccion-container_modal">
        <WildcardFields
          fields={PERSONA_PARTICIPACION(paises, editarPersona)}
          data={editarPersona || {}}
          rhForm={rhForm}
        />
        <Error property="porcentaje-field" errors={errors} />
        <div className="flex justify-end gap-2 mt-2 accion_firmantes_botones">
          <Button
            label="Cancelar"
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <Button
            label={isEmpty(editarPersona) ? 'Añadir persona' : 'Editar persona'}
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};
