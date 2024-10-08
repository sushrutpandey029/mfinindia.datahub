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
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from "@mui/material/Divider";
import { useState } from "react";
import Chip from '@mui/material/Chip';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Dropdown, DropdownMenuItem } from '../Mudra/dropdown';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Breadcrumb from "../common/Breadcrumb";
import authHeaders from "../Service/AuthHeaders";
import { BaseUrl } from "../url/url";
import axios from "axios";
import { useEffect } from "react";
import CustomPagination from './CustomPagination';
import Loader from "../common/Loader";
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
const MembersAssociateList = () => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [memberData, setMemberData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  var userdetails = JSON.parse(localStorage.getItem('user'))
  const getMemberData = async () => {
    var queryString = Object.keys(filters).map(key => key + '=' + filters[key]).join('&');
    const api = `api/auth/member-associate-master?page=${currentPage}&per_page=${dataPerPage}&${queryString}`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setMemberData(response.data.data.record);
      setTotalData(response.data.data.totalCount)
    }).catch((error) => {
      console.log('err', error)
    })
  }
  const paginate = (childdata) => {
    setCurrentPage(childdata);
  }
  const changeDataPerPage = (event) => {
    setDataPerPage(event.target.value);
    setCurrentPage(1);
  }
  useEffect(() => {
    getMemberData();
  }, [currentPage, dataPerPage]);

  const filterInitialState = {
    Member_Type: 0,
    Member_Entity: 0,
    MFI_Name: 0,
    isLoader: false,
    isDisabled: false
  }
  const [filters, setFilters] = useState(filterInitialState);
  const [memberType, setMemberType] = useState([]);
  const [memberEntity, setMemberEntity] = useState([]);
  const [mfiName, setMfiName] = useState([]);

  const onValueChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  const getMemberType = async () => {
    const api = 'api/auth/mam-member-type';
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setMemberType(response.data.data);
    }).catch((error) => {
      console.log('error', error)
    })
  }

  const getMemberEntity = async () => {
    const api = 'api/auth/mam-member-entity';
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setMemberEntity(response.data.data);
    }).catch((error) => {
      console.log('error', error)
    })
  }

  const getMfiName = async () => {
    const api = 'api/auth/mam-mfi-name';
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setMfiName(response.data.data);
    }).catch((error) => {
      console.log('error', error)
    })
  }

  const filterRecords = async () => {
    setFilters({ ...filters, ['isLoader']: true, ['isDisabled']: true });
    await getMemberData();
    setCurrentPage(1);
    setFilters({ ...filters, ['isLoader']: false, ['isDisabled']: false });
  }

  useEffect(() => {
    getMemberType();
    getMemberEntity();
    getMfiName();
  }, []);

  const handleClickChnageStates = (id, status) => {
    var result = window.confirm("Are you sure you want to update the status?");
    if (result) {
      let updatedList = memberData.map(item => {
        if (item.id == id) {
          if (status == "Active") {
            return { ...item, Status: "Inactive" };
          } else {
            return { ...item, Status: "Active" };
          }
        }
        return item;
      });
      setMemberData(updatedList);
      const api = `api/auth/mam-update-status?id=${id}&status=${status}`;
      axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log('error', error)
      })
    }
    return;
  }

  const handleClickDelete = (id) => {
    var result = window.confirm("Are you sure you want to delete this record?");
    if (result) {
      const api = `api/auth/member-associate-delete`;
      axios.get(`${BaseUrl}/${api}/${id}`, { headers: authHeaders() }).then((response) => {
        console.log(response);
        getMemberData();
      }).catch((error) => {
        console.log('error', error)
      })
    }
    return;
  }

  const getMemberAssociateService = async (id) => {
    const api = `api/auth/member-associate-details`
    return await axios.get(`${BaseUrl}/${api}/${id}`, { headers: authHeaders() });

  }
  const editMemberAssociateModal = async (id) => {
    const response = await getMemberAssociateService(id);
    setAddMemberAssociateState(response.data.data);
    setAddMemberAssociateState(preState => ({ ...preState, isLoader: false, isEditID: id, }));

    setOpen1(true);
  }

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setAddMemberAssociateState(initialAddMemberAssociateState);
    setOpen1(false);
  }

  const submitAddMemberAssociateHandler = async () => {
    setAddMemberAssociateState({ ...addMemberAssociateState, ['isLoader']: true })
    if (addMemberAssociateState.isEditID !== 0) {
      const api = "api/auth/update-member-associates";
      const res = await axios.post(`${BaseUrl}/${api}/${addMemberAssociateState.isEditID}`, addMemberAssociateState, { headers: authHeaders() }).then((response) => {
        return response;
      }).catch((error) => {
        return error.response;
      });
      if (res.status === 200) {
        setAddMemberAssociateState({ ...addMemberAssociateState, ['isLoader']: false });
        setOpen1(false);
        getMemberData();
      } else {
        if (res.data.error !== undefined) {
          if (res.data.error.MFI_Name !== undefined) {
            setAddMemberAssociateState({ ...addMemberAssociateState, ['isLoader']: false })
          }
          if (res.data.error.MFI_Shortname !== undefined) {
            setAddMemberAssociateState({ ...addMemberAssociateState, ['isLoader']: false })
          }
          if (res.data.error.Member_Entity !== undefined) {
            setAddMemberAssociateState({ ...addMemberAssociateState, ['isLoader']: false })
          }
        }
      }
    } else {
      const api = "api/auth/add-member-associates";
      const res = await axios.post(`${BaseUrl}/${api}`, addMemberAssociateState, { headers: authHeaders() }).then((response) => {
        return response;
      }).catch((error) => {
        return error.response;
      });
      if (res.status === 200) {
        setAddMemberAssociateState({ ...addMemberAssociateState, ['isLoader']: false });
        setOpen1(false);
        getMemberData();
      } else {
        if (res.data.error !== undefined) {
          if (res.data.error.MFI_Name !== undefined) {
            setAddMemberAssociateState({ ...addMemberAssociateState, ['isLoader']: false })
          }
          if (res.data.error.MFI_Shortname !== undefined) {
            setAddMemberAssociateState({ ...addMemberAssociateState, ['isLoader']: false })
          }
          if (res.data.error.Member_Entity !== undefined) {
            setAddMemberAssociateState({ ...addMemberAssociateState, ['isLoader']: false })
          }
        }
      }
    }
  }

  const initialAddMemberAssociateState = {
    Lender_code: "",
    Member_Type: "",
    Member_Entity: "",
    MFI_Name: "",
    MFI_Shortname: "",
    date_of_joining: "",
    RBI_RegNo: "",
    EndDate: "",
    Address: "",
    isLoader: false,
    isEditID: 0
  }

  const [addMemberAssociateState, setAddMemberAssociateState] = useState(initialAddMemberAssociateState);
  const onchangeAddMemberAssociateFields = (e) => {
    setAddMemberAssociateState({ ...addMemberAssociateState, [e.target.name]: e.target.value })
  }


  const downloadPdfMudraDistrictWise = () => {
    const pdf = new jsPDF();
    pdf.autoTable({
      html: "#table-to-xls"
    });
    pdf.save("members-associate")
  }

  //console.log("memberData", memberData);

  return (
    <>
      <Box sx={{ flexGrow: 1 }} mt={10}>
        <Breadcrumb title="Members and Associate" icon={SupervisorAccountIcon} />
        <Grid container spacing={2} mt={2}>
          <Grid xs={12} sm={12} md={12}>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent style={{ textAlign: "left" }}>
                <Typography gutterBottom variant="h6" component="div">
                  Members and Associate
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
                              sheet="Admin Users Report"
                              buttonText="Excel Format" />
                          </Button>
                        </DropdownMenuItem>,
                        <DropdownMenuItem>
                          <Button onClick={downloadPdfMudraDistrictWise} style={{ color: "#000000" }} endIcon={<PictureAsPdfIcon />}>
                            PDF Format
                          </Button>
                        </DropdownMenuItem>,
                      ]}
                    />
                  </span>
                </Typography>
                <Divider />
              </CardContent>
            </Card>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent style={{ textAlign: "left" }}>

                <Grid container>
                  <Grid xs={12} sm={12} md={2}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 230 }}>
                      <InputLabel id="demo-simple-select-standard-label">Member Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="Member_Type"
                        value={filters.Member_Type}
                        onChange={(e) => onValueChange(e)}
                        label="Member Type">
                        <MenuItem value={0}>
                          <em>Select Member Type</em>
                        </MenuItem>
                        {
                          memberType.map((v) => {
                            return (<MenuItem value={v.Member_Type}>{v.Member_Type}</MenuItem>)
                          })
                        }
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid xs={12} sm={12} md={3}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 300 }}>
                      <InputLabel id="demo-simple-select-standard-label">Member Entity</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="Member_Entity"
                        value={filters.Member_Entity}
                        onChange={(e) => onValueChange(e)}
                        label="Member Entity">
                        <MenuItem value={0}>
                          <em>Select Member Entity</em>
                        </MenuItem>
                        {
                          memberEntity.map((v) => {
                            return (<MenuItem value={v.Member_Entity}>{v.Member_Entity}</MenuItem>)
                          })
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={12} md={3}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 300 }}>
                      <InputLabel id="demo-simple-select-standard-label">MFI Name</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="MFI_Name"
                        value={filters.MFI_Name}
                        onChange={(e) => onValueChange(e)}
                        label="MFI Name">
                        <MenuItem value={0}>
                          <em>Select MFI Name</em>
                        </MenuItem>
                        {
                          mfiName.map((v) => {
                            return (<MenuItem value={v.MFI_Name}>{v.MFI_Name}</MenuItem>)
                          })
                        }
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
                      disabled={filters.isDisabled}
                      onClick={filterRecords}
                    >
                      Filter
                      <Loader loader={filters.isLoader} size={15} />
                    </Button>
                  </Grid>
                  <Grid xs={12} sm={12} md={3}>
                    {userdetails.data.user.user_type == '0' ? <Button onClick={handleOpen1} color="success" sx={{ mt: 3, ml: 3, mb: 2 }} variant="contained">
                      Add New Member Associate
                    </Button> : ""}

                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <div className="main" sx={{ mt: 5 }}>
              <Card style={{ marginBottom: "20px", textAlign: "left" }}>
                <CardContent>
                  <Table striped bordered hover id="table-to-xls">
                    <tbody>
                      <tr>
                        <th>Sr.</th>
                        <th>Lender Code</th>
                        <th>Member Type</th>
                        <th>Member Entity</th>
                        <th>MFI Name</th>
                        <th>Short Name</th>
                        <th>Date of Joining</th>
                        <th>RBI_RegNo</th>
                        <th>End Date</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                      {
                        memberData.map((v, i) => {
                          return (
                            <tr>
                              <td>{i + 1}</td>
                              <td>{v.Lender_code ? v.Lender_code : "N/A"}</td>
                              <td>{v.Member_Type ? v.Member_Type : "N/A"}</td>
                              <td>{v.Member_Entity ? v.Member_Entity : "N/A"}</td>
                              <td>{v.MFI_Name ? v.MFI_Name : "N/A"}</td>
                              <td>{v.MFI_Shortname ? v.MFI_Shortname : "N/A"}</td>
                              <td>{v.date_of_joining ? v.date_of_joining : "N/A"}</td>
                              <td>{v.RBI_RegNo ? v.RBI_RegNo : "N/A"}</td>
                              <td>{v.EndDate ? v.EndDate : "N/A"}</td>
                              <td>{v.Address ? v.Address : "N/A"}</td>
                              <td>
                                {
                                  v.Status == "Active" ? <Chip label="Active" style={{ borderRadius: "4px", width: "100%" }} color="success" onClick={() => handleClickChnageStates(v.id, v.Status)} /> : <Chip onClick={() => handleClickChnageStates(v.id, v.Status)} style={{ borderRadius: "4px", width: "100%" }} label="Inactive" color="error" />
                                }
                              </td>
                              <td>
                                {userdetails.data.user.user_type == '0' ?
                                  <Button type='button' onClick={() => { editMemberAssociateModal(v.id) }} color="primary" variant="contained" style={{ marginRight: "5px" }}>Edit</Button> : ""}
                                {userdetails.data.user.user_type == '0' ?
                                  <Button type='button' onClick={() => { handleClickDelete(v.id) }} color="warning" variant="contained">Delete</Button> : ""}




                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                  <CustomPagination
                    dataPerPage={dataPerPage}
                    totalData={totalData}
                    paginate={paginate}
                    currentPage={currentPage}
                    changeDataPerPage={changeDataPerPage}
                  />
                </CardContent>
              </Card>
            </div>


          </Grid>


        </Grid>
      </Box>

      {/* Add Modal here */}

      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Members and Associate
          </Typography>

          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                fullWidth
                id="Lender_code"
                label="Lender Code"
                name="Lender_code"
                autoComplete="Lender_code"
                value={addMemberAssociateState.Lender_code}
                onChange={(e) => onchangeAddMemberAssociateFields(e)}
                autoFocus
                tabIndex={1}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="Member_Type"
                label="Member Type"
                name="Member_Type"
                value={addMemberAssociateState.Member_Type}
                autoComplete="Member_Type"
                onChange={(e) => onchangeAddMemberAssociateFields(e)}
                tabIndex={2}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="Member_Entity"
                label="Member Entity"
                name="Member_Entity"
                value={addMemberAssociateState.Member_Entity}
                autoComplete="Member Entity"
                onChange={(e) => onchangeAddMemberAssociateFields(e)}
                tabIndex={3}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="MFI_Name"
                label="MFI Name"
                name="MFI_Name"
                value={addMemberAssociateState.MFI_Name}
                autoComplete="MFI_Name"
                onChange={(e) => onchangeAddMemberAssociateFields(e)}
                tabIndex={4}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="MFI_Shortname"
                label="MFI Short Name"
                name="MFI_Shortname"
                value={addMemberAssociateState.MFI_Shortname}
                autoComplete="MFI_Shortname"
                onChange={(e) => onchangeAddMemberAssociateFields(e)}
                tabIndex={5}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                fullWidth
                id="date_of_joining"
                label="Date of Joining"
                name="date_of_joining"
                value={addMemberAssociateState.date_of_joining}
                autoComplete="Date of Joining"
                onChange={(e) => onchangeAddMemberAssociateFields(e)}
                tabIndex={6}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                fullWidth
                id="RBI_RegNo"
                label="RBI Reg. No."
                name="RBI_RegNo"
                value={addMemberAssociateState.RBI_RegNo}
                autoComplete="RBI_RegNo"
                onChange={(e) => onchangeAddMemberAssociateFields(e)}
                tabIndex={7}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                fullWidth
                id="EndDate"
                label="End Date"
                name="EndDate"
                value={addMemberAssociateState.EndDate}
                autoComplete="EndDate"
                onChange={(e) => onchangeAddMemberAssociateFields(e)}
                tabIndex={8}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                fullWidth
                id="Address"
                label="Address"
                name="Address"
                value={addMemberAssociateState.Address}
                autoComplete="Address"
                onChange={(e) => onchangeAddMemberAssociateFields(e)}
                tabIndex={9}
              />
            </Grid>
            <Grid xs={12} sm={12} md={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.Buttonbg}
                sx={{ mt: 3, mb: 2 }}
                disabled={addMemberAssociateState.isLoader}
                onClick={submitAddMemberAssociateHandler}
                tabIndex={10}
              >
                Submit
                <Loader loader={addMemberAssociateState.isLoader} size={10} />
              </Button>
            </Grid>
            <Grid xs={12} sm={12} md={2}>
              <Button
                type="button"
                color="error"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleClose1}
                tabIndex={11}
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

export default MembersAssociateList;
