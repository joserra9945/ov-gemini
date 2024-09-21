import { useState } from 'react';
import { addLocale } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import ejemploEndosoCorrecto from 'assets/ejemploEndosoCorrecto.png';
import ejemploEndosoIncorrecto from 'assets/ejemploEndosoIncorrecto.png';

import { Button } from '@shared/components/Button';
import { Modal } from '@shared/components/Modal';
import { Spinner } from '@shared/components/Spinner';
import {
  tipoDocumento,
  tipoDocumentoEndoso,
  tipoDocumentoString,
  tipoDocumentoWithFechaCaducidad,
  tipoDocumentoWithFechaDeCierre,
  tipoDocumentoWithFechaEmisionOV,
} from '@shared/utils/constants';
import { calendarES } from '@shared/utils/utilsOv';

import { FileUploader } from 'components/FileUploader';

import './subirDocumento.scss';

const SubirDocumento = ({
  header,
  onClose,
  isOpen,
  data,
  handleUpload,
  handleReplaceFile,
  setData,
  loading,
  cancelFunc,
  options,
  selectedOption,
  setSelectedOption,
  optionValue = 'id',
  optionLabel = 'tipoDocumentoNombre',
}) => {
  const [dateEmision, setDateEmision] = useState();
  const [dateVencimiento, setDateVencimiento] = useState();
  const [loadingDocumento, setLoadingDocumento] = useState();
  const tipoDocumentoFechaExpedicion = tipoDocumentoWithFechaEmisionOV.some(
    (item) => item?.id === selectedOption
  );
  const tipoDocumentoFechaDeCierre = tipoDocumentoWithFechaDeCierre.some(
    (item) => item?.id === selectedOption
  );
  const tipoDocumentoFechaCaducidad = tipoDocumentoWithFechaCaducidad.some(
    (item) => item?.id === selectedOption
  );

  const tipoDocumentoDocumentacionRequerida =
    tipoDocumentoWithFechaEmisionOV.some(
      (item) => item?.id === data?.tipoDocumentoId
    );

  const handleDateVencimientoChange = (e) => {
    setDateVencimiento(e?.value);
  };

  const actualDate = new Date();
  const tomorrow = actualDate.setDate(actualDate.getDate() + 1);

  addLocale('es', calendarES);

  const checkEndoso = !!(
    data?.tipoDocumentoId === tipoDocumentoEndoso ||
    selectedOption === tipoDocumentoEndoso
  );
  return (
    <Modal
      open={isOpen}
      onClose={cancelFunc || onClose}
      header={header}
      className="subir-doc-dialog w-1/2"
    >
      {loading || loadingDocumento ? (
        <Spinner className="flex justify-center" />
      ) : (
        <div className="dialog-container">
          {options && (
            <Dropdown
              placeholder="Selecciona un tipo de documento..."
              emptyMessage="No se han encontrado resultados"
              onChange={(e) => {
                setSelectedOption(e.value);
              }}
              value={selectedOption}
              options={options}
              optionValue={optionValue}
              optionLabel={optionLabel}
              className="w-100 mb-3"
            />
          )}
          {checkEndoso && (
            <div className="ayuda-usuario">
              <p>
                Antes de subir el documento asegúrese de que los datos estén en{' '}
                <span>posición vertical</span>.
              </p>

              <p>Te mostramos un ejemplo:</p>
              <div className="col-12 imagenes-container flex">
                <div className="col-xs-12 col-6">
                  <img src={ejemploEndosoCorrecto} alt="" />
                </div>
                <div className="col-xs-12 col-6">
                  <img src={ejemploEndosoIncorrecto} alt="" />
                </div>
              </div>
            </div>
          )}

          {data?.tipoDocumentoId === tipoDocumento.DNI && (
            <div className="input-calendar__fecha-caducidad w-3/6 mb-2">
              <label htmlFor="icon">Fecha de validez</label>
              <Calendar
                value={data?.fechaVencimiento}
                onChange={handleDateVencimientoChange}
                dateFormat="dd/mm/yy"
                minDate={tomorrow}
                showIcon
                required
                locale="es"
              />
            </div>
          )}
          <FileUploader
            data={data}
            setData={setData}
            docType={data?.tipoDocumentoNombre || 'documento'}
            hasButton={false}
            allowMultiple={
              data?.tipoDocumentoId !== tipoDocumentoString.TOMA_DE_RAZON
            }
            maxFiles={2}
          />

          {!data?.motivoRechazo &&
            (tipoDocumentoDocumentacionRequerida ||
              tipoDocumentoFechaExpedicion) && (
              <div className="input-calendar__fecha-emision">
                <label htmlFor="icon">Fecha de expedición</label>
                <Calendar
                  value={data?.fechaEmision}
                  onChange={(e) => {
                    setDateEmision(e?.value);
                  }}
                  required
                  dateFormat="dd/mm/yy"
                  showIcon
                  locale="es"
                />
              </div>
            )}
          {!data?.motivoRechazo && tipoDocumentoFechaDeCierre && (
            <div className="input-calendar__fecha-cierre">
              <label htmlFor="icon">Fecha de cierre</label>
              <Calendar
                value={data?.fechaEmision}
                onChange={(e) => {
                  setDateEmision(e?.value);
                }}
                required
                dateFormat="dd/mm/yy"
                showIcon
                locale="es"
              />
            </div>
          )}
          {!data?.motivoRechazo && tipoDocumentoFechaCaducidad && (
            <div className="input-calendar__fecha-caducidad">
              <label htmlFor="icon">Fecha de caducidad (opcional)</label>
              <Calendar
                value={data?.fechaVencimiento}
                onChange={handleDateVencimientoChange}
                dateFormat="dd/mm/yy"
                showIcon
              />
            </div>
          )}

          {!data?.motivoRechazo && tipoDocumentoFechaCaducidad && (
            <div className="input-calendar__fecha-caducidad">
              <label htmlFor="icon">Fecha de caducidad (opcional)</label>
              <Calendar
                value={data?.fechaVencimiento}
                onChange={(e) => {
                  setDateVencimiento(e?.value);
                }}
                dateFormat="dd/mm/yy"
                showIcon
              />
            </div>
          )}

          <div className="footer-buttons flex justify-end">
            <Button
              text="Cancelar"
              disabled={loading || loadingDocumento}
              onClick={() => {
                cancelFunc();
                setDateEmision(null);
                setDateVencimiento(null);
              }}
              type="text-button"
            />
            {/*
            @jotebor
            No hay que deshabilitar el botón si es un documento documentoRechazado
            y no tiene dateEmision, al subir un documento rechazado no se exige la fecha
            en ningún caso (solo al subir documentos requeridos nuevos).
          */}
            <Button
              text="Guardar"
              disabled={
                loadingDocumento ||
                !data?.files?.length ||
                (!dateEmision &&
                  tipoDocumentoFechaExpedicion &&
                  !data.motivoRechazo) ||
                (!dateEmision &&
                  tipoDocumentoDocumentacionRequerida &&
                  !data.motivoRechazo)
              }
              loading={loadingDocumento}
              onClick={() => {
                setLoadingDocumento(true);
                let res;
                if (data?.motivoRechazo && handleReplaceFile) {
                  res = handleReplaceFile(data.files);
                  res && setLoadingDocumento(false);
                } else {
                  res = handleUpload(data.files, {
                    ...data,
                    fechaEmision: dateEmision,
                    fechaVencimiento: dateVencimiento,
                  });
                  res && setLoadingDocumento(false);
                }
              }}
              type="button"
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SubirDocumento;
