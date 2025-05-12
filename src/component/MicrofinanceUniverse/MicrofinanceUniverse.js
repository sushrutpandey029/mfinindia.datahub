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
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TableChartIcon from '@mui/icons-material/TableChart';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PaymentsIcon from '@mui/icons-material/Payments';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import Outreach from "./Outreach/Outreach";
import Disbursement from "./Disbursement/Disbursement";
import PortfolioQuality from "./PortfolioQuality/PortfolioQuality";
import "./ApexChart.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
// Client and Account trend start from here
import ClientAccountTrendH from "./ClientAccountTrendH";
// Client and Account trend end here
// GLP Growth Trends start from here
import GLPGrowthTrendsH from "./GLPGrowthTrendsH";
import OverviewDisbursementTrend from "./OverviewDisbursementTrend";
import OverviewPARBucketAnalysis from "./OverviewPARBucketAnalysis"
import OverviewPARAnalysis from "./OverviewPARAnalysis"
import Breadcrumb from "../common/Breadcrumb";
import { Link, Navigate } from "react-router-dom";
import { BaseUrl, microFinanceActiveEntities, GlpGrowthTrendsApi } from "../url/url";
import axios from "axios";
import authHeaders from "../Service/AuthHeaders";
// GLP Growth Trends end here

const useStyle = makeStyles((theme) =>
  createStyles({
    Buttonbg: {
      backgroundColor: "#2B60AD !important"
    },
    Uploadbg: {
      borderBottomColor: "#058283 !important",
      borderBottom: "2px solid"
    },
    Uploadbg_1: {
      borderBottomColor: "#DC3912 !important",
      borderBottom: "2px solid"
    },
    Uploadbg_2: {
      borderBottomColor: "#3366CC !important",
      borderBottom: "2px solid"
    },
    download_text: {
      color: "#918585",
      textDecoration: "underline  !important",
      fontStyle: "italic  !important",
      fontFamily: "auto  !important"
    },
    headingText: {
      textAlign: "left",
      fontSize: "18.5px !important",
      color: "#515454 !important",
      fontWeight: "bold !important",
    },
    headingHR: {
      borderBottom: "2px solid",
      borderBottomColor: "#b1b1b1 !important",
      marginBottom: "10px"
    },
    headingTitleBox: {
      paddingBottom: "12px !important",
      padding: "11px !important"
    },
    headingTitle: {
      fontSize: "17px !important",
      textAlign: "left",
      fontWeight: "bold !important"
    },
  })
);

const MicrofinanceUniverse = () => {

  var userdetails = JSON.parse(localStorage.getItem('user'))
  var userRole = JSON.parse(userdetails.data.userRole)
  console.log("User Details", userRole[2]['subkey']);

  const classes = useStyle();
  const [value, setValue] = useState('1');
  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };

  const [activityEntities, setActivityEntities] = useState([]);
  const [activeEntityTitle, setActiveEntityTitle] = useState('');
  useEffect(() => {
    getCommonGraphApiData();
    getActiveEntityRecord();
  }, [])

  const getActiveEntityRecord = async () => {
    const api = `${microFinanceActiveEntities}`;
    axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setActivityEntities(response.data.data);
      setActiveEntityTitle(response.data.latestMonthYearShow);
      //console.log(response.data.data);
    }).catch((error) => {

    })
  }

  const [glp, setGlp] = useState([]);
  const [changes, setChanges] = useState([]);
  const [xaxis, setXaxis] = useState([]);

  //client account Trends
  const [clientAccountTrendsSeries, setClientAccountTrendsSeries] = useState([]);
  // disbursement trends
  const [disbursementSeries, setDisbursementSeries] = useState([]);
  //par analysis
  const [parAnalysisSeries, setParAnalysisSeries] = useState([]);
  // par bucket analysis
  const [parBucketAnalysisSeries, setParBucketAnalysisSeries] = useState([]);

  const getCommonGraphApiData = async () => {
    const api = `${GlpGrowthTrendsApi}`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      const glp = [];
      const changes = [];
      const xaxis = [];
      //
      const numbersOfAccounts = [];
      const numberOfUniqueBorrowers = [];
      // disbursement varriables
      const loanAccountsDisbursed = [];
      const loanAmountDisbursed = [];
      // par analysis
      const parGreaterThan30 = [];
      const parGreaterThan60 = [];
      const parGreaterThan90 = [];
      const parGreaterThan180 = [];
      // par bucket analysis
      const parBucket31_60 = [];
      const parBucket61_90 = [];
      const parBucket91_180 = [];
      const parBucket180Plus = [];
      response.data.data.map((v, i) => {
        glp.push(v.glp);
        changes.push(v.changes);
        xaxis.push(v.Month);
        //
        numberOfUniqueBorrowers.push(v.numberOfUniqueBorrowers);
        numbersOfAccounts.push(v.numbersOfAccounts);
        // 
        loanAccountsDisbursed.push(v.loanAccountsDisbursed);
        loanAmountDisbursed.push(v.loanAmountDisbursed);
        //
        parGreaterThan30.push(v.parGreaterThan30);
        parGreaterThan60.push(v.parGreaterThan60);
        parGreaterThan90.push(v.parGreaterThan90);
        parGreaterThan180.push(v.parGreaterThan180);
        //
        parBucket31_60.push(v.parBucket31_60);
        parBucket61_90.push(v.parBucket61_90);
        parBucket91_180.push(v.parBucket91_180);
        parBucket180Plus.push(v.parBucket180Plus);
      });
      // for GLP Growth Thrends
      setGlp(glp);
      setChanges(changes);
      setXaxis(xaxis);

      // client account trends
      setClientAccountTrendsSeries([
        {
          name: "Unique Borrowers (Cr)",
          data: numberOfUniqueBorrowers,
        },
        {
          name: "Accounts (Cr)",
          data: numbersOfAccounts,
        }
      ]);
      // set disbursement series
      setDisbursementSeries([
        {
          name: 'Amount disbursed (Rs Cr)',
          type: 'column',
          data: loanAmountDisbursed
        },
        {
          name: 'Accounts disbursed (Lk)',
          type: 'line',
          data: loanAccountsDisbursed
        }]);
      // set par analysis
      setParAnalysisSeries([
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
      ]);
      //set par bucket analysis
      setParBucketAnalysisSeries([
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
        //   name: "PAR Bucket 180+",
        //   data: parBucket180Plus
        // }
      ]);

    }).catch((error) => {
      console.log('err', error)
    });
  }



  return (
    <>
      <Box sx={{ flexGrow: 1 }} mt={10}>
        <Breadcrumb title="Microfinance Universe" icon={GrassIcon} />
        <Grid container spacing={2} mt={2}>
          <Grid xs={12} sm={12} md={12}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange1} aria-label="Contact Information" centered textColor="secondary"
                    indicatorColor="secondary">

                    {userRole[1]['subkey'][0]['subkey_name'] == 'Overview' && userRole[1]['subkey'][0]['subkey_checked'] == true ?
                      <Tab icon={<AnalyticsIcon />} label="Overview" value="1" />
                      : ""}

                    {userRole[1]['subkey'][1]['subkey_name'] == 'Outreach' && userRole[1]['subkey'][1]['subkey_checked'] == true ?
                      <Tab icon={<TableChartIcon />} label="Outreach" value="2" />
                      : ""}

                    {userRole[1]['subkey'][2]['subkey_name'] == 'Disbursement' && userRole[1]['subkey'][2]['subkey_checked'] == true ?
                      <Tab icon={<PaymentsIcon />} label="Disbursement" value="3" />
                      : ""}

                    {userRole[1]['subkey'][3]['subkey_name'] == 'Portfolio Quality' && userRole[1]['subkey'][3]['subkey_checked'] == true ?
                      <Tab icon={<MiscellaneousServicesIcon />} label="Portfolio Quality" value="4" />
                      : ""}

                  </TabList>
                </Box>

                {/* Overview Start from Here */}
                <TabPanel value="1">

                  {/* Overview Start from Here */}

                  <Grid container spacing={2}>
                    {/* <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }}>
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <GLPGrowthTrendsH glp={glp} changes={changes} xaxis={xaxis} />
                            </Typography>
                            <Typography variant="body1" className={classes.download_text}>
                              <Link className="App-link" to="/micro-finance-universe/glp-trends-growth">Click here to see details.</Link>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>

                      </Card>
                    </Grid> */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }}>
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <GLPGrowthTrendsH glp={glp} changes={changes} xaxis={xaxis} />
                            </Typography>
                            <Typography variant="body1" className={classes.download_text}>
                              <Link className="App-link" to="/micro-finance-universe/glp-trends-growth">Click here to see details.</Link>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>

                      </Card>
                    </Grid>

                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }}>
                        <CardActionArea>
                          <CardContent>
                            <Typography>

                              <ClientAccountTrendH xaxis={xaxis} clientAccountTrendsSeries={clientAccountTrendsSeries} />
                            </Typography>
                            <Typography variant="body1" className={classes.download_text}>
                              <Link className="App-link" to="/micro-finance-universe/uniuqe-borrowers-account-trends">Click here to see details.</Link>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>

                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }}>
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <OverviewDisbursementTrend xaxis={xaxis} disbursementSeries={disbursementSeries} />
                            </Typography>
                            <Typography variant="body1" className={classes.download_text}>
                              <Link className="App-link" to="/micro-finance-universe/disbursement-trend">Click here to see details.</Link>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>

                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <OverviewPARAnalysis parAnalysisSeries={parAnalysisSeries} xaxis={xaxis} />
                            </Typography>
                            <Typography variant="body1" className={classes.download_text}>
                              <Link className="App-link" to="/micro-finance-universe/par-analysis">Click here to see details.</Link>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >


                        <CardActionArea>
                          <CardContent>
                            <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                              Active Entities as on {activeEntityTitle}
                            </Typography>
                            <div className="main tableMinHieht">
                              <Table striped bordered hover>
                                <tbody>
                                  <tr>
                                    <th>Sr.</th>
                                    <th>Type of entity</th>
                                    <th>No. active entities</th>
                                  </tr>
                                  {
                                    activityEntities.map((v, i) => {
                                      return (
                                        <tr>
                                          <td style={{textAlign:"center"}}>{v.serial_number === 6 ? 'Total' : v.serial_number}</td>
                                          <td>{v.type_of_entity}</td>
                                          <td style={{textAlign:"right"}}>{v.no_active_entities}</td>
                                        </tr>
                                      )
                                    })
                                  }
                                </tbody>
                              </Table>
                            </div>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>


                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }}>
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <OverviewPARBucketAnalysis xaxis={xaxis} parBucketAnalysisSeries={parBucketAnalysisSeries} />
                            </Typography>
                            <Typography variant="body1" className={classes.download_text}>
                              <Link className="App-link" to="/micro-finance-universe/par-bucket-analysis">Click here to see details.</Link>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>


                  </Grid>
                  {/* Overview End from Here */}

                </TabPanel>
                {/* Overview End from Here */}

                {/* Outreach Start from Here */}
                <TabPanel value="2">

                  <Outreach />

                </TabPanel>
                {/* Outreach End from Here */}

                {/* Disbursement Start from Here */}
                <TabPanel value="3">

                  <Disbursement />

                </TabPanel>
                {/* Disbursement End from Here */}

                {/* Portfolio Quality Start from Here */}
                <TabPanel value="4">

                  <PortfolioQuality />

                </TabPanel>
                {/* Portfolio Quality End from Here */}

              </TabContext>

              <Typography style={{ textAlign: "left", fontWeight: 500 }}><strong>Data Source:</strong> Data up to 30 June 2023 sourced from Equifax, post 30 June 2023 data sourced from CRIF</Typography>

            </Box>

          </Grid>


        </Grid>
      </Box>
    </>

  );
};

export default MicrofinanceUniverse;
