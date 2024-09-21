/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';

import GlobalAppContext from '@shared/context/GlobalAppContext';
import { rolesTypes } from '@shared/utils/roles/config';

interface IUseRole {
  department: string;
  esComercial: boolean;
  esKompas: boolean;
  esIt: boolean;
  esJuridico: boolean;
  esOv: boolean;
  esRiesgos: boolean;
  esTesoreria: boolean;
  puedeTruncar: boolean;
}

const useRole = (): IUseRole => {
  const { userState } = useContext(GlobalAppContext);
  const { department = '' } = userState;
  const defaultRole = [
    rolesTypes.IT,
    rolesTypes.IT_INNOVACION,
    rolesTypes.PROJECT_MANAGER,
  ];

  const esTesoreria = (): boolean => {
    const roles = [...defaultRole, rolesTypes.FINANZAS];
    return roles.includes(department);
  };

  const esComercial = (): boolean => {
    const roles = [...defaultRole, rolesTypes.COMERCIAL, rolesTypes.CRM];
    return roles.includes(department);
  };

  const esIt = (): boolean => {
    return defaultRole.includes(department);
  };

  const esJuridico = (): boolean => {
    const roles = [...defaultRole, rolesTypes.JURIDICO];
    return roles.includes(department);
  };

  const esOv = (): boolean => {
    const roles = [...defaultRole, rolesTypes.OV];
    return roles.includes(department);
  };

  const esRiesgos = (): boolean => {
    const roles = [...defaultRole, rolesTypes.RIESGOS];
    return roles.includes(department);
  };

  const esKompas = (): boolean => {
    const roles = [rolesTypes.KOMPAS];
    return roles.includes(department);
  };

  const puedeTruncar = (): boolean => {
    return esIt() || esRiesgos();
  };

  return {
    department,
    esComercial: esComercial(),
    esKompas: esKompas(),
    esIt: esIt(),
    esJuridico: esJuridico(),
    esOv: esOv(),
    esRiesgos: esRiesgos(),
    esTesoreria: esTesoreria(),
    puedeTruncar: puedeTruncar(),
  };
};

export { useRole };
export type { IUseRole };
