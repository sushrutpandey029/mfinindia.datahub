import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class HRStaffDistribution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  static getDerivedStateFromProps(props, state) {
    if (props.hrStaffDistributionSeries !== state.series) {
      return {
        series: props.hrStaffDistributionSeries,
        options: {
          chart: {
            width: '100%',
            type: 'pie',
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
          tooltip: {
            y: {
              formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                return value.toFixed(2) + '%';
              }
            }
          },
          labels: props.hrStaffDistributionLabels,
          theme: {
            mode: 'light',
            palette: 'palette7',
            monochrome: {
              enabled: false,
              color: '#255aee',
              shadeTo: 'light',
              shadeIntensity: 0.65
            },
          },
          plotOptions: {
            pie: {
              dataLabels: {
                offset: -5
              }
            }
          },
          title: {
            text: props.hrStaffDistributionLatestMonth
          },
          dataLabels: {
            formatter(val, opts) {
              const name = opts.w.globals.labels[opts.seriesIndex]
              return [name, val.toFixed(2) + '%']
            }
          },
          legend: {
            show: false
          }
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
        type="pie"
        height={475}
      />
    );
  }
}
export default HRStaffDistribution;
