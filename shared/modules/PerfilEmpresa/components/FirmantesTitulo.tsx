import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  faCircleExclamation,
  faPencilAlt,
  faTrashAlt,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from '@shared/components/Modal';
import { useEmpresa } from '@shared/hooks';
import { IPersona } from '@shared/interfaces/IPersona';
import NuevoContacto from '@shared/modules/NuevoContacto';
import notifications from '@shared/utils/notifications';

import { Button } from '@shared/components/Legacy/Button';
import { Tooltip } from '@shared/components/Legacy/Tooltip';

import { ELIMINAR_PERSONA_MENSAJE } from '../constants/constants';

import { Eliminar } from './Eliminar';

import './estilos.scss';

export type FirmantesTituloProps = {
  persona: IPersona;
  indice: number;
  refreshModal: () => void;
};
export const FirmantesTitulo = ({
  persona,
  indice,
  refreshModal,
}: FirmantesTituloProps) => {
  const rhForm = useFormContext();
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { eliminarPersona } = useEmpresa();

  const handleEliminarPersona = async () => {
    eliminarPersona(persona.id)
      .then((eliminarInfo) => {
        if (eliminarInfo) {
          refreshModal();
        }
      })
      .catch((e) => notifications.unknownError(e));
  };

  return (
    <div className="buttonSocial">
      <div className="infoDireccion mobile:flex mobile:flex-col">
        <div
          className={`tipo-cargo ${
            !persona.esRepresentante && 'noRepresentante'
          }`}
        >
          <span className="tipoCargo">
            {persona.esRepresentante ? 'REPRESENTANTE' : 'SIN CARGO'}
          </span>
        </div>
        <p className="mobile:m-0">{`${persona.nombre} ${persona.apellidos}`}</p>
        <p className="mobile:m-0">{`${
          persona.representante?.cargo.description || '-'
        }`}</p>
      </div>
      <div className="actions">
        {persona.esRepresentante && !persona.representante?.fechaNacimiento && (
          <div className="alerta">
            <Tooltip content="Este representante no tiene fecha de nacimiento.">
              <FontAwesomeIcon
                size="lg"
                color="red"
                icon={faCircleExclamation}
              />
            </Tooltip>
          </div>
        )}
        <div
          role="button"
          tabIndex={0}
          className="botonEditar"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditOpen(true);
          }}
        >
          <FontAwesomeIcon size="lg" icon={faPencilAlt} />
        </div>
        <div
          role="button"
          tabIndex={0}
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
            disabled={persona.esRepresentante}
          />
        </div>
      </div>
      <div onClick={(e) => e.stopPropagation()} role="button" tabIndex={0}>
        <Modal
          open={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            refreshModal();
            rhForm.reset();
          }}
          header="Editar firmante"
          className="resumen-kyc__modal-generarContrato"
        >
          <NuevoContacto
            setIsOpen={setIsEditOpen}
            personaAEditar={persona}
            indice={indice}
            refreshModal={refreshModal}
          />
        </Modal>
      </div>
      <div onClick={(e) => e.stopPropagation()} role="button" tabIndex={0}>
        <Modal
          open={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
          }}
          header="Borrar Persona"
          className="eliminar-container"
        >
          <Eliminar
            setIsDeleteOpen={setIsDeleteOpen}
            eliminarOpcion={() => handleEliminarPersona()}
            mensaje={ELIMINAR_PERSONA_MENSAJE}
          />
        </Modal>
      </div>
    </div>
  );
};
