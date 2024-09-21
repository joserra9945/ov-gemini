/* eslint-disable */
// @ts-nocheck

import { IColumn } from '@shared/interfaces';

import {
  TableDateRange,
  TableInputNumberRange,
  TableInputText,
  TableMultiSelect,
  TableSelect,
} from '../components';
import TableInputSwitch from '../components/InputSwitch/InputSwitch';
import { IFilters, ITableFilters } from '../interfaces';

import { toLocalFormat } from '.';

const getFilterSelectedValue = (
  filtersSelected: IFilters[],
  filterName: string
) => {
  if (filtersSelected?.length) {
    const filter = filtersSelected.find((fs) => fs?.label === filterName);
    return filter?.value ? filter.value : null;
  }
  return null;
};

export const getCustomFilter = (
  column: IColumn,
  setFilter: (filters: ITableFilters) => void,
  filtersSelected: IFilters[] = [],
  onClearFilter: () => void
): JSX.Element | null => {
  let filterComponent = null;
  if (column?.customFilter) {
    const { header, fixedFilter, filterIconName } = column;
    const {
      options: filterOptions,
      name: filterName,
      label: filterLabel,
      itemTemplate,
      type,
      selectProperty,
      // eslint-disable-next-line no-unsafe-optional-chaining
    } = column?.customFilter;

    const defaultValue = getFilterSelectedValue(filtersSelected, filterName);
    switch (type) {
      case 'multiselect': {
        filterComponent = (
          <TableMultiSelect
            disabled={column.customFilter?.disabled}
            options={filterOptions}
            itemTemplate={itemTemplate}
            onChange={(selectedIds: number[] | string[]) => {
              setFilter({ [filterName]: { value: selectedIds, type: 'in' } });
            }}
            defaultValue={defaultValue}
            filterName={filterLabel || header}
            onClearFilter={onClearFilter}
            iconName={filterIconName}
            fixedFilter={fixedFilter}
          />
        );
        break;
      }
      case 'select': {
        filterComponent = (
          <TableSelect
            disabled={column.customFilter?.disabled}
            options={filterOptions}
            itemTemplate={itemTemplate}
            onChange={(selectedId: number | string) => {
              setFilter({ [filterName]: { value: selectedId, type: 'in' } });
            }}
            defaultValue={defaultValue}
            filterName={filterLabel || header}
            onClearFilter={onClearFilter}
            iconName={filterIconName}
            fixedFilter={fixedFilter}
            selectProperty={selectProperty}
          />
        );
        break;
      }
      case 'date': {
        filterComponent = (
          <TableDateRange
            disabled={column.customFilter?.disabled}
            onChange={(dateRange: Date[] | null) => {
              setFilter({
                [filterName]: {
                  value:
                    (dateRange?.length === 2 && [
                      toLocalFormat(dateRange[0]),
                      toLocalFormat(dateRange[1], true),
                    ]) ||
                    '',
                  type: 'range',
                },
              });
            }}
            defaultValue={defaultValue}
            filterName={filterLabel || header}
            onClearFilter={onClearFilter}
            iconName={filterIconName}
            fixedFilter={fixedFilter}
          />
        );
        break;
      }
      case 'number': {
        filterComponent = (
          <TableInputNumberRange
            disabled={column.customFilter?.disabled}
            onChange={(numberRange?: (number | null)[] | null) => {
              setFilter({
                [filterName]: {
                  value: numberRange?.some((number) => number !== null)
                    ? numberRange
                    : '',
                  type: 'range',
                },
              });
            }}
            defaultValue={defaultValue}
            filterName={filterLabel || header}
            onClearFilter={onClearFilter}
            iconName={filterIconName}
            fixedFilter={fixedFilter}
          />
        );
        break;
      }
      case 'input': {
        filterComponent = (
          <TableInputText
            disabled={column.customFilter?.disabled}
            onChange={(value?: string) => {
              setFilter({ [filterName]: { value, type: 'in' } });
            }}
            defaultValue={defaultValue}
            filterName={filterLabel || header}
            onClearFilter={onClearFilter}
            iconName={filterIconName}
            fixedFilter={fixedFilter}
          />
        );
        break;
      }
      case 'switch': {
        filterComponent = (
          <TableInputSwitch
            disabled={column.customFilter?.disabled}
            onChange={(value?: string) => {
              setFilter({ [filterName]: { value, type: 'equals' } });
            }}
            defaultValue={defaultValue}
            filterName={filterLabel || header}
            onClearFilter={onClearFilter}
            iconName={filterIconName}
            fixedFilter={fixedFilter}
          />
        );
        break;
      }
      default:
        break;
    }
  } else {
    const filterName = column?.field || '';
    const defaultValue = getFilterSelectedValue(filtersSelected, filterName);
    filterComponent = (
      <TableInputText
        disabled={column.customFilter?.disabled}
        onChange={(value?: string) => {
          setFilter({ [filterName]: { value, type: 'in' } });
        }}
        defaultValue={defaultValue}
        filterName={column.header}
        onClearFilter={onClearFilter}
        iconName={column.filterIconName}
        fixedFilter={column.fixedFilter}
      />
    );
  }
  return filterComponent;
};
