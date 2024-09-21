/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IViewer {
  file: any;
  contentType?: string;
  onClose?: (() => void) | null;
}
