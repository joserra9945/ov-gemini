import { createContext, Dispatch, SetStateAction } from 'react';

interface IChartLineGraphContext {
  selectedTab: number;
  setSelectedTab: Dispatch<SetStateAction<number>>;
}

const ChartLineGraphContext = createContext<IChartLineGraphContext>(
  {} as IChartLineGraphContext
);

export default ChartLineGraphContext;
