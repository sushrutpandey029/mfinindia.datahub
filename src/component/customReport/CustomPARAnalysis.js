import * as React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReactApexChart from "react-apexcharts";
import Breadcrumb from "../common/Breadcrumb";
import DateFieldFilterWithEntities from "./DateFieldFilterWithEntities";
import { BaseUrl, GlpGrowthTrendsApi } from "../url/url";
import axios from "axios";
import authHeaders from "../Service/AuthHeaders";
import number_format from '../Unqiue/Common_func'
class CustomPARAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: "PAR > 30",
          data: []
        },
        {
          name: "PAR > 60",
          data: []
        },
        {
          name: "PAR > 90",
          data: []
        },
        {
          name: "PAR > 180",
          data: []
        }
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          toolbar: {
            show: true //Disable toolbar
          },
        },
        colors: ["#2B60AD", "#ED1590", "#69AB44", "#FDBF11"],
        tooltip: {
          y: {
            formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: -5.5,
          formatter: function (val, opt) {
            return val > 100 ? number_format(val) : val.toFixed(2)
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
          width: [4, 4, 4, 4],
          colors: ["#2B60AD", "#ED1590", "#69AB44", "#FDBF11"]
        },
        title: {
          text:[],
          //text: "PAR (%)",
          align: "left",
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
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#2B60AD", "#ED1590", "#69AB44", "#FDBF11"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100],
          },
        },
        markers: {
          size: [4, 4, 4, 4]
        },
        xaxis: {
          categories: [],
          title: {
            // text: "",
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
        legend: {
                position: "bottom",
                fontFamily: 'sans-serif',
                fontSize: '15px',
                fontWeight: 500,
              },
        yaxis: {
          title: {
            text: "Space remove",
            style: {
              color: "#fff",
            }
          },
          labels: {
            show:false,
            formatter: function (value) {
              return value.toFixed(1) + '%';
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
    await this.getParAnalysisGraphData(childData.fromMonth, childData.toMonth, childData.entities)
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
  getParAnalysisGraphData = async (startMonth, endMonth, entities='Universe') => {
    const api = `${GlpGrowthTrendsApi}?entities=${entities}&fromMonth=${startMonth}&toMonth=${endMonth}&limit=12`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      const parGreaterThan30 = [];
      const parGreaterThan60 = [];
      const parGreaterThan90 = [];
      const parGreaterThan180 = [];
      const xaxis = [];
      const entitiesShow = [];
      response.data.data.map((v, i) => {
        parGreaterThan30.push(v.parGreaterThan30);
        parGreaterThan60.push(v.parGreaterThan60);
        parGreaterThan90.push(v.parGreaterThan90);
        parGreaterThan180.push(v.parGreaterThan180);
        xaxis.push(v.Month);
        
      });
      entitiesShow.push(response.data.entities);
      this.setState(prevState => ({
        series: [
          {
            name: "PAR >30",
            data: parGreaterThan30
          },
          {
            name: "PAR >60",
            data: parGreaterThan60
          },
          {
            name: "PAR >90",
            data: parGreaterThan90
          },
          {
            name: "PAR >180",
            data: parGreaterThan180
          }
        ],
        options: {
          ...prevState.options,
          labels: [xaxis],
          title: {
            text: "PAR (%) : "+ entitiesShow,
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
      this.getParAnalysisGraphData(startMonth, endMonth);
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
          <Breadcrumb title="PAR (%)" secondTitle="Custom Report" secondUrl="/customize-report" second={true} icon={AssessmentIcon} />
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
                      height={600}
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
export default CustomPARAnalysis;
