/* eslint-disable */
// @ts-nocheck

import { useState } from 'react';
import { nanoid } from 'nanoid';

import Viewer from '../Viewer';

import FileViewer from './components/FileViewer';
import { IFileViewerList } from './Interface';

const FileViewerList = ({
  files,
  onRemove,
  isDisabled = false,
}: IFileViewerList): JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const findItemById = (id: string) => {
    return files.find((obj: { id: string }) => obj.id === id);
  };

  const handleShow = (id?: string) => {
    const res =
      id && (!selectedFile || selectedFile?.id !== id)
        ? findItemById(id)
        : null;
    setSelectedFile(res);
  };
  return (
    <div className="file-viewer-list__container overflow-auto h-full" >
      {files?.length ? (
        files.map((file: any, index: number) => {
          return (
            <FileViewer
              key={nanoid()}
              file={file}
              onRemove={!isDisabled ? () => onRemove(index) : null}
              onShow={handleShow}
            />
          );
        })
      ) : (
        <div className='h-full'>
          </div>
        
      )}
      {selectedFile ? (
        <Viewer
          file={selectedFile?.file}
          contentType={selectedFile?.file?.type}
          onClose={() => handleShow()}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default FileViewerList;
