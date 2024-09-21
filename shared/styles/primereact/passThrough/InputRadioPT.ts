import {
  RadioButtonPassThroughMethodOptions,
  RadioButtonPassThroughOptions,
} from 'primereact/radiobutton';
import classNames from 'classnames';

const InputRadioSwithchPassThrough: RadioButtonPassThroughOptions = {
  root: {
    className: classNames(
      'relative inline-flex cursor-pointer select-none align-bottom'
    ),
  },
  input: ({ props }: RadioButtonPassThroughMethodOptions) => ({
    className: classNames(
      'flex justify-center items-center',
      'border-2 w-6 h-6 text-gray-700 rounded-full transition duration-200 ease-in-out cursor-pointer',
      {
        'border-gray-300 bg-white': !props.checked,
        'border-blue-500 bg-blue-500': props.checked,
      },
      {
        'hover:border-blue-500 dark:hover:border-blue-400': !props.disabled,
        'cursor-default opacity-60': props.disabled,
      }
    ),
  }),
  icon: ({ props }: RadioButtonPassThroughMethodOptions) => ({
    className: classNames(
      'transform rounded-full',
      'block w-3 h-3 transition duration-200 bg-white',
      {
        'backface-hidden scale-10 invisible': !props.checked,
        'transform scale-100 visible': props.checked,
      }
    ),
  }),
};

export default InputRadioSwithchPassThrough;
