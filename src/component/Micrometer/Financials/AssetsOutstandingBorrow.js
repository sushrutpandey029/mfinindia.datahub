import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'

class AssetsOutstandingBorrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    if (props.fAssetsOutstandingSeries !== state.series) {
      return {
        series: props.fAssetsOutstandingSeries,
        options: {
          chart: {
            type: 'line',
            stacked: false,
            height: 450,
          },
          noData: {
            text: "Loading...",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: "#000000",
              fontSize: '14px',
              fontFamily: "Helvetica"
            }
          },
          tooltip: {
            x: {
              format: "dd MMM yyyy"
            },
            y: {
              formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
            },
          },
          plotOptions: {
            bar: {
              endingShape: "rounded",
              columnWidth: '30%',
              borderRadius: 2,
              dataLabels: {
                orientation: 'vertical',
                position: 'bottom',
              },
            },
          },
          toolbar: {
            show: true // Disable toolbar
          },
          colors: ["#ED1590", "#69AB44"], // Define series colors here
          fill: {
            opacity: 1,
            type: 'solid', // Remove `fill.colors` to avoid conflicts
          },
          stroke: {
            show: true,
            width: [3, 3],
            colors: ["#ED1590", "#69AB44"], // Ensure stroke colors match
          },
          title: {
            text: 'Total assets and Outstanding borrowings (Rs Cr)'
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 500,
          },
          dataLabels: {
            enabled: true,
            offsetY: 0,
            formatter: function (val, opt) {
              return val > 100 ? number_format(val) : val.toFixed(2)
            },
            background: {
              enabled: true,
              foreColor: '#fff',
              borderRadius: 2,
              padding: 4,
              opacity: 0.9,
              borderWidth: 0,
              borderColor: '#fff'
            },
            style: {
              fontSize: '15px',
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
            },
          },
          labels: props.fAssetsOutstandingLabels,
          xaxis: {
            labels: {
              show: true,
              hideOverlappingLabels: true,
              minHeight: 50,
              maxHeight: 50,
              style: {
                fontFamily: 'sans-serif',
                fontSize: '15px',
                fontWeight: 500,
              },
            },
          },
          yaxis: [
            {
              // title: {
              //   text: 'Total Assets',
              // },
              labels: {
                show: false, // Hide labels for the left y-axis
              },
              min: (min) => Math.min(min, 0), // Ensure the y-axis starts at 0 or the minimum value
              max: (max) => Math.max(max, 0), // Ensure the y-axis scales to the maximum value
              opposite: false, // Ensure this y-axis is on the left side
            },
            {
              // title: {
              //   text: 'Outstanding Borrowings',
              // },
              labels: {
                show: false, // Show labels for the right y-axis
                formatter: function (value) {
                  return number_format(value);
                },
                style: {
                  fontSize: '15px', // Keep font size the same
                  fontFamily: 'sans-serif',
                  fontWeight: 500,
                },
              },
              min: 0, // Start y-axis from 0
              max: (max) => Math.max(max, 0) + 12800, // Add 12800 to the max value
              tickAmount: 5, // Adjust the number of ticks on the y-axis
              opposite: true, // Ensure this y-axis is on the right side
            }
          ]
        },
      };
    }
    return null;
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="line"
        height={450} // Set height here
      />
    );
  }
}

export default AssetsOutstandingBorrow;