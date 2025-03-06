import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func';

class NatureofCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: NatureofCall.formatSeries(props), // Initialize series using static method
      options: {
        chart: {
          type: "pie", // Pie chart
          height: 650,
          toolbar: { show: true },
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: { position: "top", offsetX: 0, offsetY: 0 },
          },
        }],
        fill: {
          opacity: 1,
          colors: ['#B853A0', '#FF4560'], // Custom colors for pie slices
          type: 'solid',
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["#FFFFFF"], // White border for pie slices
        },
        title: {
          text: "Nature of Call",
          align: "left",
        },
        noData: {
          text: "No Data Available", // Custom message for no data
          align: "center",
          verticalAlign: "bottom",
          style: { color: "#000000", fontSize: "14px", fontFamily: "Helvetica" },
        },
        dataLabels: {
          enabled: true,
          formatter: (val, { seriesIndex, w }) => {
            const value = w.config.series[seriesIndex]; // Get the actual value
            const percentage = val.toFixed(1); // Get the percentage value
            return `${value}\n(${percentage}%)`; // Display both value and percentage
          }, // Show percentage in data labels
          style: { fontSize: '15px', fontFamily: 'sans-serif', fontWeight: 'bold' },
        },
        labels: ["Query", "Complaint"], // Labels for pie slices
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          fontFamily: 'sans-serif',
          fontSize: '15px',
          fontWeight: 500,
        },
        colors: ["#B853A0", "#FF4560"], // Custom colors for pie slices
        tooltip: {
          y: { formatter: (value) => number_format(value) }, // Format tooltip values
        },
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Check if Query or Complaint props have changed
    if (nextProps.Query !== prevState.series[0] || nextProps.Complaint !== prevState.series[1]) {
      return { series: NatureofCall.formatSeries(nextProps) };
    }
    return null;
  }

  static formatSeries(props) {
    const query = props.Query || 0;
    const complaint = props.Complaint || 0;

    // If both values are 0, set a default non-zero value to render the chart
    if (query === 0 && complaint === 0) {
      return [1, 1]; // Default values to render the chart
    }

    return [query, complaint]; // Return Query and Complaint values
  }

  render() {
    const { series, options } = this.state;

    // Customize the chart when both values are 0
    const isAllZero = series[0] === 0 && series[1] === 0;

    return (
      <ReactApexChart
        options={{
          ...options,
          dataLabels: {
            ...options.dataLabels,
            enabled: !isAllZero, // Disable data labels when all values are 0
          },
          tooltip: {
            ...options.tooltip,
            enabled: !isAllZero, // Disable tooltip when all values are 0
          },
        }}
        series={series}
        type="pie" // Pie chart
        height={395}
      />
    );
  }
}

export default NatureofCall;

// import * as React from "react";
// import { createStyles, makeStyles } from "@material-ui/styles";
// import {
//   Card,
//   CardContent,
//   CardActionArea,
// } from "@mui/material";
// import ReactApexChart from "react-apexcharts";
// import number_format from '../../Unqiue/Common_func';
// class NatureofCall extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {}
//   }
//   static getDerivedStateFromProps(props, state) {
//     if (props.NatureofCallSeries !== state.series) {
//       return {
//         series: props.NatureofCallSeries,
//         options: {
//           chart: {
//             type: "bar",
//             height: 650,
//             stacked: true,
//             toolbar: {
//               show: true,
//             },
//           },
//           responsive: [
//             {
//               breakpoint: 480,
//               options: {
//                 legend: {
//                   position: "top",
//                   offsetX: 0,
//                   offsetY: 0,
//                 },
//               },
//             },
//           ],
//           fill: {
//               opacity: 1,
//               colors: [
//                 '#B853A0'
//               ],
//               type: 'solid',
//             },
//             stroke: {
//               show: true,
//               width: [4],
//               colors: ["#B853A0"],
//             },
//           title: {
//             text: "Nature of Call",
//             align: "left",
//           },
//           noData: {
//             text: "Loading...",
//             align: "center",
//             verticalAlign: "bottom",
//             offsetX: 0,
//             offsetY: 0,
//             style: {
//               color: "#000000",
//               fontSize: "14px",
//               fontFamily: "Helvetica",
//             },
//           },
//           dataLabels: {
//               enabled: true,
//               //offsetX: 2,
//               formatter: function (val, opt) {
//                 return val 
//               },
//               style: {
//                 fontSize: '15px',
//                 fontFamily: 'sans-serif',
//                 fontWeight: 'bold',
//               },
//             },
//           plotOptions: {
//               bar: {
//                 endingShape: "rounded",
//                 columnWidth: '30%',
//                 //borderRadius: 2,
//                 dataLabels: {
//                   orientation: 'vertical',
//                   position: 'bottom',
//                 },
//               },
//             },
//           xaxis: {
//             //  type: 'datetime',
//             categories: ["Query", "Complaint", "Total Call Recieved"],
//             labels: {
//               show: true,
//               hideOverlappingLabels: true,
//               minHeight: 50,
//               maxHeight: 50,
//               style: {
//                 fontFamily: 'sans-serif',
//                 fontSize: '15px',
//                 fontWeight: 500,
//               },
//             },
//           },
//           yaxis: {
//             title: {},
//             labels: {
//               show: false,
//               formatter: function (value) {
//                 return number_format(value);
//               },
//             },
//           },
//           legend: {
//               position: "bottom",
//               horizontalAlign: "center",
//               fontFamily: 'sans-serif',
//               fontSize: '15px',
//               fontWeight: 500,
//             },
//             colors: ["#B853A0"],
//             tooltip: {
//               y: {
//                 formatter: (value) => { return number_format(value) },
//               },              
//             },
//         },
//       };
//     }
//     return null;
//   }

//   render() {
//     return (
//       <ReactApexChart
//         options={this.state.options}
//         series={this.state.series}
//         type="bar"
//         height={528}
//       />
//     );
//   }
// }
// export default NatureofCall;
