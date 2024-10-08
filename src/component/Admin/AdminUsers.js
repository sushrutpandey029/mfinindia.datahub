import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import AddIcon from '@mui/icons-material/Add';
import { Link, Navigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Divider from "@mui/material/Divider";
import { useState } from "react";
import Chip from '@mui/material/Chip';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Dropdown, DropdownMenuItem } from '../Mudra/dropdown';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Table from 'react-bootstrap/Table'
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Breadcrumb from "../common/Breadcrumb";
import Loader from "../common/Loader";
import CustomPagination from '../MembersAssociate/CustomPagination';
import { SuccessFailedMessage, SuccessToastMessage, ErrorToastMessage } from "../common/SuccessFailedMessage";
import axios from "axios";
import authHeaders from "../Service/AuthHeaders";
import ReactHTMLTableToExcel from "react-html-table-to-excel-3"
import jsPDF from "jspdf";
import "jspdf-autotable"
import { BaseUrl } from "../url/url";
import { useEffect } from "react";
const useStyle = makeStyles((theme) =>
  createStyles({
    Buttonbg: {
      backgroundColor: "#2B60AD !important"
    },
    Button:
    {
      marginRight:"13px !important"
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
const AdminUsers = () => {
  var userdetails = JSON.parse(localStorage.getItem('user'))
  console.log("User Details", userdetails);
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);

  const filterInitialState = {
    search_txt: "",
    isLoader: false,
    isDisabled: false
  }
  const [filters, setFilters] = useState(filterInitialState);

 
  const getAdminUserList = async () => {
    var queryString = Object.keys(filters).map(key => key + '=' + filters[key]).join('&');
    const api = `api/auth/admin-get-admin-users-list?page=${currentPage}&per_page=${dataPerPage}&${queryString}`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setData(response.data.data);
      console.log("Total Count", response.data.totalCount);
      setTotalData(response.data.totalCount)
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
    getAdminUserList();
  }, [currentPage, dataPerPage]);

  /* Get Roles */
  const [roles, setRoles] = useState([]);
  const getRoles = () => {
    const api = `api/auth/role-get-role-list`;
    axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setRoles(response.data.data);
    }).catch((error) => {

    })
  }
  /* Get Roles */
  /* Get MFI */
    const [MFIName, setMFIName] = useState([]);
    const getMFIName = () => {
      const api = `api/auth/mam-mfi-short-name`;
      axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
        setMFIName(response.data.data);
      }).catch((error) => {
  
      })
    }
    /* Get MFI */
  useEffect(() => {
    getRoles();
    getMFIName();
  }, [])
  const initialState = {
    model: false,
    name: "",
    email: "",
    login_id: "",
    visible_password: "",
    user_type: "",
    role_id: "",
    status: "",
    designation: "",
    mobile_number: "",
    mfi_id: "",
    isLoader: false,
    isDisabled: false,
    isEditID: 0
  }
  const [state, setState] = useState(initialState);
  const onValueChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setFilters({ ...filters, [e.target.name]: e.target.value });
    console.log("FM", e.target.value);
  }

  const openModalHandler = () => {
    setState({ ...state, ["model"]: true });
  }

  const closeModelHandler = () => {
    setState({ ...state, ['model']: false, ['isEditID']: 0 });
  }

  const filterRecords = async () => {
    setFilters({ ...filters, ['isLoader']: true, ['isDisabled']: true });
    await getAdminUserList();
    setCurrentPage(1);
    setFilters({ ...filters, ['isLoader']: false, ['isDisabled']: false });
  }

  const saveAdminUserHandler = async () => {
    setState({ ...state, ['isLoader']: true, ['isDisabled']: true });
    if (state.name === "") {
      ErrorToastMessage("Please enter Name", "failed");
      setState({ ...state, ['isLoader']: false, ['isDisabled']: false });
      return false;
    }
    if (state.email === "") {
      ErrorToastMessage("Please Enter Email Address", "failed");
      setState({ ...state, ['isLoader']: false, ['isDisabled']: false });
      return false;
    }
    if (state.mobile_number === "") {
      ErrorToastMessage("Please enter Mobile Number", "failed");
      setState({ ...state, ['isLoader']: false, ['isDisabled']: false });
      return false;
    }
    if (state.role_id === "") {
      ErrorToastMessage("Please Select Role", "failed");
      setState({ ...state, ['isLoader']: false, ['isDisabled']: false });
      return false;
    }
    if (state.status === "") {
      ErrorToastMessage("Please Select Status", "failed");
      setState({ ...state, ['isLoader']: false, ['isDisabled']: false });
      return false;
    }
    const api = "api/auth/admin-save-admin-user";
    await axios.post(`${BaseUrl}/${api}`, state, { headers: authHeaders() }).then((response) => {
      if (response.status !== undefined && response.status === 200) {
        SuccessToastMessage(response.data.message, "success");
        setState(initialState);
        getAdminUserList();
      }
    }).catch((error) => {
      if (error.response.status && error.response.status !== undefined && error.response.status === 500) {
        ErrorToastMessage("Something went wrong, Please try again", "failed");
        setState({ ...state, ['isLoader']: false, ['isDisabled']: false });
      }
      if (error.response.status && error.response.status !== undefined && error.response.status === 401) {
        if (error.response.data.error.name !== undefined) {
          ErrorToastMessage(error.response.data.error.name[0], "failed");
        }
        if (error.response.data.error.email !== undefined) {
          ErrorToastMessage(error.response.data.error.email[0], "failed");
        }
        if (error.response.data.error.role_id !== undefined) {
          ErrorToastMessage(error.response.data.error.role_id[0], "failed");
        }
        if (error.response.data.error.status !== undefined) {
          ErrorToastMessage(error.response.data.error.status[0], "failed");
        }
        if (error.response.data.error.mobile_number !== undefined) {
          ErrorToastMessage(error.response.data.error.mobile_number[0], "failed");
        }
        setState({ ...state, ['isLoader']: false, ['isDisabled']: false });
      }
    });
  }

  const handleClickChnageStates = (id, status) => {
    const updatedList = data.map(item => {
      if (item.id == id) {
        if (status === 1) {
          return { ...item, status: 0 };
        } else {
          return { ...item, status: 1 };
        }
      }
      return item;
    });
    setData(updatedList);
    const api = `api/auth/admin-update-admin-user-status?id=${id}&status=${status}`;
    axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
    }).catch((error) => {
      console.log('error', error)
    })
  }
  
  const openEditAdminUserModal = async (id) => {
    const api = `api/auth/admin-get-admin-users-list?id=${id}`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      if (response.status !== undefined && response.status === 200) {
        setState({
          ...state,
          ['model']: true,
          ['name']: response.data.data[0].name,
          ['email']: response.data.data[0].email,
          ['login_id']: response.data.data[0].login_id,
          ['visible_password']: response.data.data[0].visible_password,
          ['user_type']: response.data.data[0].user_type,
          ['role_id']: response.data.data[0].role_id,
          ['status']: response.data.data[0].status,
          ['designation']: response.data.data[0].designtion,
          ['mobile_number']: response.data.data[0].mobile_number,
          ['mfi_id']: response.data.data[0].mfi_id,
          ['isEditID']: id
        });
      }
    }).catch((error) => {
    })
  }

  
  const downloadPdfMudraDistrictWise = () => {
    const pdf = new jsPDF();
    pdf.autoTable({
      html: "#table-to-xls"
    });
    pdf.save("admin-users")
  }

  const deleteAdminUserHandler = async (id) => {
    var result = window.confirm("Are you sure you want to delete?");
    if (result) {
      const api = `api/auth/admin-delete-admin-user?id=${id}`;
      await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
        if (response.status !== undefined && response.status === 200) {
          SuccessToastMessage(response.data.message, "success");
          getAdminUserList();
        }
      }).catch((error) => {
        if (error.response.status && error.response.status !== undefined && error.response.status === 500) {
          ErrorToastMessage("Something went wrong, Please try again", "failed");
        }
      })
    }
    return;
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }} mt={10}>
        <Breadcrumb title="Admin Users" icon={SupervisorAccountIcon} />
        <Grid container spacing={2} mt={2}>
          <Grid xs={12} sm={12} md={12}>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent style={{ textAlign: "left" }}>
                <Typography gutterBottom variant="h6" component="div">
                  Admin/MFI Users
                  <span style={{ float: "right", marginRight: "10px" }}><Button onClick={openModalHandler} variant="contained" endIcon={<AddIcon />}>
                    Add New Admin/MFI User
                  </Button>
                  <Link to="/update-dri/" className="btn btn-danger" color="error"  style={{color:"white", fontSize:"16px", marginLeft:"10px", marginRight:"10px"}}  variant="contained">
                    Update DRI Map
                  </Link>
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
              <SuccessFailedMessage />
            </Card>

            <Card style={{ marginBottom: "20px" }}>
              <CardContent style={{ textAlign: "left" }}>

                <Grid container>
                  <Grid xs={12} sm={12} md={6}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 700 }}>
                    <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                label="Search by Name, Mobile Number, Email Address, MFI Name"
                autoComplete="search_txt"
                name="search_txt"
                value={filters.search_txt}
                onChange={(e) => onValueChange(e)}
                autoFocus
              />
                      
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
                  <Grid xs={12} sm={12} md={5}></Grid>
                </Grid>
              </CardContent>
            </Card>

            <div className="main" sx={{ mt: 5 }}>
              <Card style={{ marginBottom: "20px" }}>
                <CardContent>
                  <Table striped bordered hover style={{textAlign:"left"}} id="table-to-xls">
                    {
                      data.length > 0 ? <tbody>
                        <tr>
                          <th>Sr.</th>
                          <th>Name</th>
                          <th>Designation</th>
                          <th>Email Address</th>
                          <th>Login ID</th>
                          <th>Password</th>
                          <th>Mobile Number</th>
                          <th>Role</th>
                          <th>MFI</th>
                          <th>Status</th>
                          <th>#</th>
                          <th>#</th>
                        </tr>
                        {
                          data.map((user, i) => {
                            return (
                              <tr>
                                <td>{i + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.designtion}</td>
                                <td>{user.email}</td>
                                <td>{user.login_id}</td>
                                <td>{user.visible_password}</td>
                                <td>{user.mobile_number}</td>
                                <td>{user.user_role !== null ? user.user_role.role_name : ""}</td>
                                <td>{user.user_member_info !== null ? user.user_member_info.MFI_Shortname : "N/A"}</td>
                                <td>
                                  {user.status === 1 ? <Chip label="Active" color="success" onClick={() => handleClickChnageStates(user.id, user.status)} /> : <Chip label="Inactive" color="error" onClick={() => handleClickChnageStates(user.id, user.status)} />}
                                </td>
                                <td>
                                  <Button onClick={() => openEditAdminUserModal(user.id)} variant="outlined" color="primary" endIcon={<ModeEditIcon />}>
                                    Edit
                                  </Button>
                                  </td>
                                  <td>
                                  <Button onClick={() => deleteAdminUserHandler(user.id)} variant="outlined" color="error" endIcon={<DeleteIcon />}>
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            )
                          })
                        }

                      </tbody> : "There are no records found."
                    }

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
      <Modal
        open={state.model}
        onClose={closeModelHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Admin/MFI User
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                label="Enter Name"
                autoComplete="name"
                autoFocus
                name="name"
                value={state.name}
                onChange={(e) => onValueChange(e)}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                label="Enter Designation"
                autoComplete="admin_designation"
                name="designation"
                value={state.designation}
                onChange={(e) => onValueChange(e)}
                autoFocus
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="admin_email_address"
                label="Enter Email Address"
                autoComplete="admin_email_address"
                name="email"
                value={state.email}
                onChange={(e) => onValueChange(e)}
                autoFocus
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="login_id"
                label="Enter Login ID"
                autoComplete="login_id"
                name="login_id"
                value={state.login_id}
                onChange={(e) => onValueChange(e)}
                autoFocus
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="admin_password"
                label="Enter Password"
                autoComplete="admin_password"
                autoFocus
                name="visible_password"
                value={state.visible_password}
                onChange={(e) => onValueChange(e)}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="admin_mobile_number"
                label="Enter Mobile Number"
                autoComplete="admin_mobile_number"
                autoFocus
                name="mobile_number"
                value={state.mobile_number}
                onChange={(e) => onValueChange(e)}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
                <InputLabel id="mfi_id">MFI Member</InputLabel>
                <Select
                  labelId="mfi_id"
                  id="mfi_id"
                  label="MFI Member"
                  name="mfi_id"
                  value={state.mfi_id}
                  onChange={(e) => onValueChange(e)}
                >
                  <MenuItem value={""}>
                    <em>Select</em>
                  </MenuItem>
                  {
                    MFIName.map((val, i) => <MenuItem value={val.id}>{val.MFI_Shortname}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
                <InputLabel id="demo-simple-select-standard-label">Role *</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  required
                  label="Role"
                  name="role_id"
                  value={state.role_id}
                  onChange={(e) => onValueChange(e)}
                >
                  <MenuItem value={""}>
                    <em>Select</em>
                  </MenuItem>
                  {
                    roles.map((val, i) => <MenuItem value={val.id}>{val.role_name}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
                <InputLabel id="demo-simple-select-standard-label">Status *</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  required
                  label="Status"
                  name="status"
                  value={state.status}
                  onChange={(e) => onValueChange(e)}
                >
                  <MenuItem value={""}>Select</MenuItem>
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={0}>Inactive</MenuItem>
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
                onClick={saveAdminUserHandler}
                disabled={state.isDisabled}
              >
                Submit
                <Loader loader={state.isLoader} size={15} />
              </Button>
            </Grid>
            <Grid xs={12} sm={12} md={2}>
              <Button
                type="submit"
                color="error"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={closeModelHandler}
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
export default AdminUsers;
