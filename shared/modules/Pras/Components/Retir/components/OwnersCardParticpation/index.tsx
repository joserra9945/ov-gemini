type RetirOwnersCardParticipationProps = {
  participacionDirecta: number;
  participacionIndirecta: number;
};

const RetirOwnersCardParticipation = ({
  participacionDirecta,
  participacionIndirecta,
}: RetirOwnersCardParticipationProps): JSX.Element => {
  if (participacionDirecta || participacionIndirecta) {
    return (
      <div className="retir-owners-card-subHeader d-flex flex-row justify-content-center horizontal-divider">
        {participacionDirecta ? (
          <div
            className={`flex items-center px-3 ${
              participacionIndirecta
                ? 'flex-col vertical-divider py-3'
                : 'w-100 flex-row-reverse justify-between py-2'
            }`}
          >
            <div>{`${participacionDirecta}%`}</div>
            <div>
              Participación <span>directa</span>
            </div>
          </div>
        ) : null}
        {participacionIndirecta ? (
          <div
            className={`flex items-center px-3 ${
              participacionDirecta
                ? 'flex-col py-3'
                : 'w-100 flex-row-reverse justify-between py-2'
            }`}
          >
            <div>{`${participacionIndirecta}%`}</div>
            <div>
              Participación <span>indirecta</span>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
  return <div />;
};

export default RetirOwnersCardParticipation;
