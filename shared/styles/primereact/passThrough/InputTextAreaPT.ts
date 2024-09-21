import {
  InputTextareaPassThroughMethodOptions,
  InputTextareaPassThroughOptions,
} from 'primereact/inputtextarea';
import classNames from 'classnames';

const InputTextAreaPassThrough: InputTextareaPassThroughOptions = {
  root: ({ context }: InputTextareaPassThroughMethodOptions) => ({
    className: classNames(
      'm-0',
      'font-sans text-base text-gray-600 dark:text-white/80 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg',
      'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
      {
        'opacity-60 select-none pointer-events-none cursor-default':
          context.disabled,
      }
    ),
  }),
};

export default InputTextAreaPassThrough;
