import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const TableWrapper = ({ data, isLoading, children }) => {
  if (isLoading) {
    return (
      <div className="text-center p-4">
        <ProgressSpinner />
      </div>
    );
  }
  if (Array.isArray(data) && data.length) {
    return children;
  }
  return (
    <div className="not-data-table text-center">
      <h3>No se han encontrado registros</h3>
    </div>
  );
};

export default TableWrapper;
