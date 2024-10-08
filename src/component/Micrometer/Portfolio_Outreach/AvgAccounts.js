import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class AvgAccounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  static getDerivedStateFromProps(props, state) {
    if (props.pAverageLoanDisbursementSeries !== state.series) {
      return {
        series: props.pAverageLoanDisbursementSeries,
        options: {
          chart: {
            height: 350,
            tooltip: {
              y: {
                formatter: (value) => { return number_format(value) },
              },
            },
            type: "line",
            toolbar: {
              show: true //Disable toolbar
            },
          },
          colors: ["#2B60AD", "#ED1590"],
          dataLabels: {
            enabled: true,
            offsetX: 1,
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
          stroke: {
            show: true,
            width: [4, 4],
            colors: ["#2B60AD", "#ED1590"]
          },
          title: {
            text: "Avg loan O/S and disbursement per accounts",
            align: "left",
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
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              gradientToColors: ["#2B60AD", "#ED1590"],
              shadeIntensity: 1,
              type: "horizontal",
              opacityFrom: 1,
              opacityTo: 1
            },
          },
          markers: {
            size: [4, 4]
          },
          xaxis: {
            categories: props.pAverageLoanDisbursementLables,
            title: {
              // text: "",
            },
            labels: {
              show: true,
              rotate: 0,
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
          yaxis: {
            title: {
              text: "Avg loans",
              style: {
                color: '#ffffff',
              }
            },
            labels: {
              show: false,
              formatter: function (value) {
                return number_format(value);
              }
            },
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 500,
          },
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
export default AvgAccounts;
