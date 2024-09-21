import { FC, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Tooltip } from '@shared/components/Tooltip';
import { tabsEnum } from '@shared/enum/operacionesEnums';
import useModal from '@shared/hooks/useModal';
import { IEfectoOperacion } from '@shared/interfaces/api/IEfecto/IEfectoByGestionFiltersGet';

import OperacionCard from '../OperacionCard';

interface IProps {
  operacion: IEfectoOperacion;
}

const OperacionesTableData: FC<IProps> = ({ operacion }) => {
  const ref = useRef<HTMLDivElement>(null);
  const params = useParams<{ empresaId: string }>();

  const navigate = useNavigate();

  const { isOpen, toggleModal } = useModal(ref);

  if (!operacion) {
    return <span>-</span>;
  }

  return (
    <div ref={ref} className="relative flex">
      <Tooltip content={operacion?.numero} place="bottom">
        <button
          type="button"
          className="text-hyperlink"
          onClick={() => toggleModal()}
        >
          {operacion?.numero}
        </button>
      </Tooltip>
      {isOpen && (
        <OperacionCard
          estadoOperacion={operacion.estado}
          fechaCreacion={operacion.fechaValor}
          title={`Operación ${operacion.numero}`}
          onClick={() => {
            navigate(`/gestion-empresas/detalle/${params.empresaId}`, {
              state: {
                subcomponentEnum: tabsEnum.OPERACIONES,
                operacion,
              },
            });
          }}
        />
      )}
    </div>
  );
};

export default OperacionesTableData;
