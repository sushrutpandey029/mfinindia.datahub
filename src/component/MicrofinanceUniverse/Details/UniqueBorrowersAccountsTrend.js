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
import { Link, Navigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BaseUrl,GlpGrowthTrendsApi } from "../../url/url";
import axios from "axios";
import authHeaders from "../../Service/AuthHeaders";
import number_format from '../../Unqiue/Common_func'
const useStyle = makeStyles((theme) =>
    createStyles({

    })
);
const UniqueBorrowersAccountsTrend = () => {
    const classes = useStyle();
    const [state, setState] = useState({
        series: [
            {
                name: "Unique Borrowers (Cr)",
                data: [],
            },
            {
                name: "Accounts (Cr)",
                data: [],
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
            plotOptions: {
                line: {
                  endingShape: "rounded",
                  columnWidth: '50%',
                  borderRadius: 2,
                  dataLabels: {
                    orientation: 'vertical',
                    position: 'bottom',
                  },
                },
              },
            colors: ["#69AB44", "#BD1E22"],
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
                width: [4, 4],
                colors: ["#69AB44", "#BD1E22"]
              },
            title: {
                text: "Unique Borrowers and Accounts Trend",
                align: "left",
            },
            fill: {
                type: "gradient",
                gradient: {
                  shade: "dark",
                  gradientToColors: ["#69AB44", "#BD1E22"],
                  shadeIntensity: 1,
                  type: "horizontal",
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 100, 100, 100],
                },
              },
            markers: {
                size: [4]
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
                title: {
                    // text: "",
                },
                //type: 'datetime'
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
        },
    });

    const getUniqueBorrowersAccountsData = async () => {
        const api = `${GlpGrowthTrendsApi}?limit=12`;
        await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
            const numbersOfAccounts = [];
            const numberOfUniqueBorrowers = [];
            const xaxis = [];
            response.data.data.map((v, i) => {
                numberOfUniqueBorrowers.push(v.numberOfUniqueBorrowers);
                numbersOfAccounts.push(v.numbersOfAccounts);
                xaxis.push(v.Month);
            });
            setState(prevState => ({
                series: [
                    {
                        name: "Unique Borrowers (Cr)",
                        data: numberOfUniqueBorrowers,
                    },
                    {
                        name: "Accounts (Cr)",
                        data: numbersOfAccounts,
                    }
                ],
                options: {
                    ...prevState.options,
                    labels: xaxis,
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
        getUniqueBorrowersAccountsData();
    }, [])


    return (
        <>
            <Box sx={{ flexGrow: 1 }} mt={10}>
                <Breadcrumb title="Unique Borrowers and Accounts Trend" secondTitle="Microfinance Universe" secondUrl="/micro-finance-universe" second={true} icon={GrassIcon} />
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
export default UniqueBorrowersAccountsTrend;