import * as React from "react";
import {
  Card,
  CardContent,
  CardActionArea
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func';
class QARPieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  static getDerivedStateFromProps(props, state) {
    if (props.QARBucketMeetingSeries !== state.series) {
      return {
        series: props.QARBucketMeetingSeries,
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          title: {
              text: props.QARBucketMeetingmonthYear
            },
          labels: props.QARBucketMeetinglabels,
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
        type="pie"
        height={528}
      />
    );
  }
}
export default QARPieChart;
