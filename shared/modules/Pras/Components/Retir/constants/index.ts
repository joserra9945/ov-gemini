import { format } from 'date-fns';

import notifications from '@shared/utils/notifications';

import { IRetirLastPurshase, IRetirOwnersResponse } from '../../../interfaces';

const FORMAT_DD_MM_YYYY = 'dd/MM/yyyy';

export const TITULARES_URL = '/TitularesReales/by-empresa-cif';

export const getHttpAuthorization = () => ({
  Authorization: `Bearer ${sessionStorage.getItem('token')}`,
});

export const defaultRetirsResponse: IRetirOwnersResponse = {
  id: '',
  fechaUltimaActualizacion: '',
  creationTime: '',
  lastModificationTime: '',
  empresaCif: '',
  userIdentityId: '',
  titulares: [],
};

export const defaultLastPurchase: IRetirLastPurshase = {
  fechaCompra: '',
  fechaUltimaActualizacion: '',
  usuario: '',
  error: false,
};

export const formatRetirDates = (date: string) => {
  return date ? format(new Date(date), FORMAT_DD_MM_YYYY) : '';
};

export const mapLastPurshaseResponse = (data: any, usuario: string) =>
  data
    ? {
        fechaCompra: formatRetirDates(data.lastModificationTime),
        fechaUltimaActualizacion: formatRetirDates(
          data.fechaUltimaActualizacion
        ),
        usuario,
        error: false,
      }
    : defaultLastPurchase;

export const retirErrors = {
  getUser:
    'No se ha podido obtener el usuario quién ha realizado la compra, por favor inténtelo de nuevo.',
  getTitulares:
    'No se ha podido obtener los titulares, por favor inténtelo de nuevo.',
  putTitulares:
    'No se ha podido realizar la compra, por favor inténtelo de nuevo.',
};

export const showError = (message: string, error?: any) => {
  const body =
    error?.response?.data?.errors?.[0] ||
    retirErrors[message as keyof typeof retirErrors];
  notifications.errorServidor({ body });
};

export const sociedadesIntervinientesColumns = [
  { key: 'nivel', field: 'nivel', header: 'Nivel' },
  { key: 'nif', field: 'nif', header: 'NIF' },
  { key: 'denominacion', field: 'denominacion', header: 'Denominación' },
  { key: 'domicilio', field: 'domicilio', header: 'Domicilio' },
  { key: 'codigoPais', field: 'codigoPais', header: 'Código país' },
];
