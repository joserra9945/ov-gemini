/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { tipoStep } from 'utils/stepsConfig/nuevaOperacionFlow';

import { useEmpresaExterna, useProcedimientoDeCobro } from '@shared/hooks';
import {
  estadoEfectoCliente,
  etiquetasFormaDeContacto,
  tipoDocumentoString,
  tipoFormaContactoEnum,
} from '@shared/utils/constants';
import Notifications from '@shared/utils/notificationsOv';

import { Accordion, AccordionTab } from '@shared/components/Legacy/Accordion';
import { Button } from '@shared/components/Legacy/Button';
import { Spinner } from '@shared/components/Legacy/Spinner';

import InputsFechaPago from './InputsFechaPago';

import './Operaciones.scss';

const FechaPagoForm = ({
  selectedEfectos,
  setOpenModalPeriodoPago,
  openModalPeriodoPago,
  onSetSelectedEffects,
  onSetStep,
}) => {
  const rhForm = useForm({ mode: 'onBlur' });
  const [activeTab, setActiveTab] = useState(1);
  const [empresas, setEmpresas] = useState([]);

  const {
    empresaExternaIdGet,
    postEmpresaExternaFormasContacto,
    putEmpresaExternaFormasContacto,
  } = useEmpresaExterna();

  const { procedimientoDeCobroSinCesionAceptadaGet, procedimientoDeCobroPut } =
    useProcedimientoDeCobro();

  const navigate = useNavigate();
  const libradorId = sessionStorage.getItem('libradorId');

  const getValidEfectos = () =>
    selectedEfectos.reduce((accumulator, currentEfecto) => {
      if (
        currentEfecto.estadoEfectoClienteId === estadoEfectoCliente.APROBADO ||
        !esDenegadoPRAS(currentEfecto.scoring)
      ) {
        accumulator.push(currentEfecto.id);
      }
      return accumulator;
    }, []);

  const generarOperacionPlazoPago = () => {
    const resIds = getValidEfectos();
    onSetStep({
      currentStep: tipoStep.RESUMEN_INICIAL,
    });
    onSetSelectedEffects(resIds);
    setOpenModalPeriodoPago(!openModalPeriodoPago);
    navigate(`/nueva-operacion`, {
      state: {
        nuevaOp: true,
        efectos: resIds,
        step: 1,
        isPagareType:
          Array.isArray(selectedEfectos) &&
          selectedEfectos.length &&
          selectedEfectos[0]?.tipo?.id &&
          +selectedEfectos[0].tipo.id === +tipoDocumentoString.PAGARE,
      },
    });
  };

  const { handleSubmit } = rhForm;

  const handleNext = () => {
    setActiveTab((prevTab) => prevTab + 1);
  };

  const handleBack = () => {
    setActiveTab(activeTab - 1);
  };

  const fetchPlazoDePago = useCallback(
    async (libradoId, libradorId) => {
      const res = await procedimientoDeCobroSinCesionAceptadaGet(
        libradoId,
        libradorId
      );
      return res;
    },
    [procedimientoDeCobroSinCesionAceptadaGet]
  );

  const fetchData = useCallback(async () => {
    const empresasArray = [];
    const plazosDePagoArray = [];

    const efectosFiltrados = selectedEfectos.filter((efecto, index) => {
      return (
        index ===
        selectedEfectos.findIndex(
          (selEfec) =>
            selEfec.libradoId === efecto.libradoId &&
            selEfec.libradorId === efecto.libradorId
        )
      );
    });
    for await (const efecto of efectosFiltrados) {
      const res = await empresaExternaIdGet(efecto?.libradoId);
      empresasArray.push(res);
      const plazo = await fetchPlazoDePago(efecto?.libradoId, libradorId);
      plazosDePagoArray.push(plazo);
    }

    const newEmpresas = empresasArray.map((empresa, index) => {
      return {
        ...empresa,
        plazoDePago: plazosDePagoArray[index]?.id
          ? plazosDePagoArray[index]
          : null,
      };
    });
    const empresasConPlazoPago = newEmpresas.filter(
      (empresa) => empresa.plazoDePago
    );
    setEmpresas(empresasConPlazoPago);
  }, [empresaExternaIdGet, fetchPlazoDePago, libradorId, selectedEfectos]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFormSubmit = async (fieldValues) => {
    const empresaActual = {
      ...empresas[activeTab - 1],
    };
    const telefonoForm = fieldValues.telefono;
    const emailForm = fieldValues.email;
    const plazoPagoForm = fieldValues.periodoDePago;

    const telefonoDefault = empresaActual?.formasContacto?.find(
      (contacto) => contacto?.tipo === tipoFormaContactoEnum.MOVIL
    )?.valor;

    const emailDefault = empresaActual?.formasContacto?.find(
      (contacto) => contacto?.tipo === tipoFormaContactoEnum.EMAIL
    )?.valor;

    const emailId = empresaActual?.formasContacto?.find(
      (contacto) => contacto?.tipo === tipoFormaContactoEnum.EMAIL
    )?.id;

    const telefonoId = empresaActual?.formasContacto?.find(
      (contacto) => contacto?.tipo === tipoFormaContactoEnum.MOVIL
    )?.id;

    const formaContactoTelefono = {
      id: telefonoId,
      descripcion:
        etiquetasFormaDeContacto[etiquetasFormaDeContacto.length - 1]
          .description,
      etiquetas: [
        etiquetasFormaDeContacto[etiquetasFormaDeContacto.length - 1].id,
      ],
      tipo: tipoFormaContactoEnum.MOVIL,
      valor: telefonoForm ?? telefonoDefault,
    };

    const formaContactoEmail = {
      id: emailId,
      descripcion:
        etiquetasFormaDeContacto[etiquetasFormaDeContacto.length - 1]
          .description,
      etiquetas: [
        etiquetasFormaDeContacto[etiquetasFormaDeContacto.length - 1].id,
      ],
      tipo: tipoFormaContactoEnum.EMAIL,
      valor: emailForm ?? emailDefault,
    };

    let resTelefono;
    if (telefonoDefault?.trim() !== telefonoForm?.trim()) {
      resTelefono = telefonoId
        ? await putEmpresaExternaFormasContacto(empresaActual.id, [
            formaContactoTelefono,
          ])
        : await postEmpresaExternaFormasContacto(empresaActual.id, [
            formaContactoTelefono,
          ]);
    }
    let resEmail;
    if (emailDefault?.trim() !== emailForm?.trim()) {
      resEmail = emailId
        ? await putEmpresaExternaFormasContacto(empresaActual.id, [
            formaContactoEmail,
          ])
        : await postEmpresaExternaFormasContacto(empresaActual.id, [
            formaContactoEmail,
          ]);
    }
    if (resEmail && resTelefono) {
      Notifications.success({
        title: '¡Éxito!',
        body: 'Se han guardado correctamente las formas de contacto',
      });
    } else {
      if (resEmail && !resTelefono) {
        Notifications.success({
          title: '¡Éxito!',
          body: 'Se han guardado correctamente el email',
        });
      }
      if (!resEmail && resTelefono) {
        Notifications.success({
          title: '¡Éxito!',
          body: 'Se han guardado correctamente el teléfono',
        });
      }
    }

    const plazoDePagoData = {
      id: empresaActual.plazoDePago.id,
      plazoDePago: plazoPagoForm,
    };

    let resPlazo;
    if (empresaActual.plazoDePago.plazoDePago !== plazoPagoForm) {
      resPlazo = await procedimientoDeCobroPut(plazoDePagoData);
      resPlazo &&
        Notifications.success({
          title: '¡Éxito!',
          body: 'Se ha modificado correctamente el plazo de pago',
        });
    }

    (resPlazo || resEmail || resTelefono) && fetchData();
    handleNext();
  };
  if (!empresas.length) {
    return (
      <div className="flex justify-center items-center">
        <Spinner loading color="primary" size={100} />
      </div>
    );
  }

  return (
    <div className="font-roboto">
      <div className="font-medium text-base">
        Para generar el contrato necesitamos la siguiente información de su
        cliente.
      </div>

      <p className="font-bold text-info text-sm">
        Haga clic en el botón 'Continuar' para navegar entre los efectos
        seleccionados.
      </p>

      <Accordion
        controlled
        activeItem={activeTab}
        className="modal__accordion-periodoDePago"
        defaultActiveItem={1}
      >
        {empresas.map((efecto, index) => {
          return (
            <AccordionTab
              id={index + 1}
              title={efecto?.razonSocial}
              className="accordion-section"
              key={efecto?.id}
              expandedOnClick={false}
            >
              <InputsFechaPago
                efecto={efecto}
                handleFormSubmit={handleFormSubmit}
                activeTab={activeTab}
                handleBack={handleBack}
              />
            </AccordionTab>
          );
        })}
      </Accordion>

      <div className="flex flex-row justify-end">
        {activeTab === empresas.length + 1 && (
          <div className="flex gap-4">
            <Button
              className={`button-prev ${
                activeTab === 0 && 'button__prev-nuevoContacto'
              }`}
              label="Atrás"
              onClick={handleBack}
            />
            <Button
              className="button-generarContrato"
              cy-id="generarContrato"
              label="Generar contrato"
              onClick={handleSubmit(generarOperacionPlazoPago)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FechaPagoForm;
