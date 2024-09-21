import { useCallback, useRef } from 'react';
import axios, { CancelToken, CancelTokenSource } from 'axios';

type IUseCancelToken = {
  newCancelToken: () => CancelToken;
  isCancel: (value: any) => boolean;
};

/**
 * When a component unmounts, we need to cancel any potentially
 * ongoing Axios calls that result in a state update on success / fail.
 * This function sets up the appropriate useEffect to handle the canceling.
 *
 * @returns {newCancelToken: function, isCancel: function}
 * newCancelToken - used to generate the cancel token sent in the Axios request.
 * isCancel - used to check if error returned in response is a cancel token error.
 */
export const useCancelToken = (): IUseCancelToken => {
  const axiosSource = useRef<CancelTokenSource | null>(null);
  const { isCancel } = axios;
  const newCancelToken = useCallback(() => {
    const cancelTokenAxios = axios.CancelToken;
    if (axiosSource?.current?.token) {
      axiosSource?.current?.cancel();
    }
    axiosSource.current = cancelTokenAxios?.source();
    return axiosSource?.current && axiosSource?.current?.token;
  }, []);

  return { newCancelToken, isCancel };
};
