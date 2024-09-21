import { IFormProps } from './IFormProps';

const Form = ({
  className = '',
  children,
  onSubmit,
  ref,
}: IFormProps): JSX.Element => {
  return (
    <form
      className={`g-form${className && ` ${className}`}`}
      onSubmit={onSubmit}
      ref={ref}
    >
      {children}
    </form>
  );
};

export default Form;
