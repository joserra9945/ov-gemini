// reducer snippet

import * as Sentry from '@sentry/browser';

import { tipoDireccionEnum } from '@shared/utils/constants';
import { verificarPlataforma } from '@shared/utils/utilsOv';

const initialState = {
  fetching: false,
  identityId: null,
  token: sessionStorage.getItem('token'),
  logged: !!sessionStorage.getItem('token'),
  error: null,
  userName: sessionStorage.getItem('userName'),
  lastName: sessionStorage.getItem('lastName'),
  userEmail: null,
  refreshToken: sessionStorage.getItem('r')
    ? sessionStorage.getItem('r')
    : null,
  libradorId: sessionStorage.getItem('libradorId'),
  formaJuridicaId: sessionStorage.getItem('formaJuridicaId'),
  provinciaId: sessionStorage.getItem('provinciaId') || null,
  cif: null,
  validada: null,
  razonSocial: null,
  isAdUser: null,
  gestor: null,
};

const userReducer = (state = initialState, action) => {
  let direccionSocial;
  switch (action.type) {
    case 'LOGOUT':
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('libradorId');
      sessionStorage.removeItem('provinciaId');
      sessionStorage.removeItem('isAdUser');
      sessionStorage.removeItem('formaJuridicaId');
      sessionStorage.removeItem('esPublica');
      Sentry.setUser(null);
      return {
        ...state,
        token: null,
        refreshToken: null,
        logged: false,
        id: null,
        name: null,
        libradorId: null,
        provinciaId: null,
        cif: null,
        validada: null,
        razonSocial: null,
        isAdUser: null,
        esPublica: null,
      };
    case 'LOGIN_REQUEST':
      return {
        ...state,
        fetching: true,
        error: null,
        token: null,
        logged: null,
      };
    case 'LOGIN_SUCCESS':
      if (action.payload?.direcciones) {
        direccionSocial = action.payload?.direcciones?.find(
          (direccion) =>
            direccion?.tipoDireccion?.id === tipoDireccionEnum.SOCIAL
        );
        sessionStorage.setItem(
          'provinciaId',
          direccionSocial?.provinciaId || null
        );
      }
      const now = new Date();
      now.setSeconds(action.payload.expiresIn);
      sessionStorage.setItem('expire', now);
      sessionStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('refreshToken', action.payload.refreshToken);
      sessionStorage.setItem('r', action.payload.refreshToken);
      sessionStorage.setItem('userName', action.payload.userName);
      sessionStorage.setItem('lastName', action.payload.lastName);
      sessionStorage.setItem('libradorId', action.payload.libradorId);
      sessionStorage.setItem('formaJuridicaId', action.payload.formaJuridicaId);
      sessionStorage.setItem('esPublica', action.payload.esPublica);
      Sentry.setUser({
        id: action.payload?.userId,
        email: action.payload?.email,
      });
      return {
        ...state,
        fetching: false,
        error: null,
        logged: true,
        identityId: action.payload.identityId,
        refreshToken: action.payload.refreshToken,
        token: action.payload.token,
        userName: action.payload.userName,
        lastName: action.payload.lastName,
        userEmail: action.payload.userEmail,
        libradorId: action.payload.libradorId,
        formaJuridicaId: action.payload.formaJuridicaId,
        provinciaId: action.payload.provinciaId,
        cif: action.payload.cif,
        gestor: action.payload.gestor,
        validada: action.payload.validada,
        razonSocial: action.payload.razonSocial,
        isAdUser: action.payload.isAdUser,
        userId: action.payload.userId,
        emailConfirmed: action.payload.emailConfirmed,
        esPublica: action.payload.esPublica,
      };
    case 'PUT_EMAIL_CONFIRMED':
      return {
        ...state,
        emailConfirmed: action.payload.emailConfirmed,
      };
    case 'REFRESH_TOKEN_SUCCESS':
      const newNow = new Date();
      newNow.setSeconds(action.payload.expiresIn);
      sessionStorage.setItem('expire', newNow);
      sessionStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('r', action.payload.refreshToken);
      return {
        ...state,
        fetching: false,
        error: null,
        logged: true,
        refreshToken: action.payload.refreshToken,
        token: action.payload.token,
      };
    case 'MODIFY_COMPANY':
      if (state.isAdUser) {
        verificarPlataforma(action.payload.plataforma, state.isAdUser);
      }
      if (action.payload?.direcciones) {
        direccionSocial = action.payload?.direcciones?.find(
          (direccion) =>
            direccion?.tipoDireccion?.id === tipoDireccionEnum.SOCIAL
        );
      }
      sessionStorage.setItem('libradorId', action.payload.id);
      sessionStorage.setItem(
        'formaJuridicaId',
        action?.payload?.tipoSociedad?.id || action?.payload?.tipoSociedad
      );
      sessionStorage.setItem(
        'provinciaId',
        direccionSocial?.provinciaId || null
      );
      return {
        ...state,
        logged: true,
        libradorId: action.payload.id,
        cif: action.payload.cif,
        validada: action.payload.validada,
        razonSocial: action.payload.razonSocial,
        identityId: action.payload.identityId,
        esPublica: action.payload.esPublica,
        plataforma: action.payload.plataforma,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        fetching: false,
        logged: false,
        token: null,
        refreshToken: null,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default userReducer;
