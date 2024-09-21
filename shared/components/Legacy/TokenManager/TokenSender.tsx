import { useEffect, useRef } from 'react';

interface ITokenSender {
  message: string;
  targetUrl: string;
}

const TokenSender = ({ message, targetUrl }: ITokenSender): JSX.Element => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
    input !== null && input.tagName === 'IFRAME';
  useEffect(() => {
    if (message && targetUrl) {
      const frame = iframeRef?.current;
      if (isIFrame(frame) && frame.contentWindow) {
        frame.contentWindow.postMessage(message, targetUrl);
      }
    }
  }, [message, targetUrl]);
  return (
    <iframe
      ref={iframeRef}
      style={{ display: 'none' }}
      src={targetUrl}
      id="ifr"
      className="ifr"
      title="iFrame"
    />
  );
};

export default TokenSender;
