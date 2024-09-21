/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash';

import useDebounce from '@shared/hooks/useDebounce';
import useWindowSize from '@shared/hooks/useWindowsSize';
import { tipoDocumentoString } from '@shared/utils/constants';

import { Button } from '@shared/components/Legacy/Button';

import TipoCesionDialog from 'components/Dialogs/TipoCesionDialog';

import * as Actions from '../../../store/actions/actions-effect';
import { FacturaFields } from '../Fields';

import './facturaForm.scss';

const FacturaForm = ({
  factura,
  setFactura,
  onSubmit,
  isEditing,
  isDisabled,
  isFacturaPagare,
  libradorCif,
  fetchPagares,
  uploadAnotherEffectType,
  disableAddPagares = false,
  showTitle = true,
  showButtonPagare = true,
  showFechaVencimiento = true,
  rhForm,
}) => {
  const tipoFactura = {
    NO_FICTICIA: 1,
    FICTICIA: 2,
  };
  const dispatch = useDispatch();

  const [isShowingDialog, setIsShowingDialog] = useState(false);

  const { handleSubmit, reset, getValues } = rhForm;
  const [cifValue, setCifValue] = useState();
  const windowSize = useWindowSize();
  const desktopVersion = windowSize.width > 1000;
  const debouncedSearchTerm = useDebounce(cifValue, 500);

  const updateProperty = (value, key) => {
    let res = null;
    if (key === 'libradoCif') {
      setCifValue(value);
    }
    if (key === 'esFicticio') res = cloneDeep(factura);
    else res = factura;
    res[key] = value;
    setFactura(res);
  };

  useEffect(() => {
    if (fetchPagares && debouncedSearchTerm) fetchPagares(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchPagares]);

  useEffect(() => {
    reset(factura);
  }, [factura, reset]);

  const canShow = () => {
    if (isEditing) {
      return true;
    }
  };

  const handleAnyadirPagare = () => {
    const currentValues = getValues();
    const allValuesWithoutNumberOfIncome = {
      ...currentValues,
      numero: undefined,
    };
    dispatch(Actions.persistPagareFormData(allValuesWithoutNumberOfIncome));
    uploadAnotherEffectType({ tipoEfecto: +tipoDocumentoString.PAGARE });
  };

  return (
    <div className="factura-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        {showButtonPagare && (
          <div className="mb-4 flex justify-end">
            <Button
              id="addPagare"
              label="Añadir pagaré"
              disabled={disableAddPagares}
              onClick={() => {
                handleAnyadirPagare();
              }}
            />
          </div>
        )}

        <div className="formulario-container">
          {showTitle ? (
            <div className="titulo-stepper-card">
              <h3 className="mb-4 title-h3">Datos de la factura</h3>
            </div>
          ) : null}
          <FacturaFields
            libradorCif={libradorCif}
            rhForm={rhForm}
            factura={factura}
            updateProperty={updateProperty}
            isFacturaPagare={isFacturaPagare}
            showEsFicticia={!isFacturaPagare && !isEditing}
            canShow={canShow()}
            isDisabled={isDisabled}
            showFechaVencimiento={showFechaVencimiento}
          />
        </div>
      </form>
      {isShowingDialog && (
        <TipoCesionDialog onClose={() => setIsShowingDialog(false)} />
      )}
    </div>
  );
};

export default FacturaForm;
