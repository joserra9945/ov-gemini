/* eslint-disable */
// @ts-nocheck

import { useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { isEmpty } from 'lodash';
import { faPencilAlt, faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useEmpresa } from '@shared/hooks';

import { Button } from '@shared/components/Legacy/Button';
import Modal from '@shared/components/Legacy/Modal';
import { Spinner } from '@shared/components/Legacy/Spinner';

import { ELIMINAR_DIRECCION_MENSAJE } from '../constants/constants';
import PerfilEmpresaContext from '../context/PerfilEmpresaContext';
import { DireccionesTituloProps } from '../interfaces';

import { Direccion } from './Direccion';
import { Eliminar } from './Eliminar';

export const DireccionesTitulo = ({
  direccion,
  indice,
}: DireccionesTituloProps) => {
  const { empresa, setHasData, hasData, setDirecciones, active } =
    useContext(PerfilEmpresaContext);
  const {
    eliminarDireccionPorId,
    obtenerDireccionesById,
    loadingDireccionesId,
  } = useEmpresa();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const tipoDireccion = direccion;
  const rhForm = useFormContext();

  const eliminarDireccion = async () => {
    const eliminarInfo = await eliminarDireccionPorId(empresa.id, direccion.id);
    if (eliminarInfo) {
      const resDirecciones = await obtenerDireccionesById(empresa.id);
      resDirecciones && setDirecciones(resDirecciones.items);
      const noHaySocial = resDirecciones?.items.find(
        (emp) => emp.tipoDireccion.id === 1
      );
      if (resDirecciones?.items.length === 1 && !noHaySocial) {
        const newData = [...hasData];
        newData[active - 1] = false;
        setHasData(newData);
      }
      if (isEmpty(resDirecciones?.items)) {
        const newData = [...hasData];
        newData[active - 1] = false;
        setHasData(newData);
      }
    }
  };

  if (loadingDireccionesId) {
    return (
      <div className="spinner-div">
        <Spinner loading color="#435dbc" size={100} />
      </div>
    );
  }

  return (
    <div className="buttonSocial">
      <div className="infoDireccion mobile:flex mobile:flex-col mobile:m-0">
        <p className="tipoDireccion mobile:m-0">
          <b>{tipoDireccion?.tipo?.description} </b>
        </p>
        <p className="mobile:m-0">{`${direccion.calle} - ${direccion.poblacion.nombre}`}</p>
        <p className="mobile:m-0">{`(${direccion.codigoPostal}) - ${direccion.provincia.nombre}`}</p>
      </div>
      <div className="actions">
        <div
          className="botonEditar"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditOpen(true);
          }}
        >
          <FontAwesomeIcon size="lg" color="danger" icon={faPencilAlt} />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button
            size="lg"
            color="danger"
            className="eliminarBoton"
            icon={faTrashAlt}
            onClick={() => setIsDeleteOpen(true)}
          />
        </div>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <Modal
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            rhForm.reset();
          }}
          title="Editar dirección"
          className="direccion-container"
        >
          <Direccion
            setIsOpen={setIsEditOpen}
            editarDireccion={direccion}
            indice={indice}
          />
        </Modal>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <Modal
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
          }}
          title="Borrar Direccion"
          className="eliminar-container"
        >
          <Eliminar
            setIsDeleteOpen={setIsDeleteOpen}
            eliminarOpcion={() => eliminarDireccion()}
            mensaje={ELIMINAR_DIRECCION_MENSAJE}
          />
        </Modal>
      </div>
    </div>
  );
};
