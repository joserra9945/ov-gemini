import {
  AutoCompletePassThroughMethodOptions,
  AutoCompletePassThroughOptions,
} from 'primereact/autocomplete';
import classNames from 'classnames';

const AutocompletePassThrough: AutoCompletePassThroughOptions = {
  root: ({ props }: AutoCompletePassThroughMethodOptions) => ({
    className: classNames('relative inline-flex w-full', {
      'opacity-60 select-none pointer-events-none cursor-default':
        props.disabled,
    }),
  }),
  container: ({ props, state }: AutoCompletePassThroughMethodOptions) => ({
    className: classNames(
      'relative m-0 list-none cursor-text overflow-hidden flex items-center flex-wrap w-full',
      'px-3 py-2 gap-2',
      'font-sans text-base text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 border dark:border-blue-900/40  transition duration-200 ease-in-out appearance-none rounded-md',
      {
        'border-gray-300 hover:border-[#2196f3]':
          !props.invalid && !state.focused,
        'border-danger rounded': props.invalid,
        'border-[#2196f3] shadow-[0_0_0_0.2rem_rgba(166,213,250)]':
          state.focused,
      }
    ),
  }),
  inputToken: {
    className: classNames('py-0.375rem px-0', 'flex-1 inline-flex'),
  },
  input: ({ props }: AutoCompletePassThroughMethodOptions) => ({
    className: classNames(
      'm-0',
      'transition-colors duration-200 appearance-none rounded-lg',
      { 'rounded-tr-none rounded-br-none': props.dropdown },
      {
        'font-sans text-base text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)] hover:border-blue-500 focus:outline-none':
          !props.multiple,
        'font-sans text-base text-gray-700 dark:text-white/80 border-0 outline-none bg-transparent m-0 p-0 shadow-none rounded-none w-full ':
          props.multiple,
      }
    ),
    root: {
      className: classNames(
        'm-0',
        'transition-colors duration-200 appearance-none rounded-lg',
        { 'rounded-tr-none rounded-br-none': props.dropdown },
        {
          'font-sans text-base text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)] hover:border-blue-500 focus:outline-none':
            !props.multiple,
          'font-sans text-base text-gray-700 dark:text-white/80 border-0 outline-none bg-transparent m-0 p-0 shadow-none rounded-none w-full ':
            props.multiple,
        }
      ),
    },
  }),
  token: {
    className: classNames(
      'py-1 px-2 mr-2 bg-info-10 text-info rounded border border-info',
      'cursor-default inline-flex items-center'
    ),
  },
  tokenLabel: {
    className: 'mr-1',
  },
  removeTokenIcon: {
    className: 'hover:text-danger cursor-pointer',
  },
  dropdownButton: {
    root: {
      className:
        'absolute right-0 bottom-0 top-0 m-0.5 rounded-tl-none rounded-bl-none flex justify-center items-center text-[#6c757d] hover:text-[#6c757d] w-[2.357rem]',
    },
  },
  panel: {
    className: classNames(
      'bg-white text-gray-700 border-0 rounded-md shadow-lg',
      'max-h-[200px] overflow-auto',
      'dark:bg-gray-900 dark:text-white/80'
    ),
  },
  list: {
    className: 'py-3 list-none m-0 bg-white',
  },
  item: ({ context }: AutoCompletePassThroughMethodOptions) => ({
    className: classNames(
      'cursor-pointer font-normal overflow-hidden relative whitespace-nowrap',
      'm-0 p-3 border-0  transition-shadow duration-200 rounded-none',
      {
        'text-gray-700 hover:text-gray-700 hover:bg-gray-200 dark:text-white/80 dark:hover:bg-gray-800':
          !context.selected,
        'bg-blue-100 text-blue-700 dark:bg-blue-400 dark:text-white/80':
          context.selected,
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
};

export default AutocompletePassThrough;
