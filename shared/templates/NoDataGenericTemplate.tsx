import { MouseEventHandler } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import genericImage from '@shared/assets/Puzzle.svg';
import { GenericButton } from '@shared/components/GenericButton';
import { ButtonType } from '@shared/components/GenericButton/GenericButton';

type NoDataGenericTemplateProps = {
  description?: string;
  textButton?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title?: string;
  icon?: IconProp;
  image?: string;
  buttonType?: ButtonType;
  disabled?: boolean;
};

const NoDataGenericTemplate = ({
  description = 'Ups! No hay datos',
  textButton = '',
  onClick,
  title = '',
  icon,
  buttonType,
  image = genericImage,
  disabled = false,
}: NoDataGenericTemplateProps) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center justify-center">
        {image && <img className="w-1/5" alt="genericImage" src={image} />}
        <div className="mb-4 text-4xl font-bold text-center t-4 text-primary">
          {title}
        </div>
        <div className="mb-4 overflow-auto whitespace-normal tablet:w-full mobile:w-full text-primary">
          {description}
        </div>
        {!!onClick && (
          <div>
            <GenericButton
              color="primary"
              buttonType={buttonType}
              icon={icon}
              onClick={onClick}
              label={textButton}
              tooltip={textButton}
              disabled={disabled}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoDataGenericTemplate;
