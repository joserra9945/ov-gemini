import { Spinner } from '@shared/components/Legacy/Spinner';

import { ITableWrapperProps } from './TableWrapperProps';

const TableWrapper = ({
  data,
  isLoading,
  children,
  msg = 'No se han encontrado registros',
}: ITableWrapperProps<any>): JSX.Element => {
  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner loading={!!isLoading} color="rgb(54, 215, 183)" />
      </div>
    );
  }
  if (Array.isArray(data)) {
    return children;
  }
  return (
    <div className="text-center">
      <h3>{msg}</h3>
    </div>
  );
};

export default TableWrapper;
