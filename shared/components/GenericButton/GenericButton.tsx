import { FC, LegacyRef, MouseEventHandler, ReactNode } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import {
  Button as PrimeButton,
  ButtonPassThroughOptions,
} from 'primereact/button';
import { DataTableValueArray } from 'primereact/datatable';
import { PassThroughOptions } from 'primereact/passthrough';
import { TooltipOptions } from 'primereact/tooltip/tooltipoptions';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  CheckboxPassThrough,
  DataTablePassThrough,
  ListBoxPassThrough,
  OverlayPanelPassThrough,
  SelectButtonPassThrough,
  TooltipPassThrough,
} from '@shared/styles/primereact/passThrough';
import InputRadioSwithchPassThrough from '@shared/styles/primereact/passThrough/InputRadioPT';

export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'secondary-borderless'
  | 'tertiary'
  | 'quaternary'
  | 'quaternary-borderless'
  | 'none';

export interface ILibraryParams {
  className?: string;
  color?: string;
  disabled?: boolean;
  icon?: IconProp;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  tooltip?: string;
  tooltipOptions?: TooltipOptions;
  label?: string | ReactNode;
  buttonType?: ButtonType;
  maxWidth?: boolean;
  children?: ReactNode;
  buttonRef?: LegacyRef<PrimeButton>;
  rounded?: boolean;
  labelClassName?: string;
  pt?: ButtonPassThroughOptions;
  ptOptions?: PassThroughOptions;
}

export interface IProps extends ILibraryParams {
  wrapperClassName?: string;
  iconClassName?: string;
}

const GenericButton: FC<IProps> = ({
  wrapperClassName,
  className,
  buttonType,
  children,
  iconClassName,
  icon,
  label,
  buttonRef,
  rounded,
  labelClassName = '',
  tooltip,
  ...rest
}) => {
  const getDefaultType = () => {
    let generalStyles = `${
      rounded ? 'p-1 rounded-full' : 'py-2 px-4 rounded-md'
    } flex items-center gap-2 shadow shadow-gray-400 pointer${' '}`;
    const commonDisabledStyles = 'disabled:hover:cursor-no-drop';
    let disabledStyles = '';

    switch (buttonType) {
      case 'primary':
        disabledStyles = `disabled:bg-[#dddfe2] ${commonDisabledStyles}`;
        generalStyles += `text-white bg-primary hover:bg-primary-75 ${disabledStyles}`;
        break;
      case 'secondary':
        disabledStyles = `disabled:text-gray-300 disabled:border-gray-300 disabled:shadow-none  ${commonDisabledStyles}`;
        generalStyles += `text-primary bg-white border border-primary hover:shadow-none hover:bg-gray-100 ${disabledStyles}`;
        break;
      case 'secondary-borderless':
        disabledStyles = `disabled:text-gray-300 ${commonDisabledStyles}`;
        generalStyles += `text-primary bg-white shadow-none hover:text-primary-75 ${disabledStyles}`;
        break;
      case 'tertiary':
        disabledStyles = `disabled:bg-secondary-disabled ${commonDisabledStyles}`;
        generalStyles += `text-white bg-secondary hover:bg-secondary-over ${disabledStyles}`;
        break;
      case 'quaternary':
        disabledStyles = `disabled:text-secondary-disabled disabled:border-secondary-disabled ${commonDisabledStyles}`;
        generalStyles += `text-[#00D8AC] bg-white border border-secondary shadow-none hover:bg-secondary hover:text-white ${disabledStyles}`;
        break;
      case 'quaternary-borderless':
        disabledStyles = `disabled:text-secondary-disabled ${commonDisabledStyles}`;
        generalStyles += `text-[#00D8AC] bg-white shadow-none hover:text-secondary-over ${disabledStyles}`;
        break;
      case 'none':
        generalStyles = '';
        break;
      default:
        disabledStyles = `disabled:bg-[#dddfe2] ${commonDisabledStyles}`;
        generalStyles += `text-white bg-primary hover:bg-primary-75 ${disabledStyles}`;
    }

    return generalStyles;
  };

  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: {
          datatable: DataTablePassThrough<DataTableValueArray>(),
          overlaypanel: OverlayPanelPassThrough,
          listbox: ListBoxPassThrough,
          selectbutton: SelectButtonPassThrough,
          checkbox: CheckboxPassThrough,
          radiobutton: InputRadioSwithchPassThrough,
          tooltip: TooltipPassThrough,
        },
      }}
    >
      <div className={wrapperClassName}>
        <PrimeButton
          ref={buttonRef}
          className={`${getDefaultType()} ${className}`}
          rounded={rounded}
          {...rest}
        >
          {icon && (
            <div className="h-5 w-5">
              <FontAwesomeIcon icon={icon} className={iconClassName} />
            </div>
          )}
          {label && (
            <span className={`text-ellipsis overflow-hidden ${labelClassName}`}>
              {label}
            </span>
          )}
          {children}
        </PrimeButton>
      </div>
    </PrimeReactProvider>
  );
};

export default GenericButton;
