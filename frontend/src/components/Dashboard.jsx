import Chart from "chart.js/auto";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import DataGraphs from "../charts/DataGraphs";
import IntensityChart from "../charts/IntensityChart";
import RelevanceChart from "../charts/RelevanceChart";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: "",
    topic: "",
    sector: "",
    region: "",
    pest: "",
    source: "",
    swot: "",
    country: "",
    city: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [data, filters]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/data");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const applyFilters = () => {
    const filteredDataset = data.filter((dataItem) => {
      return Object.keys(filters).every((filterKey) => {
        return (
          filters[filterKey] === "" ||
          dataItem[filterKey] === filters[filterKey]
        );
      });
    });
    setFilteredData(filteredDataset);
  };

  const handleFilterChange = (filterKey, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
  };

  const uniqueEndYears = [...new Set(data.map((item) => item.end_year))];
  const uniqueTopics = [...new Set(data.map((item) => item.topic))];
  const uniqueSectors = [...new Set(data.map((item) => item.sector))];
  const uniqueRegions = [...new Set(data.map((item) => item.region))];
  const uniquePESTs = [...new Set(data.map((item) => item.pestle))];
  const uniqueSources = [...new Set(data.map((item) => item.source))];
  const uniqueSWOTs = [...new Set(data.map((item) => item.swot))];
  const uniqueCountries = [...new Set(data.map((item) => item.country))];
  const uniqueCities = [...new Set(data.map((item) => item.city))];

  return (
    <div className="flex flex-row gap-5 bg-[#010409] text-white ">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full py-5">
        <h2 className="text-2xl font-bold">Data Dashboard</h2>
        <div className="space-y-4">
          <select
            value={filters.endYear}
            onChange={(e) => handleFilterChange("endYear", e.target.value)}
            className="text-black p-2 border rounded-md px-3 mx-2"
          >
            <option value="">Select End Year</option>
            {uniqueEndYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={filters.topic}
            onChange={(e) => handleFilterChange("topic", e.target.value)}
            className="text-black p-2 border rounded-md px-3 mx-2"
          >
            <option value="">Select Topic</option>
            {uniqueTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>

          <select
            value={filters.sector}
            onChange={(e) => handleFilterChange("sector", e.target.value)}
            className="text-black p-2 border rounded-md px-3 mx-2"
          >
            <option value="">Select Sector</option>
            {uniqueSectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>

          <select
            value={filters.region}
            onChange={(e) => handleFilterChange("region", e.target.value)}
            className="text-black p-2 border rounded-md px-3 mx-2"
          >
            <option value="">Select Region</option>
            {uniqueRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <select
            value={filters.pest}
            onChange={(e) => handleFilterChange("pest", e.target.value)}
            className="text-black p-2 border rounded-md px-3 mx-2"
          >
            <option value="">Select PEST</option>
            {uniquePESTs.map((pest) => (
              <option key={pest} value={pest}>
                {pest}
              </option>
            ))}
          </select>

          <select
            value={filters.source}
            onChange={(e) => handleFilterChange("source", e.target.value)}
            className="text-black p-2 border rounded-md px-3 mx-2"
          >
            <option value="">Select Source</option>
            {uniqueSources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>

          <select
            value={filters.swot}
            onChange={(e) => handleFilterChange("swot", e.target.value)}
            className="text-black p-2 border rounded-md px-3 mx-2"
          >
            <option value="">Select SWOT</option>
            {uniqueSWOTs.map((swot) => (
              <option key={swot} value={swot}>
                {swot}
              </option>
            ))}
          </select>

          <select
            value={filters.country}
            onChange={(e) => handleFilterChange("country", e.target.value)}
            className="text-black p-2 border rounded-md px-3 mx-2"
          >
            <option value="">Select Country</option>
            {uniqueCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select
            value={filters.city}
            onChange={(e) => handleFilterChange("city", e.target.value)}
            className="text-black p-2 border rounded-md px-3 mx-2"
          >
            <option value="">Select City</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <IntensityChart dataset={filteredData} />
        <RelevanceChart dataset={filteredData} />
        <DataGraphs dataset={filteredData} />
      </div>
    </div>
  );
};

export default Dashboard;
