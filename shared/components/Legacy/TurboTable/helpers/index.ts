/**
 * String of order for sorting params.
 * @param order
 * @returns {string}
 */
export const setStringSortOrder = (order?: number | null): string | null => {
  if (order === 1) {
    return 'ASC';
  }
  if (order === -1) {
    return 'DESC';
  }
  return null;
};

export const queryType = {
  SORT: 'SORT',
  SKIP: 'SKIP',
  MAXRES: 'MAX-RES',
  PARAMS: 'PARAMS',
};

export interface ISortingCriteria {
  sort: string;
  property: string;
}

export interface IQueryReducer {
  sortingCriteria?: ISortingCriteria | ISortingCriteria[] | null;
  maxResult?: number;
  skipCount?: number;
  params?: string;
}

export interface IActionQuery {
  type: string;
  payload: IQueryReducer;
}

export const initialState = (
  maxResult = 10,
  sortingCriteria: ISortingCriteria | ISortingCriteria[] | null = null,
  params = '',
  skipCount = 0
): IQueryReducer => {
  return {
    maxResult,
    sortingCriteria,
    params,
    skipCount,
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

export const toLocalFormat = (date: number): string => {
  const tzoffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
  return new Date(date - tzoffset).toISOString().slice(0, -1);
};

export const calendarES = {
  firstDayOfWeek: 1,
  dayNames: [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ],
  dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ],
  monthNamesShort: [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic',
  ],
  today: 'Hoy',
  clear: 'Limpiar',
};
