/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import FacturasService from 'utils/services/facturas-service';

import notifications from '@shared/utils/notificationsOv';

import { Button } from '@shared/components/Legacy/Button';

import { FileUploader } from 'components/FileUploader';
import { Form } from 'components/Hocs/Forms';

import { persistVincularFormData } from '../../../store/actions/actions-effect';
import BillFields from '../Fields/BillFields';

import './billForm.scss';

const facturasService = new FacturasService({});

const BillForm = ({ onCancel = false, data, onNext, setNuevaFactura }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState({ files: [] });

  const rhForm = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await facturasService.postFacturaFile({
        esFicticio: 'false',
        libradoCif: values?.libradoCif,
        libradoRazonSocial: values?.libradoRazonSocial,
        numero: values?.numero,
        importeNominal: values?.importeNominal,
        fechaEmision: values?.fechaEmision,
        fechaVencimiento: values?.fechaVencimiento,
        files: files ? files.files : [],
        libradorId: data?.libradorId,
      });
      if (res) {
        notifications.success({
          body: 'Se ha creado una nueva factura',
        });
        dispatch(persistVincularFormData(res));
        setNuevaFactura(res);
        onNext();
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const onlyNecessaryValues = {
    ...data,
    numero: undefined,
    importeNominal: undefined,
    fechaEmision: undefined,
    fechaVencimiento: undefined,
  };

  return (
    <div className="factura-form__container">
      <div className="factura-form__upload">
        <p className="text-primary text-xl font-medium mb-1">Añadir factura</p>
        <FileUploader
          data={files}
          setData={setFiles}
          docType={files?.tipoDocumentoNombre || 'documento'}
          hasButton={false}
        />
      </div>
      <div className="factura__fields">
        <p className="text-primary text-xl font-medium mb-1">
          Datos de la factura
        </p>
        <FormProvider {...rhForm}>
          <Form
            onSubmit={rhForm.handleSubmit(onSubmit)}
            className="factura-form__content"
          >
            <BillFields data={onlyNecessaryValues} />
            <div className="footer-buttons">
              {onCancel && (
                <Button
                  label="Cancelar"
                  color="light"
                  onClick={() => onCancel()}
                />
              )}
              <Button label="Guardar" type="submit" loading={loading} />
            </div>
          </Form>
        </FormProvider>
      </div>
    </div>
  );
};

export default BillForm;
