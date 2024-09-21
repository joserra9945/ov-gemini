import { useEffect } from 'react';

interface ITokenManager {
  domains?: string[];
}

const defaultDataKey = 'tokens';

const TokenManager = ({ domains }: ITokenManager): JSX.Element => {
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (domains?.length && domains.indexOf(e.origin) === -1)
        return 'Not Allowed';
      let { data } = e;
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      const { dataKey } = data || {};
      if (data.action === 'set') {
        window.localStorage.setItem(
          dataKey || defaultDataKey,
          JSON.stringify(data)
        );
      } else if (data.action === 'get') {
        e?.source?.postMessage(
          {
            action: 'get',
            key: dataKey || defaultDataKey,
            value: JSON.parse(
              window.localStorage.getItem(dataKey || defaultDataKey) || ''
            ),
          },
          {
            targetOrigin: '*',
          }
        );
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [domains]);

  return (
    <div>
      <h2>Gefintech Accounts</h2>
    </div>
  );
};

export default TokenManager;
