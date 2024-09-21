import { createElement, useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { TabMenu } from 'primereact/tabmenu';
import OperacionesService from 'utils/services/operaciones-service';

import FichaOperacionHeader from './Header';
import { tabMenuItems } from './tabmenuitems.jsx';

import './style.scss';

const operacionService = new OperacionesService();

const FichaOperacion = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(
    state?.tabActiveIndex ? state?.tabActiveIndex : 0
  );
  const [data, setData] = useState({});

  const fetchData = useCallback(async () => {
    const res = await operacionService.getOperacionById(id);
    if (res) {
      setData(res);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, state]);

  return (
    <div className="card ficha-operacion-container w-full">
      <FichaOperacionHeader data={data} />
      <TabMenu
        className="tabmenu-override tabmenu-no-padding"
        model={tabMenuItems.filter(
          (tab) => !tab.disabledStates?.includes(data?.estado)
        )}
        activeIndex={activeIndex}
        onTabChange={(e) => {
          setActiveIndex(e.index);
        }}
      />
      <div className="ficha-operacion-body">
        {createElement(tabMenuItems[activeIndex].element, {
          operacionId: id,
          estado: data?.estado,
        })}
      </div>
    </div>
  );
};

export default FichaOperacion;
