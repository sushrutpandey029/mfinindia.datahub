import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TextField from '@mui/material/TextField';
import Divider from "@mui/material/Divider";
import { useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Checkbox from "@mui/material/Checkbox";
import SortIcon from "@mui/icons-material/ArrowDownward";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import TableChartIcon from '@mui/icons-material/TableChart';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import mudradistrictdata from "./mudradistrictdata";
import "./mudra.css";
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Chart from "react-google-charts";


const useStyle = makeStyles((theme) =>
  createStyles({
    Buttonbg:{
        backgroundColor:"#058283 !important"
      },
      th:
      {
      fontWeight:"bold"
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
  borderRadius:4,
  boxShadow: 24,
  p: 3,
};
export const Contactdata = [
  ["Period", "Total District Wise", "Total Shishu No Of A/Cs", "Total Kishore No Of A/Cs", "Total Tarun No Of A/Cs", " Total No Of A/Cs"],
  ['2020-2021', 11700, 1170, 460, 250,1000],
  ['2021-2022', 11660, 660, 1120, 300,5000],
  ['2022-2023', 15660,1030, 540, 350,10000]
];

export const Contactoptions = {
  chart: {
    title: "Mudra - District Wise",
    subtitle: "District-Wise Statistics Report : 2022-2023",
  },
  colors: ['#4285F4', '#FBBC05', '#058283', '#34A853', '#D32F2F'],
};

export const dataDistrict = [
  ["State", "Total Shishu Sanction Amt.", "Total Shishu Disbursement Amt.", "Total Kishore Sanction Amt.", "Total Kishore Disbursement Amt.", "Total Tarun Sanction Amt.","Total Tarun Disbursement Amt.","Total Sanction Amt.","Total Disbursement Amt."],
  ["Uttar Pradesh", 8175000, 8008000, 460.76, 840,1000,900.54,128.90,766],
  ["Haryana", 3792000, 3694000, 460.76, 840,1000,900.54,128.90,766],
  ["Maharashtra", 2695000, 2896000, 460.76, 840,1000,900.54,128.90,766],
  ["Bihar", 2099000, 1953000, 460.76, 840,1000,900.54,128.90,766],
  ["Rajasthan", 1526000, 1517000, 460.76, 840,1000,900.54,128.90,766],
];

export const optionsDistrict = {
  title: "Mudra - District Wise India States",
  chartArea: { width: "50%" },
  colors: ['#4285F4', '#FBBC05', '#058283', '#34A853', '#D32F2F'],
  hAxis: {
    title: "Total Mudra - District Records",
    minValue: 0,
  },
  vAxis: {
    title: "State",
  },
};

export const DistrictMudraAmtdata = [
  ["Period", "Total Shishu Sanction Amt.", "Total Shishu Disbursement Amt.", "Total Kishore Sanction Amt.", "Total Kishore Disbursement Amt.", "Total Tarun Sanction Amt.","Total Tarun Disbursement Amt.","Total Sanction Amt.","Total Disbursement Amt."],
  ['2021-2022', 11700, 1170.34, 460.76, 840,1000,900.54,128.90,766],
  ['2022-2023', 15660,1030, 540.50, 540,10000.54,500.54,448.90,1066]
];

export const DistrictMudraAmtoptions = {
  chart: {
    title: "Mudra - District Wise Amt.",
    subtitle: "District-Wise Amt. Statistics Report : 2022-2023",
  },
  colors: ['#4285F4', '#FBBC05', '#058283', '#34A853', '#D32F2F'],
};
export const Departmentdata = [
  ["Department", "Totals"],
  ["Admin/IT", 11],
  ["Sales", 2],
  ["Human Resource", 2],
  ["Finance", 5],
  ["Operations", 7],
  ["Marketing", 9],
  ["Leadership ", 12],
];

export const Departmentoptions = {
  title: "District-Wise list by top 10 records: 2022-2023",
  is3D: true,
};

export const Designationdata = [
  ["Designation", "Totals"],
  ["MD & CEO", 11],
  ["Advocacy and Development", 2],
  ["VP - Advocacy and Development", 2],
  ["Manager -  Information Hub", 5],
  ["Head Communications", 7],
  ["Head SRO", 9],
  ["Head State Initiatives ", 12],
  ["Manager Administrator ", 3],
  ["Finance Manager ", 1],
  ["Accounts Officer ", 8],
  ["Office Assistant ", 25],
  ["Manager Data Analytics ", 10],
  ["Manager SRO ", 2],
];

export const Designationoptions = {
  title: "Contact list by top 20 designations: 2023",
  slices: {
    4: { offset: 0.2 },
    12: { offset: 0.3 },
    14: { offset: 0.4 },
    15: { offset: 0.5 },
  },
};



const MDistrictWise = () => {
const classes = useStyle();
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

const isIndeterminate = (indeterminate) => indeterminate;
const selectableRowsComponentProps = { indeterminate: isIndeterminate };

const [designation, setDesignation] = useState('');
const DesignationhandleChange = (event) => {
  setDesignation(event.target.value);
};

const [department, setDepartment] = useState('');
const DepartmenthandleChange = (event) => {
  setDepartment(event.target.value);
};

const columns = [
  {
    name: "Sr No.",
    selector: "sr_no",
    filterable: true,
    sortable: true
  },
  {
    name: "Financial Year",
    selector: "period",
    filterable: true,
    sortable: true
  },
  {
    name: "State/District",
    selector: "state",
    filterable: true,
    sortable: true
  },
  {
    name: "Shishu No Of A/Cs",
    selector: "shishu_no_of_acs",
    filterable: true,
    sortable: true,
    right: true
  },
  {
    name: "Kishore No Of A/Cs",
    selector: "kishore_no_of_acs",
    filterable: true,
    sortable: true,
    right: true
  },
  {
    name: "Tarun No Of A/Cs",
    selector: "tarun_no_of_acs",
    filterable: true,
    sortable: true,
    right: true
  },
  {
    name: "Total No Of A/Cs",
    selector: "total_no_of_acs",
    filterable: true,
    sortable: true,
    center: true
  }
];

const columns2 = [
  {
    name: "Period22",
    selector: "period",
    filterable: true,
    sortable: true
  },
  {
    name: "State/District",
    selector: "state",
    filterable: true,
    sortable: true
  },
  {
    name: "Shishu No Of A/Cs",
    selector: "shishu_no_of_acs",
    filterable: true,
    sortable: true,
    right: true
  },
  {
    name: "Kishore No Of A/Cs",
    selector: "kishore_no_of_acs",
    filterable: true,
    sortable: true,
    right: true
  },
  {
    name: "Tarun No Of A/Cs",
    selector: "tarun_no_of_acs",
    filterable: true,
    sortable: true,
    right: true
  },
  {
    name: "Total No Of A/Cs",
    selector: "total_no_of_acs",
    filterable: true,
    sortable: true,
    center: true
  }
];

// eslint-disable-next-line
const GetRowExpandedComponent = ({  }) =>
<DataTable
columns={columns2}
data={mudradistrictdata}
defaultSortField="id"
defaultSortAsc={false}
/>
;

  return (
    <>
    <Box sx={{ flexGrow: 1 }} mt={10}>
       <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <LocationCityIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Mudra - District Wise Disbursement Report
        </Typography>
      </Breadcrumbs>
    </div>
      <Grid container spacing={2} mt={2}>
        <Grid xs={12} sm={12} md={12}>
        <Card style={{marginBottom:"20px"}}>
       <CardContent style={{textAlign: "left"}}>
       <Typography gutterBottom variant="h6" component="div">
       Mudra - District Wise Disbursement Report
            <span style={{float: "right", marginRight:"10px"}}><Button  className={classes.Buttonbg} variant="contained" endIcon={<CloudDownloadIcon />}>
      Download Sample Format
      </Button></span>
      <span style={{float: "right", marginRight:"10px"}}><Button onClick={handleOpen} color="warning" variant="contained" endIcon={<FileDownloadIcon />}>
      Excel Download
      </Button></span> 
      <span style={{float: "right", marginRight:"10px"}}><Button onClick={handleOpen} color="primary" variant="contained" endIcon={<FileDownloadIcon />}>
      PDF Download
      </Button></span> 
     <span style={{float: "right", marginRight:"10px"}}><Button onClick={handleOpen} color="error" variant="contained" endIcon={<ImportExportIcon />}>
      Import
      </Button></span> 
          </Typography>
          <Typography variant="body1" color="text.secondary">
          You can download the CSV format to import bulk mudra - district wise disbursement report with one click.
          </Typography>
          <Divider />
      </CardContent>
      </Card>
      <Card style={{marginBottom:"20px"}}>
    <CardContent style={{textAlign: "left"}}>
    
    <Grid container>
    <Grid xs={12} sm={12} md={2}>
        <FormControl variant="standard" sx={{ m: 2, minWidth: 230 }}>
    <InputLabel id="demo-simple-select-standard-label">Select Type</InputLabel>
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={department}
      onChange={DepartmenthandleChange}
      label="Select Type"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Shishu</MenuItem>
      <MenuItem value={10}>Kishore</MenuItem>
      <MenuItem value={10}>Tarun</MenuItem>
    </Select>
  </FormControl>
     </Grid>
        <Grid xs={12} sm={12} md={2}>
        <FormControl variant="standard" sx={{ m: 2, minWidth: 230 }}>
    <InputLabel id="demo-simple-select-standard-label">Financial Year</InputLabel>
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={department}
      onChange={DepartmenthandleChange}
      label="Financial Year"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>2020-2021</MenuItem>
      <MenuItem value={10}>2022-2022</MenuItem>
    </Select>
  </FormControl>
     </Grid>
    
     <Grid xs={12} sm={12} md={2}>
     <FormControl variant="standard" sx={{ m: 2, minWidth: 230 }}>
    <InputLabel id="demo-simple-select-standard-label">Select State</InputLabel>
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={department}
      onChange={DepartmenthandleChange}
      label="Select State"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Uttar Pradesh</MenuItem>
      <MenuItem value={20}>Delhi</MenuItem>
      <MenuItem value={30}>Haryana</MenuItem>
    </Select>
  </FormControl>
     </Grid>
     <Grid xs={12} sm={12} md={2}>
     <FormControl variant="standard" sx={{ m: 2, minWidth: 230 }}>
    <InputLabel id="demo-simple-select-standard-label">Select District</InputLabel>
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={designation}
      onChange={DesignationhandleChange}
      label="Select District"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Gurgoan</MenuItem>
      <MenuItem value={20}>Faridabad</MenuItem>
      <MenuItem value={30}>Karnal</MenuItem>
      <MenuItem value={30}>Panipat</MenuItem>
      <MenuItem value={30}>Ambala</MenuItem>
    </Select>
  </FormControl>
     </Grid>
     <Grid xs={12} sm={12} md={2}>
        <TextField
              margin="normal"
              variant="standard"
              fullWidth
              id="email"
              label="Data Till Date"
              name="email"
              autoComplete="email"
              autoFocus
            />
     </Grid>
     <Grid xs={12} sm={12} md={2}>
        <Button
        type="submit"
        fullWidth
        variant="contained"
        className={classes.Buttonbg}
        sx={{ mt: 3, mb: 2 }}
      >
        Filter
      </Button>
     </Grid>
    </Grid>
   </CardContent>
   </Card>
<Box sx={{ width: '100%', typography: 'body1' }}>
<Grid container spacing={2}>
<Grid xs={12} sm={12} md={2}>
<Card>
<CardContent style={{padding:"0px", paddingBottom:"0px"}}>
<h2 style={{marginBottom: "-21px", marginTop: "8px"}}><LocationCityIcon style={{fontSize:"40px",color:"#100E0E"}} /></h2>
<h1  style={{fontSize:"18px",marginBottom: "8px", marginTop: "12px"}}>900</h1>
<p style={{fontSize:"15px",fontWeight:"500",marginBottom: "8px", color:"#100E0E", marginTop: "8px"}}>Total Shishu No Of A/Cs</p>
</CardContent>
</Card>
</Grid>

<Grid xs={12} sm={12} md={2}>
<Card>
<CardContent style={{padding:"0px", paddingBottom:"0px"}}>
<h2 style={{marginBottom: "-21px", marginTop: "8px"}}><LocationCityIcon style={{fontSize:"40px",color:"#100E0E"}} /></h2>
<h1  style={{fontSize:"18px",marginBottom: "12x", marginTop: "12px"}}><CurrencyRupeeIcon style={{fontSize:"18px",color:"#100E0E", paddingTop:4}} />385.68</h1>
<p style={{fontSize:"15px",fontWeight:"500",marginBottom: "8px", color:"#100E0E", marginTop: "8px"}}>Total Shishu Sanction Amt</p>
</CardContent>
</Card>
</Grid>
<Grid xs={12} sm={12} md={2}>
<Card>
<CardContent style={{padding:"0px", paddingBottom:"0px"}}>
<h2 style={{marginBottom: "-21px", marginTop: "8px"}}><LocationCityIcon style={{fontSize:"40px",color:"#100E0E"}} /></h2>
<h1  style={{fontSize:"18px",marginBottom: "12x", marginTop: "12px"}}><CurrencyRupeeIcon style={{fontSize:"18px",color:"#100E0E", paddingTop:4}} />256.22</h1>
<p style={{fontSize:"15px",fontWeight:"500",marginBottom: "8px", color:"#100E0E", marginTop: "8px"}}>Total Shishu Disbursement Amt</p>
</CardContent>
</Card>
</Grid>
<Grid xs={12} sm={12} md={2}>
<Card>
<CardContent style={{padding:"0px", paddingBottom:"0px"}}>
<h2 style={{marginBottom: "-21px", marginTop: "8px"}}><LocationCityIcon style={{fontSize:"40px",color:"#100E0E"}} /></h2>
<h1  style={{fontSize:"18px",marginBottom: "8px", marginTop: "12px"}}>100</h1>
<p style={{fontSize:"15px",fontWeight:"500",marginBottom: "8px", color:"#100E0E", marginTop: "8px"}}>Total Kishore No Of A/Cs</p>
</CardContent>
</Card>
</Grid>
<Grid xs={12} sm={12} md={2}>
<Card>
<CardContent style={{padding:"0px", paddingBottom:"0px"}}>
<h2 style={{marginBottom: "-21px", marginTop: "8px"}}><LocationCityIcon style={{fontSize:"40px",color:"#100E0E"}} /></h2>
<h1  style={{fontSize:"18px",marginBottom: "8px", marginTop: "12px"}}><CurrencyRupeeIcon style={{fontSize:"18px",color:"#100E0E", paddingTop:4}} />758.07</h1>
<p style={{fontSize:"15px",fontWeight:"500",marginBottom: "8px", color:"#100E0E", marginTop: "8px"}}>Total Kishore Sanction Amt</p>
</CardContent>
</Card>
</Grid>
<Grid xs={12} sm={12} md={2}>
<Card>
<CardContent style={{padding:"0px", paddingBottom:"0px"}}>
<h2 style={{marginBottom: "-21px", marginTop: "8px"}}><LocationCityIcon style={{fontSize:"40px",color:"#100E0E"}} /></h2>
<h1  style={{fontSize:"18px",marginBottom: "8px", marginTop: "12px"}}><CurrencyRupeeIcon style={{fontSize:"18px",color:"#100E0E", paddingTop:4}} />758.07</h1>
<p style={{fontSize:"15px",fontWeight:"500",marginBottom: "8px", color:"#100E0E", marginTop: "8px"}}>Total Kishore Disbursement Amt</p>
</CardContent>
</Card>
</Grid>
<Grid xs={12} sm={12} md={2}>
<Card>
<CardContent style={{padding:"0px", paddingBottom:"0px"}}>
<h2 style={{marginBottom: "-21px", marginTop: "8px"}}><LocationCityIcon style={{fontSize:"40px",color:"#100E0E"}} /></h2>
<h1  style={{fontSize:"18px",marginBottom: "8px", marginTop: "12px"}}>100</h1>
<p style={{fontSize:"15px",fontWeight:"500",marginBottom: "8px", color:"#100E0E", marginTop: "8px"}}>Total Tarun No Of A/Cs</p>
</CardContent>
</Card>
</Grid>
<Grid xs={12} sm={12} md={2}>
<Card>
<CardContent style={{padding:"0px", paddingBottom:"0px"}}>
<h2 style={{marginBottom: "-21px", marginTop: "8px"}}><LocationCityIcon style={{fontSize:"40px",color:"#100E0E"}} /></h2>
<h1  style={{fontSize:"18px",marginBottom: "8px", marginTop: "12px"}}><CurrencyRupeeIcon style={{fontSize:"18px",color:"#100E0E", paddingTop:4}} />758.07</h1>
<p style={{fontSize:"15px",fontWeight:"500",marginBottom: "8px", color:"#100E0E", marginTop: "8px"}}>Total Tarun Sanction Amt</p>
</CardContent>
</Card>
</Grid>
<Grid xs={12} sm={12} md={2}>
<Card>
<CardContent style={{padding:"0px", paddingBottom:"0px"}}>
<h2 style={{marginBottom: "-21px", marginTop: "8px"}}><LocationCityIcon style={{fontSize:"40px",color:"#100E0E"}} /></h2>
<h1  style={{fontSize:"18px",marginBottom: "8px", marginTop: "12px"}}><CurrencyRupeeIcon style={{fontSize:"18px",color:"#100E0E", paddingTop:4}} />758.07</h1>
<p style={{fontSize:"15px",fontWeight:"500",marginBottom: "8px", color:"#100E0E", marginTop: "8px"}}>Total Tarun Disbursement Amt</p>
</CardContent>
</Card>
</Grid>
<Grid xs={12} sm={12} md={2}>
<Card>
<CardContent style={{padding:"0px", paddingBottom:"0px"}}>
<h2 style={{marginBottom: "-21px", marginTop: "8px"}}><LocationCityIcon style={{fontSize:"40px",color:"#100E0E"}} /></h2>
<h1  style={{fontSize:"18px",marginBottom: "8px", marginTop: "12px"}}>100</h1>
<p style={{fontSize:"15px",fontWeight:"500",marginBottom: "8px", color:"#100E0E", marginTop: "8px"}}>Total No Of A/Cs</p>
</CardContent>
</Card>
</Grid>
<Grid xs={12} sm={12} md={2}>
<Card>
<CardContent style={{padding:"0px", paddingBottom:"0px"}}>
<h2 style={{marginBottom: "-21px", marginTop: "8px"}}><LocationCityIcon style={{fontSize:"40px",color:"#100E0E"}} /></h2>
<h1  style={{fontSize:"18px",marginBottom: "8px", marginTop: "12px"}}><CurrencyRupeeIcon style={{fontSize:"18px",color:"#100E0E", paddingTop:4}} />758.07</h1>
<p style={{fontSize:"15px",fontWeight:"500",marginBottom: "8px", color:"#100E0E", marginTop: "8px"}}>Total Sanction Amt</p>
</CardContent>
</Card>
</Grid>
<Grid xs={12} sm={12} md={2}>
<Card>
<CardContent style={{padding:"0px", paddingBottom:"0px"}}>
<h2 style={{marginBottom: "-21px", marginTop: "8px"}}><LocationCityIcon style={{fontSize:"40px",color:"#100E0E"}} /></h2>
<h1  style={{fontSize:"18px",marginBottom: "8px", marginTop: "12px"}}><CurrencyRupeeIcon style={{fontSize:"18px",color:"#100E0E", paddingTop:4}} />758.07</h1>
<p style={{fontSize:"15px",fontWeight:"500",marginBottom: "8px", color:"#100E0E", marginTop: "8px"}}>Total Disbursement Amt</p>
</CardContent>
</Card>
</Grid>
</Grid>
      <TabContext value={value} >
        <Box sx={{ borderBottom: 1, marginTop: "15px", borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Mudra - District Wise Information" centered textColor="secondary"
  indicatorColor="secondary">
            <Tab icon={<AnalyticsIcon />} label="Mudra - District Wise Statistics View" value="1" />
            <Tab icon={<TableChartIcon />} label="Mudra - District Wise Table View" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
      <DataTableExtensions
      
          columns={columns}
          data={mudradistrictdata}
          responsive
          print={false}
          export={false}
        >
        <DataTable
        style={{ marginTop: "15px",width:"900px"}}
         noHeader
         // columns={columns}
          //data={mudradistrictdata}
          // defaultSortField="id"
          // defaultSortAsc={false}
          
          sortIcon={<SortIcon />}
          responsive
          selectableRows
		      expandableRows
          
          selectableRowsComponent={Checkbox}
          selectableRowsComponentProps={selectableRowsComponentProps}
          expandableRowsComponent={GetRowExpandedComponent}
          pagination
          highlightOnHover
        />
        </DataTableExtensions>
        </TabPanel>
        <TabPanel value="2">
        
        <Grid container spacing={2} mt={2}>
    <Grid xs={12} sm={12} md={6}>
    <Card>
   <CardContent>
   <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={Contactdata}
      options={Contactoptions}
    />
  </CardContent>
  </Card>
    </Grid>
    <Grid xs={12} sm={12} md={6}>
    <Card>
   <CardContent>
   <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={Departmentdata}
      options={Departmentoptions}
    />
   
  </CardContent>
  </Card>
    </Grid>

    <Grid xs={12} sm={12} md={12}>
    <Card>
   <CardContent>
   <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={DistrictMudraAmtdata}
      options={DistrictMudraAmtoptions}
    />
  </CardContent>
  </Card>
</Grid>

<Grid xs={12} sm={12} md={12}>
    <Card>
   <CardContent>
   <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={dataDistrict}
      options={optionsDistrict}
    />
  </CardContent>
  </Card>
</Grid>

   
  </Grid>

        </TabPanel>
       
      </TabContext>
    </Box>
     
        </Grid>
        
       
      </Grid>
</Box>

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Import bulk contact information in CSV format
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Upload CSV file *
          </Typography>

          <TextField
                margin="normal"
                variant="standard"
                type="file"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
              />

<Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.Buttonbg}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
        </Box>
      </Modal>
      </>

  );
};

export default MDistrictWise;
