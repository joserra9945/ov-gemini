export type Place = 'top' | 'bottom' | 'left' | 'right';
type Theme = 'light' | 'dark';

export interface TooltipProps {
  rootId?: string;
  className?: string;
  classNameTrigger?: string;
  name?: string;
  content: string | JSX.Element;
  place?: Place;
  theme?: Theme;
  offset?: number;
  children?: React.ReactNode;
}
