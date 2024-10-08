import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func';

class Funding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    if (props.fundingSeries !== state.series) {
      return {
        series: props.fundingSeries,
        options: {
          chart: {
            type: 'line',
            stacked: false,
          },
          noData: {
            text: "Loading...",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: "#000000",
              fontSize: '15px',
              fontFamily: "sans-serif"
            }
          },
          tooltip: {
            x: {
              format: "MMM yyyy"
            },
            y: {
              formatter: (val) => {
                return val > 100 ? number_format(val) : val.toFixed(2);
              },
            },
          },
          plotOptions: {
            bar: {
              endingShape: "rounded",
              columnWidth: '80%', // Adjusted for better visualization
              dataLabels: {
                orientation: 'vertical',
                position: 'bottom',
              },
            },
          },
          toolbar: {
            show: true
          },
          fill: {
            opacity: 1,
            colors: ['#F78F6D', '#39B1AC', '#BD1E22'],
            type: 'solid',
          },
          colors: ["#F78F6D", "#39B1AC", "#BD1E22"],
          stroke: {
            show: true,
            width: [3, 3, 4],
            colors: ["#F78F6D", "#39B1AC", "#BD1E22"]
          },
          title: {
            text: 'Funding',
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 500,
          },
          markers: {
            size: [4]
          },
          dataLabels: {
            enabled: true,
            offsetX: 5,
            formatter: function (val, opt) {
              return val > 100 ? number_format(val) : val.toFixed(2);
            },
            background: {
              enabled: true,
              foreColor: '#fff',
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
          labels: props.fundingLabels,
          grid: {
            show: false,      // you can either change hear to disable all grids
          xaxis: {
            labels: {
              show: true,
              rotate: -90, // Adjusted rotation
              hideOverlappingLabels: true,
              minHeight: 50,
              maxHeight: 50,
              style: {
                fontSize: '15px',
                fontFamily: 'sans-serif',
                border: 'none',
                fontWeight: 500,
              },
            },
          },
        },
          yaxis: [
            {
              title: {
                text: '', // Set label for clarity
              },
              labels: {
                show:false,
                formatter: function (value) {
                  return number_format(value);
                }
              },
              min: 0, // Ensure the minimum value is set to 0 for both series
              max: Math.max(...props.fundingSeries.map(s => Math.max(...s.data))), // Dynamically calculate the max
            },
            {
              seriesname: 'Debt: Equity Ratio',
              opposite: true,
              title: {
                text: '',
              },
              labels: {
                show:false,
                formatter: function (value) {
                  return value.toFixed(value); // Precision formatting for the ratio
                },
              },
            }
          ]
        }
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
        height={450} // Adjusted height
      />
    );
  }
}

export default Funding;
