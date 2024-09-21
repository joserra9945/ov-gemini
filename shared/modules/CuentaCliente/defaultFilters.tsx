import { IColumn } from '@shared/interfaces';
import { IEmpresaInternaGet } from '@shared/interfaces/api/IEmpresaInterna';

interface Props {
  name: string;
  value: number;
  columns: IColumn[];
  id: string;
}

export function getTableOptions(
  empresasInternas: IEmpresaInternaGet[],
  columns: IColumn[]
) {
  const options: Props[] = [];

  empresasInternas?.forEach((ei: any, index) => {
    options.push({
      name: `${ei.codigo.description}`,
      value: index,
      columns,
      id: `${ei.id}`,
    });
  });

  return options;
}
