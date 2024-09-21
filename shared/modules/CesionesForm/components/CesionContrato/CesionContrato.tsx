import { Dispatch, SetStateAction } from 'react';
import { isEmpty } from 'lodash';

import { Spinner } from '@shared/components/Spinner';
import {
  InputCalendar,
  InputCurrency,
  InputFilePond,
  InputTextBasic,
} from '@shared/form';
import { ICesionByIdGet } from '@shared/interfaces/api/ICesion';
import { IDataFile } from '@shared/interfaces/IDataFile';

type ICesionContratoProps = {
  files:
    | {
        id: string;
        file: Blob;
      }[];
  setFiles: Dispatch<
    SetStateAction<
      | {
          id: string;
          file: Blob;
        }[]
    >
  >;
  isEditing?: boolean;
  cesion: ICesionByIdGet;
  loadingFiles: boolean;
  tieneContratoObra: boolean;
};
const CesionContrato = ({
  files,
  setFiles,
  isEditing,
  cesion,
  loadingFiles,
  tieneContratoObra,
}: ICesionContratoProps) => {
  if (!!isEditing && isEmpty(cesion))
    return (
      <div className="flex content-center justify-center align-middle">
        <Spinner />;
      </div>
    );
  return (
    <div>
      <h3 className="text-lg text-primary font-semibold mt-4">
        Datos del contrato
      </h3>
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 mobile:flex mobile:flex-col">
        <div className="grid col-span-1 mb-2 w-full">
          <InputTextBasic
            name="numero"
            label="Nº contrato"
            defaultValue={cesion.numero}
            required
          />
        </div>
        <div className="grid col-span-1 gap-4 mb-2 w-full">
          <div className="flex flex-row justify-between gap-2 mobile:flex-col">
            <InputCalendar
              labelClassName="text-text "
              name="fechaInicio"
              label="Fecha de inicio"
              defaultValue={
                cesion.fechaInicioContrato &&
                new Date(cesion.fechaInicioContrato)
              }
              required
            />
            <InputCalendar
              labelClassName="text-text "
              name="fechaVencimiento"
              label="Fecha de finalización"
              defaultValue={
                cesion.fechaFinalizacion && new Date(cesion.fechaFinalizacion)
              }
              required
            />
          </div>
        </div>

        <div className="grid col-span-1 mb-2 w-full">
          <InputCurrency
            name="importe"
            label="Importe de la cesión"
            defaultValue={cesion.importe}
            required
          />
        </div>
        <div className="grid col-span-1 mb-2 w-full">
          <InputCurrency
            name="importePendienteDeEjecutar"
            label="Importe a ejecutar"
            defaultValue={cesion.importePendienteDeEjecutar}
            required
          />
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg text-primary font-semibold mt-4">
          Suba el contrato
        </h3>
        {loadingFiles ? (
          <div className="flex content-center justify-center align-middle">
            <Spinner />;
          </div>
        ) : (
          <InputFilePond
            disabled={tieneContratoObra}
            name="contrato"
            maxFiles={1}
            data={files}
            defaultValue={files}
            setData={(e: IDataFile[]) => {
              const newFile = e.map((file) => ({
                id: file.id,
                file: file.file,
              }));
              setFiles(newFile);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CesionContrato;
