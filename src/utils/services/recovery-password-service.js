/* eslint-disable class-methods-use-this */
import { authentication } from '@shared/hooks/endpoints';

import axiosInstance from './config/axios.config';

/**
 * Servicio dedicado a encontrar la Razón Social, utilizado en los formularios de factura y pagaré
 */
export default class RecoveryPasswordService {
  sendResetPasswordEmail(data) {
    return axiosInstance.post(
      `${process.env.REACT_APP_API_URL}${authentication}/Send-reset-password-email`,
      {
        email: data.email,
        passwordResetUrl: `${window.location.origin}/recovery-password-step2-backup`,
      }
    );
  }

  resetPassword(data, token, userId) {
    return axiosInstance.post(
      `${process.env.REACT_APP_API_URL}${authentication}/Reset-password`,
      {
        password: data.password,
        token,
        userId,
      }
    );
  }
}
