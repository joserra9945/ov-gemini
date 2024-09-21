import { Tooltip } from 'primereact/tooltip';
import { nanoid } from 'nanoid';

type ReferenciaProps = {
  referencia: string;
  urlSeguimiento: string;
};
const ReferenciaTemplate = ({
  referencia,
  urlSeguimiento,
}: ReferenciaProps): JSX.Element => {
  const id = nanoid();
  return (
    <>
      <span className="p-column-title hide-desktop">Referencia</span>
      <Tooltip target={`.Referencia-${id}`} mouseTrack mouseTrackLeft={10} />
      {referencia ? (
        <div
          className={`Referencia-${id}`}
          data-pr-tooltip="Haga click para localizar el envío en la página de Correos"
        >
          <a
            href={`${urlSeguimiento}`}
            className="text-info"
            target="_blank"
            rel="noreferrer"
          >
            {referencia}
          </a>
        </div>
      ) : (
        '-'
      )}
    </>
  );
};

export default ReferenciaTemplate;
