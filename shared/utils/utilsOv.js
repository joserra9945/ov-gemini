/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { store } from 'react-notifications-component';
import { Column } from 'primereact/column';
import { faFileExcel } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  deniedEffect,
  estadoEfectoCliente,
  formasJuridicasAutonomosEnum,
  tipoFormaContactoEnum,
  tipoPlataforma,
  tipoSociedadSocioEnum,
} from '@shared/utils/constants';

import notifications from './notifications';

export const mensajeOK = (title, message) => {
  store.addNotification({
    title,
    message,
    type: 'success',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 5000,
      showIcon: true,
    },
  });
};

export const mensajeKO = (title, message) => {
  store.addNotification({
    title,
    message,
    type: 'danger',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 5000,
      showIcon: true,
    },
  });
};

export const parseToColumns = (cols) =>
  cols?.map(
    ({ id, body, header = '', style, hidden = false, className = '' }) => {
      if (hidden) return null;
      return (
        <Column
          key={id}
          body={body}
          className={className}
          header={header}
          style={style}
        />
      );
    }
  );

export const esAutonomo = () => {
  return (
    formasJuridicasAutonomosEnum.find(
      (el) => el?.id === parseInt(sessionStorage.getItem('formaJuridicaId'), 10)
    )?.id === parseInt(sessionStorage.getItem('formaJuridicaId'), 10)
  );
};

export const esSocio = () => {
  return tipoSociedadSocioEnum.find(
    (el) => el?.id === parseInt(sessionStorage.getItem('formaJuridicaId'), 10)
  );
};

export const checkIfDNIIsComplete = (element) => {
  return element.validez && element.files.length;
};

export const ficheroNoExisteTemplate = (data) => (
  <span className="table-icons__container">
    {!data.file && (
      <FontAwesomeIcon icon={faFileExcel} style={{ fontSize: '2em' }} />
    )}
  </span>
);

export const formatIban = (iban) => {
  if (!iban) {
    return '';
  }

  const cleanIban = iban
    .replace(/\s\s+/g, ' ')
    .replace(/[^0-9a-zA-Z]/gi, '')
    .toUpperCase();

  const parts = [];

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

export const calendarES = {
  firstDayOfWeek: 1,
  dayNames: [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ],
  dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ],
  monthNamesShort: [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic',
  ],
  today: 'Hoy',
  clear: 'Limpiar',
};

export const groupBy = (objectArray, property) => {
  return Object.entries(
    objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {})
  );
};

export const base64toBlob = (base64Data, contentType = '') => {
  if (!base64Data) return null;
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; sliceIndex += 1) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; i += 1, offset += 1) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
};

export const blobToBase64 = (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = () => {
    return reader.result;
  };
};

export const binaryToBlob = (file) => {
  return new Blob([file], { type: 'application/pdf' });
};

export const FileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const deleteStateItemForArrayByIndex = (
  prevState,
  item,
  position = 1
) => {
  const newState = [...prevState];
  const index = newState.indexOf(item);
  if (index > -1) {
    newState.splice(index, position);
  }
  return newState;
};

export const getElementArrayById = (array, id) =>
  array.find((x) => x.id === id);

export const editStateItemInArray = (prevState, element) => {
  const newState = [...prevState];
  const index = newState.findIndex((x) => x.id === element.id);
  newState[index] = element;
  return newState;
};

export const activeRoutes = (routes) => {
  const split = window.location.pathname.split('/')[1];
  let route = null;
  if (!split) return ['1'];
  route = routes.find((x) => x.match === split);
  if (!route) return ['1'];
  return [`${route.key}`];
};

export const DNINotification = () => {
  notifications.warning({
    title: 'Revise los campos del DNI.',
    body: 'Alguno/s de los representantes tienen los datos del DNI (fecha validez, foto) incompletos, estos campos son obligatorios si se introduce uno de ellos.',
  });
};

export const fieldHasError = (errors, property) => {
  if (!errors) return false;
  if (!errors[property]) return false;
  return errors[property].message;
};

export const fieldArrayHasError = (
  errors,
  fieldArrayProperty,
  index,
  property
) => {
  if (errors && !errors[fieldArrayProperty]) return false;
  if (errors && !errors[fieldArrayProperty][index]) return false;
  if (errors && errors[fieldArrayProperty][index] === undefined) return false;
  if (errors && !errors[fieldArrayProperty][index][property]) return false;
  return errors && errors[fieldArrayProperty][index][property].message;
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

const formatNumberLength = (num, length) => {
  let r = `${num}`;
  while (r.length < length) {
    r = `0${r}`;
  }
  return r;
};

const charDNI = (dni) => {
  const chain = 'TRWAGMYFPDXBNJZSQVHLCKET';
  const pos = dni % 23;
  return chain.substring(pos, pos + 1);
};

const getRandomNumber = () => {
  const arr = new Uint32Array(2);
  crypto.getRandomValues(arr);

  // keep all 32 bits of the the first, top 20 of the second for 52 random bits
  // eslint-disable-next-line no-bitwise
  const mantissa = arr[0] * 2 ** 20 + (arr[1] >>> 12);

  // shift all 52 bits to the right of the decimal point
  return mantissa * 2 ** -52;
};

export const randomNIF = () => {
  const num = Math.floor(getRandomNumber() * 100000000);
  const sNum = formatNumberLength(num, 8);
  return sNum + charDNI(sNum);
};

/**
 *  String of params query of a endpoint mounted by back-end criteria
 * @param endpoint
 * @param queryState
 * @returns {string}
 */
export const queryFixer = (queryState) => {
  if (!Object.keys(queryState).length) return '';
  return `?${
    queryState.maxResult ? `&MaxResultCount=${queryState.maxResult}` : ''
  }${queryState.skipCount ? `&SkipCount=${queryState.skipCount}` : ''}${
    queryState.sortingCriteria
      ? `&SortingCriteria=${queryState.sortingCriteria?.property}%20${queryState.sortingCriteria?.sort}`
      : ''
  }${queryState.params && `${queryState.params}`}`;
};

export const isSelectableEffect = (efecto, tipoDocumento) => {
  const sameType = tipoDocumento ? efecto?.tipo?.id === tipoDocumento : true;
  // efecto.estadoEfectoClienteId === estadoEfectoCliente.APROBADO || !esDenegadoPRAS(efecto.scoring
  return (
    !deniedEffect.includes(efecto.estadoFinanciacionId) &&
    ![
      estadoEfectoCliente.PENDIENTE,
      estadoEfectoCliente.RECHAZADO,
      estadoEfectoCliente.PERDIDO,
    ].includes(efecto.estadoEfectoClienteId) &&
    sameType
  );
};

export const radioYesNoValues = {
  YES: 1,
  NO: 2,
};

export const parseRadioYesNoToNumber = (variable) =>
  typeof variable === 'boolean'
    ? variable
      ? radioYesNoValues.YES
      : radioYesNoValues.NO
    : variable;

export const downloadFile = (data) => {
  const a = document.createElement('a');
  const blob = binaryToBlob(data?.file);

  a.href = URL.createObjectURL(blob);
  a.download = `Documento de ${data.tipoDocumentoNombre}.pdf`;
  a.click();
};

export const parseEnumForSelect = (tmpEnum) => {
  const keys = Object.keys(tmpEnum);

  return keys.map((key) => ({
    id: +key,
    value: tmpEnum[key],
  }));
};

const isAnIncompletedAdress = (address) => {
  const ignoredProperties = ['descripcion', 'notificacionesActivas'];

  let res = false;

  res = Object.keys(address).find((key) => {
    if (!ignoredProperties.includes(key) && !address[key]) {
      return address;
    }
    return false;
  });

  return res;
};
export const hasFormasContacto = (formasContacto) => {
  return (
    formasContacto.some((item) => item?.tipo === tipoFormaContactoEnum.MOVIL) &&
    formasContacto.some((item) => item?.tipo === tipoFormaContactoEnum.EMAIL)
  );
};

export const getInfoByIncompleteCompany = (companies) => {
  return companies.find((company) => {
    const { formasContacto, direccionSocial } = company || {};
    if (
      !direccionSocial ||
      (direccionSocial && isAnIncompletedAdress(company?.direccionSocial)) ||
      (formasContacto && !hasFormasContacto(formasContacto))
    ) {
      return {
        id: company?.id,
        direccionSocial: company?.direccionSocial,
        formasContacto: company?.formasContacto,
      };
    }

    return null;
  });
};

export const prepareDataFromFormasContacto = (formData) => {
  const dataToCreate = [];
  if (formData.email && !formData.emailId) {
    dataToCreate.push({
      tipo: tipoFormaContactoEnum.EMAIL,
      valor: formData.email,
    });
  }
  if (formData.movil && !formData.movilId) {
    dataToCreate.push({
      tipo: tipoFormaContactoEnum.MOVIL,
      valor: formData.movil,
    });
  }

  const dataToUpdate = [];
  if (formData.email && formData.emailId) {
    dataToUpdate.push({
      tipo: tipoFormaContactoEnum.EMAIL,
      valor: formData.email,
      id: formData.emailId,
      lastModificationTime: formData.emailLmt,
    });
  }
  if (formData.movil && formData.movilId) {
    dataToUpdate.push({
      tipo: tipoFormaContactoEnum.MOVIL,
      valor: formData.movil,
      id: formData.movilId,
      lastModificationTime: formData.movilLmt,
    });
  }
  return [dataToCreate, dataToUpdate];
};

export const parseDataFromDireccion = (direccion) => {
  return {
    tipo: direccion?.tipoDireccion?.id || null,
    pais: direccion?.paisId
      ? {
          id: direccion?.paisId,
          nombre: direccion?.paisNombre,
        }
      : null,
    direccion: direccion?.calle || null,
    codigoPostal: direccion?.codigoPostal || null,
    provincia: direccion?.provinciaId
      ? {
          id: direccion?.provinciaId,
          nombre: direccion?.provinciaNombre,
        }
      : null,
    poblacion: direccion?.poblacionId
      ? {
          id: direccion?.poblacionId,
          nombre: direccion?.poblacionNombre,
        }
      : null,
    id: direccion?.id,
    lastModificationTime: direccion?.lastModificationTime,
  };
};

export const mergePaginationResponses = (responses) => {
  if (Array.isArray(responses)) {
    return responses?.reduce(
      (finalResponse, currentResponse) => {
        if (currentResponse) {
          return {
            items: finalResponse?.items?.length
              ? finalResponse.items?.concat(currentResponse.items)
              : currentResponse.items,
            totalCount:
              (finalResponse?.totalCount || 0) +
              (currentResponse.totalCount || 0),
            currentPage: 0,
          };
        }
        return finalResponse;
      },
      {
        items: [],
        totalCount: 0,
        currentPage: 0,
      }
    );
  }
  throw new Error('must be an array');
};

export const parseAccionesRequeridas = (res) => {
  if (res?.items?.length) {
    return {
      ...res,
      items: res.items.map((row) => {
        return {
          ...row,
          tipoDocumentoNombre: `${row?.tipo.description} ${
            row?.descripcion || ''
          }`,
          pendienteValidar: true,
          esAccionRequerida: true,
        };
      }),
    };
  }
};

export const fetchDocumentos = async (promise) => {
  try {
    const res = await promise;
    return res;
  } catch {
    return {
      items: [],
      totalCout: 0,
    };
  }
};

export const reorderCountries = (countries) => {
  if (!countries?.length) return [];
  const tmpCountries = countries?.filter((row) => row.nombre !== 'España');
  const auxItem = countries?.filter((row) => row.nombre === 'España');
  tmpCountries.unshift(auxItem[0]);
  return tmpCountries;
};

export const checkInitDateIsHigher = (inicio, fin) => {
  if (inicio !== null && inicio !== '' && fin !== null && fin !== '') {
    const d1 = new Date(inicio);
    const d2 = new Date(fin);
    return d1.getTime() >= d2.getTime();
  }
  return false;
};

export const isSamePerson = (oriRep, tmpRep) => {
  return (
    (oriRep?.nombre || '').toUpperCase() ===
      (tmpRep?.nombre || '').toUpperCase() &&
    (oriRep?.apellidos || '').toUpperCase() ===
      (tmpRep?.apellidos || '').toUpperCase()
  );
};

export const verificarPlataforma = (plataforma, isAdUser) => {
  if (
    plataforma?.id === tipoPlataforma.GEFINTECH &&
    process.env.REACT_APP_APP_NAME === 'FINANWAY'
  ) {
    isAdUser
      ? window.location.replace(`${process.env.REACT_APP_MY_ACCOUNT}/login/ops`)
      : window.location.replace(process.env.REACT_APP_PUBLIC_URL);
  } else if (
    plataforma?.id === tipoPlataforma.FINANWAY &&
    process.env.REACT_APP_APP_NAME === 'GEFINTECH'
  ) {
    isAdUser
      ? window.location.replace(`${process.env.REACT_APP_MY_ACCOUNT}/login/ops`)
      : window.location.replace(process.env.REACT_APP_PUBLIC_URL);
  } else return null;
};

export const telefonoContactoFinanway = '900 906 200';
export const telefonoContactoGefintech = '900 263 006';
