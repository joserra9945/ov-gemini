import { FC } from 'react';
import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  icon?: IconDefinition;
  position?: 'left' | 'right';
}

const GenericInputTextInsideIcon: FC<IProps> = ({
  icon,
  position = 'right',
}) => {
  return icon ? (
    <div
      className={`absolute top-1/2 ${position === 'left' ? 'left-0.5' : ''} ${
        position === 'right' ? 'right-0.5' : ''
      } transform -translate-y-1/2 text-gray-400  flex items justify-center items-center bg-white h-8 rounded-lg`}
    >
      <FontAwesomeIcon icon={icon} className="mx-2" />
    </div>
  ) : null;
};

export default GenericInputTextInsideIcon;
