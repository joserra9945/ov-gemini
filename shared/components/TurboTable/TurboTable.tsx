import { PrimeReactProvider } from 'primereact/api';
import {
  DataTable,
  DataTableValue,
  DataTableValueArray,
} from 'primereact/datatable';

import {
  CheckboxPassThrough,
  DataTablePassThrough,
  ListBoxPassThrough,
  MenuPassThrough,
  OverlayPanelPassThrough,
  SelectButtonPassThrough,
  TooltipPassThrough,
} from '@shared/styles/primereact/passThrough';
import InputRadioSwithchPassThrough from '@shared/styles/primereact/passThrough/InputRadioPT';

import { initialQueryState } from './filters/utils/helpers';
import { TurboTableProps } from './interfaces/TurboTableType';
import { TurboTableColumns } from './templates/TurboTableColumns';
import { TurboTableEmpty } from './templates/TurboTableEmpty';
import { TurboTableHeader } from './templates/TurboTableHeader';
import { TurboTableProvider } from './providers';

const TurboTable = <D extends DataTableValue>({
  serviceCall,
  columns,
  emptyMessage,
  paginator = false,
  lazy = true,
  stripedRows = true,
  scrollable = true,
  scrollHeight = 'flex',
  columnResizeMode = 'fit',
  showGridlines = false,
  defaultQueryState = initialQueryState,
  tableKey,
  customHeader,
  title,
  hasFilter = false,
  hasSelection = false,
  selectionType = 'multiple',
  selectionListener,
  hasExpansion = false,
  rowExpansionTemplate,
  onRowClick,
  queryStateListener,
  dataListener,
  extraDependencies,
}: TurboTableProps<D & DataTableValueArray>) => {
  return (
    <TurboTableProvider<D & DataTableValueArray>
      paginator={paginator}
      serviceCall={serviceCall}
      queryStateListener={queryStateListener}
      dataListener={dataListener}
      extraDependencies={extraDependencies}
      defaultQueryState={defaultQueryState}
      tableKey={tableKey}
      columns={columns}
      hasFilter={hasFilter}
      hasSelection={hasSelection}
      selectionType={selectionType}
      selectionListener={selectionListener}
      hasExpansion={hasExpansion}
      onRowClick={onRowClick}
    >
      {({ pagination, data, sorting, selection, expansion }) => {
        return (
          <PrimeReactProvider
            value={{
              unstyled: true,
              pt: {
                datatable: DataTablePassThrough<D & DataTableValueArray>(),
                overlaypanel: OverlayPanelPassThrough,
                listbox: ListBoxPassThrough,
                selectbutton: SelectButtonPassThrough,
                checkbox: CheckboxPassThrough,
                radiobutton: InputRadioSwithchPassThrough,
                tooltip: TooltipPassThrough,
                menu: MenuPassThrough,
              },
            }}
          >
            <DataTable<D & DataTableValueArray>
              header={
                <TurboTableHeader customHeader={customHeader} title={title} />
              }
              value={data as D & DataTableValueArray}
              emptyMessage={emptyMessage || <TurboTableEmpty />}
              lazy={lazy}
              stripedRows={stripedRows}
              scrollable={scrollable}
              scrollHeight={scrollHeight}
              columnResizeMode={columnResizeMode}
              showGridlines={showGridlines}
              onRowClick={onRowClick}
              rowExpansionTemplate={rowExpansionTemplate}
              {...sorting}
              {...pagination}
              {...selection}
              {...expansion}
            >
              {TurboTableColumns()}
            </DataTable>
          </PrimeReactProvider>
        );
      }}
    </TurboTableProvider>
  );
};

export default TurboTable;
