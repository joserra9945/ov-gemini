/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowUpFromBracket,
  faCloudArrowUp,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { usePrevious } from '@shared/utils';

import FileViewerList from '@shared/components/Legacy/FileViewerList';

import { IDataFile, IFilepond } from './Interface';

import 'filepond/dist/filepond.min.css';

registerPlugin(FilePondPluginFileValidateType);

const Filepond = ({
  data,
  setData,
  maxFiles = 3,
  isDisabled = false,
  acceptedFileTypes = ['image/png', 'image/jpeg', 'application/pdf'],
  changeIcon = false,
}: IFilepond): JSX.Element => {
  const [currentFiles, setCurrentFiles] = useState<IDataFile[] | null>(null);
  const prevCurrentFiles = usePrevious(currentFiles);
  const filepond = useRef<any>();

  const renderLabel = (): JSX.Element => {
    return (
      <div className="fp-label">
        <FontAwesomeIcon
          icon={
            changeIcon
              ? (faCloudArrowUp as IconProp)
              : (faArrowUpFromBracket as IconProp)
          }
          className="upload-icon"
        />
        <div className="fp-label--right">
          <div className="fp-label__content">
            Arrastra y suelta tu documento aquí <br />o{' '}
            <span className="filepond--label-action">
              búscalo en tus archivos.
            </span>
          </div>
        </div>
      </div>
    );
  };

  const handleRemove = useCallback(
    (index: number) => {
      if (!filepond.current || !currentFiles) return;
      filepond.current.removeFile(index);
      let tmpFiles = [...currentFiles];
      if (currentFiles.length > 1) {
        tmpFiles.splice(index, 1);
      } else {
        tmpFiles = [];
      }
      setCurrentFiles(tmpFiles);
    },
    [currentFiles]
  );

  const isDuplicated = (file: File) => {
    if (!currentFiles?.length) return false;
    const res = currentFiles.find((el) => {
      const fileItem = el?.file;
      return (
        (fileItem?.name === file?.name &&
          fileItem?.lastModified === file?.lastModified &&
          fileItem?.size === file?.size) ||
        (fileItem?.size === file?.size && fileItem?.type === file?.type)
      );
    });
    return !!res;
  };

  useEffect(() => {
    if (
      ((!prevCurrentFiles && currentFiles) ||
        (prevCurrentFiles &&
          currentFiles &&
          prevCurrentFiles !== currentFiles) ||
        (prevCurrentFiles && !currentFiles)) &&
      setData
    ) {
      setData(currentFiles || null);
    }
  }, [currentFiles, prevCurrentFiles, setData]);

  useEffect(() => {
    if (
      filepond.current &&
      filepond.current.getFiles().length === 0 &&
      Array.isArray(data) &&
      data?.length &&
      !currentFiles
    ) {
      data.forEach((file) => {
        if (file.file) filepond.current.addFile(file.file);
      });
    }
  }, [currentFiles, data]);

  return (
    <>
      <div
        className={`filepond__container${
          currentFiles && currentFiles.length >= maxFiles ? ' --max-files' : ''
        }`}
      >
        <FilePond
          ref={filepond}
          allowMultiple
          allowBrowse={!isDisabled}
          acceptedFileTypes={acceptedFileTypes}
          maxFiles={(isDisabled && currentFiles?.length) || maxFiles}
          labelIdle={renderToString(renderLabel())}
          beforeAddFile={(item) => {
            if (!isDuplicated(item.file as File)) return true;
            return false;
          }}
          onaddfile={(error, item) => {
            if (!error) {
              const tmpFiles: IDataFile[] = currentFiles?.length
                ? [...currentFiles]
                : [];
              tmpFiles.push({
                id: item?.id,
                basename: item?.filenameWithoutExtension,
                name: item?.filename,
                size: item?.fileSize,
                extension: item?.fileExtension,
                file: item?.file as File,
              });
              setCurrentFiles(tmpFiles);
            }
          }}
        />
      </div>
      {useMemo(() => {
        return (
          <FileViewerList
            files={currentFiles}
            onRemove={handleRemove}
            isDisabled={isDisabled}
          />
        );
      }, [currentFiles, handleRemove, isDisabled])}
    </>
  );
};

export default Filepond;
