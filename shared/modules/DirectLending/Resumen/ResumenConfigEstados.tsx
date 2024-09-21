import { ESTADOS_DIRECTLENDING_ENUM } from '@shared/enum/enumEstadosDirectLending';
import DocumentationList from '@shared/modules/DocRequerida/DocumentacionList/DocumentationList';

import Contrato from '../components/Contrato';
import Garantias from '../components/Garantias';

interface ConfigResumenProps {
  [x: number]: {
    MENSAJE?: string;
    COLOR?: 'info' | 'warning' | 'danger' | '';
    TABS: {
      value: number;
      label: string;
      component: JSX.Element;
    }[];
  };
}

const commonTabs = [
  {
    value: 0,
    label: 'Garantías',
    component: <Garantias />,
  },
  {
    value: 1,
    label: 'Documentación',
    component: (
      <DocumentationList esResumenDirectLending className="flex flex-col" />
    ),
  },
  {
    value: 2,
    label: 'Contrato',
    component: <Contrato />,
  },
];

const CONFIG_RESUMEN: ConfigResumenProps = {
  [ESTADOS_DIRECTLENDING_ENUM.EN_REVISION]: {
    MENSAJE: 'Hay documentos requeridos',
    COLOR: 'warning',
    TABS: [
      {
        value: 0,
        label: 'Garantías',
        component: <Garantias />,
      },
      {
        value: 1,
        label: 'Documentación',
        component: (
          <DocumentationList
            esResumenDirectLending
            className="flex flex-col w-full"
          />
        ),
      },
    ],
  },
  [ESTADOS_DIRECTLENDING_ENUM.APROBADO]: {
    MENSAJE: 'Hay documentos requeridos',
    COLOR: 'warning',
    TABS: [
      {
        value: 0,
        label: 'Garantías',
        component: <Garantias />,
      },
      // {
      //   value: 1,
      //   label: 'Documentación',
      //   component: <Documentacion />,
      // },
    ],
  },

  [ESTADOS_DIRECTLENDING_ENUM.GENERANDO_CONTRATO]: {
    MENSAJE: 'Hay documentos requeridos',
    COLOR: 'warning',
    TABS: [
      {
        value: 0,
        label: 'Garantías',
        component: <Garantias />,
      },
      {
        value: 1,
        label: 'Documentación',
        component: (
          <DocumentationList
            esResumenDirectLending
            className="flex flex-col w-full"
          />
        ),
      },
      {
        value: 2,
        label: 'Contrato',
        component: <Contrato />,
      },
    ],
  },
  [ESTADOS_DIRECTLENDING_ENUM.CONTRATO_NO_ENVIADO]: {
    MENSAJE: 'Hay documentos requeridos',
    COLOR: 'warning',
    TABS: [
      {
        value: 0,
        label: 'Garantías',
        component: <Garantias />,
      },
      {
        value: 1,
        label: 'Documentación',
        component: (
          <DocumentationList
            esResumenDirectLending
            className="flex flex-col w-full"
          />
        ),
      },
      {
        value: 2,
        label: 'Contrato',
        component: <Contrato />,
      },
    ],
  },
  [ESTADOS_DIRECTLENDING_ENUM.PENDIENTE_FIRMA]: {
    TABS: [...commonTabs],
  },

  [ESTADOS_DIRECTLENDING_ENUM.FIRMA_SOLICITADA]: {
    TABS: [...commonTabs],
  },
  [ESTADOS_DIRECTLENDING_ENUM.FIRMADO]: {
    TABS: [...commonTabs],
  },
  [ESTADOS_DIRECTLENDING_ENUM.PENDIENTE_PAGO]: {
    TABS: [...commonTabs],
  },
  [ESTADOS_DIRECTLENDING_ENUM.PRECONCEDIDO]: {
    TABS: [...commonTabs],
  },

  [ESTADOS_DIRECTLENDING_ENUM.CONCEDIDO]: {
    TABS: [...commonTabs],
  },
  [ESTADOS_DIRECTLENDING_ENUM.PARCIALMENTE_PAGADO]: {
    TABS: [...commonTabs],
  },
  [ESTADOS_DIRECTLENDING_ENUM.PAGADO]: {
    TABS: [...commonTabs],
  },
  [ESTADOS_DIRECTLENDING_ENUM.DENEGADO]: {
    COLOR: 'danger',
    TABS: [
      {
        value: 0,
        label: 'Garantías',
        component: <Garantias />,
      },
      {
        value: 1,
        label: 'Documentación',
        component: <DocumentationList esResumenDirectLending />,
      },
      {
        value: 2,
        label: 'Contrato',
        component: <Contrato />,
      },
    ],
  },
};

export { CONFIG_RESUMEN };
