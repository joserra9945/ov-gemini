import { ReactNode } from 'react';

export interface ITabsProps {
  type?: 'default' | 'underline';
  children: ReactNode;
  selectedTab?: number;
  setSelectedTab?: (index: number) => void;
  responsive?: boolean;
  setAccordionWidth?: number;
}

export interface ITabTitleProps {
  dataId?: string;
  title: string;
  index: number;
  selectedTab: number;
  setSelectedTab: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => void;
  disabled?: boolean;
  tabRef?: (arg: HTMLLIElement) => void;
  key?: React.Key | null;
  onFocus?: (arg: number) => void;
  badge?: boolean;
}

export interface ITabProps {
  title: string;
  dataId?: string;
  disabled?: boolean;
  badge?: boolean;
  className?: string;
  children?: React.ReactNode;
}
