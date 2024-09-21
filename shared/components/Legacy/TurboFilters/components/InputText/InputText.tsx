/* eslint-disable */
// @ts-nocheck

import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import FilterHOC from '../FilterHOC';

interface ITableInputTextProps {
  onChange: (e?: string) => void;
  defaultValue: string;
  id?: string;
  filterName: string;
  iconName?: IconDefinition;
  onClearFilter: () => void;
  fixedFilter?: boolean;
  disabled?: boolean;
}

const TableInputText = ({
  onChange,
  defaultValue,
  id,
  filterName,
  iconName,
  onClearFilter,
  fixedFilter,
  disabled = false,
}: ITableInputTextProps): JSX.Element => {
  const [value, setValue] = useState<string>();
  const [filterValue, setFilterValue] = useState<string>();

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      setFilterValue(defaultValue);
    }
  }, [defaultValue]);
  return (
    <FilterHOC
      disabled={disabled}
      value={filterValue}
      filterName={filterName}
      iconName={iconName}
      onChange={() => {
        onChange(value);
        setFilterValue(value);
      }}
      clearFilter={(closeFilter?: boolean) => {
        setValue(undefined);
        if (closeFilter) {
          setFilterValue('');
          onChange(undefined);
          onClearFilter();
        }
      }}
      useEnter
      fixedFilter={fixedFilter}
    >
      <span className="p-input-icon-right">
        <i className="pi pi-search" />
        <InputText
          id={id}
          value={value || ''}
          style={{ width: '100%' }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="p-column-filter"
        />
      </span>
    </FilterHOC>
  );
};

export default TableInputText;
