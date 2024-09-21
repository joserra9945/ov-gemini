export interface IDataFile {
  id: string;
  file: Blob & {
    readonly lastModified: number;
    readonly name: string;
  };
}
