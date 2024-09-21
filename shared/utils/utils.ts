import { cloneDeep } from 'lodash';

import { IGenericResponse } from '@shared/interfaces';
import { ICesion } from '@shared/interfaces/ICesion/ICesion';
import { ICesionFirma } from '@shared/interfaces/ICesionFirma';
import {
  IAccionRequerida,
  IAccionRequeridaGenericResponse,
} from '@shared/interfaces/IDocumentacionRequerida';
import { IFirmaCesion } from '@shared/interfaces/IFirmaCesion';
import { IContactoForm } from '@shared/interfaces/IForms';
import { IPago } from '@shared/interfaces/IPago/IPago';
import { IRepresentanteFirma } from '@shared/interfaces/IRepresentante';

import { IQueryReducer } from '@shared/components/Legacy/TurboTable/helpers';

import { rolesTypes } from './roles/config';
import { ADD_PAGO, estadoPrecioAcordadoEnum, RESET } from './constants';
import { newFormatDateUTC, toLocalFormat } from './formatters';
import Notifications from './notifications';

interface IIndexableArray {
  [key: string]: any;
}

export const fieldHasError = <T extends IIndexableArray, U extends keyof T>(
  errors: T,
  property: U
): any => {
  if (!errors) return false;
  if (!errors[property]) return false;
  return errors[property].message;
};

export const updateProperty = <T extends IIndexableArray, U extends keyof T>(
  data: T,
  setData: (args: T) => void,
  key: U,
  value: any
): void => {
  const newData = cloneDeep(data);
  newData[key] = value;
  setData(newData);
};

export const getItemByProperty = (data: any, value: any, property: any) =>
  data?.find((item: any) => item[property] === value);

/**
 *  String of params query of a endpoint mounted by back-end criteria
 * @param endpoint
 * @param queryState
 * @returns {string}
 */
export const queryFixer = (
  endpoint: string,
  queryState: IQueryReducer,
  rowsMultiplier = 1
): string => {
  if (!Object.keys(queryState).length) return `/${endpoint}`;
  return `${endpoint ? `/${endpoint}` : ''}${
    !endpoint.includes('?') ? '?' : '&'
  }${
    queryState.maxResult
      ? `MaxResultCount=${queryState.maxResult * rowsMultiplier}`
      : ''
  }${queryState.skipCount ? `&SkipCount=${queryState.skipCount}` : ''}${
    Array.isArray(queryState?.sortingCriteria)
      ? `&SortingCriteria=${queryState.sortingCriteria
          .map((sc) => `${sc?.property}%20${sc?.sort}`)
          .join(',')}`
      : queryState.sortingCriteria
      ? `&SortingCriteria=${queryState.sortingCriteria?.property}%20${queryState.sortingCriteria?.sort}`
      : ''
  }${queryState.params ? `${queryState.params}` : ''}`;
};

/**
 * Check type of pagare
 * @param esALaOrden
 * @param esTruncable
 * @returns {string}
 */
export const getTipoPagare = (esALaOrden?: boolean, esTruncable?: boolean) => {
  if (esALaOrden && esTruncable) return 'PAGOR';
  if (!esALaOrden && esTruncable) return 'PAGNO';
  if (esALaOrden && !esTruncable) return 'PAGOT';
  if (!esALaOrden && !esTruncable) return 'PAGNT';
};

export const setTipoPagare = (tipoPagare: string) => {
  if (tipoPagare === 'PAGOR') {
    return {
      esALaOrden: true,
      esTruncable: true,
    };
  }

  if (tipoPagare === 'PAGNO') {
    return {
      esALaOrden: false,
      esTruncable: true,
    };
  }

  if (tipoPagare === 'PAGOT') {
    return {
      esALaOrden: true,
      esTruncable: false,
    };
  }

  if (tipoPagare === 'PAGNT') {
    return {
      esALaOrden: false,
      esTruncable: false,
    };
  }
};
/**
 * Helper formatter
 */
const formatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

/**
 *
 * @param value
 * @returns number
 */
export const currencyFormat = (value?: number | null) =>
  value ? formatter.format(value) : formatter.format(0);

export const currencyFormatImporteRetenido = (value: number) =>
  value && value > 0 ? formatter.format(value) : formatter.format(0);

/**
 * Check arrays errors for react-hook-forms and returns message
 * @param errors
 * @param property
 * @returns string | boolean
 */
export const fieldArrayHasError = (
  errors: { [x: string]: { [x: string]: { [x: string]: { message: any } } } },
  index: string | number,
  property: string | number
): any => {
  if (errors && !errors[property]) return false;
  if (errors && !errors[property][index]) return false;
  if (errors && errors[property][index] === undefined) return false;
  return errors && errors[property][index].message;
};

export const equalsToCero = (element?: number) => element === 0;

export const openPdfnewTab = (res: Blob, fileName = '') => {
  const pdfURL = URL.createObjectURL(res);
  const pdfWindow = window.open('');
  pdfWindow?.document.write(
    `<html><head><title>${fileName}</title></head><body><embed width='100%' height='100%' type='application/pdf' src='${pdfURL}'></embed></body>`
  );
};

export const binaryToBlob = (file: BlobPart) => {
  return new Blob([file], { type: 'application/pdf' });
};

export const binaryToBlobCSV = (file: BlobPart) => {
  return new Blob([file], { type: 'text/csv' });
};

export const downloadFile = (
  mimeType: string,
  base64: string,
  fileName: string,
  extension: string
): void => {
  const a = document.createElement('a');
  a.href = `data:${mimeType};base64,${base64}`;
  a.download = `${fileName}.${extension}`;
  a.click();
};

export const downloadBlobFile = (
  blob: Blob,
  fileName: string,
  extension: string
): void => {
  const a = document.createElement('a');
  const blobURL = window.URL.createObjectURL(blob);
  a.href = blobURL;
  a.download = `${fileName}.${extension}`;
  a.click();
};

export const downloadFileFromBinary = (data: {
  file: string;
  tipoDocumentoNombre: string;
}) => {
  const a = document.createElement('a');
  const blob = binaryToBlob(data?.file);

  a.href = URL.createObjectURL(blob);
  a.download = `Documento de ${data.tipoDocumentoNombre}.pdf`;
  a.click();
};

export const OpenFileInNewTab = (file: Blob) => {
  const a = document.createElement('a');
  const blob = binaryToBlob(file);

  a.href = URL.createObjectURL(blob);
  a.target = '_blank';
  a.rel = 'noreferrer';
  a.click();
};

export const parseCesionContrato = (
  data: ICesionFirma,
  cesion: ICesion,
  regenerarFicheros: boolean
) => ({
  id: cesion.id,
  descripcion: data?.descripcion,
  esConClausula24: data?.clausula24,
  esSinComunicar: data?.esSinComunicar,
  esSinRecurso: data?.sinRecurso,
  importe: cesion.importe,
  libradoId: cesion.libradoId,
  libradorId: cesion.libradorId,
  fechaInicioContrato:
    data?.fechaInicioContrato && newFormatDateUTC(data?.fechaInicioContrato),
  fechaFinalizacion:
    cesion?.fechaFinalizacion && newFormatDateUTC(cesion?.fechaFinalizacion),
  numero: data?.numeroCesion,
  porcentajeComision: data?.porcentajeComision,
  porcentajeInteres: data?.porcentajeInteres,
  porcentajeRetencion: data?.porcentajeRetencion,
  regenerarFicheros,
  validada: cesion.validada,
  importePendienteDeEjecutar: data?.importePendienteDeEjecutar,
});

export const parseCesionContratoFicha = (
  data?: ICesion,
  cesion?: ICesion,
  regenerarFicheros?: boolean
) => ({
  id: cesion?.id,
  descripcion: data?.descripcion,
  importe: data?.importe,
  libradoId: cesion?.libradoId,
  libradorId: cesion?.libradorId,
  fechaInicioContrato:
    data?.fechaInicioContrato && newFormatDateUTC(data?.fechaInicioContrato),
  fechaFinalizacion:
    data?.fechaFinalizacion && newFormatDateUTC(data?.fechaFinalizacion),
  numero: data?.numero,
  regenerarFicheros,
  validada: cesion?.validada,
  importePendienteDeEjecutar: data?.importePendienteDeEjecutar,
});

export const parseCesionFuturos = (
  data: ICesionFirma,
  cesion: ICesion,
  regenerarFicheros: boolean
) => ({
  id: cesion.id,
  descripcion: data?.descripcion,
  esConClausula24: data?.clausula24,
  esSinComunicar: data?.esSinComunicar,
  esSinRecurso: data?.sinRecurso,
  importe: cesion.importe,
  libradoId: cesion.libradoId,
  libradorId: cesion.libradorId,
  porcentajeComision: data?.porcentajeComision,
  porcentajeInteres: data?.porcentajeInteres,
  porcentajeRetencion: data?.porcentajeRetencion,
  regenerarFicheros,
  validada: cesion.validada,
});

export const parseCesionFuturosFicha = (
  data?: ICesion,
  cesion?: ICesion,
  regenerarFicheros?: boolean
) => ({
  id: cesion?.id,
  descripcion: data?.descripcion,
  importe: data?.importe,
  libradoId: cesion?.libradoId,
  libradorId: cesion?.libradorId,
  regenerarFicheros,
  validada: cesion?.validada,
});

export const parseFirmaPut = (data: ICesionFirma, firma: IFirmaCesion) => ({
  id: firma.id,
  fechaPrevista: data.fechaPrevista && toLocalFormat(data.fechaPrevista),
  notarioId: data.notariaFirma?.id,
  notarioLocalId: data.notariaLocal?.id,
  email: firma.email,
  representanteExternoIds: data.firmanteFirma.map(
    (firmante: IRepresentanteFirma) => firmante.id
  ),
  telefono: firma.telefono,
  representanteInternoId: data.apoderadosFirma.id,
  tipo: data?.tipoFirma?.id,
});

export const parseFirmaPost = (data: ICesionFirma, cesion: ICesion) => ({
  cesionIds: [cesion.id],
  fechaPrevista: data.fechaPrevista && toLocalFormat(data.fechaPrevista),
  notarioId: data.notariaFirma.id,
  notarioLocal: data.notariaLocal?.id,
  representanteEmail: null,
  representanteExternoIds: data.firmanteFirma.map(
    (firmante: IRepresentanteFirma) => firmante.id
  ),
  representanteTelefono: null,
  representanteInternoId: data.apoderadosFirma.id,
  tipo: data?.tipoFirma?.id,
});

export const instrumentos = [
  {
    name: 'Pagarés a la Orden',
    value: 'PAGOR',
  },
  {
    name: 'Pagarés NO a la orden',
    value: 'PAGNO',
  },
  {
    name: 'Pagarés a la Orden NO TRUNCABLE',
    value: 'PAGOT',
  },
  {
    name: 'Pagarés NO a la orden NO TRUNCABLE',
    value: 'PAGNT',
  },
];

/**
 * Copia el elemento texto.
 * @param element
 */
export const copyToClipboard = (element?: string) => {
  if (element) {
    navigator.clipboard.writeText(element);
    Notifications.info({ title: '¡Copiado!', body: ' ' });
  }
};

export const formatIban = (iban: string | undefined) => {
  if (!iban) {
    return '';
  }

  const cleanIban = iban
    .replace(/\s\s+/g, ' ')
    .replace(/[^0-9a-zA-Z]/gi, '')
    .toUpperCase();

  const parts = [] as string[];

  if (cleanIban.length > 0) {
    parts.push(cleanIban.substring(0, 4));
  }

  if (cleanIban.length > 4) {
    parts.push(cleanIban.substring(4, 8));
  }

  if (cleanIban.length > 8) {
    parts.push(cleanIban.substring(8, 12));
  }

  if (cleanIban.length > 12) {
    parts.push(cleanIban.substring(12, 16));
  }

  if (cleanIban.length > 16) {
    parts.push(cleanIban.substring(16, 20));
  }

  if (cleanIban.length > 20) {
    parts.push(cleanIban.substring(20, 24));
  }

  return parts.join(' ');
};

export const DniIncompleted = (element: IContactoForm) => {
  return !element?.fechaVencimiento && !element?.files?.length;
};

export const isInfDep = (department: string): boolean =>
  department === rolesTypes.IT || department === rolesTypes.IT_INNOVACION;

export const isPriceRequested = (estadoLastPrecioAcordado: number): boolean =>
  estadoLastPrecioAcordado > estadoPrecioAcordadoEnum.INICIAL;
/**
 *
 * @param mimeType
 * @param base64
 * @param fileName
 * @param extension
 */

export const esProduccion = process.env.REACT_APP_API_ENV === 'PRODUCTION';

export const mergePaginationResponses = (
  responses: Array<IGenericResponse<any> | null>
) => {
  return responses.reduce(
    (finalResponse, currentResponse) => {
      if (currentResponse) {
        const aux = {
          items: finalResponse?.items.length
            ? finalResponse.items.concat(currentResponse.items)
            : currentResponse.items,
          totalCount:
            (finalResponse?.totalCount || 0) +
            (currentResponse.totalCount || 0),
          currentPage: 0,
        };
        return aux;
      }
      return finalResponse;
    },
    {
      items: [],
      totalCount: 0,
      currentPage: 0,
    }
  );
};

export const fetchDocumentos = async (promise: Promise<any> | null) => {
  try {
    const res = await promise;
    return res;
  } catch {
    return {
      items: [],
      totalCount: 0,
    };
  }
};

export const parseAccionesRequeridas = (
  res: IAccionRequeridaGenericResponse
) => {
  if (res?.items?.length) {
    return {
      ...res,
      items: res.items.map((row: IAccionRequerida) => {
        return {
          ...row,
          tipoDocumentoNombre: `${row?.tipo?.description} ${row?.descripcion}`,
          pendienteValidar: true,
        };
      }),
    };
  }
};

export const addEmailsToUrl = (emails: string[], url: string) => {
  let newUrl = `${url}${url.includes('?') ? '&' : '?'}`;
  emails.forEach((email: string, index: number) => {
    newUrl += `emailsDestinatarios=${email}`;
    if (index < emails.length - 1) {
      newUrl += '&';
    }
  });
  return newUrl;
};

export const isValidPostalCode = (cp: string) =>
  cp.match(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/);

export const setStringSortOrder = (order: number): string | null => {
  if (order === 1) {
    return 'ASC';
  }
  if (order === -1) {
    return 'DESC';
  }
  return null;
};

export const addPagos = (pagos: IPago[]) => {
  return {
    type: ADD_PAGO,
    payload: {
      pagos,
    },
  };
};

export const resetPago = () => {
  return {
    type: RESET,
  };
};

export const checkDocumentoIsFromERP = (valorTipoNombre: string): boolean => {
  if (valorTipoNombre === 'Documento de evidencias') return true;
  return false;
};

export const compareObjectsByCreationTimeAndAnclada = (items: any) => {
  items.sort((a: any, b: any) => {
    if (a.anclada !== b.anclada) {
      return a.anclada ? -1 : 1;
    }
    const dateA = new Date(a.creationTime).getTime();
    const dateB = new Date(b.creationTime).getTime();
    return dateB - dateA;
  });

  return items;
};

export const incrementString = (str: string, increment: number) => {
  if (str.match(/[0-9+]+/g)) {
    const numbers = str.replace(/[a-z+]+/g, '');
    return str.replace(
      numbers,
      `${Number(numbers) + increment}`.padStart(numbers.length, '0')
    );
  }
  return str + 1;
};
