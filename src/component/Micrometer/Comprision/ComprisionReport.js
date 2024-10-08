import * as React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import Loader from "../../common/Loader";
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Dropdown, DropdownMenuItem } from '../../Mudra/dropdown';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Chip from '@mui/material/Chip';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import authHeaders from "../../Service/AuthHeaders";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { BaseUrl } from "../../url/url";
import axios from "axios";
import { useEffect } from "react";
import parse from 'html-react-parser';
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

function ComprisionReport() {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    var userdetails = JSON.parse(localStorage.getItem('user'));
    console.log("MFI_Name", userdetails.data.user.MFI_Name);
    const filterInitialState = {
        MFI_Name: userdetails.data.user.MFI_Name?userdetails.data.user.MFI_Name:"",
        fromMonth: new Date("Aug-2018"),
        toMonth: new Date("Mar-2019"),
        Quatar: "Mar-23",
        isLoader: false,
        isDisabled: false
      }

      const graphFilterInitialState = {
        fromMonth: new Date("Aug-2018"),
        toMonth: new Date("Mar-2019"),
        maxDate: new Date("Mar-2020"),
        MFI_Name: userdetails.data.user.MFI_Name?userdetails.data.user.MFI_Name:"",
        Quatar: "Mar-23",
        dateSeries: "2017",
        isLoader: false,
        isDisabled: false
      }
    const [graphFilter, setGraphFilter] = useState(graphFilterInitialState);
    const [filters, setFilters] = useState(filterInitialState);
    const [formState, setFormState] = useState(filterInitialState);
    const [startMonth, setStartMonth] = useState('');
    const [Quatars, setQuatarList] = useState([]);
    const [mfiName, setMfiName] = useState([]);
    const [mfiNameShow, setMfiNameShow] = useState("");

    const downloadPdfComparison = () => {
      const pdf = new jsPDF();
      pdf.autoTable({
        html: "#table-to-xls"
      });
      pdf.save("comparison-report-pdf")
    }
  

    const getQuatarList = async () => {
      const api = 'api/auth/mm-quater-list';
      await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
        setQuatarList(response.data.data);
        setGraphFilter({ ...graphFilter, ['Quatar']: response.data.maxDate})
        setGraphFilter({ ...graphFilter, ['Period']: response.data.maxperiod})
      }).catch((error) => {
        console.log('error', error)
      })
    } 
    
    const getMfiName = async () => {
        const api = `api/auth/mam-mfi-short-name?MFI_Name=${userdetails.data.user.MFI_Name?userdetails.data.user.MFI_Name:""}`;
        await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
          setMfiName(response.data.data);
        }).catch((error) => {
          console.log('error', error)
        })
      } 

      const [ComparisonInfo, setComparisonInfo] = useState([]);
      const getComparisonInfo = async (Quatar = 0, endMonth = 0, MFI_Name) => {
          const api = 'api/auth/mm-get-comparision';
          await axios.get(`${BaseUrl}/${api}?Quatar=${Quatar}&toMonth=${endMonth}&MFI_Name=${ userdetails.data.user.MFI_Name?userdetails.data.user.MFI_Name:filters.MFI_Name}`, { headers: authHeaders() }).then((response) => {
            setComparisonInfo(parse(response.data.data));
            setGraphFilter({ ...graphFilter, ['toMonth']: response.data.latestDate, ['maxDate']: response.data.maxDate })
            setMfiNameShow(userdetails.data.user.MFI_Name?userdetails.data.user.MFI_Name:filters.MFI_Name);
            console.log("Data", response.data.data);
          }).catch((error) => {
            console.log('error', error)
          })
        } 

      const onValueChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        
      }
      const handleGraphToDateChange = (e) => {
        console.log("Value",e.target.value);
        setFormState({ ...formState, ['Quatar']: e.target.value });
        setGraphFilter({ ...graphFilter, ['Quatar']: e.target.value })
      };

      const filterRecords = async () => {
        setFilters({ ...filters, ['isLoader']: true, ['isDisabled']: true });
      await getComparisonInfo(graphFilter.Quatar, graphFilter.toMonth, userdetails.data.user.MFI_Name?userdetails.data.user.MFI_Name:graphFilter.MFI_Name);
        //setCurrentPage(1);
        setMfiNameShow(userdetails.data.user.MFI_Name?userdetails.data.user.MFI_Name:graphFilter.MFI_Name);
        setFilters({ ...filters, ['isLoader']: false, ['isDisabled']: false });
      }
      console.log("info", filters.MFI_Name);
      useEffect(() => {
        getMfiName();
        getComparisonInfo();
        getQuatarList();
      }, []);  

    return (
    <>

                <Grid container>
                                   {/* Date Filter Component Start from here */}
                                   <Grid xs={12} sm={12} md={12}>

                <Grid container spacing={2} mt={2}>
                <Grid xs={12} sm={12} md={3}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 380 }}>
                      <InputLabel id="demo-simple-select-standard-label">MFI Name</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="MFI_Name"
                        value={userdetails.data.user.MFI_Name?userdetails.data.user.MFI_Name:filters.MFI_Shortname}
                        onChange={(e) => onValueChange(e)}
                        label="MFI Name">
                        <MenuItem value={0}>
                          <em>Select MFI Name</em>
                        </MenuItem>
                        {
                          mfiName.map((v) => {
                            return (<MenuItem value={v.MFI_Shortname}>{v.MFI_Shortname}</MenuItem>)
                          })
                        }
                      </Select>
                    </FormControl>
                  </Grid>
              
                    <Grid xs={12} sm={12} md={5}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 380 }}>
<InputLabel id="demo-simple-select-standard-label">Choose quater</InputLabel>
<Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="Qautar"
                        value={graphFilter.Quatar}
                        onChange={handleGraphToDateChange}
                        label="Qautar">
                         {
                          Quatars.map((q) => {
                            return (<MenuItem value={q.Month}>{q.Month}</MenuItem>)
                          })
                        } 
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
                      disabled={filters.isDisabled}
                      onClick={filterRecords}
                    >
                      Filter
                      <Loader loader={filters.isLoader} size={15} />
                    </Button>
                  </Grid>

                  <Grid xs={12} sm={12} md={2}>
                  <Dropdown
                    keepOpen
                    open={open}
                    trigger={<Button style={{ marginTop:"18px", borderBottom: "2px solid", color: "#000000" }} endIcon={<ArrowDropDownIcon />}>
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
                            sheet="Comparison report"
                            buttonText="Excel Format" />
                        </Button>
                      </DropdownMenuItem>,
                      <DropdownMenuItem>
                        <Button onClick={downloadPdfComparison} style={{ color: "#000000" }} endIcon={<PictureAsPdfIcon />}>
                          PDF Format
                        </Button>
                      </DropdownMenuItem>,
                    ]}
                  />
                  </Grid>


                </Grid>
         
          </Grid>
          {/* Date Filter Component End here */}

                </Grid>
 
    <Table striped bordered hover id="table-to-xls">
       <tbody>
       { ComparisonInfo }
        </tbody>
      </Table>
      </>
    );
  }
  
  export default ComprisionReport;
