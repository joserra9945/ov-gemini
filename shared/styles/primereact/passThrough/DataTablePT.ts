import { ColumnPassThroughMethodOptions } from 'primereact/column';
import {
  DataTablePassThroughMethodOptions,
  DataTablePassThroughOptions,
  DataTableValueArray,
} from 'primereact/datatable';
import classNames from 'classnames';

import { PaginatorPassThrough } from './PaginatorPT';

export const DataTablePassThrough = <
  D extends DataTableValueArray
>(): DataTablePassThroughOptions => ({
  root: ({ props }: DataTablePassThroughMethodOptions<D>) => ({
    className: classNames('relative', {
      'flex flex-col h-full': props.scrollable && props.scrollHeight === 'flex',
    }),
  }),
  loadingOverlay: {
    className: classNames(
      'fixed w-full h-full t-0 l-0 bg-gray-100/40',
      'transition duration-200',
      'absolute flex items-center justify-center z-2'
    ),
  },
  loadingIcon: {
    className: classNames('w-8 h-8'),
  },
  wrapper: ({ props }: DataTablePassThroughMethodOptions<D>) => ({
    className: classNames({
      relative: props.scrollable,
      'flex flex-col h-full': props.scrollable && props.scrollHeight === 'flex',
    }),
  }),
  header: ({ props }: DataTablePassThroughMethodOptions<D>) => ({
    className: classNames(
      'bg-white text-slate-700 border-none font-medium',
      props.showGridlines
        ? 'border-x border-t border-b-0'
        : 'border-y border-x-0'
    ),
  }),
  table: { className: classNames(`w-full border-spacing-0`) },
  thead: ({ context }: DataTablePassThroughMethodOptions<D>) => ({
    className: classNames({
      'bg-white top-0 z-[1] sticky top-0 z-10': context.scrollable,
    }),
  }),
  tbody: ({ props, context }: DataTablePassThroughMethodOptions<D>) => ({
    className: classNames({
      'sticky z-[1]': props.frozenRow && context.scrollable,
    }),
  }),
  tfoot: ({ context }: DataTablePassThroughMethodOptions<D>) => ({
    className: classNames({
      'bg-white bottom-0 z-[1]': context.scrollable,
    }),
  }),
  footer: {
    className: classNames(
      'bg-white text-slate-700 border-t-0 border-b border-x-0 border-gray-300 font-bold p-4'
    ),
  },
  footerCell: ({ props }: DataTablePassThroughMethodOptions<D>) => ({
    className: classNames(
      'text-left border-0 border-b border-solid border-gray-300 font-bold',
      'bg-white text-slate-700',
      'transition duration-200',
      props?.size === 'small' ? 'p-2' : props?.size === 'large' ? 'p-5' : 'p-4', // Size
      {
        'border-x border-y': props.showGridlines,
      }
    ),
  }),
  column: {
    headerCell: ({ props, context }: ColumnPassThroughMethodOptions) => {
      const hideHeader = props?.className?.includes?.('force-hide-header');

      return {
        className: classNames(
          'border-solid border-gray-300',
          'transition duration-200',
          hideHeader ? 'p-0' : 'p-4 border-b', // Size
          context.sorted
            ? 'bg-blue-50 text-blue-700'
            : 'bg-white text-gray-600', // Sort
          {
            'sticky z-[1]': props.frozen, // Frozen Columns
            'border-x border-y': context.showGridlines,
            'overflow-hidden space-nowrap border-y relative bg-clip-padding':
              context.resizable, // Resizable
          }
        ),
      };
    },
    headerContent: ({ props }: ColumnPassThroughMethodOptions) => ({
      className: classNames('flex flex-row', {
        'justify-center': props && props.alignHeader === 'center',
        'justify-start': props && props.alignHeader === 'left',
        'justify-end': props && props.alignHeader === 'right',
      }),
    }),
    bodyCell: ({ props }: ColumnPassThroughMethodOptions) => {
      const resetPadding = props?.className?.includes?.('force-col-p-0');

      return {
        className: classNames(
          {
            'p-0': resetPadding,
            'p-4': !resetPadding,
          },
          {
            'text-center': props && props.align === 'center',
            'text-left': props && props.align === 'left',
            'text-right': props && props.align === 'right',
          }
        ),
      };
    },
    // footerCell: ({ context }: DataTablePassThroughOptions) => ({
    //   className: classNames(
    //     'text-left border-0 border-b border-solid border-gray-300 font-bold',
    //     'bg-slate-50 text-slate-700',
    //     'transition duration-200',
    //     context?.size === 'small'
    //       ? 'p-2'
    //       : context?.size === 'large'
    //       ? 'p-5'
    //       : 'p-4', // Size
    //     'dark:text-white/80 dark:bg-gray-900 dark:border-blue-900/40', // Dark Mode
    //     {
    //       'border-x border-y': context.showGridlines,
    //     }
    //   ),
    // }),
    sortIcon: ({ context }: ColumnPassThroughMethodOptions) => ({
      className: classNames(
        'ml-2',
        context.sorted ? 'text-blue-700' : 'text-slate-700'
      ),
    }),
    sortBadge: {
      className: classNames(
        'flex items-center justify-center align-middle',
        'rounded-[50%] w-[1.143rem] leading-[1.143rem] ml-2',
        'text-blue-700 bg-blue-50'
      ),
    },
    columnFilter: {
      className: classNames('inline-flex items-center ml-auto'),
    },
    filterOverlay: {
      className: classNames(
        'bg-white text-gray-600 border-0 rounded-md min-w-[12.5rem]'
      ),
    },
    filterMatchModeDropdown: {
      root: { className: classNames('min-[0px]:flex mb-2') },
    },
    filterRowItems: { className: classNames('m-0 p-0 py-3 list-none ') },
    filterRowItem: ({ context }: ColumnPassThroughMethodOptions) => ({
      className: classNames(
        'm-0 py-3 px-5 bg-transparent',
        'transition duration-200',
        context?.highlighted
          ? 'text-blue-700 bg-blue-100'
          : 'text-gray-600 bg-transparent'
      ),
    }),
    filterOperator: {
      className: classNames(
        'px-5 py-3 border-b border-solid border-gray-300 text-slate-700 bg-white rounded-t-md'
      ),
    },
    filterOperatorDropdown: {
      root: { className: classNames('min-[0px]:flex') },
    },
    filterConstraint: {
      className: classNames('p-5 border-b border-solid border-gray-300'),
    },
    filterAddRule: { className: classNames('py-3 px-5') },
    //   filterAddRuleButton: {
    //   root: 'justify-center w-full min-[0px]:text-sm',
    //   label: 'flex-auto grow-0',
    //   icon: 'mr-2',
    // },
    filterRemoveButton: {
      root: { className: classNames('ml-2') },
      // label: 'grow-0',
    },
    filterButtonbar: {
      className: classNames('flex items-center justify-between p-5'),
    },
    filterClearButton: {
      root: {
        className: classNames(
          'w-auto min-[0px]:text-sm border-blue-500 text-blue-500 px-4 py-3'
        ),
      },
    },
    filterApplyButton: {
      root: { className: classNames('w-auto min-[0px]:text-sm px-4 py-3') },
    },
    filterMenuButton: ({ context }: ColumnPassThroughMethodOptions) => ({
      className: classNames(
        'inline-flex justify-center items-center cursor-pointer no-underline overflow-hidden relative ml-2',
        'w-8 h-8 rounded-[50%]',
        'transition duration-200',
        'hover:text-slate-700 hover:bg-gray-300/20', // Hover
        'focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]', // Focus
        {
          'bg-blue-50 text-blue-700': context.active,
        }
      ),
    }),
    headerFilterClearButton: ({ context }: ColumnPassThroughMethodOptions) => ({
      className: classNames(
        'inline-flex justify-center items-center cursor-pointer no-underline overflow-hidden relative',
        'text-left bg-transparent m-0 p-0 border-none select-none ml-2',
        {
          invisible: !context.hidden,
        }
      ),
    }),
    columnResizer: {
      className: classNames(
        'block absolute top-0 right-0 m-0 w-2 h-full p-0 cursor-col-resize border border-transparent'
      ),
    },
    // rowReorderIcon: { className: classNames('cursor-move') },
    rowEditorInitButton: {
      className: classNames(
        'inline-flex items-center justify-center overflow-hidden relative',
        'text-left cursor-pointer select-none',
        'w-8 h-8 border-0 rounded-[50%]',
        'transition duration-200',
        'text-slate-700 border-transparent',
        'focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]', // Focus
        'hover:text-slate-700 hover:bg-gray-300/20' // Hover
      ),
    },
    rowEditorSaveButton: {
      className: classNames(
        'inline-flex items-center justify-center overflow-hidden relative',
        'text-left cursor-pointer select-none',
        'w-8 h-8 border-0 rounded-[50%]',
        'transition duration-200',
        'text-slate-700 border-transparent',
        'focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]', // Focus
        'hover:text-slate-700 hover:bg-gray-300/20' // Hover
      ),
    },
    rowEditorCancelButton: {
      className: classNames(
        'inline-flex items-center justify-center overflow-hidden relative',
        'text-left cursor-pointer select-none',
        'w-8 h-8 border-0 rounded-[50%]',
        'transition duration-200',
        'text-slate-700 border-transparent',
        'focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]', // Focus
        'hover:text-slate-700 hover:bg-gray-300/20' // Hover
      ),
    },
    // radioButtonWrapper: {
    //   className: classNames(
    //     'relative inline-flex cursor-pointer select-none align-bottom',
    //     'w-6 h-6'
    //   ),
    // },
    // radioButton: ({ context }) => ({
    //   className: classNames(
    //     'flex justify-center items-center',
    //     'border-2 w-6 h-6 text-gray-700 rounded-full transition duration-200 ease-in-out',
    //     context.checked
    //       ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400'
    //       : 'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900',
    //     {
    //       'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]':
    //         !context.disabled,
    //       'cursor-default opacity-60': context.disabled,
    //     }
    //   ),
    // }),
    // radiobuttonicon: ({ context }) => ({
    //   className: classNames(
    //     'transform rounded-full',
    //     'block w-3 h-3 transition duration-200 bg-white dark:bg-gray-900',
    //     {
    //       'backface-hidden scale-10 invisible': context.checked === false,
    //       'transform scale-100 visible': context.checked === true,
    //     }
    //   ),
    // }),
    // headerCheckboxWrapper: {
    //   className: classNames(
    //     'cursor-pointer inline-flex relative select-none align-bottom',
    //     'w-6 h-6'
    //   ),
    // },
    headerCheckbox: ({ context }: ColumnPassThroughMethodOptions) => ({
      className: classNames(
        'flex items-center justify-center',
        ' w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200',
        context.checked
          ? 'border-primary bg-primary'
          : 'border-gray-300 bg-white',
        {
          'hover:border-primary focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]':
            !context.disabled,
          'cursor-default opacity-60': context.disabled,
        }
      ),
    }),
    // headerCheckboxIcon: {
    //   className: classNames(
    //     'w-4 h-4 transition-all duration-200 text-white text-base dark:text-gray-900'
    //   ),
    // },
    // checkboxwrapper: {
    //   className: classNames(
    //     'cursor-pointer inline-flex relative select-none align-bottom',
    //     'w-6 h-6'
    //   ),
    // },
    // checkbox: ({ context }: ColumnPassThroughMethodOptions) => ({
    //   className: classNames(
    //     'flex items-center justify-center',
    //     'border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200',
    //     context.checked
    //       ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400'
    //       : 'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900',
    //     {
    //       'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]':
    //         !context.disabled,
    //       'cursor-default opacity-60': context.disabled,
    //     }
    //   ),
    // }),
    // checkboxicon:
    //   'w-4 h-4 transition-all duration-200 text-white text-base dark:text-gray-900',
    // transition: TRANSITIONS.overlay,
    rowGroupToggler: {
      className: classNames(
        'text-left m-0 p-0 cursor-pointer select-none',
        'inline-flex items-center justify-center overflow-hidden relative',
        'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-[50%]',
        'transition duration-200'
      ),
    },
    rowGroupTogglerIcon: { className: classNames('inline-block w-4 h-4') },
  },

  bodyRow: ({
    context,
  }: {
    context: {
      index: number;
      selectable: boolean;
      selected: boolean;
      stripedRows: boolean;
    };
  }) => ({
    className: classNames(
      // context.selected
      //   ? 'bg-blue-50 text-blue-700 dark:bg-blue-300'
      //   : 'bg-white text-gray-600 dark:bg-gray-900',
      context.stripedRows
        ? context.index % 2 === 0
          ? 'bg-gray-50 text-gray-600'
          : 'bg-white text-gray-600'
        : ''
      // 'transition duration-200',
      // 'focus:outline focus:outline-[0.15rem] focus:outline-blue-200 focus:outline-offset-[-0.15rem]', // Focus
      // 'dark:text-white/80 dark:focus:outline dark:focus:outline-[0.15rem] dark:focus:outline-blue-300 dark:focus:outline-offset-[-0.15rem]', // Dark Mode
      // {
      //   'cursor-pointer': context.selectable,
      //   'hover:bg-gray-300/20 hover:text-gray-600':
      //     context.selectable && !context.selected, // Hover
      // }
    ),
  }),

  rowExpansion: {
    className: classNames('bg-white text-gray-600'),
  },
  rowGroupHeader: {
    className: classNames(
      'border border-danger ',
      'w-fit',
      'flex flex-row',
      'sticky z-[1] ',
      'bg-white text-gray-600',
      'transition duration-200'
    ),
  },
  rowgroupFooter: {
    className: classNames(
      'sticky z-[1]',
      'bg-white text-gray-600',
      'transition duration-200'
    ),
  },
  // rowGroupToggler: {
  //   className: classNames(
  //     'text-left m-0 p-0 cursor-pointer select-none',
  //     'inline-flex items-center justify-center overflow-hidden relative',
  //     'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-[50%]',
  //     'transition duration-200',
  //     'dark:text-white/70' // Dark Mode
  //   ),
  // },
  // rowgrouptogglericon: {className: classNames('inline-block w-4 h-4')},
  resizeHelper: {
    className: classNames('absolute hidden w-px z-10 bg-blue-500'),
  },
  paginator: PaginatorPassThrough,
});
