import EfectoForm from 'components/DetalleEfecto/EfectoForm';
import DocRequeridaEnFichaDetalle from 'components/DocRequeridaEnFichaDetalle';

export const tabMenuItems = [
  {
    label: 'Documentación requerida',
    id: 0,
    element: DocRequeridaEnFichaDetalle,
  },
  { label: 'Datos del efecto', id: 1, element: EfectoForm },
];

export const tabMenuItemsEnum = {
  DOC_REQUERIDA: 0,
  DATOS_EFECTO: 1,
};
