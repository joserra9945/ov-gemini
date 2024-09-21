import { FC } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { Chip } from 'primereact/chip';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ChipPassThrough } from '@shared/styles/primereact/passThrough';

interface IChipEmailTemplateProps {
  emails: string[];
  onDelete: (email: string) => void;
  icon?: IconProp;
}

const ChipEmailTemplate: FC<IChipEmailTemplateProps> = ({
  emails,
  onDelete,
  icon = faTimes,
}) => {
  return (
    <PrimeReactProvider
      value={{ unstyled: true, pt: { chip: ChipPassThrough } }}
    >
      <div className="flex gap-2">
        {emails.map((email) => (
          <div key={email} className="mb-1">
            <Chip
              label={email}
              removable
              removeIcon={
                <FontAwesomeIcon
                  icon={icon}
                  className="ml-1 mr-1 text-info cursor-pointer"
                  onClick={() => onDelete(email)}
                />
              }
            />
          </div>
        ))}
      </div>
    </PrimeReactProvider>
  );
};

export default ChipEmailTemplate;
