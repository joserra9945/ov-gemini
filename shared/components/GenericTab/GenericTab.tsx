import { FC, useMemo } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { TabPanel, TabView } from 'primereact/tabview';

import {
  TabPanelPassThrough,
  TabViewPassThrough,
} from '@shared/styles/primereact/passThrough/TabViewPT';

import { ITabsMenu } from './interfaces';

interface ILibraryParams {
  tabs: ITabsMenu[];
}

const GenericTab: FC<ILibraryParams> = ({ tabs }) => {
  const activeIndex = useMemo(() => {
    return tabs.findIndex((tab) => !tab.disabled);
  }, [tabs]);

  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: {
          tabview: TabViewPassThrough,
          tabpanel: TabPanelPassThrough,
        },
      }}
    >
      <TabView activeIndex={activeIndex}>
        {tabs.map((tab) => (
          <TabPanel header={tab.label} disabled={tab.disabled} key={tab.id}>
            {tab.body}
          </TabPanel>
        ))}
      </TabView>
    </PrimeReactProvider>
  );
};

export default GenericTab;
