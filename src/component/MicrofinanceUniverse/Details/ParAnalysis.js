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
import number_format from '../../Unqiue/Common_func';
import { Link, Navigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReactApexChart from "react-apexcharts";
import { BaseUrl,GlpGrowthTrendsApi } from "../../url/url";
import axios from "axios";
import authHeaders from "../../Service/AuthHeaders";
const useStyle = makeStyles((theme) =>
    createStyles({

    })
);
const ParAnalysis = () => {
    const classes = useStyle();
    const [state, setState] = useState({
        series: [],
        options: {
            chart: {
                height: 350,
                type: "line",
                toolbar: {
                    show: true //Disable toolbar
                },
            },
            colors: ["#2B60AD", "#ED1590", "#69AB44", "#FDBF11"],
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
            tooltip: {
                y: {
                    formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
                },
              },
            title: {
                text: "PAR Analysis (%)",
                align: "left",
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
            noData: {
                text: "Loading...",
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: "#000000",
                    fontSize: '15px',
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                }
            },
            markers: {
                size: [4, 4, 4, 4]
              },
            labels: [],
            xaxis: {
                categories: [],
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
                    formatter: function (val) {
                      return val > 100 ? number_format(val) : val.toFixed(2);
                    },
                  },
                title: {
                    //text: "Number of records",
                }
            },
            legend: {
                position: "bottom",
                horizontalAlign: "center",
                fontFamily: 'sans-serif',
                fontSize: '15px',
                fontWeight: 500,
              },
        },
    });

    const getParAnalysisGraphData = async () => {
        const api = `${GlpGrowthTrendsApi}?limit=12`;
        await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
            const parGreaterThan30 = [];
            const parGreaterThan60 = [];
            const parGreaterThan90 = [];
            const parGreaterThan180 = [];
            const xaxis = [];
            response.data.data.map((v, i) => {
                parGreaterThan30.push(v.parGreaterThan30);
                parGreaterThan60.push(v.parGreaterThan60);
                parGreaterThan90.push(v.parGreaterThan90);
                parGreaterThan180.push(v.parGreaterThan180);
                xaxis.push(v.Month);
            });
            setState(prevState => ({
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
                    xaxis: {
                        categories: xaxis,
                    }
                }
            }))
        }).catch((error) => {
            console.log('err', error)
        });
    }
    useEffect(() => {
        getParAnalysisGraphData();
    }, [])


    return (
        <>
            <Box sx={{ flexGrow: 1 }} mt={10}>
                <Breadcrumb title="PAR Analysis (%)" secondTitle="Microfinance Universe" secondUrl="/micro-finance-universe" second={true} icon={GrassIcon} />
                <Typography variant="body1">
                              <Link className="BackButton" to="/micro-finance-universe"><ArrowBackIcon /> Back</Link>
                            </Typography>
                <Grid container spacing={2} mt={2}>
                    <Grid xs={12} sm={12} md={12}>
                        <Card style={{ padding: "8px" }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography>
                                        <ReactApexChart
                                            options={state.options}
                                            series={state.series}
                                            type="line"
                                            height={680}
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
export default ParAnalysis;