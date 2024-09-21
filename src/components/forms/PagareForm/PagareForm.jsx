import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';

import { PagareFields } from '../Fields';

const PagareForm = ({
  pagare,
  setPagare,
  onSubmit,
  isEditing,
  isDisabled,
  showTitle = true,
  rhForm,
}) => {
  const tipoPagare = {
    NO_FICTICIO: 1,
    FICTICIO: 2,
  };

  const { handleSubmit, reset } = rhForm;
  const { pagareFormData } = useSelector((state) => state.effectsState);
  const [cifValue, setCifValue] = useState();

  const updateProperty = useCallback(
    (value, key) => {
      let res = null;

      if (key === 'libradoCif') setCifValue(value);
      if (key === 'esFicticio') res = cloneDeep(pagare);
      else res = pagare;
      res[key] = value;
      setPagare(res);
    },
    [pagare, setPagare]
  );

  useEffect(() => {
    reset(pagare);
  }, [pagare, reset]);

  useEffect(() => {
    if (pagareFormData?.libradoCif) {
      updateProperty(pagareFormData.libradoCif, 'libradoCif');
    }
  }, [pagareFormData, updateProperty]);

  const canShow = () => {
    if (isEditing) {
      return true;
    }
    if (typeof pagare.esFicticio === 'boolean') return !pagare.esFicticio;
    return parseInt(pagare.esFicticio, 10) === tipoPagare.NO_FICTICIO;
  };

  return (
    <div className="pagaré-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formulario-container">
          {showTitle ? (
            <div>
              <h3 className="title-h3 mb-4">Datos del pagaré</h3>
            </div>
          ) : null}
          <PagareFields
            rhForm={rhForm}
            pagare={pagare}
            updateProperty={updateProperty}
            isDisabled={isDisabled}
            canShow={canShow()}
            isEditing={isEditing}
          />
        </div>
      </form>
    </div>
  );
};

export default PagareForm;
