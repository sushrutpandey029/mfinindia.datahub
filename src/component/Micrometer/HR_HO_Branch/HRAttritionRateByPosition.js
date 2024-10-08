import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class HRAttritionRateByPosition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  static getDerivedStateFromProps(props, state) {
    if (props.hrAttritionRatePositionSeries !== state.series) {
      return {

        series: [{
          name: 'Attrition Rate by position',
          data: props.hrAttritionRatePositionSeries
        }],
        options: {
          chart: {
            height: 450,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              endingShape: "rounded",
              columnWidth: '20%',
              borderRadius: 2,
              dataLabels: {
                orientation: 'vertical',
                position: 'bottom',
              },
            },
          },
          toolbar: {
            show: true //Disable toolbar
          },
          dataLabels: {
            enabled: true,
            offsetX: 5,
            formatter: function (val, opt) {
              return val + "%"
            },
            style: {
              fontSize: '15px',
              fontFamily: 'sans-serif',
              fontWeight: 'bold'
            },
          },
          colors: ["#2B60AD"],
          fill: {
            opacity: 1,
            colors: [
              '#2B60AD'
            ],
            type: 'solid',
          },
          stroke: {
          show: true,
          width: [3],
          colors: ["#2B60AD"]
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontSize: '15px',
            fontFamily: 'sans-serif',
            fontWeight: 500,
          },
          xaxis: {
            categories: props.hrAttritionRatePositionLabels,
            position: 'bottom',
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
            tooltip: {
              enabled: true,
            }
          },
          yaxis: {
            labels: {
              show: false,
              formatter: function (val) {
                return val + "%";
              }
            }
  
          },
          title: {
            text: 'Attrition Rate by Position',
            offsetY: 0,
            align: 'left',
            style: {
              color: '#444'
            }
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
export default HRAttritionRateByPosition;
