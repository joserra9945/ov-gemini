import { useNavigate } from 'react-router-dom';

import { GenericButton } from '@shared/components/GenericButton';

interface PrestamosHeaderProps {
  tableTitle: string;
  buttonTitle: string;
  className?: string;
}

export const PrestamosHeader = ({
  tableTitle,
  buttonTitle,
  className,
}: PrestamosHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-end justify-between p-5 bg-white">
      <div className="flex justify-center text-2xl font-medium">
        {tableTitle}
      </div>
      <GenericButton
        label={`Crear ${buttonTitle}`}
        buttonType="tertiary"
        onClick={() => navigate('/prestamos/asistente')}
        className="font-normal"
      />
    </div>
  );
};
