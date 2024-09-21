import { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { Tooltip } from '@shared/components/Tooltip';
import { useEfecto } from '@shared/hooks';
import {
  EstadosVerificacion,
  IEstadosVerificacionByEstudioId,
  IEstadosVerificacionByOperacionId,
} from '@shared/interfaces/api/IEfecto';
import { estadosEstudioVerificacion } from '@shared/utils/constants';

import '../styles/app-theme/templates/estadoVerificacionTemplate.scss';

type EstadoVerificacionTemplateProps = {
  verificacionId: number;
  description: string;
  id: string;
  isOperacion?: boolean;
};
const EstadoVerificacionTemplate = ({
  verificacionId,
  description = 'Sin estado',
  id,
  isOperacion = false,
}: EstadoVerificacionTemplateProps) => {
  const { estadosVerificacionByEstudioId, estadosVerificacionByOperacionId } =
    useEfecto();

  const [estadoVeri, setEstadoVeri] = useState<
    IEstadosVerificacionByEstudioId[]
  >([]);

  const [estadoVeriOp, setEstadoVeriOp] = useState<
    IEstadosVerificacionByOperacionId[]
  >([]);

  const fetchEstadoVeryByOperacion = useCallback(async () => {
    const res = await estadosVerificacionByOperacionId(id);
    setEstadoVeriOp(res);
  }, [estadosVerificacionByOperacionId, id]);

  const fetchEstadoVeriByEstudio = useCallback(async () => {
    const res = await estadosVerificacionByEstudioId(id);
    setEstadoVeri(res);
  }, [estadosVerificacionByEstudioId, id]);

  useEffect(() => {
    if (verificacionId === estadosEstudioVerificacion.VARIOS) {
      isOperacion ? fetchEstadoVeryByOperacion() : fetchEstadoVeriByEstudio();
    }
  }, [
    fetchEstadoVeriByEstudio,
    fetchEstadoVeryByOperacion,
    verificacionId,
    isOperacion,
  ]);

  const renderVariosTooltip = () => {
    return (
      <div>
        {isOperacion &&
          estadoVeriOp.map((item: IEstadosVerificacionByOperacionId) => {
            return (
              <div key={nanoid()}>
                <span>{item.cantidad}</span>
                <span>{item.description ?? 'Sin estado'}</span>
              </div>
            );
          })}
        {estadoVeri.length &&
          estadoVeri.map((item: IEstadosVerificacionByEstudioId) => {
            return (
              <div key={nanoid()}>
                <div>
                  {item.operacionNumero ? `${item.operacionNumero}:` : ''}
                </div>

                {item.estadosVerificacion.map((veri: EstadosVerificacion) => {
                  return (
                    <div key={nanoid()}>
                      <span>{veri.cantidad}</span>{' '}
                      <span>{veri.description ?? 'Sin estado'}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    );
  };
  return (
    <Tooltip
      content={
        estadosEstudioVerificacion.VARIOS === verificacionId
          ? renderVariosTooltip()
          : description ?? 'Sin estado'
      }
    >
      <div
        className={`ellipsis estado-verificacion-template-${
          verificacionId ?? '-1'
        }`}
      >
        {description ?? 'Sin estado'}
      </div>
    </Tooltip>
  );
};

export default EstadoVerificacionTemplate;
