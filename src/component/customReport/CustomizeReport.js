import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  OutlinedInput,
  Stack,
  Chip,
  CardContent,
  Typography,
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import GrassIcon from '@mui/icons-material/Grass';
import Grid from "@mui/material/Unstable_Grid2";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import "./CustomReport.css";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Dropdown, DropdownMenuItem } from '../Mudra/dropdown';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Breadcrumb from "../common/Breadcrumb";
import { customReportList, dataPointsRecords, MFINdataPointsRecords, geographyList } from "./Content/CustomReportList";
import ContentWrapper from "./Content/ContentWrapper";
import RowWiseEntityTable from "./Content/RowWiseEntityTable"
import RowWiseTimelineTable from "./Content/RowWiseTimelineTable"
import { BaseUrl } from "../url/url";
import authHeaders from "../Service/AuthHeaders";
import axios from "axios";
import Loader from "../common/Loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel-3"
import jsPDF from "jspdf";
import "jspdf-autotable"
import dayjs from "dayjs";
import { SuccessFailedMessage, SuccessToastMessage, ErrorToastMessage } from "../common/SuccessFailedMessage";
const useStyle = makeStyles((theme) => createStyles({}));
const CustomizeReport = () => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);

  const handleFromDateChange = (date) => {
    const parsedDate = dayjs(date).startOf("month").toDate(); // Normalize to 1st of month
    setFormState({ ...formState, fromMonth: parsedDate });
  };

  const handleToDateChange = (date) => {
    const parsedDate = dayjs(date).startOf("month").toDate(); // Normalize to 1st of month
    setFormState({ ...formState, toMonth: parsedDate });
  };

  const TimeLineData = ["Monthly", "Yearly"];
  const MFINTimeLineData = ["Quarterly"];
  const allEntities = ["Banks", "MFIN Members", "NBFC-MFI", "NBFCs", "Others", "SFBs", "Universe"];
  const initialState = {
    rowWiseOption: "Entity",
    columnWiseOption: "Timeline",
    entityOne: [],
    entityTwo: [],
    timelineOne: "",
    timelineTwo: "",
    dataPoint: "",
    geography: "National",
    region: "",
    states: "",
    districts: [],
    fromMonth: new Date("Aug-2018"),
    toMonth: new Date("Mar-2019"),
    isLoader: false,
    isDisabled: false
  };
  const [formState, setFormState] = useState(initialState);
  const [EntitiesArr, setEntityArr] = useState(allEntities);
  const onValueChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));

    if (e.target.name == "rowWiseOption" && e.target.value == "Entity") {
      setFormState((prevState) => ({
        ...prevState,
        ['columnWiseOption']: "Timeline",
        ['entityOne']: [],
        ['entityTwo']: []
      }))
    }
    if (e.target.name == "rowWiseOption" && e.target.value == "Timeline") {
      setFormState((prevState) => ({
        ...prevState,
        ['columnWiseOption']: "Entity",
        ['entityOne']: [],
        ['entityTwo']: []
      }))
    }

    if (e.target.name == "columnWiseOption" && e.target.value == "Entity") {
      setFormState((prevState) => ({
        ...prevState,
        ['rowWiseOption']: "Timeline",
        ['entityOne']: [],
        ['entityTwo']: []
      }));
    }
    if (e.target.name == "columnWiseOption" && e.target.value == "Timeline") {
      setFormState((prevState) => ({
        ...prevState,
        ['rowWiseOption']: "Entity",
        ['entityOne']: [],
        ['entityTwo']: []
      }));
    }
    if (e.target.name == "geography") {
      setFormState((prevState) => ({
        ...prevState,
        ['region']: "",
        ['states']: "",
        ['districts']: []
      }));
    }

    if (e.target.name == "region") {
      setStateList([]);
      setDistrictList([])
      getStateList(e.target.value);
      setFormState((prevState) => ({
        ...prevState,
        ['states']: ""
      }));
    }
    if (e.target.name == "states") {
      setDistrictList([])
      getDistrictList(e.target.value);
      setFormState((prevState) => ({
        ...prevState,
        ['districts']: []
      }));
    }
  }

  const [geographyArr, setGeographyArr] = useState(geographyList)
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

  const [cbRowWiseData, setCbRowWiseData] = useState('');
  const [cbRowWiseColumn, setCbRowWiseColumn] = useState([]);
  const [cbColumnWiseData, setCbColumnWiseData] = useState('');
  const [checkRecord, setCheckRecord] = useState(0);

  const [FromEndDate, setFromEndDate] = useState("");
  const [EntityData, setEntityData] = useState("");
  const [DataPointData, setDataPointData] = useState("");
  const [TimelineData, setTimelineData] = useState("");
  const [GeographyData, setGeographyData] = useState("");
  const [RegionData, setRegionData] = useState("");
  const [StateData, setStateData] = useState("");
  const [DistrictData, setDistrictData] = useState("");



  const getCBRowWiseData = async (state) => {
    if (formState.rowWiseOption == "Entity" && formState.entityOne.length == 0) {
      ErrorToastMessage("Please Select Entity", "failed");
      setFormState({ ...formState, ['isLoader']: false, ['isDisabled']: false });
      return false;
    }
    if (formState.rowWiseOption == "Timeline" && formState.timelineOne == "") {
      ErrorToastMessage("Please Select Timeline", "failed");
      setFormState({ ...formState, ['isLoader']: false, ['isDisabled']: false });
      return false;
    }
    if (formState.columnWiseOption == "Entity" && formState.entityTwo.length == 0) {
      ErrorToastMessage("Please Select Entity", "failed");
      setFormState({ ...formState, ['isLoader']: false, ['isDisabled']: false });
      return false;
    }
    if (formState.columnWiseOption == "Timeline" && formState.timelineTwo == "") {
      ErrorToastMessage("Please Select Timeline", "failed");
      setFormState({ ...formState, ['isLoader']: false, ['isDisabled']: false });
      return false;
    }
    if (formState.dataPoint == "") {
      ErrorToastMessage("Please Select Data Point", "failed");
      setFormState({ ...formState, ['isLoader']: false, ['isDisabled']: false });
      return false;
    }
    var queryString = Object.keys(formState).map(key => key + '=' + formState[key]).join('&');
    var api;
    if (formState.entityOne.includes("MFIN Members") || formState.entityTwo.includes("MFIN Members")) {
      api = `api/auth/mm-get-generated-custom-report?${queryString}`;
    } else {
      api = `api/auth/cb-get-generated-custom-report?${queryString}`;
    }
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setEntityData(formState.entityOne.join(", ") || formState.entityTwo.join(", "));
      setTimelineData(formState.timelineOne || formState.timelineTwo);
      setDataPointData(formState.dataPoint);
      setRegionData(formState.region ? formState.region : "");
      setStateData(formState.states ? formState.states : "");
      setDistrictData(formState.districts ? formState.districts : "");
      setGeographyData(formState.geography ? formState.geography : "");
      setCbRowWiseData(response.data.data.records.rowWise);
      setCbRowWiseColumn(response.data.data.columns);
      setCbColumnWiseData(response.data.data.records.columnWise);
      setCheckRecord(response.data.data.records.availability);
      setFromEndDate(response.data.data.strEndDate);
    }).catch((error) => {
      console.log('outreach', error)
    })
  }

  const filterRecords = async () => {
    setFormState({ ...formState, ['isLoader']: true, ['isDisabled']: true });
    await getCBRowWiseData();
    setFormState({ ...formState, ['isLoader']: false, ['isDisabled']: false });
  }


  useEffect(() => {
    getRegionList();
    getStateList();
    getDistrictList();
    //getCBRowWiseData();
  }, [])
  useEffect(() => {
    if (formState.entityOne.includes("MFIN Members") || formState.entityTwo.includes("MFIN Members")) {
      setGeographyArr(geographyList.slice(0, 3))
      setEntityArr(allEntities.slice(1, 2))
    } else {
      setGeographyArr(geographyList);
      setEntityArr(allEntities);
    }
  }, [formState.entityOne, formState.entityTwo]);

  const downloadPdfCustomReport = () => {
    const pdf = new jsPDF();
    pdf.autoTable({
      html: "#table-to-xls"
    });
    pdf.save("customreportexcelpdf")
  }
  console.log("Test", formState.entityOne);
  return (
    <Box sx={{ flexGrow: 1 }} mt={10}>
      <Breadcrumb title="Custom Report" icon={GrassIcon} />
      <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
        {
          customReportList.map((val) => {
            return (
              <ContentWrapper contents={{ id: val.id, name: val.name, description: val.description, link: val.link }} />
            )
          })
        }
        <SuccessFailedMessage />
      </Grid>
      <Typography gutterBottom variant="h4" className="Filter-heading" component="div">
        Generate Custom Report
      </Typography>
      <Grid xs={12} sm={12} md={12}>
        <Card style={{ marginBottom: "20px" }}>
          <CardContent style={{ textAlign: "left" }}>
            <Grid container>
              <Grid xs={12} sm={12} md={4}>
                <FormControl variant="standard" sx={{ m: 2, minWidth: 430 }}>
                  <InputLabel id="demo-simple-select-standard-label">Choose row-wise options</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Choose column-wise options"
                    name="rowWiseOption"
                    value={formState.rowWiseOption}
                    onChange={(e) => onValueChange(e)}
                  >
                    <MenuItem value={"Entity"}>Entity</MenuItem>
                    <MenuItem value={"Timeline"}>Timeline</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {
                formState.rowWiseOption == "Entity" ? <Grid xs={12} sm={12} md={4}>
                  <FormControl variant="standard" sx={{ m: 2, minWidth: 430 }}>
                    <InputLabel id="demo-simple-select-standard-label">Select Entity</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Select Entity"
                      multiple
                      name="entityOne"
                      value={formState.entityOne}
                      onChange={(e) => onValueChange(e)}
                    >
                      {EntitiesArr.map((EntityVal, i) => (
                        <MenuItem key={EntityVal} sx={{ justifyContent: "space-between" }} value={EntityVal}>{EntityVal}
                          {formState.entityOne.includes(EntityVal) ? <CheckIcon color="info" /> : null}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> : ''
              }

              {
                formState.rowWiseOption == "Timeline" ? <Grid xs={12} sm={12} md={4}>
                  <FormControl variant="standard" sx={{ m: 2, minWidth: 430 }}>
                    <InputLabel id="demo-simple-select-standard-label">Select Timeline</InputLabel>
                    {formState.entityOne.includes("MFIN Members") || formState.entityTwo.includes("MFIN Members") ?
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Select Timeline"
                        name="timelineOne"
                        value={formState.timelineOne}
                        onChange={(e) => onValueChange(e)}
                      >
                        {
                          MFINTimeLineData.map((TimeLineDataVal, i) => (
                            <MenuItem key={TimeLineDataVal} sx={{ justifyContent: "space-between" }} value={TimeLineDataVal}>{TimeLineDataVal}
                            </MenuItem>
                          ))

                        }
                      </Select> :
                      <>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          label="Select Timeline"
                          name="timelineOne"
                          value={formState.timelineOne}
                          onChange={(e) => onValueChange(e)}
                        >
                          {
                            TimeLineData.map((TimeLineDataVal, i) => (
                              <MenuItem key={TimeLineDataVal} sx={{ justifyContent: "space-between" }} value={TimeLineDataVal}>{TimeLineDataVal}
                              </MenuItem>
                            ))

                          }
                        </Select>
                      </>
                    }
                  </FormControl>
                </Grid> : ''
              }


            </Grid>
            {/* Choose column-wise options */}

            <Grid container sx={{ mt: 2, mb: 2 }}>
              <Grid xs={12} sm={12} md={4}>
                <FormControl variant="standard" sx={{ m: 2, minWidth: 430 }}>
                  <InputLabel id="demo-simple-select-standard-label">Choose column-wise options</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Choose column-wise options"
                    name="columnWiseOption"
                    value={formState.columnWiseOption}
                    onChange={(e) => onValueChange(e)}
                  >
                    <MenuItem value={"Entity"}>Entity</MenuItem>
                    <MenuItem value={"Timeline"}>Timeline</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {
                formState.columnWiseOption == "Entity" ? <Grid xs={12} sm={12} md={4}>
                  <FormControl variant="standard" sx={{ m: 2, minWidth: 430 }}>
                    <InputLabel id="demo-simple-select-standard-label">Select Entity</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Select Entity"
                      multiple
                      name="entityTwo"
                      onChange={(e) => onValueChange(e)}
                      value={formState.entityTwo}
                    >
                      {EntitiesArr.map((EntityVal, i) => (
                        <MenuItem key={EntityVal} sx={{ justifyContent: "space-between" }} value={EntityVal}>{EntityVal}
                          {formState.entityTwo.includes(EntityVal) ? <CheckIcon color="info" /> : null}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> : ""
              }
              {
                formState.columnWiseOption == "Timeline" ? <Grid xs={12} sm={12} md={4}>
                  <FormControl variant="standard" sx={{ m: 2, minWidth: 430 }}>
                    <InputLabel id="demo-simple-select-standard-label">Select Timeline</InputLabel>
                    {formState.entityOne.includes("MFIN Members") || formState.entityTwo.includes("MFIN Members") ?
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Select Timeline"
                        name="timelineTwo"
                        value={formState.timelineTwo}
                        onChange={(e) => onValueChange(e)}
                      >
                        {MFINTimeLineData.map((TimeLineDataVal, i) => (
                          <MenuItem key={TimeLineDataVal} sx={{ justifyContent: "space-between" }} value={TimeLineDataVal}>{TimeLineDataVal}
                          </MenuItem>
                        ))}
                      </Select> :
                      <>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          label="Select Timeline"
                          name="timelineTwo"
                          value={formState.timelineTwo}
                          onChange={(e) => onValueChange(e)}
                        >
                          {TimeLineData.map((TimeLineDataVal, i) => (
                            <MenuItem key={TimeLineDataVal} sx={{ justifyContent: "space-between" }} value={TimeLineDataVal}>{TimeLineDataVal}
                            </MenuItem>
                          ))}
                          {/*                       <MenuItem value={"Monthly"}>Monthly</MenuItem>
                      <MenuItem value={"Quarterly"}>Quarterly</MenuItem>
                      <MenuItem value={"Yearly"}>Yearly</MenuItem> */}
                        </Select>
                      </>
                    }
                  </FormControl>
                </Grid> : ""
              }


              <Grid xs={12} sm={12} md={4}>
                <FormControl variant="standard" sx={{ m: 2, minWidth: 430 }}>
                  <InputLabel id="demo-simple-select-standard-label">Select Data Point</InputLabel>
                  {formState.entityOne.includes("MFIN Members") || formState.entityTwo.includes("MFIN Members") ?
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Select Data Point"
                      name="dataPoint"
                      value={formState.dataPoint}
                      onChange={(e) => onValueChange(e)}
                    >
                      {
                        MFINdataPointsRecords.map((val) => {
                          return (<MenuItem value={val.value}>{val.text}</MenuItem>)
                        })
                      }
                    </Select> :
                    <>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Select Data Point"
                        name="dataPoint"
                        value={formState.dataPoint}
                        onChange={(e) => onValueChange(e)}
                      >
                        {
                          dataPointsRecords.map((val) => {
                            return (<MenuItem value={val.value}>{val.text}</MenuItem>)
                          })
                        }
                      </Select>
                    </>

                  }
                </FormControl>
              </Grid>
              <Grid xs={12} sm={12} md={4}>
                <FormControl variant="standard" sx={{ m: 2, minWidth: 430 }}>
                  <InputLabel id="demo-simple-select-standard-label">Select Geography</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Select Geography"
                    name="geography"
                    value={formState.geography}
                    onChange={(e) => onValueChange(e)}
                  >
                    {
                      geographyArr.map((v) => {
                        return (<MenuItem value={v}>{v}</MenuItem>)
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
              {/* Region dropdown */}
              {
                (formState.geography === "Region" || formState.geography === "State" || formState.geography === "District") ? <Grid xs={12} sm={12} md={4}>
                  <FormControl variant="standard" sx={{ m: 2, minWidth: 430 }}>
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
                        regionList.map((val) => {
                          return (<MenuItem value={val.Region}>{val.Region}</MenuItem>)
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid> : ""
              }
              {/* Region dropdown end */}
              {/* state dropdown start */}
              {
                (formState.geography === "State" || formState.geography === "District") ? <Grid xs={12} sm={12} md={4}>
                  <FormControl variant="standard" sx={{ m: 2, minWidth: 430 }}>
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
                        stateList.map((val) => {
                          return (<MenuItem value={val.State_Equifax}>{val.State_Equifax}</MenuItem>)
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid> : ""
              }
              {/* state dropdown */}

              {/* district dropdown start */}


              {formState.geography === "District" ? (
                <Grid xs={12} sm={12} md={4}>
                  <FormControl variant="standard" sx={{ m: 2, minWidth: 430 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Select District
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      name="districts"
                      value={formState.districts}
                      onChange={(e) => onValueChange(e)}
                      label="Select District"
                    >
                      <MenuItem value={0}>All</MenuItem>
                      {districtList.map((val) => {
                        return (
                          <MenuItem value={val.District_Equifax}>
                            {val.District_Equifax}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              ) : (
                ""
              )}

              {/* district dropdown ebd */}

              {/* district dropdown */}
              {
                /*        (formState.geography === "District") ? <Grid xs={12} sm={12} md={4}>
                         <FormControl variant="standard" sx={{ m: 2, minWidth: 430 }}>
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
                               districtList.map((val) => {
                                 return (<MenuItem value={val.District_Equifax}>{val.District_Equifax}</MenuItem>)
                               })
                             }
                           </Select>
                         </FormControl>
                       </Grid> : "" */
              }
              {/* district dropdown */}
              <Grid xs={12} sm={12} md={4}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid xs={12} sm={12} md={4} sx={{ ml: 2, mr: 2 }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid xs={12} sm={12} md={4} sx={{ mt: 5 }}>
                <Button
                  className="customButton customButtonwidth"
                  onClick={filterRecords}
                  disabled={formState.isDisabled}
                >
                  <SearchIcon />
                  Filter Report
                  <Loader loader={formState.isLoader} size={15} />
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
        <Grid xs={12} sm={12} md={12}>
          {
            checkRecord > 1 && (<Typography gutterBottom variant="h6" component="div">
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
                          filename="custom-report-export-excel"
                          filetype="xls"
                          sheet="Custom Report"
                          buttonText="Excel Format" />
                      </Button>
                    </DropdownMenuItem>,
                    <DropdownMenuItem>
                      <Button onClick={downloadPdfCustomReport} style={{ color: "#000000" }} endIcon={<PictureAsPdfIcon />}>
                        PDF Format
                      </Button>
                    </DropdownMenuItem>,
                  ]}
                />
              </span>
            </Typography>)
          }

        </Grid>
        {DataPointData ?
          <Grid xs={12} sm={12} md={12}>
            <Card>
              <CardContent style={{ textAlign: "center" }}>
                <Grid container>
                  <Table bordered >
                    <thead>
                      <tr>
                        <th>Data Point</th>
                        <th>Entity</th>
                        <th>Timeline</th>
                        <th>Start - End Date</th>
                        <th>Geography</th>
                        <th>Selected Geography</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{DataPointData}</td>
                        <td>{EntityData}</td>
                        <td>{TimelineData}</td>
                        <td>{FromEndDate}</td>
                        <td>{GeographyData}</td>
                        <td>{DistrictData ? DistrictData.concat(",") : ""} {StateData ? StateData.concat(",") : ""} {RegionData}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Grid>
              </CardContent>
            </Card>
          </Grid> : ""}
        {cbRowWiseColumn || cbColumnWiseData ? <Grid xs={12} sm={12} md={12}>
          <Card>
            <CardContent style={{ textAlign: "center" }}>
              <Grid container>
                {/* Result 1 Start Here */}

                {
                  formState.rowWiseOption == "Entity" ? <RowWiseEntityTable cbRowWiseColumn={cbRowWiseColumn} cbRowWiseData={cbRowWiseData} checkRecord={checkRecord} /> : ""
                }

                {/* Result 1 End Here */}

                {/* Result 2 Start Here */}
                {
                  formState.columnWiseOption == "Entity" ? <RowWiseTimelineTable cbColumnWiseData={cbColumnWiseData} checkRecord={checkRecord} /> : ""
                }
                {/* <RowWiseTimelineTable cbColumnWiseData={cbColumnWiseData} /> */}
                {/* Result 2 End Here */}
              </Grid>
            </CardContent>
          </Card>
        </Grid> : ""}
      </Grid>
    </Box>
  );
};
export default CustomizeReport;
