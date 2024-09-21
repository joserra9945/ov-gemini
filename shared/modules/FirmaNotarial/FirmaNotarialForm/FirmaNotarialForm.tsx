import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { tipoFirmaEnum } from '@shared/enum/firmaNotarial';
import useDatosFirmaNotarial from '@shared/hooks/useDatosFirmaNotarial';
import { DatosFirma } from '@shared/modules/FirmaNotarial/DatosFirma';
import {
  firmNotarialFormActionsBuilder,
  firmNotarialFormFieldsBuilder,
} from '@shared/modules/FirmaNotarial/DatosFirmaForm';
import { tipoFirmasEnum } from '@shared/utils/constants';

const schema = yup.object({
  tipo: yup.number().required('El tipo es obligatorio'),
  fechaPrevista: yup
    .date()
    .required('La fecha prevista es obligatoria')
    .transform((value, originalValue) =>
      originalValue === null ? undefined : value
    )
    .nullable(),
  administradorApoderador: yup
    .string()
    .required('El administrador / apoderador es obligatorio'),
  notarioLocalId: yup
    .string()
    .when('tipo', ([tipo], sch) =>
      tipo === tipoFirmasEnum.PARCIAL
        ? sch.required('La notaría local es obligatoria')
        : sch.notRequired()
    ),
  notarioId: yup.string().required('La notaría es obligatoria'),
  representantes: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string(),
        value: yup.string().required('El id del firmante es obligatorio'),
      })
    )
    .min(1, 'Los firmantes son obligatorios')
    .required('Los firmantes son obligatorios'),
  email: yup
    .string()
    .email('El email no es válido')
    .required('El email es obligatorio'),
  telefono: yup.string().required('El número de teléfono es obligatorio'),
});

interface FirmaNotarialFormProps {
  firmaNotarialId?: string;
  libradorId?: string;
  empresaInternaId?: string;
  callback?: () => Promise<void>;
  id?: string;
  canEdit?: boolean;
  isAdUser?: boolean;
  showTitle?: boolean;
  showFirmaNotarialButton?: boolean;
  tipo?: tipoFirmaEnum;
}

const FirmaNotarialForm: FC<FirmaNotarialFormProps> = ({
  firmaNotarialId,
  libradorId,
  empresaInternaId,
  callback = async () => {},
  id = '',
  canEdit,
  isAdUser = false,
  showTitle,
  showFirmaNotarialButton,
  tipo = tipoFirmaEnum.CESIONES,
}) => {
  const {
    hasFirmaNotarial,
    loading,
    firmaNotarial,
    isOpen,
    representantes,
    tiposFirmaNotarial,
    apoderados,
    notariosLocales,
    notariosProvincia,
    setUpFirmaNotarial,
    handleSubmit,
    handleCreateFirmaNotarial,
    handleCanEdit,
    handleVincularFirma,
    closeModal,
    fetchRepresentantes,
    fetchTipos,
    fetchNotariosLocales,
    fetchApoderados,
    fetchNotariosProvincia,
    handleClickGoTo,
    mapFirmaNotarialFromApi,
  } = useDatosFirmaNotarial({
    empresaInternaId,
    libradorId,
    firmaNotarialId,
    tipo,
  });

  const rhForm = useForm({
    resolver: yupResolver(schema),
    values: mapFirmaNotarialFromApi(),
    shouldFocusError: false,
  });

  const tipoFirma = rhForm.watch('tipo');

  useEffect(() => {
    fetchRepresentantes();
    fetchTipos();
    fetchNotariosLocales();
    fetchApoderados();
    fetchNotariosProvincia();
  }, [
    fetchApoderados,
    fetchNotariosLocales,
    fetchRepresentantes,
    fetchTipos,
    fetchNotariosProvincia,
  ]);

  useEffect(() => {
    setUpFirmaNotarial();
  }, [firmaNotarialId, setUpFirmaNotarial]);

  return (
    <DatosFirma
      rhForm={rhForm}
      fields={firmNotarialFormFieldsBuilder({
        representantes,
        tiposFirmaNotarial,
        apoderados,
        notariosLocales,
        notariosProvincia,
        tipoFirma,
        isAdUser,
        canEdit: handleCanEdit({ isAdUser, canEdit }),
      })}
      actions={firmNotarialFormActionsBuilder({
        handleClickGoTo,
        showFirmaNotarialButton,
        canEdit: handleCanEdit({ isAdUser, canEdit }),
      })}
      onSubmit={rhForm.handleSubmit((formData) =>
        handleSubmit({
          formData,
          isAdUser,
          callback,
          tipo,
          id,
        })
      )}
      showTitle={showTitle}
      hasFirmaNotarial={!!hasFirmaNotarial}
      loading={loading}
      nodata={{
        show: !hasFirmaNotarial && !loading,
        create: handleCreateFirmaNotarial,
      }}
      vincularFirma={{
        show: !firmaNotarialId && !!firmaNotarial,
        open: isOpen,
        onClose: closeModal,
        onClick: (option: string) =>
          handleVincularFirma({ option, id, callback, tipo }),
        firma: firmaNotarial,
      }}
    />
  );
};

export default FirmaNotarialForm;
