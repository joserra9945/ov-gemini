import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';
import { nanoid } from 'nanoid';
import EmpresaService from 'utils/services/empresa-externa-service';

import { TurboTable } from '@shared/components/Legacy/TurboTable';

import Card from 'components/Hocs/Card';

import { columns } from './constants/columns';
import ActionsTemplate from './Templates/ActionsTemplate';

import './tablaLibradores.scss';

const empresaExternaService = new EmpresaService();

const TablaLibradores = () => {
  // TODO: Adaptar para varias empresas de un mismo usuario.
  const [finalColumns, setFinalColumns] = useState(null);
  const [data, setData] = useState(null);
  const { cif } = useSelector((store) => store.userState);

  const fetchData = useCallback(async () => {
    const res = await empresaExternaService.getEmpresaByCif(cif);
    if (res) {
      setData(res);
    }
  }, [cif]);

  useEffect(() => {
    if (!data) {
      fetchData();
    }
    if (!finalColumns?.length) {
      const tmpColumns = [
        ...columns,
        {
          key: nanoid(),
          header: '',
          body: (e) => ActionsTemplate(e.rowData, fetchData),
          isFunctionComponent: true,
        },
      ];
      setFinalColumns(tmpColumns);
    }
  }, [data, fetchData, finalColumns?.length]);

  if (!finalColumns || !data) {
    return (
      <div className="text-center">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div className="perfil-usuario-table">
      <Card className="bg-white p-4 rounded-md shadow">
        <TurboTable
          tableTitle="Empresas gestionadas"
          columns={finalColumns}
          showSelectColumns={false}
          showFilter={false}
          value={[data]}
        />
      </Card>
    </div>
  );
};

export default TablaLibradores;
