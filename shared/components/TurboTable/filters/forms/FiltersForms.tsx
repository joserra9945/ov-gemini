import { FC } from 'react';

import { IFilter } from '../../interfaces/TurboTableType';

import { FiltersFormDatesRange } from './FiltersFormDatesRange';
import { FiltersFormInputText } from './FiltersFormInputText';
import { FiltersFormMultiSelect } from './FiltersFormMultiSelect';
import { FiltersFormNumbersRange } from './FiltersFormNumbersRange';
import { FiltersFormSelect } from './FiltersFormSelect';

interface Iprops {
  filter: IFilter;
}

export const FiltersForms: FC<Iprops> = ({ filter }) => {
  if (filter.type === 'text') {
    return <FiltersFormInputText filter={filter} />;
  }

  if (filter.type === 'select') {
    return <FiltersFormSelect filter={filter} />;
  }

  if (filter.type === 'multiSelect') {
    return <FiltersFormMultiSelect filter={filter} />;
  }

  if (filter.type === 'numberRange') {
    return <FiltersFormNumbersRange filter={filter} />;
  }
  if (filter.type === 'dateRange') {
    return <FiltersFormDatesRange filter={filter} />;
  }

  return null;
};
