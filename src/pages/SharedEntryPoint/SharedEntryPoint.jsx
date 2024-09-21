import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import EmpresaService from 'utils/services/empresa-externa-service';
import UsuarioService from 'utils/services/usuario-service';

import { TokenReceiver } from '@shared/components/Legacy/TokenManager';

import useRedirect from 'hooks/useRedirect';

import './style.scss';

const userService = new UsuarioService();
const empresaService = new EmpresaService();
const product = 'Oficina Virtual';

const SharedEntryPoint = ({
  setLoginData,
  onModifyCompany,
  setLoginAccounts,
}) => {
  const navigate = useNavigate();
  const { handleSharedEntryError, authError } = useRedirect();
  const [comesFromVuzoon] = useState(true);
  const messageReceived = useRef(false);

  const asignLibrador = async (nif) => {
    try {
      const companyData = await empresaService.getEmpresaByCif(nif);
      await onModifyCompany(companyData);
      navigate('/');
    } catch {
      handleSharedEntryError('#OPS_ETLI1');
    }
  };

  const handleAccessFromERP = async (data) => {
    try {
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
      }
    } catch {
      handleSharedEntryError('#OPS_ETLI0');
    }
  };

  const handleAccessFromAccounts = async (data) => {
    try {
      await setLoginAccounts({
        userInfo: data.accountsData,
        isInterno: !!data.accountsData.department,
        navigate,
        onError: handleSharedEntryError,
      });
    } catch {
      handleSharedEntryError('#OPS_ETLD1');
    }
  };

  const handleMessage = async (e) => {
    try {
      const data = e?.data?.value;
      if (data && Object.keys(data || {}).length && !messageReceived.current) {
        messageReceived.current = true;
        const handleAccess = data.empresaNif
          ? handleAccessFromERP
          : handleAccessFromAccounts;
        await handleAccess(data);
      } else if (data && !Object.keys(data || {}).length) {
        handleSharedEntryError('#OPS_ETLD3');
      }
    } catch {
      handleSharedEntryError('#OPS_ETLD0');
    }
  };

  return (
    <div className="absolute">
      <TokenReceiver
        handleMessage={handleMessage}
        originUrl={process.env.REACT_APP_ACCOUNTS}
      />
      {!authError && (
        <div className="text-center spinner w-screen h-screen">
          <ProgressSpinner />
        </div>
      )}
    </div>
  );
};

export default SharedEntryPoint;
