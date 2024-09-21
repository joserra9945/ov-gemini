import { createElement, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TabMenu } from 'primereact/tabmenu';
import EfectoService from 'utils/services/efectos-service';

import useWindowSize from '@shared/hooks/useWindowsSize';
import { estadosOperaciones } from '@shared/utils/constants';

import { DocumentacionAportadaEfecto } from 'components/DocumentacionAportada';
import NoImage from 'components/NoImage';
import PDFViewer from 'components/PDFViewer/PDFViewer';

import { tabMenuItems, tabMenuItemsEnum } from './constants';
import Header from './Header';

import './styles.scss';

const efectoService = new EfectoService();
const DetalleEfecto = ({ tipoEfecto }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const windowSize = useWindowSize();
  const params = useParams();
  const [efectoId, setEfectoId] = useState(null);
  const [efecto, setEfecto] = useState(null);
  const [documentoEfecto, setDocumentoEfecto] = useState(null);
  const [activeIndex, setActiveIndex] = useState(
    tabMenuItemsEnum.DOC_REQUERIDA
  );
  const [refreshDocumentos, setRefreshDocumentos] = useState(false);

  const tabletSize = useCallback(() => windowSize.width < 768, [windowSize]);

  const fetchEfecto = useCallback(async () => {
    try {
      const tmpData = await efectoService.getEfectoById(efectoId);
      setEfecto(tmpData || false);
    } catch {
      console.error('Error en el get de data del efecto');
    }
  }, [efectoId]);

  useEffect(() => {
    if (efectoId) {
      fetchEfecto();
    }
  }, [efectoId, fetchEfecto]);

  useEffect(() => {
    if (!params.efectoId) {
      navigate('/');
    }

    setEfectoId(params.efectoId);
  }, [navigate, params]);

  useEffect(() => {
    if (location?.state?.tab) {
      setActiveIndex(location.state.tab);
    }
  }, [location]);

  return (
    <div className="detalle-efecto__container">
      <div className="card">
        <Header
          efecto={efecto}
          setRefreshDocumentos={setRefreshDocumentos}
          showAddButton={params?.operacionState !== estadosOperaciones.PAGADA}
        />
        <div className="detalle-efecto__body row">
          <div className="col-md-6 left">
            <DocumentacionAportadaEfecto
              tipoEfecto={tipoEfecto}
              efecto={efecto}
              fetchEfecto={fetchEfecto}
              setDocumentoEfecto={setDocumentoEfecto}
              refreshDocumentos={refreshDocumentos}
            />
            <TabMenu
              className="tabmenu-override tabmenu-no-padding"
              model={tabMenuItems}
              activeIndex={activeIndex}
              onTabChange={(e) => {
                setActiveIndex(e.index);
              }}
            />
            {createElement(tabMenuItems[activeIndex].element, {
              operacionId: efecto?.operacionId || null,
              tipoEfecto,
              efectoId,
            })}
          </div>
          {!tabletSize() && (
            <div className="col-md-6 detalle-efecto__pdf-render">
              {documentoEfecto ? (
                <PDFViewer pdf={documentoEfecto} />
              ) : (
                <NoImage />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleEfecto;
