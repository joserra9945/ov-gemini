import { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  faArrowUpFromBracket,
  IconDefinition,
} from '@fortawesome/pro-light-svg-icons';

import { GenericButton } from '@shared/components/GenericButton';
import { GenericCalendar } from '@shared/components/GenericCalendar';
import { GenericListItems } from '@shared/components/GenericListItems';
import { Modal } from '@shared/components/Modal';
import { enumEstadoDoc } from '@shared/enum/Documento';
import {
  useDocumentoDeEmpresa,
  useDocumentoDeRepresentante,
  useEmpresaExterna,
} from '@shared/hooks';
import useModal from '@shared/hooks/useModal';
import {
  IEmpresaExternaDocumentacionRequeridaPendienteById,
  IEmpresaExternaDocumentacionRequeridaPendienteByIdG,
} from '@shared/interfaces/api/IEmpresaExterna';
import { IDataFile } from '@shared/interfaces/IDataFile';
import { IUserReducer } from '@shared/modules/DirectLending/constants/IUserReducer';
import { InfoTemplate } from '@shared/templates';
import {
  tipoDocumentoString,
  tipoDocumentoWithFechaCaducidad,
  tipoDocumentoWithFechaDeCierre,
  tipoDocumentoWithFechaEmisionOV,
} from '@shared/utils/constants';
import { formatDateCalendar } from '@shared/utils/formatters';
import notifications from '@shared/utils/notifications';

import { Filepond } from '@shared/components/Legacy/CustomInputs';

import { itemTemplate } from '../constants';

type DocListType = {
  estadoText: string;
  estadoType: enumEstadoDoc;
  label: string;
  onClick: () => void;
  icon: IconDefinition;
  esResumenDirectLending?: boolean;
  className?: string;
};
interface DocumentationListProps {
  esResumenDirectLending?: boolean;
  className?: string;
}

const DocumentationList: FC<DocumentationListProps> = ({
  esResumenDirectLending = false,
  className,
}) => {
  const { documentacionRequeridaPendienteByIdGet } = useEmpresaExterna();
  const { libradorId } = useSelector((state: IUserReducer) => state.userState);
  const { closeModal, isOpen, openModal } = useModal();
  const [selected, setSelected] =
    useState<IEmpresaExternaDocumentacionRequeridaPendienteById>();
  const [inputData, setInputData] = useState<IDataFile[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const {
    documentoDeRepresentantePost,
    loading: loadingDocumentoDeRepresentantePost,
  } = useDocumentoDeRepresentante();
  const { documentoDeEmpresaPost, loading: loadingDocumentoDeEmpresaPost } =
    useDocumentoDeEmpresa();

  const [docList, setDocList] = useState<DocListType[]>([]);

  const handleOnClick = useCallback(
    (sel: IEmpresaExternaDocumentacionRequeridaPendienteById) => {
      setSelected(sel);
      openModal();
    },
    [openModal]
  );

  const parseDocList = useCallback(
    (data: IEmpresaExternaDocumentacionRequeridaPendienteByIdG) => {
      const response = data.items.map((item) => {
        return {
          onClick: () => handleOnClick(item),
          label: item.tipoDocumentoNombre,
          estadoText: item.pendiente ? 'Pendiente de subirlo' : 'Completado',
          estadoType: item.pendiente
            ? enumEstadoDoc.PENDIENTE
            : enumEstadoDoc.VALIDADO,
          icon: faArrowUpFromBracket,
        };
      });

      return response;
    },
    [handleOnClick]
  );

  const hasFechaEmision = () => {
    return !!tipoDocumentoWithFechaEmisionOV.find(
      (item) => item.id === selected?.tipoDocumentoId
    );
  };
  const hasFechaDeCierre = () => {
    return !!tipoDocumentoWithFechaDeCierre.find(
      (item) => item.id === selected?.tipoDocumentoId
    );
  };
  const hasFechaCaducidad = () => {
    return !!tipoDocumentoWithFechaCaducidad.find(
      (item) => item.id === selected?.tipoDocumentoId
    );
  };
  const isDNI = () => {
    return selected?.tipoDocumentoId.toString() === tipoDocumentoString.DNI;
  };

  const needCalendar = () => {
    return !!(
      hasFechaEmision() ||
      hasFechaDeCierre() ||
      hasFechaCaducidad() ||
      isDNI()
    );
  };

  const getCalendarLabel = () => {
    if (hasFechaCaducidad()) return 'Fecha de caducidad';
    if (hasFechaEmision()) return 'Fecha de emisión';
    if (hasFechaDeCierre()) return 'Fecha de cierre';
    if (isDNI()) return 'Fecha de validez';
    return '';
  };

  const fetchDocs = useCallback(async () => {
    try {
      const data = await documentacionRequeridaPendienteByIdGet(libradorId);
      setDocList(parseDocList(data));
    } catch (e) {
      notifications.unknownError(e);
    }
  }, [documentacionRequeridaPendienteByIdGet, libradorId, parseDocList]);

  const saveFile = async () => {
    if (
      tipoDocumentoString.DNI === selected?.tipoDocumentoId.toString() ||
      tipoDocumentoString.ESCRITURA_NOMBRAMIENTO_ADMINISTRADOR_APODERADO ===
        selected?.tipoDocumentoId.toString()
    ) {
      const postData = {
        representanteId: selected?.representanteId,
        empresaId: libradorId,
        tipoDocumentoId: selected?.tipoDocumentoId,
        fechaVencimiento: date,
      };
      await documentoDeRepresentantePost(inputData, postData);
    } else {
      await documentoDeEmpresaPost(
        selected?.tipoDocumentoId || 0,
        hasFechaEmision() ? formatDateCalendar(date.toString()) : '',
        !hasFechaEmision() ? formatDateCalendar(date.toString()) : '',
        libradorId,
        inputData
      );
    }

    setDate(new Date());
    setInputData([]);
    fetchDocs();
    closeModal();
  };

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 mb-4">
        <h3 className="text-xl font-bold">Documentación requerida</h3>
        {!esResumenDirectLending && (
          <p className="text-lg">Necesitamos la siguiente documentación:</p>
        )}
      </div>

      {!esResumenDirectLending && (
        <InfoTemplate text="Si no dispone de los documentos en este momento podrá realizar la acción posteriormente a la creación del prestamo" />
      )}
      <GenericListItems<DocListType>
        data={docList}
        itemTemplate={itemTemplate}
        className={className}
      />
      <Modal
        header={selected?.tipoDocumentoNombre}
        onClose={closeModal}
        open={isOpen}
        className="w-full max-w-3xl"
      >
        {needCalendar() && (
          <div className="flex-auto mb-6 w-1/2">
            <label htmlFor="calendar-12h" className="block mb-2">
              {getCalendarLabel()}
            </label>
            <GenericCalendar
              value={date}
              onChange={(e) => e.value && setDate(e.value)}
            />
          </div>
        )}

        <Filepond
          data={inputData}
          setData={(file) => file && setInputData(file)}
        />

        <div className="flex flex-row-reverse pt-4">
          <GenericButton
            label="Guardar"
            buttonType="primary"
            loading={
              loadingDocumentoDeRepresentantePost ||
              loadingDocumentoDeEmpresaPost
            }
            onClick={saveFile}
          />
          <GenericButton
            label="Cancelar"
            buttonType="secondary-borderless"
            onClick={() => closeModal()}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DocumentationList;
