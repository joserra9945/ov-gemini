/* eslint-disable */
// @ts-nocheck

import { useContext, useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AccordionContext } from '../Accordion';
import { AccordionTabProps } from '../interfaces';

const primaryColor = '#0069aa';

export const AccordionTab: React.FC<AccordionTabProps> = ({
  id,
  title,
  className,
  rightTitle = '',
  defaultExpanded = false,
  toogleIconOnTheLeft = false,
  children,
  handleExpanded,
  expandedOnClick = true,
  onClick,
  contentClassName,
}) => {
  const {
    activeTab,
    setActiveTab,
    controlled,
    collapseOnDoubleClick,
    onChangeExpanded,
    onChangeActive,
  } = useContext(AccordionContext) || {};
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleTabClick = () => {
    if (collapseOnDoubleClick && activeTab === id) {
      onChangeActive ? onChangeActive(null) : setActiveTab(null);
    } else {
      onChangeActive ? onChangeActive(id) : setActiveTab(id);
    }
  };

  const tabIsActive = controlled ? activeTab === id : expanded;

  return (
    <div
      className={`g-accordionTab-wrapper${tabIsActive ? ' --expanded' : ''}${
        !children ? ' --no-children' : ''
      }${className ? ` ${className}` : ''}`}
    >
      <div
        className={`g-resume-wrapper${
          tabIsActive ? ' g-resume-wrapper-active' : ''
        }
        `}
      >
        <div className="flex flex-row justify-between">
          <div
            className={`g-accordion-title w-full ${
              tabIsActive && 'g-accordion-title-active'
            }`}
            onClick={() => {
              if (expandedOnClick) {
                onClick && onClick();
                if (!expanded && handleExpanded) handleExpanded(`${id}`);
                controlled ? handleTabClick() : setExpanded(!expanded);
                onChangeExpanded && onChangeExpanded(id);
              }
            }}
          >
            <span className="perfilEmpresaTitulo">{title}</span>
          </div>
          {rightTitle && (
            <div className="g-accordion-title-rightcol">{rightTitle}</div>
          )}
        </div>
      </div>
      {tabIsActive && children && (
        <div className={`g-content-wrapper ${contentClassName}`}>
          {children}
        </div>
      )}
    </div>
  );
};
