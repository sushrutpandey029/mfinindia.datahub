import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../Unqiue/Common_func'
class GLPGrowthTrendsH extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static getDerivedStateFromProps(props, state) {
    if (props.glp !== state.series) {
      return {
        series: [
          {
            name: 'GLP (Cr)',
            type: 'column',
            data: props.glp
          },
          {
            name: 'Growth % (MoM)',
            type: 'line',
            data: props.changes
          }
        ],
        options: {
          chart: {
            height: 350,
           type: 'line',
          },
          toolbar: {
            show: true //Disable toolbar
          },
          colors: ["#39B1AC", "#2B60AD"],
          fill: {
            opacity: 1,
            colors: [
              '#39B1AC',
              '#2B60AD'
            ],
            type: 'solid',
          },
          stroke: {
          show: true,
          width: [3, 4],
          colors: ["#39B1AC", "#2B60AD"]
          },
          title: {
            text: 'GLP Growth Trend'
          },
          tooltip: {
            y: {
              formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
            },
          },
          plotOptions: {
            bar: {
              endingShape: "rounded",
              columnWidth: '50%',
             // borderRadius: 1,
              dataLabels: {
                orientation: 'vertical',
                position: 'bottom',
              },
            },
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
          dataLabels: {
            enabled: true,
            offsetX: 2,
            formatter: function (val, opt) {
              return val > 100 ? number_format(val) : val.toFixed(2)
            },
            background: {
              enabled: true,
              foreColor: '#fff',
              //borderRadius: 1,
              padding: 2,
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
          labels: props.xaxis,
          xaxis: {
            categories: props.xaxis,
            labels: {
              show: true,
              hideOverlappingLabels: true,
              minHeight: 40,
              maxHeight: 40,
              style: {
                  fontSize: '15px',
                  fontFamily: 'sans-serif',
                  fontWeight: 500,
              },
            },
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
          yaxis: [{
            title: {
              text: '',
            },
            labels: {
              show: false,
              formatter: function (val) {
                return val > 100 ? number_format(val) : val.toFixed(2)
              },
            },
          }, {
            opposite: true,
            title: {
              text: ''
            },
            labels: {
              show: false,
            },
          }]
        },
      }

    }
    return null;
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="line"
        height={410}
      />
    );
  }
}
export default GLPGrowthTrendsH;
