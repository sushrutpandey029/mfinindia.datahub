import * as React from "react";
import ReactApexChart from "react-apexcharts";

class ParAnalysis extends React.Component {
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
          colors: ["#ED1590", "#2B60AD", "#69AB44"],
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
            colors: ["#ED1590", "#2B60AD", "#69AB44"]
            },
          title: {
            text: "PAR (%)",
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
              fontSize: '14px',
              fontFamily: "Helvetica"
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
export default ParAnalysis;
