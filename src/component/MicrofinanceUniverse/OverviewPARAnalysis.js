import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../Unqiue/Common_func'
class OverviewPARAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static getDerivedStateFromProps(props, state) {
    if (props.parAnalysisSeries !== state.series) {
      return {
        series: props.parAnalysisSeries,
        options: {
          chart: {
            height: 350,
            type: "line",
            toolbar: {
              show: true //Disable toolbar
            },
          },
          colors: ["#2B60AD", "#ED1590", "#69AB44", "#FDBF11"],
          dataLabels: {
            enabled: true,
            offsetY: -5.5,
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
          stroke: {
            show: true,
            width: [4, 4, 4, 4],
            colors: ["#2B60AD", "#ED1590", "#69AB44", "#FDBF11"]
          },
          title: {
            text: "PAR Analysis (%)",
            align: "left",
          },
          tooltip: {
            y: {
              formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
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
              fontWeight: 'bold',
            }
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              gradientToColors: ["#2B60AD", "#ED1590", "#69AB44", "#FDBF11"],
              shadeIntensity: 1,
              type: "horizontal",
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100, 100, 100],
            },
          },
          markers: {
            size: [4, 4, 4, 4]
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
          yaxis: {
            title: {
              text: "Number of records",
              style: {
                color: 'white',
              },
            },
            labels: {
              show: false,
              formatter: function (val) {
                return val > 100 ? number_format(val) : val.toFixed(2);
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
        }
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
export default OverviewPARAnalysis;
