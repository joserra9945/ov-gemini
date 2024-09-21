import { faXmark } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  option: { label: string; value: number | string };
  onDelete?: (value: string) => void;
  showValue: boolean;
}

const ChipTemplate = ({ option, onDelete, showValue }: IProps) => {
  const handleOnDelete = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete(option.value.toString());
  };

  return option.label && option.value ? (
    <div className="px-2 rounded-md border-info bg-info-10 uppercase border text-info flex gap-2 items-center">
      {`${option.label} ${showValue ? `( ${option.value})` : ''}`}
      {onDelete && (
        <button type="button" onClick={handleOnDelete}>
          <FontAwesomeIcon
            className="w-5 h-5 flex items-center"
            icon={faXmark}
          />
        </button>
      )}
    </div>
  ) : null;
};

export default ChipTemplate;
