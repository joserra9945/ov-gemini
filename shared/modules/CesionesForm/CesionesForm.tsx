import { useCallback, useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { To, useLocation, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';

import Card from '@shared/components/CardGeneric';
import { GenericButton } from '@shared/components/GenericButton';
import { Spinner } from '@shared/components/Spinner';
import { InputCurrency } from '@shared/form';
import { useCesion, useDocumento, useDocumentoDeCesion } from '@shared/hooks';
import {
  ICesionBodyPost,
  ICesionByIdGet,
} from '@shared/interfaces/api/ICesion';
import {
  tipoCesionOv,
  tipoDocumento,
  tipoFirmasEnum,
} from '@shared/utils/constants';
import { newFormatDateUTC } from '@shared/utils/formatters';
import notifications from '@shared/utils/notifications';

import { CesionContrato } from './components/CesionContrato';
import { DatosEmpresa } from './components/DatosEmpresa';
import { stepsEnum } from './constants/constants';

type CesionesFormProps = {
  libradorId: string;
  isAdUser: boolean;
  backButtonURL?: To;
  isGestion?: boolean;
  standAlone?: boolean;
  callBack?: () => void;
  cesionType?: number;
};

const CesionesForm = ({
  libradorId,
  isAdUser,
  backButtonURL = '/cesiones',
  isGestion = false,
  standAlone = false,
  callBack = () => {},
  cesionType,
}: CesionesFormProps) => {
  const navigate = useNavigate();

  const { state } = useLocation();

  const {
    cesionPost,
    cesionByIdGet,
    cesionPut,
    loading: loadingCesion,
  } = useCesion();
  const {
    documentoDeCesionCrearContratoDeObraPost,
    documentoDeCesionUltimoNoRechazadoByCesionIdAndByTipoDocumentoGet,
    loading,
  } = useDocumentoDeCesion();

  const { documentoPdfByIdGet } = useDocumento();

  const [cesion, setCesion] = useState({} as ICesionByIdGet);
  const [tieneContratoObra, setTieneContratoObra] = useState(false);
  const [files, setFiles] = useState<
    {
      id: string;
      file: Blob;
    }[]
  >([]);
  const [tipoCesion, setTipoCesion] = useState(
    cesionType ?? (standAlone ? tipoFirmasEnum.PARCIAL : state?.cesionType)
  );
  const rhForm = useForm({
    defaultValues: {
      ...cesion,
      cif: cesion?.librador?.cif,
      razonSocial: cesion?.librador?.razonSocial,
    },
  });

  const fetchData = useCallback(
    async (id: string) => {
      const res = await cesionByIdGet(id);
      setCesion(res);
    },
    [cesionByIdGet]
  );

  useEffect(() => {
    state?.cesionId && fetchData(state?.cesionId);
  }, [state?.cesionId, fetchData]);

  const fetchDocuments = useCallback(async () => {
    const res =
      await documentoDeCesionUltimoNoRechazadoByCesionIdAndByTipoDocumentoGet(
        state?.cesionId,
        tipoDocumento.CONTRATO_OBRA
      );
    if (res.id) {
      const pdfResponse = await documentoPdfByIdGet(res.id);
      if (pdfResponse) {
        const file = {
          id: res.id,
          file: pdfResponse,
        };
        pdfResponse && setFiles([file]);
        setTieneContratoObra(true);
      } else {
        setFiles([]);
      }
    } else {
      setFiles([]);
    }
  }, [
    state?.cesionId,
    documentoDeCesionUltimoNoRechazadoByCesionIdAndByTipoDocumentoGet,
    documentoPdfByIdGet,
  ]);

  useEffect(() => {
    if (state?.cesionId && tipoCesion === stepsEnum.CONTRATO) {
      fetchDocuments();
    }
  }, [state?.cesionId, tipoCesion, fetchDocuments]);

  const handleNextStep = async (data: FieldValues) => {
    const body: ICesionBodyPost = {
      descripcion: data.description as string,
      librado: {
        cif: data.cif as string,
        razonSocial: data.libradoRazonSocial as string,
      },
      libradorId,
      importe: data.importe as number,
      tipo: tipoCesion,
    };
    if (state?.cesionId) {
      const bodyPut = {
        id: state?.cesionId,
        descripcion: data.description as string,
        fechaInicioContrato: data.fechaInicio,
        importe: data.importe as number,
        importePendienteDeEjecutar: data.importePendienteDeEjecutar as number,
        numero: data.numero,
        tipo: tipoCesion,
      };

      const res = await cesionPut(bodyPut);

      if (
        tipoCesion === tipoCesionOv.CONTRATO &&
        !tieneContratoObra &&
        files.length
      ) {
        try {
          const resDoc = await documentoDeCesionCrearContratoDeObraPost(
            files,
            state?.cesionId
          );
          setTieneContratoObra(!!resDoc);
        } catch (err) {
          if (res) {
            notifications.warning({
              body: `${
                isAdUser
                  ? 'Se ha creado la cesión pero no se ha podido añadir el documento.'
                  : 'La cesión se ha creado correctamente y el departamento de OV se encargará de gestionarlo'
              }`,
            });
          }
        }
      }

      if (res) {
        notifications.success({
          body: 'Se ha modificado la cesión correctamente',
        });
        if (!isGestion) {
          navigate(`/cesiones/detalle/${cesion.id}`, {
            state: {
              cesionType: tipoCesion,
              cesionId: cesion.id,
            },
          });
        } else {
          navigate(`/gestor-de-empresas/cesiones/detalle/${cesion.id}`, {
            state: {
              cesionType: tipoCesion,
              cesionId: cesion.id,
            },
          });
        }
      }
    } else if (tipoCesion === tipoCesionOv.A_FUTURO) {
      const resCesionId = await cesionPost(body);
      if (resCesionId) {
        notifications.success({
          body: 'Se ha creado la cesión correctamente',
        });

        if (!isGestion) {
          if (standAlone) {
            callBack();
          } else {
            navigate(`/cesiones/detalle/${resCesionId}`, {
              state: {
                cesionType: tipoCesion,
                cesionId: resCesionId,
              },
            });
          }
        } else {
          navigate(`/gestor-de-empresas/cesiones/detalle/${resCesionId}`, {
            state: {
              cesionType: tipoCesion,
              cesionId: resCesionId,
            },
          });
        }
      }
    } else {
      const bodyContrato = {
        ...body,
        fechaInicioContrato: newFormatDateUTC(data.fechaInicio),
        fechaFinalizacion: newFormatDateUTC(data.fechaVencimiento),
        numero: data.numero,
        importePendienteDeEjecutar: data.importePendienteDeEjecutar,
      };

      const resCesionId = await cesionPost(bodyContrato);
      if (resCesionId) {
        try {
          notifications.success({
            body: 'Se ha creado la cesión correctamente',
          });
          if (
            tipoCesion === tipoCesionOv.CONTRATO &&
            !tieneContratoObra &&
            files.length
          ) {
            await documentoDeCesionCrearContratoDeObraPost(files, resCesionId);
          }
        } catch (err) {
          notifications.warning({
            body: `${
              isAdUser
                ? 'Se ha creado la cesión pero no se ha podido añadir el documento.'
                : 'La cesión se ha creado correctamente y el departamento de OV se encargará de gestionarlo'
            }`,
          });
        }
        if (!isGestion) {
          if (standAlone) {
            callBack();
          } else {
            navigate(`/cesiones/detalle/${resCesionId}`, {
              state: {
                cesionType: tipoCesion,
                cesionId: resCesionId,
              },
            });
          }
        } else {
          navigate(`/gestor-de-empresas/cesiones/detalle/${resCesionId}`, {
            state: {
              cesionType: tipoCesion,
              cesionId: resCesionId,
            },
          });
        }
      }
    }
  };

  if (!!state?.cesionId && isEmpty(cesion))
    return (
      <div className="flex content-center justify-center align-middle">
        <Spinner />;
      </div>
    );
  return (
    <Card className="flex flex-col my-0 mx-auto align-middle flex-between gap-4 w-[1024px] mt-8 tablet:min-w-[600px] tablet:w-full mobile:min-w-[300px] mobile:w-full mobile:m-0 mobile:overflow-y-auto ">
      <FormProvider {...rhForm}>
        <div className="flex flex-col w-full mobile:overflow-y-auto">
          <DatosEmpresa
            title={
              tipoCesion === stepsEnum.FUTURO
                ? 'Cesión a futuro'
                : 'Cesión de contrato de obra o servicio'
            }
            cesion={cesion}
            tipoCesion={tipoCesion}
            setTipoCesion={setTipoCesion}
            isEditing={!!state?.cesionId}
          />
          {tipoCesion === stepsEnum.FUTURO ? (
            <div className="flex flex-col w-1/3 mobile:w-full">
              <h3 className="text-lg text-primary font-semibold mt-4">
                Ventas
              </h3>
              <InputCurrency
                defaultValue={cesion.importe}
                name="importe"
                className="flex-shrink-0"
                required
                label="Ventas anuales estimadas"
              />
            </div>
          ) : (
            <CesionContrato
              tieneContratoObra={tieneContratoObra}
              files={files}
              setFiles={setFiles}
              cesion={cesion}
              isEditing={!!state?.cesionId}
              loadingFiles={loading}
            />
          )}
        </div>
        <div className="flex  flex-row-reverse mobile:shrink-0 mobile:pt-4 mobile:w-full mobile:flex-col  ">
          <GenericButton
            label="Guardar"
            buttonType="primary"
            loading={loadingCesion}
            onClick={rhForm.handleSubmit((data) => handleNextStep(data))}
            className="mobile:w-full"
            labelClassName="mobile:flex mobile:justify-center mobile:w-full"
          />
          {!state?.cesionId && (
            <GenericButton
              buttonType="secondary-borderless"
              label="Cancelar"
              className="mobile:w-full"
              labelClassName="mobile:flex mobile:justify-center mobile:w-full"
              onClick={() =>
                cesionType
                  ? callBack()
                  : standAlone
                  ? callBack()
                  : navigate(backButtonURL)
              }
            />
          )}
        </div>
      </FormProvider>
    </Card>
  );
};

export default CesionesForm;
