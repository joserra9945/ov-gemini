/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import { TabPanel, TabView } from 'primereact/tabview';

import PrasContext from './PrasContext';
import { newTypeArr, tabItems } from './tabItems';

import './content.scss';

interface IContentProps {
  empresa: { cif: string; razonSocial: string };
  tabs: number[];
  responsiveTabs?: boolean;
  setAccordionWidth?: number;
}
const Content = ({ tabs, empresa }: IContentProps): JSX.Element => {
  const [finalTabs, setFinalTabs] = useState<newTypeArr[]>([]);

  const contextValue = useMemo(
    () => ({
      empresa,
    }),
    [empresa]
  );
  useEffect(() => {
    const aux = tabs.reduce((acummulator: newTypeArr[], item) => {
      const tab = tabItems.find((tabItem) => tabItem.id === item);

      if (tab) {
        acummulator.push(tab);
      }
      return acummulator;
    }, []);
    setFinalTabs(aux);
  }, [tabs]);

  return (
    <PrasContext.Provider value={contextValue}>
      <div className="pras-module__content-container ">
        {finalTabs && (
          <TabView>
            {finalTabs.map((tab) => {
              return (
                <TabPanel
                  key={tab.label}
                  header={tab.label}
                  className={`${tab.label === 'RETIR' ?? 'retir-tab'}`}
                >
                  <div
                    className={
                      tab.label === 'RETIR' ? '' : 'pras-module__content-child'
                    }
                  >
                    {tab.body}
                  </div>
                </TabPanel>
              );
            })}
          </TabView>
        )}
      </div>
    </PrasContext.Provider>
  );
};

export default Content;
