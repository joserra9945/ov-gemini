import { FC } from 'react';

import FirmaCesionSVG from '@shared/assets/firma-cesion.svg';
import { Spinner } from '@shared/components/Spinner';
import {
  IAction,
  IField,
  TurboFormRh,
} from '@shared/forms/Interfaces/Interfaces';
import NoDataGenericTemplate from '@shared/templates/NoDataGenericTemplate';

import DatosFirmaForm from '../DatosFirmaForm/DatosFirmaForm';
import VincularFirmaModal from '../VincularFirmaModal/VincularFirmaModal';

interface DatosFirmaProps {
  fields: IField[];
  actions: IAction[];
  onSubmit: () => void;
  showTitle?: boolean;
  rhForm: TurboFormRh;
  nodata: { show: boolean; create: any };
  vincularFirma: {
    show: boolean;
    open: boolean;
    firma: any;
    onClick: any;
    onClose: any;
  };
  hasFirmaNotarial?: boolean;
  loading?: boolean;
}

const DatosFirma: FC<DatosFirmaProps> = ({
  fields,
  actions,
  nodata,
  vincularFirma,
  showTitle,
  rhForm,
  onSubmit,
  hasFirmaNotarial,
  loading,
}) => {
  if (hasFirmaNotarial === null) {
    return <Spinner className="flex justify-center items-center" />;
  }
  return (
    <div>
      {nodata.show ? (
        <NoDataGenericTemplate
          buttonType="primary"
          image={FirmaCesionSVG}
          title="No existe firma notarial"
          description="No dispone de ningún documento de la empresa seleccionada para enviar a firmar"
          textButton="Crear firma notarial"
          onClick={nodata.create}
        />
      ) : (
        <div className="flex justify-center w-full">
          {loading ? (
            <div className="text-center w-full h-full min-w-[40rem] min-h-[30rem] content-center">
              <Spinner />
            </div>
          ) : (
            <DatosFirmaForm
              rhForm={rhForm}
              fields={fields}
              actions={actions}
              onSubmit={onSubmit}
              showTitle={showTitle}
            />
          )}
        </div>
      )}
      {vincularFirma.show && (
        <VincularFirmaModal
          firma={vincularFirma.firma}
          isOpen={vincularFirma.open}
          onClick={vincularFirma.onClick}
          onClose={vincularFirma.onClose}
        />
      )}
    </div>
  );
};

export default DatosFirma;
