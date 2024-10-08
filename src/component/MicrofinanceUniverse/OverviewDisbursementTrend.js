import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../Unqiue/Common_func'
class OverviewDisbursementTrend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static getDerivedStateFromProps(props, state) {
    if (props.disbursementSeries !== state.series) {
      return {
        series: props.disbursementSeries,
        options: {
          chart: {
            height: 350,
            type: 'line',
           },
          toolbar: {
            show: true //Disable toolbar
          },
          stroke: {
            show: true,
            width: [3, 4],
          },
          title: {
            text: 'Disbursement Trend'
          },
          tooltip: {
            y: {
              formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
            },
          },
          colors: ["#2B60AD", "#39B1AC"],
          fill: {
            opacity: 1,
            colors: [
              '#2B60AD',
              '#39B1AC'
            ],
            type: 'solid',
          },
          plotOptions: {
            bar: {
              endingShape: "rounded",
              columnWidth: '50%',
              //borderRadius: 2,
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
              fontFamily: 'sans-serif',
              fontWeight: 500,
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
              //borderRadius: 2,
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
            //enabledOnSeries: [1]
          },
          labels: props.xaxis,
          xaxis: {
            categories: props.xaxis,
            labels: {
              show: true,
              hideOverlappingLabels: true,
              minHeight: 50,
              maxHeight: 50,
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
            fontSize: '15px',
            fontFamily: 'sans-serif',
            fontWeight: 500,
          },
          markers: {
            size: [4,4]
          },
          yaxis: [{
            title: {
              text: '',
            },
            labels: {
              show: false
            },

          }, {
            opposite: true,
            title: {
              text: ''
            },
            labels: {
              show: false
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
export default OverviewDisbursementTrend;
