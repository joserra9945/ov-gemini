import { FC } from 'react';

import { TurboForm } from '@shared/forms';
import {
  IAction,
  IField,
  TurboFormRh,
} from '@shared/forms/Interfaces/Interfaces';

interface DatosFirmaFormProps {
  fields: IField[];
  actions: IAction[];
  onSubmit: () => void;
  showTitle?: boolean;
  rhForm: TurboFormRh;
}

const DatosFirmaForm: FC<DatosFirmaFormProps> = ({
  fields,
  actions,
  onSubmit,
  showTitle,
  rhForm,
}) => {
  return (
    <div className="flex flex-col w-full max-w-5xl gap-4 p-4 pb-2 bg-white rounded-lg shadow-md">
      {showTitle && (
        <h1 className="text-2xl font-medium leading-7 tracking-normal text-left font-roboto">
          Datos de la firma
        </h1>
      )}
      <TurboForm
        fields={fields}
        actions={actions}
        onSubmit={onSubmit}
        rhForm={rhForm}
        contentStyles="mb-3 grid grid-cols-8 gap-4"
        actionsStyles="flex flex-col md:flex-row-reverse gap-2"
      />
    </div>
  );
};

export default DatosFirmaForm;
