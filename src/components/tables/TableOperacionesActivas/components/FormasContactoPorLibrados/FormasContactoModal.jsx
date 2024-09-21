import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@shared/components/Button';
import { Spinner } from '@shared/components/Spinner';
import { useEmpresaExterna } from '@shared/hooks';
import {
  etiquetasFormaDeContacto,
  tipoFormaContactoEnum,
} from '@shared/utils/constants';

import { Accordion, AccordionTab } from '@shared/components/Legacy/Accordion';

import FormFormasContacto from './FormFormasContacto';

const FormasContactoModal = ({ operacionActiva, closeModal }) => {
  const [librados, setLibrados] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const { libradosByOperacionIdGet } = useEmpresaExterna();
  const {
    empresaExternaIdGet,
    postEmpresaExternaFormasContacto,
    putEmpresaExternaFormasContacto,
  } = useEmpresaExterna();

  const rhForm = useForm({ mode: 'onBlur' });

  const fetchData = useCallback(async () => {
    const res = await libradosByOperacionIdGet(operacionActiva.id);

    const libradosArray = res.items;
    if (res.items) {
      const empresasArray = [];
      for await (const efecto of libradosArray) {
        const resFormaContacto = await empresaExternaIdGet(efecto.id);
        const objetoCombinado = {
          ...efecto,
          formasContacto: resFormaContacto.formasContacto.filter(
            (fc) =>
              fc.tipo === tipoFormaContactoEnum.EMAIL ||
              fc.tipo === tipoFormaContactoEnum.MOVIL
          ),
        };
        empresasArray.push(objetoCombinado);
      }
      setLibrados(empresasArray);
    }
  }, [empresaExternaIdGet, libradosByOperacionIdGet, operacionActiva.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!librados.length) {
    return (
      <div className="flex justify-center items-center">
        <Spinner loading color="primary" size={30} />
      </div>
    );
  }
  const handleBack = () => setActiveTab((prevTab) => prevTab - 1);
  const handleClose = () => closeModal();
  const handleNext = () => {
    setActiveTab((prevTab) => prevTab + 1);
    activeTab === librados.length && handleClose();
  };

  const onSubmit = async (fieldValues) => {
    const { formasContacto } = librados[activeTab - 1];
    const libradoId = librados[activeTab - 1].id;

    const emailFormaContacto = formasContacto.find(
      (fc) => fc.tipo === tipoFormaContactoEnum.EMAIL
    );
    const telefonoFormaContacto = formasContacto.find(
      (fc) => fc.tipo === tipoFormaContactoEnum.MOVIL
    );

    if (
      emailFormaContacto?.valor === fieldValues[`email${activeTab - 1}`] &&
      telefonoFormaContacto?.valor === fieldValues[`telefono${activeTab - 1}`]
    ) {
      handleNext();
    } else {
      if (emailFormaContacto?.valor !== fieldValues[`email${activeTab - 1}`]) {
        if (emailFormaContacto?.valor) {
          const newEmail = {
            ...emailFormaContacto,
            valor: fieldValues[`email${activeTab - 1}`],
            etiquetas: [emailFormaContacto.etiquetas[0]?.id],
          };
          delete newEmail.origen;
          await putEmpresaExternaFormasContacto(libradoId, [newEmail]);
        } else {
          const formaContactoEmail = {
            descripcion: '',
            etiquetas: [
              etiquetasFormaDeContacto[etiquetasFormaDeContacto.length - 1].id,
            ],
            tipo: tipoFormaContactoEnum.EMAIL,
            valor: fieldValues[`email${activeTab - 1}`],
          };
          await postEmpresaExternaFormasContacto(libradoId, [
            formaContactoEmail,
          ]);
        }
      }
      if (
        telefonoFormaContacto?.valor !== fieldValues[`telefono${activeTab - 1}`]
      ) {
        if (fieldValues[`telefono${activeTab - 1}`]) {
          if (telefonoFormaContacto?.valor) {
            const newTelefono = {
              ...telefonoFormaContacto,
              etiquetas: [emailFormaContacto.etiquetas[0]?.id],
              valor: fieldValues[`telefono${activeTab - 1}`],
            };
            delete newTelefono.origen;
            await putEmpresaExternaFormasContacto(libradoId, [newTelefono]);
          } else {
            const formaContactoTelefono = {
              descripcion: '',
              etiquetas: [
                etiquetasFormaDeContacto[etiquetasFormaDeContacto.length - 1]
                  .id,
              ],
              tipo: tipoFormaContactoEnum.MOVIL,
              valor: fieldValues[`telefono${activeTab - 1}`],
            };
            await postEmpresaExternaFormasContacto(libradoId, [
              formaContactoTelefono,
            ]);
          }
        }
      }
      handleNext();
    }
  };

  return (
    <div>
      <Accordion
        controlled
        activeItem={activeTab}
        className="modal__accordion-periodoDePago"
        defaultActiveItem={1}
      >
        {librados.map((librado, index) => {
          return (
            <AccordionTab
              id={index + 1}
              title={`${librado.cif} | ${librado.razonSocial}`}
              className="text-primary"
              key={librado?.id}
              expandedOnClick={false}
            >
              <FormFormasContacto
                index={index}
                librado={librado}
                id={librado.id}
                rhForm={rhForm}
              />
            </AccordionTab>
          );
        })}
      </Accordion>

      <div className="flex flex-row justify-end mt-8">
        <div className="flex gap-2">
          <Button
            onClick={activeTab === 1 ? handleClose : handleBack}
            text={activeTab === 1 ? 'Cancelar' : 'Atrás'}
            type="text-button"
          />
          <Button
            color="primary"
            onClick={rhForm.handleSubmit(onSubmit)}
            text={
              activeTab === librados.length ? 'Continuar y salir' : 'Continuar '
            }
            type="button"
          />
        </div>
      </div>
    </div>
  );
};

export default FormasContactoModal;
