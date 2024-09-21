import { ProgressSpinner } from 'primereact/progressspinner';

type SpinnerProps = {
  size?: number;
  className?: string;
};
const Spinner = ({ size = 30, className }: SpinnerProps) => {
  const spinnerSize = `w-${size} h-${size}`;
  return (
    <ProgressSpinner
      className={`${className ?? `${spinnerSize} ${size / 10}`}`}
      strokeWidth="2"
      fill="transparent"
    />
  );
};

export default Spinner;
