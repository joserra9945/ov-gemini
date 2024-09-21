export interface INativePDFViewer {
  pdf?: string | File | Blob | null;
  height?: string | number;
  type?: 'stream' | 'base64' | '';
  contentType?: string;
  panel?: string;
  loadNoFile?: boolean;
  emptyPdf?: boolean;
}
