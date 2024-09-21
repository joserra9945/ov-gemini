import { FC } from 'react';
import { nanoid } from 'nanoid';

import { IEnum } from '@shared/interfaces/IEnum';
import { EstadoOperacionTemplate } from '@shared/templates';
import { formatDateUTC } from '@shared/utils/formatters';

import { Button } from '../Button';

import './OperacionCard.scss';

interface IProps {
  title: string;
  fechaCreacion: Date;
  estadoOperacion: IEnum;
  onClick: () => void;
}

const OperacionCard: FC<IProps> = ({
  title,
  fechaCreacion,
  estadoOperacion,
  onClick,
}) => {
  return (
    <div
      key={nanoid()}
      className="rounded-md p-4 bg-white flex flex-col shadow-lg border-gray-300 border absolute top-full left-[-50%] gap-4 z-10"
    >
      <h1 className="text-primary text-lg font-bold whitespace-nowrap py-2">
        {title}
      </h1>
      <div>Fecha creación: {formatDateUTC(fechaCreacion)}</div>
      <div className="estado-operacion flex flex-col gap-2">
        <p>Estado de la operación:</p>

        <EstadoOperacionTemplate estado={estadoOperacion} />
      </div>
      <Button
        text="Ir a la operación"
        onClick={onClick}
        type="button"
        color="blank"
        maxWidth
      />
    </div>
  );
};

export default OperacionCard;
