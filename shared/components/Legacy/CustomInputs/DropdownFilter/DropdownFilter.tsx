/* eslint-disable */
// @ts-nocheck

import { useCallback, useEffect, useRef, useState } from 'react';
import Select, { GroupBase, SelectComponentsConfig } from 'react-select';
import classNames from 'classnames/bind';
import cloneDeep from 'lodash/cloneDeep';

import { IDropdownFilterProps, OptionType } from './DropdownFilterProps';

const components: Partial<
  SelectComponentsConfig<any, boolean, GroupBase<OptionType>>
> = {};

const CustomDropdownFilter = ({
  labelProperty = 'nombre',
  valueProperty = 'id',
  name,
  placeholder = '',
  inputClass = '',
  noOptionsMessageText = 'No hay opciones seleccionadas',
  disabled = false,
  isMulti = false,
  isClearable = true,
  value,
  error,
  onBlur,
  options,
  formatOptionLabel,
  customStyles,
  setterOnChange,
  onChange,
  getOptionLabel,
  formatGroupLabel,
  hideSelectedOptions,
  closeMenuOnSelect,
  formatSingleValue,
  multiValueLabel,
  optionTemplate,
  menuPortalTarget,
  menuPosition = 'fixed',
  ...rest
}: IDropdownFilterProps): JSX.Element => {
  const [selectedOptions, setSelectedOptions] = useState<any>();
  const [newOptions, setNewOptions] = useState([]);
  const prevValue = useRef();

  const addOptionsSelected = (obj: any, selectedOpt: any) => {
    selectedOpt.forEach((selected: any) => {
      const option: any = { ...selected };
      option[valueProperty] = selected.value;
      option[labelProperty] = selected.label;
      obj.push(option);
    });
  };

  const className = classNames(
    {
      'reactselect-invalid': error,
    },
    `${`react-select${name ? ` ${name}` : ''}` || ''} ${
      inputClass || ''
    } data-hj-allow g-select`
  );

  // const customStyles = {
  //   control: (base, state) => ({
  //     ...base,
  //     // state.isFocused can display different borderColor if you need it
  //     borderColor: state.isFocused ?
  //       '#ddd' : isValid ?
  //       '#ddd' : 'red',
  //     // overwrittes hover style
  //     '&:hover': {
  //       borderColor: state.isFocused ?
  //         '#ddd' : isValid ?
  //         '#ddd' : 'red'
  //     }
  //   })
  // }

  const handleChange = (selectedOpt: any, { action, removedValue }: any) => {
    let obj: any = isMulti ? [] : {};
    let selectedOptionsCloned = cloneDeep(selectedOpt);
    if (isMulti) {
      addOptionsSelected(obj, selectedOptionsCloned);
    } else {
      obj[valueProperty] = selectedOptionsCloned?.value;
      obj[labelProperty] = selectedOptionsCloned?.label;
    }
    switch (action) {
      case 'remove-value':
      case 'pop-value':
        if (removedValue?.isFixed) {
          return;
        }
        break;
      case 'clear':
        selectedOptionsCloned = options.reduce((acumulado, actual) => {
          if (actual.isFixed) {
            acumulado.push({
              ...actual,
              label: actual.name,
              value: actual.id,
            });
          }
          return acumulado;
        }, []);
        obj = selectedOptionsCloned;
        break;
      default:
        break;
    }
    setSelectedOptions(selectedOptionsCloned);
    onChange(obj);
    if (setterOnChange) {
      setterOnChange(obj);
    }
  };

  const assignValue = useCallback(() => {
    if (isMulti) {
      const resultado: any = [];
      if (value.length) {
        value.forEach((valores: any) => {
          resultado.push({
            ...valores,
            value: valores[valueProperty],
            label: valores[labelProperty],
          });
        });
        setSelectedOptions(resultado);
      } else {
        setSelectedOptions([]);
      }
    } else {
      setSelectedOptions({
        ...value,
        value: value[valueProperty],
        label: value[labelProperty],
      });
    }
  }, [value, labelProperty, valueProperty, isMulti]);

  useEffect(() => {
    if (options?.length) {
      const res: any = options.map((option) => ({
        ...option,
        value: option[valueProperty],
        label: option[labelProperty],
      }));
      setNewOptions(res);
    } else {
      setNewOptions([]);
    }
  }, [options, labelProperty, valueProperty]);

  useEffect(() => {
    if (!value) {
      setSelectedOptions([]);
    } else if (!prevValue.current || prevValue?.current !== value) {
      assignValue();
    }
  }, [value, assignValue]);

  if (optionTemplate || formatSingleValue) {
    if (optionTemplate) {
      components.Option = optionTemplate;
    }
    if (formatSingleValue) {
      components.SingleValue = formatSingleValue;
    }
    if (multiValueLabel) {
      components.MultiValueLabel = multiValueLabel;
    }
  }

  return (
    <Select
      classNamePrefix="g-react-select react-select"
      className={className}
      styles={customStyles}
      menuPosition={menuPosition}
      value={selectedOptions}
      options={newOptions}
      placeholder={placeholder}
      isClearable={isClearable}
      isMulti={isMulti}
      isDisabled={disabled}
      hideSelectedOptions={hideSelectedOptions}
      closeMenuOnSelect={closeMenuOnSelect}
      menuPortalTarget={menuPortalTarget}
      onChange={handleChange}
      onBlur={onBlur}
      getOptionLabel={getOptionLabel}
      formatGroupLabel={formatGroupLabel}
      formatOptionLabel={formatOptionLabel}
      noOptionsMessage={() => noOptionsMessageText}
      components={components}
      {...rest}
    />
  );
};

export default CustomDropdownFilter;
