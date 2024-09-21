import { useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { faSignature } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DirectLending from '@shared/assets/directLending.svg';
import { GenericButton } from '@shared/components/GenericButton';
import { Item } from '@shared/components/GenericListItems/Item';
import { Modal } from '@shared/components/Modal';
import { Spinner } from '@shared/components/Spinner';
import { useRepresentante } from '@shared/hooks';
import { IPersona } from '@shared/interfaces/IPersona';
import { IRepresentanteGetByEmpresaId } from '@shared/interfaces/IRepresentante';
import NuevoContacto from '@shared/modules/NuevoContacto';
import {
  EstadoRepresentanteCargoTemplate,
  NoDataGenericTemplate,
} from '@shared/templates';
import { initialQueryState } from '@shared/utils/constants';

import { IUserReducer } from 'pages/DirectLending/constants/IUserStateReducer';

import useMultiStepForm from '../../hook/useMultiStepForm';
import NewDirectLendingContext from '../context/NewDirectLendingContext';

const Firmantes = () => {
  const { representanteByEmpresaIdGet, loading } = useRepresentante();
  const { setDirectLendingData, directLendingData, error, setError } =
    useContext(NewDirectLendingContext);
  const { config } = useMultiStepForm();
  const { libradorId } = useSelector((state: IUserReducer) => state.userState);

  const [representantes, setRepresentantes] = useState<
    IRepresentanteGetByEmpresaId[]
  >([]);

  const [selectedRepresentantes, setSelectedRepresentantes] = useState<
    IRepresentanteGetByEmpresaId[]
  >(directLendingData?.firmantes || []);

  const [openModal, setOpenModal] = useState(false);
  const [initDone, setInitDone] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await representanteByEmpresaIdGet(
        {
          ...initialQueryState,
          maxResult: 100,
          params: `&libradorId=${libradorId}`,
        },
        libradorId
      );
      res && setRepresentantes(res?.items || []);
    } finally {
      setInitDone(true);
    }
  }, [libradorId, representanteByEmpresaIdGet]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const areRepresentantesEqual = (
    rep1: IRepresentanteGetByEmpresaId,
    rep2: IRepresentanteGetByEmpresaId
  ): boolean => {
    return rep1.id === rep2.id;
  };
  const handleDivClick = (representante: IRepresentanteGetByEmpresaId) => {
    const newSelectedRepresentantes = [...selectedRepresentantes];

    if (
      selectedRepresentantes.some((rep) =>
        areRepresentantesEqual(rep, representante)
      )
    ) {
      const indexToRemove = newSelectedRepresentantes.findIndex((rep) =>
        areRepresentantesEqual(rep, representante)
      );
      newSelectedRepresentantes.splice(indexToRemove, 1);
    } else {
      newSelectedRepresentantes.push(representante);
    }
    setSelectedRepresentantes(newSelectedRepresentantes);
  };

  useEffect(() => {
    setDirectLendingData((prevDirectLendingData) => ({
      ...prevDirectLendingData,
      firmantes: selectedRepresentantes,
    }));
    setError(false);
  }, [selectedRepresentantes, setDirectLendingData, setError]);

  if (loading) return <Spinner className="flex justify-center" />;

  return (
    <>
      {initDone && !representantes.length ? (
        <div className="flex justify-center">
          <NoDataGenericTemplate
            buttonType="tertiary"
            textButton="Añadir firmante"
            image={DirectLending}
            title="No dispone de ningún firmante"
            description={`Para poder generar un ${config.productoTituloSingular} deberá de añadir al menos un firmante`}
            onClick={() => setOpenModal(true)}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2 max-h-full">
          <div className=" overflow-auto flex flex-col gap-3">
            {representantes.map((representante, index) => (
              <Item
                className={`p-3 border-1 ${
                  selectedRepresentantes.some((rep) =>
                    areRepresentantesEqual(rep, representante)
                  )
                    ? 'border-success'
                    : ''
                }`}
                key={nanoid()}
                onClick={() => handleDivClick(representante)}
              >
                <div className="flex flex-row w-full items-center justify-between grid grid-cols-3">
                  <div className="col-span-2">
                    <span className="mobile:flex">
                      <span className="mobile:hidden pr-4">
                        <FontAwesomeIcon icon={faSignature} />
                      </span>
                      <span className="">
                        {`${representante.persona.nombre} ${representante.persona.apellidos}`}
                      </span>
                    </span>
                    <span className="mobile:hidden mx-1">-</span>
                    <span>
                      <span className="text-gray-500">
                        {`${representante.cargo.description}`}
                      </span>
                    </span>
                  </div>
                  <div className="flex col-span-1 justify-end">
                    <div className="align-end">
                      <EstadoRepresentanteCargoTemplate
                        estado={representante.estadoCargo}
                      />
                    </div>
                  </div>
                </div>
              </Item>
            ))}
          </div>
          <div className="flex flex-row justify-between pt-4">
            <GenericButton
              buttonType="none"
              className="text-info "
              label=" Crear nuevo firmante"
              onClick={() => setOpenModal(true)}
            />
            {error && <p className="text-danger">Seleccione un firmante*</p>}
          </div>
        </div>
      )}

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        header="Nuevo firmante"
        className="mobile:h-full h-max-full"
        contentClassName="mobile:h-full mobile:flex mobile:flex-col mobile:overflow-hidden"
      >
        <NuevoContacto
          comeFromDirectLending
          esRepresentanteByProps
          libradorId={libradorId}
          personaAEditar={{} as IPersona}
          setIsOpen={setOpenModal}
          closeModal={() => {
            fetchData();
            setOpenModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default Firmantes;
