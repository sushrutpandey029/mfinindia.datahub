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
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from "@mui/material/Divider";
import { useState } from "react";
import Chip from '@mui/material/Chip';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Breadcrumb from "../common/Breadcrumb";
import authHeaders from "../Service/AuthHeaders";
import { BaseUrl } from "../url/url";
import axios from "axios";
import { useEffect } from "react";
import CustomPagination from './CustomPagination';
import Loader from "../common/Loader";
const useStyle = makeStyles((theme) =>
  createStyles({
    Buttonbg: {
      backgroundColor: "#058283 !important"
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
const Radar = () => {
  const classes = useStyle();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [memberData, setMemberData] = useState([]);
  const [totalData, setTotalData] = useState(0);

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
                Radar
                </Typography>
                <Divider />
              </CardContent>
            </Card>
            <Card style={{ marginBottom: "20px" }}>
              <CardContent style={{ textAlign: "left" }}>

                <Grid container>
                  <Grid xs={12} sm={12} md={3}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 340 }}>
                      <InputLabel id="demo-simple-select-standard-label">Member Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="Member_Type"
                        value={filters.Member_Type}
                        onChange={(e) => onValueChange(e)}
                        label="Member Type">
                        <MenuItem value={0}>
                          <em>Select Membe Typer</em>
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
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 340 }}>
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
                  <Grid xs={12} sm={12} md={4}>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 380 }}>
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
                </Grid>
              </CardContent>
            </Card>
            <div className="main" sx={{ mt: 5 }}>
              <Card style={{ marginBottom: "20px" }}>
                <CardContent>
                  <Table striped bordered hover>
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
                      </tr>
                      {
                        memberData.map((v, i) => {
                          return (
                            <tr>
                              <td>{i + 1}</td>
                              <td>{v.Lender_code}</td>
                              <td>{v.Member_Type}</td>
                              <td>{v.Member_Entity}</td>
                              <td>{v.MFI_Name}</td>
                              <td>{v.MFI_Shortname}</td>
                              <td>{v.date_of_joining}</td>
                              <td>{v.RBI_RegNo}</td>
                              <td>{v.EndDate}</td>
                              <td>{v.Address}</td>
                              <td>
                                {
                                  v.Status == "Active" ? <Chip label="Active" color="success" onClick={() => handleClickChnageStates(v.id, v.Status)} /> : <Chip onClick={() => handleClickChnageStates(v.id, v.Status)} label="Inactive" color="error" />
                                }
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

    </>

  );
};

export default Radar;
