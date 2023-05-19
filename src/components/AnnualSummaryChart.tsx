import { AreaChart } from '@tremor/react';
import { amountFormatter } from '../utils/functions/formatters';

const AnnualSummaryChart = () => {
  const data = [
    {
      Month: 'Jan 21',
      Ingresos: 2890,
      Gastos: 2400,
    },
    {
      Month: 'Feb 21',
      Ingresos: 1890,
      Gastos: 1398,
    },
    {
      Month: 'Mar 21',
      Ingresos: 2190,
      Gastos: 1900,
    },
    {
      Month: 'Apr 21',
      Ingresos: 3470,
      Gastos: 3100,
    },
    {
      Month: 'May 21',
      Ingresos: 2170,
      Gastos: 1650,
    },
    {
      Month: 'Jun 21',
      Ingresos: 3170,
      Gastos: 2450,
    },
    {
      Month: 'Jul 21',
      Ingresos: 3490,
      Gastos: 2910,
    },
    {
      Month: 'Aug 21',
      Ingresos: 2190,
      Gastos: 1600,
    },
    {
      Month: 'Sep 21',
      Ingresos: 2890,
      Gastos: 2400,
    },
    {
      Month: 'Oct 21',
      Ingresos: 1890,
      Gastos: 1398,
    },
    {
      Month: 'Nov 21',
      Ingresos: 2190,
      Gastos: 1900,
    },
    {
      Month: 'Dec 21',
      Ingresos: 3470,
      Gastos: 3100,
    },
    {
      Month: 'Jan 22',
      Ingresos: 3890,
      Gastos: 2980,
    },
  ];
  return (
    <AreaChart
      className='mt-4 h-80'
      data={data}
      categories={['Ingresos', 'Gastos']}
      index='Month'
      colors={['indigo', 'fuchsia']}
      valueFormatter={amountFormatter}
    />
  );
};

export default AnnualSummaryChart;
