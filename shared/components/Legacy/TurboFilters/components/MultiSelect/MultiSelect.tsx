/* eslint-disable */
// @ts-nocheck

import { useEffect, useRef, useState } from 'react';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { nanoid } from 'nanoid';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTag } from '@fortawesome/pro-solid-svg-icons';

import FilterHOC from '../FilterHOC';

interface IOption {
  label: string;
  value: string | number;
  query?: string;
  color?: string;
  unchecked?: boolean;
}

interface ITableMultiSelectProps {
  options: IOption[];
  itemTemplate: (option: IOption) => JSX.Element;
  onChange: (arg: any) => void;
  defaultValue?: any;
  id?: string;
  filterName: string;
  iconName?: IconDefinition;
  onClearFilter: () => void;
  fixedFilter?: boolean;
  disabled?: boolean;
}

const TableMultiSelect = ({
  options,
  itemTemplate,
  onChange,
  defaultValue,
  id,
  filterName,
  iconName = faTag,
  onClearFilter,
  fixedFilter,
  disabled = false,
}: ITableMultiSelectProps): JSX.Element => {
  const [values, setValues] = useState<any>();
  const [filterValues, setFilterValues] = useState<any>();
  const [selectedValues, setSelectedValues] = useState<string[]>();
  const previousOptions = useRef<IOption[]>();
  const previousValues = useRef<any>();

  useEffect(() => {
    if (
      options &&
      (options !== previousOptions.current ||
        (!values && !defaultValue && !previousValues.current))
    ) {
      const preselectedOptions = options.reduce(
        (acummulator: any[], option: IOption) => {
          if (!option.unchecked) {
            acummulator.push(option.value);
          }
          return acummulator;
        },
        []
      );
      previousOptions.current = options;
      previousValues.current = preselectedOptions;
      setValues(preselectedOptions);
      setFilterValues(preselectedOptions);
    }
  }, [defaultValue, options, values]);

  useEffect(() => {
    if (defaultValue) {
      setValues(defaultValue);
      setFilterValues(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    const selectedLabels = options?.reduce(
      (accumulator: string[], option: IOption) => {
        if (filterValues?.includes(option.value)) {
          accumulator.push(option.label);
        }
        return accumulator;
      },
      []
    );
    setSelectedValues(selectedLabels);
  }, [options, filterValues]);

  const onSelect = (e: CheckboxChangeEvent) => {
    const selected = typeof values === 'string' ? [values] : [...values];
    const { value } = e;
    if (e.checked) selected.push(value);
    else selected.splice(selected.indexOf(value), 1);

    setValues(selected);
  };

  return (
    <FilterHOC
      clearFilter={(closeFilter?: boolean) => {
        setValues([]);
        if (closeFilter) {
          setFilterValues([]);
          onChange([]);
          onClearFilter();
        }
      }}
      disabled={disabled}
      filterName={filterName}
      fixedFilter={fixedFilter}
      iconName={iconName}
      onChange={() => {
        onChange(values);
        setFilterValues(values);
      }}
      value={selectedValues}
    >
      <div>
        {options?.map((option: IOption) => {
          const id = nanoid();
          return (
            <div className="multiselect__option" key={id}>
              <Checkbox
                id={id}
                value={option.value}
                onChange={(e) => {
                  onSelect(e);
                }}
                checked={values?.includes(option.value)}
              />
              <label htmlFor={id} className="p-checkbox-label">
                {(itemTemplate && itemTemplate(option)) || option.label}
              </label>
            </div>
          );
        })}
      </div>
    </FilterHOC>
  );
};

export default TableMultiSelect;
