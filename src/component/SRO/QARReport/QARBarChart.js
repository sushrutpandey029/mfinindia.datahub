import * as React from "react";
import {
  Card,
  CardContent,
  CardActionArea
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func';
class QARBarChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }
  
  static getDerivedStateFromProps(props, state) {
    if (props.QARStatusACQarterSeries !== state.series) {
      return {
        series:props.QARStatusACQarterSeries,
        options: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              //borderRadius: 10,
              columnWidth: '30%',
              dataLabels: {
                total: {
                  enabled: false,
                  style: {
                    fontSize: '13px',
                    fontFamily: "sans-serif",
                    fontWeight: 500
                  }
                },
              }
            },
          },
          dataLabels: {
            formatter: (val) => {
              return val.toFixed(0) + '%'
            },
            style: {
              fontSize: '13px',
              colors: ['#000000'],
              fontWeight: 500,
              fontFamily: "sans-serif"
            }
          },
          xaxis: {
            //  type: 'datetime',
            categories: props.QARStatusACQarterlabels,
           
          },
          yaxis: {
            title: {
            },
            labels: {
              show:false,
              formatter: function (value) {
                return number_format(value);
              }
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
            opacity: 1
          }
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
        height={528}
      />
    );
  }
}
export default QARBarChart;
