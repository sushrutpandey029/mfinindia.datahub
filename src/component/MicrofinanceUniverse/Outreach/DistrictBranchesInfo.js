import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class DistrictBranchesInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.dbInfoSeries !== state.series) {
      return {
        series: props.dbInfoSeries,
        options: {
          chart: {
            height: 350,
            type: 'line',
          },
          noData: {
            text: "Loading...",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: "#000000",
              fontFamily: 'sans-serif',
              fontSize: '15px',
              fontWeight: 500,
            }
          },
          toolbar: {
            show: true //Disable toolbar
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
          colors: ["#ED1590", "#69AB44"],
          fill: {
            opacity: 1,
            colors: [
              '#ED1590',
              '#69AB44'
            ],
            type: 'solid',
          },
          stroke: {
          show: true,
          width: [3, 0],
          colors: ["white"]
          },
          title: {
            text: 'Number of Districts and Branches covered'
          },
          tooltip: {
            y: {
              formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
            },
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
          },
          markers: {
            size: [4]
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 500,
          },
          labels: props.dbInfoOptionsLabel,
          xaxis: {
            categories: props.dbInfoOptionsLabel,        
            // type: 'datetime',
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
          yaxis: [{
            title: {
              text: '',
            },
            labels: {
              show: false,
            },
          }, {
            opposite: true,
            labels: {
              show: false,
              },
            title: {
              text: ''
            }
          }]
        },
      }

    }
    return null; // No change to state
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
export default DistrictBranchesInfo;
