import React from 'react';
import Moment from 'react-moment';

const FechaBodyTemplate = ({ fechaVencimiento }) => {
  return (
    <>
      <span className="p-column-title">Vencimiento</span>
      <div className="date-moment">
        {fechaVencimiento ? (
          <Moment format="DD/MM/YYYY" utc>
            {fechaVencimiento}
          </Moment>
        ) : (
          '-'
        )}
      </div>
    </>
  );
};

export default FechaBodyTemplate;
