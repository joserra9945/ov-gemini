import { ChipPassThroughOptions } from 'primereact/chip';

export const ChipPassThrough: ChipPassThroughOptions = {
  root: {
    className:
      'flex items-center mr-2 mb-1 bg-info-10 rounded border border-info p-1.5',
  },
  image: {
    className: 'w-6 h-6 rounded-full opacity-60',
  },
  icon: {
    className: 'p-chip-icon pi pi-tag',
  },
  label: {
    className: 'ml-2 text-sm font-medium text-info',
  },
  removeIcon: {
    className: 'ml-1 text-info cursor-pointer',
  },
};
