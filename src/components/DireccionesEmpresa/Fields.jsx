/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import DireccionService from 'utils/services/direccion-service';
import PoblacionService from 'utils/services/poblacion-service';
import ProvinciaService from 'utils/services/provincia-service';
import { faTrashAlt, faTrashCan } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ConfirmDialogModal from '@shared/components/ConfirmDialogModal';

import CodigoPostal from './Templates/CodigoPostal';
import Direccion from './Templates/Direccion';
import Pais from './Templates/Pais';
import Poblacion from './Templates/Poblacion';
import Provincia from './Templates/Provincia';
import Tipo from './Templates/Tipo';

const direccionService = new DireccionService();
const poblacionService = new PoblacionService();
const provinciaService = new ProvinciaService();

const Fields = ({
  item = {},
  index,
  countries,
  isEdit,
  remove,
  rhForm,
  provincias,
  update,
}) => {
  const { trigger, setValue, getValues } = rhForm;
  const [paisSel, setPaisSel] = useState(item?.pais);
  const [poblaciones, setPoblaciones] = useState([]);
  const [reorderedCountries, setReorderedCountries] = useState([]);
  const [visible, setVisible] = useState(false);
  const [codigoPostal, setCodigoPostal] = useState();

  const updateProperty = useCallback(
    async (fieldName, newValue) => {
      if (index != null) {
        const currentValues = getValues().direcciones[index];
        const direccionValue = { ...currentValues, [fieldName]: newValue };
        update(index, direccionValue);
      }
    },
    [getValues, index, update]
  );

  const reorderPaises = (countries) => {
    const auxArray = countries.filter((row) => row.nombre !== 'España');
    const auxItem = countries.filter((row) => row.nombre === 'España');
    auxArray.unshift(auxItem[0]);
    return auxArray;
  };

  const fetchProvincia = useCallback(async () => {
    const res = await provinciaService.getProvinciaByCodigoPostal(codigoPostal);
    if (res) {
      const seleccion = provincias?.find(
        (provincia) => res?.id === provincia?.id
      );
      updateProperty('provincia', seleccion);
    }
  }, [codigoPostal, provincias, updateProperty]);

  const fetchPoblacion = useCallback(async () => {
    const res = await poblacionService.getPoblacionByCodigoPostal(codigoPostal);
    if (res) {
      updateProperty('poblacion', res?.items[0]);
      setPoblaciones(res?.items);
    }
  }, [codigoPostal, updateProperty]);

  const fetchPoblacionByProvinciaId = (selectedProvincia) => {
    if (selectedProvincia) {
      poblacionService.getPoblaciones(selectedProvincia.id).then((resp) => {
        let seleccion = resp?.find(
          (poblacion) => item?.poblacion?.id === poblacion?.id
        );
        if (!seleccion) {
          [seleccion] = resp;
        }
        updateProperty('poblacion', seleccion);
        setPoblaciones(resp);
      });
    }
  };

  useEffect(() => {
    if (countries) {
      setReorderedCountries(reorderPaises(countries));
    }
  }, [countries]);

  useEffect(() => {
    if (!reorderedCountries) return;
    setPaisSel(reorderedCountries[0]);
    setValue(`direcciones[${index}][pais]`, reorderedCountries[0]);
    trigger(`direcciones[${index}][pais]`);
  }, [reorderedCountries, setValue, trigger, index, item]);

  useEffect(() => {
    const fetchInfo = async () => {
      await fetchProvincia();
      await fetchPoblacion();
    };
    if (codigoPostal && !codigoPostal?.includes('_')) {
      fetchInfo();
    }
  }, [codigoPostal, fetchPoblacion, fetchProvincia]);

  const isFirstElement = () => index === 0;

  const tipoDireccion = [
    { nombre: 'Social', value: 1, disabled: !isFirstElement() },
    { nombre: 'Comercial', value: 2 },
  ];

  const onSetCodigoPostal = (e) => {
    setCodigoPostal(e);
  };

  return (
    <div className="direcciones-empresa--fields">
      {/* {index === 0 && JSON.stringify(rhForm.getValues()?.direcciones[index])} */}
      <div className="row">
        <div className="col-md-6">
          <Tipo
            rhForm={rhForm}
            item={item}
            index={index}
            isFirstElement={isFirstElement}
            tipoDireccion={tipoDireccion}
          />
        </div>
        <div className="col-md-6">
          <Direccion rhForm={rhForm} item={item} index={index} />
        </div>
        <div className="col-md-3">
          <CodigoPostal
            rhForm={rhForm}
            item={item}
            index={index}
            onSetCodigoPostal={onSetCodigoPostal}
          />
        </div>
        <div className="col-md-3">
          <Provincia
            rhForm={rhForm}
            index={index}
            paisSel={paisSel}
            provincias={provincias}
            item={item}
            fetchPoblaciones={fetchPoblacionByProvinciaId}
          />
        </div>
        <div className="col-md-3">
          <Poblacion
            rhForm={rhForm}
            index={index}
            paisSel={paisSel}
            poblaciones={poblaciones}
            item={item}
          />
        </div>
        <div className="col-md-3">
          {reorderedCountries && (
            <Pais
              rhForm={rhForm}
              item={item}
              index={index}
              reorderedCountries={reorderedCountries}
              setPaisSel={setPaisSel}
            />
          )}
        </div>
      </div>
      <input
        type="hidden"
        {...rhForm.register(`direcciones[${index}].iden`)}
        name={`direcciones[${index}].iden`}
      />
      <input
        type="hidden"
        {...rhForm.register(`direcciones[${index}].lastModificationTime`)}
        name={`direcciones[${index}].lastModificationTime`}
      />
      <div
        hidden={item?.iden || index === 0}
        className="col-md-12 p-field align-self-end pull-right"
        style={{ textAlign: 'end', height: '100%' }}
      >
        <Button
          type="button"
          className="p-button-text p-eliminar"
          onClick={() => {
            if (isEdit) {
              setVisible(true);
            } else {
              remove(index);
            }
          }}
        >
          <FontAwesomeIcon
            color="#2196F3"
            icon={faTrashAlt}
            style={{ marginRight: '10px' }}
          />
          Eliminar
        </Button>
      </div>
      <ConfirmDialogModal
        isOpen={visible}
        onClose={() => setVisible(false)}
        bodyText="Si eliminas esta dirección, no la podrás recuperar. ¿Estás seguro de eliminarla?"
        labelConfirm="Eliminar"
        labelCancel="Cancelar"
        onConfirm={() => {
          direccionService
            .deleteById(item.empresaId, item.iden)
            .then(() => remove(index));
        }}
        iconHeader={faTrashCan}
        colorIconHeader="danger"
      />
    </div>
  );
};
export default Fields;
