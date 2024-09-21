import { IAuthUserGet } from '../api/IAuth';
import { ISolicitudDeCompraByCif } from '../api/ISolicitudDeCompra';

export interface IFooterGraph {
  ultimaCompra: ISolicitudDeCompraByCif;
  userName?: IAuthUserGet;
  userNameRAI?: IAuthUserGet;
  ultimaCompraRAI?: ISolicitudDeCompraByCif;
  isLoading: boolean;
  handleSubmit: () => Promise<void>;
}
