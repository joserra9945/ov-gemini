import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DocumentoEfectoService from 'utils/services/documento-efecto-service';

import notifications from '@shared/utils/notificationsOv';

import * as Actions from 'store/actions/actions-effect';

import ComponentByStep from './ComponentByStep';

const documentoEfectoService = new DocumentoEfectoService();

const SubirEfectos = ({ effectsState, onStepEffect, onSetStep }) => {
  const [currentFiles, setCurrentFiles] = useState([]);
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const filepondRef = useRef();

  const { efectoId, step, tipoEfecto, esFicticio, originEditionUrl } =
    effectsState;

  useEffect(() => {
    dispatch(Actions.resetPagareFormData());
  }, [dispatch, location]);

  const thirdButtonFunc = async (files) => {
    if (files.length === 0) {
      notifications.warning({
        body: 'Debes insertar un documento',
        title: '¡Cuidado!',
      });
      return;
    }

    const res = await documentoEfectoService.postDocumentoDeEfecto({
      efectoId,
      tipoDocumentoId: selectedOption,
      files,
    });

    if (res) {
      setSelectedOption(null);
      notifications.success();
      filepondRef.current.removeFile();
    }
  };

  const setOptionToFile = (value) => {
    setSelectedOption(value);
    setData({ tipoDocumentoId: value });
  };

  const changeStep = useCallback(
    (newStep) => {
      onSetStep({ currentStep: newStep, onBoard: true });
    },
    [onSetStep]
  );

  useEffect(() => {
    if (!originEditionUrl) {
      changeStep(0);
    }
  }, [originEditionUrl, changeStep]);

  return (
    <ComponentByStep
      step={step}
      typeOfDocument={tipoEfecto}
      anyadir={{
        id: efectoId,
        tipo: tipoEfecto,
        data,
        esFicticio,
        setData,
        setOptionToFile,
        selectedOption,
        setSelectedOption,
        thirdButtonFunc,
        filepondRef,
        currentFiles,
        setCurrentFiles,
      }}
    />
  );
};

export default SubirEfectos;
