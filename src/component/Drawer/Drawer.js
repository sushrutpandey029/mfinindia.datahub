import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Tooltip from '@mui/material/Tooltip';
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ContactsIcon from '@mui/icons-material/Contacts';
import SecurityIcon from '@mui/icons-material/Security';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeIcon from '@mui/icons-material/Home';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RadarIcon from '@mui/icons-material/Radar';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import GrassIcon from '@mui/icons-material/Grass';
import Groups3Icon from '@mui/icons-material/Groups3';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BiotechIcon from '@mui/icons-material/Biotech';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Route, Routes, Link, useNavigate } from 'react-router-dom'

import GlpTrendsGrowth from "../MicrofinanceUniverse/Details/GlpTrendsGrowth";
import UniqueBorrowersAccountsTrend from "../MicrofinanceUniverse/Details/UniqueBorrowersAccountsTrend";
import DisbursementTrend from "../MicrofinanceUniverse/Details/DisbursementTrend";
import ParAnalysis from "../MicrofinanceUniverse/Details/ParAnalysis";
import ParBucketAnalysis from "../MicrofinanceUniverse/Details/ParBucketAnalysis";
// 18 May 2023
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CustomHistoricalGLP from "../customReport/CustomHistoricalGLP";
import CustomPARAnalysis from "../customReport/CustomPARAnalysis";
import CustomDPDBucket from "../customReport/CustomDPDBucket";
import CustomDisbursementAmount from "../customReport/CustomDisbursementAmount";
import CustomDisbursementAccount from "../customReport/CustomDisbursementAccount";
import CustomUniversePortfolio from "../customReport/CustomUniversePortfolio";
import CustomUniversePAR from "../customReport/CustomUniversePAR";

import NoPermission from "../common/NoPermission"
import OverviewGraphDetails from "../Micrometer/Overview/OverviewGraphDetails"
import MfinMembersModule from "../Micrometer/mfin_members_module"

import DRIFormUpdate from "../DRI/DRIFormUpdate"
import axios from "axios";

import UploadPublication from "../ContactDetail/UploadPublication";
import PublicationList from "../ContactDetail/PublicationList";
import UpdatePublication from "../ContactDetail/UpdatePublication";
import DataPublicationCard from "../ContactDetail/DataPublicationCard";
import ChangePhoneForm from "../DRI/ChangePhoneForm";
import ComparisonModule from "../Home/ComparisonModule/ComparisonModule"

import MicrometerResource from "../ContactDetail/MicrometerResource";
import MicromirrorResource from "../ContactDetail/MicromirrorResource";

import MicromatterResource from "../ContactDetail/MicromatterResource";
import OtherpublicationsResource from "../ContactDetail/OtherpublicationsResource";

import ChangePasswordFormUpdate from "../DRI/ChangePasswordFormUpdate"

// 18 May 2023
import PlaceIcon from '@mui/icons-material/Place';
import Logout from "./Logout";
import authHeaders from "../Service/AuthHeaders";
import { BaseUrl } from "../url/url";

import { RolePermissionList } from './PermissionAccess'
import ComprisionReport from "../Micrometer/Comprision/ComprisionReport";
import AddHomeIcon from '@mui/icons-material/AddHome';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Micrometer from "../Micrometer/Micrometer";
import DataMaster from "../DataDashboard/DataMaster"

// /importing sidebar for sit
//importing  for sit
import Dashboard from "../SITWeb/Home/Dashboard";
import AddMeeting from "../SITWeb/addMeeting/AddMeeting";
import Gallery from "../SITWeb/addMeeting/Gallery";
// import MeetingListing from "../SITWeb/addMeeting/Gallery";
import MeetingListing from "../SITWeb/addMeeting/Meetinglisting";
import MeetingUpdate from "../SITWeb/addMeeting/MeetingUpdate";
import SCM from "../SITWeb/SCM/SCM";
import DFM from "../SITWeb/DFM/DFM";
import CriticalEvent from "../SITWeb/Critical Events/CriticalEvent";
import CriticalEventList from "../SITWeb/Critical Events/CriticalEventList";
import SCC from "../SITWeb/SCC/SCC";
import MFAP from "../SITWeb/MFAP/MFAP";
import FormEntry from "../SITWeb/FormEntry";
import SCMList from "../SITWeb/SCM/SCMList";
import DFMList from "../SITWeb/DFM/DFMList";
import SCCList from "../SITWeb/SCC/SCCList";
import MFAPList from "../SITWeb/MFAP/MFAPList";
import SKM from "../SITWeb/SKM/SKM";
import SKMList from "../SITWeb/SKM/SKMList";
import EditMeeting from "../SITWeb/EditMeeting";
import ViewUpdate from "../SITWeb/ViewUpdate";
import ViewContent from "../SITWeb/ViewContent";
import UpdateMeeting from "../SITWeb/UpdateMeeting";
import Calendar from "../SITWeb/Calendar/Calendar";
import VSCM from "../SITWeb/VSCM/VSCM";
import VSCMList from "../SITWeb/VSCM/VSCMList";


const drawerWidth = 250;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "linear-gradient(52deg, #2b60ad 14.87%, #39b1ac 86.11%) !important", // Added gradient
    padding: "8px 0px !important"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonIconClosed: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    transform: "rotate(0deg)"
  },
  menuButtonIconOpen: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    transform: "rotate(180deg)"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    color: "#ffffff !important",
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    background: "#2b60ad !important",
    color: "#ffffff !important",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    background: "#2b60ad !important",
    color: "#ffffff !important",
    margintop: "0px !important",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    color: "#ffffff !important",
    marginTop: theme.spacing.unit,
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  grow: {
    flexGrow: 1
  },
  mr10: {
    marginRight: 10
  }
});

var userdetails = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
var userRoleInfo = userdetails ? JSON.parse(userdetails.data.userRole) : null;
// const userName = userdetails ? userdetails.data.user.name : null;
// const userRole = userdetails ? userdetails.data.role_name : null;
const menuItems = [
  {
    title: "Home",
    icon: "bi-house-door",
    link: "/",
    checked: true,
  },
  {
    title: "Microfinance Universe",
    icon: "bi-universal-access-circle",
    link: "/micro-finance-universe",
    checked: true,
  },
  {
    title: "MFIN Members",
    icon: "bi-file-earmark-text",
    link: "/mfinmembersmodule",
    checked: true,
  },
  {
    title: "Custom Report",
    icon: "bi bi-gear",
    link: "/customize-report",
    checked: true,
  },
  {
    title: "DRI",
    icon: "bi-map",
    link: "/dri-states",
    checked: true,
  },
  // {
  //   title: "Mudra",
  //   icon: "bi-currency-exchange",
  //   link: "/mudra",
  //   checked: true,
  // },
  {
    title: "SRO",
    icon: "bi-person-lines-fill",
    link: "/sro",
    checked: true,
  },
  {
    title: "Members & Associate",
    icon: "bi bi-people",
    link: "/members-associate",
    checked: true,
  },
  {
    title: "Contact Details",
    icon: "bi bi-telephone",
    link: "/contacts",
    checked: true,
  },
  {
    title: "Role & Permission",
    icon: "bi-shield-lock",
    link: "/role-permission",
    checked: true,
  },
  {
    title: "Admin Users",
    icon: "bi-person-badge",
    link: "/adminUsers",
    checked: true,
  },
  {
    title: "Import CSV",
    icon: "bi bi-upload",
    link: "import-csv",
    checked: true,
  },
  {
    title: "Publication List",
    icon: "bi-list-check",
    link: "/publicationlist",
    checked: true,
  }
];

const resMenuItems = menuItems.map((item) => ({
  title: item.title,
  icon: item.icon,
  link: item.link,
  match: userRoleInfo ? userRoleInfo.some((item2) => item.title === item2.key && item2.checked === true) : "",
}))

console.log('drawer-resmenuitems', resMenuItems)


const INACTIVITY_TIMEOUT = 1800000; // 30 minute

class MiniDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
      userName: "Admin User",
      userRole: [],
      role_name: "Admin",
      MFI_Name: "",
      inactivityTimeout: null,
    }
  }
  navigateMenu = () => {
    this.props.history.push('/micro-finance-universe');
  }
  state = {
    open: false,
    anchorEl: null
  };
  handleDrawerOpen = () => {
    this.setState({ open: !this.state.open });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  UpdateLogoutTime = async () => {
    try {
      const now = new Date();

      const formattedDateTime = `${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
        now.getHours()
      ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
        now.getSeconds()
      ).padStart(2, "0")}`;

      const response = await axios.post(
        "https://api.mfinindia.org/api/auth/meetings/logouttime",
        { logout_time: formattedDateTime }
      );

      console.log("Logout time updated successfully:", formattedDateTime);
      //   return response.data;
    } catch (err) {
      console.error(
        "Error in updating logout time:",
        err.message,
        err.response && err.response.data
      );
      throw err; // Optional: Re-throw error if needed
    }
  };

  handleLogout = async () => {
    var result = window.confirm(
      "You have been inactive for a while. Do you want to logout?"
    );
    if (result) {
      try {
        const { userName, role_name, user_id } = this.state;

        // Check if admin user needs to update logout time
        if (
          (role_name === "Admin" || role_name === "Vertical-Head") &&
          ["Alok Misra", "Rama Kamaraju", "Sushrut Pandey"].includes(
            userName
          )
        ) {
          await this.UpdateLogoutTime();
        }

        // Clear local storage
        // localStorage.setItem("access_token", "");
        // localStorage.setItem("user", "");
        // localStorage.setItem("loggedIn", "");
        // localStorage.setItem("mobile_verify", "");
        // localStorage.clear();

        await axios.get(`${BaseUrl}/api/auth/loginLogout?user_id=${user_id}`,
          { headers: authHeaders() })
          .then((response) => {
            localStorage.setItem("access_token", "");
            localStorage.setItem("user", "");
            localStorage.setItem("loggedIn", "");
            localStorage.setItem("mobile_verify", "");
            localStorage.clear();
            window.location.assign("/");

            // window.location.reload(true);
            console.log('logout api call');
          }).catch((error) => {
            console.log('err', error);
          });

        // Redirect to home

      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  // handleLogout = async () => {
  //   var result = window.confirm("You have been inactive for a while. Do you want to logout?");
  //   if (result) {
  //     localStorage.setItem("access_token", "");
  //     localStorage.setItem("user", "");
  //     localStorage.setItem("loggedIn", "");
  //     localStorage.setItem("mobile_verify", "");
  //     localStorage.clear();
  //     window.location.assign('/')
  //     //window.location.reload(true);
  //     //navigate('/');
  //     // navigate(0);
  //   }
  //   return;
  // }


  // componentDidMount() {
  //   var userdetails = JSON.parse(localStorage.getItem('user'))
  //   if (userdetails.data !== undefined) {
  //     if (userdetails.data.user !== undefined) {
  //       this.setState(prevState => ({
  //         userName: userdetails.data.user.name,
  //         userRole: JSON.parse(userdetails.data.userRole),
  //         role_name: userdetails.data.role_name,
  //         MFI_Name: userdetails.data.user.MFI_Name ? userdetails.data.user.MFI_Name : ""
  //       }))
  //     }
  //   }

  // }

  componentDidMount() {
    var userdetails = JSON.parse(localStorage.getItem('user'));
    if (userdetails && userdetails.data) {
      this.setState({
        userName: userdetails.data.user.name,
        user_id: userdetails.data.user.id,
        userRole: JSON.parse(userdetails.data.userRole),
        role_name: userdetails.data.role_name,
        MFI_Name: userdetails.data.user.MFI_Name || "",
      });
    }

    this.startInactivityTimer();
    window.addEventListener('mousemove', this.resetInactivityTimer);
    window.addEventListener('keypress', this.resetInactivityTimer);
  }

  componentWillUnmount() {
    this.clearInactivityTimer();
    window.removeEventListener('mousemove', this.resetInactivityTimer);
    window.removeEventListener('keypress', this.resetInactivityTimer);
  }

  startInactivityTimer = () => {
    this.clearInactivityTimer();
    this.setState({
      inactivityTimeout: setTimeout(this.handleLogout, INACTIVITY_TIMEOUT),
    });
  }

  resetInactivityTimer = () => {
    this.startInactivityTimer();
  }

  clearInactivityTimer = () => {
    if (this.state.inactivityTimeout) {
      clearTimeout(this.state.inactivityTimeout);
    }
  }


  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const res = RolePermissionList.map((el1) => ({
      linkName: el1.linkName,
      componentName: el1.componentName,
      match: this.state.userRole.some((el2) => el1.linkName === el2.linkName & el2.checked === true),
    }))
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="inherit"
          className={classes.appBar}
          fooJon={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={true}>
            <IconButton
              color="black"
              style={{ color: "#fff" }}
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classes.menuButton}
            >
              <MenuIcon
                classes={{
                  root: this.state.open
                    ? classes.menuButtonIconOpen
                    : classes.menuButtonIconClosed
                }}
              />
            </IconButton>
            <Typography
              variant="h6"
              style={{ color: "#fff" }}
              color="white"
            >
              <img className="logo-img" src='../../../../MFIN_new_logo.png' sx={{ mt: 5 }}></img>
            </Typography>
            <Typography
              variant="h6"
              color="white"
              className={classes.grow}
              noWrap
            >
            </Typography>




            <div>

              <AccountCircle aria-controls={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu} style={{ 'color': 'white', 'fontSize': '50px', 'marginLeft': '-100px' }} />

              <Menu
                style={{ marginTop: '65px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose} className={classes.menuItem}>
                  <Link to="#" style={{ color: "red", textDecoration: "none" }}>
                    <b><i>Hi  {this.state.userName + "," + this.state.MFI_Name}</i></b>
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose} className={classes.menuItem}>
                  <Link to="/change-password" style={{ color: "#000", textDecoration: "none", fontWeight: "100" }}>
                    Change Password
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose} className={classes.menuItem}>
                  <Link to="/change-phone" style={{ color: "#000", textDecoration: "none", fontWeight: "100" }}>
                    Change Phone
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleLogout} className={classes.menuItem} style={{ color: "#000", textDecoration: "none", fontWeight: "100" }}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar} />
          <List>
            {resMenuItems.map((item) => (
              item.match ? (
                <Link to={item.link} key={item.title} style={{ textDecoration: "none", color: "#fff" }}>
                  <ListItem button divider>
                    <ListItemIcon style={{ color: "#fff" }}>
                      <Tooltip title={item.title} placement="right">
                        {/* Assuming the icon is in the format 'bi.icon-name' */}
                        <i className={`bi ${item.icon}`}></i>
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItem>
                </Link>
              ) : null // or you can return <></> instead of null
            ))}
          </List>

        </Drawer>
        <main className={classes.content}>
          <Routes>
            {
              res.map((val) => {
                return (
                  <>
                    {
                      val.match === true ? <Route path={val.linkName} element={val.componentName} /> : <Route path='*' element={<NoPermission />} />
                    }
                  </>

                )
              })
            }

            <Route path="/custom-historical-glp-report" element={<CustomHistoricalGLP />} />
            <Route path="/custom-par-analysis-report" element={<CustomPARAnalysis />} />
            <Route path="/custom-dpd-bucket-report" element={<CustomDPDBucket />} />
            <Route path="/custom-disbursement-amount-report" element={<CustomDisbursementAmount />} />
            <Route path="/custom-disbursement-account-report" element={<CustomDisbursementAccount />} />
            <Route path="/custom-universe-portfolio-top-states-report" element={<CustomUniversePortfolio />} />
            <Route path="/custom-universe-par-top-states-report" element={<CustomUniversePAR />} />

            <Route path="/micro-finance-universe/glp-trends-growth" element={<GlpTrendsGrowth />} />
            <Route path="/micro-finance-universe/uniuqe-borrowers-account-trends" element={<UniqueBorrowersAccountsTrend />} />
            <Route path="/micro-finance-universe/disbursement-trend" element={<DisbursementTrend />} />
            <Route path="/micro-finance-universe/par-analysis" element={<ParAnalysis />} />
            <Route path="/micro-finance-universe/par-bucket-analysis" element={<ParBucketAnalysis />} />
            {/* <Route path="/mudra-bank" element={<MBankWise />} /> */}
            {/* Micrometer Routes */}
            <Route path="/micrometer/:graphID" element={<OverviewGraphDetails />} />
            <Route path="/update-dri/" element={<DRIFormUpdate />} />
            <Route path="/uploadpublication/" element={<UploadPublication />} />
            <Route path="/publicationlist/" element={<PublicationList />} />
            <Route path="/updatepublication/:id" element={<UpdatePublication />} />
            <Route path="/datapublicationcard" element={<DataPublicationCard />} />
            <Route path="/micrometerresource" element={<MicrometerResource />} />
            <Route path="/micromirrorresource" element={<MicromirrorResource />} />

            <Route path="/micrometer" element={<Micrometer />} />


            <Route path="/micromatterresource" element={<MicromatterResource />} />
            <Route path="/otherpublicationsresource" element={<OtherpublicationsResource />} />


            <Route path="/mfinmembersmodule" element={<MfinMembersModule />} />

            <Route path="/change-password" element={<ChangePasswordFormUpdate />} />
            <Route path="/change-phone" element={<ChangePhoneForm />} />
            <Route path="/comparison-report" element={<ComparisonModule />} />
            <Route path="/data-reports" element={<DataMaster />} />

            {/* route for sit */}
            <Route path="/sitdashboard/*" element={<Dashboard />} />
            <Route path="/add-meeting" element={<AddMeeting />} />
            <Route path="/meeting-update/:id" element={<MeetingUpdate />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/meetinglisting" element={<MeetingListing />} />

            <Route path="/scm" element={<SCM />} />
            <Route path="/vscm" element={<VSCM />} />
            <Route path="/skm" element={<SKM />} />
            <Route path="/dfm" element={<DFM />} />
            <Route path="/ci" element={<CriticalEvent />} />
            <Route path="/ci-lists" element={<CriticalEventList />} />
            <Route path="/scc" element={<SCC />} />
            <Route path="/mfap" element={<MFAP />} />
            <Route path="/form-entry" element={<FormEntry />} />
            <Route path="/scm-lists" element={<SCMList />} />
            <Route path="/vscm-lists" element={<VSCMList />} />
            <Route path="/skm-lists" element={<SKMList />} />
            <Route path="/dfm-lists" element={<DFMList />} />
            <Route path="/scc-lists" element={<SCCList />} />
            <Route path="/mfap-lists" element={<MFAPList />} />
            <Route path="/edit-meeting/:id" element={<EditMeeting />} />
            <Route path="/meeting-tracking/:id" element={<ViewUpdate />} />
            <Route path="/view-content" element={<ViewContent />} />
            <Route path="/update-meeting/:id" element={<UpdateMeeting />} />
            <Route path="/calendar" element={<Calendar />} />



            {/* <Route exact path="/" element={<Home />} />
            <Route path="/micrometer" element={<Micrometer />} />
            <Route path="/micro-finance-universe" element={<MicrofinanceUniverse />} />
            <Route path="/import-csv" element={<ImportTables />} />
            <Route path="/mfin-members" element={<Micrometer />} />
            <Route path="/mudra" element={<MDistrictWise />} />
            <Route path="/mudra-bank" element={<MBankWise />} />
            <Route path="/radar" element={<Micrometer />} />
            <Route path="/sro" element={<Micrometer />} />
            <Route path="/cbm" element={<Micrometer />} />
            <Route path="/miscellaneous" element={<Micrometer />} />
            <Route path="/contacts" element={<ContactDetail />} />
            <Route path="/logout" element={<Micrometer />} />
            <Route path="/micro-finance-universe/glp-trends-growth" element={<GlpTrendsGrowth />} />
            <Route path="/micro-finance-universe/uniuqe-borrowers-account-trends" element={<UniqueBorrowersAccountsTrend />} />
            <Route path="/micro-finance-universe/disbursement-trend" element={<DisbursementTrend />} />
            <Route path="/micro-finance-universe/par-analysis" element={<ParAnalysis />} />
            <Route path="/micro-finance-universe/par-bucket-analysis" element={<ParBucketAnalysis />} />
            <Route path="/customize-report" element={<CustomizeReport />} />
            <Route path="/custom-historical-glp-report" element={<CustomHistoricalGLP />} />
            <Route path="/custom-par-analysis-report" element={<CustomPARAnalysis />} />
            <Route path="/custom-dpd-bucket-report" element={<CustomDPDBucket />} />
            <Route path="/custom-disbursement-amount-report" element={<CustomDisbursementAmount />} />
            <Route path="/custom-disbursement-account-report" element={<CustomDisbursementAccount />} />
            <Route path="/custom-universe-portfolio-top-states-report" element={<CustomUniversePortfolio />} />
            <Route path="/custom-universe-par-top-states-report" element={<CustomUniversePAR />} />
            <Route path="/role-permission" element={<RolePermission />} />
            <Route path="/adminUsers" element={<AdminUsers />} />
            <Route path="/members-associate" element={<MembersAssociateList />} />
            <Route path="/dri-states" element={<DRIStatesMap />} /> */}

          </Routes>
          {/* <Home />
           <Micrometer /> <MicrofinanceUniverse /><ImportTables /> <ContactDetail />  <MDistrictWise /> */}

        </main>
      </div>
    );
  }
}
MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(MiniDrawer);