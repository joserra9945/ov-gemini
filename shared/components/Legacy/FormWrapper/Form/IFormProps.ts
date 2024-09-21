export interface IFormProps {
  className?: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  ref?: React.LegacyRef<HTMLFormElement>;
}
