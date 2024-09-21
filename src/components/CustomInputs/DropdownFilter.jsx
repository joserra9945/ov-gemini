import React, { useCallback, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import classNames from 'classnames/bind';
import cloneDeep from 'lodash/cloneDeep';

import './styles.scss';

const CustomDropdownFilter = ({
  value,
  onChange,
  error,
  disabled = false,
  options,
  placeholder = '',
  property = 'nombre',
  setterOnChange,
  formatOptionLabel = false,
  multiValueLabel = false,
  formatSingleValue = false,
  isMulti = false,
  optionDisabled = false,
  noOptionsMessageText = 'Sin opciones',
  name = '',
  className = '',
  isClearable = false,
  onBlur,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(value);
  const [newOptions, setNewOptions] = useState([]);
  const [dynamicId, setDynamicId] = useState('id');
  const inputClass = classNames(
    `${name || ''} ${className || ''} data-hj-allow`,
    {
      'p-invalid p-mr-2': error,
    }
  );

  const addOptionsSelected = (obj, _selectedOptions) => {
    _selectedOptions.forEach((selected) => {
      const option = selected.isFixed ? { isFixed: selected.isFixed } : {};
      option[dynamicId] = selected.value;
      option[property] = selected.label;
      obj.push(option);
    });
  };

  const handleChange = (_selectedOptions, { action, removedValue }) => {
    let obj = isMulti ? [] : {};
    let selectedOptionsCloned = cloneDeep(_selectedOptions);
    if (isMulti && selectedOptionsCloned?.length) {
      addOptionsSelected(obj, selectedOptionsCloned);
    } else {
      obj[dynamicId] = selectedOptionsCloned?.value;
      obj[property] = selectedOptionsCloned?.label;
    }

    switch (action) {
      case 'remove-value':
      case 'pop-value':
        if (removedValue.isFixed) {
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

  useEffect(() => {
    if (options?.length) {
      const res = options.map((option) => ({
        ...option,
        value: option[dynamicId],
        label: option[property],
      }));
      setNewOptions(res);
    } else {
      setNewOptions([]);
    }
  }, [options, property, dynamicId]);

  const prevValue = useRef();

  const assignValue = useCallback(() => {
    if (isMulti) {
      const resultado = [];
      if (value.length) {
        const res = Object.keys(value[0]).find((key) => {
          return ['id', 'value'].includes(key);
        });
        if (res && res !== dynamicId) {
          setDynamicId(res);
        }
        value.forEach((valores) => {
          resultado.push({
            ...valores,
            value: valores[res],
            label: valores[property],
          });
        });
        setSelectedOptions(resultado);
      } else {
        setSelectedOptions([]);
      }
    } else {
      const res = Object.keys(value).find((key) =>
        ['id', 'value'].includes(key)
      );
      if (res && res !== dynamicId) {
        setDynamicId(res);
      }
      setSelectedOptions({
        ...value,
        value: value[res],
        label: value[property],
      });
    }
  }, [value, property, setDynamicId, setSelectedOptions, dynamicId, isMulti]);

  useEffect(() => {
    if (!value) {
      setSelectedOptions([]);
    } else if (!prevValue.current || prevValue?.current !== value) {
      assignValue();
    }
  }, [value, assignValue]);

  const customStyles = {
    multiValue: (base, state) => {
      return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
    },
    multiValueLabel: (base, state) => {
      return state.data.isFixed
        ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
        : base;
    },
    multiValueRemove: (base, state) => {
      return state.data.isFixed ? { ...base, display: 'none' } : base;
    },
    menuPortal: (provided) => ({ ...provided, zIndex: 11 }),
    menu: (provided) => ({ ...provided, zIndex: 11 }),
    control: (_) => ({
      ..._,
      padding: '0.1rem',
    }),
  };

  if (formatOptionLabel || formatSingleValue || multiValueLabel) {
    const components = {};
    if (formatOptionLabel) {
      components.Option = formatOptionLabel;
    }

    if (multiValueLabel) {
      components.MultiValueLabel = multiValueLabel;
    }

    if (formatSingleValue) {
      components.SingleValue = formatSingleValue;
    }
    return (
      <Select
        name={name}
        showClear
        className={inputClass}
        classNamePrefix={`react-select${className ? ` ${className}` : ''}`}
        placeholder={placeholder}
        value={selectedOptions}
        isMulti={isMulti}
        onChange={handleChange}
        options={newOptions}
        isOptionDisabled={(e) => optionDisabled && optionDisabled(e)}
        components={components}
        isDisabled={disabled}
        menuPortalTarget={document.body}
        styles={customStyles}
        noOptionsMessage={() => noOptionsMessageText}
        isClearable={isClearable}
        onBlur={onBlur}
        multiValueLabel={multiValueLabel}
      />
    );
  }

  return (
    <Select
      name={name}
      showClear
      itemTemplate
      className={inputClass}
      classNamePrefix={`react-select${className ? ` ${className}` : ''}`}
      placeholder={placeholder}
      value={selectedOptions}
      isMulti={isMulti}
      onChange={handleChange}
      options={newOptions}
      optionDisabled={optionDisabled}
      styles={customStyles}
      isDisabled={disabled}
      menuPortalTarget={document.body}
      onBlur={onBlur}
      noOptionsMessage={() => noOptionsMessageText}
      isClearable={isClearable}
    />
  );
};

export default CustomDropdownFilter;
