import Card from 'components/Hocs/Card';

import Afterbanks from '.';

const AfterbanksPage = () => {
  return (
    <Card className="card--add-padding card-table afterbanks-container !h-full">
      <div className="afterbanks !h-full">
        <h2 className="title-h2">Datos cuenta bancaria</h2>
        <Afterbanks />
      </div>
    </Card>
  );
};

export default AfterbanksPage;
