/* eslint-disable */
// @ts-nocheck

import { useCallback, useEffect, useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { cloneDeep, isEqual } from 'lodash';
import { nanoid } from 'nanoid';
import { faEraser, faTimes } from '@fortawesome/pro-light-svg-icons';

import { IColumn } from '@shared/interfaces';
import { usePrevious } from '@shared/utils';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

import { Button } from '../Button';

import { getCustomFilter } from './helpers/customFilters';
import ITurboFiltersProps from './interfaces';

export const TurboFilters = ({
  columns,
  setFilter,
  filtersSelected,
  clearFilters,
  showClearButtons = true,
  showAddMore = true,
}: ITurboFiltersProps): JSX.Element => {
  const [currentColumns, setCurrentColumns] = useState<IColumn[]>(columns);
  const [currentFilters, setCurrentFilters] = useState<IColumn[]>();
  const overlay = useRef<OverlayPanel>(null);
  const prevCurrentColumns = usePrevious(currentColumns);

  useEffect(() => {
    if (columns) {
      setCurrentColumns(columns);
    }
  }, [columns]);

  const shouldDisplayFilter = useCallback(
    (column: IColumn) => {
      const columnIdentifier = column.customFilter
        ? column.customFilter.name
        : column.field;
      return (
        column.filter ||
        column.fixedFilter ||
        filtersSelected.some((filter) => filter.label === columnIdentifier)
      );
    },
    [filtersSelected]
  );

  useEffect(() => {
    if (currentColumns) {
      setCurrentFilters((currentFiltersState) => {
        let auxFilters: IColumn[] = !isEqual(prevCurrentColumns, currentColumns)
          ? []
          : cloneDeep(currentFiltersState) || [];
        currentColumns.forEach((column) => {
          const alreadyExistsIndex = auxFilters.findIndex(
            (filter) => filter?.field === column?.field
          );
          if (alreadyExistsIndex !== -1 && !shouldDisplayFilter(column)) {
            auxFilters.splice(alreadyExistsIndex, 1);
          } else if (
            alreadyExistsIndex === -1 &&
            column &&
            'filter' in column &&
            column.fixedFilter
          ) {
            if (
              column.filterOrder != null &&
              column.filterOrder + 1 <= auxFilters.length
            ) {
              const [replacedFilter] = auxFilters.splice(
                column.filterOrder,
                1,
                column
              );
              auxFilters.push(replacedFilter);
            } else if (column.filterOrder != null) {
              auxFilters = new Array(column.filterOrder + 1).map(
                (el, index) => auxFilters[index]
              );
              auxFilters.splice(column.filterOrder, 0, column);
            } else {
              auxFilters.push(column);
            }
          } else if (
            alreadyExistsIndex === -1 &&
            column &&
            'filter' in column &&
            shouldDisplayFilter(column)
          ) {
            auxFilters.push(column);
          }
        });
        return auxFilters;
      });
    }
  }, [currentColumns, prevCurrentColumns, shouldDisplayFilter]);

  const onClearFilter = useCallback(
    (column: IColumn) => {
      const col = currentColumns?.find((cc) => cc.field === column.field);
      if (col) {
        col.filter = false;
      }
      setCurrentColumns((prevColumns) => [...prevColumns]);
    },
    [currentColumns]
  );

  const thereAreFilters = useCallback(
    () => currentColumns?.some((column) => column.filter != undefined),
    [currentColumns]
  );

  return (
    <>
      {thereAreFilters() ? (
        <div className="turbo-filters__container">
          <div className="turbo-filters__filters-group">
            <div className="turbo-filters__filters">
              {currentFilters?.map((column) => {
                if (
                  column &&
                  'filter' in column &&
                  shouldDisplayFilter(column)
                ) {
                  const id = nanoid();
                  const handleClearFilters = () => onClearFilter(column);
                  return (
                    <div key={id}>
                      {getCustomFilter(
                        column,
                        setFilter,
                        filtersSelected,
                        handleClearFilters
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
            {showAddMore && (
              <div className="turbo-filters__add">
                <Button
                  className="turbo-filters__add-button"
                  label="+ Añadir filtro"
                  size="lg"
                  link
                  onClick={(e) => {
                    if (overlay?.current?.toggle) {
                      overlay.current.toggle(e, null);
                    }
                    e.currentTarget.focus();
                  }}
                  disabled={
                    !currentColumns?.some(
                      (column) =>
                        column &&
                        'filter' in column &&
                        !(column.filter || column.fixedFilter)
                    )
                  }
                />
              </div>
            )}
          </div>
          {showClearButtons && (
            <div className="turbo-filters__clear-buttons_container">
              <Tooltip content="Limpiar filtros" place="bottom">
                <Button
                  className="turbo-filters__clear-button"
                  rounded="full"
                  icon={faEraser}
                  onClick={() => {
                    clearFilters && clearFilters();
                  }}
                  disabled={!filtersSelected?.length}
                />
              </Tooltip>
              <Tooltip content="Quitar filtros" place="bottom">
                <Button
                  className="turbo-filters__clear-button"
                  rounded="full"
                  icon={faTimes}
                  onClick={() => {
                    clearFilters && clearFilters();
                    const auxColumns = currentColumns
                      ? [...currentColumns]
                      : [];
                    setCurrentColumns(
                      auxColumns.map((column: IColumn) => {
                        if (column && 'filter' in column) {
                          column.filter = false;
                        }
                        return column;
                      })
                    );
                  }}
                />
              </Tooltip>
            </div>
          )}
        </div>
      ) : null}
      <OverlayPanel
        ref={overlay}
        id="turbo-filters__overlay_panel"
        className="turbo-filters__overlay_panel"
      >
        <div className="turbo-filters__overlay_panel__content">
          {currentColumns?.map((column) => {
            if (column && 'filter' in column && !shouldDisplayFilter(column)) {
              const id = nanoid();
              return (
                <div
                  className="turbo-filters__filter-name"
                  onClick={() => {
                    column.filter = true;
                    setCurrentColumns((cc) => {
                      if (cc) {
                        return cloneDeep(cc);
                      }
                    });
                    if (overlay?.current?.hide) {
                      overlay.current.hide();
                    }
                  }}
                  key={id}
                >
                  {column?.customFilter?.label || column?.header?.toLowerCase()}
                </div>
              );
            }
            return null;
          })}
        </div>
      </OverlayPanel>
    </>
  );
};
