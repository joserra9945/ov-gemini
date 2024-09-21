/* eslint-disable */
// @ts-nocheck

import { useEffect, useRef, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { OverlayPanel } from 'primereact/overlaypanel';
import { SelectButton } from 'primereact/selectbutton';
import { TabMenu } from 'primereact/tabmenu';
import {
  faCircleXmark,
  faColumns,
  faFilter,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IColumn } from '@shared/interfaces/IColumn';

import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { TurboFilters } from '@shared/components/Legacy/TurboFilters/TurboFilters';
import { IOptionTableSelection } from '@shared/components/Legacy/TurboTable/interfaces';

import { IHeaderTurboTable } from './IHeaderTurboTable';

const OptionsTemplate = (
  optionSelected: number | undefined,
  option: IOptionTableSelection
): JSX.Element => {
  return (
    <div className="button-select">
      {option.icon && (
        <FontAwesomeIcon
          color={optionSelected === option.value ? '#558DD2' : undefined}
          icon={option.icon}
        />
      )}
      <span className="label-select-button">{option.name}</span>
    </div>
  );
};

const HeaderTurboTable = ({
  columns,
  onColumnToggle,
  toggleFilters,
  currentTable,
  setCurrentTable,
  tableOptions,
  tableTitle = '',
  showSelectTable = true,
  showSelectColumns = false,
  showTabs = false,
  tabsOptions,
  setActiveTab,
  CustomComponent,
  SubHeaderCustomComponent,
  turboFilters,
  filterFunction,
  filtersSelected,
  showColumnOptions = true,
}: IHeaderTurboTable): JSX.Element | null => {
  const [_selectedColumns, setSelectedColumns] = useState<IColumn[]>([]);
  const [columnsOptions, setColumnsOptions] = useState<IColumn[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isShowingFilters, setIsShowingFilters] = useState<boolean>(true);

  const overlay = useRef<OverlayPanel>(null);

  useEffect(() => {
    if (columns.length) {
      const selectableColumns = columns.filter((column) => column.header);
      setColumnsOptions(selectableColumns);
      setSelectedColumns(selectableColumns);
    }
  }, [columns]);

  const getSelectedColumns = (lastSelected: IColumn) => {
    // Check if already exist the column for remove
    let alreadyExists = false;
    const newColumns = _selectedColumns.filter((column) => {
      if (column.key !== lastSelected.key) {
        return true;
      }
      alreadyExists = true;
      return false;
    });
    if (!alreadyExists) newColumns.push(lastSelected);
    return newColumns;
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
        className="turbo-table__header"
      >
        <div className="turbo-table__header-left-section">
          {tableTitle ? <h2 className="title-h2">{tableTitle}</h2> : null}
          {showTabs && (
            <TabMenu
              model={tabsOptions}
              activeIndex={activeIndex}
              onTabChange={(e) => {
                setActiveIndex(e.index);
                setActiveTab && setActiveTab(e.index);
              }}
            />
          )}
        </div>
        <div className="turbo-table__header-right-section">
          {turboFilters ? (
            <div className="icon-filter">
              <Tooltip
                content={`${isShowingFilters ? 'Esconder' : 'Mostrar'} filtros`}
                place="bottom"
              >
                <div
                  className="turbo-table__column-filter-button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsShowingFilters(!isShowingFilters);
                  }}
                >
                  <FontAwesomeIcon
                    icon={isShowingFilters ? faCircleXmark : faFilter}
                    size="lg"
                  />
                </div>
              </Tooltip>
            </div>
          ) : null}
          {showColumnOptions && columnsOptions?.length ? (
            <div style={{ display: showSelectColumns ? 'initial' : 'none' }}>
              <Tooltip content="Seleccionar columnas" place="bottom">
                <div
                  className="turbo-table__column-filter-button"
                  onClick={(e) => {
                    if (overlay?.current?.toggle) {
                      overlay.current.toggle(e, null);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faColumns} size="lg" />
                </div>
              </Tooltip>

              <OverlayPanel
                ref={overlay}
                id="turbo-table__overlay_panel"
                className="turbo-table__overlaypanel"
              >
                {columns.map((column) => {
                  return column.header ? (
                    <div key={column.key} className="p-field-checkbox">
                      <Checkbox
                        inputId={column.key}
                        name="category"
                        value={column}
                        onChange={() => {
                          const selected = getSelectedColumns(column);
                          setSelectedColumns(selected);
                          onColumnToggle(selected);
                        }}
                        checked={_selectedColumns?.some(
                          (item) => item.key === column.key
                        )}
                      />
                      <label htmlFor={column.key}>{column.header}</label>
                    </div>
                  ) : null;
                })}
              </OverlayPanel>
            </div>
          ) : null}
          {CustomComponent}
          {tableOptions?.length && (
            <div
              className="select-button-wrapper"
              style={{ display: showSelectTable ? 'initial' : 'none' }}
            >
              <SelectButton
                value={currentTable}
                options={tableOptions}
                onChange={(e) => {
                  if (setCurrentTable) {
                    toggleFilters(false);
                    setCurrentTable(e.value ? e.value : 0);
                  }
                }}
                itemTemplate={(option) => OptionsTemplate(currentTable, option)}
              />
            </div>
          )}
        </div>
      </div>
      {SubHeaderCustomComponent}
      {turboFilters && isShowingFilters && (
        <TurboFilters
          columns={columns}
          setFilter={filterFunction}
          filtersSelected={filtersSelected || []}
          clearFilters={() => toggleFilters(true)}
        />
      )}
    </>
  );
};

export default HeaderTurboTable;
