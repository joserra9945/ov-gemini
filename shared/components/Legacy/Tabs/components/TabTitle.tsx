/* eslint-disable */
// @ts-nocheck

import { useCallback, useMemo } from 'react';

import Badge from '@shared/components/Legacy/Badge';

import { ITabTitleProps } from '../interfaces';

const TabTitle: React.FC<ITabTitleProps> = ({
  dataId,
  title,
  setSelectedTab,
  index,
  selectedTab,
  disabled,
  tabRef,
  onFocus,
  badge,
}) => {
  const onClick = useCallback(
    (e) => {
      setSelectedTab(e, index);
    },
    [setSelectedTab, index]
  );

  const handleRef = useCallback(
    (element: HTMLLIElement) => {
      tabRef && tabRef(element);
    },
    [tabRef]
  );

  return useMemo(
    () => (
      <li
        className={`g-tab-title${
          selectedTab === index ? ' g-tabview-selected g-highlight' : ''
        }`}
        data-id={dataId}
        ref={handleRef}
        role="tab"
        onFocus={() => !disabled && onFocus && onFocus(index)}
        tabIndex={disabled ? -1 : 0}
      >
        {badge && <Badge className="g-badge--danger" />}
        <a
          className={`g-tabview-nav-link${
            disabled ? ' g-tabview-nav-link--disabled' : ''
          }`}
          onClick={(e) => {
            if (!disabled) onClick(e);
          }}
        >
          {title}
        </a>
      </li>
    ),
    [
      badge,
      dataId,
      disabled,
      handleRef,
      index,
      onClick,
      onFocus,
      selectedTab,
      title,
    ]
  );
};

export default TabTitle;
