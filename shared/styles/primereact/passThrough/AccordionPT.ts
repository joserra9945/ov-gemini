import {
  AccordionPassThroughOptions,
  AccordionTabPassThroughMethodOptions,
  AccordionTabPassThroughOptions,
} from 'primereact/accordion';
import classNames from 'classnames';

export const AccordionPassThrough: AccordionPassThroughOptions = {
  root: { className: classNames('') },
};
export const AccordionTabPassThrough: AccordionTabPassThroughOptions = {
  header: ({ props }: AccordionTabPassThroughMethodOptions) => ({
    className: classNames({
      'select-none pointer-events-none cursor-default opacity-60':
        props?.disabled,
    }),
  }),
  headerAction: ({ context }: AccordionTabPassThroughMethodOptions) => ({
    className: classNames(
      'flex items-center cursor-pointer relative no-underline select-none',
      'px-2 transition duration-200 ease-in-out rounded-t-md font-semibold transition-shadow duration-200',
      'border border-gray-300 bg-white text-gray-600',
      'hover:no-underline focus:outline-none focus:outline-offset-0 focus:shadow-[inset_0_0_0_0.2rem_#bfdbfe]',
      {
        'rounded-br-md rounded-bl-md': !context.selected,
        'rounded-br-0 rounded-bl-0 text-gray-800': context.selected,
      }
    ),
  }),
  headerIcon: () => {
    return { className: classNames('inline-block mr-4') };
  },
  headerTitle: { className: classNames('leading-none') },
  content: {
    className: classNames(
      'border border-gray-300 bg-white text-gray-700 border-t-0 rounded-tl-none rounded-tr-none rounded-br-lg rounded-bl-lg'
    ),
  },
};
