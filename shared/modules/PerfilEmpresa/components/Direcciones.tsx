/* eslint-disable */
// @ts-nocheck

import { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { faPlus } from '@fortawesome/pro-light-svg-icons';

import { useEmpresa } from '@shared/hooks';
import { IDireccionesEmpresa } from '@shared/interfaces/IDireccionesEmpresa';
import Notifications from '@shared/utils/notifications';

import { Accordion, AccordionTab } from '@shared/components/Legacy/Accordion';
import { Button } from '@shared/components/Legacy/Button';
import { Error } from '@shared/components/Legacy/CustomInputs';

import { Spinner } from '@shared/components/Legacy/Spinner';

import { NO_REGISTROS } from '../constants/constants';
import PerfilEmpresaContext from '../context/PerfilEmpresaContext';

import Direccion from './Direccion';
import { DireccionesTitulo } from './DireccionesTitulo';

import './estilos.scss';
import { Modal } from '@shared/components/Modal';

const Direcciones = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { empresa, direcciones, setDirecciones } =
    useContext(PerfilEmpresaContext);
  const { obtenerDireccionesById, loadingDireccionesId } = useEmpresa();
  const rhFormContext = useFormContext();
  const {
    formState: { errors },
  } = rhFormContext;

  useEffect(() => {
    obtenerDireccionesById(empresa.id)
      .then((res) => {
        res && setDirecciones(res.items);
      })
      .catch((e) => notifications.unknownError(e));
  }, [empresa.id, obtenerDireccionesById, setDirecciones]);

  if (loadingDireccionesId) {
    return (
      <div className="spinner-div">
        <Spinner loading color="#435dbc" size={75} />
      </div>
    );
  }

  return (
    <div>
      {!direcciones.length ? (
        <>
          <div>
            <p>{NO_REGISTROS}</p>
          </div>
          <Error property="direcciones" errors={errors} />
        </>
      ) : (
        <Accordion>
          {direcciones.map((direccion: IDireccionesEmpresa, index: number) => (
            <AccordionTab
              className="direcciones-accordion-tab"
              key={direccion.id || `direccion.${index}`}
              id={direccion.id}
              title={<DireccionesTitulo direccion={direccion} indice={index} />}
            />
          ))}
        </Accordion>
      )}
      <div className="flex justify-end">
        <Button
          className="bg-primary rounded-md text-white py-2 px-4 hover:bg-primary-over h-10 w-30 mt-2"
          icon={faPlus}
          label="Añadir otra dirección"
          onClick={() => setIsOpen(true)}
        />
      </div>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        header="Nueva dirección"
        className="direccion-container"
      >
        <Direccion setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};

export default Direcciones;
