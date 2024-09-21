/* eslint-disable */
// @ts-nocheck

import { useEffect, useState } from 'react';

import {
  InputNumber,
  InputNumberChangeParams,
} from '@shared/components/Legacy/InputNumber';

import useDebounce from '../../helpers/useDebounce';

interface ITableInputNumberRangeProps {
  onChange: (e: (number | null)[]) => void;
  defaultValue?: number[];
  id?: string;
}

const TableInputNumberRange = ({
  onChange,
  defaultValue,
  id,
}: ITableInputNumberRangeProps): JSX.Element => {
  const [value, setValue] = useState<number[]>([]);
  const [lowerInputStyle, setLowerInputStyle] = useState({});
  const [upperInputStyle, setUpperInputStyle] = useState({});

  const debouncedSearchTerm = useDebounce(value, 1000);

  useEffect(() => {
    onChange && onChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onChange]);

  const getValue = (index: number) => {
    return value[index] != null
      ? value[index]
      : value[index] === undefined && defaultValue
      ? defaultValue[index]
      : 0;
  };

  return (
    <div
      className="g-number-range p-column-filter"
      style={{ display: 'flex', width: '100%', alignItems: 'center' }}
    >
      <InputNumber
        id={`${id}-range-lower`}
        value={getValue(0)}
        onChange={(e: InputNumberChangeParams) => {
          const upper = getValue(1);
          if (!upper || !e.value || e.value < upper) {
            setValue([e?.value ? +e?.value : 0, upper]);
            setLowerInputStyle({});
          } else {
            setLowerInputStyle({ borderColor: 'red' });
          }
        }}
        inputStyle={lowerInputStyle}
      />
      {' - '}
      <InputNumber
        id={`${id}-range-upper`}
        value={getValue(1)}
        onChange={(e: InputNumberChangeParams) => {
          const lower = getValue(0);
          if (!lower || !e.value || e.value > lower) {
            setValue([lower, e?.value ? +e?.value : 0]);
            setUpperInputStyle({});
          } else {
            setUpperInputStyle({ borderColor: 'red' });
          }
        }}
        inputStyle={upperInputStyle}
      />
    </div>
  );
};

export default TableInputNumberRange;
