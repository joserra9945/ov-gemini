import React from 'react';
import { InputText } from 'primereact/inputtext';

import { InputCurrency } from '@shared/components/Legacy/CustomInputs';

import InputCalendar from '../../../utils/forms/Calendar';

const FacturaPagareForm = ({ data, setData }) => {
  const updateProperty = (value, key) => {
    const res = data;
    res[key] = value;
    setData(res);
  };

  // useEffect(() => {
  //     console.log('datos', data)
  // }, [data])

  return (
    <div className="factura-pagare-form">
      <div className="numero-field">
        <label htmlFor="numero">Nº factura</label>
        <InputText
          name="numero"
          defaultValue={data.numero}
          onChange={(e) => updateProperty(e.target.value, 'numero')}
        />
      </div>
      <div className="fecha-vencimiento-field">
        <label htmlFor="fecha">Fecha</label>
        <InputCalendar
          onChange={(e) => {
            updateProperty(e, 'fecha');
          }}
          value={data.fecha}
          placeholder="DD/MM/YYYY"
          name="fecha"
        />
      </div>
      <div className="importe-field">
        <label htmlFor="importe">Importe</label>
        <InputCurrency
          name="importe"
          onChange={(e) => {
            updateProperty(e.value, 'importe');
          }}
          value={data.importe}
          onFocus={(e) => {
            e.target.setSelectionRange(0, e.target.value.length);
          }}
        />
      </div>
    </div>
  );
};

export default FacturaPagareForm;
