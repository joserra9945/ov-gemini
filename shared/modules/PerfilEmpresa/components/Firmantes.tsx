import { useContext, useEffect, useState } from 'react';
import { isArray } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { faSignature } from '@fortawesome/pro-solid-svg-icons';

import ConfirmDialogModal from '@shared/components/ConfirmDialogModal';
import { Modal } from '@shared/components/Modal';
import { useEmpresa } from '@shared/hooks';
import { IPersona } from '@shared/interfaces/IPersona';
import NuevoContacto from '@shared/modules/NuevoContacto';
import { IRepresentante } from '@shared/modules/NuevoContacto/interfaces';
import notifications from '@shared/utils/notifications';

import { Accordion, AccordionTab } from '@shared/components/Legacy/Accordion';
import { Button } from '@shared/components/Legacy/Button';
import { Spinner } from '@shared/components/Legacy/Spinner';

import { esAutonomo } from '../constants/utils';
import PerfilEmpresaContext from '../context/PerfilEmpresaContext';

import { FirmantesTitulo } from './FirmantesTitulo';

export const Firmantes = () => {
  const { empresa } = useContext(PerfilEmpresaContext);
  const {
    fetchPersonasByEmpresa,
    loadingRepresentantes,
    loadingPersona,
    fetchRepresentantesByEmpresa,
  } = useEmpresa();
  const [personasEmpresa, setPersonasEmpresa] = useState<IPersona[]>([]);
  const [representantesEmpresa, setRepresentantesEmpresa] = useState<
    IRepresentante[]
  >([]);
  const [usuarioEmpresa, setUsuarioEmpresa] = useState<IPersona>(
    {} as IPersona
  );
  const { hasData, setHasData, active } = useContext(PerfilEmpresaContext);
  const [modalCreateRepresentante, setModalCreateRepresentante] =
    useState(false);

  const [openModalNoRepresentantes, setOpenModalNoRepresentantes] =
    useState(false);

  useEffect(() => {
    !personasEmpresa.length &&
      fetchPersonasByEmpresa(empresa.id)
        .then((personas) => {
          if (personas) {
            setPersonasEmpresa(personas.items);
            const usuario = personas.items.find(
              (person: IPersona) => person.esUsuario
            );
            usuario && setUsuarioEmpresa(usuario);

            const representantesConFechaNacimiento = personas.items
              .filter((persona) => persona.esRepresentante)
              .filter((persona) => persona.representante?.fechaNacimiento)
              .filter((persona) => persona.representante?.paisNacionalidadId)
              .filter((persona) => persona.representante?.paisResidenciaId);

            if (representantesConFechaNacimiento.length > 0) {
              const newHasData = cloneDeep(hasData);
              if (isArray(newHasData)) {
                newHasData[active - 1] = true;
              }
              setHasData(newHasData);
            }
            setOpenModalNoRepresentantes(true);
          }
        })
        .catch((e) => notifications.unknownError(e));
  }, [
    active,
    empresa.id,
    fetchPersonasByEmpresa,
    hasData,
    personasEmpresa.length,
    setHasData,
    setPersonasEmpresa,
  ]);

  useEffect(() => {
    !representantesEmpresa.length &&
      fetchRepresentantesByEmpresa(empresa.id)
        .then((res) => {
          res && setRepresentantesEmpresa(res.items);
        })
        .catch((e) => notifications.unknownError(e));
  }, [
    active,
    empresa.id,
    fetchRepresentantesByEmpresa,
    hasData,
    representantesEmpresa.length,
    setHasData,
  ]);

  const refreshModal = () => {
    fetchPersonasByEmpresa(empresa.id)
      .then((personas) => {
        personas && setPersonasEmpresa(personas.items);
        personas && setOpenModalNoRepresentantes(false);

        const representantesConFechaNacimiento = personas?.items
          .filter((persona) => persona.esRepresentante)
          .filter((persona) => persona.representante?.fechaNacimiento);
        if (
          representantesConFechaNacimiento &&
          representantesConFechaNacimiento.length > 0
        ) {
          const newHasData = cloneDeep(hasData);
          if (isArray(newHasData)) {
            newHasData[active - 1] = true;
          }
          setHasData(newHasData);
        }
      })
      .catch((e) => notifications.unknownError(e));
  };

  if (loadingRepresentantes || loadingPersona) {
    return (
      <div className="spinner-div">
        <Spinner loading color="#435dbc" size={75} />
      </div>
    );
  }

  return (
    <>
      <div>
        <Accordion>
          {personasEmpresa &&
            personasEmpresa.map((persona: IPersona, index: number) => (
              <AccordionTab
                className="direcciones-accordion-tab"
                key={persona.id || `direccion.${index}`}
                id={persona.id}
                title={
                  <>
                    <FirmantesTitulo
                      persona={persona}
                      indice={index}
                      refreshModal={refreshModal}
                    />
                    {!persona.representante?.paisResidenciaId &&
                      persona.esRepresentante && (
                        <span className="text-danger">
                          Debe completar los datos del firmante
                        </span>
                      )}
                  </>
                }
              />
            ))}
        </Accordion>
        <div className="flex justify-end">
          <Button
            icon={faPlus}
            label="Añadir otro firmante"
            onClick={() => {
              setUsuarioEmpresa({} as IPersona);
              setModalCreateRepresentante(true);
            }}
            className="bg-primary rounded-md text-white py-2 px-4 hover:bg-primary-over h-10 w-30 mt-2"
          />
        </div>
      </div>

      <Modal
        open={modalCreateRepresentante}
        onClose={() => {
          refreshModal();
          setModalCreateRepresentante(false);
        }}
        header="Nuevo firmante"
        className="perfil-empresa-container"
      >
        <NuevoContacto
          personaAEditar={usuarioEmpresa}
          setIsOpen={setModalCreateRepresentante}
          refreshModal={refreshModal}
        />
      </Modal>

      {!esAutonomo() && !representantesEmpresa.length && (
        <ConfirmDialogModal
          isOpen={openModalNoRepresentantes}
          onClose={() => setOpenModalNoRepresentantes(false)}
          header="Nuevo firmante"
          bodyText={`Desea crear un representante a partir de ${usuarioEmpresa.nombre} ${usuarioEmpresa.apellidos}`}
          labelCancel="No"
          labelConfirm="Si"
          onConfirm={() => setModalCreateRepresentante(true)}
          onDeny={() => setModalCreateRepresentante(true)}
          iconHeader={faSignature}
          colorIconHeader="primary"
        />
      )}
    </>
  );
};
