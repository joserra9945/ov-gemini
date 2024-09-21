import { IDataFile } from 'interfaces/IDataFile';

export const parseToFormData = (files: IDataFile[]): FormData => {
  const datos = new FormData();
  if (files?.length) {
    files.forEach((row: IDataFile) => {
      datos.append('rawFile', row.file, row.file.name);
    });
  }
  return datos;
};
