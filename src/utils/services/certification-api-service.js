/* eslint-disable class-methods-use-this */
import axiosInstance from './config/axios.config';

export class CertificationApiService {
  getCertificationConfig() {
    return {
      baseURL: process.env.REACT_APP_API_CERTIFICATION,
    };
  }

  async getCerfiticationByIdentityId(identityId, errorCallback) {
    let res = false;
    try {
      res = await axiosInstance.get(
        `api/certification/Certification/identityId/${identityId}`,
        this.getCertificationConfig()
      );
    } catch (e) {
      errorCallback();
    }
    return res?.data;
  }
}
