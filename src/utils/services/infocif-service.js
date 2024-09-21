/* eslint-disable class-methods-use-this */
import axios from 'axios';

const axiosInstance = axios.create({
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default class InfocifService {
  getByRazonSocialOrCifOld(searchTerm) {
    return axiosInstance.get(
      `/solr/infocif/select?indent=on&q=RazonSocialNormalizada:(${searchTerm})%20OR%20NIF:(*${searchTerm}*)&sort=TieneCuentas%20DESC&rows=7&wt=json&cif_nombre=${searchTerm}&_=1612964652632`,
      {
        baseURL: 'https://services.infocif.es:8983',
      }
    );
  }

  getByRazonSocialOrCif(searchTerm) {
    return axiosInstance.get(
      `/indice_empresas/_search?source_content_type=application/json&source={"size":10,"sort":{"peso":"desc"},"query": {"query_string": {"default_operator" : "AND","query" : "${searchTerm}*","fields": ["cif","razonsocial"]}}}`,
      {
        baseURL: process.env.REACT_APP_ELASTICSEARCH,
      }
    );
  }
}
