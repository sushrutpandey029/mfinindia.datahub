import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class TopMFIs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static getDerivedStateFromProps(props, state) {
    if (props.pTopTenMfiSerise !== state.series) {
      return {
        series: props.pTopTenMfiSerise,
        options: {
          chart: {
            type: 'bar',
            height: 430,
          },
          plotOptions: {
            bar: {
              endingShape: "rounded",
              columnWidth: '50%',
              borderRadius: 0,
              horizontal: true,
              dataLabels: {
                position: 'top',
              },
            }
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [2],
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
          tooltip: {
            y: {
              formatter: (value) => { return number_format(value) },
            },
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontSize: '15px',
            fontFamily: 'sans-serif',
            fontWeight: 500,
          },
          fill: {
            opacity: 1,
            colors: [
              '#39B1AC',
              '#B853A0',
              '#FDBF11'
            ],
            type: 'solid',
          },
          stroke: {
          show: true,
          width: [4, 4, 4],
          colors: ["#39B1AC", "#B853A0", "#FDBF11"]
          },
          colors: ["#39B1AC", "#B853A0", "#FDBF11"],
          title: {
            text: 'Top 10 MFIs, AUM (Rs Cr)'
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
            categories: props.pTopTenMfiLabels,
            labels: {
              show: false,
              rotate: 0,
              hideOverlappingLabels: true,
              minHeight: 30,
              maxHeight: 30,
              style: {
                fontSize: '15px',
                fontFamily: 'sans-serif',
                fontWeight: 500,
              },
              formatter: function (value) {
                return number_format(value);
              }
            },

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
        type="bar"
        height={450}
      />
    );
  }
}
export default TopMFIs;
