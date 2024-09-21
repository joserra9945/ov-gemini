import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

interface IProcedimientoDeCobroSinCesionAceptada {
  libradoId: string;
  plazoDePago: number;
  id: string;
  formaDeCobro?: number;
}

type IProcedimientoDeCobroSinCesionAceptadaG =
  IGenericResponse<IProcedimientoDeCobroSinCesionAceptada>;

type IProcedimientoDeCobroSinCesionAceptadaGP =
  Promise<IProcedimientoDeCobroSinCesionAceptadaG>;

type IProcedimientoDeCobroSinCesionAceptadaP =
  Promise<IProcedimientoDeCobroSinCesionAceptada>;

export type {
  IProcedimientoDeCobroSinCesionAceptada,
  IProcedimientoDeCobroSinCesionAceptadaG,
  IProcedimientoDeCobroSinCesionAceptadaGP,
  IProcedimientoDeCobroSinCesionAceptadaP,
};
