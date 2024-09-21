import { DataTableValue } from 'primereact/datatable';
import { format } from 'date-fns';

import { GenericCalendar } from '@shared/components/GenericCalendar';
import { useTurboTableContext } from '@shared/components/TurboTable/context';
import { IFilter } from '@shared/components/TurboTable/interfaces/TurboTableType';

interface IProps {
  filter: IFilter;
}

export const FiltersFormDatesRange = <D extends DataTableValue>({
  filter,
}: IProps) => {
  const { start, end } = filter;
  const { onChangeTemporaryParams, temporaryParams } =
    useTurboTableContext<D>();

  const getDateValue = (key: 'start' | 'end') =>
    (temporaryParams.params[(key === 'start' ? start : end)?.name || ''] ||
      null) as string;

  const convertedDate = (date?: string) => (date ? new Date(date) : null);

  const mapDatesToValue = () => {
    const startValue = getDateValue('start');
    const endValue = getDateValue('end');

    return startValue || endValue
      ? [convertedDate(startValue), convertedDate(endValue)]
      : null;
  };

  const mapOnChangeValue = (key: 'start' | 'end', value?: Date | null) => {
    const attribute = (key === 'start' ? start : end)?.name || '';
    const valueFormat = `yyyy-MM-dd'T'${
      key === 'start' ? '00:00:00' : '23:59:59'
    }`;
    return {
      [attribute]: value ? format(value, valueFormat) : null,
    };
  };

  return (
    <GenericCalendar
      value={mapDatesToValue()}
      wrapperClassName="px-4"
      showIcon
      locale="es"
      placeholder="dd/mm/aaaa - dd/mm/aaaa"
      hourFormat="24"
      onChange={({ value }) => {
        onChangeTemporaryParams({
          ...mapOnChangeValue('start', value?.[0]),
          ...mapOnChangeValue('end', value?.[1]),
        });
      }}
      selectionMode="range"
      hideOnRangeSelection
    />
  );
};
