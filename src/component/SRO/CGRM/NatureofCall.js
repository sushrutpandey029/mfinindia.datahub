import * as React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func';
class NatureofCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  static getDerivedStateFromProps(props, state) {
    if (props.NatureofCallSeries !== state.series) {
      return {
        series: props.NatureofCallSeries,
        options: {
          chart: {
            type: "bar",
            height: 650,
            stacked: true,
            toolbar: {
              show: true,
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "top",
                  offsetX: 0,
                  offsetY: 0,
                },
              },
            },
          ],
          fill: {
              opacity: 1,
              colors: [
                '#B853A0'
              ],
              type: 'solid',
            },
            stroke: {
              show: true,
              width: [4],
              colors: ["#B853A0"],
            },
          title: {
            text: "Nature of Call",
            align: "left",
          },
          noData: {
            text: "Loading...",
            align: "center",
            verticalAlign: "bottom",
            offsetX: 0,
            offsetY: 0,
            style: {
              color: "#000000",
              fontSize: "14px",
              fontFamily: "Helvetica",
            },
          },
          dataLabels: {
              enabled: true,
              //offsetX: 2,
              formatter: function (val, opt) {
                return val 
              },
              style: {
                fontSize: '15px',
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
              },
            },
          plotOptions: {
              bar: {
                endingShape: "rounded",
                columnWidth: '30%',
                //borderRadius: 2,
                dataLabels: {
                  orientation: 'vertical',
                  position: 'bottom',
                },
              },
            },
          xaxis: {
            //  type: 'datetime',
            categories: ["Query", "Complaint", "Total Call Recieved"],
            labels: {
              show: true,
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
            title: {},
            labels: {
              show: false,
              formatter: function (value) {
                return number_format(value);
              },
            },
          },
          legend: {
              position: "bottom",
              horizontalAlign: "center",
              fontFamily: 'sans-serif',
              fontSize: '15px',
              fontWeight: 500,
            },
            colors: ["#B853A0"],
            tooltip: {
              y: {
                formatter: (value) => { return number_format(value) },
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
        height={528}
      />
    );
  }
}
export default NatureofCall;
