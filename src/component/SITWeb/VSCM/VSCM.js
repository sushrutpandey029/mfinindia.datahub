import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import "../SCM/SCM.css";
import AssessmentIcon from '@mui/icons-material/Assessment';
import axios from "axios";
import Breadcrumb from "../../common/Breadcrumb";
import SecurityIcon from "@mui/icons-material/Security";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 

const VSCM = () => {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const userName = userData.data.user.name;
  const userRole = userData.data.role_name;

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.mfinindia.org/api/auth/meetings/count/activity_type",
          {
            params: {
              user_role: userRole,
              username: userName,
              activity_type: "VSCM",
            },
          }
        );
        setApiData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBoxClick = (status) => {
    // Navigate to SCMList with status as a URL parameter
    navigate(`/vscm-lists?status=${status.toLowerCase()}`);
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
  if (!apiData) return <div>No data available</div>;

  return (
    <div className="AddMeeting mt-6">
      <div className="container-fluid ">
        <div className="row g-0 ">
          <div className="col-12">
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
            </div>
            <div className="col-sm-12 text-end">
              <button
                type="button"
                className="css-1vhaqj4-MuiButtonBase-root-MuiButton-root  w-auto m-0 "
                onClick={() => navigate("/form-entry")}
                style={{ marginRight: "10px" }} // 5px gap between dropdown and button
              >
                Add Activity <i class="bi bi-plus"></i>
              </button>
            </div>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                p: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",

                  mb: 3,
                }}
              >
                <div className="Heading mt-0">
                  <h4>
                 Virtual State Chapter Meeting :<span> {apiData.total_records}</span>
                  </h4>
                </div>
              </Box>

              <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={12}>
                  <div className="ag-format-container">
                    <div className="ag-courses_box">
                      {/* Open Box */}
                      <div className="ag-courses_item open-box">
                        <div
                          className="ag-courses-item_link"
                          onClick={() => handleBoxClick("Open")}
                          style={{ cursor: "pointer" }}
                        >
                          <h1>
                            <i className="bi bi-folder2-open"></i>
                          </h1>
                          <div className="ag-courses-item_title">
                            <h3>Open</h3>
                            <h3>
                              {(apiData.hod_observation_counts &&
                                apiData.hod_observation_counts.Open) ||
                                0}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Closed Box */}
                      <div className="ag-courses_item close-box">
                        <div
                          className="ag-courses-item_link"
                          onClick={() => handleBoxClick("Closed")}
                          style={{ cursor: "pointer" }}
                        >
                          <h1>
                            <i class="bi bi-x"></i>
                          </h1>
                          <div className="ag-courses-item_title">
                            <h3>Closed</h3>
                            <h3>
                              {(apiData.hod_observation_counts &&
                                apiData.hod_observation_counts.Closed) ||
                                0}
                            </h3>
                          </div>
                        </div>
                      </div>
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

export default VSCM;
