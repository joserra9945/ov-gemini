import { useContext, useState } from 'react';
import { AxiosError } from 'axios';

import { useFetch } from '@shared/utils';

import { IRetirModalProps, IRetirOwnersResponse } from '../../../interfaces';
import PrasContext from '../../../prasContext';
import {
  formatRetirDates,
  getHttpAuthorization,
  showError,
  TITULARES_URL,
} from '../constants/index';

import BuyLoadingModal from './BuyLoadingModal';
import BuyModal from './BuyModal';
import BuySuccessModal from './BuySuccessModal';

const RetirModals = ({
  modalOpened,
  setModalOpened,
  data,
  handleTitularesResponse,
  cif,
}: IRetirModalProps): JSX.Element => {
  const { prasConfig } = useContext(PrasContext);
  prasConfig.headers = getHttpAuthorization();
  const { put: executeNewPurshase, get: getTitulares } = useFetch(
    `${process.env.REACT_APP_REG_URL}/api`,
    prasConfig
  );
  const [dataHasChanged, setDataHasChanged] = useState<any>(false);
  const [updatedData, setUpdatedData] = useState<any>(null);

  const handleError = (isPurshase?: boolean, error?: AxiosError | null) => {
    showError(`${isPurshase ? 'put' : 'get'}Titulares`, error);
    setModalOpened('');
  };

  const handleNewPurshaseResponse = () => {
    getTitulares<{ data: IRetirOwnersResponse }>(`${TITULARES_URL}/${cif}`)
      ?.then((response) => {
        setDataHasChanged(
          formatRetirDates(response?.data?.fechaUltimaActualizacion) !==
            data.fechaUltimaActualizacion
        );
        setUpdatedData(response?.data);
        setModalOpened('status');
      })
      ?.catch(() => handleError());
  };

  const handlePurchase = async () => {
    setModalOpened('loading');
    executeNewPurshase(`${TITULARES_URL}/${cif}`)
      ?.then(handleNewPurshaseResponse)
      ?.catch((error) => handleError(true, error));
  };

  const updateDataAndClose = () => {
    handleTitularesResponse(updatedData);
    setUpdatedData(null);
    setDataHasChanged(false);
    setModalOpened('');
  };

  return (
    <>
      <BuyModal
        open={modalOpened === 'buy-retir'}
        onHide={() => setModalOpened('')}
        data={data}
        onConfirm={handlePurchase}
      />
      <BuyLoadingModal
        open={modalOpened === 'loading'}
        onHide={() => setModalOpened('')}
      />
      <BuySuccessModal
        open={modalOpened === 'status'}
        onHide={updateDataAndClose}
        fechaUltimaActualizacion={updatedData?.fechaUltimaActualizacion}
        dataHasChanged={dataHasChanged}
      />
    </>
  );
};

export default RetirModals;
