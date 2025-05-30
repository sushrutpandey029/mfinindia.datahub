// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Unstable_Grid2";
// import "./dashboard.css";
// import axios from "axios";
// import Breadcrumb from "../../common/Breadcrumb";
// import SecurityIcon from "@mui/icons-material/Security";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import * as XLSX from "xlsx";
// import { BaseUrl, getPieCountData } from "../../url/url";
// import PieChart from "../Graph/PieChart";

// const Dashboard = () => {
//   const user = localStorage.getItem("user");
//   const userData = JSON.parse(user);
//   const userName = userData.data.user.name;
//   const userRole = userData.data.role_name;

//   const navigate = useNavigate();
//   const [activityCounts, setActivityCounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [latestData, setLatestData] = useState(null);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [countPieData, setCountPieData] = useState([]);

//   useEffect(() => {
//     const fetchActivityCounts = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.mfinindia.org/api/auth/meetings/count/activities`,
//           {
//             params: {
//               user_role: userRole,
//               username: userName,
//             },
//           }
//         );
//         setActivityCounts(response.data.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchActivityCounts();
//   }, []);

//   useEffect(() => {
//     const isToShowModal = localStorage.getItem("latestAcitivityModal");
//     const getLatestData = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.mfinindia.org/api/auth/meetings/latest-logout"
//         );
//         if (response.data.data) {
//           setLatestData(response.data.data);
//           setShowModal(true);
//           localStorage.setItem("latestAcitivityModal", 1);
//         }
//       } catch (err) {
//         console.log("error in getting latest data", err.message);
//       }
//     };

//     if ((userRole === "Admin" || userRole === "Vertical-Head") && isToShowModal != 1) {
//       getLatestData();
//     }
//   }, []);

//   useEffect(() => {
//     const fetchPieData = async () => {
//       const response = await axios.get(`${BaseUrl}/${getPieCountData}`, {
//         params: {
//           user_role: userRole,
//           username: userName,
//         },
//       });
//       console.log("resp data", response.data);
//       setCountPieData(response.data);
//     };
//     fetchPieData();
//   }, []);

//   const menuItems = [
//     {
//       title: "SKMs",
//       subTitle: "Stakeholder Engagement",
//       activityType: "SKM",
//       link: "/skm",
//       icon: <i className="bi bi-people"></i>,
//     },
//     {
//       title: "SCMs",
//       subTitle: "State Chapter Meeting",
//       activityType: "SCM",
//       link: "/scm",
//       icon: <i className="bi bi-people"></i>,
//     },
//     {
//       title: "VSCMs",
//       subTitle: "Virtual State Chapter Meeting",
//       activityType: "VSCM",
//       link: "/vscm",
//       icon: <i className="bi bi-people"></i>,
//     },
//     {
//       title: "DFMs",
//       subTitle: "District Forum Meeting",
//       activityType: "DFM",
//       link: "/dfm",
//       icon: <i className="bi bi-patch-check-fill"></i>,
//     },
//     {
//       title: "CIs",
//       subTitle: "Critical Incidents",
//       activityType: "CI",
//       link: "/ci",
//       icon: <i className="bi bi-exclamation-triangle-fill"></i>,
//     },
//     {
//       title: "SCCs",
//       subTitle: "State Coordination Committee",
//       activityType: "SCC",
//       link: "/scc",
//       icon: <i className="bi bi-people-fill"></i>,
//     },
//     {
//       title: "MFAPs",
//       subTitle: "MicroFinance Awareness Program",
//       activityType: "MFAP",
//       link: "/mfap",
//       icon: <i className="bi bi-piggy-bank-fill"></i>,
//     },
//     {
//       title: "Activity Planner FY 25-26",
//       subTitle: "Calendar",
//       activityType: "MFAP",
//       link: "/calendar",
//       icon: <i className="bi bi-calendar-event-fill"></i>,
//     },
//   ];

//   // Function to get count for a specific activity type
//   const getCountForActivity = (activityType) => {
//     const activity = activityCounts.find(
//       (item) => item.activity_type === activityType
//     );
//     return activity ? activity.count : 0;
//   };

//   const handleDownloadMeeting = async () => {
//     try {
//       const response = await axios.get(
//         "https://api.mfinindia.org/api/auth/meetings/count/activity_type",
//         {
//           params: {
//             user_role: userRole,
//             username: userName,
//           },
//         }
//       );
//       console.log("all meetings data", response.data);

//       // Define columns you want to exclude
//       const columnsToExclude = [
//         "id",
//         "created_at",
//         "updated_at",
//         "logout_time",
//       ];

//       // Filter the data to exclude unwanted columns
//       const filteredExportData = response.data.data.map((item) => {
//         const newItem = { ...item };
//         columnsToExclude.forEach((col) => delete newItem[col]);
//         return newItem;
//       });

//       const ws = XLSX.utils.json_to_sheet(filteredExportData);
//       const wb = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, "SIT");

//       const randomNum = Math.floor(Math.random() * 9000) + 1000;
//       // const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
//       const filename = `SIT_Meetings_${randomNum}.xlsx`;

//       XLSX.writeFile(wb, filename);
//     } catch (err) {
//       console.log("error in downloading all meetings.", err);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   if (loading)
//     return (
//       <div className="loading-container">
//         <div className="loading-message">Loading...</div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="error-container">
//         <div className="error-message">Error: {error}</div>
//       </div>
//     );

//   return (
//     <div className="AddMeeting">
//       <div className="container mt-5">
//         <div className="row g-4 mt-5">
//           <div className="col-sm-12 mt-0">
//             <Box className="mt-0" sx={{ flexGrow: 1, mt: 5, px: 3 }}>
//               <Grid container spacing={2}>
//                 <Grid xs={12} sm={12} md={12}>
//                   <div className="row justify-content-end mt-0">
//                     <div className="col-sm-6">
//                       <div className="col-sm-6 mb-3">
//                         <button
//                           onClick={() => navigate(-1)} // Goes back to previous page
//                           className="back-button"
//                           style={{
//                             background: "none",
//                             border: "none",
//                             cursor: "pointer",
//                             display: "flex",
//                             alignItems: "center",
//                             marginBottom: "1rem",
//                           }}
//                         >
//                           <ArrowBackIcon />
//                         </button>
//                       </div>
//                       {/* <Breadcrumb title="SIT" icon={SecurityIcon} /> */}
//                     </div>
//                     {/* <div className="col-sm-6 text-end">
//                       <button
//                         type="button"
//                         className="css-1vhaqj4-MuiButtonBase-root-MuiButton-root  w-auto m-0 "
//                         onClick={() => navigate("/form-entry")}
//                         style={{ marginRight: "10px" }} // 5px gap between dropdown and button
//                       >
//                         Add Activity <i class="bi bi-plus"></i>
//                       </button>
//                     </div> */}
//                     <div className="col-sm-6 text-end button-group">
//                       <button
//                         type="button"
//                         className="css-1vhaqj4-MuiButtonBase-root-MuiButton-root  w-auto m-0"
//                         onClick={() => navigate("/form-entry")}
//                       >
//                         Add Activity <i className="bi bi-plus"></i>
//                       </button>

//                       <button
//                         type="button"
//                         className="css-1vhaqj4-MuiButtonBase-root-MuiButton-root  w-auto m-0"
//                         onClick={handleDownloadMeeting}
//                       >
//                         Download All Meetings <i className="bi bi-download"></i>
//                       </button>
//                     </div>
//                   </div>
//                   <div className="ag-format-container">
//                     <div className="ag-courses_box">
//                       {menuItems.map((item, index) => (
//                         <div key={index} className="ag-courses_item">
//                           <Link
//                             to={item.link}
//                             className="ag-courses-item_link"
//                             target={
//                               item.link.startsWith("http") ? "_blank" : "_self"
//                             }
//                           >
//                             <h1>{item.icon}</h1>
//                             <div className="ag-courses-item_title">
//                               <h3>{item.subTitle}</h3>
//                               <span className="short-name">({item.title})</span>
//                               <h5 className="count-display">
//                                 {getCountForActivity(item.activityType)}
//                               </h5>
//                             </div>
//                           </Link>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </Grid>
//                 <PieChart data={countPieData}/>
//               </Grid>
//             </Box>
//             {/* Modal for showing latest data */}
//             {showModal && latestData && (
//               <div
//                 className="modal"
//                 style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
//               >
//                 <div className="modal-dialog modal-dialog-centered">
//                   <div className="modal-content">
//                     <div className="modal-header">
//                       <h5 className="modal-title">
//                         New Activity Data Available
//                       </h5>
//                       <button
//                         type="button"
//                         className="btn-close"
//                         onClick={closeModal}
//                         aria-label="Close"
//                       ></button>
//                     </div>
//                     <div className="modal-body">
//                       <div className="latest-data-container">
//                         <div className="data-item">
//                           <span className="data-label">Total New Data:</span>
//                           <span className="data-value">
//                             {latestData.null_count_after_latest}
//                           </span>
//                         </div>

//                         {/* {Object.entries(latestData.activity_type_counts).map(
//                           ([key, value]) => (
//                             <div key={key} className="data-item">
//                               <span className="data-label">{key}:</span>
//                               <span className="data-value">{value}</span>
//                             </div>
//                           )
//                         )} */}
//                         {Object.entries(latestData.activity_type_counts).map(
//                           ([key, value]) => {
//                             const activityRoutes = {
//                               SKM: "/skm",
//                               SCM: "/scm",
//                               DFM: "/dfm",
//                               CI: "/critical-event",
//                               SCC: "/scc",
//                               MFAP: "/mfap",
//                             };

//                             return (
//                               <Link
//                                 to={activityRoutes[key] || "#"}
//                                 className="data-item-link"
//                                 onClick={() => setShowModal(false)}
//                                 key={key}
//                               >
//                                 <div className="data-item">
//                                   <span className="data-label">{key}:</span>
//                                   <span className="data-value">{value}</span>
//                                 </div>
//                               </Link>
//                             );
//                           }
//                         )}
//                       </div>
//                     </div>
//                     <div className="modal-footer">
//                       <button
//                         type="button"
//                         className="btn btn-primary"
//                         onClick={closeModal}
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import "./dashboard.css";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as XLSX from "xlsx";
import { BaseUrl, getPieCountData, getBarCountData } from "../../url/url";
import PieChart from "../Graph/PieChart";
import BarChart from "../Graph/BarChart";

const Dashboard = () => {
  // User data and state initialization
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const userName = userData.data.user.name;
  const userRole = userData.data.role_name;

  const navigate = useNavigate();
  const [activityCounts, setActivityCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestData, setLatestData] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Chart data states
  const [countPieData, setCountPieData] = useState([]);
  const [countBarData, setCountBarData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));

  // Fetch activity counts
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
  }, [userRole, userName]);

  // Fetch latest activity data for modal
  useEffect(() => {
    const isToShowModal = localStorage.getItem("latestAcitivityModal");
    const getLatestData = async () => {
      try {
        const response = await axios.get(
          "https://api.mfinindia.org/api/auth/meetings/latest-logout"
        );
        if (response.data.data) {
          setLatestData(response.data.data);
          setShowModal(true);
          localStorage.setItem("latestAcitivityModal", 1);
        }
      } catch (err) {
        console.log("error in getting latest data", err.message);
      }
    };

    // if ((userRole === "Admin" || userRole === "Vertical-Head") && isToShowModal != 1) {
    //   getLatestData();
    // }
    if (userRole === "Vertical-Head" && isToShowModal != 1) {
      getLatestData();
    }
  }, [userRole]);

  // Fetch pie chart data
  const fetchPieData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/${getPieCountData}`, {
        params: {
          user_role: userRole,
          username: userName,
        },
      });
      setCountPieData(response.data);
    } catch (error) {
      console.error("Error fetching pie data:", error);
    }
  };

  // Fetch bar chart data
  const fetchBarData = async (year = selectedYear, month = selectedMonth) => {
    try {
      const response = await axios.get(`${BaseUrl}/${getBarCountData}`, {
        params: {
          user_role: userRole,
          username: userName,
          year: year,
          month: month,
        },
      });
      setCountBarData(response.data);
    } catch (error) {
      console.error("Error fetching bar data:", error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchPieData();
    fetchBarData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Menu items configuration
  const menuItems = [
    {
      title: "SKMs",
      subTitle: "Stakeholder Engagement",
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
      title: "VSCMs",
      subTitle: "Virtual State Chapter Meeting",
      activityType: "VSCM",
      link: "/vscm",
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
      link: "/ci",
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

  // Get count for specific activity type
  const getCountForActivity = (activityType) => {
    const activity = activityCounts.find(
      (item) => item.activity_type === activityType
    );
    return activity ? activity.count : 0;
  };

  // Handle meeting data download
  // const handleDownloadMeeting = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://api.mfinindia.org/api/auth/meetings/count/allmeeting",
  //       {
  //         params: {
  //           user_role: userRole,
  //           username: userName,
  //         },
  //       }
  //     );
  //     console.log("all meetings data", response.data);

  //     // Define columns you want to exclude
  //     const columnsToExclude = [
  //       "created_at",
  //       "updated_at",
  //       "logout_time",
  //     ];

  //     // Filter the data to exclude unwanted columns
  //     const filteredExportData = response.data.data.map((item) => {
  //       const newItem = { ...item };
  //       columnsToExclude.forEach((col) => delete newItem[col]);
  //       return newItem;
  //     });

  //     const ws = XLSX.utils.json_to_sheet(filteredExportData);
  //     const wb = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, "SIT");

  //     const randomNum = Math.floor(Math.random() * 9000) + 1000;
  //     // const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  //     const filename = `SIT_Meetings_${randomNum}.xlsx`;

  //     XLSX.writeFile(wb, filename);
  //   } catch (err) {
  //     console.log("error in downloading all meetings.", err);
  //   }
  // };


const handleDownloadMeeting = async () => {
  try {
    const response = await axios.get(
      "https://api.mfinindia.org/api/auth/meetings/count/allmeeting",
      {
        params: {
          user_role: userRole,
          username: userName,
        },
      }
    );
    console.log("all meetings data", response.data);

    const columnsToExclude = [
      "created_at",
      "updated_at",
      "logout_time",
    ];

    const filteredExportData = response.data.data.map((item) => {
      const newItem = { ...item };

      // Exclude unwanted columns
      columnsToExclude.forEach((col) => delete newItem[col]);

      // Rename head_and_si_remark to Head_SI_Remark
      if (newItem.hasOwnProperty("head_and_si_remark")) {
        newItem["Head_SI_Remark"] = newItem["head_and_si_remark"];
        delete newItem["head_and_si_remark"];
      }
      
      // Reorder keys: put Head_SI_Remark right after status_update
      const reorderedItem = {};
      for (const key in newItem) {
        reorderedItem[key] = newItem[key];
        if (key === "status_update" && newItem["Head_SI_Remark"] !== undefined) {
          reorderedItem["Head_SI_Remark"] = newItem["Head_SI_Remark"];
        }
      }

      return reorderedItem;
    });

    const ws = XLSX.utils.json_to_sheet(filteredExportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SIT");

    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    const filename = `SIT_Meetings_${randomNum}.xlsx`;

    XLSX.writeFile(wb, filename);
  } catch (err) {
    console.log("error in downloading all meetings.", err);
  }
};



  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Loading and error states
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-message">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

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
                          onClick={() => navigate(-1)}
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

                    <div className="col-sm-6 text-end button-group">
                      <button
                        type="button"
                        className="css-1vhaqj4-MuiButtonBase-root-MuiButton-root w-auto m-0"
                        onClick={() => navigate("/form-entry")}
                      >
                        Add Activity <i className="bi bi-plus"></i>
                      </button>

                      <button
                        type="button"
                        className="css-1vhaqj4-MuiButtonBase-root-MuiButton-root w-auto m-0"
                        onClick={handleDownloadMeeting}
                      >
                        Download All Meetings <i className="bi bi-download"></i>
                      </button>
                    </div>
                  </div>



                  {/* Activity Cards */}
                  <div className="ag-format-container">
                    {/* Bar Chart - Right Side */}

                    <Grid container spacing={2}>
                      {/* Bar Chart - 60% Width */}
                      <Grid item xs={12} md={7}>
                        <div className="chart-container">
                          <BarChart
                            data={countBarData}
                            selectedYear={selectedYear}
                            selectedMonth={selectedMonth}
                            onFilterChange={(year, month) => {
                              setSelectedYear(year);
                              setSelectedMonth(month);
                              fetchBarData(year, month);
                            }}
                          />
                        </div>
                      </Grid>

                      {/* Pie Chart - 40% Width */}
                      <Grid item xs={12} md={5}>
                        <div className="chart-container">
                          <PieChart data={countPieData} />
                        </div>
                      </Grid>
                    </Grid>


                    <div className="ag-courses_box">
                      {menuItems.map((item, index) => (
                        <div key={index} className="ag-courses_item">
                          <Link
                            to={item.link}
                            className="ag-courses-item_link sit"
                            target={item.link.startsWith("http") ? "_blank" : "_self"}
                          >
                            <h1>{item.icon}</h1>
                            <div className="ag-courses-item_title sittitle">
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

                    {/* <Grid style={{ paddingRight: 0 }}>
                      <div className="chart-container">
                        <BarChart
                          data={countBarData}
                          selectedYear={selectedYear}
                          selectedMonth={selectedMonth}
                          onFilterChange={(year, month) => {
                            setSelectedYear(year);
                            setSelectedMonth(month);
                            fetchBarData(year, month);
                          }}
                        />
                      </div>
                    </Grid> */}

                    {/* Charts Section */}
                    {/* <Grid container justifyContent="center"> */}
                    {/* Pie Chart - Left Side */}
                    {/* <Grid style={{ paddingLeft: 0 }}>
                        <div className="chart-container" style={{
                          width: '100%',
                        }}>
                          <PieChart data={countPieData} />
                        </div>
                      </Grid> */}


                    {/* </Grid> */}
                  </div>
                </Grid>
              </Grid>
            </Box>

            {/* Latest Activity Modal */}
            {showModal && latestData && (
              <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">New Activity Data Available</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="latest-data-container">
                        <div className="data-item">
                          <span className="data-label">Total New Data:</span>
                          <span className="data-value">
                            {latestData.null_count_after_latest}
                          </span>
                        </div>
                        {Object.entries(latestData.activity_type_counts).map(
                          ([key, value]) => {
                            const activityRoutes = {
                              SKM: "/skm",
                              SCM: "/scm",
                              DFM: "/dfm",
                              CI: "/critical-event",
                              SCC: "/scc",
                              MFAP: "/mfap",
                            };

                            return (
                              <Link
                                to={activityRoutes[key] || "#"}
                                className="data-item-link"
                                onClick={() => setShowModal(false)}
                                key={key}
                              >
                                <div className="data-item">
                                  <span className="data-label">{key}:</span>
                                  <span className="data-value">{value}</span>
                                </div>
                              </Link>
                            );
                          }
                        )}
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;