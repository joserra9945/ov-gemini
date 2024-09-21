/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import DocumentoDeEmpresaService from 'utils/services/documento-empresa-service';
import DocumentoRepresentanteService from 'utils/services/documento-representante-service';
import TipoDocumentoService from 'utils/services/tipo-documento-service';

import { InfoTemplate } from '@shared/templates';
import { tipoDocumentoString } from '@shared/utils/constants';
import notifications from '@shared/utils/notificationsOv';

import { Accordion, AccordionTab } from '@shared/components/Legacy/Accordion';
import { Button } from '@shared/components/Legacy/Button';
import { Dialog } from '@shared/components/Legacy/Dialog';
import {
  wildcardEnum,
  WildcardFields,
} from '@shared/components/Legacy/WildcardFields';

import { Fieldset } from 'components/Hocs/Forms';
import { DocumentacionRequeridaContext } from 'pages/MiDocumentacion/context';

import './subirDocumentoSiblings.scss';

const tipoDocumentoService = new TipoDocumentoService();
const documentoDeEmpresaService = new DocumentoDeEmpresaService();
const documentoDeRepresentanteService = new DocumentoRepresentanteService();

const DEFAULT_INPUT_NAME = 'fieldsSiblings__';

const actualDate = new Date();
const tomorrow = actualDate.setDate(actualDate.getDate() + 1);

const generateMinDates = (data) => {
  const certificadoHacienda =
    data?.tipoDocumentoId ===
    parseInt(tipoDocumentoString.CERTIFICADO_HACIENDA, 10);
  const minDate = new Date();
  const mes = new Date().getMonth();
  const prevMonth =
    mes === 0
      ? certificadoHacienda
        ? 9
        : 11
      : mes - (certificadoHacienda ? 3 : 1);
  if (mes === 0) {
    minDate.setFullYear(minDate.getFullYear() - 1);
  }
  minDate.setMonth(prevMonth);
  return minDate;
};

const fields = (data) => {
  return [
    {
      id: 'fecha-emision-documentacion',
      className: 'col-span-12 mt-4',
      type: +wildcardEnum.CALENDAR,
      config: {
        inputName: 'fechaEmision',
        inputLabel: 'Fecha de expedición',
        minDate: generateMinDates(data),
        maxDate: new Date(),
        required: true,
      },
    },
    {
      id: 'filepond-documentacion',
      type: +wildcardEnum.FILEPOND,
      config: {
        inputName: 'files',
        inputLabel: 'Subir documento:',
        maxFiles: 1,
        required: true,
      },
    },
  ];
};

const dniFields = () => {
  return [
    {
      id: 'filepond-documentacion',
      type: +wildcardEnum.FILEPOND,
      config: {
        inputName: 'files',
        inputLabel: 'Sube anverso y reverso de tu DNI',
        maxFiles: 2,
        required: true,
      },
    },
    {
      id: nanoid(),
      className: 'col-span-3',
      type: wildcardEnum.CALENDAR,
      config: {
        inputName: 'fechaVencimiento',
        inputLabel: 'Fecha de caducidad',
        minDate: new Date(tomorrow),
        maxDate: new Date('December 31, 2035'),
        required: true,
      },
    },
  ];
};

const fieldsSiblings = (tipoDocumentoNombre) => [
  {
    id: 'filepond-documento-siblings',
    type: +wildcardEnum.FILEPOND,
    config: {
      inputName: `${DEFAULT_INPUT_NAME}${tipoDocumentoNombre}`,
      inputLabel: '',
      maxFiles: 1,
    },
  },
];

const SubirDocumentoSiblings = ({
  header,
  isOpen,
  toggle,
  data,
  cancelFunc,
  disabled = false,
}) => {
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const rhForm = useForm({ mode: 'onBlur' });
  const [documentSiblings, setDocumentSiblings] = useState();
  const onChangeActiveTab = (id) => {
    setActiveTab(id === activeTab ? '' : id);
  };
  const { actualizarDocRequeridaEmpresa } = useContext(
    DocumentacionRequeridaContext
  );
  const { libradorId } = useSelector((store) => store.userState);

  const handleClose = () => {
    toggle();
    rhForm.reset();
  };

  const handleUploadDocumento = async (file, rowData) => {
    try {
      if (rowData?.tipoDocumentoId === parseInt(tipoDocumentoString.DNI, 10)) {
        await documentoDeRepresentanteService.post(file, rowData);
      } else {
        await documentoDeEmpresaService.postDocumentoDeEmpresa(
          libradorId || sessionStorage.getItem('libradorId'),
          rowData,
          file
        );
      }
      notifications.success({
        body: 'Su documento ha sido guardado correctamente',
      });
    } catch (e) {
      notifications.errorServidor({ body: e.errors });
    }
    navigate(0);
  };

  const checkField =
    data?.tipoDocumentoId === parseInt(tipoDocumentoString.DNI, 10)
      ? dniFields(data)
      : fields(data);
  const handleSubmit = async (fieldValues) => {
    setIsLoading(true);

    const { files } = fieldValues;
    try {
      const resDocuments = await handleUploadDocumento(files, {
        ...data,
        fechaEmision: fieldValues?.fechaEmision,
        fechaVencimiento: fieldValues?.fechaVencimiento,
        representanteId: data?.representanteId,
      });
      if (resDocuments) {
        notifications.success({
          title: 'Subida realizada con éxito!',
          body: 'Se ha subido el documento requerido.',
        });
        actualizarDocRequeridaEmpresa && actualizarDocRequeridaEmpresa();
        handleClose();
      }
      setIsLoading(false);
    } catch (error) {
      notifications.errorServidor();
      setIsLoading(false);
    }
  };

  const filesWatcher = rhForm.watch();

  return (
    <Dialog
      isOpen={isOpen}
      close={() => {
        handleClose();
        setActiveTab('');
      }}
      header={header}
      clickOutsideToClose={false}
      closeButtonLinkAppareance
      closeButtonColor="secondary"
      className="subir-doc__dialog"
    >
      <form>
        {(data?.tipoDocumentoId ===
          parseInt(tipoDocumentoString.CERTIFICADO_HACIENDA, 10) ||
          data?.tipoDocumentoId ===
            parseInt(tipoDocumentoString.CERTIFICADO_SS, 10)) && (
          <InfoTemplate
            text={`El certificado debe de tener menos de ${
              data?.tipoDocumentoId ===
              parseInt(tipoDocumentoString.CERTIFICADO_HACIENDA, 10)
                ? `3 meses `
                : `1 mes `
            }
                de antigüedad `}
          />
        )}
        <Fieldset className="otros-documentos-fields" legend="">
          <WildcardFields
            rhForm={rhForm}
            data={{ ...data } || {}}
            fields={checkField}
            disableds={disabled}
          />
        </Fieldset>
        {documentSiblings?.length > 0 && (
          <div className="otros-documentos__container">
            <span className="otros-documentos-title">
              Otros documentos asociados
            </span>
            <Accordion
              controlled
              className="otros-documentos-acordeon"
              onChangeActive={onChangeActiveTab}
              activeItem={activeTab}
            >
              {documentSiblings?.map((item) => {
                return (
                  <AccordionTab
                    id={item?.id}
                    key={item?.id}
                    title={`${item?.nombre}`}
                    className="otros-documentos__acordeon-tab"
                  >
                    <Fieldset className="otros-documentos-fields" legend="">
                      <WildcardFields
                        rhForm={rhForm}
                        data={filesWatcher || {}}
                        fields={fieldsSiblings(item?.id)}
                        disableds={disabled}
                      />
                    </Fieldset>
                  </AccordionTab>
                );
              })}
            </Accordion>
          </div>
        )}
        <div className="footer-buttons">
          <Button
            label="Cancelar"
            color="light"
            disabled={isLoading}
            onClick={() => {
              rhForm.reset();
              cancelFunc();
              setActiveTab('');
            }}
            type="button"
            backgroundColor="transparent"
            className="cancelar__button"
          />
          <Button
            label="Guardar"
            disabled={isLoading}
            loading={isLoading}
            onClick={rhForm.handleSubmit(handleSubmit)}
            type="submit"
            data-cy="doc-requerida__save-button"
          />
        </div>
      </form>
    </Dialog>
  );
};

export default SubirDocumentoSiblings;
