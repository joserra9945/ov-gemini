import Moment from 'react-moment';

const FechaEmisionTemplate = ({ fechaEmision }) => {
  return (
    <>
      <span className="p-column-title">Emisión</span>
      <div className="date-moment">
        {fechaEmision ? (
          <Moment format="DD/MM/YYYY" utc>
            {fechaEmision}
          </Moment>
        ) : (
          '-'
        )}
      </div>
    </>
  );
};

export default FechaEmisionTemplate;
