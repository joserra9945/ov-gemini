import { faEye } from '@fortawesome/pro-light-svg-icons';

import { GenericButton } from '@shared/components/GenericButton';
import { IPagareByPrestamoIdGet } from '@shared/interfaces/api/IPagare';
import { IPrestamoIdAmortizacionesGet } from '@shared/interfaces/IPrestamo';
import {
  EstadoDirectLending,
  FechaHoraTemplate,
  ImporteFormateadoTemplate,
  StringTemplate,
} from '@shared/templates';

interface AmortizacionTableResponsiveDataProps {
  amortizacion: IPrestamoIdAmortizacionesGet;
  libradorRazonSocial: string;
}

interface HistorialTableResponsiveDataProps {
  historialPagos: IPagareByPrestamoIdGet;
  fetchPdf: (rowData: IPagareByPrestamoIdGet) => Promise<void>;
}

export const amortizacionTableResponsiveData = ({
  amortizacion,
  libradorRazonSocial,
}: AmortizacionTableResponsiveDataProps) => {
  const { empresaInterna, importeNominal, fechaEmision, fechaVencimiento } =
    amortizacion;
  return {
    header: {
      left: '',
      right: '',
    },
    content: [
      {
        label: 'Emisor',
        value: <StringTemplate text={libradorRazonSocial} />,
      },
      {
        label: 'Destinatario',
        value: <StringTemplate text={empresaInterna?.razonSocial ?? ''} />,
      },
      {
        label: 'Fecha de emisión',
        value: <FechaHoraTemplate fechaHora={fechaEmision} />,
      },
      {
        label: 'Fecha de vencimiento',
        value: <FechaHoraTemplate fechaHora={fechaVencimiento} />,
      },
      {
        label: 'Importe',
        value: <ImporteFormateadoTemplate importe={importeNominal} />,
      },
    ],
  };
};

export const historialTableResponsiveData = ({
  historialPagos,
  fetchPdf,
}: HistorialTableResponsiveDataProps) => {
  const {
    numero,
    lugarEmision,
    fechaEmision,
    fechaVencimiento,
    estadoRevision,
    importeNominal,
  } = historialPagos;

  return {
    header: {
      left: <StringTemplate text={numero} />,
      right: (
        <GenericButton
          icon={faEye}
          buttonType="none"
          onClick={() => fetchPdf(historialPagos)}
        />
      ),
    },
    content: [
      {
        label: 'Lugar emisión',
        value: <StringTemplate text={lugarEmision} />,
      },
      {
        label: 'Fecha de emisión',
        value: <FechaHoraTemplate fechaHora={fechaEmision} />,
      },
      {
        label: 'Fecha de vencimiento',
        value: <FechaHoraTemplate fechaHora={fechaVencimiento} />,
      },
      {
        label: 'Estado',
        value: (
          <EstadoDirectLending
            id={estadoRevision.id}
            description={estadoRevision.description}
          />
        ),
      },
      {
        label: 'Importe',
        value: <ImporteFormateadoTemplate importe={importeNominal} />,
      },
    ],
  };
};
