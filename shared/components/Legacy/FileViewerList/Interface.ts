export interface IFileViewerList {
  files: any;
  onRemove: (index: number) => void;
  isDisabled?: boolean;
}
