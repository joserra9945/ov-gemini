import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';
import { nanoid } from 'nanoid';
import PersonaService from 'utils/services/persona-service';
import RepresentanteService from 'utils/services/representante-service';
import { faPlus } from '@fortawesome/pro-light-svg-icons';

import { Modal } from '@shared/components/Modal';
import useWindowSize from '@shared/hooks/useWindowsSize';
import NuevoContacto from '@shared/modules/NuevoContacto/';
import { queryFixer } from '@shared/utils/utilsOv';

import { Button } from '@shared/components/Legacy/Button';
import { TurboTable } from '@shared/components/Legacy/TurboTable';

import Card from 'components/Hocs/Card';
import { removeRepresentante } from 'store/actions/actions-contact';

import ActionsTemplate from './templates/ActionsTemplate';
import EstadoCargo from './templates/EstadoCargo';
import EstadoDNI from './templates/EstadoDNI';
import NumeroDni from './templates/NumeroDni';
import { columns } from './constants';

import './gestionContactos.scss';

const personaService = new PersonaService();
const representanteService = new RepresentanteService();

const GestionContactos = () => {
  const dispatch = useDispatch();
  const [queryState, setQueryState] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    items: [],
    totalCount: 0,
    currentPage: 0,
  });
  const [persona, setPersona] = useState(null);
  const [finalColumns, setFinalColumns] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const windowSize = useWindowSize();
  const [isOpenRepresentantes, setIsOpenRepresentantes] = useState(false);

  const libradorId = sessionStorage.getItem('libradorId');

  const fetchPersonas = useCallback(async () => {
    if (queryState) {
      try {
        const empresaId = sessionStorage.getItem('libradorId');
        setIsLoading(true);
        const query = queryFixer(queryState);
        const res = await personaService.get(empresaId, query);
        if (res) {
          setData(res);
        } else {
          setData({
            items: [],
            totalCount: 0,
            currentPage: 0,
          });
        }

        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    }
  }, [queryState]);

  const editPersona = useCallback(async (per) => {
    setPersona(per);
    setShowModal(true);
  }, []);

  const fetchAndParseRepresentantes = useCallback(async () => {
    const empresaId = sessionStorage.getItem('libradorId');
    const representantesResponse =
      await representanteService.getRepresentanteByEmpresaId(empresaId);
    const resultado = [{ id: 0 }];
    if (representantesResponse) {
      if (representantesResponse?.items?.length) {
        representantesResponse?.items?.forEach((representante) => {
          resultado.push({
            id: representante.id,
            nombre: representante.persona.nombre,
            apellidos: representante.persona.apellidos,
          });
        });
      }
    }
    return resultado || [];
  }, []);

  const toggleRepresentantes = () => {
    setIsOpenRepresentantes(!isOpenRepresentantes);
  };

  useEffect(() => {
    const tmpColumns = [
      ...columns,
      {
        key: nanoid(),
        header: 'Estado cargo',
        body: (e) => EstadoCargo(e.rowData, editPersona),
        className: 'estado-cargo__column',
        isFunctionComponent: true,
        style: { flexGrow: 1, flexBasis: '15%', width: '15%' },
      },
      {
        key: nanoid(),
        body: NumeroDni,
        header: 'DNI',
        field: 'numeroDni',
        style: { flexGrow: 1, flexBasis: '15%', width: '15%' },
      },
      {
        key: nanoid(),
        header: 'Estado DNI',
        body: (e) => EstadoDNI(e.rowData),
        className: 'estado-dni__column',
        isFunctionComponent: true,
        style: { flexGrow: 1, flexBasis: '15%', width: '15%' },
      },
    ];
    const desktopColumns = [
      ...tmpColumns,
      {
        key: nanoid(),
        body: (e) => ActionsTemplate(e, editPersona),
        className: 'actions--column',
      },
    ];
    setFinalColumns(desktopColumns);
  }, [editPersona]);

  useEffect(() => {
    fetchPersonas();
  }, [fetchPersonas]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAndParseRepresentantes();
    };
    fetchData();
  }, [fetchAndParseRepresentantes]);

  if (!finalColumns) {
    return (
      <div className="text-center">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <Card className="card--add-padding gestion-contactos__page">
      <TurboTable
        tableTitle="Firmantes"
        selectionMode="single"
        columns={finalColumns}
        isLoading={isLoading}
        value={data.items}
        totalRecords={data.totalCount}
        setQueryState={setQueryState}
        scrollable
        showSelectColumns={false}
        scrollHeight="flex"
        showFilter={false}
        paginator
        HeaderCustomComponent={
          <Button
            icon={faPlus}
            label="Nuevo firmante"
            onClick={toggleRepresentantes}
          />
        }
      />
      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          dispatch(removeRepresentante());
          setPersona(null);
          setIsOpenRepresentantes(false);
          fetchPersonas();
        }}
        className="w-1/2 contacto-form__modal"
        header="Contacto"
      >
        <NuevoContacto
          className="contacto-form__container"
          personaAEditar={persona}
          libradorId={libradorId}
          comingFromMisDatosFirmantes
          setIsOpen={setShowModal}
          refreshModal={fetchPersonas}
        />
      </Modal>
      <Modal
        open={isOpenRepresentantes}
        onClose={() => {
          setIsOpenRepresentantes(false);
          fetchPersonas();
        }}
        header="Nuevo firmante"
        className="w-1/2 contacto-form__dialog"
      >
        <NuevoContacto
          className="contacto-form__container"
          libradorId={libradorId}
          comingFromMisDatosFirmantes
          setIsOpen={setIsOpenRepresentantes}
          refreshModal={fetchPersonas}
        />
      </Modal>
    </Card>
  );
};

export default GestionContactos;
