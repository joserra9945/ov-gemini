import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  FC,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import SubirDocumento from 'assets/subirDocumento.svg';
import { nanoid } from 'nanoid';

import { Button } from '@shared/components/Button';
import { Document } from '@shared/interfaces/IInputFileUpload';

import FileViewerList from '@shared/components/Legacy/FileViewerList';

interface IProps {
  documents: Document[];
  setDocuments: Dispatch<SetStateAction<Document[]>>;
  imageIcon?: string;
  buttonText?: string;
}
const InputFileUpload: FC<IProps> = ({
  setDocuments,
  documents,
  imageIcon,
  buttonText,
}) => {
  const [fileInputKey, setFileInputKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const newDocuments: Document[] = Array.from(files).map((file) => {
        const newFile: Document = file as Document;
        newFile.id = nanoid();
        newFile.file = file;
        newFile.url = URL.createObjectURL(file);
        return newFile;
      });
      const updatedDocuments = [...documents, ...newDocuments];
      setDocuments(updatedDocuments);

      setFileInputKey((prevKey) => prevKey + 1);
    }
  };
  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };
  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files && event.dataTransfer.files[0];
    if (droppedFile && droppedFile.size > 0) {
      const file: Document = droppedFile as Document;
      file.url = URL.createObjectURL(droppedFile);
      const newDocuments: Document[] = [...documents, file];
      setDocuments(newDocuments);
      setFileInputKey((prevKey) => prevKey + 1);
    }
  };
  const handleClickButton = () => {
    fileInputRef.current?.click();
  };
  const handleRemove = (index: number) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
  };
  return (
    <div className="flex flex-row w-full gap-2.5 overflow-auto h-full mobile:flex-col-reverse tablet:flex-col-reverse">
      <div className="w-1/2 h-full min-h-[130px] mobile:w-full tablet:w-full">
        <label
          htmlFor={`file-upload-${fileInputKey}`}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e)}
          className="flex flex-row border-dashed border-2 rounded-lg border-neutral-25 cursor-pointer p-4 items-center text-center gap-2.5 justify-center h-full mobile:flex-col tablet:flex-col"
        >
          <img
            className="w-32"
            src={imageIcon ?? SubirDocumento}
            alt="importar-imagen"
          />
          <div className="flex flex-col gap-3 h-full items-center justify-center">
            <p className="m-0 pt-1 mobile:hidden tablet:hidden">
              Arrastra y suelta tu documento aquí o{' '}
              <span className="underline text-text-hyperlink">
                búscalos en tus archivos.
              </span>
            </p>
            <Button
              onClick={() => handleClickButton()}
              text={buttonText ?? 'Buscar documentos'}
              type="button"
              className=" h-8 !bg-primary border-primary !text-white hover:!border-primary hover:!bg-primary-over"
            />
            <input
              id={`file-upload-${fileInputKey}`}
              ref={fileInputRef}
              type="file"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={handleFileUpload}
              onClick={() => {
                if (fileInputRef && fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              multiple
              className="hidden"
            />
          </div>
        </label>
      </div>

      <div className="w-1/2 !bg-[#F0F4FF] p-4 h-full  min-h-[130px] mobile:w-full tablet:w-full">
        <FileViewerList
          files={documents}
          onRemove={(index) => handleRemove(index)}
        />
      </div>
    </div>
  );
};
export default InputFileUpload;
