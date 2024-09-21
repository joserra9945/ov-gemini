import { useCallback, useContext, useEffect, useState } from 'react';

import { authentication } from '@shared/hooks/endpoints';
import { useFetch } from '@shared/utils';

import { Spinner } from '@shared/components/Legacy/Spinner';

import {
  IRetirLastPurshase,
  IRetirOwnersResponse,
  IRetirUserResponse,
  PrasTabProps,
} from '../../interfaces';
import PrasContext from '../../prasContext';

import RetirOwners from './components/Owners';
import RetirPurchase from './components/Purchase';
import {
  defaultLastPurchase,
  defaultRetirsResponse,
  getHttpAuthorization,
  mapLastPurshaseResponse,
  showError,
  TITULARES_URL,
} from './constants';

import './styles.scss';

const Retir = ({ empresa }: PrasTabProps): JSX.Element => {
  const { prasConfig } = useContext(PrasContext);
  prasConfig.headers = getHttpAuthorization();

  const { get: getTitulares } = useFetch(
    `${process.env.REACT_APP_REG_URL}/api`,
    prasConfig
  );
  const { get: getLastBuyer } = useFetch(
    `${process.env.REACT_APP_API_URL}${authentication}`,
    prasConfig
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [retirResponse, setRetirResponse] = useState<IRetirOwnersResponse>(
    defaultRetirsResponse
  );
  const [lastPurchase, setLastPurshase] =
    useState<IRetirLastPurshase>(defaultLastPurchase);

  const setBuyerName = (purshase: IRetirLastPurshase, userId: string) => {
    getLastBuyer<{ data: IRetirUserResponse }>(`/user/${userId}`)
      ?.then((res) => {
        const firstName = res?.data?.firstName || '';
        const lastName = res?.data?.lastName || '';
        const usuario = `${firstName}${lastName ? ' ' : ''}${lastName}`;
        setLastPurshase({ ...purshase, usuario });
      })
      ?.catch(() => showError('getUser'));
  };
  const handleTitularesResponse = (data: IRetirOwnersResponse) => {
    if (data) {
      const purshase = mapLastPurshaseResponse(data, '');
      setRetirResponse(data || defaultRetirsResponse);
      setLastPurshase(purshase);
      setBuyerName(purshase, data?.userIdentityId);
    }
  };

  const handleFetchTitularesError = () => {
    showError('getTitulares');
    setLastPurshase({ ...lastPurchase, error: true });
  };

  const fetchTitulares = useCallback(async () => {
    setLoading(true);
    getTitulares<{ data: IRetirOwnersResponse }>(
      `${TITULARES_URL}/${empresa?.cif}`
    )
      ?.then((res) => handleTitularesResponse(res?.data))
      ?.catch(handleFetchTitularesError)
      ?.finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTitulares, getLastBuyer, empresa]);

  useEffect(() => {
    fetchTitulares();
  }, [fetchTitulares]);

  return loading ? (
    <Spinner loading color="#0F1C40" />
  ) : (
    <div className="retir">
      {empresa && (
        <>
          <RetirPurchase
            lastPurshase={lastPurchase}
            handleTitularesResponse={handleTitularesResponse}
            cif={empresa.cif}
          />
          <RetirOwners
            owners={retirResponse.titulares}
            company={empresa.razonSocial}
          />
        </>
      )}
    </div>
  );
};

export default Retir;
