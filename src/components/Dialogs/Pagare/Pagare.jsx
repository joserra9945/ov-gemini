/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { cloneDeep } from 'lodash';

import { Button } from '@shared/components/Legacy/Button';
import { Dialog } from '@shared/components/Legacy/Dialog';

import { FileUploader } from 'components/FileUploader';
import { PagareFields } from 'components/forms/Fields';

// import { tipoDocumentoString } from '@shared/utils/constants';
import { pagareParser } from './helper';

const Pagare = ({
  header,
  isOpen,
  toggle,
  data,
  submit,
  setData,
  loading,
  cancelFunc,
}) => {
  const rhForm = useForm();
  const [Pagare, setPagare] = useState({
    importeNominal: 0,
    libradoCif: '',
    libradoRazonSocial: '',
    numero: '',
    fechaEmision: new Date(),
    fechaVencimiento: new Date(),
  });
  const { handleSubmit } = rhForm;

  const updateProperty = (value, key) => {
    let res = null;
    if (key === 'esFicticio') res = cloneDeep(Pagare);
    else res = Pagare;
    res[key] = value;
    setPagare(res);
  };

  return (
    <Dialog
      isOpen={isOpen}
      close={toggle}
      header={header}
      closeButtonLinkAppareance
      closeButtonColor="secondary"
      className="pagare-dialog"
    >
      <form onSubmit={handleSubmit((d) => submit(d, data))}>
        <div className="pagare-dialog-form">
          <FileUploader
            docType="Pagare"
            data={data}
            type={data?.tipoDocumentoId}
            setData={setData}
            hasButton={false}
            showDeleteModal={false}
          />
          <PagareFields
            updateProperty={updateProperty}
            rhForm={rhForm}
            pagare={pagareParser(data)}
            showEsFicticia={false}
          />
        </div>
        <div className="footer-buttons">
          <Button
            label="Cancelar"
            color="light"
            onClick={cancelFunc}
            type="button"
          />
          <Button
            label="Guardar"
            disabled={loading}
            loading={loading}
            type="submit"
            data-cy="Pagare__save-button"
          />
        </div>
      </form>
    </Dialog>
  );
};

export default Pagare;
