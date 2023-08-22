import React from "react";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const IntensityChart = ({ dataset }) => {
  const groupedData = dataset.reduce((acc, data) => {
    const { source, intensity } = data;

    if (!acc[source]) {
      acc[source] = {
        source,
        intensities: [],
      };
    }

    acc[source].intensities.push(intensity);

    return acc;
  }, {});

  const labels = Object.keys(groupedData);
  const data = labels.map((source) => {
    const intensities = groupedData[source].intensities;
    return intensities.reduce((sum, val) => sum + val, 0) / intensities.length;
  });

  const limitedLabels = labels.slice(0, 15);

  const barChartData = {
    labels: limitedLabels,
    datasets: [
      {
        label: "Based on intensity",
        backgroundColor: "#ffaaaa",
        borderColor: "black",
        borderRadius: 15,
        data: limitedLabels.map((source) => {
          const intensities = groupedData[source].intensities;
          return (
            intensities.reduce((sum, val) => sum + val, 0) / intensities.length
          );
        }),
      },
    ],
  };

  const lineChartData = {
    labels: limitedLabels,
    datasets: [
      {
        label: "Intensity Trend",
        backgroundColor: "transparent",
        borderColor: "#a493fa",
        borderWidth: 2,
        borderJoinStyle: "round",
        pointRadius: 4,
        pointBackgroundColor: "#a493fa",
        pointBorderColor: "#a493fa",
        pointHoverRadius: 5,
        data: limitedLabels.map((source) => {
          const intensities = groupedData[source].intensities;
          return (
            intensities.reduce((sum, val) => sum + val, 0) / intensities.length
          );
        }),
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
        maxTicksLimit: 5,
      },
    },
    plugins: {
      title: {
        display: true,
      },
      legend: {
        display: true,
      },
    },
    layout: {
      padding: 10,
    },
  };

  return (
    <div className="rounded-lg shadow-gray-900 bg-[#202123] mt-5">
      <h2 className="text-xl p-3">Intensity Chart</h2>
      <div className="flex flex-row pb-10">
        <div className="w-1/2 text-white">
          <Bar data={barChartData} options={options} />
        </div>
        <div className="w-1/2 text-white">
          <Line data={lineChartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default IntensityChart;
