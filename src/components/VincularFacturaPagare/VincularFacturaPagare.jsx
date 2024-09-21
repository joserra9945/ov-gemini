/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useEffect, useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import FacturaDePagareService from 'utils/services/factura-de-pagare-service';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useDebounce from '@shared/hooks/useDebounce';
import { TABLE_OPTIONS, TABLE_TABS } from '@shared/utils/constants';
import { formatCurrency } from '@shared/utils/formatters';
import notifications from '@shared/utils/notificationsOv';
import { queryFixer } from '@shared/utils/utilsOv';

import { Button } from '@shared/components/Legacy/Button';
import { Dialog } from '@shared/components/Legacy/Dialog';
import { TurboTable } from '@shared/components/Legacy/TurboTable';

import CustomInputText from 'components/CustomInputs/InputText';
import ErrorMessage from 'components/ErrorMessage';
import BillForm from 'components/forms/BillForm';

import FacturasService from '../../utils/services/facturas-service';
import PagareService from '../../utils/services/pagare-service';

import PagareDetail from './components/PagareDetail';
import PagareInfo from './components/PagareInfo';
import { columns } from './constants';

import './vincularFacturaPagare.scss';

const facturaDePagareService = new FacturaDePagareService();
const pagareService = new PagareService();
const facturaService = new FacturasService();

// TODO - Declarar el setModal para cuando se haga la petición
const VincularFacturaPagare = ({
  pagareId,
  setModal,
  onNextFromParent = null,
  fromPagareForm = false,
}) => {
  const [pagare, setPagare] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [queryState, setQueryState] = useState();
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentTable, setCurrentTable] = useState(TABLE_TABS.NO_VINCULADAS);
  const [searchTerm, setSearchTerm] = useState();
  const [searchTermFinal, setSearchTermFinal] = useState();
  const [esNuevaFactura, setNuevaFactura] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTermFinal, 500);

  const saveFacturaPagare = async () => {
    try {
      setIsDisabled(true);
      const facturasIds = selected?.map((item) => item?.id);
      if (facturasIds) {
        const res = await facturaDePagareService.setFacturaDePagare(
          facturasIds,
          pagareId
        );
        if (res) {
          notifications.success({
            body: 'La acción se ha realizado con éxito',
          });
        }
      }
      setIsDisabled(false);
      setModal();
      onNextFromParent && onNextFromParent();
    } catch {
      setIsDisabled(false);
    }
  };

  const deleteFacturaPagare = async () => {
    try {
      setIsDisabled(true);
      const facturasIds = selected?.map((item) => item?.id);
      if (facturasIds?.length > 0) {
        const requests = [];
        facturasIds.forEach((facturaId) => {
          const request = facturaDePagareService.deleteFacturaDePagare({
            facturaId,
            pagareId,
          });
          requests.push(request);
        });
        const [res] = await Promise.all(requests);
        if (res) {
          notifications.success({
            body: 'La acción se ha realizado con éxito',
          });
        }
      }
      setIsDisabled(false);
      setModal();
      onNextFromParent && onNextFromParent();
    } catch {
      setIsDisabled(false);
    }
  };

  const fetchPagare = useCallback(async () => {
    try {
      const res = await pagareService.getPagareById(pagareId);
      if (res) {
        setPagare(res);
      }
    } catch (e) {
      setError(e?.response?.data?.errors?.toString());
    }
  }, [pagareId]);

  const fetchFacturas = useCallback(async () => {
    if (!queryState) {
      return;
    }

    try {
      setIsLoading(true);
      const query = queryFixer(queryState);
      const data =
        currentTable === TABLE_TABS.NO_VINCULADAS
          ? await facturaService.getFacturaVinculableByFilters(
              pagareId,
              `${query}${
                debouncedSearchTerm ? `&Numeros=${debouncedSearchTerm}` : ''
              }`
            )
          : await facturaService.getFacturaByPagareId(pagareId, query);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [queryState, currentTable, pagareId, debouncedSearchTerm]);

  useEffect(() => {
    if (pagareId) {
      fetchPagare();
    }
  }, [pagareId, fetchPagare]);

  useEffect(() => {
    if ((pagare && currentTable) || esNuevaFactura) {
      fetchFacturas();
    }
  }, [fetchFacturas, pagare, currentTable, esNuevaFactura]);

  useEffect(() => {
    if (esNuevaFactura && Array.isArray(data?.items)) {
      const selectedItem = data.items.find(
        (item) => item.id === esNuevaFactura
      );
      if (selectedItem) {
        setSelected((prevSelected) => {
          const alreadyExists = prevSelected.find(
            (item) => item.id === selectedItem.id
          );
          if (alreadyExists) {
            return prevSelected;
          }
          return [...prevSelected, selectedItem];
        });
      }
    }
  }, [data, esNuevaFactura]);

  if (!pagare && !error) {
    return (
      <div className="text-center">
        <ProgressSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const toogleDialog = () => {
    setShowModal(!showModal);
  };

  const onNext = () => {
    setShowModal(false);
    fetchFacturas();
  };

  const cleanUndefined = selected?.filter((item) => item !== undefined);

  const total =
    cleanUndefined?.reduce((accum, item) => {
      const importeNominal = item?.importeNominal || 0;
      return accum + importeNominal;
    }, 0) || 0;
  return (
    <div className="vincular-factura__container">
      <PagareInfo pagare={pagare} />
      <PagareDetail data={pagare} />
      <div className="vincular-factura-info__container">
        <span className="mb-1 text-xl font-medium text-primary">
          Seleccione las facturas a vincular:
        </span>
      </div>
      <TurboTable
        className="facturas-pagare__table"
        dataKey="id"
        columns={columns}
        currentTable={currentTable}
        multiple
        onSelectionChange={(e) => {
          setSelected(e);
        }}
        paginator
        scrollable
        scrollHeight="300px"
        selection={selected}
        selectionMode="checkbox"
        setCurrentTable={setCurrentTable}
        setQueryState={setQueryState}
        showHeader
        showFilter={false}
        tableOptions={TABLE_OPTIONS}
        totalRecords={data?.totalCount ?? data?.items?.length}
        value={data ? data?.items : ''}
        HeaderCustomComponent={
          <div className="custom-header-left-section">
            {currentTable === TABLE_TABS.NO_VINCULADAS && (
              <span className="p-input-icon-left">
                <FontAwesomeIcon icon={faSearch} />
                <CustomInputText
                  placeholder="Buscar nº de factura"
                  value={searchTerm}
                  onChange={setSearchTerm}
                  onBlur={() => {
                    setSearchTermFinal(searchTerm);
                  }}
                />
              </span>
            )}

            <Button
              onClick={toogleDialog}
              label="Crear factura"
              color="primary"
              className="ml-4 min-width-fit-content"
            />
          </div>
        }
      />

      <p className="vincular-factura-info-import__container">
        <span className="bolder">TOTAL:</span> {formatCurrency(total)}{' '}
      </p>
      <div className="vincular-factura-footer__container buttons">
        <Button
          label={!fromPagareForm ? 'Cancelar' : 'Continuar sin vincular'}
          className="cancel-btn"
          onClick={!fromPagareForm ? setModal : onNextFromParent}
          disabled={isDisabled}
          color="light"
        />
        <Button
          label={
            currentTable === TABLE_TABS.NO_VINCULADAS
              ? 'Vincular'
              : 'Desvincular'
          }
          disabled={!selected?.length || isDisabled}
          onClick={
            currentTable === TABLE_TABS.NO_VINCULADAS
              ? saveFacturaPagare
              : deleteFacturaPagare
          }
        />
      </div>
      {showModal && (
        <Dialog
          isOpen={showModal}
          close={() => {
            setShowModal(false);
          }}
          disableAnimation
          closeButtonLinkAppareance
          clickOutsideToClose={false}
          closeButtonColor="secondary"
          className="factura-form__dialog"
          header="Factura"
        >
          <BillForm
            onCancel={() => setShowModal(false)}
            data={pagare}
            onNext={onNext}
            setNuevaFactura={setNuevaFactura}
          />
        </Dialog>
      )}
    </div>
  );
};
export default VincularFacturaPagare;
