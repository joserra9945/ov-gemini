import {
  SidebarPassThroughMethodOptions,
  SidebarPassThroughOptions,
} from 'primereact/sidebar';
import { classNames } from 'primereact/utils';

export const SideBarPassThrough: SidebarPassThroughOptions = {
  root: ({ props }: SidebarPassThroughMethodOptions) => ({
    className: classNames(
      'flex flex-col pointer-events-auto relative transform translate-x-0 translate-y-0 translate-z-0 relative transition-transform duration-300',
      'bg-white text-gray-700 border-0 shadow-lg',
      {
        'h-full w-max-3/4':
          props.position === 'left' || props.position === 'right',
        'h-40 w-full': props.position === 'top' || props.position === 'bottom',
      }
    ),
  }),
  header: {
    className: classNames('flex items-center justify-end', 'p-5'),
  },
  closeButtonIcon: { className: classNames('w-4 h-4 inline-block') },
  content: {
    className: classNames('p-5 pt-0 h-full w-full', 'grow overflow-y-auto'),
  },
  mask: {
    className: classNames(
      'flex pointer-events-auto',
      'bg-black bg-opacity-40 transition duration-200 z-20 transition-colors'
    ),
  },
};
