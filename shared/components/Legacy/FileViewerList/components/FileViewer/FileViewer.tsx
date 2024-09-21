/* eslint-disable */
// @ts-nocheck

import { isNull } from 'lodash';

import Actions from './templates/Actions';
import Info from './templates/Info';
import { IFileViewer } from './Interface';

const FileViewer = ({ file, onRemove, onShow }: IFileViewer): JSX.Element => {
  const hasActions = !isNull(onRemove) || !isNull(onShow);
  return (
    <div className="file-viewer__container g-flex g-flex--items-center g-flex--space-between">
      <Info file={file} />
      {hasActions ? (
        <Actions onRemove={onRemove} onShow={() => onShow(file?.id)} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default FileViewer;
