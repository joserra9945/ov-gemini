import { IOperacionGetByFilters } from '../api';

export interface IEnviarOperacionAPerdida {
  isOpen: boolean;
  onClose: () => void;
  rowData: IOperacionGetByFilters;
  fetchData: () => void;
}
