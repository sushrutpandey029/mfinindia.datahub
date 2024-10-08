import * as React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func';


class CBDataAcceptanceIndustryGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    if (props.iDataSubmissionSeries !== state.series) {
      return {
        series: props.iDataSubmissionSeries,
        options: {
          chart: {
            //height: 350,
            type: "line",
          },
          colors: ["#69AB44", "#ED1590"],
          tooltip: {
              y: {
                formatter: (value) => { return value },
              },              
            },
            dataLabels: {
              enabled: true,
             // offsetY: -5,
              formatter: function (val, opt) {
                return val > 100 ? val.toFixed(2) : val.toFixed(2)
              },
              background: {
                enabled: true,
                foreColor: '#fff',
                borderRadius: 2,
                padding: 4,
                opacity: 0.9,
                borderWidth: 0,
                borderColor: '#fff'
              },
              style: {
                fontSize: '15px',
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
              },
            },
            stroke: {
              show: true,
              width: [4, 4],
              colors: ["#69AB44", "#ED1590"]
            },
            markers: {
              size: [4]
            },
          title: {
            text: "Data Submission count and acceptance – Industry",
            align: "left",
          },
          noData: {
            text: "Loading...",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              fontSize: '15px',
              fontFamily: 'sans-serif',
              fontWeight: 500,
            }
          },
          xaxis: {
            categories: props.iDataSubmissionLabels,
            title: {
             // text: "",
            },
            //type: 'datetime',
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
          yaxis: {
            title: {
              text: "Number of records",
              style: {
                color: 'white',
              },
            },
            labels: {
              show: false,
              formatter: function (value) {
                return value;
              }
            },
          },
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
      <>
   
        <Card style={{paddingBottom:"20px"}}>
      <CardActionArea>         
        <CardContent>
        <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="line"
        height={450}
      />
      </CardContent>
      </CardActionArea>
      </Card>

      </>
    );
  }
}
export default CBDataAcceptanceIndustryGraph;
