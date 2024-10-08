import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class TopStateGLP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  static getDerivedStateFromProps(props, state) {
    if (props.pqTopStateGLPSeries !== state.series) {
      return {
        series: props.pqTopStateGLPSeries,
        options: {
          chart: {
            type: 'bar',
            height: 430,
          },
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                position: 'top',
              },
            }
          },
          tooltip: {
            y: {
              formatter: (value) => { return number_format(value) },
            },
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 500,
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [0],
            textAnchor: 'end',
            offsetX: 80,
            offsetY: 0,
            formatter: function (val, opt) {
              return val > 100 ? number_format(val) : val.toFixed(2)
            },
            background: {
              enabled: true,
              foreColor: '#000',
              borderRadius: 0,
              padding: 4,
              opacity: 0.9,
              borderWidth: 0,
              borderColor: '#fff'
            },
            style: {
              fontSize: '15px',
              colors: ["#fff"],
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
            },
          },
          toolbar: {
            show: true //Disable toolbar
          },
          fill: {
            opacity: 1,
            colors: [
              '#2B60AD',
              '#FDBF11'
            ],
            type: 'solid',
          },
          stroke: {
            show: true,
            width: [4, 4],
            colors: ["#2B60AD", "#FDBF11"]
          },
          colors: ["#2B60AD", "#FDBF11"],
          title: {
            text: 'Top 10 State in terms of AUM (Rs Cr)'
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
          xaxis: {
            categories: props.pqTopStateGLPLabels,
            labels: {
              formatter: function (value) {
                return number_format(value);
              },
              show: false,
              rotate: 0,
              hideOverlappingLabels: true,
              minHeight: 50,
              maxHeight: 50,
              style: {
                fontFamily: 'sans-serif',
                fontSize: '15px',
                fontWeight: 500,
              }
            },
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
        type="bar"
        height={450}
      />
    );
  }
}
export default TopStateGLP;
