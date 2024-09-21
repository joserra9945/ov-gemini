/* eslint-disable dot-notation */

import { useCallback, useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import usePras from '@shared/hooks/usePras';
import { IPrasICOByCifGet } from '@shared/interfaces/api/IPras';
import notifications from '@shared/utils/notifications';

import { Spinner } from '@shared/components/Legacy/Spinner';

import PrasContext from '../../Content/PrasContext';
import { formatCurrency, formatDateUTC } from '../../helpers/formatters';

interface Props {
  item: IPrasICOByCifGet;
}

const IcoInfo = ({ item }: Props) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

  const renderValue = (key: keyof IPrasICOByCifGet) => {
    if (!key) return '';
    switch (key) {
      case 'FechaConcesion':
        return formatDateUTC(item['FechaConcesion']);
      case 'ISC_Importe':
        return formatCurrency(item['ISC_Importe']);
      default:
        return item[key];
    }
  };

  const renderTitle = (key: keyof IPrasICOByCifGet) => {
    if (!key) return '';
    switch (key) {
      case 'FechaConcesion':
        return 'Fecha concesión';
      case 'ISC_Importe':
        return 'Importe';
      default:
        return key;
    }
  };

  return (
    <div className="ico-info__container">
      <div className="g-flex">
        {getKeys(item).map(
          (key) =>
            key !== 'ind' && (
              <div key={nanoid()} className="flex-item">
                <span className="title">{renderTitle(key)}:</span>
                <span className="value">{renderValue(key)}</span>
              </div>
            )
        )}
      </div>
    </div>
  );
};

const Ico = (): JSX.Element => {
  const { empresa } = useContext(PrasContext);
  const [loading, setLoading] = useState(false);
  const { prasICOByIdGet } = usePras();
  const [icoInfo, setIcoInfo] = useState<IPrasICOByCifGet[]>([]);

  const fetchIcoInfo = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const res = await prasICOByIdGet(id);
        if (res) {
          setIcoInfo(res);
        }
        setLoading(false);
      } catch (e) {
        notifications.unknownError(e);
        setLoading(false);
      }
    },
    [prasICOByIdGet]
  );

  useEffect(() => {
    empresa.cif && fetchIcoInfo(empresa.cif);
  }, [empresa?.cif, fetchIcoInfo]);

  return (
    <div className="ico__section">
      <div className="ico__content">
        {icoInfo && icoInfo?.length > 0
          ? icoInfo?.map((item: IPrasICOByCifGet) => {
              return <IcoInfo key={nanoid()} item={item} />;
            })
          : loading && <Spinner loading color="#0F1C40" />}
      </div>
    </div>
  );
};

export default Ico;
