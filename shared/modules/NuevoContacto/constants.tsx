/* eslint-disable */
// @ts-nocheck

import DNI from './components/Dni/DNI';
import DocumentosAsociados from './components/DocumentosAsociados';
import EscriturasNombramiento from './components/EscriturasNombramiento';
import FormasDeContacto from './components/FormasDeContacto';
import Nombre from './components/Nombre';
import Representante from './components/Representante';
import TipoContacto from './components/TipoContacto';

export const fieldsIds = {
  tipoDeContacto: 1,
  datosBasicos: 2,
  formasDeContacto: 3,
  datosDelRepresentante: 4,
  documentosAsociados: 5,
};

const docAsociadosFieldId = {
  dni: 1,
  escriturasDeNombramiento: 2,
};

export const formasDeContactoValues = {
  email: 0,
  telefono: 1,
};

export const esRepresentante = { valueYes: 1, valueNo: 2 };
export const fields = (
  comingFromMisDatosFirmantes?: boolean,
  representante?: boolean,
  comingFromGestion?: boolean
) => {
  const fieldsTab = [
    {
      title: 'Tipo de contacto',
      id: fieldsIds.tipoDeContacto,
      body: <TipoContacto />,
    },
    {
      title: 'Datos básicos',
      id: fieldsIds.datosBasicos,
      body: <Nombre />,
    },
    {
      title: 'Formas de contacto',
      id: fieldsIds.formasDeContacto,
      body: <FormasDeContacto comingFromGestion={comingFromGestion} />,
    },
    {
      title: 'Datos del representante',
      id: fieldsIds.datosDelRepresentante,
      body: <Representante />,
    },
    {
      title: 'Documentos asociados (Opcional)',
      id: fieldsIds.documentosAsociados,
      body: <DocumentosAsociados />,
      className: 'documentosAsociados',
    },
  ];

  const fieldTabsKYC = [
    {
      title: 'Datos básicos',
      id: 1,
      body: <Nombre />,
    },
    {
      title: 'Formas de contacto',
      id: 2,
      body: <FormasDeContacto comingFromGestion={comingFromGestion} />,
    },
    {
      title: 'Datos del representante',
      id: 3,
      body: <Representante />,
    },
    {
      title: 'Documentos asociados (Opcional)',
      id: 4,
      body: <DocumentosAsociados />,
      className: 'documentosAsociados',
    },
  ];

  if (representante) {
    return fieldTabsKYC;
  }
  return fieldsTab;
};

export const docAsociadosField = [
  {
    title: 'DNI',
    id: docAsociadosFieldId.dni,
    body: <DNI />,
  },
  {
    title: 'Escrituras de nombramiento',
    id: docAsociadosFieldId.escriturasDeNombramiento,
    body: <EscriturasNombramiento />,
  },
];
