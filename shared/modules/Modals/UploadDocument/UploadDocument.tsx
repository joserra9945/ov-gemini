import { useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ProgressSpinner } from 'primereact/progressspinner';

import { useDocumentoDeEmpresa, useTipoDocumento } from '@shared/hooks';
import { ITipoDocumento } from '@shared/interfaces';

import { Button } from '@shared/components/Legacy/Button';
import { Fieldset, Form } from '@shared/components/Legacy/FormWrapper';
import Modal from '@shared/components/Legacy/Modal';
import {
  WildcardFields,
  WildcardSwitch,
} from '@shared/components/Legacy/WildcardFields';

import { fields } from './constants';
import { UploadDocumentProps } from './interface';

const UploadDocument: React.FC<UploadDocumentProps> = ({
  data = {},
  onClose,
  isOpen,
  empresaId,
  showSwitch = false,
  onNext,
  onError,
}) => {
  const { documentoDeEmpresaGet } = useTipoDocumento();
  const { documentoDeEmpresaPost } = useDocumentoDeEmpresa();
  const [options, setOptions] = useState<ITipoDocumento[] | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const rhForm = useForm({ mode: 'onBlur' });

  const handleSubmit = async (fieldValues: FieldValues) => {
    try {
      setIsDisabled(true);
      const res = await documentoDeEmpresaPost(
        fieldValues?.tipoDocumento?.id,
        '',
        '',
        empresaId,
        fieldValues?.files
      );
      rhForm.reset();
      setIsDisabled(false);
      onNext && onNext(res);
    } catch {
      setIsDisabled(false);
      onError && onError();
    }
  };

  const handleClose = () => {
    if (isDisabled) return;
    rhForm.reset();
    onClose();
  };

  const fetchTipoDocumento = useCallback(async () => {
    try {
      const res = await documentoDeEmpresaGet();
      setOptions(res || []);
    } catch {
      setOptions([]);
    }
  }, [documentoDeEmpresaGet]);

  useEffect(() => {
    if (!options) {
      fetchTipoDocumento();
    }
  }, [options, fetchTipoDocumento]);

  return (
    <Modal
      className="upload-document__modal"
      title="Nuevo documento de empresa"
      onClose={handleClose}
      isOpen={isOpen}
    >
      {!options ? (
        <div className="gdc-center">
          <ProgressSpinner />
        </div>
      ) : (
        <Form className="upload-document__form">
          <Fieldset>
            <WildcardFields
              rhForm={rhForm}
              data={data}
              fields={fields(options)}
            />
          </Fieldset>
          <div className="upload-document__footer">
            <div className="risk-switch">
              {showSwitch && (
                <WildcardSwitch
                  rhForm={rhForm}
                  data={data}
                  inputName="docOriginal"
                  inputLabel="Doc. Original"
                />
              )}
            </div>
            <div className="buttons">
              <Button
                className="cancel-btn"
                link
                label="Cancelar"
                onClick={handleClose}
                disabled={isDisabled}
              />
              <Button
                className="submit-btn"
                label="Guardar"
                type="submit"
                onClick={rhForm.handleSubmit(handleSubmit)}
                disabled={isDisabled}
              />
            </div>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default UploadDocument;
