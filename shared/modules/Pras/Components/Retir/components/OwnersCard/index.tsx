import { IRetirOwnerProps } from '@shared/modules/Pras/interfaces';

import { formatRetirDates } from '../../constants';
import RetirOwnersCardCountryItem from '../OwnersCardCountryItem';
import RetirOwnersCardHeader from '../OwnersCardHeader';
import RetirOwnersCardParticipation from '../OwnersCardParticpation';
import RetirOwnersCardSimpleItem from '../OwnersCardSimpleItem';
import RetirOwnersCardSociedadesIntervinientes from '../OwnersCardSociedadesIntervinientes';

const RetirOwnersCard = ({ owner, company }: IRetirOwnerProps): JSX.Element => {
  const {
    nombre,
    dni,
    participacionDirecta,
    fechaNacimiento,
    codigoPaisNacionalidad,
    codigoPaisResidencia,
    participacionIndirecta,
    tipo,
    sociedadesIntervinientes,
  } = owner;

  return (
    <div className="retir-owners-card mb-4 pb-2">
      <RetirOwnersCardHeader nombre={nombre} dni={dni} />
      <RetirOwnersCardSimpleItem
        className="flex flex-row justify-between horizontal-divider px-3 py-2"
        title={tipo.description}
      />
      <RetirOwnersCardParticipation
        participacionDirecta={participacionDirecta}
        participacionIndirecta={participacionIndirecta}
      />
      <RetirOwnersCardSociedadesIntervinientes
        sociedadesIntervinientes={sociedadesIntervinientes}
        ownerName={nombre}
        company={company}
      />
      <RetirOwnersCardSimpleItem
        className="retir-owners-card-info flex flex-row justify-between horizontal-divider px-3 py-2"
        title="Fecha de nacimiento:"
        value={formatRetirDates(fechaNacimiento)}
      />
      <RetirOwnersCardCountryItem
        className="retir-owners-card-info horizontal-divider flex flex-row justify-between px-3 py-2"
        title="País de nacimiento:"
        country={codigoPaisNacionalidad}
      />
      <RetirOwnersCardCountryItem
        className="retir-owners-card-info flex flex-row justify-between px-3 py-2"
        title="País de residencia:"
        country={codigoPaisResidencia}
      />
    </div>
  );
};

export default RetirOwnersCard;
