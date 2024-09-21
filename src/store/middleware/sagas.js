import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { API_GENERIC_GATEWAY } from '@shared/utils/constants';
import notifications from '@shared/utils/notificationsOv';

import { getDocumentosPendientesLibrador } from 'store/actions/actions-api';

import authApi from '../../utils/services/config/axios.config';
import { toggleLayoutWidth } from '../actions/actions-layout';

function fetch(request) {
  return () => {
    return axios(request);
  };
}

function authFetch(request) {
  return () => {
    return authApi.request(request);
  };
}

function* getEmpresaByUsuarioId(id, token) {
  const request = {
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}${API_GENERIC_GATEWAY}/EmpresaExterna/activa`,
    headers: { Authorization: `Bearer ${token}` },
  };
  return yield call(authFetch(request));
}

export function* loginWorkerSaga(action) {
  try {
    const response = yield call(authFetch(action.payload.request));
    let responseLib;
    const userInfo = response?.data;
    if (!userInfo?.department) {
      responseLib = yield getEmpresaByUsuarioId(
        userInfo?.userId,
        userInfo?.accessToken.token
      );
      if (responseLib?.data?.result) {
        responseLib = responseLib?.data.result;
      } else {
        responseLib = responseLib?.data;
      }
      yield put(getDocumentosPendientesLibrador(responseLib?.id));
    }

    yield put({
      type: action.payload.request.okAction,
      payload: {
        userId: userInfo?.userId,
        identityId: userInfo?.id,
        userName: userInfo?.firstName || userInfo?.userName,
        lastName: userInfo?.lastName,
        userEmail: userInfo?.email,
        token: userInfo?.accessToken.token,
        refreshToken: userInfo?.refreshToken,
        expiresIn: userInfo?.accessToken.expiresIn,
        isAdUser: !!userInfo?.department,
        emailConfirmed: userInfo?.emailConfirmed,
        libradorId: responseLib?.id,
        formaJuridicaId: responseLib?.tipoSociedad?.id,
        cif: responseLib?.cif,
        validada: responseLib?.validada,
        razonSocial: responseLib?.razonSocial,
        gestor: responseLib?.gestor,
        esPublica: responseLib?.esPublica,
      },
    });
  } catch (error) {
    yield put({
      type: action.payload.request.failAction,
      payload: {
        error: true,
      },
    });
  }
}

export function* loginAccountsWorkerSaga(action) {
  try {
    let responseLib;
    const { userInfo, navigate, isInterno } = action.payload.data;

    sessionStorage.setItem('token', userInfo?.accessToken.token);

    if (!userInfo?.department) {
      responseLib = yield getEmpresaByUsuarioId(
        userInfo?.userId,
        userInfo?.accessToken.token
      );
      if (responseLib?.data?.result) {
        responseLib = responseLib?.data.result;
      } else {
        responseLib = responseLib?.data;
      }
      yield put(getDocumentosPendientesLibrador(responseLib?.id));
    }

    yield put({
      type: action.payload.okAction,
      payload: {
        userId: userInfo?.userId,
        identityId: userInfo?.id,
        userName: userInfo?.firstName || userInfo?.userName,
        lastName: userInfo?.lastName,
        userEmail: userInfo?.email,
        token: userInfo?.accessToken.token,
        refreshToken: userInfo?.refreshToken,
        expiresIn: userInfo?.accessToken.expiresIn,
        isAdUser: !!userInfo?.department,
        emailConfirmed: userInfo?.emailConfirmed,
        libradorId: responseLib?.id,
        formaJuridicaId: responseLib?.tipoSociedad?.id,
        cif: responseLib?.cif,
        validada: responseLib?.validada,
        razonSocial: responseLib?.razonSocial,
        gestor: responseLib?.gestor,
        esPublica: responseLib?.esPublica,
      },
    });
    isInterno ? navigate('/user-ad') : navigate('/');
  } catch (error) {
    const { onError } = action.payload.data;
    onError('#OPS_ETLD2');

    yield put({
      type: action?.payload?.failAction,
      payload: {
        error: true,
      },
    });
  }
}

export function* refreshTokenWorkerSaga(action) {
  try {
    const response = yield call(authFetch(action.payload.request));
    const userInfo = response?.data;

    yield put({
      type: action.payload.request.okAction,
      payload: {
        token: userInfo?.accessToken.token,
        refreshToken: userInfo?.refreshToken,
        expiresIn: userInfo?.accessToken.expiresIn,
      },
    });
  } catch (error) {
    yield put({
      type: action.payload.request.failAction,
      payload: {
        error: true,
      },
    });
  }
}

export function* loginAndSetEmpresaWithTokenWorkerSaga(action) {
  try {
    const userInfo = action?.payload?.data;
    let responseLib;
    responseLib = yield getEmpresaByUsuarioId(
      userInfo?.userId,
      userInfo?.accessToken.token
    );
    if (responseLib?.data?.result) {
      responseLib = responseLib?.data.result;
    } else {
      responseLib = responseLib?.data;
    }
    yield put({
      type: action?.payload?.okAction,
      payload: {
        userEmail: userInfo?.email,
        userName: userInfo?.firstName || userInfo?.userName,
        lastName: userInfo?.lastName,
        userId: userInfo?.userId,
        identityId: userInfo?.userId,
        refreshToken: userInfo?.refreshToken,
        token: userInfo?.accessToken.token,
        expiresIn: userInfo?.accessToken.expiresIn,
        emailConfirmed: userInfo?.emailConfirmed,
        libradorId: responseLib?.id,
        cif: responseLib?.cif,
        validada: responseLib?.validada,
        razonSocial: responseLib?.razonSocial,
        formaJuridicaId: responseLib?.tipoSociedad?.id,
        direcciones: responseLib?.direcciones,
        esPublica: responseLib?.esPublica,
      },
    });
  } catch (error) {
    notifications.errorServidor();
    yield put({
      type: action?.payload?.failAction,
      payload: {
        error: true,
      },
    });
  }
}

export function* loginAndSetEmpresaWithTokenWorkerSagaShared(action) {
  try {
    const userInfo = action?.payload?.data;

    yield put({
      type: action?.payload?.okAction,
      payload: {
        userEmail: userInfo?.email,
        userName: userInfo?.firstName || userInfo?.userName,
        userId: userInfo?.userId,
        identityId: userInfo?.userId,
        refreshToken: userInfo?.refreshToken,
        token: userInfo?.accessToken.token,
        expiresIn: userInfo?.accessToken.expiresIn,
        isAdUser: !!userInfo?.department,
      },
    });
  } catch (error) {
    notifications.errorServidor();
    yield put({
      type: action?.payload?.failAction,
      payload: {
        error: true,
      },
    });
  }
}

function* apiGetWorkerSaga(action) {
  try {
    const response = yield call(fetch(action.payload.request));
    const data = (p) => {
      if (p.paging === 'true') {
        return response.items;
      }
      return response;
    };

    yield put({
      type: action.payload.request.okAction,
      payload: {
        [action.payload.request.getKey]: data(action.payload.request),
      },
    });
  } catch (error) {
    yield put({
      type: action.payload.request.failAction,
      payload: {
        error,
      },
    });
  }
}

function* getLocationWorkerSaga(action) {
  try {
    yield put({
      type: action.payload.okAction,
      payload: {
        location: action.payload.location,
        match: action.payload.match,
        history: action.payload.history,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

function* getStepWorkerSaga(action) {
  try {
    yield put({
      type: action.payload.okAction,
      payload: {
        id: action.payload.id,
        stepId: action.payload.stepId,
        label: action.payload.label,
        steps: action.payload.steps,
        idOperacion: action.payload.idOperacion,
        tipoOperacion: action.payload.tipoOperacion,
        facturas: action.payload.facturas,
        hasCompletedKycData: action.payload.hasCompletedKycData,
        hasDni: action.payload.hasDni,
        hasCuenta: action.payload.hasCuenta,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

function* setCurrentEffectWorkerSaga(action) {
  try {
    yield put({
      type: action.payload.okAction,
      payload: action.payload,
    });
  } catch (error) {
    console.error(error);
  }
}

export function* toggleLayout(action) {
  if (action.payload) {
    yield put(toggleLayoutWidth('collapsed'));
  } else {
    yield put(toggleLayoutWidth('open'));
  }
}

export default function* watcherSaga() {
  yield takeEvery('API_GET_REQUEST', apiGetWorkerSaga);
  yield takeLatest('GET_CURRENT_LOCATION', getLocationWorkerSaga);
  yield takeLatest('GET_CURRENT_STEP', getStepWorkerSaga);
  yield takeLatest('LOGIN_REQUEST', loginWorkerSaga);
  yield takeLatest('LOGIN_REQUEST_ACCOUNTS', loginAccountsWorkerSaga);
  yield takeLatest('REFRESH_TOKEN_REQUEST', refreshTokenWorkerSaga);
  yield takeLatest('TOGGLE_LEFT_MENU', toggleLayout);
  yield takeLatest('SET_CURRENT_EFFECT', setCurrentEffectWorkerSaga);
  yield takeLatest('SET_LOGIN_DATA', loginAndSetEmpresaWithTokenWorkerSaga);
  yield takeLatest(
    'SET_LOGIN_DATA_SHARED',
    loginAndSetEmpresaWithTokenWorkerSagaShared
  );
}
