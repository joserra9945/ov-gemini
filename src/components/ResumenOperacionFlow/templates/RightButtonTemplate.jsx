import { Button } from '@shared/components/Legacy/Button';

const RightButtonTemplate = (disabled, func) => {
  return (
    <div className="resumen-footer-right">
      <Button
        id="generarContrato"
        name="generarContrato"
        className="generar-contrato-button"
        disabled={disabled}
        onClick={() => func()}
        icon={false}
        label="Generar contrato"
      />
    </div>
  );
};

RightButtonTemplate.propTypes = {};

export default RightButtonTemplate;
