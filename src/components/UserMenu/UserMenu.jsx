/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Divider } from 'primereact/divider';
import UsuarioExternoService from 'utils/services/usuario-externo-service';
import { faCheck } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import notifications from '@shared/utils/notificationsOv';
import { verificarPlataforma } from '@shared/utils/utilsOv';

import { Button } from '@shared/components/Legacy/Button';
import { Spinner } from '@shared/components/Legacy/Spinner';

import Overlay from 'components/Overlay';
import { onModifyCompany } from 'store/actions/actions-api';

import EmpresaService from '../../utils/services/empresa-externa-service';

import './UserMenu.scss';

const empresaExternaService = new EmpresaService();
const usuarioExternoService = new UsuarioExternoService();
const empresaService = new EmpresaService();

const UserMenu = ({ showCambiarEmpresa, setShowCambiarEmpresa }) => {
  const { token, userName, lastName, razonSocial } = useSelector(
    (store) => store.userState
  );
  const [isLoading, setIsLoading] = useState(false);
  const [empresaId, setEmpresaId] = useState('');
  const [listadoEmpresaNoActiva, setListadoEmpresaNoActiva] = useState([]);
  const [empresasInactivas, setEmpresasInactivas] = useState([]);
  const [empresaActiva, setEmpresaActiva] = useState([]);
  const [plataforma, setPlataforma] = useState();
  const dispatch = useDispatch();
  const ov = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const forceReload = () => {
    const destination = location.pathname;
    navigate({ pathname: '/empty' });
    navigate({ pathname: destination });
  };

  const fetchEmpresaActiva = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await empresaExternaService.getEmpresaByUsuarioActivo(token);

      const resListadoEmpresa = res?.items?.map((item) =>
        !item?.esActivaUsuario ? <p>{item.razonSocial}</p> : null
      );
      const empresasInactivas = res?.items?.filter(
        (item) => !item?.esActivaUsuario
      );
      const empresaActiva = res?.items?.filter((item) => item?.esActivaUsuario);

      setEmpresasInactivas(empresasInactivas);
      setListadoEmpresaNoActiva(resListadoEmpresa);
      setEmpresaActiva(empresaActiva);
      setPlataforma(empresaActiva[0]?.plataforma);
    } catch (e) {
      notifications.errorServidor({
        body: e?.response?.data?.errors?.toString(),
      });
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const putEmpresaActiva = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await usuarioExternoService.putUsuarioExternoEmpresa(
        empresaId
      );
      if (res) {
        notifications.success({
          body: 'La empresa activa ha cambiado correctamente',
          title: '¡Éxito!',
        });
        navigate('/');
        fetchEmpresaActiva();
      }
    } catch (e) {
      notifications.errorServidor({
        body: e?.response?.data?.errors?.toString(),
      });
    } finally {
      setIsLoading(false);
    }
  }, [empresaId, fetchEmpresaActiva, navigate]);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetchEmpresaActiva();
    if (!empresaId) {
      return;
    }
    putEmpresaActiva();
  }, [empresaId, fetchEmpresaActiva, putEmpresaActiva, token]);

  useEffect(() => {
    if (plataforma) {
      verificarPlataforma(plataforma);
    }
  }, [plataforma]);

  const asignEmpresa = async (empresa) => {
    const empresaData = await empresaService.getEmpresaByCif(empresa);
    dispatch(onModifyCompany(empresaData));
    navigate('/');
    forceReload();
  };
  empresaActiva?.cif && asignEmpresa().catch(console.error);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div
      ref={ov}
      className="notificaciones-wrapper multiempresa absolute right-0 top-16"
    >
      <Overlay
        setIsOpen={setShowCambiarEmpresa}
        header="Selecciona tu empresa"
        isOpen={showCambiarEmpresa}
        parentRef={ov}
        showCloseIcon
        className="notificaciones__overlay top-0 right-0"
        onClose={() => setShowCambiarEmpresa(false)}
      >
        <div className="user-header">
          <span className="g-RazonSocial activa">
            {razonSocial?.substring(0, 2) || ''}
          </span>
          <div>
            <div className="marginL5">{razonSocial || ''}</div>
            <div className="nombre-apellido">
              <span className="marginL5 grey-label">{userName || ''}</span>
              <span className="marginL5 grey-label">{lastName || ''}</span>
            </div>
          </div>
        </div>
        <Divider className="user-divider" />
        {listadoEmpresaNoActiva.length ? (
          <div className="container-de-empresas-render">
            <div className="title-empresa-activa h3">Empresas</div>
            <div className="empresa-activa-container-background">
              <div className="empresa-activa-container">
                {empresaActiva.map((empresa) => {
                  const empresaRazonSocialString = empresa.razonSocial
                    .toString()
                    .substring(0, 2);
                  return (
                    <>
                      <span className="g-RazonSocial">
                        {empresaRazonSocialString || ''}
                      </span>
                      <div className="empresa-activa-y-check">
                        <span className="empresa-activa">
                          {empresa.razonSocial || ''}
                        </span>
                        <div>
                          <FontAwesomeIcon
                            className="option-item__check"
                            icon={faCheck}
                            style={{ width: '1em' }}
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="lista-empresas">
              {empresasInactivas.map((empresa) => {
                const empresaRazonSocialString = empresa.razonSocial
                  .toString()
                  .substring(0, 2);
                return (
                  <div className="lista-razonSocial-y-logo">
                    <span className="g-RazonSocial">
                      {empresaRazonSocialString || ''}
                    </span>
                    <div className="lista-razonSocial">
                      <Button
                        link
                        type="submit"
                        onClick={() => {
                          setEmpresaId(empresa?.id);
                          asignEmpresa(empresa?.cif);
                        }}
                        label={empresa?.razonSocial}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </Overlay>
    </div>
  );
};
export default UserMenu;
