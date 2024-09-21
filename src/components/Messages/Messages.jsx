import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './messages.scss';

const Messages = ({ icon, severity, message, className }) => {
  return (
    <div className={`g-messages g-messages--${severity} ${className}`}>
      <FontAwesomeIcon icon={icon} />
      <span className="g-messages__content">{message}</span>
    </div>
  );
};

export default Messages;
