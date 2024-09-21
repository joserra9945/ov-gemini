export interface ISelection {
  originalEvent: Event;
}

export interface IIndexed<TValue> {
  [key: string]: TValue;
}
