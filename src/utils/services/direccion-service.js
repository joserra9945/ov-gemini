/* eslint-disable class-methods-use-this */
import axios from 'axios';

export default class DireccionService {
  formObject(data, isEdit = false, isLibrado = false) {
    const {
      iden,
      codigoPostal,
      direccion,
      notificar,
      poblacion,
      tipoDireccion,
      tipo,
      empresaId,
      lastModificationTime,
    } = data;

    if (isEdit) {
      return {
        id: iden,
        calle: direccion,
        codigoPostal,
        empresaId: isLibrado ? empresaId : sessionStorage.getItem('libradorId'),
        notificacionesActivas: notificar === 1,
        poblacionId: poblacion.id,
        tipoDireccion: tipo || tipoDireccion,
        lastModificationTime,
      };
    }
    return {
      calle: direccion,
      codigoPostal,
      empresaId: isLibrado ? empresaId : sessionStorage.getItem('libradorId'),
      notificacionesActivas: notificar === 1,
      poblacionId: poblacion.id,
      tipoDireccion: tipo || tipoDireccion,
    };
  }

  /**
   *
   * Método POST de almacenado de datos de direcciones.
   * @param {*} form entradas del formulario.
   */
  postDireccionBulk(form, isLibrado = false, empresaId) {
    const libradorId = sessionStorage.getItem('libradorId');
    const datos = form.direcciones.map((data) =>
      this.formObject(data, false, isLibrado)
    );
    return axios.post(
      `api/EmpresaExterna/direcciones`,
      {
        id: isLibrado ? empresaId : libradorId,
        direcciones: datos,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  putDireccionBulk(form, isLibrado = false, empresaId) {
    const libradorId = sessionStorage.getItem('libradorId');
    const datos = form.direcciones.map((data) =>
      this.formObject(data, true, isLibrado)
    );

    return axios.put(
      `api/EmpresaExterna/direcciones`,
      {
        id: isLibrado ? empresaId : libradorId,
        direcciones: datos,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getDireccionesByEmpresaActiva() {
    return axios.get(
      `api/EmpresaExterna/direcciones/by-empresa-activa?MaxResultCount=100`
    );
  }

  getDireccionesById(empresaId) {
    return axios.get(`api/EmpresaExterna/${empresaId}/direcciones`);
  }

  deleteById(empresaId, id) {
    return axios.delete(`api/EmpresaExterna/${empresaId}/direccion-id/${id}`);
  }
}
