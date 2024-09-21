import {
  SelectButtonPassThroughMethodOptions,
  SelectButtonPassThroughOptions,
} from 'primereact/selectbutton';
import classNames from 'classnames';

export const SelectButtonPassThrough: SelectButtonPassThroughOptions = {
  root: ({ props }: SelectButtonPassThroughMethodOptions) => ({
    className: classNames({
      'opacity-60 select-none pointer-events-none cursor-default':
        props.disabled,
    }),
  }),
  button: ({ context }: SelectButtonPassThroughMethodOptions) => ({
    className: classNames(
      'inline-flex cursor-pointer select-none items-center align-bottom text-center overflow-hidden relative',
      'px-4 py-2',
      'transition duration-200',
      {
        'bg-neutral-10 text-neutral-75': !context.selected,
        'bg-white border rounded-md text-primary shadow-black':
          context.selected,
        'opacity-60 select-none pointer-events-none cursor-default':
          context.disabled,
      }
    ),
  }),
  label: { className: 'font-semibold' },
};
