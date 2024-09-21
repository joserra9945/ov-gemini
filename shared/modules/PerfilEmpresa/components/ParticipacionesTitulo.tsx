/* eslint-disable */
// @ts-nocheck

import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { faPencilAlt, faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useEmpresa } from '@shared/hooks';

import { Button } from '@shared/components/Legacy/Button';
import Modal from '@shared/components/Legacy/Modal';
import { Spinner } from '@shared/components/Legacy/Spinner';

import { ELIMINAR_SOCIO_MENSAJE } from '../constants/constants';
import PerfilEmpresaContext from '../context/PerfilEmpresaContext';
import { ParticipacionPersonaTituloProps } from '../interfaces';

import { Eliminar } from './Eliminar';
import { PersonaParticipacion } from './PersonaParticipacion';

import './estilos.scss';

export const ParticipacionesTitulo = ({
  persona,
  indice,
}: ParticipacionPersonaTituloProps) => {
  const { eliminarSocio, fetchSocios, loadingSocios } = useEmpresa();
  const { empresa, setSocios, setHasData, hasData, active } =
    useContext(PerfilEmpresaContext);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const rhForm = useForm();

  const handleEliminarPersona = async () => {
    const res = await eliminarSocio(empresa.id, persona.id);
    if (res) {
      const newSocios = await fetchSocios(empresa.id);
      newSocios && setSocios(newSocios);
      if (!newSocios?.length) {
        const newData = [...hasData];
        newData[active - 1] = false;
        setHasData(newData);
      }
    }
  };
  if (loadingSocios) {
    return (
      <div className="spinner-div">
        <Spinner loading color="#435dbc" size={100} />
      </div>
    );
  }
  return (
    <div className="buttonSocial">
      <div className="infoDireccion mobile:flex mobile:flex-col">
        <p className="mobile:m-0">{persona.nombreCompleto}</p>
        <p className="mobile:m-0">{`(${persona.porcentajeParticipacion}%)`}</p>
        <p className="mobile:m-0">{persona.nif}</p>
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
            onClick={() => setDeleteOpen(true)}
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
          title="Editar persona"
          className="direccion-container"
        >
          <PersonaParticipacion
            setIsOpen={setIsEditOpen}
            editarPersona={persona}
            indice={indice}
          />
        </Modal>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <Modal
          isOpen={deleteOpen}
          onClose={() => {
            setDeleteOpen(false);
          }}
          title="Borrar Participante"
          className="eliminar-container"
        >
          <Eliminar
            setIsDeleteOpen={setDeleteOpen}
            eliminarOpcion={() => handleEliminarPersona()}
            mensaje={ELIMINAR_SOCIO_MENSAJE}
          />
        </Modal>
      </div>
    </div>
  );
};
