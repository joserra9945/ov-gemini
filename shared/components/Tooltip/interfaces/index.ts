import { HTMLAttributes } from 'react';

export type Place = 'top' | 'bottom' | 'left' | 'right';
type Theme = 'light' | 'dark';

export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'data-pr-tooltip'> {
  rootId?: string;
  className?: string;
  classNameTrigger?: string;
  name?: string;
  content: string | JSX.Element;
  place?: Place;
  theme?: Theme;
  offset?: number;
  children?: React.ReactNode;
  'data-pr-tooltip'?: string;
}
