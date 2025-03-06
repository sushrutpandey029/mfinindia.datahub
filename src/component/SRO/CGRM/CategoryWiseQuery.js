import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const CategoryWiseQuery = ({ data }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (data) {
      // Extract values from the data object
      const seriesData = Object.values(data);

      // Extract labels from the data object
      const labels = Object.keys(data);

      // Set chart options
      setOptions({
        chart: {
          type: "pie",
          height: 350,
          toolbar: {
            show: true,
          },
        },
        labels: labels, // Use the keys as labels
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
          text: "Category wise complaint",
          align: "left",
        },
        colors: ["#2B60AD", "#39B1AC", "#FF4560", "#00E396", "#FEB019", "#775DD0", "#FF6384"], // Custom colors
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

export default CategoryWiseQuery;

// import * as React from "react";
// import number_format from "../../Unqiue/Common_func";
// import ReactApexChart from "react-apexcharts";
// class CategoryWiseQuery extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           series: [44, 55, 13, 43, 22],
//           options: {
//             chart: {
//               width: 380,
//               type: 'pie',
//             },
//             title: {
//                 text: "Category wise Query",
//                 align: "left",
//               },
//             noData: {
//                 text: "Loading...",
//                 align: "center",
//                 verticalAlign: "bottom",
//                 offsetX: 0,
//                 offsetY: 0,
//                 style: {
//                   color: "#000000",
//                   fontSize: "14px",
//                   fontFamily: "Helvetica",
//                 },
//               },
//               legend: {
//                 position: "bottom",
//                 horizontalAlign: "center",
//                 fontFamily: 'sans-serif',
//                 fontSize: '15px',
//                 fontWeight: 500,
//               },
//             labels: ['Claim settlement', 'Processing', 'Disbursement', 'Service', 'Other'],
//             responsive: [{
//               breakpoint: 480,
//               options: {
//                 chart: {
//                   width: 200
//                 },
//                 legend: {
//                   position: 'bottom'
//                 }
//               }
//             }]
//           }, 
        
//         };
//       }

//   render() {
//     return (
//       <ReactApexChart
//         options={this.state.options}
//         series={this.state.series}
//         type="pie"
//         height={528}
//       />
//     );
//   }
// }
// export default CategoryWiseQuery;
