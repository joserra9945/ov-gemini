import { Tooltip } from '@shared/components/Legacy/Tooltip';

interface IEstado {
  confirmada: boolean;
}

const EstadoTemplate = ({ confirmada }: IEstado) => {
  if (confirmada) {
    return (
      <Tooltip content="Confirmado">
        <div className="ellipsis">Confirmado</div>
      </Tooltip>
    );
  }
  return (
    <Tooltip content="Pendiente">
      <div className="ellipsis">Pendiente</div>
    </Tooltip>
  );
};

export default EstadoTemplate;
