import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faClock, faHistory } from '@fortawesome/pro-solid-svg-icons';

import { IOptionTableSelection } from '@shared/components/Legacy/TurboTable/interfaces';

import { columns, columnsDenegados } from './columns';

export const selectTableButtonValue = {
  ACTIVA: 0,
  HISTORIAL: 1,
};

export const tableOptions: IOptionTableSelection[] = [
  {
    name: 'Pendientes',
    value: selectTableButtonValue.ACTIVA,
    icon: faClock as IconProp,
    columns: columns(),
  },
  {
    name: 'Denegados',
    value: selectTableButtonValue.HISTORIAL,
    icon: faHistory as IconProp,
    columns: columnsDenegados(false),
  },
];
