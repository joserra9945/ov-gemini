import { useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { Button } from '@shared/components/Button';
import usePras from '@shared/hooks/usePras';
import {
  IPrasListadoMotivoGet,
  IPrasListadoScoringGet,
  IPrasScoringCambioBodyPost,
} from '@shared/interfaces/api/IPras';

import { Spinner } from '@shared/components/Legacy/Spinner';
import { WildcardSelect } from '@shared/components/Legacy/WildcardFields';

import './prasForm.scss';

interface IPrasFormProps {
  inline?: boolean;
  scoring?: string | null;
  onBack?: () => void;
  onNextStep?: () => void;
  afterSubmit: () => void;
  empresa: { cif: string; razonSocial: string };
  userId?: string;
  nombreCompleto?: string;
}

const PrasForm = ({
  inline = true,
  scoring,
  onBack,
  afterSubmit,
  empresa,
  userId,
  onNextStep,
  nombreCompleto,
}: IPrasFormProps): JSX.Element => {
  const rhForm = useForm({ mode: 'onChange' });
  const [scoringOptions, setScoringOptions] = useState<
    IPrasListadoScoringGet[]
  >([]);
  const [motivosOptions, setMotivoOptions] = useState<IPrasListadoMotivoGet[]>(
    []
  );
  const [disableInputs, setDisableInputs] = useState<boolean>(false);
  const [disableButtons, setDisableButtons] = useState<boolean>(false);
  const [data, setData] = useState<{
    scoring: string | number;
    motivo: string;
  } | null>(null);
  const { prasListadoScoring } = usePras();
  const { prasListadoMotivos } = usePras();
  const { enviarScoringCambioPost } = usePras();

  const editScoring = async (dataForm: FieldValues) => {
    setDisableButtons(true);
    const body: IPrasScoringCambioBodyPost = {
      cif: empresa.cif,
      razonsocial: empresa.razonSocial,
      PRAS: scoring || '',
      scoring:
        scoringOptions.find(
          (opt: IPrasListadoScoringGet) => opt.value === dataForm.scoring
        )?.label || '',
      usuario: userId || '',
      nombre_usuario: nombreCompleto || '',
      motivo: dataForm?.motivo,
    };
    const res = await enviarScoringCambioPost(body);
    if (res) {
      onNextStep && onNextStep();
    }
    afterSubmit();
    setDisableButtons(false);
  };

  const setFormData = useCallback(
    (scoringList: IPrasListadoScoringGet[]) => {
      setData({
        scoring:
          scoringList?.find(
            (sc: IPrasListadoScoringGet) => sc.label === scoring
          )?.value || '',
        motivo: '',
      });
    },
    [scoring]
  );

  const fetchOptions = useCallback(async () => {
    setDisableInputs(true);
    const tmpScoring = await prasListadoScoring();
    if (tmpScoring) {
      setScoringOptions(tmpScoring);
    }
    const tmpMotivo = await prasListadoMotivos();
    if (tmpMotivo) {
      setMotivoOptions(tmpMotivo);
    }
    setDisableInputs(false);
    setFormData(tmpScoring);
  }, [prasListadoMotivos, prasListadoScoring, setFormData]);

  useEffect(() => {
    if (!data) {
      fetchOptions();
    }
  }, [data, fetchOptions, setFormData]);

  return (
    <div className={`${inline ? 'pras-form-inline' : 'pras-form'}`}>
      <form
        onSubmit={rhForm.handleSubmit(editScoring)}
        className="pras-form__container-inputs ml-6 mr-6"
      >
        <div className="pras-form__container-inputs">
          {data ? (
            <>
              <WildcardSelect
                rhForm={rhForm}
                data={data}
                inputName="scoring"
                inputLabel="Scoring"
                options={scoringOptions}
                isDisabled={disableInputs}
                className="pras-form__scoring"
                required
              />
              <WildcardSelect
                rhForm={rhForm}
                data={data}
                inputName="motivo"
                placeholder="Seleccione el motivo del cambio"
                inputLabel="Motivo"
                isDisabled={disableInputs}
                options={motivosOptions}
                className="pras-form__motivo-cambio"
                required
              />
            </>
          ) : (
            <Spinner loading color="#0F1C40" />
          )}
          <div className="pras-form__container-buttons">
            {onBack && (
              <Button
                color="primary"
                disabled={disableButtons}
                onClick={onBack}
                text="Cancelar"
                type="text-button"
              />
            )}
            <Button
              disabled={!rhForm.formState.isValid || disableButtons}
              onClick={() => {}}
              text="Validar"
              type="button"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PrasForm;
