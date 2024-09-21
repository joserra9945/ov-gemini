export const validatePostalCode = (codigoPostal: any) => {
  const POSTAL_CODE_REGEX = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;
  return POSTAL_CODE_REGEX.test(codigoPostal);
};

export const formasJuridicasAutonomosEnum = [
  {
    description: 'NIF sin NIE',
    id: 10,
  },
  {
    description: 'Extranjero con NIE hasta 2008',
    id: 19,
  },
  {
    description: 'Extranjero con NIE desde 2008',
    id: 20,
  },
  {
    description: 'Letra reservada',
    id: 21,
  },
  {
    description: 'Persona con DNI',
    id: 22,
  },
];

export const tipoSociedadSocioEnum = [
  { description: 'Sociedad Anónima', id: 1 },
  { description: 'Sociedad de Responsabilidad Limitada', id: 2 },
  { description: 'Sociedad Cooperativa', id: 6 },
  { description: 'Unión Temporal de Empresas', id: 16 },
  { description: 'Entidades Extranjeras', id: 11 },
  { description: 'Entidades Extranjeras no residentes', id: 18 },
];

export const esSocio = () => {
  return tipoSociedadSocioEnum.find(
    (el) =>
      el?.id === parseInt(sessionStorage.getItem('formaJuridicaId') || '', 10)
  );
};

export const esAutonomo = () => {
  if (sessionStorage.getItem('formaJuridicaId') !== null) {
    const esAuto = formasJuridicasAutonomosEnum.find(
      (el) =>
        el?.id === parseInt(sessionStorage.getItem('formaJuridicaId') || '', 10)
    );
    return esAuto;
  }
};

export const defaultCountry = { name: 'España', id: 66 };
export const defaultCountryEsp = { nombre: 'España', id: 66 };
export const defaultCountrySelectFilter = [
  { nombre: defaultCountry.name, id: defaultCountry.id },
];
