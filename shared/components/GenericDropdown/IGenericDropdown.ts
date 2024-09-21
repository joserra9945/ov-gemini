export type TooltipPositionType = 'top' | 'bottom' | 'left' | 'right' | 'mouse';

export interface ITooltipOptions {
  position: TooltipPositionType;
  className: string;
}
