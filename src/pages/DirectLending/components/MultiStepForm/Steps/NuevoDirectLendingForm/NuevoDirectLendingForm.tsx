import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { TurboForm } from '@shared/forms';
import { useEnum } from '@shared/hooks';
import { IEnum } from '@shared/interfaces/IEnum';

import useMultiStepForm from '../../hook/useMultiStepForm';
import NewDirectLendingContext from '../context/NewDirectLendingContext';

import { newDirectLendingFields } from './fields';

interface NuevoDirectLendingFormProps {
  callBack: () => void;
}
const NuevoDirectLendingForm = ({ callBack }: NuevoDirectLendingFormProps) => {
  const { setHandleNext, setDirectLendingData, directLendingData, setError } =
    useContext(NewDirectLendingContext);
  const { enumMesesGet, enumConceptosDirectLendingGet } = useEnum();
  const { config } = useMultiStepForm();

  const [mesesOptions, setMesesOptions] = useState<IEnum[]>([]);
  const [conceptoOptions, setConceptoOptions] = useState<IEnum[]>([]);

  const getEnumValueFromId = (array: IEnum[], id: number): IEnum => {
    return array.find((el) => el.id === id) || ({} as IEnum);
  };

  const schema = yup.object({
    importe: yup
      .number()
      .nonNullable()
      .min(10000, 'El importe no puede ser inferior a 10.000€')
      .required('El importe es obligatorio'),
    plazo: yup.number().nonNullable().required('El plazo es obligatorio'),
    concepto: yup.number().nonNullable().required('El concepto es obligatorio'),
  });

  const mapDirectLendingFromAPI = () => {
    return {
      importe: directLendingData.importe,
      concepto: directLendingData.concepto?.id,
      plazo: directLendingData.meses?.id,
    };
  };

  const rhForm = useForm({
    resolver: yupResolver(schema),
    values: mapDirectLendingFromAPI(),
    shouldFocusError: false,
  });

  const onSubmit = useCallback(() => {
    setDirectLendingData((prevData) => ({
      ...prevData,
      importe: rhForm.getValues('importe'),
      concepto: getEnumValueFromId(
        conceptoOptions,
        rhForm.getValues('concepto')
      ),
      meses: getEnumValueFromId(mesesOptions, rhForm.getValues('plazo')),
    }));
    callBack();
  }, [rhForm, conceptoOptions, mesesOptions, setDirectLendingData, callBack]);

  const fetchMeses = useCallback(async () => {
    const res = await enumMesesGet();
    res && setMesesOptions(res);
  }, [enumMesesGet]);

  const fetchConceptos = useCallback(async () => {
    const res = await enumConceptosDirectLendingGet();
    res && setConceptoOptions(res);
  }, [enumConceptosDirectLendingGet]);

  useEffect(() => {
    fetchMeses();
    fetchConceptos();
  }, [fetchMeses, fetchConceptos, setError]);

  useEffect(() => {
    setHandleNext(() => rhForm.handleSubmit(onSubmit));
  }, [onSubmit, rhForm, setHandleNext]);

  return (
    <TurboForm
      actions={[]}
      fields={newDirectLendingFields(
        mesesOptions,
        conceptoOptions,
        config.productoSingular?.toString()
      )}
      onSubmit={() => {}}
      rhForm={rhForm}
      contentStyles="mb-3 grid grid-cols-8 gap-4"
      actionsStyles="flex flex-col md:flex-row-reverse gap-2"
    />
  );
};

export default NuevoDirectLendingForm;
