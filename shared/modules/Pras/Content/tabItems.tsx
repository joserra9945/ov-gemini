import Balance from '../Components/Balance';
import Cargos from '../Components/Cargos';
import CriteriosBasicos from '../Components/CriteriosBasicos';
import CriteriosBasicos2 from '../Components/CriteriosBasicos2';
import CriteriosComplementarios from '../Components/CriteriosComplementarios';
import CriteriosDirectos from '../Components/CriteriosDirectos';
import Cuentas from '../Components/Cuentas';
import EstructuraGrupo from '../Components/EstructuraGrupo';
import Ico from '../Components/Ico';
import Productos from '../Components/Productos';
import Resumen from '../Components/Resumen';
import Retir from '../Components/Retir';

export const tabMenuEnum = {
  RESUMEN: 0,
  PRODUCTOS: 1,
  BALANCE: 2,
  CUENTA_RESULTADOS: 3,
  DIRECTOS: 4,
  BASICOS: 5,
  BASICOS_II: 6,
  COMPLEMENTARIOS: 7,
  ICO: 8,
  CARGOS: 9,
  ESTRUCTURA_GRUPO: 10,
  RETIR: 11,
};

export type newTypeArr = {
  label: string;
  id: number;
  fullWidth: boolean;
  body: JSX.Element;
  disabled?: boolean;
};
export const tabItems: newTypeArr[] = [
  {
    label: 'RESUMEN',
    id: tabMenuEnum.RESUMEN,
    fullWidth: false,
    body: <Resumen />,
  },
  {
    label: 'PRODUCTOS',
    id: tabMenuEnum.PRODUCTOS,
    fullWidth: false,
    body: <Productos />,
  },
  {
    label: 'BALANCE',
    id: tabMenuEnum.BALANCE,
    fullWidth: false,
    body: <Balance />,
  },
  {
    label: 'CUENTA RESULTADOS',
    id: tabMenuEnum.CUENTA_RESULTADOS,
    fullWidth: false,
    body: <Cuentas />,
  },
  {
    label: 'CRITERIOS DIRECTOS',
    id: tabMenuEnum.DIRECTOS,
    fullWidth: false,
    disabled: true,
    body: <CriteriosDirectos />,
  },
  {
    label: 'CRITERIOS BÁSICOS',
    id: tabMenuEnum.DIRECTOS,
    fullWidth: false,
    disabled: true,
    body: <CriteriosBasicos />,
  },
  {
    label: 'CRITERIOS BÁSICOS II',
    id: tabMenuEnum.DIRECTOS,
    fullWidth: false,
    disabled: true,
    body: <CriteriosBasicos2 />,
  },
  {
    label: 'CRITERIOS COMPLEMENTASRIOS',
    id: tabMenuEnum.DIRECTOS,
    fullWidth: false,
    disabled: true,
    body: <CriteriosComplementarios />,
  },
  {
    label: 'ICO',
    id: tabMenuEnum.ICO,
    fullWidth: false,
    body: <Ico />,
  },
  {
    label: 'CARGOS',
    id: tabMenuEnum.CARGOS,
    fullWidth: false,
    body: <Cargos />,
  },
  {
    label: 'ESTRUCTURA GRUPO',
    id: tabMenuEnum.ESTRUCTURA_GRUPO,
    fullWidth: false,
    body: <EstructuraGrupo />,
  },
  {
    label: 'RETIR',
    id: tabMenuEnum.RETIR,
    fullWidth: false,
    body: <Retir />,
  },
];
