import { MouseEvent, useMemo } from 'react';

import { GenericButton } from '@shared/components/GenericButton';
import { Modal } from '@shared/components/Modal';
import { DocRequerida } from '@shared/modules/DocRequerida';

import { stepForm, stepTitulo } from './Constants/steps';
import useMultiStepForm from './hook/useMultiStepForm';
import CesionesDirectLendingForm from './Steps/Cesiones/CesionesDirectLending';
import NewDirectLendingContext from './Steps/context/NewDirectLendingContext';
import { CuentaBancaria } from './Steps/CuentaBancaria';
import { Firmantes } from './Steps/Firmantes';
import { NuevoDirectLendingForm } from './Steps/NuevoDirectLendingForm';
import { Resumen } from './Steps/Resumen';
import { ButtonMultiStep } from './ButtonMultiStep';
import ModalButtons from './ModalButtons';

const MultiStepForm = () => {
  const {
    error,
    changeStep,
    step,
    config,
    handleClick,
    handleClickNext,
    handleClickPrev,
    setDirectLendingData,
    setHandleNext,
    loading,
    directLendingData,
    handleNext,
    setError,
    navigate,
    isOpen,
    toggleModal,
    closeModal,
    esResumen,
  } = useMultiStepForm();

  const contextValues = useMemo(
    () => ({
      directLendingData,
      setDirectLendingData,
      handleNext,
      setHandleNext,
      error,
      setError,
    }),
    [
      directLendingData,
      setDirectLendingData,
      handleNext,
      setHandleNext,
      error,
      setError,
    ]
  );

  const title = config.productoSingular?.toString();

  const { titulo, description } = stepTitulo(step, title);

  const renderStep = () => {
    switch (step) {
      case stepForm.DIRECT_LENDING:
        return <NuevoDirectLendingForm callBack={changeStep} />;
      case stepForm.CESIONES:
        return <CesionesDirectLendingForm />;
      case stepForm.FIRMANTES:
        return <Firmantes />;
      case stepForm.CUENTA_BANCARIA:
        return <CuentaBancaria />;
      case stepForm.RESUMEN:
        return <Resumen />;
      case stepForm.DOC_REQUERIDA:
        return <DocRequerida />;
      default:
        return <h1>Ha ocurrido algún error inesperado</h1>;
    }
  };

  return (
    <NewDirectLendingContext.Provider value={contextValues}>
      <div className="bg-background w-full h-full flex flex-col ">
        <div className="flex h-16 p-4">
          <GenericButton buttonType="none" onClick={() => toggleModal()}>
            <img
              className="px-2"
              alt="Logo de aplicación"
              src={process.env.REACT_APP_LOGO}
            />
          </GenericButton>
        </div>
        <div className="flex w-full h-full justify-center tablet:pb-4 mobile:pb-4">
          <div
            className="flex flex-col w-2/4 h-[90vh]
            tablet:w-full tablet:px-10  mobile:w-full mobile:px-10 "
          >
            <div className="h-full max-h-full flex flex-col">
              <div className="shrink">
                <div className="flex w-full py-2 justify-between">
                  <p className="font-roboto text-lg font-normal leading-5">{`Nuevo ${config.productoSingular}`}</p>
                  <p className="font-roboto text-lg font-normal leading-5">{`Paso ${
                    step + 1
                  }/${Object.keys(stepForm).length / 2}`}</p>
                </div>
                {step === stepForm.DOC_REQUERIDA ? (
                  <div className="mb-4" />
                ) : (
                  <div className="flex flex-col gap-2 mb-4 pt-4">
                    <p className="font-roboto text-xl font-normal leading-5">
                      <b>{titulo}</b>
                    </p>
                    <p
                      className={`${
                        error
                          ? 'text-danger'
                          : 'font-roboto text-lg font-normal leading-5 pt-4'
                      }`}
                    >
                      {description}
                    </p>
                  </div>
                )}
              </div>
              <div className="grow overflow-auto">{renderStep()}</div>
              <div className="shrink w-full flex flex-row-reverse self-end">
                <ButtonMultiStep
                  handleClickPrev={
                    step === stepForm.DOC_REQUERIDA
                      ? undefined
                      : handleClickPrev
                  }
                  handleClickNext={handleClickNext}
                  isLoading={loading}
                  labelNext={
                    step === stepForm.DOC_REQUERIDA
                      ? 'Finalizar'
                      : step === stepForm.RESUMEN
                      ? 'Confirmar'
                      : 'Siguiente'
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <Modal
          open={isOpen}
          onClose={closeModal}
          closable={false}
          contentClassName="py-6 gap-6 rounded-lg"
        >
          <ModalButtons
            closeModal={closeModal}
            lastOption={esResumen}
            nextClick={handleClick}
          />
        </Modal>
      </div>
    </NewDirectLendingContext.Provider>
  );
};

export default MultiStepForm;
