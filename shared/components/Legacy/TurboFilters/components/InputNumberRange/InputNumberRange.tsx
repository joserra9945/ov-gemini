/* eslint-disable */
// @ts-nocheck

import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalculator } from '@fortawesome/pro-solid-svg-icons';

import InputNumberBasic from '@shared/form/InputNumber';

import { formatNumber } from '../../helpers';
import FilterHOC from '../FilterHOC';

interface ITableInputNumberRangeProps {
  defaultValue?: number[];
  filterName: string;
  fixedFilter?: boolean;
  iconName?: IconDefinition;
  id?: string;
  onChange: (e?: (number | null)[]) => void;
  onClearFilter: () => void;
  disabled?: boolean;
}

interface IOption {
  name: string;
  value: string | number;
}

const optionsEnum = {
  EQUALS: 0,
  BIGGER_THAN: 1,
  SMALLER_THAN: 2,
  RANGE: 3,
};

const options = [
  {
    name: '=',
    value: optionsEnum.EQUALS,
  },
  {
    name: '</>',
    value: optionsEnum.RANGE,
  },
  {
    name: '>',
    value: optionsEnum.BIGGER_THAN,
  },
  {
    name: '<',
    value: optionsEnum.SMALLER_THAN,
  },
];

const InputNumberRange = ({
  defaultValue,
  filterName,
  fixedFilter,
  iconName = faCalculator,
  onChange,
  onClearFilter,
  disabled = false,
}: ITableInputNumberRangeProps): JSX.Element => {
  const rhForm = useForm();
  const [disableButton, setDisableButton] = useState(true);
  const [filterValue, setFilterValue] = useState<(number | null)[]>();
  const [isDropdownChange, setIsDropdownChange] = useState(false);
  const [parsedFilterValue, setParsedFilterValue] = useState('');
  const [selectedOption, setSelectedOption] = useState<number>(
    optionsEnum.EQUALS
  );
  const [value, setValue] = useState<(number | null)[]>();

  const updateDropdownSelectionAndParseFilter = useCallback(
    (firstNumber: number, secondNumber: number) => {
      let selectedDropdownOption = optionsEnum.EQUALS;
      let parsedFilter = '';

      if (firstNumber && secondNumber) {
        if (firstNumber === secondNumber) {
          selectedDropdownOption = optionsEnum.EQUALS;
          parsedFilter = filterValue?.[0]
            ? `${formatNumber(filterValue[0], 0)}`
            : '';
        } else {
          selectedDropdownOption = optionsEnum.RANGE;
          parsedFilter = filterValue
            ? filterValue.map((f) => `${formatNumber(f ?? 0, 0)}`).join(' - ')
            : '';
        }
      } else if (firstNumber) {
        selectedDropdownOption = optionsEnum.BIGGER_THAN;
        parsedFilter = `> ${formatNumber(firstNumber, 0)}`;
      } else if (secondNumber) {
        selectedDropdownOption = optionsEnum.SMALLER_THAN;
        parsedFilter = `< ${formatNumber(secondNumber, 0)}`;
      }

      return { selectedDropdownOption, parsedFilter };
    },
    [filterValue]
  );

  useEffect(() => {
    if (!isDropdownChange && defaultValue) {
      setValue(defaultValue);
      setFilterValue(defaultValue);

      const [firstNumber, secondNumber] = defaultValue;
      const { selectedDropdownOption, parsedFilter } =
        updateDropdownSelectionAndParseFilter(firstNumber, secondNumber);
      setSelectedOption(selectedDropdownOption);
      setParsedFilterValue(parsedFilter);
    }
  }, [isDropdownChange, defaultValue, updateDropdownSelectionAndParseFilter]);

  const getValue = (index: number) => {
    if (value) {
      return value[index] ?? null;
    }

    return null;
  };

  const isLowerNumberInputVisible = () => {
    if (selectedOption) {
      return [optionsEnum.RANGE, optionsEnum.BIGGER_THAN].includes(
        selectedOption
      );
    }
  };

  const isUpperNumberInputVisible = () => {
    if (selectedOption) {
      return [optionsEnum.RANGE, optionsEnum.SMALLER_THAN].includes(
        selectedOption
      );
    }
  };

  const handleChangeLowerNumber = (e: any) => {
    const upperNumber = getValue(1);
    const inputValue = e.value ? +e.value : 0;

    if (!upperNumber || !inputValue || inputValue < upperNumber) {
      setValue([inputValue, upperNumber]);
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const handleChangeUpperNumber = (e: any) => {
    const lowerNumber = getValue(0);
    const inputValue = e.value ? +e.value : 0;

    if (!lowerNumber || !inputValue || inputValue > lowerNumber) {
      setValue([lowerNumber, inputValue]);
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const handleChangeEquals = (e: any) => {
    const inputValue = e.value ? +e.value : 0;

    if (inputValue) {
      setDisableButton(false);
      setValue([inputValue, inputValue]);
    } else {
      setDisableButton(true);
    }
  };

  return (
    <FilterHOC
      clearFilter={(closeFilter?: boolean) => {
        setValue([]);
        if (closeFilter) {
          setFilterValue([]);
          onChange([]);
          onClearFilter();
        }
      }}
      disableButton={disableButton}
      disabled={disabled}
      filterName={filterName}
      fixedFilter={fixedFilter}
      iconName={iconName}
      onChange={() => {
        onChange(value);
        setFilterValue(value);
      }}
      value={parsedFilterValue}
    >
      <FormProvider {...rhForm}>
        <div
          className="g-number-range p-column-filter"
          style={{ display: 'flex', width: '100%', alignItems: 'center' }}
        >
          <Dropdown
            optionLabel="name"
            value={selectedOption}
            options={options}
            onChange={(e: any) => {
              setSelectedOption(e?.value);
              setIsDropdownChange(true);
              setDisableButton(true);
              setValue([]);
            }}
          />
          {selectedOption === optionsEnum.EQUALS && (
            <InputNumberBasic
              name="equals-inputnumber"
              onChange={(e: any) => {
                handleChangeEquals(e);
              }}
              value={getValue(0) ?? 0}
            />
          )}
          {isLowerNumberInputVisible() && (
            <InputNumberBasic
              name="lower-inputnumber"
              onChange={(e: any) => {
                handleChangeLowerNumber(e);
              }}
              value={getValue(0) ?? 0}
            />
          )}
          {isUpperNumberInputVisible() && (
            <InputNumberBasic
              name="upper-inputnumber"
              onChange={(e: any) => {
                handleChangeUpperNumber(e);
              }}
              value={getValue(1) ?? 0}
            />
          )}
        </div>
      </FormProvider>
    </FilterHOC>
  );
};

export default InputNumberRange;
