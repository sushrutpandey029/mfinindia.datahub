import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../Unqiue/Common_func'
class OverviewPARBucketAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static getDerivedStateFromProps(props, state) {
    if (props.parBucketAnalysisSeries !== state.series) {
      return {
        series: props.parBucketAnalysisSeries,
        options: {
          chart: {
            height: 350,
            type: "line",
            toolbar: {
              show: true //Disable toolbar
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              gradientToColors: ["#BD1E22", "#2B60AD", "#39B1AC", "#26E7A6"],
              shadeIntensity: 1,
              type: "horizontal",
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100, 100, 100],
            },
          },
          colors: ["#BD1E22", "#2B60AD", "#39B1AC", "#26E7A6"],
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
            colors: ["#BD1E22", "#2B60AD", "#39B1AC", "#FDBF11"]
          },
          title: {
            text: "PAR Bucket Analysis (%)",
            align: "left",
          },
          markers: {
            size: [4, 4, 4, 4]
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
              fontWeight: 500,
            }
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
        height={370}
      />
    );
  }
}
export default OverviewPARBucketAnalysis;
