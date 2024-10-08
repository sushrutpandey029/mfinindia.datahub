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
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import Divider from "@mui/material/Divider";
import { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Checkbox from "@mui/material/Checkbox";
import ReactHTMLTableToExcel from "react-html-table-to-excel-3"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import "jspdf-autotable"
import { Dropdown, DropdownMenuItem } from '../Mudra/dropdown';
import SortIcon from "@mui/icons-material/ArrowDownward";
//import { columns } from "./contactdata";
import "./contact.css";
import Modal from '@mui/material/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Breadcrumb from '../common/Breadcrumb'
import { getContactRecords, addContactService, getContactDetailsService } from "../Service/Contact/Services";
import Loader from "../common/Loader";
import { SuccessFailedMessage, SuccessToastMessage, ErrorToastMessage } from '../common/SuccessFailedMessage';
import axios from "axios";
import { BaseUrl, importContactApi, getContactListApi } from "../url/url";
import authHeaders from "../Service/AuthHeaders";
import { CSVLink, CSVDownload } from "react-csv";
import CircularProgress from "@material-ui/core/CircularProgress";

import AutocompleteSearch from "./AutocompleteSearch";

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

const ContactDetail = () => {
  var userdetails = JSON.parse(localStorage.getItem('user'))
  console.log("User Details", userdetails);
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setAddContactState(initialAddContactState);
    setOpen1(false);
  }
  const importInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }
  const [importCsv, setImportCsv] = useState(importInitialState);
  const changeImportContactCsv = (event) => {
    setImportCsv({ ...importCsv, ['csv_import']: event.target.files[0], ['isDisabled']: false });
  }

  const importContactCsvHandler = async () => {
    setImportCsv({ ...importCsv, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      importCsv.csv_import,
      importCsv.csv_import.name
    );
    const api = `${importContactApi}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    //console.log("resresresres", res);
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setImportCsv(importInitialState);
      setOpen(false);
      getContactData();
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setImportCsv(importInitialState);
      setOpen(false);
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failed");
        setImportCsv(importInitialState);
        setOpen(false);
      }
    }
  }

  const downloadPdfMudraBankWise = () => {
    const pdf = new jsPDF();
    pdf.autoTable({
      html: "#table-to-xls"
    });
    pdf.save("contact-us")
  }
  const initialAddContactState = {
    Institution_f_name: "",
    Institution_s_name: "",
    Lender_Type: "",
    Entity: "",
    Name: "",
    Department: "",
    Designation: "",
    E_mail: "",
    Mobile: "",
    Mobile2: "",
    Status: "",
    isLoader: false,
    isEditID: 0
  }



  const [addContactState, setAddContactState] = useState(initialAddContactState);
  const onchangeAddContactFields = (e) => {
    setAddContactState({ ...addContactState, [e.target.name]: e.target.value })
  }

  const submitAddContactHandler = async () => {
    setAddContactState({ ...addContactState, ['isLoader']: true })
    if (addContactState.isEditID !== 0) {
      const api = "api/auth/update-contacts";
      const res = await axios.post(`${BaseUrl}/${api}/${addContactState.isEditID}`, addContactState, { headers: authHeaders() }).then((response) => {
        return response;
      }).catch((error) => {
        return error.response;
      });
      if (res.status === 200) {
        SuccessToastMessage(res.data.message, "failed");
        setAddContactState({ ...addContactState, ['isLoader']: false });
        setOpen1(false);
        getContactData();
      } else {
        if (res.data.error !== undefined) {
          if (res.data.error.Institution_f_name !== undefined) {
            ErrorToastMessage(res.data.error.Institution_f_name[0], "failed");
            setAddContactState({ ...addContactState, ['isLoader']: false })
          }
          if (res.data.error.Institution_s_name !== undefined) {
            ErrorToastMessage(res.data.error.Institution_s_name[0], "failed");
            setAddContactState({ ...addContactState, ['isLoader']: false })
          }
          /* if (res.data.error.Lender_Type !== undefined) {
            ErrorToastMessage(res.data.error.Lender_Type[0], "failed");
            setAddContactState({ ...addContactState, ['isLoader']: false })
          } */
          if (res.data.error.Name !== undefined) {
            ErrorToastMessage(res.data.error.Name[0], "failed");
            setAddContactState({ ...addContactState, ['isLoader']: false })
          }
          if (res.data.error.Department !== undefined) {
            ErrorToastMessage(res.data.error.Department[0], "failed");
            setAddContactState({ ...addContactState, ['isLoader']: false })
          }
          // if (res.data.error.Designation !== undefined) {
          //   ErrorToastMessage(res.data.error.Designation[0], "failed");
          //   setAddContactState({ ...addContactState, ['isLoader']: false })
          // }
          if (res.data.error.E_mail !== undefined) {
            ErrorToastMessage(res.data.error.E_mail[0], "failed");
            setAddContactState({ ...addContactState, ['isLoader']: false })
          }
          if (res.data.error.Mobile !== undefined) {
            ErrorToastMessage(res.data.error.Mobile[0], "failed");
            setAddContactState({ ...addContactState, ['isLoader']: false })
          }
          // if (res.data.error.Mobile2 !== undefined) {
          //   ErrorToastMessage(res.data.error.Mobile2[0], "failed");
          //   setAddContactState({ ...addContactState, ['isLoader']: false })
          // }
        }
      }
    } else {
      const api = "api/auth/add-contacts";
      const res = await axios.post(`${BaseUrl}/${api}`, addContactState, { headers: authHeaders() }).then((response) => {
        return response;
      }).catch((error) => {
        return error.response;
      });
      if (res.status === 200) {
        SuccessToastMessage(res.data.message, "failed");
        setAddContactState({ ...addContactState, ['isLoader']: false });
        setOpen1(false);
        getContactData();
      } else {
        if (res.data.error !== undefined) {
          if (res.data.error.Institution_f_name !== undefined) {
            ErrorToastMessage(res.data.error.Institution_f_name[0], "failed");
            setAddContactState({ ...addContactState, ['isLoader']: false })
          }
          if (res.data.error.Institution_s_name !== undefined) {
            ErrorToastMessage(res.data.error.Institution_s_name[0], "failed");
            setAddContactState({ ...addContactState, ['isLoader']: false })
          }
         /*  if (res.data.error.Lender_Type !== undefined) {
            ErrorToastMessage(res.data.error.Lender_Type[0], "failed");
            setAddContactState({ ...addContactState, ['isLoader']: false })
          } */
          if (res.data.error.Name !== undefined) {
            ErrorToastMessage(res.data.error.Name[0], "failed");
            setAddContactState({ ...addContactState, ['isLoader']: false })
          }
          // if (res.data.error.Department !== undefined) {
          //   ErrorToastMessage(res.data.error.Department[0], "failed");
          //   setAddContactState({ ...addContactState, ['isLoader']: false })
          // }
          if (res.data.error.Designation !== undefined) {
            ErrorToastMessage(res.data.error.Designation[0], "failed");
            setAddContactState({ ...addContactState, ['isLoader']: false })
          }
          if (res.data.error.E_mail !== undefined) {
            ErrorToastMessage(res.data.error.E_mail[0], "failed");
            setAddContactState({ ...addContactState, ['isLoader']: false })
          }
          if (res.data.error.Mobile !== undefined) {
            ErrorToastMessage(res.data.error.Mobile[0], "failed");
            setAddContactState({ ...addContactState, ['isLoader']: false })
          }
          // if (res.data.error.Mobile2 !== undefined) {
          //   ErrorToastMessage(res.data.error.Mobile2[0], "failed");
          //   setAddContactState({ ...addContactState, ['isLoader']: false })
          // }
        }
      }
    }



  }
  const editContactModal = async (id) => {
    const response = await getContactDetailsService(id);
    setAddContactState(response.data.data);
    setAddContactState(preState => ({ ...preState, isLoader: false, isEditID: id, }));

    setOpen1(true);
  }
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
    setAddContactState({ ...addContactState, ['Status']: event.target.value })
  };


  const [contactRecords, setContactRecords] = useState([]);
  const [contactCount, setContactCount] = useState(0);
  const [activeConatctCount, setActiveContactCount] = useState(0);
  const [inactiveConatctCount, setInctiveContactCount] = useState(0);
  const getContactData = async () => {
    let response = await getContactRecords()
    if (response.data.status === 200) {
      const result = response.data.data.map(({ created_at, updated_at, ...rest }) => ({ ...rest }));
      const arrWithButton = result.map(object => {
        return { ...object, showButtons: true }
      });
      setContactRecords(arrWithButton);
      setContactCount(arrWithButton.length)
      const arrWithActive = response.data.data.filter(function (el) {
        return el.Status === 'Active';
      });
      setActiveContactCount(arrWithActive.length);

      const arrWithInctive = response.data.data.filter(function (el) {
        return el.Status !== 'Active';
      });
      setInctiveContactCount(arrWithInctive.length);
    }
  }
  useEffect(() => {
    getContactData();
  }, []);

  const columns = [
    {
      name: "Institution Name",
      selector: "Institution_f_name",
      filterable: true,
      sortable: true
    },
    {
      name: "Short Name",
      selector: "Institution_s_name",
      filterable: true,
      sortable: true
    },
    {
      name: "Lender Type",
      selector: "Lender_Type",
      filterable: true,
      sortable: true,
      right: true
    },
    {
      name: "Entity",
      selector: "Entity",
      filterable: true,
      sortable: true,
      right: true
    },
    {
      name: "Name",
      selector: "Name",
      filterable: true,
      sortable: true,
      center: true
    },
    // {
    //   name: "Department",
    //   selector: "Department",
    //   filterable: true,
    //   sortable: true,
    //   right: true
    // },
    {
      name: "Designation",
      selector: "Designation",
      filterable: true,
      sortable: true,
      right: true
    },
    {
      name: "E-mail",
      selector: "E_mail",
      filterable: true,
      sortable: true,
      center: true
    },
    {
      name: "Mobile",
      selector: "Mobile",
      filterable: true,
      sortable: true,
      center: true
    },
    // {
    //   name: "Phone/Mobile2",
    //   selector: "Mobile2",
    //   filterable: true,
    //   sortable: true,
    //   right: true
    // },
    {
      name: "Status",
      selector: "Status",
      filterable: true,
      sortable: true,
      center: true
    },
    {
      name: "Action",
      button: true,
      cell: row =>
        row.showButtons ? (
          <>
          { userdetails.data.user_type == '0'?
            <Button type='button' onClick={() => { editContactModal(row.id) }} color="primary" variant="contained">Edit</Button>: "" }  
          </>
        ) : null
    }
  ];

  const exportContactCsvHeaders = [
    { label: "Institution Name", key: "Institution_f_name" },
    { label: "Short Name", key: "Institution_s_name" },
    { label: "Lender Type", key: "Lender_Type" },
    { label: "Entity", key: "Entity" },
    { label: "Name", key: "Name" },
    { label: "Department", key: "Department" },
    { label: "Designation", key: "Designation" },
    { label: "E-mail", key: "E_mail" },
    { label: "Mobile", key: "Mobile" },
    { label: "Phone/Mobile2", key: "Mobile2" },
    { label: "Status", key: "Status" }
  ];
  const [exportContactCvData, setExportContactCvData] = useState([]);
  const [exportActive, setExportActive] = useState(false);
  const csvLink = useRef(null);

  useEffect(() => {
    if (exportContactCvData.length) {
      setExportActive(true);
    }
  }, [exportContactCvData])

  useEffect(() => {
    if (exportActive) {
      csvLink.current.link.click();
      setExportActive(false);
    }
  }, [exportActive])

  const exportContactCv = async () => {
    const api = 'api/auth/contacts'
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() })
      .then((res) => {
        setExportContactCvData(res.data.data)
        setExportActive(true);
      })
      .catch((e) => {
        console.log(e)
      })
  }


  const [openInstitutionName, setOpenInstitutionName] = useState(false);
  const [openName, setOpenName] = useState(false);
  const [openDesignation, setOpenDesignation] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(false);

  const [searchOpetions, setSearchOptions] = useState([]);
  const loadingInstitutionName = openInstitutionName && openInstitutionName.length === 0;
  const loadingName = openName && openName.length === 0;
  const loadingDesignation = openDesignation && openDesignation.length === 0;
  const loadingDepartment = openDepartment && openDepartment.length === 0;


  const onChangeHandle = async (event) => {
    // console.log(event.target.name)
    let api = `${getContactListApi}`;
    if (event.target.name == "Institution_f_name") {
      let api = `${getContactListApi}?Institution_f_name=${event.target.value}`;
    }
    if (event.target.name == "Name") {
      let api = `${getContactListApi}?Name=${event.target.value}`;
    }
    if (event.target.name == "Designation") {
      let api = `${getContactListApi}?Designation=${event.target.value}`;
    }
    if (event.target.name == "Department") {
      let api = `${getContactListApi}?Department=${event.target.value}`;
    }

    const response = await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() });
    setSearchOptions(response.data.data);
  };
  useEffect(() => {
    if (!openInstitutionName) {
      setSearchOptions([]);
    }
  }, [openInstitutionName]);

  useEffect(() => {
    if (!openName) {
      setSearchOptions([]);
    }
  }, [openName]);


  useEffect(() => {
    if (!openDesignation) {
      setSearchOptions([]);
    }
  }, [openDesignation]);

  useEffect(() => {
    if (!openDepartment) {
      setSearchOptions([]);
    }
  }, [openDepartment]);

  const searchInitialValue = {
    filter: 1,
    isLoader: false,
    isDisabled: false,
    Institution_f_name: "",
    Name: "",
    Designation: "",
    Department: ""
  }
  const [filterValue, setFilterValue] = useState(searchInitialValue);

  const filterConatctDetails = async () => {
    setFilterValue({ ...filterValue, ['isLoader']: true, ['isDisabled']: true });
    var queryString = Object.keys(filterValue).map(key => key + '=' + filterValue[key]).join('&');
    const api = `${getContactListApi}?${queryString}`;
    const response = await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() });
    const result = response.data.data.map(({ created_at, updated_at, ...rest }) => ({ ...rest }));
    const arrWithButton = result.map(object => {
      return { ...object, showButtons: true }
    });
    setContactRecords(arrWithButton);
    setContactCount(arrWithButton.length)
    const arrWithActive = response.data.data.filter(function (el) {
      return el.Status === 'Active';
    });
    setActiveContactCount(arrWithActive.length);

    const arrWithInctive = response.data.data.filter(function (el) {
      return el.Status !== 'Active';
    });
    setInctiveContactCount(arrWithInctive.length);
    setFilterValue({ ...filterValue, ['isLoader']: false, ['isDisabled']: false });
  }
 
  return (
    <>
    
      <Box sx={{ flexGrow: 1 }} mt={10}>
        <Breadcrumb title="Contact Detail" icon={ContactMailIcon} />
        <Grid container spacing={2} mt={2}>
          <Grid xs={12} sm={12} md={12}>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent style={{ textAlign: "left" }}>
                <Typography gutterBottom variant="h6" component="div">
                  Contact Detail
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
                            sheet="Mudra Bank Wise Report"
                            buttonText="Excel Format" />
                        </Button>
                      </DropdownMenuItem>,
                      <DropdownMenuItem>
                        <Button onClick={downloadPdfMudraBankWise} style={{ color: "#000000" }} endIcon={<PictureAsPdfIcon />}>
                          PDF Format
                        </Button>
                      </DropdownMenuItem>,
                    ]}
                  />

                  </span>
                {/*   <span style={{ float: "right", marginRight: "10px" }}><Button onClick={exportContactCv} color="warning" variant="contained" endIcon={<FileDownloadIcon />}>
                    Export
                  </Button></span> */}
                  { userdetails.data.user.user_type == '0'? 
                  <span style={{ float: "right", marginRight: "10px" }}><Button onClick={handleOpen1} variant="contained" endIcon={<CloudDownloadIcon />}>
                    Add New Contact
                  </Button></span>
                  : "" }  
                </Typography>
                <Divider />
              </CardContent>
              <SuccessFailedMessage />
            </Card>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent style={{ textAlign: "left" }}>

                <Grid container>
                  <Grid xs={12} sm={12} md={3}>
                    <Autocomplete
                      id="asynchronous-demo-institution-name"
                      style={{ width: 300 }}
                      open={openInstitutionName}
                      onOpen={() => {
                        setOpenInstitutionName(true);
                      }}
                      onClose={() => {
                        setOpenInstitutionName(false);
                      }}
                      onChange={(event, newValue) => {
                        if (newValue && newValue.Institution_f_name !== undefined) {
                          setFilterValue({ ...filterValue, ['Institution_f_name']: newValue.Institution_f_name });
                        } else {
                          setFilterValue({ ...filterValue, ['Institution_f_name']: "" });
                        }

                      }}
                      getOptionSelected={(option, value) => option.Institution_f_name === value.Institution_f_name}
                      getOptionLabel={option => option.Institution_f_name}
                      options={searchOpetions}
                      loading={loadingInstitutionName}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Search by Institution Name"
                          variant="outlined"
                          onChange={onChangeHandle}
                          name={'Institution_f_name'}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {loadingInstitutionName ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            )
                          }}
                        />
                      )}
                    />
                    {/* <AutocompleteSearch fieldName = {"Institution_f_name"} /> */}
                  </Grid>
                  <Grid xs={12} sm={12} md={3}>
                    <Autocomplete
                      id="asynchronous-demo-name"
                      style={{ width: 300 }}
                      open={openName}
                      onOpen={() => {
                        setOpenName(true);
                      }}
                      onClose={() => {
                        setOpenName(false);
                      }}
                      onChange={(event, newValue) => {
                        if (newValue && newValue.Name !== undefined) {
                          setFilterValue({ ...filterValue, ['Name']: newValue.Name });
                        } else {
                          setFilterValue({ ...filterValue, ['Name']: "" });
                        }
                      }}
                      getOptionSelected={(option, value) => option.Name === value.Name}
                      getOptionLabel={option => option.Name}
                      options={searchOpetions}
                      loading={loadingName}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Search by Name"
                          variant="outlined"
                          onChange={onChangeHandle}
                          name={'Name'}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {loadingName ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            )
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid xs={12} sm={12} md={2}>
                    <Autocomplete
                      id="asynchronous-demo-designation"
                      style={{ width: 200 }}
                      open={openDesignation}
                      onOpen={() => {
                        setOpenDesignation(true);
                      }}
                      onClose={() => {
                        setOpenDesignation(false);
                      }}
                      onChange={(event, newValue) => {
                        if (newValue && newValue.Designation !== undefined) {
                          setFilterValue({ ...filterValue, ['Designation']: newValue.Designation });
                        } else {
                          setFilterValue({ ...filterValue, ['Designation']: "" });
                        }
                      }}
                      getOptionSelected={(option, value) => option.Designation === value.Designation}
                      getOptionLabel={option => option.Designation}
                      options={searchOpetions}
                      loading={loadingName}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Search by Designation"
                          variant="outlined"
                          onChange={onChangeHandle}
                          name={'Designation'}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {loadingName ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            )
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={2}>
                    <Autocomplete
                      id="asynchronous-demo-Department"
                      style={{ width: 200 }}
                      open={openDepartment}
                      onOpen={() => {
                        setOpenDepartment(true);
                      }}
                      onClose={() => {
                        setOpenDepartment(false);
                      }}
                      onChange={(event, newValue) => {
                        if (newValue && newValue.Department !== undefined) {
                          setFilterValue({ ...filterValue, ['Department']: newValue.Department });
                        } else {
                          setFilterValue({ ...filterValue, ['Department']: "" });
                        }
                      }}
                      getOptionSelected={(option, value) => option.Department === value.Department}
                      getOptionLabel={option => option.Department}
                      options={searchOpetions}
                      loading={loadingDepartment}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Search by Department"
                          variant="outlined"
                          onChange={onChangeHandle}
                          name={'Department'}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {loadingDepartment ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            )
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={2}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.Buttonbg}
                      sx={{ mt: 1, mb: 2 }}
                      disabled={filterValue.isDisabled}
                      onClick={filterConatctDetails}
                    >
                      Filter
                      <Loader loader={filterValue.isLoader} size={15} />
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={4}>
                <Card>
                  <CardContent style={{ paddingBottom: "0px" }}>
                    <h2 style={{ marginBottom: "-21px", marginTop: "8px" }}><ContactMailIcon style={{ fontSize: "40px", color: "#058283" }} /></h2>
                    <h1 style={{ fontSize: "18px", marginBottom: "8px", marginTop: "30px" }}>{contactCount}</h1>
                    <p style={{ fontSize: "15px", fontWeight: "500", marginBottom: "8px", color: "#058283", marginTop: "8px" }}>Total Contacts</p>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} sm={12} md={4}>
                <Card>
                  <CardContent style={{ paddingBottom: "0px" }}>
                    <h2 style={{ marginBottom: "-21px", marginTop: "8px" }}><ContactMailIcon style={{ fontSize: "40px", color: "#34A853" }} /></h2>
                    <h1 style={{ fontSize: "18px", marginBottom: "8px", marginTop: "30px" }}>{activeConatctCount}</h1>
                    <p style={{ fontSize: "15px", fontWeight: "500", marginBottom: "8px", color: "#34A853", marginTop: "8px" }}>Total Active Contacts</p>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} sm={12} md={4}>
                <Card>
                  <CardContent style={{ paddingBottom: "0px" }}>
                    <h2 style={{ marginBottom: "-21px", marginTop: "8px" }}><ContactMailIcon style={{ fontSize: "40px", color: "#D32F2F" }} /></h2>
                    <h1 style={{ fontSize: "18px", marginBottom: "8px", marginTop: "30px" }}>{inactiveConatctCount}</h1>
                    <p style={{ fontSize: "15px", fontWeight: "500", marginBottom: "8px", color: "#D32F2F", marginTop: "8px" }}>Total Inactive Contacts</p>
                  </CardContent>
                </Card>
              </Grid>
</Grid>

            <Grid container spacing={2}>


              <Grid xs={12} sm={12} md={12}>
              <div className="AppTable">
              <Table striped bordered hover id={"table-to-xls"}>
                      <thead>
                        <tr>
                       {/*  <th>Sr.</th> */}
                          <th>Institution Name</th>
                          <th>Short Name</th>
                          {/* <th>Lender Type</th> */}
                          <th>Entities</th>
                          <th>Name</th>
                          <th>Designation</th>
                          <th>Department</th>
                          <th>Email</th>
                          <th>Mobile No.</th>
                          <th>Phone Number</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      
                      <tbody>
                      {
                      contactRecords.map(row => {return (
                        <tr>
                         {/*  <td style={{textAlign:"left"}}>1</td> */}
                         <td style={{textAlign:"left"}}>{row.Institution_f_name?row.Institution_f_name:"N/A"}</td>
                          <td style={{textAlign:"left"}}>{row.Institution_s_name?row.Institution_s_name:"N/A"}</td>
                          {/* <td style={{textAlign:"left"}}>{row.Lender_Type?row.Lender_Type:"N/A"}</td> */}
                          <td style={{textAlign:"left"}}>{row.Entity?row.Entity:"N/A"}</td>
                          <td style={{textAlign:"left"}}>{row.Name?row.Name:"N/A"}</td>
                          <td style={{textAlign:"left"}}>{row.Designation?row.Designation:"N/A"}</td>
                          <td style={{textAlign:"left"}}>{row.Department?row.Department:"N/A"}</td>
                          <td style={{textAlign:"left"}}>{row.E_mail?row.E_mail:"N/A"}</td>
                          <td style={{textAlign:"left"}}>{row.Mobile?row.Mobile:"N/A"}</td>
                          <td style={{textAlign:"left"}}>{row.Mobile2?row.Mobile2:"N/A"}</td>
                          <td style={{textAlign:"left"}}>{row.Status?row.Status:"N/A"}</td>
                          <td><>
          { userdetails.data.user.user_type == '0'?
            <Button type='button' onClick={() => { editContactModal(row.id) }} color="primary" variant="contained">Edit</Button>: "" }  
          </></td>
                          
                        </tr>
 );
})}
                      </tbody> 
                    </Table>
               {/*  <DataTable
                  id={"table-to-xls"}
                  columns={columns}
                  data={contactRecords}
                  defaultSortAsc={false}
                  sortIcon={<SortIcon />}
                  pagination
                  highlightOnHover
                />
            */}
              </div>
            </Grid>
            </Grid>
            


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
            id="myFile"
            name="myFile"
            autoComplete="myFile"
            inputProps={{ accept: ".csv" }}
            autoFocus
            onChange={changeImportContactCsv}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.Buttonbg}
            sx={{ mt: 3, mb: 2 }}
            disabled={importCsv.isDisabled}
            onClick={importContactCsvHandler}
          >
            Submit
            <Loader loader={importCsv.isLoader} size={10} />
          </Button>
        </Box>
      </Modal>

      {/* Add Modal here */}

      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Contact information
          </Typography>

          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="Institution_f_name"
                label="Institution Name"
                name="Institution_f_name"
                autoComplete="Institution_f_name"
                value={addContactState.Institution_f_name}
                onChange={(e) => onchangeAddContactFields(e)}
                autoFocus
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="Institution_s_name"
                label="Institution Short Name"
                name="Institution_s_name"
                value={addContactState.Institution_s_name}
                autoComplete="Institution_s_name"
                onChange={(e) => onchangeAddContactFields(e)}
                autoFocus
              />
            </Grid>
            {/* <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="Lender_Type"
                label="Lender Type "
                name="Lender_Type"
                value={addContactState.Lender_Type}
                autoComplete="Lender_Type"
                onChange={(e) => onchangeAddContactFields(e)}
                autoFocus
              />
            </Grid> */}
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="Entity"
                label="Entities"
                name="Entity"
                value={addContactState.Entity}
                autoComplete="Entity"
                onChange={(e) => onchangeAddContactFields(e)}
                autoFocus
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="Name"
                label="Name"
                name="Name"
                value={addContactState.Name}
                autoComplete="Name"
                onChange={(e) => onchangeAddContactFields(e)}
                autoFocus
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
               // required
                fullWidth
                id="Department"
                label="Department"
                name="Department"
                value={addContactState.Department}
                autoComplete="Department"
                onChange={(e) => onchangeAddContactFields(e)}
                autoFocus
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="Designation"
                label="Designation"
                name="Designation"
                value={addContactState.Designation}
                autoComplete="Designation"
                onChange={(e) => onchangeAddContactFields(e)}
                autoFocus
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="E_mail"
                label="Email Address"
                name="E_mail"
                value={addContactState.E_mail}
                autoComplete="E_mail"
                onChange={(e) => onchangeAddContactFields(e)}
                autoFocus
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="Mobile"
                label="Mobile Number"
                name="Mobile"
                value={addContactState.Mobile}
                autoComplete="Mobile"
                onChange={(e) => onchangeAddContactFields(e)}
                autoFocus
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
               // required
                fullWidth
                id="Mobile2"
                label="Phone Number"
                name="Mobile2"
                value={addContactState.Mobile2}
                autoComplete="Mobile2"
                onChange={(e) => onchangeAddContactFields(e)}
                autoFocus
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
                <InputLabel id="demo-simple-select-standard-label">Status *</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={addContactState.Status}
                  required
                  onChange={DepartmenthandleChange}
                  label="Status"
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Inactive"}>Inactive</MenuItem>
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
                disabled={addContactState.isLoader}
                onClick={submitAddContactHandler}
              >
                Submit
                <Loader loader={addContactState.isLoader} size={10} />
              </Button>
            </Grid>
            <Grid xs={12} sm={12} md={2}>
              <Button
                type="submit"
                color="error"
                fullWidth
                variant="contained"

                sx={{ mt: 3, mb: 2 }}
                onClick={handleClose1}
              >
                Cancel
              </Button>
            </Grid>

          </Grid>

        </Box>
      </Modal>
    </>

  );
};

export default ContactDetail;
