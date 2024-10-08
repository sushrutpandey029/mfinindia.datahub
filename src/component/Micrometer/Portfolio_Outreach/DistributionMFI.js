import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
import { BaseUrl, GlpGrowthTrendsApi } from "../../url/url";
import axios from "axios";
import authHeaders from "../../Service/AuthHeaders";

class DistributionMFI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    if (props.GetSeries !== state.series) {
      return {
        series: props.GetSeries,
        options: {
          chart: {
            width: 480,
            type: 'donut',
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
          plotOptions: {
            pie: {
              startAngle: -90,
              endAngle: 270
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            formatter: function(val, opts) {
              return val + " : " + opts.w.globals.series[opts.seriesIndex]
            },
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 500,
          },
          title: {
            text: 'Distribution of MFIs as per size - '+props.GetDatelabels
          },
          labels: props.Getlabels,
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
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
        type="donut"
        height={500}
      />
    );
  }
}
export default DistributionMFI;