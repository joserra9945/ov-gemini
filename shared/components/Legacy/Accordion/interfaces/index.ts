export interface AccordionProps {
  controlled?: boolean;
  defaultActiveItem?: number | null | string;
  collapseOnDoubleClick?: boolean;
  onChangeExpanded?: (arg: string) => void;
  onChangeActive?: (arg: string | number) => void;
  className?: string;
  activeItem?: string | number;
  children?: React.ReactNode;
}

export interface AccordionTabProps {
  id: string | number;
  title: React.ReactNode;
  defaultExpanded?: boolean;
  rightTitle?: React.ReactNode;
  className?: string;
  toogleIconOnTheLeft?: boolean;
  handleExpanded?: (arg: string) => void;
  children?: React.ReactNode;
  expandedOnClick?: boolean;
  onClick?: () => void;
  contentClassName?: string;
}
