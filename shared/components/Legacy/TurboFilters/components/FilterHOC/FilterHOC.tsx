import { useEffect, useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faTimes } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '@shared/components/Legacy/Button';

import { checkIfIsEmptyOrFalsy } from '../../helpers';
import useKeypress from '../../helpers/useKeyPress';

interface IFilterHOCProps {
  children: React.ReactNode;
  clearFilter: (closeFilter?: boolean) => void;
  disabled?: boolean;
  disableButton: boolean;
  filterName: string;
  fixedFilter?: boolean;
  iconName?: IconDefinition;
  onChange: () => void;
  showFooter?: boolean;
  useEnter?: boolean;
  value: any;
}

const FilterHOC = ({
  children,
  clearFilter,
  disabled = false,
  disableButton = false,
  filterName,
  fixedFilter,
  iconName,
  onChange,
  showFooter = true,
  useEnter,
  value = null,
}: IFilterHOCProps): JSX.Element => {
  const overlay = useRef<OverlayPanel>(null);
  const [valueToDisplay, setValueToDisplay] = useState<any>();

  useKeypress(
    'Enter',
    (e: KeyboardEvent) => {
      e.stopPropagation();
      onChange?.();
    },
    useEnter
  );

  useEffect(() => {
    if (value) {
      setValueToDisplay(value);
    }
  }, [value]);

  const getValueToDisplay = () => {
    if (Array.isArray(valueToDisplay)) {
      return valueToDisplay.length <= 2
        ? valueToDisplay.join(', ')
        : `${valueToDisplay.slice(0, 2).join(', ')}, + ${
            valueToDisplay.length - 2
          }`;
    }
    return valueToDisplay;
  };

  return (
    <>
      <button
        disabled={disabled}
        type="button"
        className={`${
          disabled ? '!cursor-not-allowed !bg-primary-50' : ''
        }  turbo-filter__column-filter-container${
          !checkIfIsEmptyOrFalsy(valueToDisplay) ? ' --selected' : ''
        }
        `}
        onClick={(e) => {
          if (overlay?.current?.toggle) {
            overlay.current.toggle(e, null);
          }
          e.currentTarget.focus();
        }}
      >
        {iconName && <FontAwesomeIcon icon={iconName} size="lg" />}
        <div className="turbo-filter__column-filter">
          <span className="turbo-filter__column-filter-name">
            {filterName.toLowerCase()}
          </span>
          {!checkIfIsEmptyOrFalsy(valueToDisplay) && (
            <span className="turbo-filter__column-filter-value">
              : {getValueToDisplay()}
            </span>
          )}
        </div>
        {!checkIfIsEmptyOrFalsy(valueToDisplay) && !fixedFilter ? (
          <Button
            color="light"
            icon={faTimes}
            onClick={(e) => {
              e.stopPropagation();
              clearFilter?.(true);
            }}
            rounded="full"
            size="xs"
          />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} size="xs" />
        )}
      </button>
      <OverlayPanel
        ref={overlay}
        id="turbo-filter__overlay_panel"
        className="turbo-filter__overlay_panel"
      >
        <div className="turbo-filter__overlay_panel__content">
          {children}
          {showFooter && (
            <div className="turbo-filter__overlay_panel__buttons">
              <Button
                label="Borrar"
                link
                onClick={() => {
                  clearFilter?.();
                }}
              />
              <Button
                disabled={disableButton}
                label="Aplicar filtro"
                onClick={(e) => {
                  onChange?.();
                  e.stopPropagation();
                }}
              />
            </div>
          )}
        </div>
      </OverlayPanel>
    </>
  );
};

export default FilterHOC;
