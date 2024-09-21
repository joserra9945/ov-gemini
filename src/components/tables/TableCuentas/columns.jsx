/* eslint-disable @typescript-eslint/no-shadow */
import { InputSwitch } from 'primereact/inputswitch';
import { Tooltip } from 'primereact/tooltip';
import { nanoid } from 'nanoid';

import { FechaTemplate, StringTemplate } from '@shared/templates';
import { formatIban } from '@shared/utils/utilsOv';

import InfoIconToOverlay from 'components/InfoIconToOverlay';

import ActionsTemplate from './Templates/ActionsColumn';

const id = nanoid();

export const columns = (handleShowDialog) => {
  return [
    {
      id: nanoid(),
      header: 'IBAN',
      field: 'iban',
      body: ({ iban, activa, id }) => (
        <div>
          <div className="column-iban flex items-center">
            <Tooltip target={`.iban-${id}`} mouseTrack mouseTrackLeft={10} />
            <div
              className={`iban-${id}`}
              data-pr-tooltip={formatIban(iban?.completo)}
            >
              <InputSwitch
                className="mr-1 "
                checked={activa}
                onChange={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleShowDialog(id);
                }}
              />
            </div>
            <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
              <StringTemplate text={formatIban(iban?.completo)} />
            </div>
          </div>
        </div>
      ),
    },

    {
      id: nanoid(),
      header: 'Banco',
      field: 'entidadBancaria',
      className: 'basis-2',
      body: ({ entidadBancaria }) =>
        entidadBancaria && <StringTemplate text={entidadBancaria?.nombre} />,
    },

    {
      id: nanoid(),
      header: 'Fecha verificación',
      field: 'fechaUltimoEstado',
      className: 'basis-0.5',
      body: ({ fechaUltimoEstado }) => (
        <div className="text-left">
          <FechaTemplate fecha={fechaUltimoEstado} />
        </div>
      ),
    },
    {
      key: nanoid(),
      header: 'Estado',
      field: 'estado',
      className: 'basis-0.5',
      body: ({ estado }) => (
        <div className="flex justify-start text-left">
          <div
            className={`cuenta-verificada-${id} cuenta-verificada-${estado.id}`}
          >
            <StringTemplate text={estado?.description} />
          </div>
        </div>
      ),
    },
    {
      id: nanoid(),
      header: 'Motivo',
      className: 'basis-1/15',
      body: ({ motivoErrorVerificacion }) => (
        <div className="text-left">
          <div
            className={`cuenta-motivo-${id}`}
            data-pr-tooltip={motivoErrorVerificacion}
          >
            <StringTemplate text={motivoErrorVerificacion || '-'} />
          </div>
        </div>
      ),
    },
    {
      id: nanoid(),
      className: 'basis-2',
      header: '',
      body: ActionsTemplate,
      align: 'right',
    },
  ];
};
