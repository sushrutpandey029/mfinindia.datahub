import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class BranchNetwork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static getDerivedStateFromProps(props, state) {
    if (props.branchSeries !== state.series) {
      return {
        series: props.branchSeries,
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
              fontSize: '14px',
              fontFamily: "Helvetica"
            }
          },
          tooltip: {
            x: {
              format: "MMM yyyy"
            },
            y: {
              formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
            },
          },
          plotOptions: {
            bar: {
              endingShape: "rounded",
              columnWidth: '50%',
             // borderRadius: 2,
              dataLabels: {
                orientation: 'vertical',
                position: 'bottom',
              },
            },
          },
          toolbar: {
            show: true //Disable toolbar
          },
          fill: {
            opacity: 1,
            colors: [
              '#B853A0',
              '#69AB44'
            ],
            type: 'solid',
          },
          colors: ["#B853A0", "#69AB44"],
          stroke: {
            show: true,
            width: [3, 4],
            colors: ["#B853A0", "#69AB44"]
          },
          title: {
            text: 'Branch Network'
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
            offsetX: 2,
            formatter: function (val, opt) {
              return val > 100 ? number_format(val) : val.toFixed(2)
            },
            background: {
              enabled: true,
              foreColor: '#fff',
              //borderRadius: 2,
              padding: 1,
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
          labels: props.branchLabels,
          xaxis: {
            labels: {
              show: true,
              rotate: -90,
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
          yaxis: [{
            title: {
              text: '',
            },
            labels: {
              show:false,
              formatter: function (value) {
                return value > 100 ? number_format(value) : value.toFixed(2);
              }
            },
          }, {
            opposite: true,
            title: {
              text: ''
            },
            labels: {
              show:false,
              },
          }]
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
export default BranchNetwork;
