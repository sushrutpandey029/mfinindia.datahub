import * as React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReactApexChart from "react-apexcharts";
import number_format from '../Unqiue/Common_func';
import Breadcrumb from "../common/Breadcrumb";
import DateFieldFilter from "./DateFieldFilter";
import { BaseUrl } from "../url/url";
import axios from "axios";
import authHeaders from "../Service/AuthHeaders";


class CustomUniversePAR extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        chart: {
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: 'rounded',
            dataLabels: {
              orientation: 'vertical',
              position: 'center',
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + " %"
          }
        },
        toolbar: {
          show: true //Disable toolbar
        },
        stroke: {
          show: true,
          width: 4,
          colors: ['transparent']
        },
        title: {
          text: 'Universe PAR : Top 20 States'
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
        colors: ["#DA7007", "#A9A8A7", "#0713AD"],
        xaxis: {
          categories: [],
          labels: {
            show: true,
            //rotate: -90,
            // rotateAlways: true,
            hideOverlappingLabels: true,
            minHeight: 50,
            maxHeight: 50,
            style: {
              fontSize: '14px',
              fontFamily: 'Roboto',
              fontWeight: 800,
            },
          },
        },
        yaxis: {
          title: {
            text: ''
          },
          labels: {
            formatter: function (value) {
              return value + " %"
            },
          },
        },
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          //fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 600,
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " %"
            }
          }
        }
      },
      commonState: {
        isLoader: false,
        isDisabled: false,
        fromMonth: "Aug-2018",
        toMonth: "Mar-2019"
      }


    };
  }
  filterGraphRecord = async (childData) => {
    this.setState(
      prevState => ({
        commonState: {
          isLoader: true,
          isDisabled: true,
          fromMonth: childData.fromMonth,
          toMonth: childData.toMonth
        },

      })
    );
    await this.getParTopTwentyPortfolioGraphData(childData.fromMonth, childData.toMonth)
    this.setState(
      prevState => ({
        commonState: {
          ...prevState.commonState,
          isLoader: false,
          isDisabled: false,
        },

      })
    );
  }
  getParTopTwentyPortfolioGraphData = async (startMonth = 0, endMonth = 0) => {
    const api = `api/auth/customUniverseParTopTwentyStates?fromMonth=${startMonth}&toMonth=${endMonth}`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      this.setState(prevState => ({
        series: response.data.data.series,
        options: {
          ...prevState.options,
          labels: response.data.data.labels,
          xaxis: {
            categories: response.data.data.labels,
          }

        }
      }))
    }).catch((error) => {
      console.log('err', error)
    });
  }
  getLatestMonths = async () => {
    const api = 'api/auth/latest-eight-month-month-year?limit=12';
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      const startMonth = response.data.data.startMonth;
      const endMonth = response.data.data.endMonth;
      this.setState(
        prevState => ({
          commonState: {
            ...prevState.commonState,
            fromMonth: startMonth,
            toMonth: endMonth
          },
        })
      );
      this.getParTopTwentyPortfolioGraphData(startMonth, endMonth);
    }).catch((error) => {
      console.log('latest month err', error);
    })
  }
  componentDidMount() {
    this.getLatestMonths();
  }
  render() {
    return (
      <>
        <Box sx={{ flexGrow: 1 }} mt={10}>
          <Breadcrumb title="Universe PAR : Top 20 States" secondTitle="Custom Report" secondUrl="/customize-report" second={true} icon={AssessmentIcon} />
          <Grid container spacing={2} mt={2}>

            {/* Date Filter Component Start from here */}
            <DateFieldFilter sendStartEndDate={this.filterGraphRecord} commonState={this.state.commonState} />
            {/* Date Filter Component End here */}
            <Grid xs={12} sm={12} md={12}>
              <Card style={{ paddingBottom: "20px" }}>
                <CardActionArea>
                  <CardContent>
                    <ReactApexChart
                      options={this.state.options}
                      series={this.state.series}
                      type="bar"
                      height={530}
                    />
                  </CardContent>
                </CardActionArea>
              </Card>

            </Grid>


          </Grid>
        </Box>
      </>
    );
  }
}
export default CustomUniversePAR;
