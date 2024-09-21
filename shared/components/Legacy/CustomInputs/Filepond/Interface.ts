export interface IFilepond {
  data?: any[];
  setData?: (files: any[] | null) => void;
  maxFiles?: number;
  isDisabled?: boolean;
  acceptedFileTypes?: string[];
  changeIcon?: boolean;
}

export interface IDataFile {
  id: string;
  basename: string;
  name: string;
  size: number;
  extension: string;
  file: File;
}
