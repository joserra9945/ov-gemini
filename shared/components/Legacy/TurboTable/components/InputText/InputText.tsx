/* eslint-disable */
// @ts-nocheck

import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { faSearch } from '@fortawesome/pro-light-svg-icons';

import { Button } from '@shared/components/Legacy/Button';

import useDebounce from '../../helpers/useDebounce';

interface ITableInputTextProps {
  onChange: (e: string) => void;
  defaultValue: string;
  id?: string;
}

const TableInputText = ({
  onChange,
  defaultValue,
  id,
}: ITableInputTextProps): JSX.Element => {
  const [value, setValue] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string>();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    onChange && onChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onChange]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const searchItem = (e: any) => {
    setSearchTerm(e.trim());
  };

  return (
    <div className="p-inputgroup">
      <span className="p-input-icon-right">
        {value ? (
          <i
            className="pi pi-times"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setValue('');
              searchItem('');
            }}
          />
        ) : null}
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

      <Button
        icon={faSearch}
        className={`--no-border-radius ${id}-button`}
        onClick={() => searchItem(value)}
      />
    </div>
  );
};

export default TableInputText;
