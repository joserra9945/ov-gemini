import { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { IGestor } from '@shared/modules/PerfilEmpresa/interfaces';
import { useFetch } from '@shared/utils';

import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { IUsuarioInterno } from '@shared/interfaces/Legacy/IUsuarioInterno';

export const NombreGestor = ({ id, nombre }: IGestor): JSX.Element => {
  const [nameGestor, setNameGestor] = useState<IUsuarioInterno | null>(null);
  const [fetchGestor, setFetchGestor] = useState<boolean>(false);

  const { get } = useFetch('/api/gefintech/UsuarioInterno');

  const fetchData = useCallback(async () => {
    try {
      const res = await get<IUsuarioInterno>(`/${id}`);
      if (res) {
        setNameGestor(res);
      }
    } catch {
      setNameGestor(null);
    }
  }, [get, id]);

  useEffect(() => {
    if (fetchGestor && nombre) {
      fetchData();
    }
  }, [fetchData, fetchGestor, nombre]);

  const idRandom = nanoid();
  return (
    <Tooltip
      content={`Nombre: ${nameGestor?.nombre || '-'} Teléfono: ${
        nameGestor?.telefonoMovil || '-'
      }`}
    >
      <div
        className={`nombre-gestor-${idRandom} ellipsis`}
        onMouseEnter={() => setFetchGestor(true)}
        onMouseLeave={() => setFetchGestor(false)}
      >
        <span className="nombre-gestor">{nombre || '-'}</span>
      </div>
    </Tooltip>
  );
};
