import { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip as ToolTipChart,
} from 'chart.js';

import {
  IRenderGraphLine,
  ITooltipData,
} from '@shared/interfaces/components/IRenderGraphLine';
import { formatDateUTC } from '@shared/utils/formatters';

import ChartLineGraphContext from '../../context';
import { tabIndexEnum } from '../../helpers';

export const RenderGraphLine = ({
  className,
  title,
  asnef,
  rai,
  legend,
}: IRenderGraphLine) => {
  const { selectedTab } = useContext(ChartLineGraphContext);
  const isASNEF = selectedTab === tabIndexEnum.ASNEF;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ToolTipChart,
    Legend,
    Filler
  );

  const options = {
    responsive: true,
    aspectRatio: 1.8,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'center' as const,
        onClick: () => '',
      },
      title: {
        display: true,
        text: `${legend ?? ''}`,
      },
      tooltip: {
        callbacks: {
          footer: isASNEF
            ? (context: ITooltipData) => {
                const indexTooltip = context[0].dataIndex;
                const dataFooter = asnef?.items?.map(
                  (el) => el?.situacion?.description
                );
                const printArray = (arr: string[], i: number) => {
                  return arr[i];
                };
                return `Situación: ${printArray(dataFooter, indexTooltip)}`;
              }
            : undefined,
        },
      },
    },
    scales: {
      y: {
        border: {
          color: 'white',
        },
        min: 0,
        ticks: {
          callback(value: unknown) {
            return `${value} €`;
          },
        },
        beginAtZero: true,
      },
      x: {
        border: {
          color: 'white',
        },
      },
    },
  };

  const dataChart = {
    labels: isASNEF
      ? asnef?.items?.map((x) => formatDateUTC(x.fecha))
      : rai?.items?.map((x) => formatDateUTC(x.fechaRespuesta)),
    datasets: [
      {
        label: 'Deuda',
        data: isASNEF
          ? asnef?.items?.map((y) => y.importeTotalImpagado)
          : rai?.items?.map((y) => y.importeTotalImpagado),
        borderColor: ['rgba(0,	74,	209, 1)'],
        borderWidth: 1,
        pointBackgroundColor: ['rgba(0,	74,	209, 1)'],
        fill: true,
        backgroundColor: ['rgba(137, 196, 244, 0.3)'],
        tension: 0.1,
      },
    ],
  };

  return (
    <div className={'w-full p-2 h-[90%] line-chart' ?? `${className}`}>
      <p className="p-2 text-2xl font-medium">{title}</p>
      <Line height={300} options={options} data={dataChart} />
    </div>
  );
};
