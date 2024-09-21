import React from 'react';

import { Button } from '@shared/components/Legacy/Button';
import { Dialog } from '@shared/components/Legacy/Dialog';

const CrearEstudio = ({
  isOpen,
  toggle,
  // cancelFunc,
  onSubmit,
  efectosNoAprobadosPorPRAS,
  disableButtons,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      close={toggle}
      header="Efectos sin aprobar"
      closeButtonLinkAppareance
      closeButtonColor="secondary"
      className="crear-estudio-dialog"
    >
      <>
        <div className="m-4">
          Los siguientes efectos aún no han sido aprobados, y no formarán parte
          del contrato:
          <ul>
            {efectosNoAprobadosPorPRAS?.map((efecto) => (
              <li>
                {`${
                  efecto.libradoRazonSocial
                    ? `${efecto.libradoRazonSocial} |`
                    : ''
                }
                ${efecto.numero ? `${efecto.numero} |` : ''}
                ${efecto.importeNominal || ''}
                `}
              </li>
            ))}
          </ul>
          Pasarán a ser estudiados por nuestro departamento de Riesgos.
        </div>
        <Button label="Aceptar" onClick={onSubmit} disabled={disableButtons} />
      </>
    </Dialog>
  );
};

export default CrearEstudio;
