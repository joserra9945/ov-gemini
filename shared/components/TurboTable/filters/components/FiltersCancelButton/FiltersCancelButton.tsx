import { FC, SyntheticEvent } from 'react';

import { GenericButton } from '@shared/components/GenericButton';

interface Iprops {
  onCancel: (e: SyntheticEvent<Element, Event>) => void;
}

export const FiltersCancelButton: FC<Iprops> = ({ onCancel }) => {
  return (
    <GenericButton
      buttonType="none"
      wrapperClassName="flex justify-center"
      onClick={onCancel}
    >
      Cancelar
    </GenericButton>
  );
};
