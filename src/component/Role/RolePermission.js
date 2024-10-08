import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Typography,
  FormControlLabel,
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import Chip from "@mui/material/Chip";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityIcon from "@mui/icons-material/Security";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Breadcrumb from "../common/Breadcrumb";
import Loader from "../common/Loader";
import { SuccessFailedMessage, SuccessToastMessage, ErrorToastMessage } from "../common/SuccessFailedMessage";
import axios from "axios";
import authHeaders from "../Service/AuthHeaders";
import { BaseUrl } from "../url/url";
import { RolePermissionList } from './RoleRecord';
import { useEffect } from "react";
const useStyle = makeStyles((theme) =>
  createStyles({
    Buttonbg: {
      backgroundColor: "#2B60AD !important",
    },
    th: {
      fontWeight: "bold",
    },
  })
);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 4,
  boxShadow: 4,
  padding: "6px !important",
  p: 3,
};

const RolePermission = () => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const initialState = {
    model: false,
    role_name: "",
    role_status: "",
    roles: RolePermissionList,
    isLoader: false,
    isDisabled: false,
    isEditID: 0
  }
  const [state, setState] = useState(initialState);
  const openModelHandler = () => {
    setState({ ...state, ['model']: true });
  }
  const closeModelHandler = () => {
    setState({ ...state, ['model']: false, ['isEditID']: 0 });
  }

  const changePermission = (e) => {
    let updatedPermission = state.roles.map(item => {
      if (item.key == e.target.value) {
        return { ...item, checked: !item.checked }
      }
      return item;
    });
    setState({ ...state, ["roles"]: updatedPermission });

  }
  //console.log("role record per",state.roles)
  const onValueChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const saveRolePermissionHandler = async () => {
    setState({ ...state, ['isLoader']: true, ['isDisabled']: true });
    if (state.role_name === "") {
      ErrorToastMessage("Please enter Role Name", "failed");
      setState({ ...state, ['isLoader']: false, ['isDisabled']: false });
      return false;
    }
    if (state.role_status === "") {
      ErrorToastMessage("Please select Role Status", "failed");
      setState({ ...state, ['isLoader']: false, ['isDisabled']: false });
      return false;
    }
    const api = "api/auth/role-add-roles";
    await axios.post(`${BaseUrl}/${api}`, state, { headers: authHeaders() }).then((response) => {
      if (response.status !== undefined && response.status === 200) {
        SuccessToastMessage(response.data.message, "success");
        setState(initialState);
        getPermissionData();
      }
    }).catch((error) => {
      if (error.response.status && error.response.status !== undefined && error.response.status === 500) {
        ErrorToastMessage("Something went wrong, Please try again", "failed");
        setState({ ...state, ['isLoader']: false, ['isDisabled']: false });
      }
      if (error.response.status && error.response.status !== undefined && error.response.status === 401) {
        if (error.response.data.error.role_name !== undefined) {
          ErrorToastMessage(error.response.data.error.role_name[0], "failed");
        }
        if (error.response.data.error.role_status !== undefined) {
          ErrorToastMessage(error.response.data.error.role_status[0], "failed");
        }
        setState({ ...state, ['isLoader']: false, ['isDisabled']: false });
      }
    });
  }

  const [permissionData, setPermissionData] = useState([]);
  const getPermissionData = async () => {
    const api = `api/auth/role-get-role-list`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setPermissionData(response.data.data);
    }).catch((error) => {

    })
  }

  useEffect(() => {
    getPermissionData();
  }, [])

  const handleClickChnageStates = (id, status) => {
    const updatedList = permissionData.map(item => {
      if (item.id == id) {
        if (status === 1) {
          return { ...item, status: 0 };
        } else {
          return { ...item, status: 1 };
        }
      }
      return item;
    });
    setPermissionData(updatedList);
    const api = `api/auth/role-update-role-status?id=${id}&status=${status}`;
    axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
    }).catch((error) => {
      console.log('error', error)
    })
  }

  const deleteRoleHandler = async (id) => {
    var result = window.confirm("Are you sure you want to delete?");
    if (result) {
      const api = `api/auth/role-delete-role?id=${id}`;
      await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
        if (response.status !== undefined && response.status === 200) {
          SuccessToastMessage(response.data.message, "success");
          getPermissionData();
        }
      }).catch((error) => {
        if (error.response.status && error.response.status !== undefined && error.response.status === 500) {
          ErrorToastMessage("Something went wrong, Please try again", "failed");
        }
      })
    }
    return;
  }
  const openEditRoleModel = async (id) => {
    const api = `api/auth/role-get-role-list?id=${id}`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      if (response.status !== undefined && response.status === 200) {
        setState({
          ...state,
          ['model']: true,
          ['role_name']: response.data.data.role_name,
          ['role_status']: response.data.data.status,
          ['roles']: JSON.parse(response.data.data.access),
          ['isEditID']: id
        });
      }
    }).catch((error) => {
    })
  }


  //console.log("jai sri ram",processYourRoutes(routes, userPermissions));

  return (
    <>
      <Box sx={{ flexGrow: 1 }} mt={10}>
        <Breadcrumb title="Role & Permission" icon={SecurityIcon} />
        <Grid container spacing={2} mt={2}>
          <Grid xs={12} sm={12} md={12}>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent style={{ textAlign: "left" }}>
                <Typography gutterBottom variant="h6" component="div">
                  Role & Permission
                  <span style={{ float: "right", marginRight: "10px" }}>
                    <Button
                      onClick={openModelHandler}
                      variant="contained"
                      endIcon={<AddIcon />}
                    >
                      Add New Role
                    </Button>
                  </span>
                </Typography>
                <Divider />
              </CardContent>
              <SuccessFailedMessage />
            </Card>

            <div className="main" sx={{ mt: 5 }}>
              <Card style={{ marginBottom: "20px" }}>
                <CardContent>
                  <Table striped bordered hover>
                    {
                      permissionData.length > 0 ? <tbody>
                        <tr>
                          <th>Sr.</th>
                          <th>Role</th>
                          <th>Allow access</th>
                          <th>Status</th>
                          <th>#</th>
                          <th>#</th>
                        </tr>
                        {
                          permissionData.map((val, i) => {
                            return (
                              <tr style={{ verticalAlign: "middle" }}>
                                <td>{i + 1}</td>
                                <td>{val.role_name}</td>
                                {/* <td style={{ width: "50%" }}>
                                  {
                                    JSON.parse(val.access).map((v) => {
                                      return (
                                        <>
                                          {
                                            v.checked === true ? <Chip sx={{ m: 0.4 }} label={v.key} color="success" /> : <Chip sx={{ m: 0.4 }} label={v.key} />
                                          }
                                        </>

                                      )
                                    })
                                  }
                                </td> */}
                                <td style={{ width: "50%" }}>
                                  {
                                    (() => {
                                      let accessData = [];
                                      try {
                                        // Check if val.access is a string, if so parse it; otherwise, use it directly
                                        accessData = typeof val.access === 'string' ? JSON.parse(val.access) : val.access;
                                      } catch (e) {
                                        console.error("Invalid JSON format in access: ", e);
                                        return null; // Return null to avoid rendering in case of an error
                                      }

                                      return accessData.map((v) => {
                                        return (
                                          <>
                                            {v.checked === true ?
                                              <Chip sx={{ m: 0.4 }} label={v.key} color="success" />
                                              :
                                              <Chip sx={{ m: 0.4 }} label={v.key} />}
                                          </>
                                        );
                                      });
                                    })()
                                  }
                                </td>
                                <td>
                                  {
                                    val.status === 1 ? <Chip label="Active" color="success" onClick={() => handleClickChnageStates(val.id, val.status)} /> : <Chip label="Inactive" color="error" onClick={() => handleClickChnageStates(val.id, val.status)} />
                                  }
                                </td>
                                <td>
                                  <Button
                                    onClick={() => openEditRoleModel(val.id)}
                                    variant="outlined"
                                    color="primary"
                                    endIcon={<ModeEditIcon />}
                                  >
                                    Edit
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    endIcon={<DeleteIcon />}
                                    onClick={() => deleteRoleHandler(val.id)}
                                  >
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
        size="lg"
        style={{ padding: "6px !important" }}
      >
        <Box sx={{ ...style }} style={{ padding: "6px !important" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Role
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                id="role_name"
                label="Role Name"
                autoComplete="role_name"
                autoFocus
                name="role_name"
                value={state.role_name}
                onChange={(e) => onValueChange(e)}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Status *
                </InputLabel>
                <Select
                  labelId="state-label"
                  id="state-label"
                  required
                  label="Status"
                  name="role_status"
                  value={state.role_status}
                  onChange={(e) => onValueChange(e)}
                >
                  <MenuItem value={""}>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={0}>Inactive</MenuItem>
                  <MenuItem value={1}>Active</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={12} md={12}>
              <Typography variant="h6">Allow access *</Typography>
              <Grid container spacing={2}>
                {state.roles.map((val, index) => {
                  return (
                    <Grid xs={12} sm={12} md={3}>
                      <FormControlLabel
                        control={<Checkbox checked={val.checked} />}
                        label={val.key}
                        value={val.key}
                        name="role"
                        onChange={(e) => changePermission(e)}
                      />
                      {val.subkey.map((subitem) => {
                        return (
                          <div style={{ backgroundColor: "#c0c0c0" }}>
                            <Grid xs={12} sm={12} md={12} style={{ padding: "0px !important" }}>
                              <FormControlLabel style={{ padding: "0px !important" }}
                                control={<Checkbox checked={subitem.subkey_checked} />}
                                label={subitem.subkey_name}
                                value={subitem.subkey_name}
                                name="role_sub"
                              />
                            </Grid>
                          </div>
                        );
                      })}
                    </Grid>
                  )
                }
                )}
              </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.Buttonbg}
                sx={{ mt: 3, mb: 2 }}
                onClick={saveRolePermissionHandler}
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
export default RolePermission;
