import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class Disbursement extends React.Component {
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
            stacked: true,
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
          animations: {
            enabled: true,
          },
          tooltip: {
            x: {
              format: "MMM yyyy"
            }
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
          toolbar: {
            show: true //Disable toolbar
          },
          colors: ["#2B60AD", "#ED1590"],
          fill: {
            opacity: 1,
            colors: [
              '#2B60AD',
              '#ED1590'
            ],
            type: 'solid',
          },
          stroke: {
          show: true,
          width: [3, 4],
          colors: ["#2B60AD", "#ED1590"]
          },
          title: {
            text: 'Disbursement'
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
              return val > 100 ? number_format(val) : val
            },
            background: {
              enabled: true,
              foreColor: '#fff',
             // borderRadius: 2,
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
          labels: props.labels,
          xaxis: {
            //type: 'datetime'
            labels: {
              show: true,
              // rotate: -90,
              rotate : 0,
              hideOverlappingLabels: true,
              minHeight: 120,
              maxHeight: 120,
              minHeight: 30,
              maxHeight: 50,
              style: {
                fontSize: '10px',
                fontFamily: 'sans-serif',
                fontWeight: 500,
                fontWeight:"bold"
              },
            },
          },
          yaxis: [{
            title: {
              text: '',
            },
            labels: {
              show: false,
              formatter: function (value) {
                return number_format(value);
              }
            },
          }, {
            opposite: true,
            title: {
              text: ''
            },
            labels: {
              show: false,
              formatter: function (value) {
                return number_format(value);
              }
            },
          }]
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
        height={450}
      />
    );
  }
}
export default Disbursement;
