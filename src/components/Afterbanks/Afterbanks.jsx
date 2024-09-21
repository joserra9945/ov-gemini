import { createRef, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Iframe from 'react-iframe';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CuentaService from 'utils/services/cuenta-service';
import { faExclamationCircle } from '@fortawesome/pro-light-svg-icons';

import {
  apiEnvironment,
  estadoCuentaBancariaEnum,
} from '@shared/utils/constants';

import { Button } from '@shared/components/Legacy/Button';

import Messages from 'components/Messages/Messages';
import { getDocumentosPendientesLibrador } from 'store/actions/actions-api';

import Fields from './Fields';

import './styles.scss';

const cuentaService = new CuentaService();
const MySwal = withReactContent(Swal);

const Afterbanks = ({
  cancelar,
  cif,
  disabledButton = false,
  iban = false,
  libradorId,
  onNextStep,
  razonSocial,
}) => {
  const ref = createRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [campos, setCampos] = useState({ iban: null });
  const [isDisabled, setIsDisabled] = useState(false);
  const [swalWarning, setSwalWarning] = useState(false);
  const [urlIframe, setUrlIframe] = useState(null);
  const [validado, setValidado] = useState(null);
  const [verificando, setVerificando] = useState(false);
  const rhForm = useForm({ mode: 'onChange' });
  const { formState, handleSubmit } = rhForm;

  const handleNextStep = useCallback(() => {
    dispatch(
      getDocumentosPendientesLibrador(
        libradorId || sessionStorage.getItem('libradorId')
      )
    );

    if (onNextStep) {
      onNextStep();
      setValidado(null);
    } else if (location.state?.fromCuentas) {
      navigate('/cuentas');
    } else {
      navigate('/');
    }
  }, [dispatch, libradorId, onNextStep, location.state?.fromCuentas, navigate]);

  const handleCancelar = useCallback(() => {
    if (location.state?.fromCuentas) {
      navigate('/cuentas');
    } else {
      cancelar();
    }
  }, [cancelar, location.state?.fromCuentas, navigate]);

  useEffect(() => {
    if (location.state?.iban || iban) {
      const newIban = location.state?.iban || iban;
      setCampos({ iban: newIban });
      setVerificando(true);
    }
  }, [iban, location.state]);

  useEffect(() => {
    const showSuccessSwal = () => {
      const title = 'Éxito!';
      const text = swalWarning
        ? 'Se ha creado su cuenta correctamente, <b>recuerde que tendrá que validarla después</b>.'
        : 'Su cuenta se ha validado correctamente';

      MySwal.fire({
        title,
        html: `<p>${text}</p>`,
        icon: swalWarning ? 'warning' : 'success',
        customClass: {
          container: 'swal2-container-position-afterbanks',
        },
        target: ref.current,
        confirmButtonAriaLabel: 'okCuentaAfterbanks',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          handleNextStep();
        }
      });
    };

    const showErrorSwal = () => {
      MySwal.fire({
        title: 'Error!',
        text: 'Ha fallado la validación de la cuenta',
        icon: 'error',
        customClass: {
          container: 'swal2-container-position-afterbanks',
        },
        allowOutsideClick: false,
        target: ref.current,
      }).then(() => {
        if (location.state?.fromCuentas) {
          navigate('/cuentas');
        } else if (location.state?.iban) {
          navigate('/');
        } else {
          setValidado(null);
          setCampos({ iban: '' });
        }
      });
    };

    if (validado) {
      showSuccessSwal();
    } else if (validado === false) {
      showErrorSwal();
    }
  }, [validado, ref, handleNextStep, swalWarning, location.state, navigate]);

  const checkIfBankAccountExists = useCallback(
    async (_campos) => {
      const cuentas = await cuentaService.getCuentaByEmpresaId(libradorId);

      const foundCuenta = cuentas?.items?.find(
        (cuenta) =>
          cuenta.iban.completo.toUpperCase() === _campos?.iban.toUpperCase() &&
          cuenta?.estado?.id === estadoCuentaBancariaEnum.VALIDADA
      );

      setValidado(foundCuenta !== undefined);
    },
    [libradorId]
  );

  useEffect(() => {
    const handler = (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (error) {
        data = event.data;
      }

      if (data.OK === '1') {
        checkIfBankAccountExists(campos);
      } else if (data.OK === '0') {
        setValidado(false);
      }
    };

    window.addEventListener('message', handler);
    return () => {
      window.removeEventListener('message', handler);
    };
  }, [campos, checkIfBankAccountExists]);

  const getAfterbanksUrl = useCallback(
    (environment) => {
      return `${process.env.REACT_APP_AFTERBANKS}?${
        environment ? `dev=${environment}` : ''
      }&nombre_titular=${razonSocial}&nif_titular=${cif}&empresaId=${libradorId}&domain=${
        window.location.hostname
      }${campos?.iban ? `&iban=${campos.iban}` : ''}${
        verificando ? `&verify=1` : ''
      }`;
    },
    [razonSocial, cif, libradorId, campos.iban, verificando]
  );

  const assignURL = useCallback(() => {
    const data = formState.isValid || verificando ? campos : {};

    const environmentMap = {
      [apiEnvironment.STAGING]: 'staging',
      [apiEnvironment.TEST]: 'test',
      default: null,
    };

    const environment =
      environmentMap[process.env.REACT_APP_API_ENV] || environmentMap.default;
    setUrlIframe(getAfterbanksUrl(environment, data));
  }, [getAfterbanksUrl, campos, formState, verificando]);

  const onSubmit = () => {};

  useEffect(() => {
    assignURL();
  }, [formState.isValid, assignURL]);

  const onSubmitManual = async () => {
    dispatch(
      getDocumentosPendientesLibrador(
        libradorId || sessionStorage.getItem('libradorId')
      )
    );

    setIsDisabled(true);

    try {
      const res = await cuentaService.postCuenta(campos);

      if (res) {
        if (res.errors) {
          setValidado(false);
        } else {
          setSwalWarning(true);
          setValidado(true);
        }
      }
    } catch (error) {
      notifications.errorServidor();
    } finally {
      setIsDisabled(false);
      cancelar();
    }
  };

  const onLoadIframeAfterbanks = () => {
    document
      .getElementById('iframe-afterbanks')
      .setAttribute('data-hj-allow-iframe', true);
  };

  return (
    <>
      {verificando && (location?.state?.iban || iban)
        ? ''
        : campos && (
            <div className="search-form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Fields
                  data={campos}
                  setData={setCampos}
                  rhForm={rhForm}
                  assignURL={assignURL}
                />
              </form>
            </div>
          )}
      <Messages
        icon={faExclamationCircle}
        message={
          verificando
            ? 'Selecciona tu banco y valida la cuenta para poder continuar.'
            : 'Si continúa sin validar la cuenta bancaria tendrá que validarla posteriormente'
        }
        severity="info"
      />
      <div
        className={`h-[64%] overflow-hidden mt-15 ${
          !formState.isValid && !verificando
            ? 'opacity-50 pointer-events-none'
            : ''
        }`}
      >
        <Iframe
          url={urlIframe}
          width="100%"
          height="100%"
          id="iframe-afterbanks"
          className="iframe-afterbanks"
          display="initial"
          position="relative"
          onLoad={() => {
            onLoadIframeAfterbanks();
          }}
        />
      </div>
      <div className="flex space-x-2 justify-end mt-4">
        <Button label="Cancelar" color="light" onClick={handleCancelar} />
        <Button
          id="submitAfterBanks"
          label="Añadir cuenta"
          disabled={
            !formState.isValid || verificando || isDisabled || disabledButton
          }
          onClick={() => {
            if (campos?.iban) {
              onSubmitManual();
            } else {
              handleNextStep();
            }
          }}
        />
      </div>
    </>
  );
};

export default Afterbanks;
