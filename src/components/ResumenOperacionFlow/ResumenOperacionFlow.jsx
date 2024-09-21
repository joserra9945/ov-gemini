/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import DireccionService from 'utils/services/direccion-service';
import EfectoService from 'utils/services/efectos-service';
import EmpresaService from 'utils/services/empresa-externa-service';
import PreciosService from 'utils/services/precios-service';

import { useProcedimientoDeCobro } from '@shared/hooks';
import {
  estadoEfectoCliente,
  tipoDocumento,
  tipoDocumentoString,
  tipoFormaContactoEnum,
} from '@shared/utils/constants';
import { formatCurrency } from '@shared/utils/formatters';
import notifications from '@shared/utils/notificationsOv';
import { esDenegadoPRAS } from '@shared/utils/params';
import {
  getInfoByIncompleteCompany,
  isSelectableEffect,
} from '@shared/utils/utilsOv';

import Modal from '@shared/components/Legacy/Modal';

import CrearEstudio from 'components/Dialogs/CrearEstudio';
import TableOperacionEfectos from 'components/tables/TableOperacionEfectos';
import FechaPagoForm from 'pages/Operaciones/FechaPagoForm';

import LeftButtonTemplate from './templates/LeftButtonTemplate';
import RightButtonTemplate from './templates/RightButtonTemplate';

import './resumenOperacionFlow.scss';

const efectoService = new EfectoService();
const empresaService = new EmpresaService();

const ResumenOperacion = ({
  setParentEfectos,
  onNextStep,
  onSetInfoEffect,
  isAdUser = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedEfectos, setSelectedEfectos] = useState([]);
  const [efectos, setEfectos] = useState([]);
  const [efectosIsLoading, setEfectosIsLoading] = useState(false);
  const [isOpenDireccionesEmpresa, setIsOpenDireccionesEmpresa] =
    useState(false);
  const [openCrearEstudio, setOpenCrearEstudio] = useState(false);
  const [efectosNoAprobadosPorPRAS, setEfectosNoAprobadosPorPRAS] = useState(
    []
  );
  const [disabled, setDisabled] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [empresa, setEmpresa] = useState(false);
  const [empresaDireccion, setEmpresaDireccion] = useState(false);
  const [formasContacto, setFormasContacto] = useState([]);
  const [tieneFormasContacto, setTieneFormasContacto] = useState(false);
  const [openModalPeriodoPago, setOpenModalPeriodoPago] = useState(false);
  const [totales, setTotales] = useState(0);

  const libradorId = sessionStorage.getItem('libradorId');

  const { procedimientoDeCobroSinCesionAceptadaGet } =
    useProcedimientoDeCobro();

  const preSelectItems = useCallback(
    (createdEfectos) => {
      if (!efectos?.length) return;

      const type =
        createdEfectos && createdEfectos.length
          ? createdEfectos[0].tipoDoc
          : efectos[efectos.length - 1].tipoDoc;
      // buscamos un efecto seleccionable
      const seleccionable = efectos.find((row) =>
        isSelectableEffect(row, type)
      );

      if (!seleccionable) return;
      // seleccionamos todos los efectos del mismo tipo y seleccionables
      const newSelection = efectos.filter((efecto) =>
        isSelectableEffect(efecto, seleccionable?.tipo?.id)
      );

      setSelectedEfectos(newSelection);
    },
    [efectos, setSelectedEfectos]
  );

  const fetchPlazoDePago = useCallback(
    async (libradoId, libradorId) => {
      const res = await procedimientoDeCobroSinCesionAceptadaGet(
        libradoId,
        libradorId
      );
      return res;
    },
    [procedimientoDeCobroSinCesionAceptadaGet]
  );

  const fetchPlazoPago = useCallback(async () => {
    const plazosDePagoArray = [];

    for await (const efecto of selectedEfectos) {
      const plazo = await fetchPlazoDePago(efecto?.libradoId, libradorId);
      plazosDePagoArray.push(plazo);
    }

    return plazosDePagoArray;
  }, [fetchPlazoDePago, libradorId, selectedEfectos]);

  useEffect(() => {
    if (efectos) {
      preSelectItems(location.state?.efectos);
    }
  }, [efectos, preSelectItems, location.state?.efectos]);

  useEffect(() => {
    setEfectosIsLoading(true);
    efectoService.getEfectosPedientesByEmpresaActiva(true).then((success) => {
      setEfectos(success?.items);
      setEfectosIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setDisabled(!selectedEfectos?.length);
  }, [selectedEfectos]);

  const goToFactura = () => {
    navigate({
      pathname: '/subir-efectos',
    });
    onSetInfoEffect({
      step: 1,
      tipoEfecto: parseInt(tipoDocumentoString.FACTURA, 10),
      efectos: [],
    });
  };

  const goToPagare = () => {
    navigate({
      pathname: '/subir-efectos',
    });
    onSetInfoEffect({
      step: 1,
      tipoEfecto: parseInt(tipoDocumentoString.PAGARE, 10),
      efectos: [],
    });
  };

  const getValidEfectos = () =>
    selectedEfectos.reduce((accumulator, currentEfecto) => {
      if (
        currentEfecto.estadoEfectoClienteId === estadoEfectoCliente.APROBADO ||
        !esDenegadoPRAS(currentEfecto.scoring)
      ) {
        accumulator.push(currentEfecto.id);
      }
      return accumulator;
    }, []);

  const goToNextStep = async (skipDireccionesCheck = false) => {
    const efectosNoAprobadosPorPRAS = selectedEfectos.filter(
      (efecto) =>
        efecto.estadoEfectoClienteId === estadoEfectoCliente.PENDIENTE_ESTUDIO
    );
    const plazoDePago = await fetchPlazoPago();
    if (selectedEfectos?.length === 0) return;
    let res;
    if (!skipDireccionesCheck) {
      const libradoIds = selectedEfectos.map((el) => el.libradoId);
      res = await empresaService.getEmpresaWhitoutDireccionSocial(libradoIds);
    }
    if (res?.length) {
      const tmpEmpresa = getInfoByIncompleteCompany(res);
      if (tmpEmpresa) {
        const { formasContacto: fc } = tmpEmpresa;
        if (fc) {
          setFormasContacto(fc);
        }
        if (
          fc.some((item) => item?.tipo === tipoFormaContactoEnum.MOVIL) &&
          fc.some((item) => item?.tipo === tipoFormaContactoEnum.EMAIL)
        ) {
          setTieneFormasContacto(true);
        }

        setEmpresa(tmpEmpresa);

        if (tmpEmpresa?.direccionSocial) {
          setEmpresaDireccion(
            parseDataFromDireccion(tmpEmpresa.direccionSocial)
          );
        }
      }
      setIsOpenDireccionesEmpresa(true);
    } else if (efectosNoAprobadosPorPRAS?.length) {
      setEfectosNoAprobadosPorPRAS(efectosNoAprobadosPorPRAS);
      setOpenCrearEstudio(true);
    }
    const onlyFacturasonEfectos = selectedEfectos.filter(
      (efecto) => efecto.tipo.id === tipoDocumento.FACTURA
    );

    const hasPlazoDePago = plazoDePago.some((item) => item?.plazoDePago);
    if (hasPlazoDePago && onlyFacturasonEfectos.length) {
      setOpenModalPeriodoPago(!openModalPeriodoPago);
      const selectedIds = getValidEfectos();
      setParentEfectos(selectedIds);
      setOpenModalPeriodoPago(!openModalPeriodoPago);
    } else {
      const selectedIds = getValidEfectos();
      setParentEfectos(selectedIds);
      onNextStep();

      navigate('/nueva-operacion', {
        state: {
          ...location.state,
          isPagareType:
            Array.isArray(selectedEfectos) &&
            selectedEfectos.length &&
            selectedEfectos[0]?.tipo?.id &&
            +selectedEfectos[0].tipo.id === +tipoDocumentoString.PAGARE,
        },
      });
    }
  };

  const handleCrearEstudio = async () => {
    setDisableButtons(true);
    const efectosIds = efectosNoAprobadosPorPRAS.map((efecto) => efecto.id);
    const data = { efectosIds };
    try {
      await efectoService.addToEstudio(data);
      setDisableButtons(false);
      notifications.success({
        body: 'Se ha enviado el efecto al departamento de Riesgos para su aprobación.',
        title: '¡Éxito!',
      });
      const selectedIds = getValidEfectos();
      if (!selectedIds?.length) {
        return navigate('/');
      }
      setParentEfectos(selectedIds);
      onNextStep();
    } catch {
      setDisableButtons(false);
    }
  };

  const responsiveFooterTemplate = (
    <div className="responsive-footer">
      {LeftButtonTemplate(goToFactura, goToPagare)}
      {RightButtonTemplate(disabled, goToNextStep)}
    </div>
  );

  const FooterGroupTemplate = (
    <ColumnGroup>
      <Row>
        <Column colSpan={3} footer={LeftButtonTemplate()} />
        <Column
          colSpan={3}
          footer={
            <span className="resumen-totals">
              Total: {formatCurrency(totales)}
            </span>
          }
        />
        <Column
          colSpan={2}
          footer={RightButtonTemplate(disabled, goToNextStep)}
        />
      </Row>
    </ColumnGroup>
  );

  const footerTemplate = (
    <div className="footer-desktop">
      {LeftButtonTemplate()}
      <span className="resumen-totals">
        <span className="resumen-totals">Total: {formatCurrency(totales)}</span>
      </span>
      {RightButtonTemplate(disabled, goToNextStep)}
    </div>
  );

  useEffect(() => {
    const totalImporteNominal = selectedEfectos.reduce(
      (acc, efecto) => acc + (efecto.importeNominal || 0),
      0
    );
    setTotales(totalImporteNominal);
  }, [selectedEfectos]);

  return (
    <div className="resumen-operacion-flow w-3/4">
      <div className="table-card">
        {location.pathname !== '/' && (
          <div className="header-table">
            <h2 className="title-h2">Resumen operación</h2>
          </div>
        )}
        <TableOperacionEfectos
          selectedEfectos={selectedEfectos}
          setSelectedEfectos={setSelectedEfectos}
          footerDesktop={footerTemplate}
          footerColumnGroup={FooterGroupTemplate}
          footer={responsiveFooterTemplate}
          sinAsignar
          resumen
          data={efectos}
          isAdUser={isAdUser}
          isLoading={efectosIsLoading}
          showActions={false}
        />
      </div>
      <CrearEstudio
        onSubmit={handleCrearEstudio}
        cancelFunc={() => setOpenCrearEstudio(false)}
        isOpen={openCrearEstudio}
        toggle={() => setOpenCrearEstudio(!openCrearEstudio)}
        efectosNoAprobadosPorPRAS={efectosNoAprobadosPorPRAS}
        disableButtons={disableButtons}
      />
      <Modal
        isOpen={openModalPeriodoPago}
        onClose={() => setOpenModalPeriodoPago(false)}
        title="Información de su cliente"
        className="periodo-pago__modal h-fit w-1/2"
      >
        <FechaPagoForm
          className="h-100"
          selectedEfectos={selectedEfectos}
          setOpenModalPeriodoPago={setOpenModalPeriodoPago}
          openModalPeriodoPago={openModalPeriodoPago}
          onSetSelectedEffects={setParentEfectos}
          onSetStep={onNextStep}
        />
      </Modal>
    </div>
  );
};

ResumenOperacion.propTypes = {};

export default ResumenOperacion;
