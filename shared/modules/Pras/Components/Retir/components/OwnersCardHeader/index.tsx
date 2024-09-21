type RetirOwnersCardHeaderProps = {
  nombre: string;
  dni: string;
};

const RetirOwnersCardHeader = ({
  nombre,
  dni,
}: RetirOwnersCardHeaderProps): JSX.Element => {
  return (
    <div className="retir-owners-card-header flex horizontal-divider p-3">
      <img
        src="https://mkt-gestion.com/8000/aplicativos/PRAS/icono_persona.svg"
        alt="icono_persona.svg"
        className="mr-2"
      />
      <div className="my-auto">
        <div className="flex">{nombre}</div>
        <div className="flex">{dni}</div>
      </div>
    </div>
  );
};

export default RetirOwnersCardHeader;
