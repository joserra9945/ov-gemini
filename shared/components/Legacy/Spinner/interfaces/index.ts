export interface SpinnerProps {
  className?: string;
  color?: string;
  loading: boolean;
  css?: React.CSSProperties;
  size?: number;
  speedMultiplier?: number;
  label?: string;
}

export interface LengthObject {
  value: number;
  unit: string;
}

export interface CommonProps {
  color?: string;
  loading?: boolean;
  css?: string | React.CSSProperties;
  speedMultiplier?: number;
}

type LengthType = number | string;

export interface LoaderHeightWidthProps extends CommonProps {
  height?: LengthType;
  width?: LengthType;
}

export interface LoaderSizeProps extends CommonProps {
  size?: LengthType;
}

export interface LoaderSizeMarginProps extends LoaderSizeProps {
  margin?: LengthType;
}

export interface LoaderHeightWidthRadiusProps extends LoaderHeightWidthProps {
  margin?: LengthType;
  radius?: LengthType;
}
