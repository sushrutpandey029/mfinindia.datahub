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
import DateFieldFilter from "./DateFieldFilter";
import { BaseUrl, GlpGrowthTrendsApi } from "../url/url";
import axios from "axios";
import authHeaders from "../Service/AuthHeaders";
import number_format from '../Unqiue/Common_func'
import DateFieldFilterWithEntities from "./DateFieldFilterWithEntities";
class CustomDPDBucket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "PAR Bucket 31-60",
          data: [],
        },
        {
          name: "PAR Bucket 61-90",
          data: [],
        },
        {
          name: "PAR Bucket 91-180",
          data: [],
        },
        {
          name: "PAR Bucket 180+",
          data: [],
        },
      ],
      options: {
        chart: {
          type: "line",
          height: 350,
          toolbar: {
            show: true //Disable toolbar
          },
        },
        tooltip: {
          y: {
            formatter: (value) => { return value.toFixed(1) + '%' },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#BD1E22", "#2B60AD", "#39B1AC", "#26E7A6"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100],
          },
        },
        colors: ["#BD1E22", "#2B60AD", "#39B1AC", "#26E7A6"],
        dataLabels: {
          enabled: true,
          offsetY: -5.5,
          formatter: function (val, opt) {
            return val > 100 ? number_format(val) : val.toFixed(2) + '%'
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
          colors: ["#BD1E22", "#2B60AD", "#39B1AC", "#FDBF11"]
        },
        title: {
          text:[],
          //text: "PAR Bucket (%)",
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
        markers: {
          size: [4, 4, 4, 4]
        },
        xaxis: {
          categories: [],
          title: {
            text: "",
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
            text: "Space remove",
            style: {
              color: "#fff",
            }
          },
          labels: {
            show:false,
            formatter: function (value) {
              return value.toFixed(2) + '%';
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
    await this.getParBucketAnalysisGraphData(childData.fromMonth, childData.toMonth, childData.entities)
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
  getParBucketAnalysisGraphData = async (startMonth, endMonth, entities='Universe') => {
    const api = `${GlpGrowthTrendsApi}?entities=${entities}&fromMonth=${startMonth}&toMonth=${endMonth}&limit=12`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      const xaxis = [];
      const parBucket31_60 = [];
      const parBucket61_90 = [];
      const parBucket91_180 = [];
      const parBucket180Plus = [];
      const entitiesShow = [];
      response.data.data.map((v, i) => {
        xaxis.push(v.Month);
        parBucket31_60.push(v.parBucket31_60);
        parBucket61_90.push(v.parBucket61_90);
        parBucket91_180.push(v.parBucket91_180);
        parBucket180Plus.push(v.parBucket180Plus);
      });
      entitiesShow.push(response.data.entities);
      this.setState(prevState => ({
        series: [
          {
            name: "PAR Bucket 31-60",
            data: parBucket31_60
          },
          {
            name: "PAR Bucket 61-90",
            data: parBucket61_90
          },
          {
            name: "PAR Bucket 91-180",
            data: parBucket91_180
          },
          // {
          //   name: "PAR Bucket 180+",
          //   data: parBucket180Plus
          // }
        ],
        options: {
          ...prevState.options,
          labels: [xaxis],
          title: {
            text: "PAR Bucket (%) : "+ entitiesShow,
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
      this.getParBucketAnalysisGraphData(startMonth, endMonth);
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
          <Breadcrumb title="PAR Bucket (%)" secondTitle="Custom Report" secondUrl="/customize-report" second={true} icon={AssessmentIcon} />
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
export default CustomDPDBucket;
