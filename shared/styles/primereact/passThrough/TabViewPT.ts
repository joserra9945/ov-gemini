import {
  TabPanelPassThroughMethodOptions,
  TabPanelPassThroughOptions,
  TabViewPassThroughOptions,
} from 'primereact/tabview';
import classNames from 'classnames';

const TabViewPassThrough: TabViewPassThroughOptions = {
  root: {
    className: classNames('flex flex-col w-full h-full'),
  },

  navContainer: {
    className: classNames(
      'shrink px-6 pt-4 bg-white h-16 overflow-scroll overflow-y-hidden'
    ),
  },
  panelContainer: {
    className: classNames('grow px-6 py-5 bg-backgroundPanel'),
  },
  nav: () => ({
    className: classNames('flex flex-row gap-16 items-center pl-2'),
  }),
};

const TabPanelPassThrough: TabPanelPassThroughOptions = {
  headerAction: () => ({
    className: classNames('hover:no-underline'),
  }),
  content: ({ props }: TabPanelPassThroughMethodOptions) => ({
    className: classNames('h-full', { hidden: props.disabled }),
  }),
  headerTitle: ({
    props,
    context,
    parent,
  }: TabPanelPassThroughMethodOptions) => ({
    className: classNames(
      'font-roboto text-primary font-normal text-lg leading-normal hover:cursor-pointer whitespace-nowrap',
      {
        'text-primary border-b-4 border-primary font-semibold text-xl pb-3':
          parent && context && parent?.state?.activeIndex === context?.index,
      },
      {
        'text-zinc-300 hover:cursor-not-allowed': props.disabled,
      }
    ),
  }),
};

export { TabPanelPassThrough, TabViewPassThrough };
