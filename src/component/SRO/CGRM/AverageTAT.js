import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const AverageTAT = ({ data }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (data) {
      // Extract values from the data object
      const seriesData = [
        data["<=7 days"] || 0,
        data["8-15 days"] || 0,
        data["16-30 days"] || 0,
        data[">30 days"] || 0,
      ];

      // Set chart options
      setOptions({
        chart: {
          type: "pie",
          height: 350,
          toolbar: {
            show: true,
          },
        },
        labels: ["<=7 days", "8-15 days", "16-30 days", ">30 days"], // Labels for the pie slices
        dataLabels: {
          enabled: true,
          formatter: (val, { seriesIndex, w }) => {
            // Show both value and percentage
            const value = w.config.series[seriesIndex];
            const percentage = val.toFixed(1);
            return `${value}\n(${percentage}%)`;
          },
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
        title: {
          text: "Average TAT",
          align: "left",
        },
        colors: ["#2B60AD", "#39B1AC", "#FF4560", "#00E396"], // Custom colors for the slices
        legend: {
          position: "bottom",
          horizontalAlign: "center",
        },
        tooltip: {
          y: {
            formatter: (val) => val.toFixed(2), // Show value with 2 decimal places in tooltip
          },
        },
      });

      // Set series data
      setSeries(seriesData);
    }
  }, [data]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="pie"
      height={350}
    />
  );
};

export default AverageTAT;