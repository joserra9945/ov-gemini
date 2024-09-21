interface ISortingCriteria {
  sort: string;
  property: string;
}

export interface IQueryReducer {
  sortingCriteria?: ISortingCriteria | ISortingCriteria[] | null;
  maxResult?: number;
  skipCount?: number;
  params?: string;
}

export const queryType = {
  SORT: 'SORT',
  ENABLED: 'ENABLED',
  SKIP: 'SKIP',
  MAXRES: 'MAX-RES',
  PARAMS: 'PARAMS',
};
const getFieldRangeFilterValue = (
  value: string | number,
  fieldName: string,
  filterName: string
): string => {
  return value ? `&${fieldName}${filterName}=${value}` : '';
};

export const getQuery = (field: string, value: any, matchMode: string) => {
  if (matchMode === 'range') {
    return `${getFieldRangeFilterValue(
      value[0],
      field,
      'LowerLimit'
    )}${getFieldRangeFilterValue(value[1], field, 'UpperLimit')}`;
  }
  return Array.isArray(value)
    ? `&${field}=${value.join(`&${field}=`)}`
    : `&${field}=${value}`;
};

export interface IActionQuery {
  type: string;
  payload: IQueryReducer;
}

export const initialState = (maxResult = 10, params = ''): IQueryReducer => {
  return {
    maxResult,
    params,
  };
};

export const queryReducer = (
  state: IQueryReducer,
  action: IActionQuery
): IQueryReducer => {
  switch (action.type) {
    case queryType.SORT:
      return {
        ...state,
        sortingCriteria: action.payload.sortingCriteria,
      };
    case queryType.SKIP:
      return {
        ...state,
        skipCount: action.payload.skipCount,
      };
    case queryType.MAXRES:
      return {
        ...state,
        maxResult: action.payload.maxResult,
      };
    case queryType.PARAMS:
      return {
        ...state,
        params: action.payload.params,
      };
    default:
      return initialState();
  }
};
