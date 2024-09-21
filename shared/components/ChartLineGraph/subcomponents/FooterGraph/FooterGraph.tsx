import { useContext } from 'react';

import { useRole } from '@shared/hooks/useRole';
import { IFooterGraph } from '@shared/interfaces/components/IFooterGraph';
import { formatFullDateUTC } from '@shared/utils/formatters';

import { Button } from '@shared/components/Legacy/Button';

import ChartLineGraphContext from '../../context';
import { tabIndexEnum } from '../../helpers';

export const FooterGraph = ({
  ultimaCompra,
  userName,
  userNameRAI,
  isLoading,
  handleSubmit,
  ultimaCompraRAI,
}: IFooterGraph) => {
  const { esRiesgos } = useRole();
  const { selectedTab } = useContext(ChartLineGraphContext);
  const isASNEF = selectedTab === tabIndexEnum.ASNEF;

  return (
    <>
      {(ultimaCompra?.fecha || ultimaCompraRAI?.fecha) && (
        <p>
          Fecha última compra:{' '}
          {isASNEF
            ? formatFullDateUTC(ultimaCompra?.fecha)
            : formatFullDateUTC(ultimaCompraRAI?.fecha)}{' '}
          - {isASNEF ? userName?.firstName ?? '' : userNameRAI?.firstName ?? ''}{' '}
          {isASNEF ? userName?.lastName ?? '' : userNameRAI?.lastName ?? ''}
        </p>
      )}
      {esRiesgos && (
        <Button
          className="h-12 ml-1 text-white rounded-md sm:w-40 bg-primary hover:bg-primary-over"
          label={`Comprar ${isASNEF ? 'ASNEF' : 'RAI'}`}
          onClick={() => handleSubmit()}
          disabled={isLoading}
        />
      )}
    </>
  );
};
