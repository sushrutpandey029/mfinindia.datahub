import * as React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  CardActionArea
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func';
class CBDataAcceptanceMemberGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    if (props.mDataSubmissionSeries !== state.series) {
      return {
        series: props.mDataSubmissionSeries,
        options: {
          chart: {
            //height: 350,
            type: "line",
          },
          colors: ["#083EC1", "#E3800A"],
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
          title: {
            text: "Data submission count and acceptance rate - Member",
            align: "left",
          },
          subtitle: {
            text: props.memberName,
            align: "left",
            style: {
              fontSize: '15px',
              fontFamily: 'sans-serif',
              fontWeight: 500,
            },
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
          xaxis: {
            categories: props.mDataSubmissionLabels,
            title: {
            },
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

        <Card style={{ paddingBottom: "20px" }}>
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
export default CBDataAcceptanceMemberGraph;
