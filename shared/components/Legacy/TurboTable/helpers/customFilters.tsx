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
import { IFilters } from '../interfaces';

import { toLocalFormat } from '.';

export const setCustomFilters = (
  columns: IColumn[],
  dtRef: any,
  filtersSelected?: IFilters[]
): void => {
  const filters = dtRef?.current?.props?.filters;
  columns.forEach((column) => {
    if (column.customFilter) {
      const {
        options: filterOptions,
        name: filterName,
        itemTemplate,
        type,
      } = column?.customFilter;
      const defaultValue = filtersSelected?.length
        ? filters[filterName]?.value
        : null;
      switch (type) {
        case 'multiselect': {
          column.filterElement = (
            <TableMultiSelect
              options={filterOptions}
              itemTemplate={itemTemplate}
              onChange={(selectedIds: number[] | string[]) => {
                dtRef.current.filter(selectedIds, filterName, 'in');
              }}
              defaultValue={defaultValue}
              id={`${filterName}-filter`}
            />
          );
          break;
        }
        case 'select': {
          column.filterElement = (
            <TableSelect
              options={filterOptions}
              itemTemplate={itemTemplate}
              onChange={(selectedId: number | string) => {
                dtRef.current.filter(selectedId, filterName, 'in');
              }}
              defaultValue={defaultValue}
              id={`${filterName}-filter`}
            />
          );
          break;
        }
        case 'date': {
          column.filterElement = (
            <TableDateRange
              onChange={(dateRange: number[] | null) => {
                dtRef.current.filter(
                  (dateRange && [
                    toLocalFormat(dateRange[0]),
                    toLocalFormat(dateRange[1]),
                  ]) ||
                    '',
                  `${filterName}`,
                  'range'
                );
              }}
              defaultValue={defaultValue}
              id={`${filterName}-filter`}
            />
          );
          break;
        }
        case 'number': {
          column.filterElement = (
            <TableInputNumberRange
              onChange={(numberRange: (number | null)[]) => {
                if (numberRange.some((number) => number !== null))
                  dtRef.current.filter(
                    numberRange || '',
                    `${filterName}`,
                    'range'
                  );
              }}
              defaultValue={defaultValue}
              id={`${filterName}-filter`}
            />
          );
          break;
        }
        case 'input': {
          column.filterElement = (
            <TableInputText
              onChange={(value: string) => {
                if (value != null) {
                  dtRef.current.filter(value, filterName, 'in');
                }
              }}
              defaultValue={defaultValue}
              id={`${filterName}-filter`}
            />
          );
          break;
        }
        default:
          break;
      }
    } else {
      const defaultValue =
        filtersSelected?.length && column.field
          ? filters[column.field]?.value
          : null;
      column.filterElement = (
        <TableInputText
          onChange={(value: string) => {
            if (value != null) {
              dtRef.current.filter(value, column.field, 'in');
            }
          }}
          defaultValue={defaultValue}
          id={`${column.field}-filter`}
        />
      );
    }
    return column;
  });
};
