import { useCallback, useContext, useEffect, useState } from 'react';
import CuentaBancariaIcon from 'assets/cuenta-bancaria.svg';
import { nanoid } from 'nanoid';
import { faBuildingColumns } from '@fortawesome/pro-light-svg-icons';
import { faCheckCircle, faTimesCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { GenericButton } from '@shared/components/GenericButton';
import { Item } from '@shared/components/GenericListItems/Item';
import {
  GenericTooltip,
  ITooltipTarget,
} from '@shared/components/GenericTooltip';
import { Modal } from '@shared/components/Modal';
import { Spinner } from '@shared/components/Spinner';
import { Tooltip } from '@shared/components/Tooltip';
import useCuentaExterna from '@shared/hooks/useCuentaExterna';
import { NoDataGenericTemplate } from '@shared/templates';
import { estadosCuenta } from '@shared/utils/constants';

import Afterbanks from 'components/Afterbanks';

import { ICuentaBancariaDirectLending } from '../../Constants/interfaces';
import useMultiStepForm from '../../hook/useMultiStepForm';
import NewDirectLendingContext from '../context/NewDirectLendingContext';

const CuentaBancaria = () => {
  const { setDirectLendingData, directLendingData, error, setError } =
    useContext(NewDirectLendingContext);
  const { cuentaExternaGet, loading } = useCuentaExterna();
  const { config } = useMultiStepForm();

  const [banksAccounts, setBanksAccounts] = useState<
    ICuentaBancariaDirectLending[]
  >([]);
  const [bankAccoutSelected, setBankAccountSelected] =
    useState<ICuentaBancariaDirectLending>(directLendingData?.cuentaBancaria);
  const [openModal, setOpenModal] = useState(false);
  const [initDone, setInitDone] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await cuentaExternaGet();

      res &&
        setBanksAccounts(
          res.items.map((item) => ({
            estado: item.estado.id,
            id: item.id,
            iban: item.iban.completo,
            nombre: item.entidadBancaria?.nombre,
          }))
        );
    } finally {
      setInitDone(true);
    }
  }, [cuentaExternaGet]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setDirectLendingData((prevDirectLendingData) => ({
      ...prevDirectLendingData,
      cuentaBancaria: bankAccoutSelected,
    }));
    setError(false);
  }, [bankAccoutSelected, setDirectLendingData, setError]);

  const handleSelectBankAccount = (bank: ICuentaBancariaDirectLending) => {
    if (bankAccoutSelected?.id) {
      setBankAccountSelected({} as ICuentaBancariaDirectLending);
    } else {
      setBankAccountSelected(bank);
    }
  };

  const itemTemplate = (bank: ICuentaBancariaDirectLending): JSX.Element => (
    <div className="w-full md:flex ">
      <span className="truncate md:w-1/4">
        <span className="pr-2">
          <FontAwesomeIcon icon={faBuildingColumns} />
        </span>
        <span>{bank.nombre ?? '-'}</span>
      </span>
      <span className="flex">
        {bank.estado === estadosCuenta.VALIDADA ? (
          <div>
            <GenericTooltip content="Cuenta validada">
              {({ target: targetDescription }: ITooltipTarget) => (
                <FontAwesomeIcon
                  className={`${targetDescription} text-success pr-2`}
                  icon={faCheckCircle}
                />
              )}
            </GenericTooltip>
          </div>
        ) : (
          <div>
            <GenericTooltip content="Cuenta no validada">
              {({ target: targetDescription }: ITooltipTarget) => (
                <FontAwesomeIcon
                  className={`${targetDescription} text-danger pr-2`}
                  icon={faTimesCircle}
                />
              )}
            </GenericTooltip>
          </div>
        )}
        <Tooltip content={bank.iban}>{bank.iban}</Tooltip>
      </span>
    </div>
  );

  if (loading) return <Spinner className="flex justify-center" />;

  return (
    <>
      {initDone && !banksAccounts.length ? (
        <div className="flex justify-center">
          <NoDataGenericTemplate
            buttonType="tertiary"
            textButton="Añadir nueva cuenta bancaria"
            image={CuentaBancariaIcon}
            title="No dispone de ninguna cuenta bancaria"
            description={`Para poder generar un ${config.productoTituloSingular} deberá de añadir al menos una cuenta bancaria`}
            onClick={() => setOpenModal(true)}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-h-full">
          <div className="flex flex-col gap-4 overflow-auto">
            {banksAccounts.map((bank) => (
              <Item
                className={`p-3 border-1 ${
                  bankAccoutSelected?.iban === bank.iban ? 'border-success' : ''
                }  items-start justify-start`}
                key={nanoid()}
                onClick={() => handleSelectBankAccount(bank)}
              >
                {itemTemplate(bank)}
              </Item>
            ))}
          </div>
          <div className="flex justify-between pt-4">
            <GenericButton
              buttonType="none"
              className="text-info"
              label="Añadir nueva cuenta bancaria"
              onClick={() => setOpenModal(true)}
            />
            {error && (
              <p className="text-danger text-end">
                Debe seleccionar una cuenta bancaria*
              </p>
            )}
          </div>
        </div>
      )}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        header="Nueva cuenta bancaria"
        className="w-[70vw] h-[70vh]"
        closable={false}
      >
        <Afterbanks
          cancelar={() => setOpenModal(false)}
          onNextStep={() => {
            setOpenModal(false);
            fetchData();
          }}
        />
      </Modal>
    </>
  );
};

export default CuentaBancaria;
