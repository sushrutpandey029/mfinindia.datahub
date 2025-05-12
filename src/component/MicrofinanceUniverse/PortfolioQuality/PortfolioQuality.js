import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Divider
} from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useState, useEffect } from "react";
import "../../ContactDetail/contact.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import { Dropdown, DropdownMenuItem } from '../../Mudra/dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { BaseUrl, GlpGrowthTrendsApi } from "../../url/url";
import authHeaders from "../../Service/AuthHeaders";
import Loader from "../../common/Loader";
import "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

// PAR Graph Start Here
import PARGraph from "./PARGraph";
//  PAR Graph end here

// PAR Bucket Graph Start Here
import PARBucketGraph from "./PARBucketGraph";
//  PAR Bucket Graph end here

// PAR Graph by State Start Here
import PARStateGraph from "./PARStateGraph";
//  PAR Graph by State end here

// PAR Bucket Graph by State Start Here
import PARBucketStateGraph from "./PARBucketStateGraph";
//  PAR Bucket Graph by State end here

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
const PortfolioQuality = () => {
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
    dateSeries: "2017",
    maxDate: new Date("Feb-2025"),
    region: 0,
    states: 0,
    isLoader: false,
    isDisabled: false
  }

  const formInitialState = {
    entity: "Uni",
    region: 0,
    states: 0,
    districts: [0],
    aspirational: 0,
    types: "AmtPARG30",
    fromMonth: new Date("Aug-2018"),
    toMonth: new Date("Mar-2019"),
    dateSeries: "2017",
    isLoader: false,
    isDisabled: false,
    parAnaysisDiv: true,
    parBucket: false
  }

  const [formState, setFormState] = useState(formInitialState);
  const [startMonth, setStartMonth] = useState('');
  const [tableMessage, setTableMessage] = useState('Please Wait...Loading...')
  const onValueChange = (e) => {
    if (e.target.name == "region") {
      setStateList([]);
      setDistrictList([])
      getStateList(e.target.value);
      setFormState({ ...formState, ['states']: 0, ['districts']: [0] });
    }
    if (e.target.name == "states") {
      setDistrictList([])
      getDistrictList(e.target.value);
      setFormState({ ...formState, ['districts']: [0] });
    }
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }
  const [parTableData, setParTableData] = useState([]);
  const [parColumnSum, setParColumnSum] = useState([]);
  const [parBucketTableData, setParBucketTableData] = useState([]);
  const [parBucketColumnSum, setParBucketColumnSum] = useState([]);
  useEffect(() => {
    getRegionList();
    getStateList();
    //getTableData()
    getLatestMonths();
    getOverViewParAnalysisData();
    getStateOverViewParAnalysisData();
  }, [])

  useEffect(() => {
    if (startMonth != "") {
      getTableData()
    }
  }, [startMonth])


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

  console.log("graphFilter", graphFilter);

  const [showEntity, setShowEntity] = useState('Universe');
  const [showRegion, setShowRegion] = useState('All');
  const [showAspirational, setShowAspirational] = useState('all');
  const [showType, setShowType] = useState('Overall PAR > 30');

  const getEntityName = (name) => {
    const array = {
      "Uni": "Universe",
      "MFI": "NBFC-MFI",
      "BNK": "Bank",
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
      "AmtPARG30": "Overall PAR > 30",
      "AmtPARG60": "Overall PAR > 60",
      "AmtPARG90": "Overall PAR > 90",
      "AmtPARG180": "Overall PAR > 180",
      "_AmtPARG30": "PAR bucket 31-60",
      "_AmtPARG60": "PAR bucket 61-90",
      "_AmtPARG90": "PAR bucket 91-180",
      "_AmtPARG180": "PAR bucket 180+",

    };

    for (var key in array) {
      if (key == name) {
        return array[key];
      }
    }
    return;

  }

  const getTableData = async () => {
    setFormState({ ...formState, ['isLoader']: true, ['isDisabled']: true });
    var queryString = Object.keys(formState).map(key => key + '=' + formState[key]).join('&');
    const api = 'api/auth/micro-finance-portflio?' + queryString;
    axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      if (formState.types.includes('_')) {
        setParBucketTableData(response.data.data.tableData);
        setParBucketColumnSum(response.data.data.sumData);
        if (response.data.data.sumData.length === 0) {
          setTableMessage("No Record Found");
        }
        setShowEntity(getEntityName(formState.entity));
        setShowAspirational(getAspirationalName(formState.aspirational));
        setShowType(getTypeName(formState.types));
        setShowRegion(formState.region);
        setFormState(prevState => ({ ...formState, ['isLoader']: false, ['isDisabled']: false, ['parAnaysisDiv']: false, ['parBucket']: true }));
      } else {
        setParTableData(response.data.data.tableData);
        setParColumnSum(response.data.data.sumData);
        if (response.data.data.sumData.length === 0) {
          setTableMessage("No Record Found");
        }
        setShowEntity(getEntityName(formState.entity));
        setShowAspirational(getAspirationalName(formState.aspirational));
        setShowType(getTypeName(formState.types));
        setShowRegion(formState.region);
        setFormState({ ...formState, ['isLoader']: false, ['isDisabled']: false, ['parAnaysisDiv']: true, ['parBucket']: false });
      }
    }).catch((error) => {
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

  const filterdateGraph = async () => {
    setGraphFilter({ ...graphFilter, ['isLoader']: true, ['isDisabled']: true });
    await getOverViewParAnalysisData(graphFilter.fromMonth, graphFilter.toMonth);
    await getStateOverViewParAnalysisData(graphFilter.region,graphFilter.states,graphFilter.fromMonth, graphFilter.toMonth);
    setGraphFilter({ ...graphFilter, ['isLoader']: false, ['isDisabled']: false });
  }

  const [parGraphSeries, setParGraphSeries] = useState([]);
  const [parBucketGraphSeries, setParBucketGraphSeries] = useState([]);
  const [parGraphLabels, setParGraphLabels] = useState([]);


  const getOverViewParAnalysisData = async (startMonth = 0, endMonth = 0) => {
    const api = `${GlpGrowthTrendsApi}?fromMonth=${startMonth}&toMonth=${endMonth}`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setGraphFilter({ ...graphFilter, ['toMonth']: response.data.latestDate,['maxDate']: response.data.maxDate })
      const parGreaterThan30 = [];
      const parGreaterThan60 = [];
      const parGreaterThan90 = [];
      const parGreaterThan180 = [];

      const parBucket31_60 = [];
      const parBucket61_90 = [];
      const parBucket91_180 = [];
      const parBucket180Plus = [];

      const xaxis = [];
      response.data.data.map((v, i) => {
        parGreaterThan30.push(v.parGreaterThan30);
        parGreaterThan60.push(v.parGreaterThan60);
        parGreaterThan90.push(v.parGreaterThan90);
        parGreaterThan180.push(v.parGreaterThan180);

        parBucket31_60.push(v.parBucket31_60);
        parBucket61_90.push(v.parBucket61_90);
        parBucket91_180.push(v.parBucket91_180);
        parBucket180Plus.push(v.parBucket180Plus);

        xaxis.push(v.Month);
      });
      const series = [
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
      ];
      const bucketSeries = [
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
        //{
         // name: "PAR 180+",
          //data: parBucket180Plus
        //}
      ];
      setParBucketGraphSeries(bucketSeries);
      setParGraphSeries(series);
      setParGraphLabels(xaxis)

    }).catch((error) => {
      console.log('err', error)
    });
  }

  const [stateParGraphSeries, setStateParGraphSeries] = useState([]);
  const [stateParBucketGraphSeries, setStateParBucketGraphSeries] = useState([]);
  const [stateParGraphLabels, setStateParGraphLabels] = useState([]);

  const getStateOverViewParAnalysisData = async (region=0, states=0, startMonth = 0, endMonth = 0) => {
    const api = `${BaseUrl}/api/auth/par-par-bucket-analysis-state-wise?fromMonth=${startMonth}&toMonth=${endMonth}&states=${states}&region=${region}`;
    await axios.get(`${api}`, { headers: authHeaders() }).then((response) => {
      
      setStateParBucketGraphSeries(response.data.data.parBucketAnalysisSeries);
      setStateParGraphSeries(response.data.data.parAnalysisSeries);
      setStateParGraphLabels(response.data.data.labels)

    }).catch((error) => {
      console.log('err', error)
    });
  }


  const downloadPdfPorfolioQuality = () => {
    const pdf = new jsPDF();
    pdf.autoTable({
      html: "#table-to-xls"
    });
    pdf.save("portfolioQualityExportPdf")
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
                  <Grid xs={12} sm={12} md={3}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 350 }}>
                      <InputLabel id="demo-simple-select-standard-label">Select Region</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="region"
                        value={graphFilter.region}
                        onChange={(e) => {
                          setGraphFilter({ ...graphFilter, ['region']: e.target.value });
                          getStateList(e.target.value);
                        }
                        }
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
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 350 }}>
                      <InputLabel id="demo-simple-select-standard-label">Select State</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="states"
                        value={graphFilter.states}
                        onChange={(e) => setGraphFilter({ ...graphFilter, ['states']: e.target.value })}
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
                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid xs={12} sm={12} md={3}>
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
                    <Grid xs={12} sm={12} md={3}>
                      <DatePicker
                        margin="normal"
                        variant="standard"
                        openTo="year"
                        error={false}
                        minDateMessage=' '
                        maxDateMessage=' '
                        views={["year", "month"]}
                        label="Choose Date"
                        fullWidth
                        value={graphFilter.toMonth}
                        maxDate={new Date(graphFilter.maxDate)}
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

          {/* // PAR Graph Start Here */}
          <Grid xs={12} sm={12} md={6}>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent>
                <Grid container>
                  <Grid xs={12} sm={12} md={12}>
                    <PARGraph
                      parGraphSeries={parGraphSeries}
                      parGraphLabels={parGraphLabels}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* // PAR Graph End Here */}

          {/* // PAR Bucket Graph Start Here */}
          <Grid xs={12} sm={12} md={6}>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent>
                <Grid container>
                  <Grid xs={12} sm={12} md={12}>
                    <PARBucketGraph
                      parBucketGraphSeries={parBucketGraphSeries}
                      parGraphLabels={parGraphLabels}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* // PAR Bucket Graph End Here */}


          {/* // PAR Graph by State Start Here */}
          <Grid xs={12} sm={12} md={6}>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent>
                <Grid container>
                  <Grid xs={12} sm={12} md={12}>
                    <PARStateGraph
                      parGraphSeries={stateParGraphSeries}
                      parGraphLabels={stateParGraphLabels}
                      stateName={graphFilter.states}
                      RegionName={graphFilter.region}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* // PAR Graph End Here */}

          {/* // PAR Bucket Graph by State Start Here */}
          <Grid xs={12} sm={12} md={6}>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent>
                <Grid container>
                  <Grid xs={12} sm={12} md={12}>
                    <PARBucketStateGraph
                      parBucketGraphSeries={stateParBucketGraphSeries}
                      parGraphLabels={stateParGraphLabels}
                      stateName={graphFilter.states}
                      RegionName={graphFilter.region}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* // PAR Bucket Graph End Here */}

          {/* <Grid xs={12} sm={12} md={12}>
            <Card style={{ marginBottom: "20px" }}>
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
                        <MenuItem value={"AmtPARG30"}><em>Overall PAR <ArrowForwardIosIcon style={{ fontSize: "12px" }} /> 30</em></MenuItem>
                        <MenuItem value={"AmtPARG60"}><em>Overall PAR <ArrowForwardIosIcon style={{ fontSize: "12px" }} /> 60</em></MenuItem>
                        <MenuItem value={"AmtPARG90"}><em>Overall PAR <ArrowForwardIosIcon style={{ fontSize: "12px" }} /> 90</em></MenuItem>
                        <MenuItem value={"AmtPARG180"}><em>Overall PAR <ArrowForwardIosIcon style={{ fontSize: "12px" }} /> 180</em></MenuItem>
                        <Divider />
                        <MenuItem value={"_AmtPARG30"}><em>PAR bucket 31-60 </em></MenuItem>
                        <MenuItem value={"_AmtPARG60"}><em>PAR bucket 61-90 </em></MenuItem>
                        <MenuItem value={"_AmtPARG90"}><em>PAR bucket 91-180 </em></MenuItem>
                        <MenuItem value={"_AmtPARG180"}><em>PAR bucket 180+</em> </MenuItem>
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
            </Card>
            <Grid container spacing={2} mt={2}>
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
                        <Button style={{ color: "#000000" }} endIcon={<FileDownloadIcon />}>
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="htmlToExcel"
                            table="table-to-xls"
                            filename="portfolio-quality-export-excel"
                            filetype="xls"
                            sheet="tablexls"
                            buttonText="Excel Format" />
                        </Button>
                      </DropdownMenuItem>,
                      <DropdownMenuItem>
                        <Button onClick={downloadPdfPorfolioQuality} style={{ color: "#000000" }} endIcon={<PictureAsPdfIcon />}>
                          PDF Format
                        </Button>
                      </DropdownMenuItem>,
                    ]}
                  />
                </span>
              </Typography></Grid>
              <Grid xs={12} sm={12} md={12}>
                <div className="main" style={{ marginTop: "15px" }} >
                  {formState.parAnaysisDiv === true ? <Card style={{ marginBottom: "20px" }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        PAR Analysis (%) - {showType}
                      </Typography>
                      {parColumnSum.length > 0 ?
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
                        </Table>
                          <Table striped bordered hover id="table-to-xls">
                            <tbody>
                              <tr>
                                <th>State</th>
                                <th>District</th>
                                {
                                  Object.values(parTableData).slice(0, 1).map((item) => {
                                    return item.dat.map((v) => {
                                      return (
                                        <th>{v}</th>
                                      )
                                    })

                                  })
                                }
                              </tr>
                              {
                                Object.values(parTableData).map((vl) => {
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
                                  parColumnSum.map((i) => {
                                    return (
                                      <th>{i.toFixed(2)}</th>
                                    )
                                  })
                                }

                              </tr>
                            </tbody>
                          </Table></> : tableMessage}
                    </CardContent>
                  </Card> : ""}

                  {formState.parBucket === true ? <Card style={{ marginBottom: "20px" }} >
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        PAR Bucket Analysis - {showType}
                      </Typography>
                      {parBucketColumnSum.length > 0 ?
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
                        </Table><Table striped bordered hover>
                            <tbody>
                              <tr>
                                <th>State</th>
                                <th>District</th>
                                {
                                  Object.values(parBucketTableData).slice(0, 1).map((item) => {
                                    return item.dat.map((v) => {
                                      return (
                                        <th>{v}</th>
                                      )
                                    })

                                  })
                                }
                              </tr>
                              {
                                Object.values(parBucketTableData).map((vl) => {
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
                                  parBucketColumnSum.map((i) => {
                                    return (
                                      <th>{i.toFixed(2)}</th>
                                    )
                                  })
                                }

                              </tr>
                            </tbody>
                          </Table></> : tableMessage}
                    </CardContent>
                  </Card> : ""}

                </div>
              </Grid>
            </Grid>

          </Grid> */}


        </Grid>
      </Box>

    </>

  );
};

export default PortfolioQuality;
