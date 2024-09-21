import { useEffect, useRef } from 'react';

interface ITokenReceiver {
  handleMessage: (e: MessageEvent) => void;
  originUrl: string;
  dataKey?: string;
}

const TokenReceiver = ({
  handleMessage,
  originUrl,
  dataKey,
}: ITokenReceiver): JSX.Element => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const postCrossDomainMessage = () => {
    const win = iframeRef?.current?.contentWindow;
    if (win) {
      win.postMessage(
        JSON.stringify({
          action: 'get',
          dataKey,
        }),
        originUrl
      );
    }
  };
  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);
  return (
    <iframe
      ref={iframeRef}
      style={{ display: 'none' }}
      src={originUrl}
      onLoad={postCrossDomainMessage}
      id="ifr"
      className="ifr"
      title="iFrame"
    />
  );
};

export default TokenReceiver;
