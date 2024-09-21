export interface UploadDocumentProps {
  data?: any;
  isOpen: boolean;
  onClose: () => void;
  empresaId: string;
  showSwitch?: boolean;
  environment?: string;
  onNext?: (result: any) => void;
  onError?: () => void;
}
