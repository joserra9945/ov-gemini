import { useCallback, useContext, useEffect, useState } from 'react';
import {
  OrganizationChart,
  OrganizationChartNodeData,
} from 'primereact/organizationchart';

import usePras from '@shared/hooks/usePras';

import { Spinner } from '@shared/components/Legacy/Spinner';

import PrasContext from '../../Content/PrasContext';

interface INodoGrupo extends OrganizationChartNodeData {
  data: { CIF: string; RS: string; level: number };
  groupName?: string;
}
const EstructuraGrupo = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [estructuraGrupo, setEstructuraGrupo] = useState<INodoGrupo[]>([]);
  const { empresa } = useContext(PrasContext);

  const { prasOrganigramaIdGet } = usePras();

  const fetchPras = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        const res = await prasOrganigramaIdGet(id);
        if (res) {
          setEstructuraGrupo([res]);
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    },
    [prasOrganigramaIdGet]
  );

  useEffect(() => {
    empresa.cif && fetchPras(empresa.cif);
  }, [empresa?.cif, fetchPras]);
  if (isLoading) {
    return <Spinner loading={isLoading} color="#0F1C40" />;
  }

  const nodeTemplate = (node: INodoGrupo) => {
    if (node?.data?.level === 0) {
      return (
        <div>
          <div className="node-header" />
          <div className="node-content">{node?.groupName}</div>
        </div>
      );
    }
    return (
      <div>
        <div className="node-header">{node?.data?.CIF}</div>
        <div className="node-content">{node?.data?.RS}</div>
      </div>
    );
  };
  return (
    <div className="estructura-grupo">
      {!!estructuraGrupo.length && (
        <OrganizationChart
          nodeTemplate={nodeTemplate}
          value={estructuraGrupo}
        />
      )}
    </div>
  );
};

export default EstructuraGrupo;
