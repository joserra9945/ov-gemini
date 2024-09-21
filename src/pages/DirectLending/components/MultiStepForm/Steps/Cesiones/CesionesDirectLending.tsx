import { useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import DirectLending from '@shared/assets/directLending.svg';
import { GenericButton } from '@shared/components/GenericButton';
import { Item } from '@shared/components/GenericListItems/Item';
import { Modal } from '@shared/components/Modal';
import { Spinner } from '@shared/components/Spinner';
import { useCesion } from '@shared/hooks';
import { ICesionByFiltersGet } from '@shared/interfaces/api/ICesion';
import CesionesForm from '@shared/modules/CesionesForm/CesionesForm';
import { NoDataGenericTemplate } from '@shared/templates';
import { initialQueryState } from '@shared/utils/constants';
import { formatCurrency } from '@shared/utils/formatters';

import { IUserReducer } from 'pages/DirectLending/constants/IUserStateReducer';

import useMultiStepForm from '../../hook/useMultiStepForm';
import NewDirectLendingContext from '../context/NewDirectLendingContext';

const CesionesDirectLendingForm = () => {
  const { cesionByFiltersGet, loading } = useCesion();
  const { config } = useMultiStepForm();
  const { setDirectLendingData, error } = useContext(NewDirectLendingContext);
  const { isAdUser, libradorId } = useSelector(
    (state: IUserReducer) => state.userState
  );

  const [cesiones, setCesiones] = useState<ICesionByFiltersGet[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [initDone, setInitDone] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await cesionByFiltersGet({
        ...initialQueryState,
        maxResult: 100,
        params: `&LibradorId=${libradorId}`,
      });
      res && setCesiones(res?.items || []);

      res &&
        setDirectLendingData((prevDirectLendingData) => ({
          ...prevDirectLendingData,
          cesiones: res.items,
        }));
    } finally {
      setInitDone(true);
    }
  }, [cesionByFiltersGet, libradorId, setDirectLendingData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Spinner className="flex justify-center" />;
  return (
    <>
      {initDone && !cesiones.length ? (
        <div className="flex justify-center">
          <NoDataGenericTemplate
            buttonType="tertiary"
            textButton="Crear cesión"
            image={DirectLending}
            title="No dispone de ninguna cesión"
            description={`Para poder generar un ${config.productoTituloSingular} deberá de añadir al menos una cesión`}
            onClick={() => setOpenModal(true)}
          />
        </div>
      ) : (
        <div className="flex flex-col max-h-full">
          <div className="flex gap-4 p-2 justify-between mobile:hidden">
            <span>Razón social</span>
            <span className="mobile:hidden">Tipo</span>
            <span>Importe</span>
          </div>

          <div className=" overflow-auto flex flex-col gap-2 mobile:w-full ">
            {cesiones.map((cesion) => (
              <Item
                className="p-2 border-1 border-success items-stretch mobile:grid mobile:grid-cols-1 mobile:justify-between mobile:w-[95%] mobile:px-4"
                key={nanoid()}
              >
                <>
                  <div className="w-1/2 mobile:w-full mobile:grid-cols-12">
                    <span className="mobile:font-roboto mobile:text-base mobile:font-medium mobile:leading-[18.75px]">
                      {cesion.librado.razonSocial}
                    </span>
                  </div>
                  <div className="flex flex-row w-1/2 mobile:w-full justify-between">
                    <div className="mobile:w-full">
                      {cesion.tipo.description}
                    </div>
                    <div className=" mobile:w-full mobile:text-end">
                      {formatCurrency(cesion.importe)}
                    </div>
                  </div>
                </>
              </Item>
            ))}
            <div className="flex flex-row justify-between pt-4">
              <GenericButton
                buttonType="none"
                label="Crear nueva cesión"
                className="text-info"
                onClick={() => setOpenModal(true)}
              />
              {error && <p className="text-danger">Cree almenos una cesión</p>}
            </div>
          </div>
        </div>
      )}

      <Modal
        open={openModal}
        closable={false}
        onClose={() => setOpenModal(false)}
        contentClassName="p-0 mobile:overflow-hidden"
        className="p-0"
      >
        <CesionesForm
          libradorId={libradorId}
          isAdUser={isAdUser}
          standAlone
          callBack={() => {
            setOpenModal(false);
            fetchData();
          }}
        />
      </Modal>
    </>
  );
};

export default CesionesDirectLendingForm;
