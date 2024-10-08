import * as React from "react";
import ReactApexChart from "react-apexcharts";
class ParBucketAnalysis extends React.Component {
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
          colors: ["#BD1E22", "#B853A0", "#39B1AC"],
          dataLabels: {
            enabled: true,
            offsetX: -3,
            formatter: function (value) {
              return value;
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
            width: [4, 4, 4],
            colors: ["#BD1E22", "#B853A0", "#39B1AC"]
            },
          title: {
            text: "PAR Bucket (%)",
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
          markers: {
            size: [4]
          },
          xaxis: {
            categories: props.parLabels,
            title: {
              // text: "",
            },
            //type: 'datetime',
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
          yaxis: {
            title: {
              //text: "Number of records",
            },
            labels: {
              show: false,
              formatter: function (value) {
                return value;
              }
            },
           // min: 0,
            //max: 20,
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 500,
          },
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
export default ParBucketAnalysis;
