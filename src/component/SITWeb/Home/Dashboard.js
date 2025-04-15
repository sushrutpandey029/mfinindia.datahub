import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import "./dashboard.css";
import axios from "axios";
import Breadcrumb from "../../common/Breadcrumb";
import SecurityIcon from "@mui/icons-material/Security";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Dashboard = () => {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const userName = userData.data.user.name;
  const userRole = userData.data.role_name;

  const navigate = useNavigate();
  const [activityCounts, setActivityCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivityCounts = async () => {
      try {
        const response = await axios.get(
          `https://api.mfinindia.org/api/auth/meetings/count/activities`,
          {
            params: {
              user_role: userRole,
              username: userName,
            },
          }
        );
        setActivityCounts(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivityCounts();
  }, []);

  const menuItems = [
    {
      title: "SKMs",
      subTitle: "Stateholder Engagement",
      activityType: "SKM",
      link: "/skm",
      icon: <i className="bi bi-people"></i>,
    },
    {
      title: "SCMs",
      subTitle: "State Chapter Meeting",
      activityType: "SCM",
      link: "/scm",
      icon: <i className="bi bi-people"></i>,
    },
    {
      title: "DFMs",
      subTitle: "District Forum Meeting",
      activityType: "DFM",
      link: "/dfm",
      icon: <i className="bi bi-patch-check-fill"></i>,
    },
    {
      title: "CIs",
      subTitle: "Critical Incidents",
      activityType: "CI",
      link: "/critical-event",
      icon: <i className="bi bi-exclamation-triangle-fill"></i>,
    },
    {
      title: "SCCs",
      subTitle: "State Coordination Committee",
      activityType: "SCC",
      link: "/scc",
      icon: <i className="bi bi-people-fill"></i>,
    },
    {
      title: "MFAPs",
      subTitle: "MicroFinance Awareness Program",
      activityType: "MFAP",
      link: "/mfap",
      icon: <i className="bi bi-piggy-bank-fill"></i>,
    },
    {
      title: "Activity Planner FY 25-26",
      subTitle: "Calendar",
      activityType: "MFAP",
      link: "/calendar",
      icon: <i className="bi bi-calendar-event-fill"></i>,
    },
  ];

  // Function to get count for a specific activity type
  const getCountForActivity = (activityType) => {
    const activity = activityCounts.find(
      (item) => item.activity_type === activityType
    );
    return activity ? activity.count : 0;
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-message">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <div className="error-message">Error: {error}</div>
      </div>
    );

  return (
    <div className="AddMeeting">
      <div className="container mt-5">
        <div className="row g-4 mt-5">
          <div className="col-sm-12 mt-0">
            <Box className="mt-0" sx={{ flexGrow: 1, mt: 5, px: 3 }}>
              <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={12}>
                  <div className="row justify-content-end mt-0">
                    <div className="col-sm-6">
                      <div className="col-sm-6 mb-3">
                        <button
                          onClick={() => navigate(-1)} // Goes back to previous page
                          className="back-button"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "1rem",
                          }}
                        >
                          <ArrowBackIcon />
                        </button>
                      </div>
                      {/* <Breadcrumb title="SIT" icon={SecurityIcon} /> */}
                    </div>
                    <div className="col-sm-6 text-end">
                      <button
                        type="button"
                        className="css-1vhaqj4-MuiButtonBase-root-MuiButton-root  w-auto m-0 "
                        onClick={() => navigate("/form-entry")}
                        style={{ marginRight: "10px" }} // 5px gap between dropdown and button
                      >
                        Add Activity <i class="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="ag-format-container">
                    <div className="ag-courses_box">
                      {menuItems.map((item, index) => (
                        <div key={index} className="ag-courses_item">
                          <Link
                            to={item.link}
                            className="ag-courses-item_link"
                            target={
                              item.link.startsWith("http") ? "_blank" : "_self"
                            }
                          >
                            <h1>{item.icon}</h1>
                            <div className="ag-courses-item_title">
                              <h3>{item.subTitle}</h3>
                              <span className="short-name">({item.title})</span>
                              <h5 className="count-display">
                                {getCountForActivity(item.activityType)}
                              </h5>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
