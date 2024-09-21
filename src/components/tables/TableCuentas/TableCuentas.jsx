import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faLinkSlash } from '@fortawesome/pro-light-svg-icons';

import ConfirmDialogModal from '@shared/components/ConfirmDialogModal';
import useCuentaExterna from '@shared/hooks/useCuentaExterna';
import notifications from '@shared/utils/notificationsOv';

import { TurboTable } from '@shared/components/Legacy/TurboTable';

import { columns } from 'components/tables/TableCuentas/columns';

import './tableCuentas.scss';

const TableCuentas = ({ data, fetchCuentas, isLoading, setIsLoading }) => {
  const { desactivarCuentaExternaById } = useCuentaExterna();
  const navigate = useNavigate();
  const [cuentas, setCuentas] = useState([]);
  const [cuentaToDelete, setCuentaToDelete] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setCuentas(data?.items || []);
  }, [data, setIsLoading]);

  useEffect(() => {
    fetchCuentas();
  }, [fetchCuentas]);

  const handleShowDialog = (cuenta) => {
    setCuentaToDelete(cuenta);
    setVisible(true);
  };

  const setActiva = async (value = false) => {
    const res = await desactivarCuentaExternaById(cuentaToDelete, value);
    if (res) {
      fetchCuentas();
    }
    setCuentaToDelete(null);
    setVisible(false);
  };

  const goToAddAccount = () => {
    navigate('/afterbanks', { state: { fromCuentas: true } });
  };

  return (
    <main>
      <section className="bg-white rounded shadow mb-2">
        <div className="flex flex-row justify-between p-6">
          <h2 className="text-2xl font-medium mb-2 sm:mb-0">
            Cuentas bancarias
          </h2>
          <button
            type="button"
            id="addCuenta"
            onClick={goToAddAccount}
            className="h-10 bg-primary rounded-md text-white px-6 hover:bg-primary-over text-center"
          >
            Añadir cuenta
          </button>
        </div>
        <TurboTable
          columns={columns(handleShowDialog)}
          value={cuentas}
          totalRecords={cuentas?.length}
          scrollable
          isLoading={isLoading}
          scrollHeight="flex"
          showSelectColumns={false}
          showFilter={false}
          header={false}
        />
        <ConfirmDialogModal
          isOpen={visible}
          onClose={() => {
            setVisible(false);
            setCuentaToDelete(null);
          }}
          bodyText="¿Está seguro de que desea deshabilitar la cuenta?"
          labelConfirm="Deshabilitar"
          labelCancel="Cancelar"
          onConfirm={() => setActiva()}
          onDeny={() => {
            setVisible(false);
            setCuentaToDelete(null);
          }}
          header="Deshabilitar cuenta"
          iconHeader={faLinkSlash}
          colorIconHeader="warning"
        />
      </section>
    </main>
  );
};

export default TableCuentas;
