import React from 'react';
import { Line } from 'react-chartjs-2';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export function LineChart({ labels, coinId, priceData }) {
    const data = {
        labels,
        datasets: [
          {
            label: `Price for ${coinId}`,
            data: priceData,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
    };
    return <Line data={data} options={options} />   
}
