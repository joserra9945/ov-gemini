export const pagareParser = (pagare) => ({
  importeNominal: pagare?.efectoImporteNominal,
  libradoCif: pagare?.efectoLibradoCif,
  libradoRazonSocial: pagare?.efectoLibradoRazonSocial,
  numero: '',
  fechaEmision: pagare?.efectoFechaEmision
    ? new Date(pagare?.efectoFechaEmision)
    : '',
  fechaVencimiento: pagare?.efectoFechaVencimiento
    ? new Date(pagare?.efectoFechaVencimiento)
    : '',
  lugarEmision: pagare?.efectoLugarEmision,
  ...pagare,
});
