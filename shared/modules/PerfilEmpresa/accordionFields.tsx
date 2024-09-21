import { Actividad } from './components/Actividad';
import Direcciones from './components/Direcciones';
import { Firmantes } from './components/Firmantes';
import { FormasContactoEmpresa } from './components/FormasContactoEmpresa';
import { InformacionCliente } from './components/InformacionCliente';
import { ParticipacionEmpresa } from './components/ParticipacionEmpresa';

export const accordionFields = (
  esSocioArellenar: boolean,
  esAutonomo: boolean,
  vieneDeGenerarContrato: boolean
) => {
  if (vieneDeGenerarContrato) {
    if (esAutonomo) {
      return [
        {
          title: 'Direcciones',
          id: 1,
          body: <Direcciones />,
        },
        {
          title: 'Firmantes',
          id: 2,
          body: <Firmantes />,
          className: 'firmantes-scroll',
        },
      ];
    }

    return [
      {
        title: 'Direcciones',
        id: 1,
        body: <Direcciones />,
      },
      {
        title: 'Firmantes',
        id: 2,
        body: <Firmantes />,
        className: 'firmantes-scroll',
      },
      {
        title: 'Datos de la empresa',
        id: 3,
        body: <FormasContactoEmpresa />,
      },
    ];
  }
  if (esAutonomo) {
    return [
      {
        title: 'Información de cliente',
        id: 1,
        body: <InformacionCliente index={0} />,
      },
      {
        title: 'Direcciones',
        id: 2,
        body: <Direcciones />,
      },
      {
        title: 'Firmantes',
        id: 3,
        body: <Firmantes />,
        className: 'firmantes-scroll',
      },
      {
        title: 'Actividad',
        id: 4,
        body: <Actividad />,
      },
    ];
  }
  if (!esSocioArellenar) {
    return [
      {
        title: 'Información de cliente',
        id: 1,
        body: <InformacionCliente index={0} />,
      },
      {
        title: 'Direcciones',
        id: 2,
        body: <Direcciones />,
      },
      {
        title: 'Firmantes',
        id: 3,
        body: <Firmantes />,
        className: 'firmantes-scroll',
      },
      {
        title: 'Actividad',
        id: 4,
        body: <Actividad />,
      },
      {
        title: 'Datos de la empresa',
        id: 5,
        body: <FormasContactoEmpresa />,
      },
    ];
  }

  const accordionFields = [
    {
      title: 'Información de cliente',
      id: 1,
      body: <InformacionCliente index={0} />,
    },
    {
      title: 'Direcciones',
      id: 2,
      body: <Direcciones />,
    },
    {
      title: 'Firmantes',
      id: 3,
      body: <Firmantes />,
      className: 'firmantes-scroll',
    },
    {
      title: 'Participación de la empresa',

      id: 4,
      body: <ParticipacionEmpresa />,
    },
    {
      title: 'Actividad',

      id: 5,
      body: <Actividad />,
    },
    {
      title: 'Datos de la empresa',
      id: 6,
      body: <FormasContactoEmpresa />,
    },
  ];
  return accordionFields;
};
