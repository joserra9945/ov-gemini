import { format } from 'date-fns';

import {
  AvailableAndSelectedFiltersProps,
  AvailableAndSelectedFiltersResponseProps,
  DefaultFilterButtonPropsGetterProps,
  FilterButtonProps,
  getDefaultOperatorProps,
  mapTemporaryParamsValueOnChangeInputProps,
  mapTemporaryParamsValueOnChangeOperatorProps,
  queryParamsType,
} from '../../interfaces/TurboTableType';

export const initialQueryState = {
  maxResult: 10,
  skipCount: 0,
  sortingCriteria: null,
  params: {},
};

export const formatDate = (date: string) =>
  date ? format(new Date(date), 'dd/MM/yyyy') : null;

export const defaultFilterButtonPropsGetter = ({
  queryState,
  filter,
}: DefaultFilterButtonPropsGetterProps): FilterButtonProps => {
  const { label, name } = filter;
  const filterName = name || '';
  return {
    buttonType: queryState.params[filterName] ? 'primary' : 'secondary',
    label: `${label}${
      queryState.params[filterName] ? `: ${queryState.params[filterName]}` : ''
    }`,
  };
};

export const selectFilterButtonPropsGetter = ({
  queryState,
  filter,
}: DefaultFilterButtonPropsGetterProps): FilterButtonProps => {
  const { label, name, options } = filter;
  const filterName = name || '';
  const value = options?.find(
    (option) => option.value === queryState.params[filterName]
  )?.label;
  return {
    buttonType: queryState.params[filterName] ? 'primary' : 'secondary',
    label: `${label}${value ? `: ${value}` : ''}`,
  };
};

export const multiSelectFilterButtonPropsGetter = ({
  queryState,
  filter,
}: DefaultFilterButtonPropsGetterProps): FilterButtonProps => {
  const { label, name, options } = filter;
  const filterName = name || '';
  const values = ((queryState.params[filterName] || []) as any[]).map(
    (value) => options?.find((option) => option.value === value)?.label
  );
  const visibleValuesCount = 2;
  const visibleValues = values.slice(0, visibleValuesCount);
  const hiddenValuesCount =
    values.length > visibleValuesCount
      ? `+${values.length - visibleValuesCount}`
      : '';
  return {
    buttonType: queryState.params[filterName] ? 'primary' : 'secondary',
    label: `${label}${values ? `: ${visibleValues} ${hiddenValuesCount}` : ''}`,
  };
};

export const rangeFilterButtonPropsGetter = ({
  queryState,
  filter,
}: DefaultFilterButtonPropsGetterProps): FilterButtonProps => {
  const { label, start, end } = filter;
  const startValue = queryState.params[start?.name || ''];
  const endValue = queryState.params[end?.name || ''];
  const smallThanLabel = !startValue && endValue ? `: < ${endValue}` : '';
  const biggerThanLabel = startValue && !endValue ? `: > ${startValue}` : '';
  const equalLabel =
    startValue && endValue && startValue === endValue ? `: ${startValue}` : '';
  const rangeLabel =
    startValue && endValue && startValue !== endValue
      ? `: ${startValue} - ${endValue}`
      : '';
  return {
    buttonType: startValue || endValue ? 'primary' : 'secondary',
    label: `${label}${
      smallThanLabel || biggerThanLabel || equalLabel || rangeLabel || ''
    }`,
  };
};

export const switchFilterButtonPropsGetter = ({
  queryState,
  filter,
}: DefaultFilterButtonPropsGetterProps): FilterButtonProps => {
  const { label, name } = filter;
  const filterName = name || '';
  return {
    buttonType: queryState.params[filterName] ? 'primary' : 'secondary',
    label,
  };
};

export const dateFilterButtonPropsGetter = ({
  queryState,
  filter,
}: DefaultFilterButtonPropsGetterProps): FilterButtonProps => {
  const { label, start, end } = filter;
  const startValue = queryState.params[start?.name || ''] as string;
  const endValue = queryState.params[end?.name || ''] as string;
  const formatedStartValue = formatDate(startValue);
  const formatedEndValue = formatDate(endValue);
  return {
    buttonType: startValue || endValue ? 'primary' : 'secondary',
    label: `${label}${
      formatedStartValue && formatedEndValue
        ? `: ${formatedStartValue} - ${formatedEndValue}`
        : ''
    }`,
  };
};

export const mapAvailableAndSelectedFilters = ({
  accumaltor,
  filter,
  retrieveQueryState,
  defaultQueryState,
}: AvailableAndSelectedFiltersProps): AvailableAndSelectedFiltersResponseProps => {
  const { name, start, end, fixed } = filter || {};
  const filtersKeys = Object.keys(retrieveQueryState(defaultQueryState).params);
  const defaultFilterKeys = Object.keys(defaultQueryState.params);
  const hasFilter = !!filter;
  const filterName = hasFilter ? start?.name || end?.name || name || '' : '';
  const isDefaultSelected =
    hasFilter && (fixed || defaultFilterKeys.includes(filterName));
  const isDefaultOption =
    hasFilter && !fixed && !defaultFilterKeys.includes(filterName);
  const isSelected = hasFilter && (fixed || filtersKeys.includes(filterName));
  const isOption = hasFilter && !fixed && !filtersKeys.includes(filterName);
  return {
    selecteds: [...accumaltor.selecteds, ...(isSelected ? [filter] : [])],
    options: [...accumaltor.options, ...(isOption ? [filter] : [])],
    defaultSelected: [
      ...accumaltor.defaultSelected,
      ...(isDefaultSelected ? [filter] : []),
    ],
    defaultOptions: [
      ...accumaltor.defaultOptions,
      ...(isDefaultOption ? [filter] : []),
    ],
  };
};

export const generateSearchParams = (paramsObject: queryParamsType) => {
  return Object.entries(paramsObject).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      const arrayParams = value.map((val) => `&${key}=${val}`).join('');
      return acc + arrayParams;
    }
    return value ? `${acc}&${key}=${value}` : acc;
  }, '');
};

export const inputNumberFilterOperators = [
  { label: '=', value: '=' },
  { label: '</>', value: '</>' },
  { label: '>', value: '>' },
  { label: '<', value: '<' },
];

export const mapTemporaryParamsValueOnChangeInput = ({
  key,
  value,
  startName,
  endName,
  operator,
}: mapTemporaryParamsValueOnChangeInputProps) => {
  switch (operator) {
    case '=':
      return {
        [startName]: value,
        [endName]: value,
      };
    case '>':
      return {
        [startName]: value,
        [endName]: '',
      };
    case '<':
      return {
        [startName]: '',
        [endName]: value,
      };
    default:
      return { [key]: value };
  }
};

export const mapTemporaryParamsValueOnChangeOperator = ({
  operator,
  startValue,
  startName,
  endName,
}: mapTemporaryParamsValueOnChangeOperatorProps) => {
  switch (operator) {
    case '=':
      return {
        [endName]: startValue,
      };
    case '>':
      return {
        [endName]: 0,
      };
    case '<':
      return {
        [startName]: 0,
      };
    default:
      break;
  }
};

export const getDefaultOperator = ({
  startValue,
  endValue,
}: getDefaultOperatorProps) => {
  if (!!startValue && !endValue) {
    return '>';
  }

  if (!startValue && !!endValue) {
    return '<';
  }

  if (startValue === endValue) {
    return '=';
  }

  return '</>';
};
