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
import DateFieldFilterWithEntities from "./DateFieldFilterWithEntities";
class CustomUniversePortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {
        chart: {
          stacked: false,
          type: 'line',
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
        fill: {
          opacity: 1,
          colors: [
            '#39B1AC',
            '#2B60AD'
          ],
          type: 'solid',
        },
        stroke: {
        show: true,
        width: [3, 4, 6],
        colors: ["#39B1AC", "#2B60AD", "#ED1590"]
        },
        title: {
          text:[],
          //text: 'Universe Portfolio: Top 20 States'
        },
        tooltip: {
          y: {
            formatter: (value) => { return number_format(value) },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: 2,
          formatter: function (val, opt) {
            return val > 100 ? number_format(val) : val.toFixed(2)
          },
          background: {
            enabled: true,
            foreColor: '#fff',
            borderRadius: 2,
            padding: 2,
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
        plotOptions: {
          bar: {
            endingShape: "rounded",
            columnWidth: '50%',
            borderRadius: 2,
            dataLabels: {
              orientation: 'vertical',
              position: 'bottom',
            },
          },
        },
        colors: ["#39B1AC", "#2B60AD", "#ED1590"],
        labels: [],
        xaxis: {
          // type: 'datetime',
          labels: {
            show: true,
            //rotate: -90,
            // rotateAlways: true,
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
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          fontFamily: 'sans-serif',
          fontSize: '15px',
          fontWeight: 500,
        },
        markers: {
          size: [4]
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
        }, {
          opposite: true,
          title: {
            text: ''
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
        toMonth: "Mar-2019",
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
    await this.getTopTwentyPortfolioGraphData(childData.fromMonth, childData.toMonth, childData.entities)
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
  getTopTwentyPortfolioGraphData = async (startMonth=0, endMonth=0, entities='Universe') => {
    const api = `api/auth/outreach-portfolio-top-ten-states-graph-data?entities=${entities}&numberOfStates=20&fromMonth=${startMonth}&toMonth=${endMonth}`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      this.setState(prevState => ({
        series: response.data.data.series,
        options: {
          ...prevState.options,
          labels: response.data.data.labels,
          title: {
            text: response.data.entities+' Portfolio : Top 20 States'
          },
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
            toMonth: endMonth,
            entities:"Universe"
          },
        })
      );
      this.getTopTwentyPortfolioGraphData(startMonth, endMonth);
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
          <Breadcrumb title="Universe Portfolio : Top 20 States" secondTitle="Custom Report" secondUrl="/customize-report" second={true} icon={AssessmentIcon} />
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
                      type="line"
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
export default CustomUniversePortfolio;
