/* eslint-disable */
// @ts-nocheck

import { FC, createContext, useEffect, useState } from 'react';

import { AccordionProps } from './interfaces';

export const AccordionContext: any = createContext(null);

export const Accordion: FC<AccordionProps> = ({
  children,
  controlled,
  defaultActiveItem = null,
  activeItem = null,
  onChangeActive,
  onChangeExpanded,
  collapseOnDoubleClick = true,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveItem);

  useEffect(() => {
    if (activeItem) {
      setActiveTab(activeItem);
    }
  }, [activeItem]);

  return (
    <AccordionContext.Provider
      value={{
        activeTab,
        setActiveTab,
        controlled,
        collapseOnDoubleClick,
        onChangeExpanded,
        onChangeActive,
      }}
    >
      <div
        className={`g-accordions-wrapper${className ? ` ${className}` : ''}`}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};
