import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import ModalButtons from '@shared/components/Modal/ModalButtons';
import { InputCurrency, InputSelect } from '@shared/form';
import { useDevolucion } from '@shared/hooks';
import useCuentaExterna from '@shared/hooks/useCuentaExterna';
import { IEmpresaExternaCuentaClienteGet } from '@shared/interfaces/api/IEmpresaExterna';
import { estadosCuenta } from '@shared/utils/constants';
import { formatCurrency } from '@shared/utils/formatters';
import notifications from '@shared/utils/notifications';

type DevolucionesFormProps = {
  empresaExternaCuentaCliente: IEmpresaExternaCuentaClienteGet;
  empresaInternaId: string;
  libradorId: string;
  setModals: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  fetchDataCuentaCliente: () => Promise<void>;
};

interface CuentaBancariaOption {
  id: string;
  description: string;
}

const DevolucionesForm = ({
  empresaInternaId,
  fetchDataCuentaCliente,
  libradorId,
  setModals,
  empresaExternaCuentaCliente,
}: DevolucionesFormProps) => {
  const { cuentaExternaByFiltersGet } = useCuentaExterna();
  const { devolucionRetencionPost, loading } = useDevolucion();

  const [cuentasBancariasOptions, setCuentasBancariasOptions] = useState<
    CuentaBancariaOption[]
  >([]);

  const rhForm = useForm({ mode: 'onBlur' });

  const fetchData = useCallback(async () => {
    const query = `?Activa=true&Estados=${estadosCuenta.VALIDADA}&EmpresaId=${libradorId}`;
    const res = await cuentaExternaByFiltersGet(query);
    if (res && res.items.length > 0) {
      const cuentaBancariaOptions = res.items.map((cuenta) => ({
        id: cuenta?.id,
        description: cuenta?.iban?.completo,
      }));
      setCuentasBancariasOptions(cuentaBancariaOptions);
    }
  }, [cuentaExternaByFiltersGet, libradorId]);

  const handleSubmitPostRetenciones = async (data: FieldValues) => {
    const res =
      empresaInternaId &&
      (await devolucionRetencionPost(empresaInternaId, data));
    if (res) {
      notifications.success({
        body: 'Se ha creado la devolución correctamente',
      });
      setModals({ devolucionRetencion: false });
      fetchDataCuentaCliente();
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <FormProvider {...rhForm}>
      <div className="devolucionesForm flex flex-col">
        <div className="flex">
          <div className="font-normal mr-2">
            Riesgo vivo
            <span className="font-bold ml-2">
              {formatCurrency(empresaExternaCuentaCliente.riesgoIndirectoVivo)}
            </span>
          </div>
          <div>|</div>
          <div className="font-normal ml-2">
            Retención:
            <span className="font-bold ml-2">
              {empresaExternaCuentaCliente.porcentajeRetencion}%
            </span>
          </div>
        </div>
        <div className="mt-4 w-full">
          <InputCurrency
            className="w-full"
            label="Importe a devolver"
            name="importe"
          />
          <div className="gap 2 mt-4 mb-4">
            <span className="font-normal">Importe máximo:</span>
            <span className="font-bold ml-2">
              {formatCurrency(
                empresaExternaCuentaCliente.importeMaximoDevolucion
              )}
            </span>
          </div>
        </div>
        <div>
          <InputSelect
            className="!w-full"
            label="Cuenta bancaria"
            name="cuentaDestinoId"
            optionLabel="description"
            options={cuentasBancariasOptions}
            optionValue="id"
            required
            emptyMessage="No hay opciones disponibles"
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <ModalButtons
          loading={loading}
          onCancel={() => {
            setModals({ devolucionRetencion: false });
          }}
          onConfirm={rhForm.handleSubmit(handleSubmitPostRetenciones)}
          cancelType="text-button"
        />
      </div>
    </FormProvider>
  );
};

export default DevolucionesForm;
