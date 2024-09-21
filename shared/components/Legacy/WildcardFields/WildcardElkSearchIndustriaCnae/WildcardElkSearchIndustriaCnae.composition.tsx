
import { useForm } from 'react-hook-form';

import WildcardElkSearchIndustriaCnae from './WildcardElkSearchIndustriaCnae';

import '@shared/styles/main.scsss';

export const ElkSearchIndustriaCnaeExample = (): JSX.Element => {
  const rhForm = useForm({
    mode: 'onBlur',
  });
  return (
    <WildcardElkSearchIndustriaCnae
      rhForm={rhForm}
      data={{
        industria: { id: 3, descripcion: 'Agricultura' },
        cnaeS: { id: 377, descripcion: 'Prueba CNAE' },
      }}
      inputName="searchIndustriaCnae"
      inputLabel="Buscar actividad principal o CNAE"
      required
    />
  );
};
