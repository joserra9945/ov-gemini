import { createContext, useCallback, useMemo, useState } from 'react';

import { TokenSender } from '@shared/components/Legacy/TokenManager';

const globalTokenSenderValue = {
  message: '',
  setMessage: () => {},
  clearAccountsDomainStorage: () => {},
};

export const GlobalTokenSenderContext = createContext(globalTokenSenderValue);

export const GlobalTokenSender = ({ children }) => {
  const [message, setMessage] = useState('');

  const clearAccountsDomainStorage = useCallback(() => {
    setMessage(
      JSON.stringify({
        action: 'clear',
      })
    );
  }, [setMessage]);

  const value = useMemo(
    () => ({
      message,
      setMessage,
      clearAccountsDomainStorage,
    }),
    [message, setMessage, clearAccountsDomainStorage]
  );

  return (
    <GlobalTokenSenderContext.Provider value={value}>
      {children}
      <TokenSender
        message={message}
        targetUrl={process.env.REACT_APP_ACCOUNTS}
      />
    </GlobalTokenSenderContext.Provider>
  );
};
