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
import DateFieldFilterWithEntities from "./DateFieldFilterWithEntities";
import axios from "axios";
import authHeaders from "../Service/AuthHeaders";

class CustomDisbursementAmount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [{
        name: 'Disbursement Amount (Rs Cr)',
        type: 'bar',
        data: []
      },
      {
        name: 'Disbursement Accounts (Lk)',
        type: 'line',
        data: []
      }
    ],
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
        title: {
          text:[],
          //text: 'Disbursement Amount (Rs Lk)'
        },
        tooltip: {
          y: {
            formatter: (value) => { return number_format(value) },
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
            colors: ["#000000"],
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
        colors: ["#39B1AC","#ED1590"],
        fill: {
          opacity: 1,
          colors: [
            '#39B1AC',
            "#ED1590"
          ],
          type: 'solid',
        },
        stroke: {
        show: true,
        width: [4,4],
        colors: ["#39B1AC","#ED1590"]
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
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          fontFamily: 'sans-serif',
          fontSize: '15px',
          fontWeight: 500,
        },
        yaxis: [{
          title: {
            text: '',
          },
          labels: {
            show: false,
            formatter: function (value) {
              return value > 100 ? number_format(value) : value.toFixed(2);
            },
          },
        }, {
          opposite: true,
          title: {
            text: ''
          },
          labels: {
            show: false,
            formatter: function (value) {
              return value > 100 ? number_format(value) : value.toFixed(2);
            }
          },
        }]
      },
      commonState: {
        isLoader: false,
        isDisabled: false,
        fromMonth: "Aug-2018",
        toMonth: "Jan-2025",
        entities: "Universe"
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
          toMonth: childData.toMonth,
          entities: childData.entities
        },

      })
    );
    await this.getDisbursementAmountGraphData(childData.fromMonth, childData.toMonth, childData.entities)
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
  getDisbursementAmountGraphData = async (startMonth, endMonth, entities='Universe') => {
    const api = `${GlpGrowthTrendsApi}?entities=${entities}&fromMonth=${startMonth}&toMonth=${endMonth}&limit=12`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      const xaxis = [];
      const loanAmountDisbursed = [];
      const loanAccountsDisbursed = [];
      const entitiesShow = [];
      response.data.data.map((v, i) => {
        xaxis.push(v.Month);
        loanAmountDisbursed.push(v.loanAmountDisbursed);
        loanAccountsDisbursed.push(v.loanAccountsDisbursed);
      });
      entitiesShow.push(response.data.entities);
      this.setState(prevState => ({
        series: [
          {
            name: 'Disbursement Amount (Rs Cr)',
            type: 'bar',
            data: loanAmountDisbursed
        },
        {
          name: 'Disbursement Accounts (Lk)',
          type: 'line',
          data: loanAccountsDisbursed
      }
        ],
        options: {
          ...prevState.options,
          labels: [xaxis],
          title: {
            text: "Disbursement Amount (Rs Cr) and Account (Lk) : "+ entitiesShow,
            align: "left",
          },
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
            toMonth: endMonth,
            entities:"Universe"
          },
        })
      );
      this.getDisbursementAmountGraphData(startMonth, endMonth);
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
          <Breadcrumb title="Disbursement Amount" secondTitle="Custom Report" secondUrl="/customize-report" second={true} icon={AssessmentIcon} />
          <Grid container spacing={2} mt={2}>
                      {/* Date Filter Component Start from here */}
                      <DateFieldFilterWithEntities sendStartEndDate={this.filterGraphRecord} commonState={this.state.commonState} /> 
            {/* Date Filter Component End here */}
            <Grid xs={12} sm={12} md={12}>
              <Card style={{ paddingBottom: "20px" }}>
                <CardActionArea>
                  <CardContent>
                    <ReactApexChart
                      options={this.state.options}
                      series={this.state.series}
                      type="bar"
                      height={680}
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
export default CustomDisbursementAmount;
