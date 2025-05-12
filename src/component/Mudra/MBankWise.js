// import { createStyles, makeStyles } from "@material-ui/styles";
// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Typography,
// } from "@mui/material";
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Grid from '@mui/material/Unstable_Grid2';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import { Link } from 'react-router-dom'
// import HomeIcon from '@mui/icons-material/Home';
// import LocationCityIcon from '@mui/icons-material/LocationCity';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import TextField from '@mui/material/TextField';
// import Divider from "@mui/material/Divider";
// import { useState, useEffect } from "react";
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import "./mudra.css";
// import BoyIcon from '@mui/icons-material/Boy';
// import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
// import WcIcon from '@mui/icons-material/Wc';
// import GroupsIcon from '@mui/icons-material/Groups';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import { Dropdown, DropdownMenuItem } from './dropdown';
// import Breadcrumb from "../common/Breadcrumb";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Table from 'react-bootstrap/Table'
// import authHeaders from "../Service/AuthHeaders";
// import { BaseUrl } from "../url/url";
// import axios from "axios";
// import parse from 'html-react-parser'
// // import { Pagination } from "react-bootstrap";
// import Loader from "../common/Loader";
// import ReactHTMLTableToExcel from "react-html-table-to-excel-3"
// import jsPDF from "jspdf";
// import "jspdf-autotable"

// const useStyle = makeStyles((theme) =>
//   createStyles({
//     Buttonbg: {
//       backgroundColor: "#2B60AD !important"
//     },
//     ShishubgTH: {
//       backgroundColor: "#39B1AC !important",
//       color: "#FFFFFF",
//       fontSize: "16px",
//       fontWeight: "bold"
//     },
//     KishorebgTH: {
//       backgroundColor: "#FDBF11 !important",
//       color: "#FFFFFF",
//       fontSize: "16px",
//       fontWeight: "bold"
//     },
//     TarunbgTH: {
//       backgroundColor: "#F05D5F !important",
//       color: "#FFFFFF",
//       fontSize: "16px",
//       fontWeight: "bold"
//     },
//     TotalbgTH: {
//       backgroundColor: "#69AB44 !important",
//       color: "#FFFFFF",
//       fontSize: "16px",
//       fontWeight: "bold"
//     },
//     Kishorebg: {
//       borderBottomColor: "#FDBF11 !important",
//       borderBottom: "5px solid",
//       fontSize: "16px",
//       fontWeight: "bold"
//     },
//     Shishubg: {
//       borderBottomColor: "#39B1AC !important",
//       borderBottom: "5px solid",
//       fontSize: "16px",
//       fontWeight: "bold"
//     },
//     Tarunbg: {
//       borderBottomColor: "#F05D5F !important",
//       borderBottom: "5px solid",
//       fontSize: "16px",
//       fontWeight: "bold"
//     },
//     Totalbg: {
//       borderBottomColor: "#69AB44 !important",
//       borderBottom: "5px solid",
//       fontSize: "16px",
//       fontWeight: "bold"
//     },
//     th:
//     {
//       fontWeight: "bold"
//     },
//     StateHeading: {
//       textAlign: "left",
//       fontSize: "16px",
//       fontWeight: "bold"
//     },
//     TotalHeadingBold: {
//       textAlign: "center",
//       fontSize: "16px",
//       fontWeight: "bold"
//     },
//     AmountHeading: {
//       textAlign: "right",
//       marginBottom: "9px  !important",
//       fontWeight: "bold !important",
//       fontStyle: "italic !important"
//     }
//   })
// );

// const MBankWise = () => {
//   const classes = useStyle();
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     getBankTypeList();
//     getBankNamesList();
//     getSchemeTypes();
//     getFinancialYearList();
//     getTotalNoOfRecords();
//     getTableRecords();
//   }, [])

//   const totalInitialState = {
//     totalShishuNoOfAccount: 0,
//     totalShishuSanctionAmount: 0,
//     totalShishuDisbursementAmount: 0,
//     totalKishoreNoOfAccount: 0,
//     totalKishoreSanctionAmount: 0,
//     totalKishoreDisbursementAmount: 0,
//     totalTarunNoOfAccount: 0,
//     totalTarunSanctionAmount: 0,
//     totalTarunDisbursementAmount: 0,
//     totalNoOfAccount: 0,
//     totalSanctionAmount: 0,
//     totalDisbursementAmount: 0
//   }

//   const [totalValue, setTotalValue] = useState(totalInitialState);

//   const getTotalNoOfRecords = async () => {
//     const api = `api/auth/mudratotalcalculationbankwise`;
//     const response = await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() });
//     setTotalValue(response.data.data);
//   }
//   const [tableRecords, setTableRecords] = useState('');
//   const getTableRecords = async () => {
//     var queryString = Object.keys(filters).map(key => key + '=' + filters[key]).join('&');
//     const api = `api/auth/gettablerecordbankwise?${queryString}`;
//     const response = await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() });
//     setTableRecords(response.data.data.html);
//   }

//   const [bankTypeList, setBankTypeList] = useState([]);
//   const [banksList, setBanksList] = useState([]);
//   const [schemesList, setSchemesList] = useState([]);
//   const [financialYear, setFinancialYear] = useState([]);

//   const getBankTypeList = async () => {
//     const api = 'api/auth/mudra-bank-wise-bank-type-list';
//     await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
//       setBankTypeList(response.data.data);
//     }).catch((error) => {
//       console.log('error', error)
//     })
//   }

//   const getBankNamesList = async () => {
//     const api = 'api/auth/mudra-bank-wise-bank-names-list';
//     await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
//       setBanksList(response.data.data);
//     }).catch((error) => {
//       console.log('error', error)
//     })
//   }

//   const getSchemeTypes = async () => {
//     const api = 'api/auth/mudra-bank-wise-scheme-type-list';
//     await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
//       setSchemesList(response.data.data);
//     }).catch((error) => {
//       console.log('error', error)
//     })
//   }

//   const getFinancialYearList = async () => {
//     const api = 'api/auth/mudra-bank-wise-financial-year-list';
//     await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
//       setFinancialYear(response.data.data);
//     }).catch((error) => {
//       console.log('error', error)
//     })
//   }
//   /* Filters */
//   const filterInitialState = {
//     bankType: 0,
//     bankName: 0,
//     scheme: 0,
//     financialYear: "2022-2023",
//     isLoader: false,
//     isDisabled: false
//   }
//   const [filters, setFilters] = useState(filterInitialState);

//   const onValueChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   }

//   const filterRecords = async () => {
//     setFilters({ ...filters, ['isLoader']: true, ['isDisabled']: true });
//     await getTableRecords();
//     setFilters({ ...filters, ['isLoader']: false, ['isDisabled']: false });
//   }

//   const downloadPdfMudraBankWise = () => {
//     const pdf = new jsPDF();
//     pdf.autoTable({
//       html: "#table-to-xls"
//     });
//     pdf.save("mudra-bank-wise")
//   }


//   return (
//     <>
//       <Box sx={{ flexGrow: 1 }} mt={10}>
//         <div role="presentation">
//         <Breadcrumb title="Banks Wise Disbursement Report" icon={LocationCityIcon} />
         
//         </div>
//         <Grid container spacing={2} mt={2}>
//           <Grid xs={12} sm={12} md={12}>
//             <Card style={{ marginBottom: "20px" }}>


//               <CardContent style={{ textAlign: "left" }}>
//                 <Typography gutterBottom variant="h6" component="div">
//                   Banks Wise Disbursement Report
//                   <span style={{ float: "right", marginRight: "10px" }}>
//                   <Dropdown
//                     keepOpen
//                     open={open}
//                     trigger={<Button style={{ borderBottom: "2px solid", color: "#000000" }} endIcon={<ArrowDropDownIcon />}>
//                       Download
//                     </Button>}
//                     menu={[
//                       <DropdownMenuItem>
//                         <Button style={{ color: "#000000" }} endIcon={<FileDownloadIcon />}>
//                           <ReactHTMLTableToExcel
//                             id="test-table-xls-button"
//                             className="htmlToExcel"
//                             table="table-to-xls"
//                             filename="custom-report-export-excel"
//                             filetype="xls"
//                             sheet="Mudra Bank Wise Report"
//                             buttonText="Excel Format" />
//                         </Button>
//                       </DropdownMenuItem>,
//                       <DropdownMenuItem>
//                         <Button onClick={downloadPdfMudraBankWise} style={{ color: "#000000" }} endIcon={<PictureAsPdfIcon />}>
//                           PDF Format
//                         </Button>
//                       </DropdownMenuItem>,
//                     ]}
//                   />

// <Button
                      
//                       variant="contained"
//                       component={Link} to="/mudra"
//                       className={classes.Buttonbg}
//                       style={{ marginLeft: "30px" }}
                
//                     >
//                       State Wise Report
                   
//                     </Button>
//                   </span>

//                 </Typography>
//                 <Divider />
//               </CardContent>
//             </Card>
//             <Card style={{ marginBottom: "20px" }}>
//               <CardContent style={{ textAlign: "left" }}>

//                 <Grid container>
//                   <Grid xs={12} sm={12} md={3}>
//                     <FormControl variant="standard" sx={{ m: 2, minWidth: 350 }}>
//                       <InputLabel id="demo-simple-select-standard-label">Bank Type</InputLabel>
//                       <Select
//                         labelId="demo-simple-select-standard-label"
//                         name="bankType"
//                         value={filters.bankType}
//                         onChange={(e) => onValueChange(e)}
//                         label="Bank Type"
//                       >
//                         <MenuItem value={0}>
//                           <em>All</em>
//                         </MenuItem>
//                         {
//                           bankTypeList.map((val) => {
//                             return (
//                               <MenuItem value={val.bank_type_name}>{val.bank_type_name}</MenuItem>
//                             )
//                           })
//                         }
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   {/* <Grid xs={12} sm={12} md={2}>
//                     <FormControl variant="standard" sx={{ m: 2, minWidth: 250 }}>
//                       <InputLabel id="demo-simple-select-standard-label">Select Bank</InputLabel>
//                       <Select
//                         labelId="demo-simple-select-standard-label"
//                         id="demo-simple-select-standard"
//                         name="bankName"
//                         value={filters.bankName}
//                         onChange={(e) => onValueChange(e)}
//                         label="Select Bank"
//                       >
//                         <MenuItem value={0}>
//                           <em>All</em>
//                         </MenuItem>
//                         {
//                           banksList.map((val) => {
//                             return (
//                               <MenuItem value={val.bank_name}>{val.bank_name}</MenuItem>
//                             )
//                           })
//                         }
//                       </Select>
//                     </FormControl>
//                   </Grid> */}
//                   <Grid xs={12} sm={12} md={3}>
//                     <FormControl variant="standard" sx={{ m: 2, minWidth: 350 }}>
//                       <InputLabel id="demo-simple-select-standard-label">Select Schema</InputLabel>
//                       <Select
//                         labelId="demo-simple-select-standard-label"
//                         id="demo-simple-select-standard"
//                         name="scheme"
//                         value={filters.scheme}
//                         onChange={(e) => onValueChange(e)}
//                         label="Select Schema"
//                       >
//                         <MenuItem value={0}>
//                           <em>All</em>
//                         </MenuItem>
//                         {
//                           schemesList.map((val) => {
//                             return (
//                               <MenuItem value={val.scheme_type}>{val.scheme_type}</MenuItem>
//                             )
//                           })
//                         }
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid xs={12} sm={12} md={3}>
//                     <FormControl variant="standard" sx={{ m: 2, minWidth: 350 }}>
//                       <InputLabel id="demo-simple-select-standard-label">Financial Year</InputLabel>
//                       <Select
//                         labelId="demo-simple-select-standard-label"
//                         id="demo-simple-select-standard"
//                         name="financialYear"
//                         value={filters.financialYear}
//                         onChange={(e) => onValueChange(e)}
//                         label="Financial Year"
//                       >
//                         <MenuItem value={0}>
//                           <em>All</em>
//                         </MenuItem>
//                         {
//                           financialYear.map((val) => {
//                             return (
//                               <MenuItem value={val.period}>{val.period}</MenuItem>
//                             )
//                           })
//                         }
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   {/* <Grid xs={12} sm={12} md={3}>
//                     <FormControl variant="standard" sx={{ m: 2, minWidth: 315 }}>
//                       <InputLabel id="demo-simple-select-standard-label">Select State</InputLabel>
//                       <Select
//                         labelId="demo-simple-select-standard-label"
//                         id="demo-simple-select-standard"
//                         value={department}
//                         onChange={DepartmenthandleChange}
//                         label="Select State"
//                       >
//                         <MenuItem value="">
//                           <em>All</em>
//                         </MenuItem>
//                         <MenuItem value={10}>Uttar Pradesh</MenuItem>
//                         <MenuItem value={20}>Delhi</MenuItem>
//                         <MenuItem value={30}>Haryana</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid xs={12} sm={12} md={3}>
//                     <FormControl variant="standard" sx={{ m: 2, minWidth: 315 }}>
//                       <InputLabel id="demo-simple-select-standard-label">Select District</InputLabel>
//                       <Select
//                         labelId="demo-simple-select-standard-label"
//                         id="demo-simple-select-standard"
//                         value={designation}
//                         onChange={DesignationhandleChange}
//                         label="Select District"
//                       >
//                         <MenuItem value="">
//                           <em>All</em>
//                         </MenuItem>
//                         <MenuItem value={10}>Gurgoan</MenuItem>
//                         <MenuItem value={20}>Faridabad</MenuItem>
//                         <MenuItem value={30}>Karnal</MenuItem>
//                         <MenuItem value={30}>Panipat</MenuItem>
//                         <MenuItem value={30}>Ambala</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid> */}


//                   {/* <Grid xs={12} sm={12} md={3}>
//                     <TextField
//                       margin="normal"
//                       variant="standard"
//                       fullWidth
//                       id="email"
//                       label="Data Till Date"
//                       name="email"
//                       autoComplete="email"
//                       autoFocus
//                     />
//                   </Grid> */}
//                   <Grid xs={12} sm={12} md={2}>
//                     <Button
//                       type="submit"
//                       fullWidth
//                       variant="contained"
//                       className={classes.Buttonbg}
//                       sx={{ mt: 3, mb: 2 }}
//                       disabled={filters.isDisabled}
//                       onClick={filterRecords}
//                     >
//                       Filter
//                       <Loader loader={filters.isLoader} size={15} />
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//             <Box sx={{ width: '100%', typography: 'body1' }}>
//               <Grid container spacing={2}>
//                 <Grid xs={12} sm={12} md={2}>
//                   <Card className={classes.Shishubg}>
//                     <CardContent style={{ padding: "0px", paddingBottom: "0px" }}>
//                       <h2 style={{ marginBottom: "-21px", marginTop: "8px" }}><BoyIcon style={{ fontSize: "40px" }} /></h2>
//                       <h1 style={{ fontSize: "18px", marginBottom: "8px", marginTop: "20px" }}>{totalValue.totalShishuNoOfAccount}</h1>
//                       <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px", marginTop: "4px" }}>Total Shishu No Of A/Cs</p>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid xs={12} sm={12} md={2}>
//                   <Card className={classes.Shishubg}>
//                     <CardContent style={{ padding: "0px", paddingBottom: "0px" }}>
//                       <h2 style={{ marginBottom: "-21px", marginTop: "8px" }}><BoyIcon style={{ fontSize: "40px" }} /></h2>
//                       <h1 style={{ fontSize: "18px", marginBottom: "12x", marginTop: "20px" }}><CurrencyRupeeIcon style={{ fontSize: "18px", paddingTop: 4 }} />{totalValue.totalShishuSanctionAmount.toFixed(2)}</h1>
//                       <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px", marginTop: "4px" }}>Total Shishu Sanction Amt</p>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid xs={12} sm={12} md={2}>
//                   <Card className={classes.Shishubg}>
//                     <CardContent style={{ padding: "0px", paddingBottom: "0px" }}>
//                       <h2 style={{ marginBottom: "-21px", marginTop: "8px" }}><BoyIcon style={{ fontSize: "40px" }} /></h2>
//                       <h1 style={{ fontSize: "18px", marginBottom: "12x", marginTop: "20px" }}><CurrencyRupeeIcon style={{ fontSize: "18px", paddingTop: 4 }} />{totalValue.totalShishuDisbursementAmount.toFixed(2)}</h1>
//                       <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px", marginTop: "4px" }}>Total Shishu Disbursement Amt</p>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid xs={12} sm={12} md={2}>
//                   <Card className={classes.Kishorebg}>
//                     <CardContent style={{ padding: "0px", paddingBottom: "0px" }}>
//                       <h2 style={{ marginBottom: "-21px", marginTop: "8px" }}><EmojiPeopleIcon style={{ fontSize: "40px" }} /></h2>
//                       <h1 style={{ fontSize: "18px", marginBottom: "8px", marginTop: "20px" }}>{totalValue.totalKishoreNoOfAccount}</h1>
//                       <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px", marginTop: "4px" }}>Total Kishore No Of A/Cs</p>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid xs={12} sm={12} md={2}>
//                   <Card className={classes.Kishorebg}>
//                     <CardContent style={{ padding: "0px", paddingBottom: "0px" }}>
//                       <h2 style={{ marginBottom: "-21px", marginTop: "8px" }}><EmojiPeopleIcon style={{ fontSize: "40px" }} /></h2>
//                       <h1 style={{ fontSize: "18px", marginBottom: "8px", marginTop: "20px" }}><CurrencyRupeeIcon style={{ fontSize: "18px", paddingTop: 4 }} />{totalValue.totalKishoreSanctionAmount.toFixed(2)}</h1>
//                       <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px", marginTop: "4px" }}>Total Kishore Sanction Amt</p>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid xs={12} sm={12} md={2}>
//                   <Card className={classes.Kishorebg}>
//                     <CardContent style={{ padding: "0px", paddingBottom: "0px" }}>
//                       <h2 style={{ marginBottom: "-21px", marginTop: "8px" }}><EmojiPeopleIcon style={{ fontSize: "40px" }} /></h2>
//                       <h1 style={{ fontSize: "18px", marginBottom: "8px", marginTop: "20px" }}><CurrencyRupeeIcon style={{ fontSize: "18px", paddingTop: 4 }} />{totalValue.totalKishoreDisbursementAmount.toFixed(2)}</h1>
//                       <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px", marginTop: "4px" }}>Total Kishore Disbursement Amt</p>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid xs={12} sm={12} md={2}>
//                   <Card className={classes.Tarunbg}>
//                     <CardContent style={{ padding: "0px", paddingBottom: "0px" }}>
//                       <h2 style={{ marginBottom: "-21px", marginTop: "8px" }}><WcIcon style={{ fontSize: "40px" }} /></h2>
//                       <h1 style={{ fontSize: "18px", marginBottom: "8px", marginTop: "20px" }}>{totalValue.totalTarunNoOfAccount}</h1>
//                       <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px", marginTop: "4px" }}>Total Tarun No Of A/Cs</p>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid xs={12} sm={12} md={2}>
//                   <Card className={classes.Tarunbg}>
//                     <CardContent style={{ padding: "0px", paddingBottom: "0px" }}>
//                       <h2 style={{ marginBottom: "-21px", marginTop: "8px" }}><WcIcon style={{ fontSize: "40px" }} /></h2>
//                       <h1 style={{ fontSize: "18px", marginBottom: "8px", marginTop: "20px" }}><CurrencyRupeeIcon style={{ fontSize: "18px", paddingTop: 4 }} />{totalValue.totalTarunSanctionAmount.toFixed(2)}</h1>
//                       <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px", marginTop: "4px" }}>Total Tarun Sanction Amt</p>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid xs={12} sm={12} md={2}>
//                   <Card className={classes.Tarunbg}>
//                     <CardContent style={{ padding: "0px", paddingBottom: "0px" }}>
//                       <h2 style={{ marginBottom: "-21px", marginTop: "8px" }}><WcIcon style={{ fontSize: "40px" }} /></h2>
//                       <h1 style={{ fontSize: "18px", marginBottom: "8px", marginTop: "20px" }}><CurrencyRupeeIcon style={{ fontSize: "18px", paddingTop: 4 }} />{totalValue.totalTarunDisbursementAmount.toFixed(2)}</h1>
//                       <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px", marginTop: "4px" }}>Total Tarun Disbursement Amt</p>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid xs={12} sm={12} md={2}>
//                   <Card className={classes.Totalbg}>
//                     <CardContent style={{ padding: "0px", paddingBottom: "0px" }}>
//                       <h2 style={{ marginBottom: "-21px", marginTop: "8px" }}><GroupsIcon style={{ fontSize: "40px" }} /></h2>
//                       <h1 style={{ fontSize: "18px", marginBottom: "8px", marginTop: "20px" }}>{totalValue.totalNoOfAccount}</h1>
//                       <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px", marginTop: "4px" }}>Total No Of A/Cs</p>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid xs={12} sm={12} md={2}>
//                   <Card className={classes.Totalbg}>
//                     <CardContent style={{ padding: "0px", paddingBottom: "0px" }}>
//                       <h2 style={{ marginBottom: "-21px", marginTop: "8px" }}><GroupsIcon style={{ fontSize: "40px" }} /></h2>
//                       <h1 style={{ fontSize: "18px", marginBottom: "8px", marginTop: "20px" }}><CurrencyRupeeIcon style={{ fontSize: "18px", paddingTop: 4 }} />{totalValue.totalSanctionAmount.toFixed(2)}</h1>
//                       <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px", marginTop: "4px" }}>Total Sanction Amt</p>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid xs={12} sm={12} md={2}>
//                   <Card className={classes.Totalbg}>
//                     <CardContent style={{ padding: "0px", paddingBottom: "0px" }}>
//                       <h2 style={{ marginBottom: "-21px", marginTop: "8px" }}><GroupsIcon style={{ fontSize: "40px" }} /></h2>
//                       <h1 style={{ fontSize: "18px", marginBottom: "8px", marginTop: "20px" }}><CurrencyRupeeIcon style={{ fontSize: "18px", paddingTop: 4 }} />{totalValue.totalDisbursementAmount.toFixed(2)}</h1>
//                       <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px", marginTop: "4px" }}>Total Disbursement Amt</p>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               </Grid>


//               <Grid xs={12} sm={12} md={12} style={{ marginTop: "20px" }}>
//                 <Typography className={classes.AmountHeading}>
//                   (Amount Rs. in Crore)
//                 </Typography>
//                 <Card>
//                   <CardContent>
//                     <Table striped bordered hover id={"table-to-xls"}>
//                       <thead>
//                         <tr>
//                           <th rowSpan={2} style={{ verticalAlign: "middle" }}>Sr. No</th>
//                           <th rowSpan={2} style={{ verticalAlign: "middle" }}>Bank Type Name</th>
//                           {/* <th rowSpan={2} style={{ verticalAlign: "middle" }}>Bank Name</th>
//                           <th rowSpan={2} style={{ verticalAlign: "middle" }}>Sponsor Bank Name</th> */}
//                           <th colSpan={3} style={{ verticalAlign: "middle" }} className={classes.ShishubgTH}>
//                             <Typography style={{ fontWeight:600  }}>Shishu</Typography><Typography style={{ fontWeight:600  }}>(Loans up to Rs. 50,000)</Typography>
//                           </th>
//                           <th colSpan={3} style={{ verticalAlign: "middle" }} className={classes.KishorebgTH}>
//                             <Typography style={{ fontWeight:600  }}>Kishore</Typography><Typography style={{ fontWeight:600  }}>(Loans from Rs. 50,001 to Rs. 5 Lakh)</Typography>
//                           </th>
//                           <th colSpan={3} style={{ verticalAlign: "middle" }} className={classes.TarunbgTH}>
//                             <Typography style={{ fontWeight:600  }}>Tarun</Typography><Typography style={{ fontWeight:600  }}>(Loans from Rs. 5.00 to 10.00 Lakh)</Typography>
//                           </th>
//                           <th colSpan={3} style={{ verticalAlign: "middle" }} className={classes.TotalbgTH}>Total</th>
//                         </tr>
//                         <tr>
//                           <td className={classes.ShishubgTH}>No Of A/Cs</td>
//                           <td className={classes.ShishubgTH}>Section Amt.</td>
//                           <td className={classes.ShishubgTH}>Disbursement Amt.</td>
//                           <td className={classes.KishorebgTH}>No Of A/Cs</td>
//                           <td className={classes.KishorebgTH}>Section Amt.</td>
//                           <td className={classes.KishorebgTH}>Disbursement Amt.</td>
//                           <td className={classes.TarunbgTH}>No Of A/Cs</td>
//                           <td className={classes.TarunbgTH}>Section Amt.</td>
//                           <td className={classes.TarunbgTH}>Disbursement Amt.</td>
//                           <td className={classes.TotalbgTH}>No Of A/Cs</td>
//                           <td className={classes.TotalbgTH}>Section Amt.</td>
//                           <td className={classes.TotalbgTH}>Disbursement Amt.</td>
//                         </tr>
//                       </thead>
//                       {parse(tableRecords)}
//                       {/* <tbody>
//                         <tr className={classes.StateHeading}>
//                           <td>1</td>
//                           <td colSpan={16}>SBI and Associates</td>
//                         </tr>
//                         <tr>
//                           <td>1.1</td>
//                           <td></td>
//                           <td>State Bank of India</td>
//                           <td>-</td>

//                           <td>3677</td>
//                           <td>14.01</td>
//                           <td>14.01</td>

//                           <td>34284</td>
//                           <td>979.96</td>
//                           <td>978.57</td>

//                           <td>19782</td>
//                           <td>2108.03</td>
//                           <td>2105.67</td>

//                           <td>57743</td>
//                           <td>3101.95</td>
//                           <td>3098.24</td>
//                         </tr>

//                         <tr className={classes.TotalHeadingBold}>
//                           <td></td>
//                           <td></td>
//                           <td>Total</td>
//                           <td>-</td>

//                           <td>3677</td>
//                           <td>14.08</td>
//                           <td>14.01</td>

//                           <td>34284</td>
//                           <td>979.96</td>
//                           <td>978.57</td>

//                           <td>19782</td>
//                           <td>2108.03</td>
//                           <td>2105.67</td>

//                           <td>57743</td>
//                           <td>3101.99</td>
//                           <td>3098.24</td>
//                         </tr>


//                       </tbody> */}
//                     </Table>

//                   </CardContent>
//                 </Card>
//               </Grid>





//             </Box>

//           </Grid>


//         </Grid>
//       </Box>

//     </>

//   );
// };

// export default MBankWise;
