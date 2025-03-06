import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const OriginOfCall = ({ data }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (data) {
      // Transform data into ApexCharts series format
      const series = [
        {
          name: "Query",
          data: Object.values(data).map((state) => state.Query || 0),
        },
        {
          name: "Complaint",
          data: Object.values(data).map((state) => state.Complaint || 0),
        },
      ];

      // Shorten state names to abbreviations
      const stateAbbreviations = {
        "Uttar Pradesh": "UP",
        "Madhya Pradesh": "MP",
        "West Bengal": "WB",
        "Bihar": "BR",
        "Rajasthan": "RJ",
        "Tamil Nadu": "TN",
        "Punjab": "PB",
        "Jharkhand": "JH",
        "Assam": "AS",
        "Haryana": "HR"
      };
      const categories = Object.keys(data).map(
        (state) => stateAbbreviations[state] || state
      );

      // Set chart options
      setOptions({
        chart: {
          type: "bar",
          height: 350,
          stacked: false,
          toolbar: {
            show: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: true,
          formatter: (val) => val, // Show actual value on bars
        },
        title: {
          text: "Origin of Calls - Top 10 States", // Title text
          align: "left", // Align title to the left
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            color: "#000000", // Title color
          },
        },
        xaxis: {
          categories: categories, // Use abbreviated state names
          labels: {
            style: {
              fontSize: "12px",
              fontWeight: 600,
            },
          },
        },
        yaxis: {
          title: {
            text: "Number of Calls",
          },
          labels: {
            formatter: (val) => val.toFixed(0), // Show whole numbers on y-axis
          },
        },
        colors: ["#2B60AD", "#39B1AC"], // Custom colors for bars
        legend: {
          position: "top",
          horizontalAlign: "center",
        },
        tooltip: {
          y: {
            formatter: (val) => val, // Show actual value in tooltip
          },
        },
      });

      // Set series data
      setSeries(series);
    }
  }, [data]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={350}
    />
  );
};

export default OriginOfCall;

// import React, { useState, useEffect } from "react";
// import ReactApexChart from "react-apexcharts";

// const OriginOfCall = ({ data }) => {
//   const [series, setSeries] = useState([]);
//   const [options, setOptions] = useState({});

//   useEffect(() => {
//     if (data) {
//       // Transform data into ApexCharts series format
//       const series = [
//         {
//           name: "Query",
//           data: Object.values(data).map((state) => state.Query || 0),
//         },
//         {
//           name: "Complaint",
//           data: Object.values(data).map((state) => state.Complaint || 0),
//         },
//       ];

//       // Shorten state names to abbreviations
//       const stateAbbreviations = {
//         "Uttar Pradesh": "UP",
//         "Madhya Pradesh": "MP",
//         "West Bengal": "WB",
//         "Bihar": "BR",
//         "Rajasthan": "RJ",
//         "Tamil Nadu": "TN",
//         "Punjab": "PB",
//         "Jharkhand": "JH",
//         "Assam": "AS",
//         "Haryana": "HR",
//         "Uttarakhand": "UK", // This was already in your list
//       };
//       const categories = Object.keys(data).map((state) => stateAbbreviations[state] || state);

//       // Set chart options
//       setOptions({
//         chart: {
//           type: "bar",
//           height: 350,
//           stacked: false,
//           toolbar: {
//             show: true,
//           },
//         },
//         plotOptions: {
//           bar: {
//             horizontal: false,
//             columnWidth: "55%",
//             endingShape: "rounded",
//           },
//         },
//         dataLabels: {
//           enabled: true,
//           formatter: (val) => val, // Show actual value on bars
//         },
//         xaxis: {
//           categories: categories, // Use abbreviated state names
//           labels: {
//             style: {
//               fontSize: "12px",
//               fontWeight: 600,
//             },
//           },
//         },
//         yaxis: {
//           title: {
//             text: "Origin of Calls - Top 10 states",
//           },
//           labels: {
//             formatter: (val) => val.toFixed(0), // Show whole numbers on y-axis
//           },
//         },
//         colors: ["#2B60AD", "#39B1AC"], // Custom colors for bars
//         legend: {
//           position: "top",
//           horizontalAlign: "center",
//         },
//         tooltip: {
//           y: {
//             formatter: (val) => val, // Show actual value in tooltip
//           },
//         },
//       });

//       // Set series data
//       setSeries(series);
//     }
//   }, [data]);

//   return (
//     <ReactApexChart
//       options={options}
//       series={series}
//       type="bar"
//       height={350}
//     />
//   );
// };

// export default OriginOfCall;
