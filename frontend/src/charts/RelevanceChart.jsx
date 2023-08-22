import React from "react";
import { Bar, Radar } from "react-chartjs-2";

const RelevanceChart = ({ dataset }) => {
  const groupedData = dataset.reduce((acc, data) => {
    const { source, relevance, likelihood } = data;

    if (!acc[source]) {
      acc[source] = {
        source,
        relevance: [],
        likelihood: [],
      };
    }

    acc[source].relevance.push(relevance);
    acc[source].likelihood.push(likelihood);

    return acc;
  }, {});

  const labels = Object.keys(groupedData);
  const limitedLabels = labels.slice(0, 15);

  const barChartData = {
    labels: limitedLabels,
    datasets: [
      {
        label: "Based on Relevance",
        backgroundColor: "#58ffef",
        borderColor: "black",
        borderRadius: 15,
        data: labels.map((source) => {
          const relevance = groupedData[source].relevance;
          return (
            relevance.reduce((sum, val) => sum + val, 0) / relevance.length
          );
        }),
      },
    ],
  };

  const radarChartData = {
    labels: limitedLabels,
    datasets: [
      {
        label: "Likelihood",
        backgroundColor: "rgba(112, 105, 178, 0.2)",
        borderColor: "#7069b2",
        pointBackgroundColor: "#7069b2",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#7069b2",
        data: labels.map((source) => {
          const likelihood = groupedData[source].likelihood;
          return (
            likelihood.reduce((sum, val) => sum + val, 0) / likelihood.length
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
      <h2 className="text-xl p-3">Relevance vs Likelihood</h2>
      <div className="flex flex-row pb-10">
        <div className="w-1/2 text-white">
          <Bar data={barChartData} options={options} />
        </div>
        <div className="w-1/2 text-white">
          <Radar data={radarChartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default RelevanceChart;
