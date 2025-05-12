import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import { Link, Navigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Home.css";

const useStyle = makeStyles((theme) => createStyles({}));

const Home = () => {
  var userdetails = JSON.parse(localStorage.getItem('user'))
  var userRoleInfo = JSON.parse(userdetails.data.userRole);
  console.log("Roles", userRoleInfo);

  const menuHomrItems = [
    {
      title: "Microfinance Universe",
      description: "Data on Microfinance operations of all Regulated Entities (REs) across the country on a monthly Frequency.",
      link: "/micro-finance-universe",
      icon: <i class="bi bi-universal-access-circle"></i>,
      checked: true
    },
    {
      title: "MFIN Members",
      description: "Data on Microfinance operations of all MFIN member NBFC-MFIs and Other RE's across the country on a quarterly Frequency.",
      link: "/Mfinmembersmodule",
      icon: <i className="bi bi-file-earmark-text"></i>,
      checked: true
    },
    {
      title: "Benchmarks",
      description: "Comparison of key ratios across different peer groups & different size categories.",
      link: "/comparison-report",
      icon: <i className="bi bi-bar-chart"></i>,
      checked: true
    },
    {
      title: "Custom Report",
      description: "Tailor-made microfinance reports for your unique needs.",
      link: "/customize-report",
      icon: <i className="bi bi-gear"></i>,
      checked: true
    },
    {
      title: "DRI",
      description: "District-level assessment of risk parameters for microfinance operations populated on maps.",
      link: "/dri-states",
      icon: <i className="bi bi-map"></i>,
      checked: true
    },
    // {
    //   title: "Mudra",
    //   description: "Data from MUDRA MIS on financial inclusion supported by MUDRA.",
    //   link: "/mudra",
    //   icon: <i className="bi bi-currency-exchange"></i>,
    //   checked: true
    // },
    // {
    //   title: "Mudra (Bank Wise)",
    //   description: "Financial services for microenterprises and low-income individuals. Empowering economic growth and financial inclusion.",
    //   link: "/mudra-bank",
    //   icon: <i className="bi bi-currency-exchange"></i>,
    //   checked: true
    // },
    {
      title: "SRO",
      description: "Updates on Employee Bureau, Credit Bureau, and QAR.",
      link: "/sro",
      icon: <i className="bi bi-person-lines-fill"></i>,
      checked: true
    },
    
    {
      title: "Contact Details",
      description: "Contact details of key personnel in MFIN Member and Associate Institutions.",
      link: "/contacts",
      icon: <i className="bi bi-telephone"></i>,
      checked: true
    },
    {
      title: "Publication",
      description: "Micrometer & Micromirror – quarterly publications providing insights on operational & financial parameters of mF operations in India",
      link: "/datapublicationcard",
      icon: <i className="bi bi-file-text"></i>,
      checked: true
    },
    {
      title: "Members and Associate",
      description: "Details of Members and Associates of MFIN.",
      link: "/members-associate",
      icon: <i className="bi bi-people"></i>,
      checked: true
    },
    {
      title: "Role & Permission",
      description: "Manage, assign, and control user roles and permissions.",
      link: "/role-permission",
      icon: <i className="bi bi-shield-lock"></i>,
      checked: true
    },
    {
      title: "Admin Account",
      description: "Manage admin accounts and assign roles to newly added profiles of users.",
      link: "/adminUsers",
      icon: <i className="bi bi-person-badge"></i>,
      checked: true
    },
    {
      title: "Import CSV",
      description: "Upload and replace data for various databases using comma-separated values (CSV) files.",
      link: "import-csv",
      icon: <i className="bi bi-upload"></i>,
      checked: true
    },
    {
      title: "SI Tracker",
      description:
        "An internal activity tracker for the State Initiative vertical.",
      link: "/sitdashboard",
      icon: <i className="bi bi-bar-chart-fill"></i>,
      checked: true,
    },
    
  ];

  const resCompareMenu = menuHomrItems.map((el1) => ({
    title: el1.title,
    description: el1.description,
    link: el1.link,
    icon: el1.icon,
    match: userRoleInfo.some((el2) => el1.title === el2.key & el2.checked === true),
  }));
  
  console.log("resCompareMenu",resCompareMenu);

  const classes = useStyle();
  return (
    <Box sx={{ flexGrow: 1 }} mt={10}>
      <Grid container spacing={2}>
        {/* Card View Custom design start  */}
        <Grid xs={12} sm={12} md={12}>
          <div class="ag-format-container">
            <div class="ag-courses_box">
            {resCompareMenu.map(item => (
             item.match === true ? (
              <div class="ag-courses_item">
              <Link to={item.link} class="ag-courses-item_link">
                  {/* <div class="ag-courses-item_bg"></div> */}
                  <h1>{item.icon}</h1>
                  <div class="ag-courses-item_title"><h3>{item.title}</h3></div>
                  <div class="ag-courses-item_date-box">
                  <p>{item.description}
                  {item.match}</p>
                  </div>
                </Link>
              </div>) : ("")
            ))}
             <div class="ag-courses_item">
              <Link to="https://dataweb.akosmdtech.com/Draft_User_Manual_for_Datahub_2023.pdf" target="_blank" class="ag-courses-item_link">
                  {/* <div class="ag-courses-item_bg"></div> */}
                  <h1><i class="bi bi-info-circle-fill"></i></h1>
                  <div class="ag-courses-item_title"><h3>Datahub user guide</h3></div>
                  <div class="ag-courses-item_date-box"><p>
                  Explore documentation to effortlessly navigate Datahub with user-friendly guides.</p>
                  </div>
                </Link>
              </div>  

              <div class="ag-courses_item">
              <Link to="/data-reports" target="_self" class="ag-courses-item_link">
                  {/* <div class="ag-courses-item_bg"></div> */}
                  <h1><i class="bi bi-database-fill"></i></h1>
                  <div class="ag-courses-item_title"><h3>Data Reporting</h3></div>
                  <div class="ag-courses-item_date-box">
                  <p>Data collection tool for Micrometer-Quarterly.</p>
                  </div>
                </Link>
              </div> 

              {/* <div class="ag-courses_item">
              <Link to="https://dataweb.akosmdtech.com/Draft_User_Manual_for_Datahub_2023.pdf" target="_blank" class="ag-courses-item_link">
                  <div class="ag-courses-item_bg"></div>
                  <div class="ag-courses-item_title">DataPublication Module</div>
                  <div class="ag-courses-item_date-box">
                  Publications of Event mfin
                  </div>
                </Link>
              </div>    */}
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;