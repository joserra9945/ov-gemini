import { useContext, useState } from 'react';

import { Modal } from '@shared/components/Modal';
import { ESTADOS_DIRECTLENDING_ENUM } from '@shared/enum/enumEstadosDirectLending';
import {
  EstadoDirectLending,
  InfoTemplate,
  PropuestaModificadaTemplate,
} from '@shared/templates';

import DirectLendingContext from '../context/DirectLendingContext';
import { CONFIG_RESUMEN } from '../Resumen/ResumenConfigEstados';

const Estado = () => {
  const { directLendingResumen, config, setShowSolicitarFirmaModal } =
    useContext(DirectLendingContext);
  const { estado, importeInicial, importeNominal } = directLendingResumen;
  const estadoId = estado?.id;

  const [showImporteModificadoModal, setShowImporteModificadoModal] =
    useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4 px-4">
      {estadoId === ESTADOS_DIRECTLENDING_ENUM.DENEGADO && (
        <InfoTemplate
          text="La propuesta ha sido denegada."
          clickableText="Saber más"
          type="danger"
          tooltipText={`Motivo : ${directLendingResumen?.descripcionEstado}`}
        />
      )}
      {estadoId === ESTADOS_DIRECTLENDING_ENUM.PRECONCEDIDO &&
      importeNominal !== importeInicial ? (
        <InfoTemplate
          text="La propuesta ha sido modificada. Las garantías no son suficientes para el importe solicitado. "
          clickableText="Saber más"
          type="danger"
          onClick={() => setShowImporteModificadoModal(true)}
        />
      ) : estadoId === ESTADOS_DIRECTLENDING_ENUM.PRECONCEDIDO ? (
        <InfoTemplate
          text="Solicite la firma ante notario. "
          clickableText="Solicitar firma"
          type="info"
          onClick={() => setShowSolicitarFirmaModal(true)}
        />
      ) : (
        CONFIG_RESUMEN[estadoId]?.MENSAJE && (
          <InfoTemplate
            text={CONFIG_RESUMEN[estadoId].MENSAJE}
            type={CONFIG_RESUMEN[estadoId].COLOR}
          />
        )
      )}

      <div className="flex flex-row justify-between">
        <span>Estado {config?.productoSingular}</span>
        <EstadoDirectLending
          id={directLendingResumen?.estado?.id}
          description={directLendingResumen?.estado?.description}
          descripcionEstado={directLendingResumen?.descripcionEstado}
          resumenDirectLending
        />
      </div>

      {showImporteModificadoModal && (
        <Modal
          header="Propuesta modificada"
          open={showImporteModificadoModal}
          onClose={() => setShowImporteModificadoModal(false)}
          className="w-1/4 h-auto max-h-[80vh] tablet:w-full tablet:h-1/3 mobile:w-full mobile:h-1/3"
        >
          <PropuestaModificadaTemplate
            importeInicial={importeInicial}
            importeNominal={importeNominal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Estado;
