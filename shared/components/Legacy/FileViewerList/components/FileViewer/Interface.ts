export interface IFileViewer {
  file: any;
  onRemove: (() => void) | null;
  onShow: (id: string) => void;
}
