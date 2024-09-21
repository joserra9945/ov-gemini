import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import useWindowSize from '@shared/hooks/useWindowsSize';
import { ITipoCargo } from '@shared/interfaces/api/IPras';
import { formatDateUTC } from '@shared/utils/formatters';

import { Button } from '@shared/components/Legacy/Button';

interface Props {
  item: ITipoCargo;
}

const CargosInfo = ({ item }: Props) => {
  const [showMore, setShowMore] = useState(false);
  const [showMoreLabel, setShowMoreLabel] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize?.width) {
      setShowMoreLabel(windowSize.width <= 768);
    }
  }, [windowSize]);

  return (
    <div className="text-left bg-white shadow-md rounded-md mb-2 p-2 px-4">
      <div className="flex flex-wrap">
        <div key={nanoid()} className="w-full md:w-1/2 flex-item">
          <span className="text-info font-semibold mr-2">Cargo:</span>
          <span className="value">{item.Cargo ?? '-'}</span>
        </div>
        <div key={nanoid()} className="w-full md:w-1/2 flex-item">
          <span className="text-info font-semibold mr-2">Incidencias:</span>
          <span>
            {item.TieneIncidencias ? (
              <span className="text-red-600">Tiene incidencias</span>
            ) : (
              <span className="text-green-500">No tiene incidencias</span>
            )}
          </span>
        </div>
        <div key={nanoid()} className="w-full md:w-1/2 flex-item">
          <span className="text-info font-semibold mr-2">Nombre:</span>
          <span className="value font-semibold">
            {item.NombreCompleto ?? '-'}
          </span>
        </div>
        {showMoreLabel && !showMore ? (
          <Button
            className="text-center text-blue-400 text-base cursor-pointer hover:text-info w-full md:w-1/2"
            onClick={() => setShowMore(!showMore)}
            label="Ver más información"
            link
          />
        ) : (
          <>
            <div key={nanoid()} className="w-full md:w-1/2 flex-item">
              <span className="text-info font-semibold mr-2">
                Tipo de firma:
              </span>
              <span className="value capitalize">{item.TipoFirma ?? '-'}</span>
            </div>
            <div key={nanoid()} className="w-full md:w-1/2 flex-item">
              <span className="text-info font-semibold mr-2">
                Fecha de nombramiento:
              </span>
              <span className="value">
                {formatDateUTC(item.FechaNombramiento) ?? '-'}
              </span>
            </div>
            <div key={nanoid()} className="w-full md:w-1/2 flex-item">
              <span className="text-info font-semibold mr-2">
                Cargos importantes:
              </span>
              <span className="value">
                {item.CargosImportantes ? 'Sí' : 'No'}
              </span>
            </div>
            <div key={nanoid()} className="w-full md:w-1/2 flex-item">
              <span className="text-info font-semibold mr-2">
                Fecha alta empresa:
              </span>
              <span className="value">
                {formatDateUTC(item.FechaAltaEmpresa) ?? '-'}
              </span>
            </div>
            <div key={nanoid()} className="w-full md:w-1/2 flex-item">
              <span className="text-info font-semibold mr-2">
                Nº vinculaciones:
              </span>
              <span className="value">{item.NumVinculaciones ?? '-'}</span>
            </div>
            {showMoreLabel && (
              <Button
                className="cargo-info__show-more w-full md:w-1/2"
                onClick={() => setShowMore(!showMore)}
                label="Ver menos información"
                link
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CargosInfo;
