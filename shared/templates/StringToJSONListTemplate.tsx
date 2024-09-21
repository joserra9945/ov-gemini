import dayjs from 'dayjs';
import { isNumber } from 'lodash';
import { nanoid } from 'nanoid';

import { Tooltip } from '@shared/components/Tooltip';
import { formatDateCalendar, formatNumber } from '@shared/utils/formatters';

import { IGenericJson, IStringToJSONListTemplate } from './interfaces';

const StringToJSONListTemplate = ({
  stringJSON,
}: IStringToJSONListTemplate) => {
  const formatValue = (valueJSON: string | IGenericJson[]) => {
    if (isNumber(valueJSON)) {
      return formatNumber(valueJSON);
    }
    if (dayjs(valueJSON as string).isValid()) {
      return formatDateCalendar(valueJSON);
    }

    return valueJSON as string;
  };

  const parsedObjectValor: { [key: string]: string | IGenericJson[] } =
    JSON.parse(stringJSON);

  return (
    <div>
      {Object.keys(parsedObjectValor).map((propertyKey: string) => (
        <div key={nanoid()}>
          {Array.isArray(parsedObjectValor[propertyKey]) ? (
            (parsedObjectValor[propertyKey] as []).map((item: IGenericJson) => (
              <div key={nanoid()}>
                {Object.entries(item).map(([key, value]) => (
                  <div key={key}>
                    <Tooltip content={`${key}: ${value}`}>
                      <span className="ellipsis">
                        {key}: {value}
                      </span>
                    </Tooltip>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <Tooltip
              content={`${propertyKey}: ${formatValue(
                parsedObjectValor[propertyKey]
              )}`}
            >
              <div className="ellipsis">{`${propertyKey}: ${formatValue(
                parsedObjectValor[propertyKey]
              )}`}</div>
            </Tooltip>
          )}
        </div>
      ))}
    </div>
  );
};

export default StringToJSONListTemplate;
