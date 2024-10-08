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
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Checkbox from "@mui/material/Checkbox";
import SortIcon from "@mui/icons-material/ArrowDownward";
import "../ContactDetail/contact.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Dropdown, DropdownMenuItem } from '../Mudra/dropdown';

const columns = [
    {
      name: 'Sr.',
      selector: 'sr_no',
      sortable: true,
    },
    {
      name: 'Entity',
      selector: 'entity',
      sortable: true,
    },
    {
      name: 'Region',
      selector: 'region',
      sortable: true,
    },
    {
      name: 'State',
      selector: 'state',
    },
    {
        name: 'District',
        selector: 'district',
    },
    {
        name: 'Aspirational',
        selector: 'aspirational',
    },
    {
        name: 'Jan 23',
        selector: 'jan_2023',
    },
    {
        name: 'Feb 23',
        selector: 'feb_2023',
    },
    {
        name: 'Mar 23',
        selector: 'mar_2023',
    },
    {
        name: 'Apr 23',
        selector: 'apr_2023',
    },
    {
        name: 'May 23',
        selector: 'may_2023',
    },
  ];
  const emp_data = [
	{
		"sr_no": 1,
        "entity": "Universe",
        "region": "East",
        "state": "Uttar Pradesh",
		"district": "Lucknow",
		"aspirational": "Yes",
		"jan_2023": "10",
        "feb_2023": "15",
        "mar_2023": "10",
        "apr_2023": "20",
        "may_2023": "2"
	},
	{
		"sr_no": 2,
        "entity": "Universe",
        "region": "East",
        "state": "Uttar Pradesh",
		"district": "Gonda",
		"aspirational": "Yes",
		"jan_2023": "100",
        "feb_2023": "150",
        "mar_2023": "90",
        "apr_2023": "200",
        "may_2023": "21"
	}
];

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

const Disbursement = () => {
const classes = useStyle();
const [open, setOpen] = useState(false);

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

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} mt={2}>
      <Grid xs={12} sm={12} md={12}><Typography gutterBottom variant="h6" component="div">
    <span style={{float: "right", marginRight:"10px"}}>
      <Dropdown
      keepOpen
      open={open}
      trigger={<Button style={{borderBottom: "2px solid", color:"#000000"}} endIcon={<ArrowDropDownIcon />}>
      Download
      </Button>}
      menu={[
        <DropdownMenuItem>
           <Button style={{color:"#000000"}}  endIcon={<FileDownloadIcon  />}>
      Excel Format
      </Button>
        </DropdownMenuItem>,
         <DropdownMenuItem>
         <Button style={{color:"#000000"}} endIcon={<FileDownloadIcon />}>
     CSV Format
     </Button>
       </DropdownMenuItem>,
        <DropdownMenuItem>
          <Button style={{color:"#000000"}} endIcon={<PictureAsPdfIcon />}>
      PDF Format
      </Button>
        </DropdownMenuItem>,
      ]}
    />  
      </span>
          </Typography></Grid>
        <Grid xs={12} sm={12} md={12}>
      <Card style={{marginBottom:"20px"}}>
    <CardContent style={{textAlign: "left"}}>
    
    <Grid container>
        
        <Grid xs={12} sm={12} md={3}>
        <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
    <InputLabel id="demo-simple-select-standard-label">Select Entity</InputLabel>
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={department}
      onChange={DepartmenthandleChange}
      label="Select Entity"
    >
      <MenuItem value={"Universe"}>Universe</MenuItem>
      <MenuItem value={"NBFC-MFI"}>NBFC-MFI</MenuItem>
      <MenuItem value={"Bank"}>Bank</MenuItem>
      <MenuItem value={"SFB"}>SFB</MenuItem>
      <MenuItem value={"NBFC"}>NBFC</MenuItem>
      <MenuItem value={"Other"}>Other</MenuItem>
    </Select>
  </FormControl>
     </Grid>
     <Grid xs={12} sm={12} md={3}>
     <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
    <InputLabel id="demo-simple-select-standard-label">Select Region</InputLabel>
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={department}
      onChange={DepartmenthandleChange}
      label="Select Region"
    >
      <MenuItem value="">
        <em>All</em>
      </MenuItem>
      <MenuItem value={10}>East</MenuItem>
      <MenuItem value={20}>West</MenuItem>
      <MenuItem value={30}>Narth</MenuItem>
      <MenuItem value={30}>South</MenuItem>
    </Select>
  </FormControl>
     </Grid>
     
     <Grid xs={12} sm={12} md={3}>
     <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
    <InputLabel id="demo-simple-select-standard-label">Select State</InputLabel>
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={designation}
      onChange={DesignationhandleChange}
      label="Select State"
    >
      <MenuItem value="">
        <em>All</em>
      </MenuItem>
      <MenuItem value={"Bihar"}>Bihar</MenuItem>
      <MenuItem value={"Gujarat"}>Gujarat</MenuItem>
      <MenuItem value={"Goa"}>Goa</MenuItem>
      <MenuItem value={"Uttar Pradesh"}>Uttar Pradesh</MenuItem>
      <MenuItem value={"Uttrakhand"}>Uttrakhand</MenuItem>
    </Select>
  </FormControl>
     </Grid>
     <Grid xs={12} sm={12} md={3}>
     <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
    <InputLabel id="demo-simple-select-standard-label">Select District</InputLabel>
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={department}
      onChange={DepartmenthandleChange}
      label="Select District"
    >
      <MenuItem value="">
        <em>All</em>
      </MenuItem>
      <MenuItem value={10}>Noida</MenuItem>
      <MenuItem value={20}>Ghaziabad</MenuItem>
      <MenuItem value={30}>Lucknow</MenuItem>
      <MenuItem value={30}>Kanpur</MenuItem>
      <MenuItem value={30}>Meerut</MenuItem>
    </Select>
  </FormControl>
     </Grid>
     <Grid xs={12} sm={12} md={3}>
     <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
    <InputLabel id="demo-simple-select-standard-label">Select Aspirational</InputLabel>
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={department}
      onChange={DepartmenthandleChange}
      label="Select Aspirational"
    >
      <MenuItem value="">
        <em>All</em>
      </MenuItem>
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
      value={department}
      onChange={DepartmenthandleChange}
      label="Select Type"
    >
      <MenuItem value="">
        <em>Disbursement A/C</em>
      </MenuItem>
      <MenuItem value={10}>Disbursement Amount</MenuItem>
      <MenuItem value={20}>Disbursement UB</MenuItem>
    </Select>
  </FormControl>
     </Grid>
     <Grid xs={12} sm={12} md={3}>
     <TextField
                margin="normal"
                variant="standard"
                fullWidth
                id="email"
                label="From Month/Year"
                name="email"
                autoComplete="email"
                autoFocus
              />
     </Grid>
     <Grid xs={12} sm={12} md={3}>
     <TextField
                margin="normal"
                variant="standard"
                fullWidth
                id="email"
                label="To Month/Year"
                name="email"
                autoComplete="email"
                autoFocus
              />
     </Grid>
     <Grid xs={12} sm={12} md={3}>
     <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
    <InputLabel id="demo-simple-select-standard-label">Select Data Series</InputLabel>
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={department}
      onChange={DepartmenthandleChange}
      label="Select  Data Series"
    >
      <MenuItem value="">
        <em>All</em>
      </MenuItem>
      <MenuItem value={10}>2014</MenuItem>
      <MenuItem value={20}>2015</MenuItem>
    </Select>
  </FormControl>
     </Grid>
     <Grid xs={12} sm={12} md={1}>
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
      <div className="main" style={{ marginTop: "15px"}}>
      <DataTable
        title="Disbursement Amount (In Cr.)"
        columns={columns}
        data={emp_data}
        pagination
        highlightOnHover
      />
      </div>
     
     
        </Grid>
        
       
      </Grid>
</Box>

      </>

  );
};
export default Disbursement;
