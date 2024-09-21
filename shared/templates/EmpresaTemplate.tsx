import { Tooltip } from '@shared/components/Legacy/Tooltip';

import { IEmpresaTemplate } from './interfaces';

const EmpresaTemplate = ({ empresaRazonSocial }: IEmpresaTemplate) => {
  return (
    <Tooltip content={empresaRazonSocial}>
      <div className="ellipsis">{empresaRazonSocial || ''}</div>
    </Tooltip>
  );
};

export default EmpresaTemplate;
