import { useState } from 'react';
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type AccordionProps = {
  title?: string;
  initialState?: boolean;
  children: JSX.Element;
};
const Accordion = ({
  title,
  children,
  initialState = false,
}: AccordionProps) => {
  const [open, setOpen] = useState(initialState);

  return (
    <div className="px-4">
      <div className="flex flex-row justify-between items-center align-middle">
        <div className="font-roboto text-lg font-medium leading-6 tracking-normal text-left">
          {title}
        </div>
        <FontAwesomeIcon
          className="cursor-pointer"
          icon={open ? faChevronDown : faChevronRight}
          size="lg"
          onClick={(e) => {
            e.preventDefault();
            setOpen((prev) => !prev);
          }}
        />
      </div>
      <div className={`pt-4 ${!open ? 'hidden' : 'block'}`}>{children}</div>
    </div>
  );
};

export default Accordion;
