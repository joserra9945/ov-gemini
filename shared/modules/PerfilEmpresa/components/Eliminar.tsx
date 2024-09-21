import { Button } from '@shared/components/Legacy/Button';

import './estilos.scss';

type EliminarProps = {
  setIsDeleteOpen: any;
  eliminarOpcion: any;
  mensaje: string;
};
export const Eliminar = ({
  setIsDeleteOpen,
  eliminarOpcion,
  mensaje,
}: EliminarProps) => {
  return (
    <div className="eliminar-container">
      <p>{mensaje}</p>
      <div className="eliminar-acciones">
        <Button
          label="Cancelar"
          className="cancelar-action"
          onClick={() => {
            setIsDeleteOpen(false);
          }}
        />
        <Button
          label="Eliminar"
          color="danger"
          onClick={() => {
            eliminarOpcion();
            setIsDeleteOpen(false);
          }}
        />
      </div>
    </div>
  );
};
