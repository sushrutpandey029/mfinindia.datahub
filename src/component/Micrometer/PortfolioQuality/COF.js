import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class COF extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    if (props.pqComparisonSeries !== state.series) {
      console.log("props.pqComparisonSeries",props.pqComparisonSeries)
      return {
        series: props.pqComparisonSeries,
        options: {
          chart: {
            type: "line",
            toolbar: {
              show: true //Disable toolbar
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
              fontSize: '14px',
              fontFamily: "Helvetica"
            }
          },
          colors: ["#2B60AD", "#ED1590"],
          dataLabels: {
            enabled: true,
            formatter: function (val, opt) {
              return val > 100 ? number_format(val) : val.toFixed(2)
            },
            background: {
              enabled: true,
              foreColor: '#fff',
              borderRadius: 1,
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
            text: "Comparison of On and Off Balance Sheet PAR (%)",
            align: "left",
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              gradientToColors: ["#2B60AD", "#ED1590"],
              shadeIntensity: 1,
              type: "horizontal",
              opacityFrom: 1,
              opacityTo: 1,
              //stops: [0, 100],
            },
          },
          markers: {
            size: [4, 4]
          },
          xaxis: {
            categories: props.pqComparisonLables,
            title: {
              // text: "",
            },
            labels: {
              show: true,
              rotate: 0,
              offsetX: 3.6,
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
          yaxis: {
            text: "COF",
            style: {
              color: '#ffffff',
            },
            labels: {
              show: false,
            },
            //min: 0,
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
export default COF;
