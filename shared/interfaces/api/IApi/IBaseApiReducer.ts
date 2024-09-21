export interface IBaseApiReducer<E = boolean> {
  fetching: boolean;
  error?: E;
}
