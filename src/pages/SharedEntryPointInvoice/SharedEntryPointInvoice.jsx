import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmpresaService from 'utils/services/empresa-externa-service';
import UsuarioService from 'utils/services/usuario-service';

import { oficinaVirtualHub } from '@shared/utils/constants';
import notifications from '@shared/utils/notifications';

import { TokenReceiver } from '@shared/components/Legacy/TokenManager';

import useRedirect from 'hooks/useRedirect';
import { createSignalInstace } from 'components/signalr/createSignalInstace';
import { setCurrentStep } from 'store/actions/actions-stepper';

import { ReactComponent as Icon } from './Scanner.svg';

import './sharedEntryPointInvoice.scss';

const userService = new UsuarioService();
const empresaService = new EmpresaService();

const product = 'Oficina Virtual';

const SharedEntryPointInvoice = ({ setLoginData, onModifyCompany }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSharedEntryError, authError } = useRedirect();
  const [ovHub, setOvHub] = useState(null);
  const [signalRNotifications, setSignalRNotifications] = useState(null);
  const [comesFromVuzoon] = useState(true);
  const messageReceived = useRef(false);

  const asignLibrador = async (nif) => {
    try {
      const companyData = await empresaService.getEmpresaByCif(nif);
      await onModifyCompany(companyData);
    } catch (err) {
      notifications.unknownError(err);
      throw new Error(err);
    }
  };

  const initializedSignal = async () => {
    try {
      if (!ovHub) {
        const conn = createSignalInstace(
          `
          ${process.env.REACT_APP_API_URL}${oficinaVirtualHub}`,
          '',
          sessionStorage.getItem('token')
        );
        conn.start();
        setOvHub(conn);
      }
    } catch (err) {
      notifications.unknownError(err);
      throw new Error(err);
    }
  };
  useEffect(() => {
    if (ovHub) {
      ovHub.on('FacturasInsertadas', (message) => {
        if (message.hasFailed) {
          notifications.errorServidor(
            `Ha fallado la importación de facturas . ${message.error}`
          );
          navigate(0);
        } else {
          setSignalRNotifications(conn);
        }
      });
      /* @jotebor
       *  Se redirige al usuario a portada al realizar la conexión ovHub != null,
       *  esto es debido a que recibimos el evento FacturasInsertadas
       *  por parte del back antes de tener la conexión lista.
       *  Lo que vamos a hacer es trasladar la recepción de este evento
       *  al ERP y ellos que hagan el redirect a nuestra página cuando
       *  este ya haya sucedido.
       *  navigate('/');
       */
    }
  }, [navigate, ovHub]);
  const handleMessage = async (e) => {
    try {
      const data = e.data?.value;
      if (data && Object.keys(data || {}).length && !messageReceived.current) {
        const res = await userService.refreshToken(
          data.token,
          product,
          data.refreshToken
        );

        if (res) {
          const { accessToken, refreshToken, email, userId } = res.data || {};
          await setLoginData({
            userId,
            userName: data.firstName,
            email,
            accessToken,
            refreshToken,
            comesFromVuzoon,
          });

          await asignLibrador(data.empresaNif);

          if (!ovHub) {
            await initializedSignal();
          }
          navigate('/');
        }
      } else if (data && !Object.keys(data || {}).length) {
        handleSharedEntryError('#OPS_ETINV_1');
      }
    } catch {
      handleSharedEntryError('#OPS_ETINV_0');
    }
  };

  useEffect(() => {
    if (signalRNotifications) {
      dispatch(setCurrentStep({ currentStep: 1, onBoard: true }));
      navigate('/');
    }
    return () => ovHub?.stop();
  }, [signalRNotifications, navigate, dispatch, ovHub]);

  return (
    <div className="m-0 vh-100 row justify-content-center align-items-center">
      <TokenReceiver
        handleMessage={handleMessage}
        originUrl={process.env.REACT_APP_ACCOUNTS}
      />
      {!authError && (
        <div className="col-auto text-center import__container">
          <div className="mb-3">
            <Icon />
          </div>
          <h2 className="import__title">Importando facturas</h2>
          <p className="import__text">Estamos importando sus facturas</p>
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: '100%' }}
              aria-label="Barra de progeso"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedEntryPointInvoice;
