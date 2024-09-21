import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import EfectosService from 'utils/services/efectos-service';

import { setCurrentEffect } from 'store/actions/actions-effect';

const efectosService = new EfectosService();

const EntryPoint = ({ logged, error, setLoginData }) => {
  const [efectoId, setEfectoId] = useState();
  const { userId, formType, firstName, email } = useParams();
  const [noResponse, setNoResponse] = useState(false);
  const { search } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      const query = new URLSearchParams(search);
      const token = query.get('token');
      const expiresIn = query.get('expiresIn');
      const refreshToken = query.get('refreshToken');
      setLoginData({
        userId,
        userName: firstName,
        email,
        accessToken: {
          token,
          expiresIn,
        },
        refreshToken,
      });
    }
  }, [userId, firstName, email, search, setLoginData]);

  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    if (logged) {
      const fetchEfectos = async () => {
        try {
          const res = await efectosService.getEfectosPedientesByEmpresaActiva(
            true
          );
          if (Array.isArray(res?.items) && res?.items?.length) {
            const fisrtEffectFictitious = res.items.find(
              (effect) => effect.esFicticio
            );
            dispatch(
              setCurrentEffect({
                step: 1,
                tipoEfecto: parseInt(fisrtEffectFictitious?.tipo?.id, 10),
                efectos: [],
              })
            );
            setEfectoId(fisrtEffectFictitious?.id);
          }
        } catch {
          setNoResponse(true);
        }
      };
      fetchEfectos();
    }
  }, [dispatch, logged, setNoResponse]);

  if (logged && formType) {
    dispatch(
      setCurrentEffect({
        step: 1,
        tipoEfecto: parseInt(formType, 10),
        efectos: [],
      })
    );
    return <Navigate to="/subir-efectos" />;
  }

  if (noResponse) return <Navigate to="/" />;
  return null;
};

export default EntryPoint;
