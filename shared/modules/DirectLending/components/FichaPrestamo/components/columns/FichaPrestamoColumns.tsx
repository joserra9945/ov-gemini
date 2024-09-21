import { faEye } from '@fortawesome/pro-light-svg-icons';

import { GenericButton } from '@shared/components/GenericButton';
import { IColumn } from '@shared/components/TurboTable/interfaces/TurboTableType';
import { TurboTableResponsiveTemplate } from '@shared/components/TurboTable/templates/ResponsiveTemplate';
import { IPagareByPrestamoIdGet } from '@shared/interfaces/api/IPagare';
import { IPrestamoIdAmortizacionesGet } from '@shared/interfaces/IPrestamo';
import {
  EstadoDirectLending,
  FechaHoraTemplate,
  ImporteFormateadoTemplate,
  StringTemplate,
} from '@shared/templates';

import {
  amortizacionTableResponsiveData,
  historialTableResponsiveData,
} from '../templates/fichaPrestamoTableResponsiveData';

export const fichaPrestamoColumns = (
  libradorRazonSocial: string,
  tienePagares: boolean,
  fetchPdf: (rowData: IPagareByPrestamoIdGet) => Promise<void>
): IColumn[] => {
  const columnsAmortizaciones: IColumn[] = [
    {
      name: '',
      body: (record: IPrestamoIdAmortizacionesGet) =>
        TurboTableResponsiveTemplate(
          amortizacionTableResponsiveData({
            amortizacion: record,
            libradorRazonSocial,
          }),
          record
        ),
      devices: ['mobile', 'tablet'],
      className: 'force-col-p-0 force-hide-header',
    },
    {
      header: 'Emisor',
      name: 'libradorRazonSocial',
      body: () => <StringTemplate text={libradorRazonSocial} />,
      align: 'left',
      devices: ['desktop'],
    },
    {
      header: 'Destinatario',
      name: 'empresainterna.razonSocial',
      body: ({ empresaInterna }: IPrestamoIdAmortizacionesGet) => (
        <StringTemplate text={empresaInterna.razonSocial} />
      ),
      align: 'left',
      devices: ['desktop'],
    },
    {
      header: 'Fecha de emisión',
      body: ({ fechaEmision }: IPrestamoIdAmortizacionesGet) => (
        <FechaHoraTemplate fechaHora={fechaEmision} />
      ),
      name: 'fechaEmision',
      align: 'left',
      devices: ['desktop'],
    },
    {
      header: 'Fecha de vencimiento',
      body: ({ fechaVencimiento }: IPrestamoIdAmortizacionesGet) => (
        <FechaHoraTemplate fechaHora={fechaVencimiento} />
      ),
      name: 'fechaVencimiento',
      align: 'left',
      devices: ['desktop'],
    },
    {
      header: 'Importe',
      body: ({ importeNominal }: IPrestamoIdAmortizacionesGet) => (
        <ImporteFormateadoTemplate importe={importeNominal} />
      ),
      name: 'importeNominal',
      align: 'left',
      devices: ['desktop'],
    },
  ];

  const columnsHistorialDePago: IColumn[] = [
    {
      name: '',
      body: (record: IPagareByPrestamoIdGet) =>
        TurboTableResponsiveTemplate(
          historialTableResponsiveData({
            historialPagos: record,
            fetchPdf,
          }),
          record
        ),
      devices: ['mobile', 'tablet'],
      className: 'force-col-p-0 force-hide-header',
    },
    {
      header: 'Nº del pagaré',
      name: 'numero',
      body: ({ numero }: IPagareByPrestamoIdGet) => (
        <StringTemplate className="text-info" text={numero} />
      ),
      align: 'left',
      devices: ['desktop'],
    },
    {
      header: 'Lugar emisión',
      name: 'lugarEmision',
      body: ({ lugarEmision }: IPagareByPrestamoIdGet) => (
        <StringTemplate text={lugarEmision} />
      ),
      align: 'left',
      devices: ['desktop'],
    },
    {
      header: 'Fecha de emisión',
      body: ({ fechaEmision }: IPagareByPrestamoIdGet) => (
        <FechaHoraTemplate fechaHora={fechaEmision} />
      ),
      name: 'fechaEmision',
      align: 'left',
      devices: ['desktop'],
    },
    {
      header: 'Fecha de vencimiento',
      body: ({ fechaVencimiento }: IPagareByPrestamoIdGet) => (
        <FechaHoraTemplate fechaHora={fechaVencimiento} />
      ),
      name: 'fechaVencimiento',
      align: 'left',
      devices: ['desktop'],
    },
    {
      header: 'Estado',
      body: ({ estadoRevision }: IPagareByPrestamoIdGet) => (
        <EstadoDirectLending
          id={estadoRevision.id}
          description={estadoRevision.description}
        />
      ),
      name: 'estadoRevision',
      align: 'left',
      devices: ['desktop'],
    },
    {
      header: 'Importe',
      body: ({ importeNominal }: IPagareByPrestamoIdGet) => (
        <ImporteFormateadoTemplate importe={importeNominal} />
      ),
      name: 'importeNominal',
      align: 'left',
      devices: ['desktop'],
    },
    {
      body: (rowData: IPagareByPrestamoIdGet) => {
        return (
          <GenericButton
            icon={faEye}
            buttonType="none"
            onClick={() => fetchPdf(rowData)}
          />
        );
      },
      align: 'left',
      devices: ['desktop'],
      name: '',
    },
  ];

  return tienePagares ? columnsHistorialDePago : columnsAmortizaciones;
};
