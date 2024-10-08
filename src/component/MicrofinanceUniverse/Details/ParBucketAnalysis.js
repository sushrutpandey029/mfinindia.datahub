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
import number_format from '../../Unqiue/Common_func';
import { Link, Navigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Breadcrumb from "../../common/Breadcrumb";
import ReactApexChart from "react-apexcharts";
import { BaseUrl,GlpGrowthTrendsApi } from "../../url/url";
import axios from "axios";
import authHeaders from "../../Service/AuthHeaders";
const useStyle = makeStyles((theme) =>
    createStyles({

    })
);
const ParBucketAnalysis = () => {
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
            colors: ["#BD1E22", "#2B60AD", "#39B1AC", "#26E7A6"],
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
                colors: ["#BD1E22", "#2B60AD", "#39B1AC", "#FDBF11"]
              },
              markers: {
                size: [4, 4, 4, 4]
              },
            title: {
                text: "PAR Bucket Analysis (%)",
                align: "left",
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
              tooltip: {
                y: {
                  formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
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
                    fontWeight: 500,
                }
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
    });

    const getParBucketAnalysisGraphData = async () => {
        const api = `${GlpGrowthTrendsApi}?limit=12`;
        await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
            const parBucket31_60 = [];
            const parBucket61_90 = [];
            const parBucket91_180 = [];
            const parBucket180Plus = [];
            const xaxis = [];
            response.data.data.map((v, i) => {
                parBucket31_60.push(v.parBucket31_60);
                parBucket61_90.push(v.parBucket61_90);
                parBucket91_180.push(v.parBucket91_180);
                parBucket180Plus.push(v.parBucket180Plus);
                xaxis.push(v.Month);
            });
            setState(prevState => ({
                series: [
                    {
                        name: "PAR 31-60",
                        data: parBucket31_60
                    },
                    {
                        name: "PAR 61-90",
                        data: parBucket61_90
                    },
                    {
                        name: "PAR 91-180",
                        data: parBucket91_180
                    },
                    // {
                    //     name: "PAR Bucket 180+",
                    //     data: parBucket180Plus
                    // }
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
        getParBucketAnalysisGraphData();
    }, [])


    return (
        <>
            <Box sx={{ flexGrow: 1 }} mt={10}>
                <Breadcrumb title="PAR Bucket Analysis (%)" secondTitle="Microfinance Universe" secondUrl="/micro-finance-universe" second={true} icon={GrassIcon} />
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
export default ParBucketAnalysis;