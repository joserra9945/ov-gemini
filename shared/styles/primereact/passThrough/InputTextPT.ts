import {
  InputTextPassThroughMethodOptions,
  InputTextPassThroughOptions,
} from 'primereact/inputtext';
import classNames from 'classnames';

const InputTextPassThrough: InputTextPassThroughOptions = {
  root: ({ props, context }: InputTextPassThroughMethodOptions) => ({
    autoComplete: 'off',
    className: classNames(
      'h-10 m-0 w-full',
      'font-sans text-gray-600 bg-white border transition-colors duration-200 appearance-none rounded-lg focus:shadow-[0_0_0_0.2rem_rgba(166,213,250)] focus:outline-0',
      {
        'border-gray-300 hover:border-[#2196f3]':
          !props.invalid && !context.disabled,
        'border-gray-300 opacity-60 select-none pointer-events-none cursor-default':
          context.disabled,
        'border-danger border-[1px] rounded':
          props.invalid && !context.disabled,
      },
      {
        'text-lg px-4 py-4': props.size === 'large',
        'text-xs px-2 py-2': props.size === 'small',
        'p-3 text-base': props.size == null,
      }
    ),
  }),
};

export default InputTextPassThrough;
