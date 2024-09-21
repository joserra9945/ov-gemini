import { FC } from 'react';
import { nanoid } from 'nanoid';

import { GenericButton } from '@shared/components/GenericButton';

import {
  TurboFormAutocomplete,
  TurboFormCalendar,
  TurboFormCheckbox,
  TurboFormDropdown,
  TurboFormInputMultiEmail,
  TurboFormInputPhone,
  TurboFormInputText,
  TurboFormNumber,
} from '../Fields';
import { IAction, IField, TurboFormRh } from '../Interfaces';

interface IProps {
  fields: IField[];
  actions: IAction[];
  rhForm: TurboFormRh;
  onSubmit: () => void;
  containerStyles?: string;
  contentStyles?: string;
  actionsStyles?: string;
}

const TurboForm: FC<IProps> = ({
  fields = [],
  actions = [],
  rhForm,
  onSubmit,
  containerStyles,
  contentStyles,
  actionsStyles,
}) => {
  return (
    <form onSubmit={onSubmit} className={containerStyles} autoComplete="off">
      <div className={contentStyles}>
        {fields.map((f: any) => {
          if (f.hidden) {
            return null;
          }
          if (f.type === 'text') {
            return (
              <TurboFormInputText
                control={rhForm?.control}
                key={f?.name}
                error={rhForm?.formState?.errors?.[f.name]?.message}
                {...f}
              />
            );
          }
          if (f.type === 'number') {
            return (
              <TurboFormNumber
                control={rhForm?.control}
                key={f?.name}
                error={rhForm?.formState?.errors?.[f.name]?.message}
                {...f}
              />
            );
          }

          if (f.type === 'checkbox') {
            return (
              <TurboFormCheckbox
                control={rhForm?.control}
                key={f?.name}
                error={rhForm?.formState?.errors?.[f.name]?.message}
                {...f}
              />
            );
          }

          if (f.type === 'select') {
            return (
              <TurboFormDropdown
                control={rhForm?.control}
                key={f?.name}
                error={rhForm?.formState?.errors?.[f.name]?.message}
                {...f}
              />
            );
          }

          if (f.type === 'calendar') {
            return (
              <TurboFormCalendar
                control={rhForm?.control}
                key={f?.name}
                error={rhForm?.formState?.errors?.[f.name]?.message}
                {...f}
              />
            );
          }

          if (f.type === 'phone') {
            return (
              <TurboFormInputPhone
                control={rhForm?.control}
                key={f?.name}
                error={rhForm?.formState?.errors?.[f.name]?.message}
                {...f}
              />
            );
          }

          if (f.type === 'autocomplete') {
            return (
              <TurboFormAutocomplete
                control={rhForm?.control}
                key={f?.name}
                error={rhForm?.formState?.errors?.[f.name]?.message}
                {...f}
              />
            );
          }

          if (f.type === 'multiemail') {
            return (
              <TurboFormInputMultiEmail
                control={rhForm?.control}
                key={f?.name}
                error={rhForm?.formState?.errors?.[f.name]?.message}
                {...f}
              />
            );
          }

          return null;
        })}
      </div>
      <div className={actionsStyles}>
        {actions.map((action: IAction) => {
          const { hidden, ...rest } = action;
          return hidden ? null : <GenericButton key={nanoid()} {...rest} />;
        })}
      </div>
    </form>
  );
};

export default TurboForm;
