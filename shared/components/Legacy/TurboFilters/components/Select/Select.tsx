/* eslint-disable */
// @ts-nocheck

import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faListUl } from '@fortawesome/pro-solid-svg-icons';

import FilterHOC from '../FilterHOC';

interface IOption {
  label: string;
  value: string | number;
  query?: string;
  color?: string;
  unchecked?: boolean;
}

interface ITableSelectProps {
  options: IOption[];
  itemTemplate: (option: IOption) => JSX.Element;
  onChange: (arg: any) => void;
  defaultValue?: any;
  id?: string;
  filterName: string;
  iconName?: IconDefinition;
  onClearFilter: () => void;
  fixedFilter?: boolean;
  selectProperty?: string;
  disabled?: boolean;
}

const TableSelect = ({
  options,
  itemTemplate,
  onChange,
  defaultValue,
  filterName,
  iconName = faListUl,
  onClearFilter,
  fixedFilter,
  selectProperty = 'label',
  disabled = false,
}: ITableSelectProps): JSX.Element => {
  const [value, setValue] = useState<any>();
  const [filterValue, setFilterValue] = useState<any>();

  useEffect(() => {
    if (defaultValue != null) {
      setValue(defaultValue);
      setFilterValue(defaultValue);
    }
  }, [defaultValue]);

  const onSelect = (e: IOption) => {
    setValue(e[selectProperty as keyof IOption]);
  };

  return (
    <FilterHOC
      clearFilter={(closeFilter?: boolean) => {
        setValue('');
        if (closeFilter) {
          setFilterValue('');
          onChange('');
          onClearFilter();
        }
      }}
      disabled={disabled}
      filterName={filterName}
      fixedFilter={fixedFilter}
      iconName={iconName}
      onChange={() => {
        onChange(value);
        setFilterValue(value);
      }}
      value={filterValue}
    >
      <div className="select__container">
        {options?.map((option: IOption) => {
          const id = nanoid();

          return (
            <div
              className={`select__option${
                (option.id === value || option.value === value) ? ' --selected' : ''
              }`}
              key={id}
              onClick={() => {
                onSelect(option);
              }}
            >
              <div className="select__label">
                {(itemTemplate && itemTemplate(option)) || option.label}
              </div>
            </div>
          );
        })}
      </div>
    </FilterHOC>
  );
};

export default TableSelect;
