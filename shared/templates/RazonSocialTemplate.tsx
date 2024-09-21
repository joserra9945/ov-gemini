import { Link } from 'react-router-dom';

import {
  GenericTooltip,
  ITooltipTarget,
} from '@shared/components/GenericTooltip';

import { IRazonSocialTemplate } from './interfaces';

const RazonSocialTemplate = ({
  empresaId = '',
  razonSocial,
}: IRazonSocialTemplate) => {
  const urlToNavigate = `/gestion-empresas/detalle/${empresaId}`;

  return (
    <GenericTooltip content={razonSocial || '-'}>
      {({ target }: ITooltipTarget) =>
        empresaId ? (
          <Link
            className={`${target} inline text-info text-ellipsis ellipsis`}
            to={urlToNavigate}
          >
            {razonSocial || '-'}
          </Link>
        ) : (
          <div className={`${target} inline text-info text-ellipsis ellipsis`}>
            {razonSocial || '-'}
          </div>
        )
      }
    </GenericTooltip>
  );
};

export default RazonSocialTemplate;
