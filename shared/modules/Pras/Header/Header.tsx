import { useState } from 'react';

import { Button } from '@shared/components/Button';

import PrasForm from '../Components/PrasForm';
import { formatDateUTC } from '../helpers/formatters';

interface IHeaderProps {
  scoring?: string | null;
  fecha?: string | null;
  accion?: string | null;
  empresa: { cif: string; razonSocial: string };
  singlePage: boolean;
  onScoringChange: (() => void) | null;
  userId?: string;
  nombreCompleto?: string;
}

const Header = ({
  scoring,
  fecha,
  accion,
  empresa,
  singlePage = false,
  onScoringChange,
  userId,
  nombreCompleto,
}: IHeaderProps): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const afterSubmit = () => {
    setShowForm(false);
  };

  return (
    <div className="pras-module__header">
      {showForm ? (
        <PrasForm
          empresa={empresa}
          scoring={scoring}
          onBack={() => setShowForm(false)}
          afterSubmit={() => {
            afterSubmit();
            onScoringChange && onScoringChange();
          }}
          userId={userId}
          nombreCompleto={nombreCompleto}
        />
      ) : (
        <div className="flex justify-between ml-6 mr-6">
          <div>
            <span>
              <span className="font-semibold">Scoring:</span> {scoring ?? '-'}
            </span>
            <span>
              {fecha && (
                <>
                  <b className="ml-1">|</b>{' '}
                  <span>{`${formatDateUTC(fecha)}`}</span>
                </>
              )}
            </span>
            <span>
              <b className="ml-1">|</b>{' '}
              {!singlePage ? accion : empresa?.razonSocial || ''}
            </span>
          </div>
          <div>
            <Button
              onClick={() => setShowForm(!showForm)}
              text="Editar scoring"
              type="button"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
