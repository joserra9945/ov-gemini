import { Dispatch, SetStateAction } from 'react';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { PaginatorTemplateOptions } from 'primereact/paginator';

import { IQueryReducer } from '@shared/utils/queryReducer';

import { IQueryState } from '../interfaces/TurboTableType';

const PaginatorTemplate = (
  totalCount: number,
  setQueryState: Dispatch<SetStateAction<IQueryReducer | IQueryState>>,
  queryState: IQueryReducer | IQueryState
): PaginatorTemplateOptions => {
  const handleChangeRowsPerPage = (value: number) => {
    setQueryState((prev) => ({ ...prev, maxResult: value }));
  };
  const template: PaginatorTemplateOptions = {
    layout:
      'RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
    RowsPerPageDropdown: (options) => {
      const rowsPerPageOptions = [2, 5, 10, 20, 50, 100];
      const rowsCount: number[] = rowsPerPageOptions.filter(
        (rowPerPage) => rowPerPage < totalCount
      );
      if (totalCount < rowsPerPageOptions[rowsPerPageOptions.length - 1]) {
        rowsCount.push(totalCount);
      }

      return (
        <div className="flex flex-row justify-between items-center gap-4">
          <span className="mx-1 w-56">Filas por página </span>
          <Dropdown
            defaultValue={rowsCount[0]}
            value={options.value}
            options={rowsCount}
            onChange={(e: DropdownChangeEvent) => {
              handleChangeRowsPerPage(e.value);
            }}
          />
        </div>
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span className="px-4">
          {options.first} -{' '}
          {(queryState.skipCount || 0) + (queryState.maxResult || 0)} de{' '}
          {totalCount}
        </span>
      );
    },
  };
  return template;
};

export default PaginatorTemplate;
