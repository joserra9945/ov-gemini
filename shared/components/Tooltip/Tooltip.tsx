import { Tooltip as TooltipReact } from 'primereact/tooltip';
import { nanoid } from 'nanoid';

import { TooltipProps } from './interfaces';

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  place = 'top',
  classNameTrigger,
}) => {
  const id = `TOOLTIP_${nanoid()}`;

  return (
    <>
      <TooltipReact target={`.${id}`} showDelay={100} position={place}>
        {content}
      </TooltipReact>
      <div className={`${id} ${classNameTrigger}`}>{children}</div>
    </>
  );
};

export default Tooltip;
