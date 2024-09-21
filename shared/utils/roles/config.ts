import { IRoles } from '@shared/interfaces/IRoles/IRoles';

export const rolesTypes = {
  IT: 'I.T.',
  IT_INNOVACION: 'I.T. Innovación',
  OV: 'OV',
  FINANZAS: 'Finanzas',
  RIESGOS: 'Riesgos',
  COMERCIAL: 'Comercial',
  PROJECT_MANAGER: 'Project Manager',
  ALTA_DIRECCION: 'Alta Dirección',
  JURIDICO: 'Jurídico',
  CRM: 'CRM',
  ICIF: 'Infocif',
  CONTACT_CENTER: 'Contact Center',
  INGRESOS: 'Ingresos',
  KOMPAS: 'Kompas',
};

export const rolesEnum: IRoles[] = [
  {
    name: 'I.T.',
    superAdmin: true,
    key: rolesTypes.IT,
  },
  {
    name: 'I.T. Innovación',
    superAdmin: true,
    key: rolesTypes.IT_INNOVACION,
  },
  {
    name: 'OV',
    key: rolesTypes.OV,
    path: '/gestorDocumental/',
  },
  {
    name: 'Finanzas',
    key: rolesTypes.FINANZAS,
    path: '/pagos/',
  },
  {
    name: 'Riesgos',
    key: rolesTypes.RIESGOS,
    path: '/riesgos/estudios/',
  },
  {
    name: 'Comercial',
    key: rolesTypes.COMERCIAL,
    path: '/gestor-de-empresas/empresas/',
  },
  {
    name: 'Project Manager',
    superAdmin: true,
    key: rolesTypes.PROJECT_MANAGER,
    path: '/gestor-de-empresas/empresas/',
  },
  {
    name: 'CRM',
    key: rolesTypes.CRM,
    path: '/gestor-de-empresas/empresas/',
  },
  {
    name: 'Infocif',
    key: rolesTypes.ICIF,
    path: '/gestor-de-empresas/empresas/',
  },
  {
    name: 'Jurídico',
    key: rolesTypes.JURIDICO,
    path: '/gestion-empresas/',
  },
  {
    name: 'Ingresos',
    key: rolesTypes.INGRESOS,
    path: '/ingresos/',
  },
];

/**
 * I.T.
Project Manager
Riesgos
OV
Finanzas
I.T. Innovación
Alta Dirección
Comercial
Jurídico
CRM
Analytics
Contact Center
Empeño
Infocif
Marketing
Renting
RRHH
SFM
 */
