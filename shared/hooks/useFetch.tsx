/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  responseType: 'json',
});

interface IUseFetch<T = any> {
  loading: boolean;
  data: T;
  error: AxiosError | null;
  get: <D>(ep?: string, methodConf?: AxiosRequestConfig) => Promise<D> | null;
  post: <D>(
    ep?: string,
    data?: any,
    methodConf?: AxiosRequestConfig
  ) => Promise<D> | null;
  put: <D>(
    ep?: string,
    data?: any,
    methodConf?: AxiosRequestConfig
  ) => Promise<D> | null;
  remove: <D>(
    ep?: string,
    methodConf?: AxiosRequestConfig
  ) => Promise<D | null>;
}

const getKeyValue = (key: string, obj: any) => obj[key];
const createUrl = (url?: string, ep?: string) => `${url || ''}${ep || ''}`;

// the last argument below [] means it will fire onMount (GET by default)
const useFetch = (
  url?: string,
  config?: AxiosRequestConfig | null,
  propertyKey?: string | null,
  dependencyArray?: any | null
): IUseFetch => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // const handleApiCall = useCallback(
  //   async (c) => {
  //     try {
  //       setLoading(true);
  //       if (c) {
  //         let res = await axios.request(c);
  //         if (res && propertyKey) res = getKeyValue(propertyKey, res);
  //         setData(res);
  //       } else {
  //         setData(null);
  //       }
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [propertyKey]
  // );

  const handleApiCall = useCallback(
    async (c: any) => {
      try {
        setLoading(true);
        setError(null);
        if (c) {
          let res = null;
          if (c.baseURL) {
            res = await axiosInstance.request(c);
          } else {
            res = await axios.request(c);
          }

          if (res && propertyKey) res = getKeyValue(propertyKey, res);
          return res as any;
        }
        return null;
      } catch (err) {
        if (!axios.isCancel(err)) {
          throw err;
        }
      } finally {
        setLoading(false);
      }
    },
    [propertyKey]
  );

  const get = useCallback(
    async (ep?: string, methodConf?: AxiosRequestConfig) => {
      const finalConfig = { ...config, ...methodConf };
      const c = { ...finalConfig, url: createUrl(url, ep), method: 'get' };

      return handleApiCall(c);
    },
    [config, handleApiCall, url]
  );

  const post = useCallback(
    async (ep?: string, d?: any, methodConf?: AxiosRequestConfig) => {
      const finalConfig = { ...config, ...methodConf };
      const c = {
        ...finalConfig,
        url: createUrl(url, ep),
        method: 'post',
        data: d,
      };

      return handleApiCall(c);
    },
    [config, handleApiCall, url]
  );

  const put = useCallback(
    async (ep?: string, d?: any, methodConf?: AxiosRequestConfig) => {
      const finalConfig = { ...config, ...methodConf };
      const c = {
        ...finalConfig,
        url: createUrl(url, ep),
        method: 'put',
        data: d,
      };

      return handleApiCall(c);
    },
    [config, handleApiCall, url]
  );

  const remove = useCallback(
    async (ep?: string, methodConf?: AxiosRequestConfig) => {
      const finalConfig = { ...config, ...methodConf };
      const c = {
        ...finalConfig,
        url: createUrl(url, ep),
        method: 'delete',
      };

      return handleApiCall(c);
    },
    [config, handleApiCall, url]
  );

  // const get = useCallback(async (ep: string) => {setGet({ ep })}, []);
  // const post = useCallback((ep: string, d: any) => setPost({ ep, d }), []);
  // const put = useCallback((ep: string, d: any) => setPut({ ep, d }), []);
  // const remove = useCallback((ep: string) => setRemove({ ep }), []);

  useEffect(() => {
    if (dependencyArray && url) {
      (async () => {
        try {
          let res = await axios.get(url, config || {});
          if (propertyKey) res = getKeyValue(propertyKey, res);
          setData(res);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [config, propertyKey, dependencyArray, url]);

  // useEffect(() => {
  //   if (_get) {
  //     const c = config
  //       ? { ...config, url: _get.ep, method: 'get' }
  //       : { url: _get.ep, method: 'get' };
  //     handleApiCall(c);
  //   }
  // }, [_get, config, handleApiCall]);

  // useEffect(() => {
  //   if (_post) {
  //     const c = config
  //       ? { ...config, url: _post.ep, method: 'post', data: _post.d }
  //       : { url: _post.ep, method: 'post', data: _post.d };
  //     handleApiCall(c);
  //   }
  // }, [_post, config, handleApiCall]);

  // useEffect(() => {
  //   if (_put) {
  //     const c = config
  //       ? { ...config, url: _put.ep, method: 'put', data: _put.d }
  //       : { url: _put.ep, method: 'put', data: _put.d };
  //     handleApiCall(c);
  //   }
  // }, [_put, config, propertyKey, handleApiCall]);

  // useEffect(() => {
  //   if (_remove) {
  //     const c = config
  //       ? { ...config, url: _remove.ep, method: 'delete' }
  //       : { url: _remove.ep, method: 'delete' };
  //     handleApiCall(c);
  //   }
  // }, [_remove, config, handleApiCall]);

  return { loading, data, error, get, post, put, remove };
};

export { useFetch };
export type { IUseFetch };
