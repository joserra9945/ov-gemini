import { ReactNode, useEffect, useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';

interface ITableMultiSelectProps {
  options: any;
  itemTemplate: ReactNode | ((item: any) => ReactNode);
  onChange: (arg: any) => void;
  defaultValue?: any;
  id?: string;
}

const TableMultiSelect = ({
  options,
  itemTemplate,
  onChange,
  defaultValue,
  id,
}: ITableMultiSelectProps): JSX.Element => {
  const [value, setValue] = useState();
  useEffect(() => {
    if (options && !value && !defaultValue) {
      const preselectedOptions = options.reduce(
        (acummulator: any[], option: any) => {
          if (!option.unchecked) {
            acummulator.push(option.value);
          }
          return acummulator;
        },
        []
      );
      setValue(preselectedOptions);
    }
  }, [defaultValue, options, value]);

  return (
    <MultiSelect
      style={{ width: '100%' }}
      value={value || defaultValue}
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

export default TableMultiSelect;
