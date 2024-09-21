export const parseFormasContacto = (formasContacto) => {
  return formasContacto?.length
    ? formasContacto?.map(
        ({ id: fcId, valor, tipo, descripcion, etiquetas: fcEtiquetas }) => {
          const formaContacto = {
            descripcion,
            valor,
            tipo,
            etiquetas: fcEtiquetas?.length
              ? fcEtiquetas?.map(({ id }) => id)
              : [],
          };
          if (fcId) {
            formaContacto.id = fcId;
          }
          return formaContacto;
        }
      )
    : [];
};

export const toPersonaData = (data) => {
  let basicData = {
    apellidos: data?.apellidos,
    departamento: data?.departamento,
    empresaId: data?.empresaId,
    esPuestoPublico: data?.esPuestoPublico,
    formasContacto: parseFormasContacto(data?.formasContacto),
    nombre: data?.nombre,
    origen: 2,
    puesto: data?.puesto,
  };

  if (data?.id) {
    basicData = {
      ...basicData,
      id: data?.id,
      lastModificationTime: data?.lastModificationTime,
    };
  }

  return basicData;
};

export const personaModalKyc = (data) => {
  return {
    id: data?.id,
    apellidos: data?.apellidos,
    formasContacto: parseFormasContacto(data?.formasContacto),
    empresaId: data?.empresaId,
    esPuestoPublico: data?.esPuestoPublico,
    nombre: data?.nombre,
  };
};
