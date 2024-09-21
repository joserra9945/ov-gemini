import { faCheckCircle, faTimesCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tooltip } from '@shared/components/Tooltip';

type IconoBooleanoTemplateProps = {
  isTrue: boolean;
  tooltipContent?: string;
};

const IconoBooleanoTemplate = ({
  isTrue,
  tooltipContent,
}: IconoBooleanoTemplateProps) => {
  return (
    <Tooltip content={tooltipContent ?? ''}>
      <div className="verificada flex content-center items-center justify-center">
        <FontAwesomeIcon
          icon={isTrue ? faCheckCircle : faTimesCircle}
          color={isTrue ? '#30D59B' : '#E40139'}
        />
      </div>
    </Tooltip>
  );
};

export default IconoBooleanoTemplate;
