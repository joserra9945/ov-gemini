import { IFieldsetProps } from './IFieldsetProps';

const Fieldset = ({
  legend = '',
  className = null,
  description,
  children,
}: IFieldsetProps): JSX.Element => {
  return (
    <fieldset className={`g-fieldset${className && ` ${className}`}`}>
      <div className="header">
        <legend className="g-legend">{legend}</legend>
        {description && <div className="g-description">{description}</div>}
      </div>
      <div className="g-fields">{children}</div>
    </fieldset>
  );
};

export default Fieldset;
