import { GenericButton } from '@shared/components/GenericButton';

interface ButtonMultiStepProps {
  handleClickNext: () => void;
  handleClickPrev?: () => void;
  labelNext?: string;
  labelPrev?: string;
  isLoading?: boolean;
}

const ButtonMultiStep = ({
  handleClickNext,
  handleClickPrev,
  labelNext = 'Siguiente',
  labelPrev = 'Volver',
  isLoading,
}: ButtonMultiStepProps) => {
  return (
    <div className="flex justify-end gap-2 mt-4 mobile:flex-col-reverse mobile:justify-center mobile:w-full mobile:pb-2">
      {handleClickPrev && (
        <GenericButton
          wrapperClassName="mobile:w-full"
          className="mobile:w-full mobile:justify-center py-2 px-4 rounded-md flex items-center"
          label={labelPrev}
          onClick={handleClickPrev}
          buttonType="none"
          color="blank"
        />
      )}

      <GenericButton
        wrapperClassName="mobile:w-full"
        className="mobile:w-full mobile:justify-center"
        label={labelNext}
        onClick={handleClickNext}
        buttonType="primary"
        loading={isLoading}
      />
    </div>
  );
};

export default ButtonMultiStep;
