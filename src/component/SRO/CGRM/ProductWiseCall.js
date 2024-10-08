import * as React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func';
class ProductWiseCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  static getDerivedStateFromProps(props, state) {
    if (props.ProductWiseCallVolumeSeries !== state.series) {
      return {
        series: props.ProductWiseCallVolumeSeries,
        options: {
          chart: {
            type: 'bar',
            height: 350,
            stacked: false,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          fill: {
              opacity: 1,
              colors: [
                "#2B60AD",
                "#39B1AC"
              ],
              type: 'solid',
            },
            stroke: {
              show: true,
              width: [4, 4],
              colors: ["#2B60AD", "#39B1AC"],
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
                return val+'%' 
              },
              style: {
                fontSize: '15px',
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
              },
            },
          title: {
              text: "Product Wise Call Volume",
              align: "left",
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
            categories: ['INS', 'Loan', 'TPP', 'Other'
            ],
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
            colors: ["#2B60AD", "#39B1AC"],
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
export default ProductWiseCall;
