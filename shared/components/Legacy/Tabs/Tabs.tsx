/* eslint-disable */
// @ts-nocheck

import {
  cloneElement,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { OverlayPanel, OverlayPanelEventType } from 'primereact/overlaypanel';
import { isEmpty, throttle } from 'lodash';
import { nanoid } from 'nanoid';

import { Accordion, AccordionTab } from '@shared/components/Legacy/Accordion';

import TabTitle from './components/TabTitle';
import useWindowSize from './helpers/useWindowsSize';
import { ITabsProps } from './interfaces';

const tabPrefix = 'tab-';
const showMoreWidth = 70;
interface ITabs {
  tabsVisible: React.ReactNode[];
  tabsHidden: React.ReactNode[];
  isSelectedTabHidden: boolean;
}

interface IDisplayHiddenTabs {
  hiddenTabs: React.ReactNode;
  visibleTabs: React.ReactNode;
  selectedTab?: number;
  unControlledSelectedTab: number;
}

const DisplayHiddenTabs = ({
  hiddenTabs,
  visibleTabs,
  selectedTab,
  unControlledSelectedTab,
}: IDisplayHiddenTabs) => {
  return useMemo(() => {
    if (Array.isArray(hiddenTabs)) {
      const tab = hiddenTabs.find((item, index) => {
        const visibleTabsLenght = Array.isArray(visibleTabs)
          ? visibleTabs.length
          : 0;
        const tabIndex = index + visibleTabsLenght;
        return tabIndex === (selectedTab ?? unControlledSelectedTab);
      });
      return (
        <div className="g-tabview-nav__subtitle">
          {tab && (tab as ReactElement)?.props?.title}
        </div>
      );
    }
    return null;
  }, [hiddenTabs, visibleTabs, selectedTab, unControlledSelectedTab]);
};

const Tabs: React.FC<ITabsProps> = ({
  children,
  type = 'default',
  selectedTab,
  setSelectedTab,
  responsive = false,
  setAccordionWidth,
}) => {
  const [unControlledSelectedTab, setUncontrolledSelectedTab] = useState(0);
  const [tabsDimensions, setTabsDimensions] = useState<any>({
    tabsTotalWidth: 0,
    blockWidth: 0,
    tabNext: {},
  });
  const [visibleTabs, setVisibleTabs] = useState<React.ReactNode>();
  const [hiddenTabs, setHiddenTabs] = useState<React.ReactNode>();
  const [finalChildren, setFinalChildren] = useState<React.ReactNode>();
  const [focusedTab, setFocusedTab] = useState<number>();
  const [tabMode, setTabMode] = useState<string>('normal');

  const windowSize = useWindowSize();

  const onResize = useCallback(
    (width) => {
      if (tabsRef.current && responsive) {
        setTabsDimensions((currentTabDimensions: any) => ({
          ...currentTabDimensions,
          blockWidth: width,
        }));
      }
    },
    [responsive]
  );
  const onResizeThrottled = throttle(onResize, 100, { trailing: true });
  const { ref } = useResizeDetector({
    onResize: onResizeThrottled,
  });
  const tabsRef = useRef<{ [key: string]: HTMLElement }>({});
  const showMoreRef = useRef<OverlayPanel>(null);

  const renderCounter = useRef(0);
  renderCounter.current += 1;

  const toogleShowMore = (e: OverlayPanelEventType, close?: boolean) => {
    if (showMoreRef.current) {
      if (close) {
        showMoreRef.current.hide();
        return;
      }
      showMoreRef.current.toggle(e, e?.target);
    }
  };

  const getIsCollapsed = useCallback(() => {
    const { tabsTotalWidth, blockWidth } = tabsDimensions;
    return blockWidth && tabsTotalWidth && blockWidth < tabsTotalWidth;
  }, [tabsDimensions]);

  const setDimensions = useCallback((width?: number) => {
    if (!tabsRef.current || isEmpty(tabsRef.current)) {
      // it shouldn't happen ever. Just a paranoic check
      return;
    }

    setTabsDimensions((currentTabDimensions: any) => {
      let tabsTotalWidth = 0;
      const tabDimensionsNext: any = {};
      Object.keys(tabsRef.current).forEach((key) => {
        if (tabsRef.current[key]) {
          const tabKey = key.replace(tabPrefix, '');
          const tabWidth = tabsRef.current[key].offsetWidth;
          if (tabWidth) {
            tabDimensionsNext[tabKey] = {
              width: tabWidth,
              offset: tabsTotalWidth,
            };
          } else {
            tabDimensionsNext[tabKey] = currentTabDimensions.tabNext[tabKey];
          }
          tabsTotalWidth += tabDimensionsNext[tabKey]?.width;
        }
      });
      return {
        tabsTotalWidth,
        blockWidth: width,
        tabNext: tabDimensionsNext,
      };
    });
  }, []);

  const onFocusTab = (index: number) => {
    setFocusedTab(index);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if ((event.key === 'Enter' || event.keyCode === 13) && focusedTab != null) {
      setSelectedTab
        ? setSelectedTab(focusedTab)
        : setUncontrolledSelectedTab(focusedTab);
    }
  };

  useEffect(() => {
    if (windowSize?.width && setAccordionWidth) {
      setTabMode(
        windowSize?.width < setAccordionWidth ? 'accordion' : 'normal'
      );
    }
  }, [windowSize, setAccordionWidth]);

  useEffect(() => {
    const getTabs = () => {
      const { tabsTotalWidth, blockWidth } = tabsDimensions;

      const collapsed =
        blockWidth && tabsTotalWidth && blockWidth < tabsTotalWidth;
      let availableWidth =
        blockWidth - (tabsTotalWidth > blockWidth ? showMoreWidth : 0);
      if (Array.isArray(finalChildren)) {
        return finalChildren.reduce(
          (result: ITabs, item, index) => {
            const selected = selectedTab === index;
            const key = (item as ReactElement)?.key;
            let tabWidth = 0;
            if (key) {
              tabWidth = tabsDimensions.tabNext[key]
                ? tabsDimensions.tabNext[key].width
                : 0;
            }
            if (
              // initial call
              !blockWidth ||
              // collapsed mode
              !collapsed ||
              // all tabs are fit into the block
              blockWidth > tabsTotalWidth ||
              // current tab fit into the block
              availableWidth - tabWidth > 0
            ) {
              result?.tabsVisible?.push(item);
            } else {
              result?.tabsHidden?.push(item);
              if (selected) result.isSelectedTabHidden = true;
            }
            availableWidth -= tabWidth;
            return result;
          },
          {
            tabsVisible: [],
            tabsHidden: [],
            isSelectedTabHidden: false,
          }
        );
      }
    };
    if (finalChildren && responsive) {
      const { tabsVisible, tabsHidden } = getTabs() || {};
      setHiddenTabs(tabsHidden);
      setVisibleTabs(tabsVisible);
    }
  }, [finalChildren, selectedTab, tabsDimensions, responsive]);

  useEffect(() => {
    if (finalChildren && responsive) setDimensions(ref.current?.offsetWidth);
  }, [setDimensions, ref, finalChildren, responsive]);

  useEffect(() => {
    let aux = children;
    if (Array.isArray(children) && responsive) {
      aux = children.map((child) =>
        cloneElement(child as JSX.Element, { key: nanoid() })
      );
    }
    setFinalChildren(aux);
    setVisibleTabs(aux);
  }, [children, responsive]);

  const accordionMemo = useMemo(
    () => (
      <Accordion
        controlled
        onChangeExpanded={(e) => {
          setSelectedTab ? setSelectedTab(+e) : setUncontrolledSelectedTab(+e);
        }}
      >
        {Array.isArray(children) &&
          children.map((child, index) => {
            return (
              <AccordionTab
                key={nanoid()}
                id={`${index}`}
                title={(child as ReactElement)?.props?.title}
              >
                {(child as ReactElement)?.props?.children}
              </AccordionTab>
            );
          })}
      </Accordion>
    ),
    [children, setSelectedTab]
  );

  return (
    <>
      {/* <h1>tabs renders: {renderCounter.current}</h1> */}
      <div
        ref={ref}
        className={`g-tabview${type ? ` g-tabview--${type}` : ''}`}
        onKeyDown={onKeyDown}
      >
        {tabMode === 'accordion' ? (
          accordionMemo
        ) : (
          <>
            <ul
              className={`g-tabview-nav${!responsive ? ' --overflowed' : ''}`}
              role="tablist"
            >
              {Array.isArray(visibleTabs) &&
                visibleTabs.map((item, index) => {
                  const { key } = (item as ReactElement) || {};
                  return item ? (
                    <TabTitle
                      dataId={(item as ReactElement)?.props?.dataId}
                      selectedTab={
                        selectedTab != null && setSelectedTab
                          ? selectedTab
                          : unControlledSelectedTab
                      }
                      key={key}
                      title={(item as ReactElement)?.props?.title}
                      badge={(item as ReactElement)?.props?.badge}
                      index={index}
                      setSelectedTab={(e, index: number) => {
                        selectedTab != null && setSelectedTab
                          ? setSelectedTab(index)
                          : setUncontrolledSelectedTab(index);
                        toogleShowMore(e, true);
                      }}
                      tabRef={(e: HTMLLIElement) => {
                        tabsRef.current[tabPrefix + key] = e;
                      }}
                      onFocus={onFocusTab}
                      disabled={(item as ReactElement)?.props?.disabled}
                    />
                  ) : null;
                })}
              {getIsCollapsed() ? (
                <div
                  onClick={(e) => {
                    toogleShowMore(e);
                  }}
                  className={`${
                    Array.isArray(visibleTabs) &&
                    (selectedTab ?? unControlledSelectedTab) &&
                    (selectedTab ?? unControlledSelectedTab) >=
                      visibleTabs.length
                      ? 'g-showmore --underlined'
                      : 'g-showmore'
                  }`}
                >
                  <a className="g-tabview-nav-link">...</a>
                </div>
              ) : (
                ''
              )}
            </ul>
            <OverlayPanel className="g-showmore__overlay" ref={showMoreRef}>
              <ul className="g-tabview-nav" role="tablist">
                {' '}
                {Array.isArray(hiddenTabs) &&
                  hiddenTabs.map((item, index) => {
                    const { key } = (item as ReactElement) || {};
                    return item ? (
                      <TabTitle
                        dataId={(item as ReactElement)?.props?.dataId}
                        selectedTab={
                          selectedTab != null && setSelectedTab
                            ? selectedTab
                            : unControlledSelectedTab
                        }
                        key={key}
                        title={(item as ReactElement)?.props?.title}
                        badge={(item as ReactElement)?.props?.badge}
                        index={
                          index +
                          (Array.isArray(visibleTabs) ? visibleTabs.length : 0)
                        }
                        setSelectedTab={(e, index: number) => {
                          selectedTab != null && setSelectedTab
                            ? setSelectedTab(index)
                            : setUncontrolledSelectedTab(index);
                          toogleShowMore(e, true);
                        }}
                        tabRef={(e: HTMLLIElement) => {
                          tabsRef.current[tabPrefix + key] = e;
                        }}
                        disabled={(item as ReactElement)?.props?.disabled}
                      />
                    ) : null;
                  })}
              </ul>
            </OverlayPanel>
            <DisplayHiddenTabs
              hiddenTabs={hiddenTabs}
              visibleTabs={visibleTabs}
              selectedTab={selectedTab}
              unControlledSelectedTab={unControlledSelectedTab}
            />
            {Array.isArray(finalChildren) &&
              finalChildren[
                selectedTab != null && setSelectedTab
                  ? selectedTab
                  : unControlledSelectedTab
              ]}
          </>
        )}
      </div>
    </>
  );
};

export default Tabs;
