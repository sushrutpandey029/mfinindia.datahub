import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
import { BaseUrl, GlpGrowthTrendsApi } from "../../url/url";
import axios from "axios";
import authHeaders from "../../Service/AuthHeaders";
class MicroCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    if (props.pieMicroOutsSeries !== state.series) {
      return {
        series: props.pieMicroOutsSeries,
        options: {
          chart: {
            width: 380,
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
              fontFamily: 'sans-serif',
              fontSize: '15px',
              fontWeight: 500,
            }
          },
          tooltip: {
            y: {
              formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                return value.toFixed(1) + '%';
              }
            }
          },
          labels: props.pieMicroOutsLabels,
          colors: ['#39B1AC', '#2B60AD', '#FDBF11', '#B853A0', '#BD1E22'], // Custom colors
          theme: {
            mode: 'light',
            palette: 'palette5',
          },
          stroke: {
            curve: 'smooth',
            // OR provide an array
            curve: ['smooth', 'straight', 'stepline']
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            floating: false,
            offsetX: 0,
            offsetY: 0,
            fontWeight: 500
          },
          plotOptions: {
            pie: {
              dataLabels: {
                offset: -5
              }
            }
          },
          title: {
            text: props.pieMicroOutsTitle
          },
          dataLabels: {
            formatter(val, opts) {
              const name = opts.w.globals.labels[opts.seriesIndex]
              return [name, val.toFixed(1) + '%']
            }
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
        type="pie"
        height={490}
      />
    );
  }
}
export default MicroCredit;
