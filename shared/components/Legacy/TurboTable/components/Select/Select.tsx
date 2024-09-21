import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

interface ITableSelectProps {
  options: any;
  itemTemplate: any;
  onChange: (arg: any) => void;
  defaultValue?: any;
  id?: string;
}

const TableSelect = ({
  options,
  itemTemplate,
  onChange,
  defaultValue,
  id,
}: ITableSelectProps): JSX.Element => {
  const [value, setValue] = useState();
  useEffect(() => {
    if (options && !defaultValue) {
      setValue(options.map((option: any) => option.value));
    }
  }, [defaultValue, options]);

  return (
    <Dropdown
      style={{ width: '100%' }}
      value={value || (value === undefined && defaultValue)}
      onChange={(e) => {
        const values = e.value;
        setValue(values);
        onChange(values);
      }}
      itemTemplate={itemTemplate}
      options={options}
      className="p-column-filter"
      id={id}
    />
  );
};

export default TableSelect;
