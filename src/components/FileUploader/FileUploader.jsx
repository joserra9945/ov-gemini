import { useEffect, useRef, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginPdfPreview from 'filepond-plugin-pdf-preview';
import cloneDeep from 'lodash/cloneDeep';

import useWindowSize from '@shared/hooks/useWindowsSize';
import { tipoDocumentoString } from '@shared/utils/constants';
import notifications from '@shared/utils/notificationsOv';
import { binaryToBlob } from '@shared/utils/utils';

import DeleteEffectTemplateDialog from '../DialogTemplate/defaultTemplates/DeleteEffectTemplateDialog';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-pdf-preview/dist/filepond-plugin-pdf-preview.min.css';
import './FileUploader.scss';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginPdfPreview
);

const replaceFile = (item, data) => {
  if (!data?.files?.length) return false;
  return {
    ...data,
    files:
      data?.files?.map((el) => {
        const fileItem = el?.file;
        if (
          fileItem.name === item.file?.name &&
          fileItem.lastModified === item.file?.lastModified &&
          fileItem.size === item.file?.size
        ) {
          return { file: item.file, id: item.id };
        }
        return el;
      }) || [],
  };
};

const isDuplicated = (file, data) => {
  if (!data?.files?.length) return false;
  const res = data.files.find((el) => {
    const fileItem = el?.file;
    return (
      (fileItem.name === file?.name &&
        fileItem.lastModified === file?.lastModified &&
        fileItem.size === file?.size) ||
      (fileItem.size === file?.size && fileItem.type === file?.type)
    );
  });
  return !!res;
};

const FileUploader = ({
  data,
  setData,
  docType,
  type,
  isEditing = false,
  eraFicticio = false,
  isDisabled = false,
  header = false,
  hasButton = true,
  canAddFile = false,
  showDeleteModal = true,
  allowMultiple = true,
  maxFiles = 10,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [removeFile, setRemoveFile] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const windowSize = useWindowSize();
  const filepond = useRef(null);

  const moreThanMD = () => windowSize.width > 768;

  useEffect(() => {
    if (
      filepond.current &&
      filepond.current.getFiles().length === 0 &&
      Array.isArray(data.files) &&
      data?.files?.length
    ) {
      data.files.forEach((file) => {
        const addFile = isEditing ? binaryToBlob(file.file) : file.file;
        if (addFile) filepond.current.addFile(addFile);
      });
    }
  }, [data, isEditing]);

  useEffect(() => {
    if (
      filepond.current &&
      filepond.current.getFiles().length &&
      !data?.files?.length
    ) {
      filepond.current.removeFiles();
    }
  }, [data]);

  /**
   * Aprovechamos este useEffect para asignar la clase .fila-activa al file seleccionado.
   * .fila-activa es una clase que otorga una serie de estilos al fichero activo, haciendo que destaque entre los otro ficheros.
   */
  useEffect(() => {
    const elems = document.querySelectorAll('.fila-activa');
    Array.from(elems).forEach((el) => {
      el.classList.remove('fila-activa');
    });
    const li = document.getElementById(`filepond--item-${selectedItem}`);
    if (li === null) return;
    li.classList.add('fila-activa');
  }, [selectedItem]);

  const handleAddElement = (item) => {
    let newData = cloneDeep(data);
    if (!item) return;
    if (!isDuplicated(item?.file, data)) {
      if (newData.files) {
        newData.files.push({ file: item.file, id: item.id });
      } else {
        newData = { ...newData, files: [{ file: item.file, id: item.id }] };
      }
    } else {
      newData = replaceFile(item, newData);
    }
    setData(newData);
    if (setSelectedItem) setSelectedItem(item.id);
  };

  const getIndexOfElementInData = () => {
    let index = null;
    data.files.map((el, i) => {
      if (el.id === selectedItem) index = i;
      return false;
    });
    return index;
  };

  const removeFileFromData = () => {
    let newFiles = [];
    const index = getIndexOfElementInData();
    newFiles = data.files.filter((el, i) => i !== index);
    const newData = cloneDeep(data);
    newData.files = newFiles;
    setData(newData);
    if (newFiles?.length > 0) {
      if (setSelectedItem) setSelectedItem(newFiles[newFiles.length - 1].id);
    } else if (setSelectedItem) setSelectedItem(null);
  };

  const canRemove = () => {
    if (
      (type === tipoDocumentoString.DNI && canAddFile) ||
      !isEditing ||
      (isEditing && eraFicticio)
    )
      return true;
    return false;
  };

  const getFileBoxLabel = () => {
    if (!moreThanMD()) {
      return `<div class="fileupload-mobile-icon">Subir archivo <i class="pi pi-cloud-upload iconDimension"></i></div>`;
    }
    if (windowSize.width < 768) {
      return `<span class="filepond--label-action">Pulse aqui para añadir su ${docType.toLowerCase()}.</span>`;
    }
    if (filepond.current?.getFiles().length === 0)
      return hasButton
        ? `<div><i class="pi pi-cloud-upload"></i></div><div>Arrastra y suelta tu ${docType.toLowerCase()} aquí <br/>o <span class="filepond--label-action">búscalo en tus archivos.</span></div><div class="d-flex justify-content-center mt-4"><span data-id="fileupload-btn" class="filepond--label-action g-button g-button-light-contained g-button-md"><span class="g-button__label">Subir ${docType.toLowerCase()}</span></span></div>`
        : `<div><i class="pi pi-cloud-upload"></i></div><div>Arrastra y suelta tu ${docType.toLowerCase()} aquí o <span class="filepond--label-action">búscalo en tus archivos.</span></div>`;

    return `<div>Arrastra y suelta tu ${docType.toLowerCase()} aquí <br/>o <span class="filepond--label-action">búscalos en tus archivos.</span></div>`;
  };

  return (
    <div className="uploader h-full">
      {header && !isDisabled && (
        <div className="uploader__create-invoice">
          <span>{header}</span>
        </div>
      )}
      <div
        className={`uploader__filepond_container${
          docType === 'PAGARÉ' || docType === 'FACTURA' ? ' --max-height' : ''
        }`}
      >
        <FilePond
          ref={filepond}
          id="filePond"
          name="files"
          styleButtonRemoveItemPosition="right"
          labelFileTypeNotAllowed="Tipo de archivo no permitido"
          fileValidateTypeLabelExpectedTypes="Solo están permitidos archivos JPG,PNG y PDF."
          acceptedFileTypes={['image/png', 'image/jpeg', 'application/pdf']}
          labelIdle={!isDisabled ? getFileBoxLabel() : ''}
          allowImagePreview={moreThanMD()}
          allowRemove={canRemove()}
          dropOnPage
          allowMultiple={allowMultiple}
          allowReorder={false}
          dropOnElement={false}
          credits={false}
          allowBrowse={!isDisabled}
          maxFiles={maxFiles}
          onactivatefile={(e) => {
            if (setSelectedItem) setSelectedItem(e.id);
          }}
          onaddfile={(error, item) => {
            if (!error) {
              handleAddElement(item);
            } else {
              filepond.current.removeFile(item.id);
              notifications.errorServidor({
                title: 'Error',
                body: 'Solo están permitidos archivos JPG,PNG y PDF.',
              });
            }
            setIsLoading(false);
          }}
          beforeAddFile={(item) => {
            if (typeof item.source === 'string') return false;
          }}
          beforeRemoveFile={(e) => {
            if (setSelectedItem) setSelectedItem(e.id);
            if (showDeleteModal) {
              setVisible(true);
              return false;
            }
            setRemoveFile(true);
            filepond.current.removeFile(selectedItem);
            return true;
          }}
          onremovefile={() => {
            if (removeFile) {
              removeFileFromData();
              setRemoveFile(false);
            }
          }}
        />
      </div>

      <DeleteEffectTemplateDialog
        visible={visible}
        setVisible={setVisible}
        onConfirm={() => {
          setRemoveFile(true);
          filepond.current.removeFile(selectedItem);
        }}
      />
    </div>
  );
};

export default FileUploader;
