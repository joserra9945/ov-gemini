import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import CesionService from 'utils/services/cesion-service';

import { Tab, Tabs } from '@shared/components/Legacy/Tabs';

import Card from 'components/Hocs/Card';

import Header from './components/Header';
import { tabIndexEnum, tabMenuItems } from './constants';

import './cesionesDetalle.scss';

const cesionService = new CesionService();
const CesionesDetalle = () => {
  const { id } = useParams();
  const [cesion, setCesion] = useState();
  const [activeIndex, setActiveIndex] = useState(tabIndexEnum.DATOS_CESION);
  const { isAdUser } = useSelector((state) => state.userState);

  const fetchCesion = useCallback(async () => {
    const tmpCesion = await cesionService.getById(id);

    if (!tmpCesion) {
      return <Navigate to="/cesiones" />;
    }

    setCesion(tmpCesion);
  }, [id]);

  useEffect(() => {
    if (cesion === undefined) {
      fetchCesion();
    }
  }, [cesion, fetchCesion]);

  return (
    <Card className="cesion-detalle__container">
      <Header cesion={cesion} />
      {!cesion ? (
        <div className="text-center">
          <ProgressSpinner />
        </div>
      ) : (
        <Tabs
          type="underline"
          selectedTab={activeIndex}
          setSelectedTab={setActiveIndex}
        >
          {tabMenuItems({ isAdUser, cesion, fetchCesion }).map((tab) => {
            return (
              <Tab
                className="bg-[#F8F9FA] h-full w-full"
                disabled={
                  tab.id === tabIndexEnum.DOCUMENTACION &&
                  !cesion?.documentosDeCesionAmount
                }
                title={tab.label}
                key={tab.id}
                cesion={cesion}
              >
                <div>{tab.element}</div>
              </Tab>
            );
          })}
        </Tabs>
      )}
    </Card>
  );
};

export default CesionesDetalle;
