import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';

import { IColumn } from '@shared/interfaces/IColumn';

import { parseHeaderToClassName } from './helpers';
import { ITableProps } from './interfaces';

const defaultScrollableStyle = {
  flexGrow: 1,
  flexBasis: '150px',
  width: '150px',
};

const getColumnComponent = (
  fixedColumns: boolean,
  hasSubHeader: boolean,
  col: IColumn,
  body?: ReactNode | ((data: any, options: ColumnBodyOptions) => ReactNode),
  scrollable?: boolean
) => {
  return (
    <Column
      className={`${parseHeaderToClassName(col?.header || '')}__column${
        col?.className ? ` ${col?.className}` : ''
      }`}
      bodyStyle={{ textAlign: col?.align || 'left' }}
      style={scrollable && fixedColumns ? defaultScrollableStyle : {}}
      {...col}
      body={body}
      headerClassName={hasSubHeader ? 'subheader-content' : ''}
    />
  );
};

const Table = <D,>({
  columns = [],
  value,
  className,
  paginator,
  totalRecords,
  rows,
  rowsPerPageOptions,
  multiple,
  dtRef,
  frozenWidth,
  scrollable,
  isLoading,
  skeletonLoader,
  singleSelection,
  expandable,
  leftExpandable,
  emptyMessage = 'No hay resultados',
  lazy = true,
  virtualScroll = false,
  setFilters,
  onChangeRowsPerPage,
  fixedColumns = true,
  firstColumnStyle,
  stateKey,
  allowExpansion = true,
  ...rest
}: ITableProps<D>): JSX.Element => {
  const [definitiveRows, setDefinitiveRows] = useState(
    rowsPerPageOptions || []
  );

  useEffect(() => {
    if (rowsPerPageOptions && totalRecords) {
      const resRow: number[] = rowsPerPageOptions.filter(
        (rowPerPage) => rowPerPage < totalRecords
      );
      if (totalRecords < rowsPerPageOptions[rowsPerPageOptions.length - 1]) {
        resRow.push(totalRecords);
      }
      setDefinitiveRows(resRow);
    }
    /* 
      codigo para eliminar propiedades del statekey (sessionStorage), ya que provoca
      un error al volver a renderizar un expandedROW. Revisar si en posteriores del PRiMEREACT 
      se soluciona
    */
    return () => {
      if (stateKey) {
        const tableJSONStr = sessionStorage.getItem(stateKey);
        if (tableJSONStr) {
          const tableJSOn = JSON.parse(tableJSONStr);
          delete tableJSOn.expandedRows;
          delete tableJSOn.columnWidths;
          sessionStorage.setItem(stateKey, JSON.stringify(tableJSOn));
        }
      }
    };
  }, [rowsPerPageOptions, stateKey, totalRecords]);

  const greater =
    rows && totalRecords && rows > totalRecords ? totalRecords : rows;

  const isLoadingWithSekeletonMode = isLoading && skeletonLoader;
  const dynamicColumns = useMemo(() => {
    const hasSubHeader = !!columns.filter((column) => column?.subheader).length;
    return columns.map((col: IColumn) => {
      const shouldShowSkeleton =
        (isLoading && virtualScroll) || (isLoading && skeletonLoader);
      const body = shouldShowSkeleton ? (
        <Skeleton />
      ) : col?.isFunctionComponent ? (
        (e: D) => <col.body rowData={e} />
      ) : col?.body ? (
        (e: D) => col.body(e)
      ) : null;
      return getColumnComponent(
        fixedColumns,
        hasSubHeader,
        col,
        body,
        scrollable
      );
    });
  }, [
    columns,
    isLoading,
    virtualScroll,
    skeletonLoader,
    fixedColumns,
    scrollable,
  ]);

  const loadingBody = () => {
    return <Skeleton />;
  };

  return (
    <div
      className={`g-data-table__containter${className ? ` ${className}` : ''}${
        skeletonLoader ? ' skeletonLoadingMode' : ''
      }`}
    >
      <DataTable
        tableStyle={{ tableLayout: 'fixed' }}
        stateKey={stateKey}
        value={value}
        lazy={lazy}
        emptyMessage={emptyMessage}
        loading={isLoading && !virtualScroll}
        scrollable={scrollable}
        ref={dtRef}
        resizableColumns={!fixedColumns}
        onFilter={(e) => {
          setFilters && setFilters(e.filters);
        }}
        paginator={!isLoadingWithSekeletonMode ? paginator : undefined}
        totalRecords={totalRecords}
        currentPageReportTemplate="{first} - {last} de {totalRecords}"
        paginatorTemplate={{
          layout:
            'RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
          FirstPageLink: null,
          PrevPageLink: null,
          PageLinks: null,
          NextPageLink: null,
          LastPageLink: null,
          JumpToPageInput: null,
          CurrentPageReport: undefined,
          // eslint-disable-next-line react/no-unstable-nested-components
          RowsPerPageDropdown: (options) => {
            return (
              <>
                <span> Filas por página</span>
                <Dropdown
                  value={options.value}
                  onChange={(e) => {
                    if (onChangeRowsPerPage) {
                      onChangeRowsPerPage(e.value);
                    }
                  }}
                  options={options.options}
                  className="g-rows-per-page__dropdown"
                />
              </>
            );
          },
        }}
        rows={greater}
        rowsPerPageOptions={definitiveRows}
        className="p-datatable-striped p-datatable-responsive"
        frozenWidth={!virtualScroll ? frozenWidth : ''}
        {...rest}
      >
        {multiple && (
          <Column
            selectionMode="multiple"
            style={firstColumnStyle}
            frozen={!!frozenWidth && !virtualScroll}
            body={isLoadingWithSekeletonMode ? loadingBody : null}
          />
        )}
        {singleSelection && (
          <Column selectionMode="single" style={firstColumnStyle} />
        )}
        {leftExpandable && (
          <Column
            expander={allowExpansion}
            className="testeando"
            style={firstColumnStyle}
          />
        )}
        {dynamicColumns}
        {expandable && <Column expander style={firstColumnStyle} />}
      </DataTable>
    </div>
  );
};

export default Table;
