const BASE_URL = 'api/gefintech';
export const operacion = `${BASE_URL}/Operacion`;
export const motivoEstadoFinanciacion = `${BASE_URL}/MotivoEstadoDeFinanciacion`;
export const enumurl = `${BASE_URL}/Enum`;
export const persona = `${BASE_URL}/Persona`;
export const cuentaInterna = `${BASE_URL}/CuentaInterna`;
export const ingreso = `${BASE_URL}/Ingreso`;
export const empresaExterna = `${BASE_URL}/EmpresaExterna`;
export const estudio = `${BASE_URL}/Estudio`;
export const prestamo = `${BASE_URL}/Prestamo`;
export const directLending = `${BASE_URL}/DirectLending`;
export const pagoOperacion = `${BASE_URL}/PagoOperacion`;
export const tomaDeRazon = `${BASE_URL}/TomaDeRazon`;
export const efecto = `${BASE_URL}/Efecto`;
export const documento = `${BASE_URL}/Documento`;
export const documentoDePago = `${BASE_URL}/DocumentoDePago`;
export const factura = `${BASE_URL}/Factura`;
export const limiteRiesgo = `${BASE_URL}/LimiteRiesgo`;
export const firmaNotarial = `${BASE_URL}/FirmaNotarial`;
export const alertaPras = `${BASE_URL}/AlertaPras`;
export const pagare = `${BASE_URL}/Pagare`;
export const devolucionPagare = `${BASE_URL}/DevolucionDePagares`;
export const representante = `${BASE_URL}/Representante`;
export const verificacion = `${BASE_URL}/Verificacion`;
export const aceptacion = `${BASE_URL}/Aceptacion`;
export const cesion = `${BASE_URL}/Cesion`;
export const documentoDeCesion = `${BASE_URL}/DocumentoDeCesion`;
export const usuarioInterno = `${BASE_URL}/UsuarioInterno`;
export const usuarioExterno = `${BASE_URL}/UsuarioExterno`;
export const cuentaExterna = `${BASE_URL}/CuentaExterna`;
export const documentoDeRepresentante = `${BASE_URL}/DocumentoDeRepresentante`;
export const configuration = `${BASE_URL}/Configuration`;
export const documentoDeEmpresa = `${BASE_URL}/DocumentoDeEmpresa`;
export const tipoDocumento = `${BASE_URL}/TipoDocumento`;
export const tarificador = `${BASE_URL}/Tarificador`;
export const documentoDeEfecto = `${BASE_URL}/DocumentoDeEfecto`;
export const documentoDeFinanciacion = `${BASE_URL}/DocumentoDeFinanciacion`;
export const ventaAFondo = `${BASE_URL}/VentaAFondo`;
export const procedimientoDeCobro = `${BASE_URL}/ProcedimientoDeCobro`;
export const cobro = `${BASE_URL}/Cobro`;
export const fichero = `${BASE_URL}/Fichero`;
export const impago = `${BASE_URL}/Impago`;
export const pagoSepa = `${BASE_URL}/PagoSepa`;
export const devolucion = `${BASE_URL}/Devolucion`;
export const cuentaCliente = `${BASE_URL}/cuentas-clientes/CuentaCliente`;
export const empresaInterna = `${BASE_URL}/EmpresaInterna`;
export const codigoPostal = `${BASE_URL}/CodigoPostal`;
export const notario = `${BASE_URL}/Notario`;
export const remesaBancaria = `${BASE_URL}/RemesaBancaria`;
export const gruposDeEmpresas = `${BASE_URL}/grupos-de-empresas`;
export const garantia = `${BASE_URL}/Garantia`;

export const BASE_AUTH = 'api/authentication';
export const authentication = `${BASE_AUTH}/Authentication`;

const BASE_URL_EQUIFAX = 'api/equifax/asnef';
export const informeEquifax = `${BASE_URL_EQUIFAX}/Informe`;
export const solicitudCompraEquifax = `${BASE_URL_EQUIFAX}/SolicitudDeCompra`;

const BASE_URL_CORREOS = 'api/correos/burofaxes';
export const correosBurofax = `${BASE_URL_CORREOS}/Burofax`;

const BASE_URL_ERP = 'api/erp';
export const cesionERP = `${BASE_URL_ERP}/Cesion`;
export const pagareERP = `${BASE_URL_ERP}/Pagare`;
export const facturaERP = `${BASE_URL_ERP}/Factura`;

export const BASE_NOTIFICATIONS = 'api/notifications';
export const notification = `${BASE_NOTIFICATIONS}/Notification`;
export const configurationNotification = `${BASE_NOTIFICATIONS}/Configuration`;

export const signalAuth = `signalr/authentication/`;
export const signalRNotifications = `signalr/notifications/NotificationsHub`;

const BASE_URL_EXPERIAN = 'api/experian/rai';
export const informeExperian = `${BASE_URL_EXPERIAN}/Informe`;
export const solicitudCompraExperia = `${BASE_URL_EXPERIAN}/SolicitudDeCompra`;

const BASE_URL_VIDSIGNER = '/api/vidsigner/biometric-signature';
export const documentoVidSigner = `${BASE_URL_VIDSIGNER}/Document`;
