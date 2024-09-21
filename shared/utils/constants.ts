import { AxiosRequestConfig } from 'axios';

import { ITipoCesion } from '@shared/interfaces/ITipoCesion';
import { ITiposFirma } from '@shared/interfaces/ITiposFirma';
import { tabMenuEnum } from '@shared/modules/Pras';

import { IOptionEstado } from '@shared/components/Legacy/TurboTable/interfaces';

import { rolesTypes } from './roles/config';

export const oficinaVirtualHub = 'signalr/gefintech/OficinaVirtualHub';
export const notificationHub = 'signalr/notifications/NotificationsHub';
export const alertasHub = 'signalr/gefintech/alertas/AlertasHub';
export const API_GENERIC_GATEWAY = 'api/gefintech';
export const AUTH_URL = 'api/authentication';

export const apiEnvironment = {
  TEST: 'TEST',
  STAGING: 'STAGING',
  PRODUCTION: 'PRODUCTION',
};

export const prasTabs = [
  tabMenuEnum.RESUMEN,
  tabMenuEnum.BALANCE,
  tabMenuEnum.CUENTA_RESULTADOS,
  tabMenuEnum.CARGOS,
  tabMenuEnum.PRODUCTOS,
  tabMenuEnum.ICO,
];

export const axiosConfigBlobFiles: AxiosRequestConfig = {
  responseType: 'blob',
};

export const tipoDocumentoLibrador = {
  KYC: 39,
  PAGARE: 1,
  FACTURA: 2,
  DNI: 3,
  CERTIFICADO_HACIENDA: 38,
  CERTIFICADO_SS: 37,
  IVA_303: 5,
  IVA_1111: 6,
  FACTURA_PAGARE: 10,
  CONTRATO: 11,
  ESCRITURA: 12,
  ENDOSO: 13,
};

export const tipoDocumento = {
  PAGARE: 1,
  FACTURA: 2,
  DNI: 3,
  FACTURA_PAGARE: 10,
  CONTRATO: 11,
  ESCRITURA: 12,
  ENDOSO: 13,
  ENVIO_VERIFICACION: 14,
  TRANSMISION_VERIFICACION: 15,
  ENTREGA_VERIFICACION: 16,
  VERIFICACION: 17,
  ALBARAN: 18,
  CARTA_PAGO: 19,
  FACTURA_PROFORMA: 20,
  CERTIFICACION_OBRA: 21,
  OTRO: 22,
  PARTE_TRABAJO: 23,
  PEDIDO: 24,
  PRESUPUESTO: 25,
  POOL_BANCARIO: 26,
  PREVISION_TESORERIA: 27,
  ESCRITURA_NOMBRAMIENTO_ADMINISTRADOR_APODERADO: 28,
  NIF_DEFINITIVO: 29,
  RECIBO_AUTONOMO: 30,
  MODELO_200: 31,
  MODELO_184: 32,
  MODELO_347: 33,
  MODELO_390: 34,
  MODELO_303: 35,
  CERTIFICADO_TITULARIDAD_CUENTA_BANCARIA: 36,
  CERTIFICADO_SS: 37,
  CERTIFICADO_HACIENDA: 38,
  KYC: 39,
  ESCRITURA_CONSTITUCION: 40,
  OTRAS_ESCRITURAS: 41,
  ACTA_TITULARIDAD_REAL: 42,
  DECLARACION_TITURALIDAD_REAL: 43,
  MODELO_100: 44,
  MODELO_130: 45,
  MODELO_190: 46,
  MEMORIA_EMPRESA_RM: 47,
  MEMORIA_EMPRESA_RM_CONSOLIDADA: 48,
  AVANCE_CUENTAS_ANUALES: 49,
  CUENTA_ANUALES_INDIVIDUAL: 50,
  CUENTA_ANUALE_CONSOLIDADA: 51,
  ELEVACION_PUBLICO_ACUERDOS_SOCIALES: 52,
  ESPECIFICACION_DEL_ESTUDIO_PRESTAMO: 53,
  AUTO_CONCURSO: 54,
  CONTRATO_OBRA: 55,
  PLAN_NEGOCIO: 56,
  FOTO: 57,
  EVIDENCIA_FIRMA_DIGITAL: 58,
  BUROFAX: 59,
  CARTA_CESION: 60,
  CONTRATO_CESION: 61,
  TOMA_RAZON: 62,
  ENDOSO_TRUNCADO: 63,
  IVA_MODELO_303_PAGO: 64,
  IVA_MODELO_303_APLAZAMIENTO: 65,
  IVA_MODELO_303_PAGO_APLAZAMIENTO: 66,
  IVA_MODELO_390_PAGO: 67,
  IVA_MODELO_390_APLAZAMIENTO: 68,
  IVA_MODELO_390_PAGO_APLAZAMIENTO: 69,
  IRPF_MODELO_111: 70,
  IRPF_MODELO_111_PAGO: 71,
  IRPF_MODELO_111_APLAZAMIENTO: 72,
  IRPF_MODELO_111_PAGO_APLAZAMIENTO: 73,
  IRPF_MODELO_130_PAGO: 74,
  IRPF_MODELO_130_APLAZAMIENTO: 75,
  IRPF_MODELO_130_PAGO_APLAZAMIENTO: 76,
  IRPF_MODELO_100_PAGO: 77,
  IRPF_MODELO_100_APLAZAMIENTO: 78,
  IRPF_MODELO_100_PAGO_APLAZAMIENTO: 79,
  IRPF_MODELO_190_PAGO: 80,
  IRPF_MODELO_190_APLAZAMIENTO: 81,
  IRPF_MODELO_190_PAGO_APLAZAMIENTO: 82,
  IS_MODELO_200_PAGO: 83,
  IS_MODELO_200_APLAZAMIENTO: 84,
  IS_MODELO_200_PAGO_APLAZAMIENTO: 85,
  MODELO_340_DECLARACION: 86,
  CERTIFICADO_SS_PAGO: 88,
  CERTIFICADO_SS_APLAZAMIENTO: 89,
  CERTIFICADO_SS_PAGO_APLAZAMIENTO: 90,
  CERTIFICADO_HACIENDA_PAGO: 91,
  CERTIFICADO_HACIENDA_APLAZAMIENTO: 92,
  CERTIFICADO_HACIENDA_PAGO_APLAZAMIENTO: 93,
  CERTIFICADO_HACIENDA_RELACION_DEUDAS: 94,
  ACEPTACION_NO_ENVIADA: 65,
  ENVIO_ACEPTACION: 95,
  TRANSMISION_ACEPTACION: 96,
  ENTREGA_ACEPTACION: 97,
  ACEPTACION: 98,
  RESPUESTA_ACEPTACION: 99,
  RESPUESTA_VERIFICACION: 100,
  DEVOLUCION_PAGARE: 110,
  JUSTIFICANTE_DE_TRANSFERENCIA: 114,
};

export const tipoDocumentoWithFechaEmision = [
  tipoDocumento.MODELO_303,
  tipoDocumento.MODELO_390,
  tipoDocumento.MODELO_184,
  tipoDocumento.IRPF_MODELO_111,
  tipoDocumento.MODELO_130,
  tipoDocumento.MODELO_100,
  tipoDocumento.MODELO_190,
  tipoDocumento.MODELO_200,
  tipoDocumento.MODELO_340_DECLARACION,
  tipoDocumento.MODELO_347,
  tipoDocumento.RECIBO_AUTONOMO,
  tipoDocumento.CERTIFICADO_SS,
  tipoDocumento.CERTIFICADO_HACIENDA,
  tipoDocumento.CUENTA_ANUALES_INDIVIDUAL,
  tipoDocumento.CUENTA_ANUALE_CONSOLIDADA,
  tipoDocumento.AVANCE_CUENTAS_ANUALES,
];

export const isAnEffect = [tipoDocumento.FACTURA, tipoDocumento.PAGARE];

export const NOT_EDITED_DOCS = [
  tipoDocumento.CARTA_CESION,
  tipoDocumento.CONTRATO,
  tipoDocumento.CONTRATO_CESION,
];

export const tipoAccionRequerida = {
  VALIDAR_CUENTA: 1,
  FIRMA_CESION_NOTARIO: 2,
  ADD_REPRESENTANTE: 3,
  VINCULAR_FACTURA_PAGARE: 4,
  ENVIAR_PAGARE: 5,
};

export const tiposFirma: ITiposFirma[] = [
  {
    id: 1,
    description: 'Parcial',
  },
  {
    id: 2,
    description: 'Completa',
  },
];

export const burofaxesFilesType = {
  ENVIO_XML: 1,
  ADJUNTO: 2,
  PEE_XML: 3,
  PEED_PDF: 4,
  CEE_XML: 5,
  CEE_PDF: 6,
  CCE_XML: 7,
  CCE_PDF: 8,
};

export const tiposFirmaEnum = {
  PARCIAL: 1,
  COMPLETA: 2,
};

export const basicGenericResponse = {
  items: [],
  totalCount: 0,
  currentPage: 0,
  totales: {},
};

export const tipoCesion: ITipoCesion[] = [
  {
    id: 1,
    description: 'Futuros',
  },
  {
    id: 2,
    description: 'Contrato',
  },
];

export const tipoCesionEnum = {
  FUTUROS: 1,
  CONTRATO: 2,
};

export const selectTableButtonValue = {
  ACTIVA: 0,
  HISTORIAL: 1,
};

export const selectTableButtonTipoContacto = {
  PERSONAS: 0,
  EMPRESA: 1,
};

export const selectTableButtonDevolucion = {
  PAGOS: 0,
  DEVOLUCIONES: 1,
};

export const selectVinculadosTableButtonValue = {
  PENDIENTES: 0,
  VINCULADOS: 1,
};

export const estadoCesionEnum = {
  PteComunicar: 1,
  Comunicada: 2,
  AceptadaManualmente: 3,
  AceptadaPorLibrado: 4,
  Cancelada: 5,
  Finalizada: 6,
  Rechazada: 7,
};

export const ESTADO_CESION = [
  {
    value: estadoCesionEnum.PteComunicar,
    label: 'Pte. Comunicar',
    query: `&Estados=${estadoCesionEnum.PteComunicar}`,
  },
  {
    value: estadoCesionEnum.Comunicada,
    label: 'Comunicada',
    query: `&Estados=${estadoCesionEnum.Comunicada}`,
  },
  {
    value: estadoCesionEnum.AceptadaPorLibrado,
    label: 'Aceptada',
    query: `&Estados=${estadoCesionEnum.AceptadaPorLibrado}`,
  },
  {
    value: estadoCesionEnum.AceptadaManualmente,
    label: 'Aceptada Manualmente',
    query: `&Estados=${estadoCesionEnum.AceptadaManualmente}`,
  },
  {
    value: estadoCesionEnum.Cancelada,
    label: 'Cancelada',
    query: `&Estados=${estadoCesionEnum.Cancelada}`,
  },
  {
    value: estadoCesionEnum.Finalizada,
    label: 'Finalizada',
    query: `&Estados=${estadoCesionEnum.Finalizada}`,
  },
  {
    value: estadoCesionEnum.Rechazada,
    label: 'Rechazada',
    query: `&Estados=${estadoCesionEnum.Rechazada}`,
  },
];

export const estadoFirmaCesionEnum = {
  PendienteFirmaDigitalmente: 1,
  FirmaDigitalmente: 2,
  PendienteSolicitarFirmaAnteNotario: 3,
  FirmaAnteNotarioSolicitada: 4,
  SolicitudFirmaConfirmada: 5,
  ContratoGenerado: 6,
  EnviandoContratoNotaria: 7,
  ContratoEnviadoNotaria: 8,
  FirmadaNotario: 9,
  FirmaDigitalRechazada: 10,
};

export const ESTADO_FIRMA = [
  {
    value: estadoFirmaCesionEnum.PendienteFirmaDigitalmente,
    label: 'Pendiente firma digital',
    query: `&EstadosFirma=${estadoFirmaCesionEnum.PendienteFirmaDigitalmente}`,
  },
  {
    value: estadoFirmaCesionEnum.FirmaDigitalmente,
    label: 'Firmada digitalmente',
    query: `&EstadosFirma=${estadoFirmaCesionEnum.FirmaDigitalmente}`,
  },
  {
    value: estadoFirmaCesionEnum.PendienteSolicitarFirmaAnteNotario,
    label: 'Pendiente de firma ante notario',
    query: `&EstadosFirma=${estadoFirmaCesionEnum.PendienteSolicitarFirmaAnteNotario}`,
  },
  {
    value: estadoFirmaCesionEnum.FirmaAnteNotarioSolicitada,
    label: 'Firma ante notario solicitada',
    query: `&EstadosFirma=${estadoFirmaCesionEnum.FirmaAnteNotarioSolicitada}`,
  },
  {
    value: estadoFirmaCesionEnum.SolicitudFirmaConfirmada,
    label: 'Solicitud de firma confirmada',
    query: `&EstadosFirma=${estadoFirmaCesionEnum.SolicitudFirmaConfirmada}`,
  },
  {
    value: estadoFirmaCesionEnum.ContratoGenerado,
    label: 'Contrato generado',
    query: `&EstadosFirma=${estadoFirmaCesionEnum.ContratoGenerado}`,
  },
  {
    value: estadoFirmaCesionEnum.EnviandoContratoNotaria,
    label: 'Enviando contrato a notaría',
    query: `&EstadosFirma=${estadoFirmaCesionEnum.EnviandoContratoNotaria}`,
  },
  {
    value: estadoFirmaCesionEnum.ContratoEnviadoNotaria,
    label: 'Contrato enviado notaría',
    query: `&EstadosFirma=${estadoFirmaCesionEnum.ContratoEnviadoNotaria}`,
  },
  {
    value: estadoFirmaCesionEnum.FirmadaNotario,
    label: 'Firmada ante notario',
    query: `&EstadosFirma=${estadoFirmaCesionEnum.FirmadaNotario}`,
  },
  {
    value: estadoFirmaCesionEnum.FirmaDigitalRechazada,
    label: 'Firma digital rechazada',
    query: `&EstadosFirma=${estadoFirmaCesionEnum.FirmaDigitalRechazada}`,
  },
];

export const conceptos = [
  {
    id: 1,
    value: 'Factoring',
  },
  {
    id: 2,
    value: 'Descuento de Pagarés',
  },
  {
    id: 3,
    value: 'Cesiones',
  },
];

export const estadosPago = {
  PENDIENTE: 0,
  NOAUTORIZADO: 1,
  AUTORIZADO: 2,
  IMPRIMIR: 3,
  EMITIDO: 4,
};

export const ESTADO_PAGO = (defaultFilter: boolean) => [
  {
    value: estadosPago.PENDIENTE,
    label: 'Pendiente',
    query: `&Estados=${estadosPago.PENDIENTE}`,
    unchecked: !defaultFilter,
  },
  {
    value: estadosPago.NOAUTORIZADO,
    label: 'No autorizado',
    query: `&Estados=${estadosPago.NOAUTORIZADO}`,
    unchecked: !defaultFilter,
  },
  {
    value: estadosPago.AUTORIZADO,
    label: 'Autorizado',
    query: `&Estados=${estadosPago.AUTORIZADO}`,
  },
  {
    value: estadosPago.IMPRIMIR,
    label: 'Impreso',
    query: `&Estados=${estadosPago.IMPRIMIR}`,
  },
];

export const ESTADO_PAGO_HISTORIAL = [
  {
    value: estadosPago.EMITIDO,
    label: 'Emitido',
    query: `&Estados=${estadosPago.EMITIDO}`,
  },
];

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

export const tipoFormaContactoEnum = {
  EMAIL: 1,
  MOVIL: 2,
  TELEFONO: 3,
  FAX: 4,
  WEB: 5,
};

export const tipoFormaContactoNombreEnum = [
  {
    description: 'Email',
    id: 1,
  },
  {
    description: 'Teléfono móvil',
    id: 2,
  },
  {
    description: 'Teléfono fijo',
    id: 3,
  },
  {
    description: 'Fax',
    id: 4,
  },
  {
    description: 'Web',
    id: 5,
  },
];

export const tipoDireccionEnum = {
  SOCIAL: 1,
  COMERCIAL: 2,
};

export const tipoScoringEnum = [
  {
    description: 'Z',
    id: 1,
  },
  {
    description: 'AAA',
    id: 2,
  },
  {
    description: 'AA+',
    id: 3,
  },
  {
    description: 'AA',
    id: 4,
  },
  {
    description: 'AA-',
    id: 5,
  },
  {
    description: 'A+',
    id: 6,
  },
  {
    description: 'A',
    id: 7,
  },
  {
    description: 'A-',
    id: 8,
  },
  {
    description: 'BBB',
    id: 9,
  },
  {
    description: 'BB+',
    id: 10,
  },
  {
    description: 'BB',
    id: 11,
  },
  {
    description: 'BB-',
    id: 12,
  },
  {
    description: 'B+',
    id: 13,
  },
  {
    description: 'B',
    id: 14,
  },
  {
    description: 'B-',
    id: 15,
  },
  {
    description: 'CCC',
    id: 16,
  },
  {
    description: 'CC+',
    id: 17,
  },
  {
    description: 'CC',
    id: 18,
  },
  {
    description: 'CC-',
    id: 19,
  },
  {
    description: 'C+',
    id: 20,
  },
  {
    description: 'C',
    id: 21,
  },
  {
    description: 'C-',
    id: 25,
  },
  {
    description: 'D',
    id: 23,
  },
  {
    description: 'E',
    id: 22,
  },
  {
    description: 'M',
    id: 24,
  },
];

export const estadosDevolucion = {
  PENDIENTE: 0,
  NOAUTORIZADO: 1,
  AUTORIZADO: 2,
  IMPRIMIR: 3,
  EMITIDO: 4,
};
export const estadosOperaciones = {
  GENERANDO_CONTRATO: 0,
  ENVIANDO_CONTRATO: 1,
  CONTRATO_NO_ENVIADO: 2,
  PENDIENTE_FIRMA: 3,
  FIRMADA: 4,
  PENDIENTE_PAGO: 5,
  PAUSADA: 6,
  CERRADA: 7,
  PARCIALMENTE_PAGADA: 8,
  PAGADA: 9,
  INVALIDADA: 10,
  PERDIDA: 11,
};
export const riesgosITDtos = {
  roles: [rolesTypes.IT, rolesTypes.IT_INNOVACION, rolesTypes.RIESGOS],
  estadoOperacion: [estadosOperaciones.PAGADA],
};
export const comercialDtos = {
  roles: [rolesTypes.COMERCIAL, rolesTypes.CONTACT_CENTER, rolesTypes.CRM],
  estadoOperacion: [
    estadosOperaciones.PENDIENTE_PAGO,
    estadosOperaciones.CERRADA,
    estadosOperaciones.PARCIALMENTE_PAGADA,
    estadosOperaciones.PAGADA,
    estadosOperaciones.CONTRATO_NO_ENVIADO,
    estadosOperaciones.PERDIDA,
    estadosOperaciones.FIRMADA,
  ],
};

// Estados Operaciones

export const estadosDocumentos = {
  PENDIENTE: 1,
  VALIDADO: 2,
  RECHAZADO: 3,
  DUDOSO: 4,
  ELIMINADO: 5,
};

export const estadosEstudio = {
  Pendiente: 1,
  EnEstudio: 2,
  Cerrado: 3,
};

export const estadosEstudioFinaciacion = {
  Pendiente: 1,
  Aprobado: 2,
  Denegado: 3,
  Perdido: 4,
};

// Riesgos
export const estadosEfectosFinanciacion = {
  PENDIENTE: 1,
  EN_ESTUDIO: 2,
  APROBADO: 3,
  DENEGADO: 4,
  PERDIDO: 5,
  NO_FINANCIABLE: 6,
  DEVUELTO: 7,
};

export const showDescriptionEfecto = [
  estadosEfectosFinanciacion.APROBADO,
  estadosEfectosFinanciacion.DENEGADO,
  estadosEfectosFinanciacion.PERDIDO,
];

// Verificaciones
export const estadosEstudioVerificacion = {
  VARIOS: -1,
  NO_GENERADA: 0,
  PENDIENTE: 1,
  GENERANDO: 2,
  ENVIADA: 3,
  ERROR_ENVIO: 4,
  RECIBIDA: 5,
  ACEPTADA: 6,
  RECHAZADO: 7,
};

export const origenEnum = {
  EXTERNO: 1,
  INTERNO: 2,
};

export const destinoPagos = {
  CLIENTE: 0,
  HACIENDA_SS: 1,
  IMPAGO: 2,
};

export const estadoVentaAFondoEnum = {
  PENDIENTE: 0,
  EN_CURSO: 1,
  FINALIZADA: 2,
};

export const colorEstadoVenta = {
  PENDIENTE: '#ff961c',
  EN_CURSO: '#004ad1',
  FINALIZADA: '#30d59b',
};

export const optionsEstadoVenta: IOptionEstado[] = [
  {
    label: 'Pendiente',
    value: estadoVentaAFondoEnum.PENDIENTE,
    query: `&Estados=${estadoVentaAFondoEnum.PENDIENTE}`,
    color: colorEstadoVenta.PENDIENTE,
  },
  {
    label: 'En curso',
    value: estadoVentaAFondoEnum.EN_CURSO,
    query: `&Estados=${estadoVentaAFondoEnum.EN_CURSO}`,
    color: colorEstadoVenta.EN_CURSO,
  },
  {
    label: 'Finalizada',
    value: estadoVentaAFondoEnum.FINALIZADA,
    query: `&Estados=${estadoVentaAFondoEnum.FINALIZADA}`,
    color: colorEstadoVenta.FINALIZADA,
  },
];

export const estadosDocumentosRevision = {
  PENDIENTE: 1,
  VALIDADO: 2,
  RECHAZADO: 3,
};
const colorsEnum = {
  PENDIENTE: '#f5b44d',
  VALIDADO: 'rgb(60, 173, 60)',
  RECHAZADO: '#2e2d2d',
};
export const estadoRevisionFilterOptions = (): IOptionEstado[] => [
  {
    label: 'Pendiente',
    value: estadosDocumentosRevision.PENDIENTE,
    query: `&estadosRevision=${estadosDocumentosRevision.PENDIENTE}`,
    color: colorsEnum.PENDIENTE,
  },
  {
    label: 'Validado',
    value: estadosDocumentosRevision.VALIDADO,
    query: `&estadosRevision=${estadosDocumentosRevision.VALIDADO}`,
    color: colorsEnum.VALIDADO,
    unchecked: true,
  },
  {
    label: 'Rechazado',
    value: estadosDocumentosRevision.RECHAZADO,
    query: `&estadosRevision=${estadosDocumentosRevision.RECHAZADO}`,
    color: colorsEnum.RECHAZADO,
  },
];

export const DESTINOS_PAGOS = [
  {
    value: destinoPagos.CLIENTE,
    label: 'Cliente',
    query: `&Destinos=${destinoPagos.CLIENTE}`,
  },
  {
    value: destinoPagos.HACIENDA_SS,
    label: 'Hacienda / Seguridad Social',
    query: `&Destinos=${destinoPagos.HACIENDA_SS}`,
  },
  {
    value: destinoPagos.IMPAGO,
    label: 'Impago',
    query: `&Destinos=${destinoPagos.IMPAGO}`,
  },
];

export const plazoFinalizacion = [
  {
    descripcion: 'Menos de 3 meses',
    lastModificationTime: null,
    id: 1,
  },
  {
    descripcion: '3 / 6 meses',
    lastModificationTime: null,
    id: 2,
  },
  {
    descripcion: '6 / 12 meses',
    lastModificationTime: null,
    id: 3,
  },
  {
    descripcion: '12 / 24 meses',
    lastModificationTime: null,
    id: 4,
  },
  {
    descripcion: '24 / 36 meses',
    lastModificationTime: null,
    id: 5,
  },
  {
    descripcion: '36 / 48 meses',
    lastModificationTime: null,
    id: 6,
  },
];

export const initialQueryState = {
  maxResult: 10,
  skipCount: 0,
  params: '',
  sortingCriteria: null,
};

export const estadoPrecioAcordadoEnum = {
  INICIAL: 0,
  SOLICITADO: 1,
  MODIFICADO: 2,
  APROBADO: 3,
  FINAL: 4,
};

export const estadoPrecioAcordado = [
  {
    value: estadoPrecioAcordadoEnum.INICIAL,
    label: 'Inicial',
    query: `&EstadosPrecio=${estadoPrecioAcordadoEnum.INICIAL}`,
  },
  {
    value: estadoPrecioAcordadoEnum.SOLICITADO,
    label: 'Solicitado',
    query: `&EstadosPrecio=${estadoPrecioAcordadoEnum.SOLICITADO}`,
  },
  {
    value: estadoPrecioAcordadoEnum.MODIFICADO,
    label: 'Modificado',
    query: `&EstadosPrecio=${estadoPrecioAcordadoEnum.MODIFICADO}`,
  },
  {
    value: estadoPrecioAcordadoEnum.APROBADO,
    label: 'Aprobado',
    query: `&EstadosPrecio=${estadoPrecioAcordadoEnum.APROBADO}`,
  },
  {
    value: estadoPrecioAcordadoEnum.FINAL,
    label: 'Final',
    query: `&EstadosPrecio=${estadoPrecioAcordadoEnum.FINAL}`,
  },
];

export const estadoPrecioAcordadoOperacion = [
  {
    value: estadoPrecioAcordadoEnum.INICIAL,
    label: 'Inicial',
    query: `&EstadosPrecios=${estadoPrecioAcordadoEnum.INICIAL}`,
  },
  {
    value: estadoPrecioAcordadoEnum.SOLICITADO,
    label: 'Solicitado',
    query: `&EstadosPrecios=${estadoPrecioAcordadoEnum.SOLICITADO}`,
  },
  {
    value: estadoPrecioAcordadoEnum.MODIFICADO,
    label: 'Modificado',
    query: `&EstadosPrecios=${estadoPrecioAcordadoEnum.MODIFICADO}`,
  },
  {
    value: estadoPrecioAcordadoEnum.APROBADO,
    label: 'Aprobado',
    query: `&EstadosPrecios=${estadoPrecioAcordadoEnum.APROBADO}`,
  },
  {
    value: estadoPrecioAcordadoEnum.FINAL,
    label: 'Final',
    query: `&EstadosPrecios=${estadoPrecioAcordadoEnum.FINAL}`,
  },
];

export const formasJuridicasAutonomosEnum = [
  {
    description: 'NIF sin NIE',
    id: 10,
  },
  {
    description: 'Extranjero con NIE hasta 2008',
    id: 19,
  },
  {
    description: 'Extranjero con NIE desde 2008',
    id: 20,
  },
  {
    description: 'Letra reservada',
    id: 21,
  },
  {
    description: 'Personsa con DNI',
    id: 22,
  },
];

// {"1":"Autónomo","2":"Empresa privada","3":"Empresa pública","4":"Organismo público"}

export const estadosTomaRazon = {
  PENDIENTE_GENERAR: 1,
  GENERACION_SOLICITADA: 2,
  ERROR_GENERANDO: 3,
  PENDIENTE_FIRMAR: 4,
  FIRMADA_LIBRADOR: 5,
  FIRMADA_LIBRADOR_VALIDADA: 6,
  FIRMADA_ORGANISMO_PUBLICO: 7,
};

export const estadosBurofaxes = {
  PENDIENTE: 1,
  RECHAZADO: 2,
  ADMITIDO: 3,
  FINALIZADO: 4,
  NO_ENVIADO: -1,
};

export const canCancelBurofaxes = [
  estadosBurofaxes.ADMITIDO,
  estadosBurofaxes.PENDIENTE,
];

export const canSendBurofaxes = [
  estadosBurofaxes.NO_ENVIADO,
  estadosBurofaxes.RECHAZADO,
];

export const canDownloadPruebaEntregaBurofaxes = [estadosBurofaxes.FINALIZADO];

export const estadosFirmaCesion = {
  PTE_FIRMAR_DIGITALMENTE: 1,
  FIRMADA_DIGITALMENTE: 2,
  PTE_SOLICITAR_FIRMA_NOTARIO: 3,
  FIRMA_NOTARIO_SOLICITADA: 4,
  SOLICITUD_FIRMA_CONFIRMADA: 5,
  CONTRATO_GENERADO: 6,
  CONTATO_ENVIADO_NOTARIA: 7,
  FIRMADA_ANTE_NOTARIO: 8,
};

export const canDownloadCesionesFiles = [
  estadosFirmaCesion.CONTRATO_GENERADO,
  estadosFirmaCesion.CONTATO_ENVIADO_NOTARIA,
  estadosFirmaCesion.FIRMADA_ANTE_NOTARIO,
];

export const estadoRepresentante = {
  PENDIENTE_DNI: 1,
  PENDIENTE_REVISION_DNI: 2,
  PENDIENTE_ESCRITURAS: 3,
  REVISANDO_ESCRITURAS: 4,
  EN_REVISION: 5,
  VALIDADO: 6,
  RECHAZADO: 7,
};

export const ADMINISTRADOR_UNICO = 3;

export const estadosCuenta = {
  PENDIENTE: 0,
  REVISANDO: 1,
  VALIDADA: 2,
  RECHAZADA: 3,
};

export const estadosDocumentacionCesionFirma = {
  NO_APLICA: 1,
  PENDIENTE_FIRMA_DIGITAL: 2,
  FIRMA_DIGITAL_ENVIADA: 3,
  FIRMADO_DIGITALMENTE: 4,
  FIRMA_DIGITAL_CANCELADA: 5,
  FIRMA_DIGITAL_RECHAZADA: 6,
  PENDIENTE_FIRMAR_ANTE_NOTARIO: 7,
  FIRMADO_ANTE_NOTARIO: 8,
};

export const estadoEfectosVerificacion = {
  PENDIENTE: 0,
  COMUNICADO: 1,
  VERIFICADO_MANUALMENTE: 2,
  NO_VERIFICADO: 3,
  VERIFICADO: 4,
};

/**
 * Estados comunicado
 */

export const estadoComunicado = {
  NO_GENERADO: 0,
  PENDIENTE_ENVIO: 1,
  GENERANDO: 2,
  ENVIADO: 3,
  ERROR_ENVIO: 4,
  RECIBIDO: 5,
  ACEPTADO: 6,
  RECHAZADO: 7,
};

export const documentoAplazamiento = {
  SIN_ABONAR: 0,
  ABONADA: 1,
};

export const tipoDocumentoVerificacion = {
  ENVIO_VERIFICACION: 14,
  VERIFICACION: 17,
  VERIFICACION_NO_ENVIADA: 64,
  RESPUESTA_VERIFICACION: 100,
};

export const fakeDocumentId = {
  FAKE_DOCUMENT: 'fakeDocument',
};

export const tipoDocumentoAceptacion = {
  ACEPTACION_NO_ENVIADA: 65,
  ENVIO_ACEPTACION: 95,
  TRANSMISION_ACEPTACION: 96,
  ENTREGA_ACEPTACION: 97,
  ACEPTACION: 98,
  RESPUESTA_ACEPTACION: 99,
};

export const typeTableEnum = {
  TABLE_DIRECCION: 0,
  TABLE_CONTACTO: 1,
};

export const selectFilterBasicConfig = {
  menuPosition: 'fixed',
  isClearable: false,
  menuPlacement: 'bottom',
  menuPortalTarget: document.body,
};

export const ESTADO_DNI_REPRESENTANTE_ENUM = {
  PENDIENTE: 0,
  REVISION: 1,
  VALIDADO: 2,
  RECHAZADO: 3,
};

export const ESTADO_CARGO_REPRESENTANTE_ENUM = {
  PENDIENTE_ESCRITURAS: 0,
  REVISION: 1,
  VALIDADO: 2,
  RECHAZADO: 3,
};

export const ESTADO_LIBRADO_ENUM = {
  LIBRADO_CON_EFECTOS: 1,
  LIBRADO_CON_OPERACIONES: 2,
};

export const TABS_INGRESO_ENUM = {
  FACTURAS_PAGADAS: 0,
  FACTURAS_PENDIENTES: 1,
  PAGARES: 2,
  CESIONES: 3,
};

export const ZERO_VALUE = 0;
export const NOT_FOUND = -1;
export const ONE_VALUE = 1;

export const ROTATE_DEGREES = {
  ROTATE_90: 1,
  ROTATE_180: 2,
  ROTATE_270: 3,
};

export const PRODUCTOS_ENUM = {
  PAGARES: 1,
  FACTORING: 2,
};

export const typeDialogEnum = {
  AGRUPAR_DOCUMENTOS: 0,
  ASOCIAR_DOCUMENTOS: 1,
  SOBREESCRIBIR_DOCUMENTOS: 2,
  RECHAZAR_DOCUMENTOS: 3,
  EXTRAER_PAGINAS: 4,
  DOCUMENTO_PERSONALIZADO_RANGO: 5,
};

export const motivoEstadoFinanciacionEnum = {
  DENEGACION: 1,
  PERDIDA: 2,
};

export const estadosDocumentosGestorString = {
  PENDIENTE: 'Pendiente',
  VALIDADO: 'Validado',
  RECHAZADO: 'Rechazado',
};

export const estadosDocumentoVerificacion = {
  Pendiente: 1,
  Validado: 2,
  Rechazado: 3,
  Dudoso: 4,
  Eliminado: 5,
  NoAplica: 6,
};

export const tipoDocumentoRespuestaVerificacion = 17;
export const ESTADOS_DEVOLUCION_DE_PAGARES = {
  NO_GENERADA: 0,
  GENERANDO: 1,
  PENDIENTE_DE_FIRMA: 2,
  FIRMADA: 3,
  FIRMA_VALIDADA: 4,
  CONFIRMADA: 5,
};

export const prasConfig: any = {
  baseURL:
    process.env.REACT_APP_API_ENV === 'PRODUCTION'
      ? 'https://api.pras.es'
      : 'https://api.prepras.app',
  responseType: 'json',
};

const tipoFormaContactoNombretSring = {
  EMAIL: 'Email',
  MOVIL: 'Teléfono móvil',
  TELEFONO: 'Teléfono',
  FAX: 'Fax',
  WEB: 'Web',
};

export const tiposFormaContactoFromValue = {
  [tipoFormaContactoEnum.EMAIL]: tipoFormaContactoNombretSring.EMAIL,
  [tipoFormaContactoEnum.MOVIL]: tipoFormaContactoNombretSring.MOVIL,
  [tipoFormaContactoEnum.TELEFONO]: tipoFormaContactoNombretSring.TELEFONO,
  [tipoFormaContactoEnum.FAX]: tipoFormaContactoNombretSring.FAX,
  [tipoFormaContactoEnum.WEB]: tipoFormaContactoNombretSring.WEB,
};

export const ADD_PAGO = 'ADD_PAGO';
export const ADD = 'ADD_PAGOS';
export const ADD_CUENTA = 'ADD_CUENTA';
export const RESET = 'RESET_PAGOS';

// OV

export const tipoDocumentoWithFechaEmisionOV = [
  {
    tipo: 'IVA - MODELO 303',
    id: 35,
  },

  {
    tipo: 'IVA Anual - Modelo 390',
    id: 34,
  },

  {
    tipo: 'IRPF - Modelo 184',
    id: 32,
  },
  {
    tipo: 'IRPF - Modelo 111',
    id: 70,
  },
  {
    tipo: 'IRPF - Modelo 130',
    id: 45,
  },

  {
    tipo: 'IRPF - Modelo 100',
    id: 44,
  },

  {
    tipo: 'IRPF - Modelo 190',
    id: 46,
  },

  {
    tipo: 'Impuesto sobbre sociedades - Modelo 200',
    id: 31,
  },

  {
    tipo: 'Declaración Modelo 340',
    id: 86,
  },
  {
    tipo: 'Declaración Modelo 347',
    id: 33,
  },
  {
    tipo: 'Recibo autónomo',
    id: 30,
  },
  {
    tipo: 'Certificado seguridad social',
    id: 37,
  },
  {
    tipo: 'Certificado Hacienda',
    id: 38,
  },
];

export const tipoDocumentoWithFechaDeCierre = [
  {
    tipo: 'Cuentas Anuales Individuales',
    id: 50,
  },
  {
    tipo: 'Cuentas Anuales Consolidadas',
    id: 51,
  },
  {
    tipo: 'Avance de cuentas anuales',
    id: 49,
  },
];

export const tipoDocumentoWithFechaCaducidad = [
  {
    tipo: 'Escritura de nombramiento del Administrador',
    id: 28,
  },
];

export const tipoDocumentoString = {
  PAGARE: '1',
  FACTURA: '2',
  DNI: '3',
  FACTURA_PAGARE: '10',
  CONTRATO: '11',
  ESCRITURA: '12',
  ENDOSO: '13',
  ENVIO_VERIFICACION: '14',
  TRANSMISION_VERIFICACION: '15',
  ENTREGA_VERIFICACION: '16',
  VERIFICACION: '17',
  ALBARAN: '18',
  CARTA_PAGO: '19',
  FACTURA_PROFORMA: '20',
  CERTIFICACION_OBRA: '21',
  OTRO: '22',
  PARTE_TRABAJO: '23',
  PEDIDO: '24',
  PRESUPUESTO: '25',
  POOL_BANCARIO: '26',
  PREVISION_TESORERIA: '27',
  ESCRITURA_NOMBRAMIENTO_ADMINISTRADOR_APODERADO: '28',
  NIF_DEFINITIVO: '29',
  RECIBO_AUTONOMO: '30',
  MODELO_200: '31',
  MODELO_184: '32',
  MODELO_347: '33',
  MODELO_390: '34',
  MODELO_303: '35',
  CERTIFICADO_TITULARIDAD_CUENTA_BANCARIA: '36',
  CERTIFICADO_SS: '37',
  CERTIFICADO_HACIENDA: '38',
  KYC: '39',
  ESCRITURA_CONSTITUCION: '40',
  OTRAS_ESCRITURAS: '41',
  ACTA_TITULARIDAD_REAL: '42',
  DECLARACION_TITURALIDAD_REAL: '43',
  MODELO_100: '44',
  MODELO_130: '45',
  MODELO_190: '46',
  MEMORIA_EMPRESA_RM: '47',
  MEMORIA_EMPRESA_RM_CONSOLIDADA: '48',
  AVANCE_CUENTAS_ANUALES: '49',
  CUENTA_ANUALES_INDIVIDUAL: '50',
  CUENTA_ANUALE_CONSOLIDADA: '51',
  ELEVACION_PUBLICO_ACUERDOS_SOCIALES: '52',
  ESPECIFICACION_DEL_ESTUDIO_PRESTAMO: '53',
  AUTO_CONCURSO: '54',
  CONTRATO_OBRA: '55',
  PLAN_NEGOCIO: '56',
  FOTO: '57',
  EVIDENCIA_FIRMA_DIGITAL: '58',
  BUROFAX: '59',
  CARTA_CESION: '60',
  CONTRATO_CESION: '61',
  TOMA_DE_RAZON: '62',
  ENDOSO_TRUNCADO: '63',
  IVA_MODELO_303_PAGO: '64',
  IVA_MODELO_303_APLAZAMIENTO: '65',
  IVA_MODELO_303_PAGO_APLAZAMIENTO: '66',
  IVA_MODELO_390_PAGO: '67',
  IVA_MODELO_390_APLAZAMIENTO: '68',
  IVA_MODELO_390_PAGO_APLAZAMIENTO: '69',
  IRPF_MODELO_111: '70',
  IRPF_MODELO_111_PAGO: '71',
  IRPF_MODELO_111_APLAZAMIENTO: '72',
  IRPF_MODELO_111_PAGO_APLAZAMIENTO: '73',
  IRPF_MODELO_130_PAGO: '74',
  IRPF_MODELO_130_APLAZAMIENTO: '75',
  IRPF_MODELO_130_PAGO_APLAZAMIENTO: '76',
  IRPF_MODELO_100_PAGO: '77',
  IRPF_MODELO_100_APLAZAMIENTO: '78',
  IRPF_MODELO_100_PAGO_APLAZAMIENTO: '79',
  IRPF_MODELO_190_PAGO: '80',
  IRPF_MODELO_190_APLAZAMIENTO: '81',
  IRPF_MODELO_190_PAGO_APLAZAMIENTO: '82',
  IS_MODELO_200_PAGO: '83',
  IS_MODELO_200_APLAZAMIENTO: '84',
  IS_MODELO_200_PAGO_APLAZAMIENTO: '85',
  MODELO_340_DECLARACION: '86',
  CERTIFICADO_SS_PAGO: '88',
  CERTIFICADO_SS_APLAZAMIENTO: '89',
  CERTIFICADO_SS_PAGO_APLAZAMIENTO: '90',
  CERTIFICADO_HACIENDA_PAGO: '91',
  CERTIFICADO_HACIENDA_APLAZAMIENTO: '92',
  CERTIFICADO_HACIENDA_PAGO_APLAZAMIENTO: '93',
  CERTIFICADO_HACIENDA_RELACION_DEUDAS: '94',
  ACEPTACION_NO_ENVIADA: '65',
  ENVIO_ACEPTACION: '95',
  TRANSMISION_ACEPTACION: '96',
  ENTREGA_ACEPTACION: '97',
  ACEPTACION: '98',
  RESPUESTA_ACEPTACION: '99',
  RESPUESTA_VERIFICACION: '100',
  DEVOLER_PAGARE: '110',
};

export const notDeleteIdDocs = [
  +tipoDocumentoString.ACEPTACION,
  +tipoDocumentoString.BUROFAX,
  +tipoDocumentoString.CARTA_CESION,
  +tipoDocumentoString.CONTRATO,
  +tipoDocumentoString.CONTRATO_CESION,
  +tipoDocumentoString.DNI,
  +tipoDocumentoString.ENDOSO_TRUNCADO,
  +tipoDocumentoString.ENTREGA_ACEPTACION,
  +tipoDocumentoString.ENTREGA_VERIFICACION,
  +tipoDocumentoString.ENVIO_ACEPTACION,
  +tipoDocumentoString.ENVIO_VERIFICACION,
  +tipoDocumentoString.ESCRITURA_NOMBRAMIENTO_ADMINISTRADOR_APODERADO,
  +tipoDocumentoString.KYC,
  +tipoDocumentoString.RESPUESTA_ACEPTACION,
  +tipoDocumentoString.RESPUESTA_VERIFICACION,
  +tipoDocumentoString.TOMA_DE_RAZON,
  +tipoDocumentoString.TRANSMISION_ACEPTACION,
  +tipoDocumentoString.TRANSMISION_VERIFICACION,
  +tipoDocumentoString.VERIFICACION,
];

export const esFicticio = {
  NO: 1,
  SI: 2,
};

export const tipoFormaContactoNombreEnumOv = {
  EMAIL: 'Email',
  MOVIL: 'Teléfono móvil',
  TELEFONO: 'Teléfono fijo',
  FAX: 'Fax',
  WEB: 'Web',
};

export const operacionesPageTabEnum = {
  EFECTOS_SIN_ASIGNAR: 0,
  OPERACIONES: 1,
};

export const tipoCesionOv = {
  A_FUTURO: 1,
  CONTRATO: 2,
};

export const estadoDocumentoCesion = {
  PENDIENTE_SUBIR: 0,
  PENDIENTE: 1,
  VALIDADO: 2,
  RECHAZADO: 3,
};

export const estadoEfectoCliente = {
  PENDIENTE_ESTUDIO: 1,
  PENDIENTE: 2,
  APROBADO: 3,
  RECHAZADO: 4,
  PERDIDO: 5,
};

export const estadoFinanciacionCliente = {
  PENDIENTE_ESTUDIO: 1,
  EN_ESTUDIO: 2,
  APROBADO: 3,
  DENEGADO: 4,
  PERDIDO: 5,
};

export const deniedEffect = [
  estadoFinanciacionCliente.PERDIDO,
  estadoFinanciacionCliente.DENEGADO,
];

export const formaJuridicaEnum = {
  AUTONOMO: 1,
  EMPRESA: 2,
};

export const tipoSociedadSocioEnum = [
  { description: 'Sociedad Anónima', id: 1 },
  { description: 'Sociedad de Responsabilidad Limitada', id: 2 },
  { description: 'Sociedad Cooperativa', id: 6 },
  { description: 'Unión Temporal de Empresas', id: 16 },
  { description: 'Entidades Extranjeras', id: 11 },
  { description: 'Entidades Extranjeras no residentes', id: 18 },
];

export const contentTypes = {
  APPLICATION_JSON: 'application/json',
  APPLICATION_JSON_CHARSET: 'application/json; charset=utf-8',
};

export const tipoFirmas = [
  {
    id: 1,
    nombre: 'Parcial',
  },
  {
    id: 2,
    nombre: 'Completa',
  },
];

export const tipoFirmasEnum = {
  PARCIAL: 1,
  COMPLETA: 2,
};

export const tipoDocumentoOperacion = {
  CONTRATO: 11,
};

export const estadosRevisionDocumentos = {
  Pendiente: 1,
  Validado: 2,
  Rechazado: 3,
  Archivado: 4,
};

export const operacionesActivas = [
  estadosOperaciones.GENERANDO_CONTRATO,
  estadosOperaciones.ENVIANDO_CONTRATO,
  estadosOperaciones.PENDIENTE_FIRMA,
  estadosOperaciones.PENDIENTE_PAGO,
  estadosOperaciones.PARCIALMENTE_PAGADA,
  estadosOperaciones.CONTRATO_NO_ENVIADO,
  estadosOperaciones.INVALIDADA,
];

/**
 * Actualizado a día 24/01/2022
 */
export const estadosCesionEnum = {
  PENDIENTE_COMUNICAR: 1,
  ACEPTADA: 2,
  CANCELADA: 3,
  FINALIZADA: 4,
};

/**
 * Actualizado a día 14/03/2022
 */
const estadosFirmaEnum = {
  PTE_FIRMA_DIGITAL: 1,
  FIRMADA_DIGITALMENTE: 2,
  PTE_FIRMA_ANTE_NOTARIO: 3,
  FIRMA_ANTE_NOTARIO_SOLICITADA: 4,
  SOLICITUD_FIRMA_CONFIRMADA: 5,
  CONTRATO_GENERADO: 6,
  CONTRATO_ENVIADO_NOTARIO: 7,
  FIRMADA_ANTE_NOTARIO: 8,
  FIRMA_DIGITAL_RECHAZADA: 9,
};

export const editableCesion = [estadosCesionEnum.PENDIENTE_COMUNICAR];
export const notEditableFirma = [
  estadosFirmaEnum.CONTRATO_ENVIADO_NOTARIO,
  estadosFirmaEnum.FIRMADA_ANTE_NOTARIO,
];

export const estadoCuentaBancariaEnum = {
  PENDIENTE: 0,
  REVISANDO: 1,
  VALIDADA: 2,
  RECHAZADA: 3,
};

export const estadoRepresentanteEnum = {
  PENDIENTE_DNI: 1,
  REVISANDO_DNI: 2,
  PENDIENTE_ESCRITURAS: 3,
  REVISANDO_ESCRITURAS: 4,
  EN_REVISION: 5,
  VALIDADO: 6,
  RECHAZADO: 7,
};

export const defaultGestor = 'José Manuel Pérez Carrilero';

export const TABLE_TABS = {
  NO_VINCULADAS: 1,
  VINCULADAS: 2,
};

export const TABLE_OPTIONS = [
  {
    value: TABLE_TABS.NO_VINCULADAS,
    name: 'No vinculadas',
  },
  {
    value: TABLE_TABS.VINCULADAS,
    name: 'Vinculadas',
  },
];

export const typeAccordionTab = {
  infoCliente: 1,
  direcciones: 2,
  firmantes: 3,
  participacion: 4,
  actividad: 5,
};

export const FINALIDAD_OTROS_ID = 6;
export const ORIGEN_OTROS_ID = 2;
export const DEFAULT_ACTIVIDAD_ID = 0;
export const DEFAULT_ONE_VALUE = 1;
export const tipoDocumentoEndoso = 13;

export const tipoPlataforma = {
  GEFINTECH: 1,
  FINANWAY: 2,
};

export const OperacionVerificada = {
  ACEPTADA: true,
  PENDIENTE: false,
};

export const defaultCountry = {
  nombre: 'España',
  lastModificationTime: null,
  id: 66,
};

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

export const productsTypes = {
  PAGARE: 1,
  FACTURA: 2,
};

export const validatePostalCode = (codigoPostal: any) => {
  const POSTAL_CODE_REGEX = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;
  return POSTAL_CODE_REGEX.test(codigoPostal);
};

export const menuTabSideBar = {
  MIS_DATOS: 5,
  PERFIL_EMPRESA: 6,
  FIRMANTES: 7,
  DOCUMENTACION: 8,
  PERFIL_USUARIO: 9,
  CUENTAS: 10,
};

export const typeOrigenEnum = {
  MANUAL: 0,
  TRANSFERENCIA: 1,
  PAGARE: 2,
};

export const etiquetasFormaDeContacto = [
  {
    description: 'Envío de documentación oficial',
    id: 0,
  },
  {
    description: 'Gestión de cobro',
    id: 1,
  },
  {
    description: 'Sugerida por el librador',
    id: 2,
  },
];

export const optionsPlazoDePago = [
  {
    name: '30 días',
    value: 30,
  },
  {
    name: '60 días',
    value: 60,
  },
  {
    name: '90 días',
    value: 90,
  },
  {
    name: '120 días',
    value: 120,
  },
  {
    name: '150 días',
    value: 150,
  },
  {
    name: '180 días',
    value: 180,
  },
  {
    name: '210 días',
    value: 210,
  },
  {
    name: '240 días',
    value: 240,
  },
];

export const estadosAlertasEnum = {
  NO_APLICA: -1,
  INACTIVA: 0,
  ACTIVA: 1,
};
export const MENSAJERIA_INTERNA_TYPE_ENUM = {
  ESTUDIO: 1,
  LIBRADO: 2,
  INGRESO: 3,
  DOC_REQUERIDA: 4,
};

export const PROVINCIA_ID = {
  VALENCIA: 48,
};
