import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class PortfolioRisk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  static getDerivedStateFromProps(props, state) {
    if (props.pqPortfolioRiskSeries !== state.series) {
      return {
        series: props.pqPortfolioRiskSeries,
        options: {
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
            y: {
              formatter: function (val, opt) {
                return val.toFixed(2) + "%"
              },
            },
          },
          plotOptions: {
            bar: {
              endingShape: "rounded",
              columnWidth: '50%',
              borderRadius: 0,
              dataLabels: {
                orientation: 'vertical',
                position: 'bottom',
              },
            },
          },
          fill: {
            opacity: 1,
            colors: [
              '#39B1AC',
              '#FDBF11',
              '#BD1E22',
              '#69AB44'
            ],
            type: 'solid',
          },
          colors: ["#39B1AC", "#FDBF11", "#BD1E22", "#69AB44"],
          stroke: {
            show: true,
            width: [8, 8, 8, 8],
            colors: ["#39B1AC", "#FDBF11", "#BD1E22", "#69AB44"]
          },
          title: {
            text: 'Portfolio at risk (%)'
          },
          toolbar: {
            show: true //Disable toolbar
          },
          dataLabels: {
            enabled: true,
            offsetX: 5,
            formatter: function (val, opt) {
              return val.toFixed(2) + "%"
            },
            style: {
              fontSize: '15px',
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
            },
          },
          labels: props.pqPortfolioRiskLables,
          xaxis: {
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
          yaxis: [{
            title: {
              text: '',
            },
            labels: {
              show: false,
            },
          }],
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
        type="bar"
        height={450}
      />
    );
  }
}
export default PortfolioRisk;
