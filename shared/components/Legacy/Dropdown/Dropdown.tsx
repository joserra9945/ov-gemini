/* eslint-disable */
// @ts-nocheck

import { useEffect, useState } from 'react';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DropdownProps } from './interfaces';

import './Dropdown.scss';

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = 'Select an item',
  onChange,
  ...props
}) => {
  const [displayOptions, setDisplayOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    setDisplayOptions(false);
  }, [selectedValue]);

  return (
    <div
      onBlur={() => setDisplayOptions(false)}
      className="g-dropdown-container"
    >
      <button
        type="button"
        className="g-dropdown selector-box"
        onClick={() => setDisplayOptions(!displayOptions)}
      >
        {selectedValue || placeholder}
        <div className="down-icon">
          <FontAwesomeIcon className="icon" icon={faChevronDown} />
        </div>
      </button>
      <div className={`g-dropdown ${displayOptions ? '' : 'hide'}`}>
        <div className="g-dropdown-items-wrapper">
          <input
            type="hidden"
            onChange={(e) => {
              console.log('onchange click');
            }}
            value={selectedValue}
          />
          <ul className="g-dropdown-items-wrapper">
            {options.map((row: any) => {
              return (
                <li
                  id={`g-select-option-${row.id}`}
                  className={`${
                    selectedValue === row.value ? 'item-selected' : ''
                  }`}
                  onClick={(e) => setSelectedValue(row.value)}
                  onChange={onChange}
                  value={row.value}
                >
                  {row.value}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
