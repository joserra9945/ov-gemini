import {
  DialogPassThroughMethodOptions,
  DialogPassThroughOptions,
} from 'primereact/dialog';
import classNames from 'classnames';

const ModalPT: DialogPassThroughOptions = {
  root: ({ state }: DialogPassThroughMethodOptions) => ({
    className: classNames(
      'flex flex-col',
      'rounded-lg shadow-lg border-0',
      'max-h-[90%] transform scale-100',
      'm-0 w-[50vw]',
      {
        'transition-none transform-none !w-screen !h-screen !max-h-full !top-0 !left-0':
          state.maximized,
      }
    ),
  }),
  header: {
    className: classNames(
      'shrink',
      'flex items-center justify-between shrink-0',
      'bg-white text-gray-800 border-t-0  rounded-tl-lg rounded-tr-lg p-6'
    ),
  },
  headerTitle: {
    className: classNames('font-bold text-lg'),
  },
  headerIcons: {
    className: classNames('flex items-center'),
  },
  closeButton: {
    className: classNames(
      'flex items-center justify-center overflow-hidden relative',
      'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-full transition duration-200 ease-in-out mr-2 last:mr-0',
      'hover:text-gray-700 hover:border-transparent hover:bg-gray-200',
      'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]' // focus
    ),
  },
  closeButtonIcon: {
    className: classNames('w-4 h-4 inline-block'),
  },
  content: ({ state }: DialogPassThroughMethodOptions) => ({
    className: classNames(
      'grow',
      'overflow-y-auto',
      'bg-white text-gray-700 px-6 pb-8 pt-0',
      'rounded-bl-lg rounded-br-lg',
      {
        grow: state.maximized,
      }
    ),
  }),
  footer: {
    className: classNames(
      'shrink-0 ',
      'border-t-0 bg-white text-gray-700 px-6 pb-6 text-right rounded-b-lg'
    ),
  },
  mask: ({ state }: DialogPassThroughMethodOptions) => ({
    className: classNames('transition duration-200', {
      'bg-black/40': state.containerVisible,
    }),
  }),
};

export default ModalPT;
