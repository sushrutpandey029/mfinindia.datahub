

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import UpdateIcon from "@mui/icons-material/Update";
import DownloadIcon from "@mui/icons-material/Download";
import * as XLSX from "xlsx";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


const MFAPList = () => {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const userName = userData.data.user.name;
  const userRole = userData.data.role_name;
  const userEmail = userData.data.user.email;

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status"); // "open" or "closed"

  const [regionalHead, setRegionalHead] = useState([]);


  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [selectedRegionalHead, setSelectedRegionalHead] = useState("");

  const regionalHeads = [
    "Sushrut Pandey",
    "Habib Shaikh",
    "PM Kamalesh",
    "Sanjay Kumar",
    "Dhiraj Soni",
    "Devendra Shahapurkar",
    "Vijay Wadhwa",
    "M S Manjunatha",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.mfinindia.org/api/auth/meetings/count/activity_type",
          {
            params: {
              user_role: userRole,
              username: userName,
              activity_type: "MFAP",
            },
          }
        );

        // Filter data based on status
        const statusFilteredData = response.data.data.filter(
          (item) => item.hod_observation.toLowerCase() === status.toLowerCase()
        );

        setData(statusFilteredData);
        setFilteredData(statusFilteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [status]);

  useEffect(() => {
    if (selectedRegionalHead) {
      const filtered = data.filter(
        (item) => item.regional_head === selectedRegionalHead
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, selectedRegionalHead]);

  //fetching regional head data
  useEffect(() => {
    const fetchRegionalHead = async () => {
      try {
        const response = await axios.get(
          "https://api.mfinindia.org/api/auth/meetings/user/getRole18Users"
        );
        console.log("regionalhead", response.data.names);
        setRegionalHead(response.data.names);
      } catch (err) {
        console.log("regionalhead-err", err.response);
      }
    };

    fetchRegionalHead();
  }, []);

  const handleEdit = (row) => {
    navigate(`/edit-meeting/${row.id}`);
  };

  const handleUpdateClick = (row) => {
    navigate(`/update-meeting/${row.id}`)
  }

  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://api.mfinindia.org/api/auth/meetings/delete/${row.id}`
        );
        const updatedData = data.filter((item) => item.id !== row.id);
        setData(updatedData);
        setFilteredData(updatedData);
      } catch (error) {
        console.error("Error deleting meeting:", error);
      }
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedRows.map((row) =>
          axios.delete(`https://api.mfinindia.org/api/auth/meetings/${row.id}`)
        )
      );
      const updatedData = data.filter(
        (item) => !selectedRows.some((row) => row.id === item.id)
      );
      setData(updatedData);
      setFilteredData(updatedData);
      setToggleCleared(!toggleCleared);
    } catch (error) {
      console.error("Error deleting meetings:", error);
    }
  };

  const columns = [
    {
      name: "M.ID",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Region",
      selector: (row) => row.region,
      sortable: true,
      width: "100px",
    },
    {
      name: "Regional Head",
      selector: (row) => row.regional_head,
      sortable: true,
      width: "165px",
      omit: !(userRole === "Admin" || userRole === "Vertical-Head" || userRole === "SI_Admin"),
    },
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true,
      width: "150px",
    },
    {
      name: "District",
      selector: (row) => row.district,
      sortable: true,
      width: "150px",
    },
    {
     name: "Meeting Date",
  selector: row => row.dateOfMeeting,
  sortable: true,
  cell: row =>
    row.dateOfMeeting
      ? new Date(row.dateOfMeeting).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      : '-',
  width: "160px",
    },
    {
      name: "Planned/Unplanned",
      selector: (row) => row.type,
      sortable: true,
      width: "165px",
    },
    {
      name: "Online/Physical",
      selector: (row) => row.mode,
      sortable: true,
      width: "150px",
    },
    {
      name: "Activity Detail(s)",
      selector: (row) => row.activity_details,
      sortable: true,
      width: "150px",
    },
    {
      name: "Status Update(s)",
      selector: (row) => row.status_update,
      sortable: true,
      width: "160px",
    },

    {
      name: "HOD Remark",
      selector: (row) => row.head_and_si_remark,
      sortable: true,
      width: "130px",
    },
    {
      name: "HOD Observation(s)",
      selector: (row) => row.hod_observation,
      sortable: true,
      width: "180px"
    },
    {
      name: "URL",
      cell: (row) => (
        row.url ? (
          <a
            href={row.url.startsWith('http') ? row.url : `https://${row.url}`}
            target="_blank"
            rel="noopener noreferrer"
            title={row.url}  // Show full URL on hover
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#1976d2", // Material-UI primary color
            }}
          >
            <OpenInNewIcon fontSize="small" />  {/* Material-UI icon */}
          </a>
        ) : (
          <span>—</span>
        )
      ),
      sortable: false,
      width: "70px",
      center: true,
    },
    // {
    //   name: "File",
    //   cell: (row) => (
    //     <a
    //       href={`https://api.mfinindia.org/public/${row.uploadFile}`}
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
    //   sortable: true,
    //   width: "80px",
    // },
    {
      name: "View",
      cell: (row) => (
        <Button
          variant="contained"
          color="info"
          size="small"
          onClick={() => handleViewClick(row)}
          sx={{
            minWidth: "32px",
            px: 0,
          }}
        >
          <VisibilityIcon fontSize="small" />
        </Button>
      ),
      sortable: true,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "80px",
      center: true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleEdit(row)}
          sx={{
            minWidth: "32px",
            px: 0,
          }}
        >
          <EditIcon fontSize="small" />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "80px",
      center: true,
      omit: (userRole === "Admin" || userRole === "Vertical-Head" || userRole === "SI_Admin" ),
    },
    {
      name: "Update",
      cell: (row) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleUpdateClick(row)}
          sx={{
            minWidth: "32px",
            px: 0,
          }}
        >
          <EditIcon fontSize="small" />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "80px",
      center: true,
      omit: (userRole === "Admin" || userRole === "Vertical-Head"  || userRole === "SI_Admin"),
    },
    {
      name: "Delete",
      cell: (row) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(row)}
          sx={{
            minWidth: "32px",
            px: 0,
          }}
        >
          <DeleteIcon fontSize="small" />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "80px",
      center: true,
    },
    {
      name: "Track",
      cell: (row) => (
        <Button
          variant="contained"
          color="info"
          size="small"
          onClick={() => handleInfoClick(row)}
          sx={{
            minWidth: "32px",
            px: 0,
          }}
        >
          <InfoIcon fontSize="small" />
        </Button>
      ),
      sortable: true,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "80px",
      center: true,
    },
    {
      name: "HOD_SI_Remark",
      cell: (row) => {

        const [comment, setComment] = useState(row.comment || "");
        const [status, setStatus] = useState(row.status || "");

        // Get the URL status parameter
        const urlStatus = searchParams.get("status") || "";

        const handleUpdate = async () => {

          if (!status) {
            alert("There is no changes to update.");
            return;
          }

          try {
            await axios.post(
              `https://api.mfinindia.org/api/auth/meetings/archmeeting_update_new/${row.id}`,
              {
                regional_head: row.regional_head,
                hodObservation: status,
                statusUpdate: comment,
                loginemail: userEmail,
                username: userName,
                activity_type: row.activity_type
              }
            );

            alert("Data Updated Successfully!");
            window.location.reload();
          } catch (error) {
            console.error("Update failed:", error);
          }
        };

        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                minWidth: "100px",
              }}
            >
              <option value="">Select Status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              {/* {urlStatus.toLowerCase() === "open" ? (
                <option value="Closed">Closed</option>
              ) : (
                <option value="Open">Open</option>
              )} */}
            </select>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="comment..."
              style={{
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                minWidth: "150px",
                resize: "vertical",
                minHeight: "36px",
              }}
            />

            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleUpdate}
              sx={{
                minWidth: "32px",
                px: 0,
              }}
            >
              <UpdateIcon fontSize="small" />
            </Button>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      width: "400px",
      center: true,
      omit: !(userRole === "Admin" || userRole === "Vertical-Head" || userRole === "SI_Admin" ),
    },
  ];

  const contextActions = (
    <Button
      key="delete"
      onClick={handleBulkDelete}
      variant="contained"
      color="error"
      startIcon={<DeleteIcon />}
    >
      Delete Selected
    </Button>
  );

  const exportToExcel = () => {
    // Define columns you want to exclude
    const columnsToExclude = ['created_at', 'updated_at']; // replace with your actual column names

    // Filter the data to exclude unwanted columns
    const filteredExportData = filteredData.map(item => {
      const newItem = { ...item };
      columnsToExclude.forEach(col => delete newItem[col]);
      return newItem;
    });

    const ws = XLSX.utils.json_to_sheet(filteredExportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SIT");

    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const filename = `SIT_MFAP${timestamp}_${randomNum}.xlsx`;

    XLSX.writeFile(wb, filename);
  };

  const handleInfoClick = (row) => {
    navigate(`/meeting-tracking/${row.id}`);
  };

  const handleViewClick = (row) => {
    navigate("/view-content", { state: { rowData: row } })
  }

  const applyFilter = () => {
    if (selectedRegionalHead) {
      const filtered = data.filter(
        (item) => item.regional_head === selectedRegionalHead
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <div className="AddMeeting mt-6" >
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
            <div style={{ padding: "20px", marginTop: "80px", position: "relative", marginTop: "0px" }}>
              <h2 style={{ position: "sticky", left: 0 }}>
                MFAP Meetings - {status.charAt(0).toUpperCase() + status.slice(1)}
              </h2>

              {/* Filter Row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "20px 0",
                }}
              >
                {/* Filter Dropdown and Button */}
                <div style={{ display: "flex", gap: "10px" }}>
                  {(userRole === "Admin" || userRole === "Vertical-Head"  || userRole === "SI_Admin") && (
                    <>
                      <select
                        value={selectedRegionalHead}
                        onChange={(e) => setSelectedRegionalHead(e.target.value)}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          minWidth: "200px",
                        }}
                      >
                        <option value="">All Regional Heads</option>
                        {regionalHead.map((head) => (
                          <option key={head} value={head}>
                            {head}
                          </option>
                        ))}
                      </select>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={applyFilter}
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Apply Filter
                      </Button>
                    </>
                  )}
                </div>

                {/* Excel/Print Button */}
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<DownloadIcon />}
                  onClick={exportToExcel}
                  style={{
                    backgroundColor: "rgb(25 118 210)",
                    fontWeight: "bold",
                  }}
                >
                  Excel / Print
                </Button>
              </div>

              {loading ? (
                <div>Loading...</div>
              ) : (
                <DataTable
                  columns={columns}
                  data={filteredData}
                  pagination
                  highlightOnHover
                  progressPending={loading}
                  paginationPerPage={10}
                  paginationRowsPerPageOptions={[10, 20, 30, 50]}
                  noDataComponent="No meetings found"
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MFAPList;
