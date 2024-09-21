import { nanoid } from 'nanoid';
import {
  faBell,
  faCalendarLinesPen,
  faCircleInfo,
  faFileCheck,
  faFileCircleCheck,
  faFileCircleXmark,
  faFilePen,
  faFileSignature,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { INotificacionGetByFilters } from '@shared/interfaces/api/INotificacion/INotificacionGetByFilters';

import { SelectButton } from '../Legacy/SelectButton';
import { Spinner } from '../Legacy/Spinner';
import { formatDateUTC } from '../Legacy/TurboFilters/helpers';

import {
  NOTIFICACIONES_MARCADAS,
  notificationTypes,
  optionEnum,
  options,
} from './constants';

type NotificacionesBodyProps = {
  notificaciones: INotificacionGetByFilters[];
  notificacionesVistas: number;
  setNotificacionesVistas: React.Dispatch<React.SetStateAction<number>>;
  leerTodasNotificaciones: () => Promise<void>;
};
export const NotificacionesBody = ({
  notificaciones,
  setNotificacionesVistas,
  notificacionesVistas,
  leerTodasNotificaciones,
}: NotificacionesBodyProps) => {
  const getColorTitle = (tipo: string) => {
    switch (tipo) {
      case notificationTypes.PAGADA:
        return 'text-success';
      case notificationTypes.INVALIDADA:
        return 'text-warning';
      case notificationTypes.ELIMINADA:
        return 'text-danger';
      default:
        return 'text-black';
    }
  };
  const renderIcon = (dataType: string) => {
    switch (dataType) {
      case notificationTypes.INVALIDADA:
        return (
          <FontAwesomeIcon
            size="2xl"
            icon={faCircleInfo}
            className="text-info text-2xl"
          />
        );
      case notificationTypes.ELIMINADA:
        return (
          <FontAwesomeIcon
            size="2xl"
            icon={faFileCircleXmark}
            className="text-info text-2xl"
          />
        );
      case notificationTypes.FIRMADA:
        return (
          <FontAwesomeIcon
            size="2xl"
            icon={faFilePen}
            className="text-info text-2xl"
          />
        );
      case notificationTypes.PAGADA:
        return (
          <FontAwesomeIcon
            size="2xl"
            icon={faFileCircleCheck}
            className="text-info text-2xl"
          />
        );
      case notificationTypes.FIRMADA_DIGITALMENTE:
        return (
          <FontAwesomeIcon
            size="2xl"
            icon={faFileSignature}
            className="text-info text-2xl"
          />
        );
      case notificationTypes.FIRMA_NOTARIOS:
        return (
          <FontAwesomeIcon
            size="2xl"
            icon={faCalendarLinesPen}
            className="text-info text-2xl"
          />
        );
      case notificationTypes.VALIDADA:
        return (
          <FontAwesomeIcon
            size="2xl"
            icon={faFileCheck}
            className="text-info text-2xl"
          />
        );
      default:
        return (
          <FontAwesomeIcon
            size="2xl"
            icon={faBell}
            className="text-info text-2xl"
          />
        );
    }
  };

  const parseMensaje = (
    mensaje: string
  ): { Title: string; Value: string }[] => {
    const objecto = JSON.parse(mensaje);
    return objecto.Items;
  };
  if (!notificaciones)
    return (
      <section className="p-4 border-b pt-2">
        <Spinner loading color="#0F1C40" size={80} />
      </section>
    );
  return (
    <>
      <section className="p-4 border-b pt-2">
        <div className="h-14 bg-neutral-10 flex flex-row rounded-md">
          <SelectButton
            value={notificacionesVistas}
            optionValue="value"
            optionLabel="name"
            options={options}
            onChange={(e) => {
              setNotificacionesVistas(e.value);
            }}
          />
        </div>
      </section>
      <section className="max-h-96 overflow-auto">
        {notificaciones.length > 0 &&
          notificaciones.map((notificacion: any) => {
            const mensajes = parseMensaje(notificacion.message);
            return (
              <div
                className="flex flex-row gap-4 border-b p-4  hover:bg-info-10"
                key={nanoid()}
              >
                <div className="h-10 w-10 flex justify-center rounded">
                  {renderIcon(notificacion.type)}
                </div>
                <div className="w-full">
                  <div className="flex flex-row justify-between mb-2">
                    <p
                      className={`text-sm bolder ${getColorTitle(
                        notificacion.type
                      )}`}
                    >
                      {`${notificacion.category} ${notificacion.type}`.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDateUTC(notificacion.creationTime)}
                    </p>
                  </div>
                  <div className="text-black mb-2">
                    {mensajes &&
                      mensajes.map((mensaje) => (
                        <p className="text-xs" key={nanoid()}>
                          <span className="font-semibold">
                            {`${mensaje?.Title} : ${mensaje?.Value}`}
                          </span>
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
      </section>
      {notificaciones?.length > 0 &&
        notificacionesVistas === optionEnum.NOT_READ && (
          <section>
            <p
              onClick={() => leerTodasNotificaciones()}
              className="text-end text-info p-4 font-medium border-t cursor-pointer hover:text-secondary"
            >
              {NOTIFICACIONES_MARCADAS}
            </p>
          </section>
        )}
    </>
  );
};
