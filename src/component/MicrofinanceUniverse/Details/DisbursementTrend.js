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
import { Link, Navigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BaseUrl,GlpGrowthTrendsApi} from "../../url/url";
import axios from "axios";
import authHeaders from "../../Service/AuthHeaders";
const useStyle = makeStyles((theme) =>
    createStyles({

    })
);
const DisbursementTrend = () => {
    const classes = useStyle();
    const [state, setState] = useState({
        series: [{
            name: 'Amount disbursed (Rs Cr)',
            type: 'column',
            data: []
        },
        {
            name: 'Accounts disbursed (Lk)',
            type: 'line',
            data: []
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
            },
            toolbar: {
                show: true //Disable toolbar
            },
            stroke: {
                show: true,
                width: [3, 4],
            },
            title: {
                text: 'Disbursement Trend'
            },
            tooltip: {
                y: {
                  formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
                },
              },
              colors: ["#2B60AD", "#39B1AC"],
              fill: {
                opacity: 1,
                colors: [
                  '#2B60AD',
                  '#39B1AC'
                ],
                type: 'solid',
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
            noData: {
                text: "Loading...",
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: "#000000",
                    fontSize: '14px',
                    fontFamily: 'sans-serif',
                    fontWeight: 500,
                }
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
                //enabledOnSeries: [0,1]
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
            legend: {
                position: "bottom",
                horizontalAlign: "center",
                fontSize: '15px',
                fontFamily: 'sans-serif',
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
                    },
                  },
            }]
        },


    });

    const getDisbursementTrendGraphData = async () => {
        const api = `${GlpGrowthTrendsApi}?limit=12`;
        await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
            const loanAccountsDisbursed = [];
            const loanAmountDisbursed = [];
            const xaxis = [];
            response.data.data.map((v, i) => {
                loanAccountsDisbursed.push(v.loanAccountsDisbursed);
                loanAmountDisbursed.push(v.loanAmountDisbursed);
                xaxis.push(v.Month);
            });
            setState(prevState => ({
                series: [
                    {
                        name: 'Amount disbursed (Rs Cr)',
                        type: 'column',
                        data: loanAmountDisbursed
                    },
                    {
                        name: 'Accounts disbursed (Lk)',
                        type: 'line',
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
    useEffect(() => {
        getDisbursementTrendGraphData();
    }, [])


    return (
        <>
            <Box sx={{ flexGrow: 1 }} mt={10}>
                <Breadcrumb title="Disbursement Trend" secondTitle="Microfinance Universe" secondUrl="/micro-finance-universe" second={true} icon={GrassIcon} />
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
export default DisbursementTrend;