import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import noDirectLending from 'assets/cuenta-bancaria.svg';

import { Modal } from '@shared/components/Modal';
import { TurboTableHeader } from '@shared/components/TurboTable/templates/TurboTableHeader';
import { productosDirectLending } from '@shared/enum/productosDirectLending';
import { IDirectLendingByFiltersGet } from '@shared/interfaces/api/IDirectLending';
import { TABLE_VALUES } from '@shared/modules/DirectLending/constants/DirectLending';
import { IUserReducer } from '@shared/modules/DirectLending/constants/IUserReducer';
import ResumenDirectLending from '@shared/modules/DirectLending/Resumen/ResumenDirectLending';
import { NoDataGenericTemplate } from '@shared/templates';
import { initialQueryState } from '@shared/utils/constants';

import AlertFirma from 'components/AlertFirma';

import { PrestamosHeader } from './components/PrestamosHeader';
import Table from './components/Table';

const DirectLending = ({ config }: { config: { [key: string]: string } }) => {
  const navigate = useNavigate();
  const { libradorId } = useSelector((store: IUserReducer) => store.userState);
  const [emptyDirectLending, setEmptyDirectLending] = useState(false);
  const [emptyHistorialDirectLending, setEmptyHistorialDirectLending] =
    useState(false);
  const { productoSingular, productoTitulo } = config;
  const [showResumen, setShowResumen] = useState<boolean>(false);
  const [selected, setSelected] = useState({} as IDirectLendingByFiltersGet);

  if (emptyDirectLending && emptyHistorialDirectLending) {
    return (
      <div className="w-full h-full bg-[#F9FAFB]">
        <PrestamosHeader
          tableTitle={productoTitulo}
          buttonTitle={productoSingular}
          className="p-4"
        />
        <div className="flex justify-center items-center bg-[#F9FAFB]">
          <NoDataGenericTemplate
            title={`No dispone de ningún ${productoSingular}`}
            buttonType="tertiary"
            description=" "
            image={noDirectLending}
            textButton={`Crear ${productoSingular}`}
            onClick={() => navigate('asistente')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div>
        <AlertFirma libradorId={libradorId} />
      </div>
      <div className="flex flex-col flex-1 h-[94%]">
        <div className="flex-1 p-4 h-1/2">
          <Table
            header={
              <PrestamosHeader
                tableTitle={productoTitulo}
                buttonTitle={productoSingular}
              />
            }
            initialQueryState={{
              ...initialQueryState,
              maxResult: 100,
              params: {
                libradorId,
                estados: TABLE_VALUES.DIRECT_LENDING,
                productos: productosDirectLending.PRESTAMO,
              },
            }}
            setSelected={setSelected}
            setShowResumen={setShowResumen}
            notifyNoData={setEmptyDirectLending}
          />
        </div>
        <div className="flex-1 p-4 h-1/2">
          <Table
            header={
              <TurboTableHeader title={`Historial ${productoSingular}`} />
            }
            initialQueryState={{
              ...initialQueryState,
              maxResult: 100,
              params: {
                libradorId,
                estados: TABLE_VALUES.HISTORIAL_DIRECT_LENDING,
                productos: productosDirectLending.PRESTAMO,
              },
            }}
            setSelected={setSelected}
            setShowResumen={setShowResumen}
            notifyNoData={setEmptyHistorialDirectLending}
          />
        </div>
      </div>
      {showResumen && (
        <Modal
          header={`${config.productoTituloSingular} ${selected.numero}`}
          open={showResumen}
          onClose={() => setShowResumen(false)}
          className="w-2/3 h-fit tablet:w-full mobile:w-full"
          contentClassName="p-0 m-0"
        >
          <ResumenDirectLending
            config={config}
            directLending={selected}
            libradorId={libradorId}
          />
        </Modal>
      )}
    </div>
  );
};

export default DirectLending;
