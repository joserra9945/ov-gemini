export interface ITableWrapperProps<D> {
  data: Array<D>;
  isLoading?: boolean;
  children: JSX.Element;
  msg?: string;
}
