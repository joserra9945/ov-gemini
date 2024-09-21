import { OverlayPanelPassThroughOptions } from 'primereact/overlaypanel';
import classNames from 'classnames';

export const OverlayPanelPassThrough: OverlayPanelPassThroughOptions = {
  root: {
    className: classNames(
      'bg-white text-gray-700 border-0 rounded-md shadow-lg',
      'z-40 transform origin-center',
      'mt-3',
      'before:absolute before:w-0 before:-top-3 before:h-0 before:border-transparent before:border-solid before:overlaypanel-arrow-position before:border-x-[0.75rem] before:border-b-[0.75rem] before:border-t-0 before:border-b-white'
    ),
  },
  closeButton: {
    className: classNames(
      'flex items-center justify-center overflow-hidden absolute top-0 right-0 w-6 h-6'
    ),
  },
  content: {
    className: classNames('items-center flex'),
  },
};
