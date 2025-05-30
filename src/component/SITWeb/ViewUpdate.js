import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 

// import "./ViewUpdate.css"

const ViewUpdate = () => {
  const { id } = useParams();
  const [baseMeetingData, setBaseMeetingData] = useState(null);
  const [trackingData, setTrackingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

   const navigate = useNavigate();

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await axios.get(
          `https://api.mfinindia.org/api/auth/meetings/meetingtracking/tracking/${id}`
        );

        setApiResponse(response.data);

        if (response.data && response.data.success) {
          setBaseMeetingData(
            response.data.data && response.data.data.base_meeting
          );
          if (response.data.data && response.data.data.tracking_history) {
            setTrackingData(response.data.data.tracking_history);
          }
        } else {
          setError("No tracking history found");
        }
      } catch (err) {
        setError("Failed to fetch tracking data");
        console.error("Error fetching tracking data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingData();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString || dateString === "Null") return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  const formatTime = (dateString) => {
    if (!dateString || dateString === "Null") return "-";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const baseColumns = [
    {
      name: "Date",
      selector: (row) => formatDate(row.created_at),
      sortable: true,
      width: "120px",
    },
    {
      name: "Time",
      selector: (row) => formatTime(row.created_at),
      sortable: true,
      width: "120px",
    },
    {
      name: "Regional Head",
      selector: (row) => row.regional_head || "-",
      sortable: true,
      width: "180px",
    },
    {
      name: "Activity Type",
      selector: (row) => row.activity_type || "-",
      sortable: true,
      width: "180px",
    },
    {
      name: "Region",
      selector: (row) => row.region || "-",
      sortable: true,
      width: "180px",
    },
    {
      name: "State",
      selector: (row) => row.state || "-",
      sortable: true,
      width: "180px",
    },
    {
      name: "District",
      selector: (row) => row.district || "-",
      sortable: true,
      width: "180px",
    },
    {
      name: "Status Update",
      selector: (row) => row.status_update || "-",
      sortable: true,
      wrap: true,
      width: "180px",
    },
    {
      name: "Head & SI Remark",
      selector: (row) => row.head_and_si_remark || "-",
      sortable: true,
      wrap: true,
      width: "180px",
    },
    {
      name: "HOD Observation",
      selector: (row) => row.hod_observation || "-",
      sortable: true,

      // conditionalCellStyles: [
      //   {
      //     when: (row) => true,
      //     style: { color: "red", fontWeight: "bold" },
      //   },
      // ],
    },
  ];

  const trackingColumns = [
    {
      name: "Date",
      selector: (row) => formatDate(row.updated_at),
      sortable: true,
      width: "120px",
    },
    {
      name: "Time",
      selector: (row) => formatTime(row.updated_at),
      sortable: true,
      width: "120px",
    },
    // {
    //   name: "Regional Head",
    //   selector: (row) => row.regional_head || "-",
    //   sortable: true,
    // },
    {
      name: "HOD_SI_Remark",
      selector: (row) => row.status_update || "-",
      sortable: true,
      wrap: true,
      // width: "180px",
    },
    {
      name: "HOD Observation",
      selector: (row) => row.hod_observation || "-",
      sortable: true,
      // width: "180px",
      // conditionalCellStyles: [
      //   {
      //     when: (row) => true,
      //     style: { color: "red", fontWeight: "bold" },
      //   },
      // ],
    },
    // {
    //   name: "Head & SI Remark",
    //   selector: (row) => row.head_and_si_remark || "-",
    //   sortable: true,
    //   wrap: true,
    // },
    // {
    //   name: "Date Circulation Of MOM",
    //   selector: (row) => row.dateCirculationMOM || "-",
    //   sortable: true,
    //   wrap: true,
    // },
    // {
    //   name: "Uploaded MOM",
    //   // selector: row => row.uploadMOM || '-',
    //   sortable: true,
    //   wrap: true,
    //   cell: (row) => (
    //     <a
    //       href={`https://api.mfinindia.org/public/${row.uploadMOM}`}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       style={{
    //         color: "blue",
    //         textDecoration: "underline",
    //         cursor: "pointer",
    //       }}
    //     >
    //       <DownloadIcon />
    //     </a>
    //   ),
    //   center: true,
    // },

    // {
    //   name: "Changes",
    //   selector: (row) => {
    //     const changes = [];
    //     const baseData = baseMeetingData || {};
    //     if (row.important_decision !== baseData.important_decision)
    //       changes.push("Important Decision");
    //     if (row.activity_details !== baseData.activity_details)
    //       changes.push("Activity Details");
    //     if (row.district !== baseData.district) changes.push("District");
    //     if (row.uploadFile !== baseData.uploadFile) changes.push("Upload File");
    //     if (row.dateCirculationMOM !== baseData.dateCirculationMOM)
    //       changes.push("Date Circulation MOM");
    //     if (row.uploadMOM !== baseData.uploadMOM) changes.push("Upload MOM");
    //     return changes.join(", ") || "No significant changes";
    //   },
    //   wrap: true,
    // },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems={"center"}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div className="AddMeeting mt-6">
      <div className="container-fluid ">
        <div className="row g-0 ">
          <div className="col-12">
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
            <Box p={3}>
              <Typography variant="h5" gutterBottom>
                Meeting Update History
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Meeting ID: {id}
              </Typography>

              {/* API Response Display */}
              {/* <Box mt={3} mb={4}>
                <Typography variant="h6" gutterBottom>
                  API Response Data
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Field</TableCell>
                        <TableCell>Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Success</TableCell>
                        <TableCell>
                          {apiResponse && apiResponse.success
                            ? apiResponse.success.toString()
                            : "false"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Updates</TableCell>
                        <TableCell>
                          {apiResponse &&
                          apiResponse.data &&
                          apiResponse.data.total_updates
                            ? apiResponse.data.total_updates
                            : "0"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Latest Update</TableCell>
                        <TableCell>
                          {apiResponse &&
                          apiResponse.data &&
                          apiResponse.data.latest_update
                            ? `${formatDate(
                                apiResponse.data.latest_update
                              )} ${formatTime(apiResponse.data.latest_update)}`
                            : "-"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box> */}

              {/* Base Meeting Data */}
              <Box mt={3} mb={4}>
                <Typography variant="h6" gutterBottom>
                  Base Meeting Data
                </Typography>
                {baseMeetingData ? (
                  <DataTable
                    columns={baseColumns}
                    data={[baseMeetingData]}
                    pagination={false}
                    highlightOnHover
                    customStyles={{
                      table: {
                        style: {
                          border: "1px solid #000", // Outer border
                        },
                      },
                      headCells: {
                        style: {
                          backgroundColor: "#307eac",
                          fontWeight: "bold",
                          color: "#fff",
                          borderRight: "1px solid #fff", // White border between headers
                          borderBottom: "1px solid #000", // Bottom border for header
                        },
                      },
                      cells: {
                        style: {
                          borderRight: "1px solid #000", // Vertical borders
                          borderBottom: "1px solid #000", // Horizontal borders
                        },
                      },
                      rows: {
                        style: {
                          "&:not(:last-child)": {
                            borderBottom: "none", // Prevent double horizontal borders
                          },
                        },
                      },
                    }}
                  />
                ) : (
                  <Typography>No base meeting data available</Typography>
                )}
              </Box>

              {/* Tracking History */}
              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  Update History (Total: {trackingData.length})
                </Typography>
                {trackingData.length > 0 ? (
                  <DataTable
                    columns={trackingColumns}
                    data={trackingData}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[5, 10, 15]}
                    highlightOnHover
                    customStyles={{
                      table: {
                        style: {
                          border: "1px solid #000", // Outer border
                        },
                      },
                      headCells: {
                        style: {
                          backgroundColor: "#307eac",
                          fontWeight: "bold",
                          color: "#fff",
                          borderRight: "1px solid #fff", // White border between headers
                          borderBottom: "1px solid #000", // Bottom border for header
                        },
                      },
                      cells: {
                        style: {
                          borderRight: "1px solid #000", // Vertical borders
                          borderBottom: "1px solid #000", // Horizontal borders
                        },
                      },
                      rows: {
                        style: {
                          "&:not(:last-child)": {
                            borderBottom: "none", // Prevent double horizontal borders
                          },
                        },
                      },
                    }}
                  />
                ) : (
                  <Typography>No update history available</Typography>
                )}
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUpdate;
