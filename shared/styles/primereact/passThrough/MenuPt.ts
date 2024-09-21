import { MenuPassThroughOptions } from 'primereact/menu';
import classNames from 'classnames';

export const MenuPassThrough: MenuPassThroughOptions = {
  root: {
    className: classNames(
      'bg-white text-gray-700 border-0 rounded-md shadow-lg',
      'z-40 transform origin-center mt-3',
      'before:absolute before:w-0 before:-top-3 before:h-0 before:border-transparent before:border-solid',
      'before:border-x-[0.75rem] before:border-b-[0.75rem] before:border-t-0 before:border-b-white'
    ),
  },
  menu: {
    className: classNames('py-1'),
  },
  submenuHeader: {
    className: classNames('py-2 px-4 text-sm font-semibold text-gray-700'),
  },
  menuitem: {
    className: classNames(
      'flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'
    ),
  },
  action: {
    className: classNames(
      'flex items-center w-full text-gray-700 no-underline gap-2'
    ),
  },
  icon: {
    className: classNames('mr-2'),
  },
  label: {
    className: classNames('flex-1'),
  },
  separator: {
    className: classNames('my-1 border-t border-gray-200'),
  },
};
