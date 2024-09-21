import {
  CommonProps,
  LoaderHeightWidthProps,
  LoaderHeightWidthRadiusProps,
  LoaderSizeMarginProps,
  LoaderSizeProps,
} from '../interfaces';

/*
 * DefaultProps object for different loaders
 */
const commonValues: Required<CommonProps> = {
  loading: true,
  color: '#000000',
  css: '',
  speedMultiplier: 1,
};

export function sizeDefaults(sizeValue: number): Required<LoaderSizeProps> {
  return { ...commonValues, size: sizeValue };
}

export function sizeMarginDefaults(
  sizeValue: number
): Required<LoaderSizeMarginProps> {
  return { ...sizeDefaults(sizeValue), margin: 2 };
}

export function heightWidthDefaults(
  height: number,
  width: number
): Required<LoaderHeightWidthProps> {
  return { ...commonValues, height, width };
}

export function heightWidthRadiusDefaults(
  height: number,
  width: number,
  radius = 2
): Required<LoaderHeightWidthRadiusProps> {
  return { ...heightWidthDefaults(height, width), radius, margin: 2 };
}
