import { IColumn } from '@shared/components/TurboTable/interfaces/TurboTableType';
import { IGarantiaByDirectLendingIdGet } from '@shared/interfaces/IGarantia';
import {
  EstadoCesionFirmaTemplate,
  EstadoDirectLending,
  StringTemplate,
} from '@shared/templates';

const MobileAndTabletTemplate = ({ cesion }: IGarantiaByDirectLendingIdGet) => {
  return (
    <div className="w-full">
      <div className="flex justify-between px-4 py-4 border-t">
        <div className="mb-2 whitespace-nowrap">Razón social</div>
        <div className="text-base font-semibold overflow-hidden text-right">
          <StringTemplate
            text={cesion.librado.razonSocial}
            wrapperClassname="text-ellipsis"
          />
        </div>
      </div>
      <div className="px-4 py-2">
        <div className="flex justify-between mb-2">
          <div className="mb-2">Estado</div>
          <div className="mb-2 font-semibold">
            <EstadoDirectLending
              id={cesion.estadoFirma.id}
              description={cesion.estadoFirma.description}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const columns: IColumn[] = [
  {
    name: '',
    body: (rowData: IGarantiaByDirectLendingIdGet) => (
      <MobileAndTabletTemplate {...rowData} />
    ),
    devices: ['mobile', 'tablet'],
    className: 'force-col-p-0 force-hide-header',
  },
  {
    header: 'Razón social',
    body: ({ cesion }: IGarantiaByDirectLendingIdGet) => (
      <StringTemplate
        text={cesion.librado.razonSocial}
        wrapperClassname="text-ellipsis"
      />
    ),
    align: 'left',
    name: 'razonSocial',
    devices: ['desktop'],
  },
  {
    name: 'estadoFirma',
    header: 'Estado',
    body: ({ cesion }: IGarantiaByDirectLendingIdGet) => (
      <EstadoCesionFirmaTemplate estado={cesion.estadoFirma} />
    ),
    align: 'left',
    devices: ['desktop'],
  },
];
