import { Dispatch, FC, SetStateAction } from 'react';

import { InputRazonSocial, InputSelect, InputTextBasic } from '@shared/form';
import { ICesionByIdGet } from '@shared/interfaces/api/ICesion';

import { stepsEnum } from '../../constants/constants';

interface IProps {
  title: string;
  tipoCesion: number;
  setTipoCesion: Dispatch<SetStateAction<number>>;
  cesion: ICesionByIdGet;
  isEditing: boolean;
}

const optionsSelect = [
  {
    id: stepsEnum.FUTURO,
    nombre: 'Futuros',
  },
  {
    id: stepsEnum.CONTRATO,
    nombre: 'Contrato',
  },
];
const DatosEmpresa: FC<IProps> = ({
  tipoCesion,
  setTipoCesion,
  cesion,
  isEditing,
}) => {
  return (
    <div>
      <div className="flex flex-row justify-between mobile:flex-col mobile:gap-3">
        <h2 className="text-2xl font-medium leading-7 tracking-normal text-left font-roboto">
          {isEditing ? 'Datos de la cesión' : 'Nueva cesión'}
        </h2>

        <div className="flex flex-row justify-center align-middle gap-4 items-center">
          <div className="flex items-center justify-center mx-auto my-0 font-bold">
            Tipo
          </div>
          <InputSelect
            name="tipo"
            required
            options={optionsSelect}
            labelClassName="flex flex-row"
            defaultValue={tipoCesion}
            onChange={(e) => {
              setTipoCesion(e.value);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg text-primary font-semibold mt-4">
          Datos de la empresa
        </h3>
        <div className="flex w-full gap-2 mobile:flex-col">
          <div className="w-1/3 mobile:w-full">
            <InputRazonSocial
              data={{ cif: cesion.librado?.cif || '' }}
              defaultValue={cesion.librado?.cif || ''}
              isDisabled={cesion.id}
              label="CIF/NIF"
              name="cif"
              required
              valueName="cif"
              nameToSet="libradoRazonSocial"
              valueToSet="razonSocial"
            />
          </div>
          <div className="flex-grow">
            <InputRazonSocial
              data={{ libradoRazonSocial: cesion.librado?.razonSocial }}
              defaultValue={cesion.librado?.razonSocial}
              isDisabled={cesion.id}
              label="Razón social"
              name="libradoRazonSocial"
              required
              valueName="razonSocial"
              nameToSet="cif"
              valueToSet="cif"
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg text-primary font-semibold mt-4">
            Actividad principal
          </h3>
          <div className="flex-grow">
            <InputTextBasic
              name="description"
              label="Descripción"
              defaultValue={cesion.descripcion}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosEmpresa;
