import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import GrassIcon from '@mui/icons-material/Grass';
import { useState, useEffect } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func';
import { BaseUrl } from "../../url/url";
import axios from "axios";
import authHeaders from "../../Service/AuthHeaders";
import { useParams } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const useStyle = makeStyles((theme) =>
  createStyles({})
);
const OverviewGraphDetails = () => {
  const classes = useStyle();
  let { graphID } = useParams();
  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        type: 'line',
        stacked: false,
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
      tooltip: {
        x: {
          format: "MMM yyyy"
        },
        y: {
          formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
        },
      },
      plotOptions: {
        bar: {
          endingShape: "rounded",
          columnWidth: '50%',
          // borderRadius: 2,
          dataLabels: {
            orientation: 'vertical',
            position: 'bottom',
          },
        },
      },
      toolbar: {
        show: true //Disable toolbar
      },
      colors: ["#39B1AC", "#2B60AD"],
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
        width: [3, 4],
        colors: ["#39B1AC", "#2B60AD"]
      },
      title: {
        text: 'Outreach'
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontFamily: 'sans-serif',
        fontSize: '15px',
        fontWeight: 500,
      },
      dataLabels: {
        enabled: true,
        offsetX: 5,
        formatter: function (val, opt) {
          return val > 100 ? number_format(val) : val.toFixed(2)
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          //borderRadius: 2,
          padding: 1,
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
      markers: {
        size: [4]
      },
      labels: [],
      xaxis: {
        labels: {
          show: true,
          rotate: 0,
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
          show: false,
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
          show: false,
          formatter: function (value) {
            return value;
          }
        },
      }]
    }
  });
  const [pageTitle, setPageTitle] = useState("Outreach");
  const getViewGraphData = async () => {
    if (graphID == 1) {
      setPageTitle("Outreach");
    } else if (graphID == 2) {
      setPageTitle("Disbursement");
    } else if (graphID == 3) {
      setPageTitle("PAR (%)");
    } else if (graphID == 4) {
      setPageTitle("PAR Bucket (%)");
    } else if (graphID == 5) {
      setPageTitle("Funding");
    }
    else if (graphID == 6) {
      setPageTitle("Branch Network");
    }
    const api = `api/auth/mm-overview-graph-calculations?limit=12`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      if (graphID == 1) {
        setState(prevState => ({
          series: [{
            name: 'AUM (Rs Cr)',
            type: 'column',
            data: response.data.data.glp
          }, {
            name: 'No. of Clients (Cr)',
            type: 'line',
            data: response.data.data.noOfClienst
          }],
          options: {
            ...prevState.options,
            labels: response.data.data.labels,
            xaxis: {
              categories: response.data.data.labels,
            },
            title: {
              text: "Outreach"
            }
          }
        }))
      }
      if (graphID == 2) {
        setState(prevState => ({
          series: [{
            name: 'No. of Loans Disbursed (Lk)',
            type: 'column',
            data: response.data.data.numberOfLoanDisbursed
          },
          {
            name: 'Loan Amount Disbursed (Cr)',
            type: 'line',
            data: response.data.data.loanAmountDisbursed
          }],
          options: {
            ...prevState.options,
            labels: response.data.data.labels_disbursment,
            xaxis: {
              categories: response.data.data.labels_disbursment,
            },
            title: {
              text: "Disbursement"
            },
            animations: {
              enabled: true,
            },
            colors: ["#2B60AD", "#ED1590"],
            fill: {
              opacity: 1,
              colors: [
                '#2B60AD',
                '#ED1590'
              ],
              type: 'solid',
            },
            stroke: {
              show: true,
              width: [3, 4],
              colors: ["#2B60AD", "#ED1590"]
            },
            markers: {
              size: [4]
            },
            dataLabels: {
              enabled: true,
              offsetX: 5,
              formatter: function (val, opt) {
                return val > 100 ? number_format(val) : val
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
            yaxis: [{
              title: {
                text: '',
              },
              labels: {
                show: false,
                formatter: function (value) {
                  return number_format(value);
                }
              },
            }, {
              opposite: true,
              title: {
                text: ''
              },
              labels: {
                show: false,
                formatter: function (value) {
                  return number_format(value);
                }
              },
            }]
          }
        }))
      }
      if (graphID == 3) {
        setState(prevState => ({
          series: response.data.data.parAnalysisSeries,
          options: {
            chart: {
              height: 350,
              type: "line",
              toolbar: {
                show: true //Disable toolbar
              },
            },
            colors: ["#ED1590", "#2B60AD", "#69AB44"],
            dataLabels: {
              enabled: true,
              offsetX: -3,
              formatter: function (value) {
                return value;
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
              width: [4, 4, 4],
              colors: ["#ED1590", "#2B60AD", "#69AB44"]
            },
            title: {
              text: "PAR (%)",
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
              size: [4]
            },
            labels: response.data.data.parLabels,
            xaxis: {
              categories: response.data.data.parLabels,
              title: {
                // text: "",
              },
              //type: 'datetime',
              labels: {
                show: true,
                rotate: 0,
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
                //text: "Number of records",
              },
              labels: {
                show: false,
                formatter: function (value) {
                  return value + '%';
                }
              },
              //min: 0,
              //max: 20,
            },
            legend: {
              position: "bottom",
              horizontalAlign: "center",
              fontFamily: 'sans-serif',
              fontSize: '15px',
              fontWeight: 500,
            },
          },
        }))
      }
      if (graphID == 4) {
        setState(prevState => ({
          series: response.data.data.parBucketAnalysisSeries,
          options: {
            chart: {
              height: 350,
              type: "line",
            },
            tooltip: {
              x: {
                format: "MMM yyyy"
              },
              y: {
                formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
              },
            },
            colors: ["#BD1E22", "#B853A0", "#39B1AC"],
            dataLabels: {
              enabled: true,
              offsetX: -3,
              formatter: function (value) {
                return value;
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
              width: [4, 4, 4],
              colors: ["#BD1E22", "#B853A0", "#39B1AC"]
            },
            title: {
              text: "PAR Bucket (%)",
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
              size: [4]
            },
            labels: response.data.data.parLabels,
            xaxis: {
              categories: response.data.data.parLabels,
              title: {
                // text: "",
              },
              //type: 'datetime',
              labels: {
                show: true,
                rotate: 0,
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
                //text: "Number of records",
              },
              labels: {
                show: false,
                formatter: function (value) {
                  return value + '%';
                }
              },
              //min: 0,
              //max: 20,
            },
            legend: {
              position: "bottom",
              horizontalAlign: "center",
              fontFamily: 'sans-serif',
              fontSize: '15px',
              fontWeight: 500,
            },
          },
        }))
      }
      if (graphID == 5) {
        setState(prevState => ({
          series: response.data.data.fundingSeries,
          options: {
            chart: {
              type: 'line',
              stacked: false,
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
            tooltip: {
              x: {
                format: "MMM yyyy"
              },
              y: {
                formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
              },
            },
            plotOptions: {
              bar: {
                endingShape: "rounded",
                columnWidth: '80%',
                borderRadius: 1,
                dataLabels: {
                  orientation: 'vertical',
                  position: 'bottom',
                },
              },
            },
            toolbar: {
              show: true //Disable toolbar
            },
            fill: {
              opacity: 1,
              colors: [
                '#F78F6D',
                '#39B1AC',
                '#BD1E22'
              ],
              type: 'solid',
            },
            colors: ["#F78F6D", "#39B1AC", "#BD1E22"],
            stroke: {
              show: true,
              width: [3, 3, 4],
              colors: ["#F78F6D", "#39B1AC", "#BD1E22"]
            },
            title: {
              text: 'Funding'
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
            dataLabels: {
              enabled: true,
              offsetX: 5,
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
            labels: response.data.data.fundingLabels,
            xaxis: {
              labels: {
                show: true,
                rotate: 0,
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
                show: false,
                formatter: function (value) {
                  return number_format(value);
                }
              },
            }, {
              seriesname: 'Debt: Equity Ratio',
              opposite: true,
              title: {
                text: ''
              },
              labels: {
                show: false,
                formatter: function (value) {
                  return number_format(value);
                }
              },
            }]
          }
        }))
      }
      if (graphID == 6) {
        setState(prevState => ({
          series: response.data.data.branchSeries,
          options: {
            chart: {
              type: 'line',
              stacked: true,
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
            tooltip: {
              x: {
                format: "MMM yyyy"
              },
              y: {
                formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
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
            toolbar: {
              show: true //Disable toolbar
            },
            fill: {
              opacity: 1,
              colors: [
                '#B853A0',
                '#69AB44'
              ],
              type: 'solid',
            },
            colors: ["#B853A0", "#69AB44"],
            stroke: {
              show: true,
              width: [3, 4],
              colors: ["#B853A0", "#69AB44"]
            },
            title: {
              text: 'Branch Network'
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
            dataLabels: {
              enabled: true,
              offsetX: 5,
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
            labels: response.data.data.branchLabels,
            xaxis: {
              labels: {
                show: true,
                rotate: 0,
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
                show: false,
                formatter: function (value) {
                  return number_format(value);
                }
              },
            }, {
              opposite: true,
              title: {
                text: ''
              },
              labels: {
                show: false,
                formatter: function (value) {
                  return number_format(value);
                }
              },
            }]
          }
        }))
      }




    }).catch((error) => {
      console.log('err', error)
    });
  }
  useEffect(() => {
    getViewGraphData();
  }, [])


  return (
    <>
      <Box sx={{ flexGrow: 1 }} mt={10}>
        <Breadcrumb title={pageTitle} secondTitle="MFIN Members" secondUrl="/micrometer" second={true} icon={GrassIcon} />
        <Typography variant="body1">
          <Link className="BackButton" to="/micrometer"><ArrowBackIcon /> Back</Link>
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid xs={12} sm={12} md={12}>
            <Card style={{ padding: "8px" }} className={classes.Uploadbg}>
              <CardActionArea>
                <CardContent>
                  <Typography>
                    <ReactApexChart
                      options={state.options}
                      series={state.series}
                      type="line"
                      height={690}
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default OverviewGraphDetails;
