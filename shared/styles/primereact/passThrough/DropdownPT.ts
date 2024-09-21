import {
  DropdownPassThroughMethodOptions,
  DropdownPassThroughOptions,
} from 'primereact/dropdown';
import { TooltipPassThroughMethodOptions } from 'primereact/tooltip';
import classNames from 'classnames';

export const TRANSITIONS = {
  overlay: {
    timeout: 150,
    classNames: {
      enter: 'opacity-0 scale-75',
      enterActive:
        'opacity-100 !scale-100 transition-transform transition-opacity duration-150 ease-in',
      exit: 'opacity-100',
      exitActive: '!opacity-0 transition-opacity duration-150 ease-linear',
    },
  },
};

const DropdownPassThrough: DropdownPassThroughOptions = {
  root: ({ props, state }: DropdownPassThroughMethodOptions) => ({
    className: classNames(
      'h-10 w-full cursor-pointer inline-flex relative select-none',
      'bg-white border transition-colors duration-200 ease-in-out rounded-md',
      {
        'border-gray-300 hover:border-[#2196f3]':
          !props.invalid && !state.focused && !props.disabled,
        'border-danger rounded': props.invalid,
        'border-[#2196f3] shadow-[0_0_0_0.2rem_rgba(166,213,250)]':
          state.focused,
        'border-gray-300 opacity-60 select-none pointer-events-none cursor-default':
          props.disabled,
      }
    ),
  }),
  tooltip: {
    root: ({ context }: TooltipPassThroughMethodOptions) => {
      return {
        className: classNames('z-10 absolute shadow-md', {
          'py-0 px-1':
            context.right ||
            context.left ||
            (!context.right &&
              !context.left &&
              !context.top &&
              !context.bottom),
          'py-1 px-0': context.top || context.bottom,
        }),
      };
    },
    arrow: ({ context }: TooltipPassThroughMethodOptions) => ({
      className: classNames(
        'absolute w-0 h-0 border-transparent border-solid',
        {
          '-mt-1 border-y-[0.25rem] border-r-[0.25rem] border-l-0 border-r-gray-600':
            context.right,
          '-mt-1 border-y-[0.25rem] border-l-[0.25rem] border-r-0 border-l-gray-600':
            context.left,
          '-ml-1 border-x-[0.25rem] border-t-[0.25rem] border-b-0 border-t-gray-600':
            context.top,
          '-ml-1 border-x-[0.25rem] border-b-[0.25rem] border-t-0 border-b-gray-600':
            context.bottom,
        }
      ),
    }),
    text: {
      className:
        'p-3 bg-gray-600 text-white rounded-md whitespace-pre-line break-words',
    },
  },
  input: ({ props }: DropdownPassThroughMethodOptions) => ({
    className: classNames(
      'cursor-pointer block flex flex-auto overflow-hidden overflow-ellipsis whitespace-nowrap relative',
      'bg-transparent border-0 font-sans items-center',
      'dark:text-white/80',
      'p-3 transition duration-200 bg-transparent rounded appearance-none font-sans text-base',
      'focus:outline-none focus:shadow-none',
      { 'text-gray-600': props.value, 'text-gray-400': !props.value },
      { 'pr-7': props.showClear }
    ),
  }),
  trigger: {
    className: classNames(
      'flex items-center justify-center shrink-0',
      'bg-transparent text-gray-500 w-12 rounded-tr-lg rounded-br-lg'
    ),
  },
  wrapper: {
    className: classNames(
      'max-h-[200px] overflow-auto',
      'bg-white text-gray-700 border-0 rounded-md shadow-lg',
      'dark:bg-gray-900 dark:text-white/80'
    ),
  },
  list: { className: 'py-3 list-none m-0' },
  item: ({ context }: DropdownPassThroughMethodOptions) => ({
    className: classNames(
      'cursor-pointer font-normal overflow-hidden relative whitespace-nowrap',
      'm-0 p-3 border-0  transition-shadow duration-200 rounded-none',
      'dark:text-white/80 dark:hover:bg-gray-800',
      'hover:text-gray-700 hover:bg-gray-200',
      {
        'text-gray-700': !context.focused && !context.selected,
        'bg-gray-300 text-gray-700 dark:text-white/80 dark:bg-gray-800/90':
          context.focused && !context.selected,
        'bg-blue-400 text-blue-700 dark:bg-blue-400 dark:text-white/80':
          context.focused && context.selected,
        'bg-blue-50 text-blue-700 dark:bg-blue-300 dark:text-white/80':
          !context.focused && context.selected,
        'opacity-60 select-none pointer-events-none cursor-default':
          context.disabled,
      }
    ),
  }),
  itemGroup: {
    className: classNames(
      'm-0 p-3 text-gray-800 bg-white font-bold',
      'dark:bg-gray-900 dark:text-white/80',
      'cursor-auto'
    ),
  },
  header: {
    className: classNames(
      'p-3 border-b border-gray-300 text-gray-700 bg-gray-100 mt-0 rounded-tl-lg rounded-tr-lg',
      'dark:bg-gray-800 dark:text-white/80 dark:border-blue-900/40'
    ),
  },
  filterContainer: { className: 'relative' },
  filterInput: {
    className: classNames(
      'pr-7 -mr-7',
      'w-full',
      'font-sans text-base text-gray-700 bg-white py-3 px-3 border border-gray-300 transition duration-200 rounded-lg appearance-none',
      'dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300 dark:text-white/80',
      'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]'
    ),
  },
  filterIcon: { className: '-mt-2 absolute top-1/2' },
  clearIcon: { className: 'text-gray-500 right-12 -mt-2 absolute top-1/2' },
};

export default DropdownPassThrough;
