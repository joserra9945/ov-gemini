import { useState } from 'react';
import {
  faCheckCircle,
  faClose,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type AlertProps = {
  type?: 'warning' | 'danger' | 'info' | 'success';
  message: string;
};
const Alert = ({ type = 'success', message }: AlertProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return faExclamationTriangle;
      case 'danger':
        return faExclamationCircle;
      case 'info':
        return faInfoCircle;
      default:
        return faCheckCircle;
    }
  };

  if (isOpen)
    return (
      <div className="w-full p-3">
        <div className="flex justify-between">
          <div className="item ">
            <FontAwesomeIcon
              icon={getIcon()}
              size="2xl"
              className="bg-secondary text-white rounded-full"
            />
            {message}
          </div>
          <div className="cursor-pointer">
            <FontAwesomeIcon
              icon={faClose}
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    );
  return null;
};

export default Alert;
