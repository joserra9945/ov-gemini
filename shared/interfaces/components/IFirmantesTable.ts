import { SyntheticEvent } from 'react';

import { IRepresentanteGetByEmpresaId } from '../IRepresentante';

type DataTableSelectType = 'row' | 'cell' | 'checkbox' | 'radio' | 'all';

export interface IFirmantesTable {
  empresaId: string | undefined;
  onFunction: (arg?: IRepresentanteGetByEmpresaId[]) => void;
  title: string;
}

export interface IFirmantesTableRow {
  originalEvent: SyntheticEvent;
  data: any;
  type: DataTableSelectType;
}
