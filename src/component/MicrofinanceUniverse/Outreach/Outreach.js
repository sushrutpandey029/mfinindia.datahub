import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import "../../ContactDetail/contact.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Dropdown, DropdownMenuItem } from '../../Mudra/dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'

// Outreach Graph Start Here
import OutreachGraph from "./OutreachGraph";
import RegionalDistributionGLP from "./RegionalDistributionGLP";
import TopTenPortfolioStates from "./TopTenPortfolioStates";
import PortfolioOutstandIndustry from "./PortfolioOutstandIndustry";
import DistrictBranchesInfo from "./DistrictBranchesInfo";
import MicroCredit from "./MicroCredit";
import axios from "axios";
import { BaseUrl, GlpGrowthTrendsApi } from "../../url/url";
import authHeaders from "../../Service/AuthHeaders";
import Loader from "../../common/Loader";
import "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import ReactHTMLTableToExcel from "react-html-table-to-excel-3"
import jsPDF from "jspdf";
import "jspdf-autotable"
const useStyle = makeStyles((theme) =>
  createStyles({
    Buttonbg: {
      backgroundColor: "#2B60AD !important"
    },
    th:
    {
      fontWeight: "bold"
    },
    htmlToExcel: {
      background: "red"
    }
  })
);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 4,
  boxShadow: 24,
  p: 3,
};

const Outreach = () => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const handleFromDateChange = (date) => {
    setFormState({ ...formState, ['fromMonth']: date })
  };

  const handleToDateChange = (date) => {
    setFormState({ ...formState, ['toMonth']: date })
  };

  const graphFilterInitialState = {
    fromMonth: new Date("Aug-2018"),
    toMonth: new Date("Mar-2019"),
    maxDate: new Date("Mar-2020"),
    dateSeries: "2017",
    isLoader: false,
    isDisabled: false
  }

  const formInitialState = {
    entity: "Uni",
    region: 0,
    states: 0,
    districts: [0],
    aspirational: 0,
    types: "GLP",
    fromMonth: new Date("Aug-2018"),
    toMonth: new Date("Mar-2019"),
    dateSeries: "2017",
    isLoader: false,
    isDisabled: false
  }

  const [regionList, setRegionList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);

  const getRegionList = async () => {
    const api = 'api/auth/master-get-region-list';
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setRegionList(response.data.data);
    }).catch((error) => {
      console.log('outreach', error)
    })
  }

  const getStateList = async (region) => {
    const api = `api/auth/master-get-state-list?Region=${region}`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setStateList(response.data.data);
    }).catch((error) => {
      console.log('outreach', error)
    })
  }

  const getDistrictList = async (state) => {
    const api = `api/auth/master-get-district-list?State=${state}`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setDistrictList(response.data.data);
    }).catch((error) => {
      console.log('outreach', error)
    })
  }

  const [graphFilter, setGraphFilter] = useState(graphFilterInitialState);
  const handleGraphFromDateChange = (date) => {
    setGraphFilter({ ...graphFilter, ['fromMonth']: date })
  };

  const handleGraphToDateChange = (date) => {
    setGraphFilter({ ...graphFilter, ['toMonth']: date })
  };

  const [showEntity, setShowEntity] = useState('Universe');
  const [showRegion, setShowRegion] = useState('All');
  const [showAspirational, setShowAspirational] = useState('all');
  const [showType, setShowType] = useState('Overall GLP');

  const getEntityName = (name) => {
    const array = {
      "Uni": "Universe",
      "MFI": "NBFC-MFI",
      "BANK": "Bank",
      "SFB": "SFB",
      "NBFC": "NBFC",
      "Oth": "Other"
    };

    for (var key in array) {
      if (key == name) {
        return array[key];
      }
    }
    return;

  }
  const getAspirationalName = (name) => {
    const array = {
      "0": "All",
      "10": "Yes",
      "20": "No",
    };

    for (var key in array) {
      if (key == name) {
        return array[key];
      }
    }
    return;

  }

  const getTypeName = (name) => {
    const array = {
      "GLP": "Overall GLP",
      "AC": "Overall Accounts",
      "UB": "Overall UB",
      "Entity": "Unique entities",
      "Branch": "Branches",
      "GLP_S_10": "State covered",
      "GLP_D_10": "Districts covered",
      "Yes": "Aspirational district covered"
    };

    for (var key in array) {
      if (key == name) {
        return array[key];
      }
    }
    return;

  }

  const [formState, setFormState] = useState(formInitialState);
  const [startMonth, setStartMonth] = useState('');
  const [tableMessage, setTableMessage] = useState('Please Wait...Loading...')
  const onValueChange = (e) => {
    if (e.target.name == "region") {
      setStateList([]);
      setDistrictList([])
      getStateList(e.target.value);
    }
    if (e.target.name == "states") {
      setDistrictList([])
      getDistrictList(e.target.value);
    }
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }
  const [tableData, setTableData] = useState([]);
  const [columnSum, setColumnSum] = useState([]);
  useEffect(() => {
    getRegionList();
    getLatestMonths();
    portfolioOutstandingIndusryGraph();
    getDisbursementGraphData();
    getRegionalDistributionGraphData();
    districtBranchesInfo();
  }, [])
  useEffect(() => {
    if (startMonth != "") {
      getTableData()
    }
  }, [startMonth])

  const getTableData = async () => {
    setFormState({ ...formState, ['isLoader']: true, ['isDisabled']: true });
    var queryString = Object.keys(formState).map(key => key + '=' + formState[key]).join('&');
    const api = 'api/auth/micro-finance-outreach?' + queryString;
    axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setTableData(response.data.data.tableData);
      setColumnSum(response.data.data.sumData);
      if (response.data.data.sumData.length === 0) {
        setTableMessage("No Record Found");
      }
      setShowEntity(getEntityName(formState.entity));
      setShowAspirational(getAspirationalName(formState.aspirational));
      setShowType(getTypeName(formState.types));
      setShowRegion(formState.region);
      setFormState({ ...formState, ['isLoader']: false, ['isDisabled']: false });
    }).catch((error) => {
      setColumnSum([]);
      setTableMessage("No Record Found");
      setFormState({ ...formState, ['isLoader']: false, ['isDisabled']: false });
      console.log('outreach', error)
    })
  }

  const getLatestMonths = async () => {
    setFormState({ ...formState, ['isLoader']: true, ['isDisabled']: true });
    const api = 'api/auth/latest-eight-month-month-year';
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      const startMonth = response.data.data.startMonth;
      const endMonth = response.data.data.endMonth;
      setFormState({ ...formState, ['fromMonth']: new Date(startMonth), ['toMonth']: new Date(endMonth) });
      setGraphFilter({ ...graphFilter, ['fromMonth']: new Date(startMonth), ['toMonth']: new Date(endMonth) });
      setStartMonth(startMonth)
    }).catch((error) => {
      console.log('outreach', error)
    })
  }

  const filterOureachTable = async () => {
    await getTableData();
  }
  const downloadPdfOutreach = () => {
    const pdf = new jsPDF();
    pdf.autoTable({
      html: "#table-to-xls"
    });
    pdf.save("outreachExportPdf")
  }
  const filterdateGraph = async () => {
    setGraphFilter({ ...graphFilter, ['isLoader']: true, ['isDisabled']: true });
    await portfolioOutstandingIndusryGraph(graphFilter.fromMonth, graphFilter.toMonth);
    await getDisbursementGraphData(graphFilter.fromMonth, graphFilter.toMonth);
    await getRegionalDistributionGraphData(graphFilter.fromMonth, graphFilter.toMonth);
    await districtBranchesInfo(graphFilter.fromMonth, graphFilter.toMonth);
    setGraphFilter({ ...graphFilter, ['isLoader']: false, ['isDisabled']: false });
  }


  /* No of districts covered and branches graph states */
  const [dbInfoSeries, setDbInfoSeries] = useState([]);
  const [dbInfoOptionsLabel, setDbInfoOptionsLabel] = useState([]);

  const districtBranchesInfo = async (startMonth = 0, endMonth = 0) => {
    const api = `api/auth/outreach-no-of-district-branches-covered-graph?fromMonth=${startMonth}&toMonth=${endMonth}`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setDbInfoSeries(response.data.data.series);
      setDbInfoOptionsLabel(response.data.data.labels);
    }).catch((error) => {
      console.log('err', error)
    });
  }

  /* Regional distribution Graph */
  const [regionalGraphSeries, setRegionalGraphSeries] = useState([]);
  const [regionGraphOptionsLabel, setRegionalGraphOptionsLabel] = useState([]);
  const getRegionalDistributionGraphData = async (startMonth = 0, endMonth = 0) => {
    const api = `api/auth/outreach-regional-distribution-graph-data?fromMonth=${startMonth}&toMonth=${endMonth}`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setRegionalGraphSeries(response.data.data.series);
      setRegionalGraphOptionsLabel(response.data.data.labels);
    }).catch((error) => {
      console.log('err', error)
    });
  }

  /* Disbursement Graph */
  const [disbursementGlp, setDisbursementGlp] = useState([]);
  const [disbursementNumberOfUniqueBorrowers, setDisbursementNumberOfUniqueBorrowers] = useState([]);
  const [disbursementNumbersOfAccounts, setDisbursementNumbersOfAccounts] = useState([]);
  const [disbursementGraphLabels, setDisbursementGraphLabels] = useState([]);

  const getDisbursementGraphData = async (startMonth = 0, endMonth = 0) => {
    const api = `${GlpGrowthTrendsApi}?fromMonth=${startMonth}&toMonth=${endMonth}`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      const glp = [];
      const numbersOfAccounts = [];
      const numberOfUniqueBorrowers = [];
      const xaxis = [];
      response.data.data.map((v, i) => {
        glp.push(v.glp);
        numberOfUniqueBorrowers.push(v.numberOfUniqueBorrowers);
        numbersOfAccounts.push(v.numbersOfAccounts);
        xaxis.push(v.Month);
      });
      setGraphFilter({ ...graphFilter, ['toMonth']: response.data.latestDate, ['maxDate']: response.data.maxDate })
      setDisbursementGlp(glp);
      setDisbursementNumberOfUniqueBorrowers(numberOfUniqueBorrowers);
      setDisbursementNumbersOfAccounts(numbersOfAccounts);
      setDisbursementGraphLabels(xaxis);

    }).catch((error) => {
      console.log('err', error)
    });
  }

  const [portfolioOSeries, setPortfolioOSeries] = useState([]);
  const [portfolioOLabels, setPortfolioOLabels] = useState([]);

  const [pieMicroOutsSeries, setpieMicroOutsSeries] = useState([]);
  const [pieMicroOutsLabels, setpieMicroOutsLabels] = useState([]);
  const [pieMicroOutsTitle, setpieMicroOutsTitle] = useState([]);

  const[topTenStateSeries,setTopTenStateSeries] = useState([]);
  const[topTenStateLabels,setTopTenStateLabels] = useState([]);
  const[topTenStateTitle,setTopTenStateTitle] = useState([]);

  const portfolioOutstandingIndusryGraph = async (startMonth = 0, endMonth = 0) => {
    const api = `api/auth/outreach-portfolio-outstanding-graph-data?fromMonth=${startMonth}&toMonth=${endMonth}`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setPortfolioOSeries(response.data.data.series);
      setPortfolioOLabels(response.data.data.labels);
      setpieMicroOutsSeries(response.data.data.pieSeries)
      setpieMicroOutsLabels(response.data.data.labels)
      setpieMicroOutsTitle(response.data.data.monthYear)
    }).catch((error) => {
      console.log('err', error)
    });

    await axios.get(`${BaseUrl}/api/auth/outreach-portfolio-top-ten-states-graph-data?fromMonth=${startMonth}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
      setTopTenStateSeries(response.data.data.series)
      setTopTenStateLabels(response.data.data.labels)
      setTopTenStateTitle(response.data.data.monthYear)
    }).catch((error) => {
      console.log('err', error)
    });
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} mt={2}>

          {/* Date Filter Component Start from here */}
          <Grid xs={12} sm={12} md={12}>
            <Card>
              <CardContent>
                <Grid container spacing={2} mt={2}>

                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid xs={12} sm={12} md={5}>
                      <DatePicker
                        margin="normal"
                        variant="standard"
                        openTo="year"
                        views={["year", "month"]}
                        label="From Month/Year"
                        fullWidth
                        value={graphFilter.fromMonth}
                        onChange={handleGraphFromDateChange}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider> */}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid xs={12} sm={12} md={9}>
                      <DatePicker
                        margin="normal"
                        variant="standard"
                        openTo="year"
                        error={false}
                        minDateMessage=' '
                        maxDateMessage=' '
                        views={["year", "month"]}
                        maxDate={new Date(graphFilter.maxDate)}
                        label="Choose Date"
                        fullWidth
                        value={graphFilter.toMonth}
                        onChange={handleGraphToDateChange}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <Grid xs={12} sm={12} md={3}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.Buttonbg}
                      sx={{ mt: 3, mb: 2 }}
                      disabled={graphFilter.isDisabled}
                      onClick={filterdateGraph}
                    >
                      Filter
                      <Loader loader={graphFilter.isLoader} size={15} />
                    </Button>
                  </Grid>


                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* Date Filter Component End here */}

          {/* // Outreach Graph Start Here */}
          <Grid xs={12} sm={12} md={6}>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent>
                <Grid container>
                  <Grid xs={12} sm={12} md={12}>
                    <PortfolioOutstandIndustry
                      portfolioOSeries={portfolioOSeries}
                      portfolioOLabels={portfolioOLabels}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* // Outreach Graph End Here */}

          {/* // No of districts covered and branches Graph Start Here */}
          <Grid xs={12} sm={12} md={6}>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent>
                <Grid container>
                  <Grid xs={12} sm={12} md={12}>
                    <OutreachGraph
                      disbursementGlp={disbursementGlp}
                      disbursementNumberOfUniqueBorrowers={disbursementNumberOfUniqueBorrowers}
                      disbursementNumbersOfAccounts={disbursementNumbersOfAccounts}
                      disbursementGraphLabels={disbursementGraphLabels}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* // No of districts covered and branches Graph End Here */}



          {/* // Portfolio outstanding of the microfinance industry (Rs Cr) */}
          <Grid xs={12} sm={12} md={6}>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent>
                <Grid container>
                  <Grid xs={12} sm={12} md={12}>
                    <RegionalDistributionGLP
                      regionalGraphSeries={regionalGraphSeries}
                      regionGraphOptionsLabel={regionGraphOptionsLabel}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* // Portfolio outstanding of the microfinance industry (Rs Cr) */}

          {/* // Portfolio: Top 10 states Graph Start Here */}
          <Grid xs={12} sm={12} md={6}>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent>
                <Grid container>
                  <Grid xs={12} sm={12} md={12}>
                    <MicroCredit
                      pieMicroOutsSeries={pieMicroOutsSeries}
                      pieMicroOutsLabels={pieMicroOutsLabels}
                      pieMicroOutsTitle={pieMicroOutsTitle}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* // Portfolio: Top 10 states Graph End Here */}

          {/* // Micro Credit Graph Start Here */}
          <Grid xs={12} sm={12} md={6}>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent>
                <Grid container>
                  <Grid xs={12} sm={12} md={12}>
                    <TopTenPortfolioStates 
                      topTenStateSeries={topTenStateSeries}
                      topTenStateLabels={topTenStateLabels}
                      topTenStateTitle={topTenStateTitle}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* // Micro Credit Graph End Here */}

          {/* // Regional Distribution of GLP Graph Start Here */}
          <Grid xs={12} sm={12} md={6}>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent>
                <Grid container>
                  <Grid xs={12} sm={12} md={12}>
                    <DistrictBranchesInfo dbInfoSeries={dbInfoSeries} dbInfoOptionsLabel={dbInfoOptionsLabel} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* // Regional Distribution of GLP Graph End Here */}


          <Grid xs={12} sm={12} md={12}>
            {/* <Card style={{ marginBottom: "20px" }}>
              <CardContent style={{ textAlign: "left" }}>

                <Grid container>

                  <Grid xs={12} sm={12} md={3}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
                      <InputLabel id="demo-simple-select-standard-label">Select Entity</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="entity"
                        value={formState.entity}
                        onChange={(e) => onValueChange(e)}
                        label="Select Entity"
                      >
                        <MenuItem value={"Uni"}>Universe</MenuItem>
                        <MenuItem value={"MFI"}>NBFC-MFI</MenuItem>
                        <MenuItem value={"BNK"}>Bank</MenuItem>
                        <MenuItem value={"SFB"}>SFB</MenuItem>
                        <MenuItem value={"NBFC"}>NBFC</MenuItem>
                        <MenuItem value={"Oth"}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={12} md={3}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
                      <InputLabel id="demo-simple-select-standard-label">Select Region</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="region"
                        value={formState.region}
                        onChange={(e) => onValueChange(e)}
                        label="Select Region"
                      >
                        <MenuItem value={0}>All</MenuItem>
                        {
                          regionList.map((val, key) => {
                            return (<MenuItem value={val.Region}>{val.Region}</MenuItem>)
                          })
                        }
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid xs={12} sm={12} md={3}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
                      <InputLabel id="demo-simple-select-standard-label">Select State</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="states"
                        value={formState.states}
                        onChange={(e) => onValueChange(e)}
                        label="Select State"
                      >
                        <MenuItem value={0}>All</MenuItem>
                        {
                          stateList.map((val, ind) => {
                            return (<MenuItem value={val.State_Equifax}>{val.State_Equifax}</MenuItem>)
                          })
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={12} md={3}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
                      <InputLabel id="demo-simple-select-standard-label">Select District</InputLabel>
                      <Select
                        multiple
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="districts"
                        value={formState.districts}
                        onChange={(e) => onValueChange(e)}
                        label="Select District"
                      >
                        <MenuItem value={0}>All</MenuItem>
                        {
                          districtList.map((val, ind) => {
                            return (<MenuItem value={val.District_Equifax}>{val.District_Equifax}</MenuItem>)
                          })
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={12} md={3}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
                      <InputLabel id="demo-simple-select-standard-label">Select Aspirational</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="aspirational"
                        value={formState.aspirational}
                        onChange={(e) => onValueChange(e)}
                        label="Select Aspirational"
                      >
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={10}>Yes</MenuItem>
                        <MenuItem value={20}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid xs={12} sm={12} md={3}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
                      <InputLabel id="demo-simple-select-standard-label">Select Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="types"
                        value={formState.types}
                        onChange={(e) => onValueChange(e)}
                        label="Select Type"
                      >
                        <MenuItem value={"GLP"}>Overall GLP</MenuItem>
                        <MenuItem value={"AC"}>Overall Accounts</MenuItem>
                        <MenuItem value={"UB"}>Overall UB</MenuItem>
                        <MenuItem value={"Entity"}>Unique entities</MenuItem>
                        <MenuItem value={"Branch"}>Branches</MenuItem>
                        <MenuItem value={"GLP_S_10"}>State covered</MenuItem>
                        <MenuItem value={"GLP_D_10"}>Districts covered</MenuItem>
                        <MenuItem value={"Yes"}>Aspirational district covered</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid xs={12} sm={12} md={3}>
                      <DatePicker
                        margin="normal"
                        variant="standard"
                        openTo="year"
                        views={["year", "month"]}
                        label="From Month/Year"
                        fullWidth
                        value={formState.fromMonth}
                        onChange={handleFromDateChange}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid xs={12} sm={12} md={3}>
                      <DatePicker
                        margin="normal"
                        variant="standard"
                        openTo="year"
                        views={["year", "month"]}
                        label="To Month/Year"
                        fullWidth
                        value={formState.toMonth}
                        onChange={handleToDateChange}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <Grid xs={12} sm={12} md={3}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
                      <InputLabel id="demo-simple-select-standard-label">Select Data Series</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="dateSeries"
                        value={formState.dateSeries}
                        onChange={(e) => onValueChange(e)}
                        label="Select  Data Series"
                      >

                        <MenuItem value={"2017"}>2014</MenuItem>
                        <MenuItem value={"2017"}>All</MenuItem>
                        <MenuItem value={"2022"}>2017</MenuItem>
                        <MenuItem value={"2022"}>2022</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={12} md={2}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.Buttonbg}
                      sx={{ mt: 3, mb: 2 }}
                      disabled={formState.isDisabled}

                      onClick={filterOureachTable}
                    >
                      Filter
                      <Loader loader={formState.isLoader} size={15} />
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card> */}
            {/* <Grid container spacing={2} mt={2}>
              <Grid xs={12} sm={12} md={12}><Typography gutterBottom variant="h6" component="div">
                <span style={{ float: "right", marginRight: "10px" }}>
                  <Dropdown
                    keepOpen
                    open={open}
                    trigger={<Button style={{ borderBottom: "2px solid", color: "#000000" }} endIcon={<ArrowDropDownIcon />}>
                      Download
                    </Button>}
                    menu={[
                      <DropdownMenuItem>
                        <Button style={{ color: "#000000"}} endIcon={<FileDownloadIcon />}>
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="htmlToExcel"
                            table="table-to-xls"
                            filename="outreach-export-excel"
                            filetype="xls"
                            sheet="tablexls"
                            buttonText="Excel Format" />
                        </Button>
                      </DropdownMenuItem>,
                      <DropdownMenuItem>
                        <Button style={{ color: "#000000" }} endIcon={<PictureAsPdfIcon />} onClick={downloadPdfOutreach}>
                          PDF Format
                        </Button>
                      </DropdownMenuItem>,
                    ]}
                  />
                </span>
              </Typography></Grid>
              <Grid xs={12} sm={12} md={12}>
                <div className="main" style={{ marginTop: "15px" }}>
                  <Card style={{ marginBottom: "20px" }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {showType} (In Cr)
                      </Typography>

                      {columnSum.length > 0 ?
                        <><Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Entity</th>
                              <th>Region</th>
                              <th>Aspirational Type</th>
                              <th>Type</th>
                            </tr>
                            <tr>
                              <td>{showEntity}</td>
                              <td>{showRegion == 0 ? "All" : showRegion}</td>
                              <td>{showAspirational}</td>
                              <td>{showType}</td>
                            </tr>
                          </thead>
                        </Table><Table striped bordered hover id={"table-to-xls"}>
                            <tbody>
                              <tr>
                                <th>State</th>
                                <th>District</th>
                                {
                                  Object.values(tableData).slice(0, 1).map((item) => {
                                    return item.dat.map((v) => {
                                      return (
                                        <th>{v}</th>
                                      )
                                    })

                                  })
                                }
                              </tr>
                              {
                                Object.values(tableData).map((vl) => {
                                  return (
                                    <tr>
                                      <td>{vl.State}</td>
                                      <td>{vl.District}</td>
                                      {
                                        vl.values.map((v) => {
                                          return (
                                            <td>{v}</td>
                                          )
                                        })
                                      }
                                    </tr>
                                  )
                                })
                              }
                              <tr>
                                <th colSpan={2}>Total</th>
                                {
                                  columnSum.map((i) => {
                                    return (
                                      <th>{i.toFixed(2)}</th>
                                    )
                                  })
                                }

                              </tr>
                            </tbody>
                          </Table></> : tableMessage}


                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </Grid> */}

          </Grid>


        </Grid>
      </Box>

    </>

  );
};

export default Outreach;
