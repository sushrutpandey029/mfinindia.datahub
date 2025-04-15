// import * as React from "react";
// import number_format from '../../Unqiue/Common_func'
// import ReactApexChart from "react-apexcharts";
// class CostBorrowingInterestRatesRBI extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
        
//           series: [
//             {
//               name: "Wavg CoB",
//               data: [28, 29, 33, 36, 32, 32, 33]
//             },
//             {
//               name: "Max. Interest Rate MFL",
//               data: [12, 11, 14, 18, 17, 13, 13]
//             },
//             {
//                 name: "Min. Interest Rate MFL",
//                 data: [4, 9, 17, 28, 37, 30, 37]
//             },
//             {
//                 name: "Wavg InterestRate MFL",
//                 data: [22, 11, 24, 18, 37, 13, 10]
//             }
//           ],
//           options: {
//             chart: {
//               height: 350,
//               type: 'line',
//               toolbar: {
//                 show: false
//               }
//             },
//             title: {
//                 text: "Cost of borrowing and Interest rates of microfinance loans sanctioned during the quarter",
//                 align: "left",
//               },
//             colors: ["#ED1590", "#2B60AD", "#69AB44", "#FDBF11"],
//             tooltip: {
//                 y: {
//                   formatter: (value) => { return value.toFixed(2) + '%' },
//                 },
//               },
//               dataLabels: {
//                 enabled: true,
//                 offsetY: -5,
//                 formatter: function (val, opt) {
//                   return val > 100 ? number_format(val) : val.toFixed(2)
//                 },
//                 background: {
//                   enabled: true,
//                   foreColor: '#fff',
//                   borderRadius: 2,
//                   padding: 4,
//                   opacity: 0.9,
//                   borderWidth: 0,
//                   borderColor: '#fff'
//                 },
//                 style: {
//                   fontSize: '15px',
//                   fontFamily: 'sans-serif',
//                   fontWeight: 'bold',
//                 },
//               },
//               stroke: {
//                 show: true,
//                 width: [4, 4, 4, 4],
//                 colors: ["#ED1590", "#2B60AD", "#69AB44", "#FDBF11"]
//               },
//               noData: {
//                 text: "Loading...",
//                 align: 'center',
//                 verticalAlign: 'middle',
//                 offsetX: 0,
//                 offsetY: 0,
//                 style: {
//                   color: "#000000",
//                   fontSize: '15px',
//                   fontFamily: "sans-serif"
//                 }
//               },
//               markers: {
//                 size: [4]
//               },
//             xaxis: {
//               categories: ['Oct-22', 'Nov-22', 'Dec-22', 'Jan-23', 'Feb-23', 'Mar-23', 'Apr-23'],
//               labels: {
//                 show: true,
//                 hideOverlappingLabels: true,
//                 minHeight: 50,
//                 maxHeight: 50,
//                 style: {
//                   fontSize: '15px',
//                   fontFamily: 'sans-serif',
//                   fontWeight: 500,
//                 },
//               },
//             },
//             yaxis: {
//                 title: {
//                   text: "Number of records",
//                   style: {
//                     color: 'white',
//                   },
//                 },
//                 labels: {
//                   show: false,
//                   formatter: function (value) {
//                     return value.toFixed(2) + '%';
//                   }
//                 },
//               },
//               legend: {
//                 position: "bottom",
//                 horizontalAlign: "center",
//                 fontFamily: 'sans-serif',
//                 fontSize: '15px',
//                 fontWeight: 500,
//               },
//           },
        
        
//         };
//       }



//   render() {
//     return (
//       <ReactApexChart
//         options={this.state.options}
//         series={this.state.series}
//         type="line"
//         height={528}
//       />
//     );
//   }
// }
// export default CostBorrowingInterestRatesRBI;

import React from "react";
import ReactApexChart from "react-apexcharts";

const CostBorrowingInterestRatesRBI = ({ apiData }) => {
  console.log("api_in_cob",apiData);
  // Extract categories (quarters)
  const categories = Object.keys(apiData["Weighted Average COB"]);

  // Extract data for each series
  const weightedAvgCOB = Object.values(apiData["Weighted Average COB"]).map(val => parseFloat(val));
  const minInterestRate = Object.values(apiData["Min Int. Rate"]).map(val => parseFloat(val));
  const maxInterestRate = Object.values(apiData["Max Int. Rate"]).map(val => parseFloat(val));
  const weightedAvgIntRate = Object.values(apiData["Weighted Average Int. Rate"]).map(val => parseFloat(val));

  // Chart configuration
  const chartOptions = {
    chart: {
      height: 350,
      type: "line",
      toolbar: { show: false }
    },
    title: {
      text: "COB and Interest Rates of On-BS Microfinance Loans",
      align: "left"
    },
    colors: ["#2B60AD", "#808080", "#ED1590", "#FDBF11"],
    tooltip: {
      y: {
        formatter: (value) => `${value.toFixed(2)}%`
      }
    },
    dataLabels: {
      enabled: true,
      offsetY: -5,
      formatter: (val) => `${val.toFixed(2)}%`,
      style: {
        fontSize: "12px",
        fontWeight: "bold"
      }
    },
    stroke: {
      width: [3, 3, 3, 3]
    },
    markers: { size: 4 },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 500
        }
      }
    },
    yaxis: {
      labels: {
        show:false
        // formatter: (value) => `${value.toFixed(2)}%`
      }
    },
    legend: {
      position: "bottom",
      fontSize: "13px",
      fontWeight: 500
    }
  };

  // Series data
  const series = [
    { name: "Weighted Average COB", data: weightedAvgCOB },
    { name: "Max Int. Rate", data: maxInterestRate },
    { name: "Min Int. Rate", data: minInterestRate },
    { name: "Weighted Average Int. Rate", data: weightedAvgIntRate }
  ];

  return (
    <ReactApexChart options={chartOptions} series={series} type="line" height={400} />
  );
};

export default CostBorrowingInterestRatesRBI;
