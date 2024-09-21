import { InputTextarea } from 'primereact/inputtextarea';
import classNames from 'classnames';

import { ICustomInputTextArea } from './interface';

const CustomInputTextArea = ({
  value,
  onChange,
  className,
  name,
  isDisabled,
  error = false,
  autoResize = false,
  tooltip,
  tooltipOptions,
  rows = 5,
  cols = 20,
  onBlur,
  ...props
}: ICustomInputTextArea): JSX.Element => {
  const inputClass = classNames({
    'p-invalid p-mr-2': error,
  });
  return (
    <InputTextarea
      name={name}
      disabled={isDisabled}
      className={`${className} ${inputClass}`}
      onBlur={onBlur}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoResize={autoResize}
      tooltip={tooltip}
      tooltipOptions={tooltipOptions}
      rows={rows}
      cols={cols}
      {...props}
    />
  );
};

export default CustomInputTextArea;
