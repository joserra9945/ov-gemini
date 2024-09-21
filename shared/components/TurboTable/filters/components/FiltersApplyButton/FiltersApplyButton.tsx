import { FC, SyntheticEvent } from 'react';

import { GenericButton } from '@shared/components/GenericButton';

interface IProps {
  onApply: (e: SyntheticEvent<Element, Event>) => void;
}

export const FiltersApplyButton: FC<IProps> = ({ onApply }) => {
  return (
    <GenericButton className="w-full flex justify-center" onClick={onApply}>
      Aplicar
    </GenericButton>
  );
};
