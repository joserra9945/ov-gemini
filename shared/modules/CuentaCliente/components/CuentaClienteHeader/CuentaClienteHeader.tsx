import { useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MenuButton from '@shared/components/MenuButton';
import { Modal } from '@shared/components/Modal';
import ModalButtons from '@shared/components/Modal/ModalButtons';
import { Tooltip } from '@shared/components/Tooltip';
import { InputCurrency, InputPercentage } from '@shared/form';
import { useEmpresaExterna } from '@shared/hooks';
import useIngreso from '@shared/hooks/useIngreso';
import { ICuentaClienteGet } from '@shared/interfaces/api/ICuentaCliente';
import { IEmpresaExternaCuentaClienteGet } from '@shared/interfaces/api/IEmpresaExterna';
import { ImporteFormateadoTemplate, InfoTemplate } from '@shared/templates';
import { formatCurrency, formatDateUTC } from '@shared/utils/formatters';
import {
  currencyFormat,
  currencyFormatImporteRetenido,
} from '@shared/utils/utils';

import DevolucionesForm from '../../DevolucionesForm/DevolucionesForm';

import cuentaClienteHeaderOptions from './actions/CuentaClienteHeaderOptions';

type RiesgoVivoHeaderProps = {
  cuentaCliente: ICuentaClienteGet;
  empresaInternaId?: string;
  fetchData: () => Promise<void>;
  fetchVistaCuentaCliente: () => Promise<void>;
  isAdUser: boolean;
  libradorId: string | null;
  empresaExternaCuentaCliente: IEmpresaExternaCuentaClienteGet;
};

const CuentaClienteHeader = ({
  cuentaCliente,
  empresaInternaId,
  fetchData,
  fetchVistaCuentaCliente,
  isAdUser,
  libradorId,
  empresaExternaCuentaCliente,
}: RiesgoVivoHeaderProps): JSX.Element => {
  const rhForm = useForm({ mode: 'onChange' });
  const [modals, setModals] = useState<{ [key: string]: boolean }>(
    {} as { [key: string]: boolean }
  );

  const { empresaExternaCuentaClientePut, loading: loadingEmpresaExterna } =
    useEmpresaExterna();
  const { origenRetencionIngresoPost, loading: loadingIngreso } = useIngreso();

  const onSubmitEditarPorcentajeRetencion = async (
    fieldValues: FieldValues
  ) => {
    const res =
      empresaInternaId &&
      (await empresaExternaCuentaClientePut(
        cuentaCliente.libradorId,
        empresaInternaId,
        fieldValues.porcentajeRetencion
      ));

    if (res) {
      setModals({ ...modals, modificarPorcentajeRetencion: false });
      fetchVistaCuentaCliente();
    }
  };

  const onSubmitGenerarIngreso = async (fieldValues: FieldValues) => {
    const res =
      empresaInternaId &&
      (await origenRetencionIngresoPost(
        empresaInternaId,
        fieldValues.importeIngreso,
        cuentaCliente.libradorId
      ));

    if (res) {
      setModals({ ...modals, generarIngreso: false });
      fetchVistaCuentaCliente();
      fetchData();
    }
  };

  const renderModals = () => {
    const {
      devolucionRetencion,
      modificarPorcentajeRetencion,
      generarIngreso,
    } = modals;
    return (
      <>
        {devolucionRetencion && empresaInternaId && libradorId && (
          <Modal
            className="w-1/2"
            header="Devolver retención"
            onClose={() => setModals({ ...modals, devolucionRetencion: false })}
            open={devolucionRetencion}
          >
            <DevolucionesForm
              empresaInternaId={empresaInternaId}
              fetchDataCuentaCliente={fetchData}
              libradorId={libradorId}
              setModals={setModals}
              empresaExternaCuentaCliente={empresaExternaCuentaCliente}
            />
          </Modal>
        )}
        {modificarPorcentajeRetencion && (
          <Modal
            header="Editar porcentaje de retención"
            onClose={() => {
              rhForm.reset();
              setModals({ ...modals, modificarPorcentajeRetencion: false });
            }}
            open={modificarPorcentajeRetencion}
          >
            <InfoTemplate text="Las operaciones en curso no se verán afectadas." />
            <FormProvider {...rhForm}>
              <div className="flex flex-col mt-4 ">
                <InputPercentage
                  defaultValue={empresaExternaCuentaCliente.porcentajeRetencion}
                  label="Porcentaje retención"
                  name="porcentajeRetencion"
                  required
                />
                <span className="mt-2">
                  {`Última modificación:
                  
                  ${
                    empresaExternaCuentaCliente.fechaModificacionPorcentajeRetencion
                      ? formatDateUTC(
                          empresaExternaCuentaCliente.fechaModificacionPorcentajeRetencion
                        )
                      : '-'
                  } 
                  - 
                  ${
                    empresaExternaCuentaCliente.usuarioModificacionPorcentajeRetencionNombreCompleto ??
                    ''
                  }`}
                </span>
                <ModalButtons
                  confirmText="Guardar"
                  loading={loadingEmpresaExterna}
                  onCancel={() => {
                    rhForm.reset();
                    setModals({
                      ...modals,
                      modificarPorcentajeRetencion: false,
                    });
                  }}
                  onConfirm={rhForm.handleSubmit(
                    onSubmitEditarPorcentajeRetencion
                  )}
                />
              </div>
            </FormProvider>
          </Modal>
        )}
        {generarIngreso && (
          <Modal
            className="w-1/2"
            header="Generar ingreso"
            onClose={() => {
              rhForm.reset();
              setModals({ ...modals, generarIngreso: false });
            }}
            open={generarIngreso}
          >
            <InfoTemplate text="El ingreso generado podrá utilizarse para conciliar efectos impagados." />
            <FormProvider {...rhForm}>
              <div className="flex flex-col mt-4 ">
                <InputCurrency
                  label="Importe del ingreso"
                  name="importeIngreso"
                  required
                />
                <div className="gap 2 mt-4">
                  <span className="font-normal">Importe máximo:</span>
                  <span className="font-bold ml-2">
                    {formatCurrency(
                      empresaExternaCuentaCliente.importeMaximoIngreso
                    )}
                  </span>
                </div>
                <ModalButtons
                  confirmText="Generar"
                  loading={loadingIngreso}
                  onCancel={() => {
                    rhForm.reset();
                    setModals({
                      ...modals,
                      generarIngreso: false,
                    });
                  }}
                  onConfirm={rhForm.handleSubmit(onSubmitGenerarIngreso)}
                />
              </div>
            </FormProvider>
          </Modal>
        )}
      </>
    );
  };

  const retencionObjetivo =
    (empresaExternaCuentaCliente.porcentajeRetencion / 100) *
    empresaExternaCuentaCliente.riesgoIndirectoVivo;

  return (
    <div className="flex items-center gap-2">
      <div>
        <span className="font-normal">
          {isAdUser ? 'Riesgo vivo: ' : 'Línea de crédito: '}
        </span>
        {currencyFormat(empresaExternaCuentaCliente.riesgoIndirectoVivo)}
      </div>
      <div>|</div>
      {isAdUser ? (
        <>
          <div>
            <span className="font-normal">Riesgo de posible impago: </span>
            {currencyFormat(
              empresaExternaCuentaCliente?.riesgoIndirectoPosibleImpago
            )}
          </div>
          <div>|</div>
        </>
      ) : (
        ''
      )}
      <div>
        <span className="font-normal">Importe retenido: </span>
        {currencyFormatImporteRetenido(cuentaCliente?.saldoRetenido) || '-'}
      </div>
      <div>
        <Tooltip
          content="Importe retenido hasta el buen fin de todas las operaciones vigentes o impagadas"
          place="bottom"
        >
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="cursor-pointer text-info "
          />
        </Tooltip>
      </div>
      <div>|</div>
      {isAdUser ? (
        <>
          <div>
            <span className="font-normal">Retención objetivo: </span>
            {currencyFormat(retencionObjetivo)}
          </div>
          <div>|</div>
        </>
      ) : (
        ''
      )}
      <div className="flex justify-center items-center gap-2">
        <span className="flex font-normal">
          <span>Retención:</span>
          <span className="font-bold ml-1 mr-3">
            <ImporteFormateadoTemplate
              porcentage
              importe={empresaExternaCuentaCliente.porcentajeRetencion}
            />
          </span>
        </span>
      </div>
      {isAdUser && (
        <div className="w-full ml-2">
          <MenuButton
            items={cuentaClienteHeaderOptions(
              empresaExternaCuentaCliente.porcentajeRetencion,
              modals,
              setModals
            )}
          />
        </div>
      )}
      {renderModals()}
    </div>
  );
};

export default CuentaClienteHeader;
