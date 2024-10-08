import * as React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReactApexChart from "react-apexcharts";
import number_format from '../Unqiue/Common_func';
import Breadcrumb from "../common/Breadcrumb";
import DateFieldFilter from "./DateFieldFilter";
import { BaseUrl, GlpGrowthTrendsApi } from "../url/url";
import axios from "axios";
import authHeaders from "../Service/AuthHeaders";

class CustomDisbursementAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [{
        name: 'Disbursement Account',
        type: 'bar',
        data: []
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350,
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
        toolbar: {
          show: true //Disable toolbar
        },
        stroke: {
          width: [1]
        },
        title: {
          text: 'Disbursement Account'
        },
        tooltip: {
          y: {
            formatter: (value) => { return value.toFixed(2) },
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: 5,
          formatter: function (val, opt) {
            return val > 100 ? number_format(val) : val.toFixed(2)
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
            borderRadius: 2,
            dataLabels: {
              orientation: 'vertical',
              position: 'bottom',
            },
          },
        },
        colors: ["#2B60AD"],
        fill: {
          opacity: 1,
          colors: [
            '#2B60AD'
          ],
          type: 'solid',
        },
        stroke: {
        show: true,
        width: [4],
        colors: ["#2B60AD"]
        },
        labels: [],
        xaxis: {
          //type: 'datetime',
          labels: {
            show: true,
            //rotate: -90,
            // rotateAlways: true,
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
        yaxis: [{
          title: {
            text: '',
          },
          labels: {
            show:false,
            formatter: function (value) {
              return number_format(value);
            },
          },
        }]
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
    await this.getDisbursementAccountGraphData(childData.fromMonth, childData.toMonth)
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
  getDisbursementAccountGraphData = async (startMonth, endMonth) => {
    const api = `${GlpGrowthTrendsApi}?fromMonth=${startMonth}&toMonth=${endMonth}`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      const xaxis = [];
      const loanAccountsDisbursed = [];
      response.data.data.map((v, i) => {
        xaxis.push(v.Month);
        loanAccountsDisbursed.push(v.loanAccountsDisbursed);
      });
      this.setState(prevState => ({
        series: [
          {
            name: 'Disbursement Account',
            type: 'bar',
            data: loanAccountsDisbursed
        }
        ],
        options: {
          ...prevState.options,
          labels: [xaxis],
          xaxis: {
            categories: xaxis,
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
      this.getDisbursementAccountGraphData(startMonth, endMonth);
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
          <Breadcrumb title="Disbursement Account" secondTitle="Custom Report" secondUrl="/customize-report" second={true} icon={AssessmentIcon} />
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
export default CustomDisbursementAccount;
