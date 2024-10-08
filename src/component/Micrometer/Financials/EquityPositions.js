import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'

class EquityPositions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  static getDerivedStateFromProps(props, state) {
    if (props.fEquityPositionsSeries !== state.series) {
      return {
        series: props.fEquityPositionsSeries,
        options: {
          chart: {
            type: 'line',
            stacked: false,
            height: 350
          },
          noData: {
            text: "Loading...",
            align: 'center',
            verticalAlign: 'middle',
            style: {
              color: "#000000",
              fontSize: '15px',
              fontFamily: "Helvetica"
            }
          },
          tooltip: {
            x: {
              format: "MMM yyyy"
            },
            y: {
              formatter: (val) => {
                return val > 100 ? number_format(val) : val.toFixed(2);
              }
            }
          },
          plotOptions: {
            bar: {
              endingShape: "rounded",
              columnWidth: '30%',
              dataLabels: {
                orientation: 'vertical',
                position: 'bottom',
              }
            }
          },
          colors: ["#2B60AD", "#39B1AC", "#B853A0"],
          fill: {
            opacity: 1,
            type: 'solid'
          },
          stroke: {
            show: true,
            width: [3, 3, 4],
            colors: ["#2B60AD", "#39B1AC", "#B853A0"]
          },
          title: {
            text: 'Equity Positions (Rs Cr) and Leverage'
          },
          dataLabels: {
            enabled: true,
            offsetY: 5,
            formatter: function (val) {
              return val > 100 ? number_format(val) : val.toFixed(2);
            },
            background: {
              enabled: true,
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
            }
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 500
          },
          markers: {
            size: [4]
          },
          labels: props.fEquityPositionsLabels,
          xaxis: {
            labels: {
              show: true,
              rotate: -90,
              style: {
                fontFamily: 'sans-serif',
                fontSize: '15px',
                fontWeight: 500
              }
            }
          },
          yaxis: [
            {
              title: { text: '' },
              labels: {
                show: false,
                formatter: function (value) {
                  return number_format(value);
                }
              },
              min: 0, 
              max: Math.max(...props.fEquityPositionsSeries.map(s => Math.max(...s.data))),
            },
            {
              opposite: true,
              title: { text: '' },
              labels: {
                show: false,
                formatter: function (value) {
                  return value.toFixed(2);
                }
              },
              min: 0, 
              max: Math.max(...props.fEquityPositionsSeries.map(s => Math.max(...s.data))),
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
        height={450}
      />
    );
  }
}

export default EquityPositions;
