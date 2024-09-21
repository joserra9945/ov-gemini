import { InputRazonSocial } from '@shared/form';

import { Fieldset } from 'components/Hocs/Forms';

const DatosEmpresa = ({ data, disabled = false }) => {
  return (
    <Fieldset className="datos-empresa-fields" legend="Datos de la empresa">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <InputRazonSocial
            data={data}
            isDisabled={disabled}
            label="NIF/CIF del librado"
            nameToSet="razonSocial"
            name="cif"
            required
            valueName="cif"
            valueToSet="razonSocial"
          />
        </div>
        <div className="col-span-6">
          <InputRazonSocial
            data={data}
            isDisabled={disabled}
            label="Razón social del librado"
            name="razonSocial"
            nameToSet="cif"
            required
            valueName="razonSocial"
            valueToSet="cif"
          />
        </div>
      </div>
    </Fieldset>
  );
};

export default DatosEmpresa;
