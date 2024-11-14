import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, TooltipItem } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);


type OrderbookData = {
  bids: [string, string][]; 
  asks: [string, string][];
}

type ChartDataset = {
  label: string;
  data: (number | null)[];
  borderColor: string;
  fill: boolean;
  tension: number;
}

type ChartData = {
  labels: string[];
  datasets: ChartDataset[];
}

type MarketDepthChartProps = {
  orderbookData: OrderbookData;
}

const MarketDepthChart: React.FC<MarketDepthChartProps> = ({ orderbookData }) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Buy Orders',
        data: [],
        borderColor: 'rgba(0, 255, 0, 0.6)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Sell Orders',
        data: [],
        borderColor: 'rgba(255, 0, 0, 0.6)',
        fill: false,
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    if (!orderbookData) return;

    const bids = orderbookData?.bids;
    const asks = orderbookData?.asks;

    const bidLabels: string[] = [];
    const bidData: number[] = [];
    let bidCumulative = 0;

    // Aggregate the bids (cumulative quantity)
    bids?.forEach((bid) => {
      bidLabels.push(bid[0]); 
      bidCumulative += parseFloat(bid[1]); 
      bidData.push(bidCumulative); 
    });

    const askLabels: string[] = [];
    const askData: number[] = [];
    let askCumulative = 0;

    // Aggregate the asks (cumulative quantity)
    asks?.forEach((ask) => {
      askLabels.push(ask[0]); 
      askCumulative += parseFloat(ask[1]); 
      askData.push(askCumulative); 
    });

    // Set the chart data with the processed bids and asks
    setChartData({
      labels: [...bidLabels, ...askLabels.reverse()], // Reverse ask labels to plot from left to right
      datasets: [
        {
          label: 'Buy Orders',
          data: [...bidData, ...new Array(askData.length).fill(null)], // Fill the remaining space for buys
          borderColor: 'rgba(0, 255, 0, 0.6)',
          fill: false,
          tension: 0.1,
        },
        {
          label: 'Sell Orders',
          data: [...new Array(bidData.length).fill(null), ...askData], // Fill the remaining space for sells
          borderColor: 'rgba(255, 0, 0, 0.6)',
          fill: false,
          tension: 0.1,
        },
      ],
    });
  }, [orderbookData]);

  return (
    <div className="p-4 bg-white border rounded shadow-md">
      <h2 className="text-xl font-semibold mb-8">Market Depth Chart</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Price (USD)',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Cumulative Quantity',
              },
            },
          },
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem: TooltipItem<'line'>) {
                  const value = tooltipItem.raw as number;
                  return `Price: ${value.toFixed(2)} | Quantity: ${value}`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default MarketDepthChart;
