import { tipoFirmaEnum } from '@shared/enum/firmaNotarial';
import CesionesForm from '@shared/modules/CesionesForm/CesionesForm';
import DocumentacionCesion from '@shared/modules/CesionesForm/components/DocumentacionCesion';
import EfectosAsociadosCesiones from '@shared/modules/CesionesForm/components/EfectosAsociadosCesiones';
import { FirmaNotarialForm } from '@shared/modules/FirmaNotarial/FirmaNotarialForm';

export const tabIndexEnum = {
  DATOS_CESION: 0,
  DATOS_FIRMA: 1,
  EFECTOS_ASOCIADOS: 2,
  DOCUMENTACION: 3,
};

export const tabMenuItems = ({ isAdUser, cesion, fetchCesion }) => {
  return [
    {
      label: 'Datos de la cesión',
      id: tabIndexEnum.DATOS_CESION,
      element: <CesionesForm isAdUser={isAdUser} libradorId={cesion.id} />,
    },
    {
      label: 'Datos de la firma',
      id: tabIndexEnum.DATOS_FIRMA,
      element: (
        <div className="mt-8">
          <FirmaNotarialForm
            callback={fetchCesion}
            firmaNotarialId={cesion.firmaNotarialId}
            libradorId={cesion.librador.id}
            empresaInternaId={cesion.empresaInternaId}
            canEdit
            isAdUser={isAdUser}
            id={cesion.id}
            showTitle
            tipo={tipoFirmaEnum.CESIONES}
          />
        </div>
      ),
    },
    {
      label: 'Efectos asociados',
      id: tabIndexEnum.EFECTOS_ASOCIADOS,
      element: <EfectosAsociadosCesiones cesion={cesion} />,
    },
    {
      label: 'Documentación',
      id: tabIndexEnum.DOCUMENTACION,
      element: <DocumentacionCesion id={cesion.id} />,
    },
  ];
};
