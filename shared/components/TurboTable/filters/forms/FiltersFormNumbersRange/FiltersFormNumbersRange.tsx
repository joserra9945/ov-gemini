import { useState } from 'react';
import { DataTableValue } from 'primereact/datatable';

import { GenericDropdown } from '@shared/components/GenericDropdown';
import { GenericInputNumber } from '@shared/components/GenericInputNumber';
import { useTurboTableContext } from '@shared/components/TurboTable/context';
import {
  IFilter,
  inputNumberFilterOperator,
} from '@shared/components/TurboTable/interfaces/TurboTableType';

import {
  getDefaultOperator,
  inputNumberFilterOperators,
  mapTemporaryParamsValueOnChangeInput,
  mapTemporaryParamsValueOnChangeOperator,
} from '../../utils/helpers';

interface Iprops {
  filter: IFilter;
}

export const FiltersFormNumbersRange = <D extends DataTableValue>({
  filter,
}: Iprops) => {
  const { start, end } = filter;
  const { onChangeTemporaryParams, temporaryParams, queryState } =
    useTurboTableContext<D>();
  const [operator, setOperator] = useState<'=' | '</>' | '>' | '<'>(
    getDefaultOperator({
      startValue: queryState.params[start?.name || ''] as number,
      endValue: queryState.params[end?.name || ''] as number,
    })
  );
  const showStartInput = operator !== '<';
  const showEndInput = !['>', '='].includes(operator);

  const onChangeInputHandler = (key: string, value: number) => {
    const params = mapTemporaryParamsValueOnChangeInput({
      key,
      value,
      startName: start?.name || '',
      endName: end?.name || '',
      operator,
    });
    onChangeTemporaryParams(params);
  };

  const onChangeOperatorHandler = (value: string | number) => {
    const params = mapTemporaryParamsValueOnChangeOperator({
      operator: value as inputNumberFilterOperator,
      startValue: temporaryParams.params[start?.name || ''] as number,
      startName: start?.name || '',
      endName: end?.name || '',
    });

    params && onChangeTemporaryParams(params);

    setOperator(value as '=' | '</>' | '>' | '<');
  };

  return (
    <div className="grid grid-cols-3 gap-2 px-4">
      <GenericDropdown
        value={operator}
        options={inputNumberFilterOperators}
        onChange={onChangeOperatorHandler}
        wrapperClassName="col-span-1"
      />
      <div className="flex flex-col col-span-2 gap-2">
        {showStartInput && (
          <GenericInputNumber
            value={(temporaryParams.params[start?.name || ''] || 0) as number}
            onChange={(value) => onChangeInputHandler(start?.name || '', value)}
          />
        )}
        {showEndInput && (
          <GenericInputNumber
            value={(temporaryParams.params[end?.name || ''] || 0) as string}
            onChange={(value) => onChangeInputHandler(end?.name || '', value)}
          />
        )}
      </div>
    </div>
  );
};
