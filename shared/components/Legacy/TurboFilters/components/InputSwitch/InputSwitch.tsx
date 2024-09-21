/* eslint-disable */
// @ts-nocheck

import { useEffect, useState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import FilterHOC from '../FilterHOC';

interface ITableInputSwitchProps {
  onChange: (e?: string) => void;
  defaultValue: boolean;
  id?: string;
  iconName?: IconDefinition;
  onClearFilter: () => void;
  fixedFilter?: boolean;
  filterName: string;
  className?: string;
  disabled?: boolean;
}

const isTrueSet = (myValue: string) => myValue === 'true';

const TableInputSwitch = ({
  onChange,
  defaultValue,
  id,
  iconName,
  onClearFilter,
  fixedFilter,
  filterName,
  disabled = false,
}: ITableInputSwitchProps): JSX.Element => {
  const [value, setValue] = useState<boolean>();
  const [filterValue, setFilterValue] = useState<boolean>();

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      setFilterValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <FilterHOC
      clearFilter={(closeFilter?: boolean) => {
        setValue(undefined);
        if (closeFilter) {
          setFilterValue(false);
          onChange(undefined);
          onClearFilter();
        }
      }}
      disabled={disabled}
      filterName={filterName}
      fixedFilter={fixedFilter}
      iconName={iconName}
      onChange={() => {
        onChange(String(value));
        setFilterValue(value);
      }}
      showFooter={false}
      value={filterValue}
    >
      <InputSwitch
        id={id}
        onChange={(e) => {
          onChange(String(e?.value));
          setFilterValue(e?.value);
        }}
        className="p-column-filter"
        checked={isTrueSet(String(value))}
      />
    </FilterHOC>
  );
};

export default TableInputSwitch;
