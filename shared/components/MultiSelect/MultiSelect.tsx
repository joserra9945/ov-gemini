import { Dispatch, SetStateAction } from 'react';
import { MultiSelect, MultiSelectProps } from 'primereact/multiselect';

import ChipTemplate from './Templates/ChipTemplate';

import './MultiSelectStyles.scss';

interface IProps extends MultiSelectProps {
  className?: string;
  showChipsValue?: boolean;
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  config?: {
    propertySelected: string;
  };
}

const CustomMultiSelect = ({
  display,
  options,
  showChipsValue = false,
  selected,
  setSelected,
  config,
  ...rest
}: IProps) => {
  const getLabel = (id: string) => {
    if (config) {
      return options?.find((el) => el.value === id)?.[config.propertySelected];
    }
    return options?.find((el) => el.value === id)?.label;
  };

  const onDelete = (value: string) => {
    const indice = selected.findIndex((el: string) => el === value);
    if (indice !== -1) {
      const newArray = [
        ...selected.slice(0, indice),
        ...selected.slice(indice + 1),
      ];
      setSelected(newArray);
    }
  };

  const getSelectedTemplate = (option: any) => {
    switch (display) {
      case 'chip':
        return (
          <ChipTemplate
            option={{ label: getLabel(option), value: option }}
            onDelete={onDelete}
            showValue={showChipsValue}
          />
        );
      default:
        return option;
    }
  };

  return (
    <div className="multi-container flex w-full rounded">
      <MultiSelect
        display={display}
        value={selected}
        className="rounded-md border-neutral-25 flex w-full min-h-12"
        selectedItemTemplate={getSelectedTemplate}
        panelHeaderTemplate={<div className="hidden" />}
        onChange={(e) => setSelected(e.value)}
        options={options}
        {...rest}
      />
    </div>
  );
};

export default CustomMultiSelect;
