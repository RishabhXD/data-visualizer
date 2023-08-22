import React from "react";
import { Bar, Line, Radar, Doughnut } from "react-chartjs-2";

const DataGraphs = ({ dataset }) => {
  const groupedData = dataset.reduce(
    (acc, data) => {
      const { end_year, country, topic, region } = data;

      if (end_year && !acc.years[end_year]) {
        acc.years[end_year] = { end_year, count: 0 };
      }
      if (country && !acc.countries[country]) {
        acc.countries[country] = { country, count: 0 };
      }
      if (topic && !acc.topics[topic]) {
        acc.topics[topic] = { topic, count: 0 };
      }
      if (region && !acc.regions[region]) {
        acc.regions[region] = { region, count: 0 };
      }

      if (end_year) {
        acc.years[end_year].count++;
      }
      if (country) {
        acc.countries[country].count++;
      }
      if (topic) {
        acc.topics[topic].count++;
      }
      if (region) {
        acc.regions[region].count++;
      }

      return acc;
    },
    { years: {}, countries: {}, topics: {}, regions: {} }
  );

  const maxLabels = 15;

  const yearsData = Object.values(groupedData.years)
    .sort((a, b) => b.count - a.count)
    .slice(0, maxLabels);

  const countriesData = Object.values(groupedData.countries)
    .sort((a, b) => b.count - a.count)
    .slice(0, maxLabels);

  const topicsData = Object.values(groupedData.topics)
    .sort((a, b) => b.count - a.count)
    .slice(0, maxLabels);

  const regionsData = Object.values(groupedData.regions)
    .sort((a, b) => b.count - a.count)
    .slice(0, maxLabels);

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
    <div className="grid grid-cols-2 gap-6 rounded-lg shadow-gray-900 bg-[#202123] mt-5 pl-5">
      <div className="col-span-2 md:col-span-1">
        <h2 className="text-xl my-4">End Year Graph</h2>
        <Line
          data={{
            labels: yearsData.map((data) => data.end_year),
            datasets: [
              {
                label: "Count",
                backgroundColor: "#58ffef",
                borderColor: "#58ffef",
                borderWidth: 2,
                data: yearsData.map((data) => data.count),
              },
            ],
          }}
          options={options}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <h2 className="text-xl my-4">Country Graph</h2>
        <Radar
          data={{
            labels: countriesData.map((data) => data.country).slice(0, 10),
            datasets: [
              {
                label: "Count",
                backgroundColor: "rgba(112, 105, 178, 0.2)",
                borderColor: "#7069b2",
                pointBackgroundColor: "#7069b2",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#7069b2",
                data: countriesData.map((data) => data.count),
              },
            ],
          }}
          options={options}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <h2 className="text-xl my-4">Topics Graph</h2>
        <Doughnut
          data={{
            labels: topicsData.map((data) => data.topic).slice(0, 5),
            datasets: [
              {
                label: "Count",
                backgroundColor: [
                  "#58afef",
                  "#71ffff",
                  "#ffaaaa",
                  "#fff8b3",
                  "#f4d35e",
                ],
                borderWidth: 1,
                data: topicsData.map((data) => data.count),
              },
            ],
          }}
          options={options}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <h2 className="text-xl my-4">Regions Graph</h2>
        <Bar
          data={{
            labels: regionsData.map((data) => data.region).slice(0, 10),
            datasets: [
              {
                label: "Count",
                backgroundColor: "#d34b4c",
                borderColor: "black",
                borderRadius: 15,
                data: regionsData.map((data) => data.count),
              },
            ],
          }}
          options={options}
        />
      </div>
    </div>
  );
};

export default DataGraphs;
