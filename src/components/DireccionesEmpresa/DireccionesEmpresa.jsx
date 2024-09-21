/* eslint-disable @typescript-eslint/no-shadow */
import React, { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import DireccionService from 'utils/services/direccion-service';
import PaisService from 'utils/services/pais-service';
import ProvinciaService from 'utils/services/provincia-service';

import { tipoDireccionEnum } from '@shared/utils/constants';
import { isEmptyObject } from '@shared/utils/utilsOv';

import { Button } from '@shared/components/Legacy/Button';

import Card from 'components/Hocs/Card';

import Fields from './Fields';

import './direccionesEmpresa.scss';

const direccionService = new DireccionService();
const paisService = new PaisService();
const provinciaService = new ProvinciaService();

const DireccionesEmpresa = ({
  edit = false,
  onPreviousStep = false,
  onNextStep = false,
  singlePageParams = {},
  setSinglePageParams,
}) => {
  const [botonDisabled, setBotonDisabled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [, setIsFetching] = useState(true);
  const [countries, setCountries] = useState([]);
  const [provincias, setProvincias] = useState([]);

  const rhForm = useForm({ mode: 'onChange' });
  const { control, handleSubmit, formState, errors, clearErrors, getValues } =
    rhForm;
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'direcciones',
    keyName: 'key',
  });

  const addDireccion = useCallback(
    (defaultValues, fieldsLength = null) => {
      append(
        defaultValues || {
          tipo: !fieldsLength
            ? tipoDireccionEnum.SOCIAL
            : tipoDireccionEnum.COMERCIAL,
          pais: '',
          direccion: '',
          codigoPostal: null,
          provincia: null,
          poblacion: null,
          notificar: 2,
          iden: null,
          lastModificationTime: null,
        }
      );
    },
    [append]
  );

  const postDirecciones = (data) => direccionService.postDireccionBulk(data);

  const putDirecciones = (data) => direccionService.putDireccionBulk(data);

  const handleNextStep = useCallback(() => {
    if (onNextStep) onNextStep();
  }, [onNextStep]);

  const onSubmitToParent = useCallback(() => {
    setSinglePageParams((singlePageParams) => {
      if (singlePageParams) {
        return {
          ...singlePageParams,
          submitFinishedForm: true,
        };
      }
      return singlePageParams;
    });
    handleNextStep();
  }, [setSinglePageParams, handleNextStep]);

  const onSubmit = useCallback(
    async (data) => {
      const onFail = () => {
        setIsSubmitted(false);
        setSinglePageParams((sp) => ({
          ...sp,
          parentSubmit: false,
          formSubmitting: false,
          submitFinishedForm: false,
        }));
      };
      setIsSubmitted(true);
      if (!edit) {
        await postDirecciones(data)
          .then(() => {
            onSubmitToParent();
          })
          .catch(() => {
            onFail();
          });
      } else {
        const { direcciones } = data;
        const request = [];
        const direccionesPutBulk = [];
        const direccionesPostBulk = [];

        if (direcciones.length) {
          direcciones.forEach((direccion) => {
            const newItem = { ...direccion };
            if (direccion.iden) {
              direccionesPutBulk.push(newItem);
            } else {
              direccionesPostBulk.push(newItem);
            }
          });

          if (direccionesPostBulk.length > 0)
            request.push(postDirecciones({ direcciones: direccionesPostBulk }));

          if (direccionesPutBulk.length > 0)
            request.push(putDirecciones({ direcciones: direccionesPutBulk }));

          Promise.all(request)
            .then(() => {
              onSubmitToParent();
            })
            .catch(() => {
              onFail();
            });
        }
      }
    },
    [edit, onSubmitToParent, setSinglePageParams]
  );

  useEffect(() => {
    if (setSinglePageParams) {
      setSinglePageParams((singlePageParams) => {
        if (singlePageParams) {
          return {
            ...singlePageParams,
            validForm: formState.isValid,
          };
        }
        setBotonDisabled(!formState.isValid);
        return singlePageParams;
      });
    }
  }, [formState.isValid, setSinglePageParams]);

  useEffect(() => {
    paisService.getPaises().then((res) => {
      setCountries(res);
    });

    provinciaService.getProvincia().then((res) => {
      setProvincias(res.items);
    });
  }, []);

  useEffect(() => {
    if (countries.length === 0 || provincias.length === 0) return;

    const fetchDirecciones = () => {
      direccionService
        .getDireccionesByEmpresaActiva()
        .then(async (direcciones) => {
          const res = [];
          if (direcciones?.items?.length > 0) {
            direcciones.items.forEach((direccion) => {
              const pais = countries.find(
                (country) => country.id === direccion.paisId
              );

              const provincia = provincias.find(
                (provincia) => provincia.id === direccion.provinciaId
              );

              res.push({
                iden: direccion.id,
                tipo: direccion?.tipoDireccion?.id,
                direccion: direccion.calle,
                pais,
                codigoPostal: direccion.codigoPostal,
                provincia: provincia
                  ? {
                      id: provincia?.id,
                      nombre: provincia?.nombre,
                    }
                  : null,
                poblacion: {
                  id: direccion?.poblacionId,
                  nombre: direccion?.poblacionNombre,
                },
                notificar: direccion.notificacionesActivas ? 1 : 2,
                lastModificationTime: direccion.lastModificationTime,
                empresaId: sessionStorage.getItem('libradorId'),
              });
            });
            await addDireccion(res);
          } else {
            addDireccion();
          }
        })
        .finally(() => setIsFetching(false));
    };
    fetchDirecciones();
  }, [countries, provincias, addDireccion]);

  useEffect(() => {
    clearErrors(`direcciones[${fields.length - 1}]`);
  }, [errors, clearErrors, fields.length]);

  useEffect(() => {
    if (setSinglePageParams) {
      setSinglePageParams((singlePageParams) => {
        if (
          singlePageParams &&
          singlePageParams.parentSubmit &&
          !singlePageParams.formSubmitting
        ) {
          onSubmit(getValues());
          return {
            ...singlePageParams,
            formSubmitting: true,
          };
        }
        return singlePageParams;
      });
    }
  }, [setSinglePageParams, onSubmit, getValues, singlePageParams.parentSubmit]);

  return (
    <Card className="card--add-padding card--margin-bottom">
      <div className="form-direcciones-empresa">
        <form>
          <div className="title bolder">Direcciones de tu empresa</div>
          {fields.map((item, index) => {
            return (
              <div
                key={item.iden || item.key}
                className="direccion-form-container"
              >
                <Fields
                  item={item}
                  isEdit={item?.iden !== null}
                  countries={countries}
                  provincias={provincias}
                  index={index}
                  remove={remove}
                  update={update}
                  rhForm={rhForm}
                />
              </div>
            );
          })}
          <div className="add-new-direction-container">
            <Button
              label="+ Añadir otra dirección"
              link
              disabled={botonDisabled}
              onClick={(e) => {
                e.preventDefault();
                addDireccion(null, fields.length + 1);
              }}
            />
          </div>
        </form>
        <div className="footer-buttons justify-content-center">
          <div className="col-9 p-0">
            <div className="row">
              {onPreviousStep && (
                <div className="col-md-4">
                  <Button
                    onClick={onPreviousStep}
                    label="Volver"
                    iconPos="right"
                    type="submit"
                  />
                </div>
              )}
              {isEmptyObject(singlePageParams) && (
                <div className={onPreviousStep ? 'col-md-8' : 'col-md-12'}>
                  <Button
                    disabled={botonDisabled || isSubmitted}
                    label="Guardar Dirección"
                    iconPos="right"
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DireccionesEmpresa;
