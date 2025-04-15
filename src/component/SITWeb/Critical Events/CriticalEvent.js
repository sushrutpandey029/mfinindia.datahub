import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Grid,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import * as XLSX from "xlsx";
import InfoIcon from "@mui/icons-material/Info";
import UpdateIcon from "@mui/icons-material/Update";
import VisibilityIcon from "@mui/icons-material/Visibility";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import RefreshIcon from '@mui/icons-material/Refresh';

const CriticalEvent = () => {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const userName = userData.data.user.name || '';
  const userRole = userData.data.role_name || '';

  const [regionalHead, setRegionalHead] = useState([]);


  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    year: "",
    startmonth: "",
    endmonth: "",
    region: "",
    state: "",
    incidents: "",
  });
  const [filterOptions, setFilterOptions] = useState({
    years: [],
    months: [],
    regions: [],
    states: [],
    incidents: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [error, setError] = useState(null);

  // Count active filters
  useEffect(() => {
    const count = Object.values(filters).filter(val => val !== "").length;
    setActiveFiltersCount(count);
  }, [filters]);

  const fetchData = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const baseParams = {
        user_role: userRole,
        username: userName,
        activity_type: "CI",
      };

      const response = await axios.get(
        "https://api.mfinindia.org/api/auth/meetings/getcidata/filter",
        {
          params: { ...baseParams, ...params },
        }
      );

      setData(response.data.data);

      // Update filter options, ensuring we don't overwrite with empty arrays if not provided
      setFilterOptions(prev => ({
        years: (response.data.filters && response.data.filters.years && response.data.filters.years.filter(Boolean)) || prev.years,
        months: (response.data.filters && response.data.filters.months && response.data.filters.months.filter(Boolean)) || prev.months,
        regions: (response.data.filters && response.data.filters.regions) || prev.regions,
        states: (response.data.filters && response.data.filters.states) || prev.states,
        incidents: (response.data.filters && response.data.filters.incidents && response.data.filters.incidents.filter(Boolean)) || prev.incidents,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    // Prepare filter params, removing empty values
    const filterParams = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "")
    );
    fetchData(filterParams);
  };

  const resetFilters = () => {
    setFilters({
      year: "",
      startmonth: "",
      endmonth: "",
      region: "",
      state: "",
      incidents: "",
    });
    fetchData(); // Fetch without any filters
  };

  const handleEdit = (row) => {
    navigate(`/edit-meeting/${row.id}`);
  };

  const handleUpdateClick = (row) => {
    navigate(`/update-meeting/${row.id}`);
  };

  const handleViewClick = (row) => {
    navigate("/view-content", { state: { rowData: row } });
  };

  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://api.mfinindia.org/api/auth/meetings/delete/${row.id}`
        );
        setData(prev => prev.filter(item => item.id !== row.id));
      } catch (error) {
        console.error("Error deleting meeting:", error);
        alert("Failed to delete. Please try again.");
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedRows.length} selected items?`
    );
    if (!confirmDelete) return;

    try {
      await Promise.all(
        selectedRows.map(row =>
          axios.delete(`https://api.mfinindia.org/api/auth/meetings/delete/${row.id}`)
        )
      );
      setData(prev => prev.filter(item => !selectedRows.some(row => row.id === item.id)));
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    } catch (error) {
      console.error("Error deleting meetings:", error);
      alert("Failed to delete some items. Please try again.");
    }
  };

  const exportToExcel = () => {
    if (data.length === 0) {
      alert("No data to export");
      return;
    }

    // Define columns to exclude
    const columnsToExclude = ['id', 'created_at', 'updated_at'];

    // Filter data and format dates
    const exportData = data.map(item => {
      const newItem = { ...item };
      columnsToExclude.forEach(col => delete newItem[col]);

      // Format date if exists
      if (newItem.dateOfMeeting) {
        newItem.dateOfMeeting = new Date(newItem.dateOfMeeting).toLocaleDateString();
      }

      return newItem;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Critical_Incidents");

    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    const filename = `Critical_Incidents_${timestamp}_${randomNum}.xlsx`;

    XLSX.writeFile(wb, filename);
  };

  const columns = [
    {
      name: "Region",
      selector: row => row.region,
      sortable: true,
      width: "100px",
    },
    {
      name: "Regional Head",
      selector: row => row.regional_head,
      sortable: true,
      width: "165px",
      omit: !(userRole === "Admin" || userRole === "SuperAdmin"),
    },
    {
      name: "State",
      selector: row => row.state,
      sortable: true,
      width: "150px",
    },
    {
      name: "District",
      selector: row => row.district,
      sortable: true,
      width: "150px",
    },
    {
      name: "Village",
      selector: row => row.village,
      sortable: true,
      width: "150px",
    },
    {
      name: "Incidents",
      selector: row => row.incidents,
      sortable: true,
      width: "180px",
    },
    {
      name: "Source of Information",
      selector: row => row.source_of_information,
      sortable: true,
      width: "180px",
    },
    {
      name: "Short Description",
      selector: row => row.short_description,
      sortable: true,
      width: "180px",
    },
    {
      name: "Activity Details",
      selector: row => row.activity_details,
      sortable: true,
      width: "180px",
    },
    {
      name: "Meeting Date",
      selector: row => row.dateOfMeeting,
      sortable: true,
      cell: row => row.dateOfMeeting ? new Date(row.dateOfMeeting).toLocaleDateString() : '-',
      width: "126px",
    },
    {
      name: "HOD Observation",
      selector: row => row.hod_observation,
      sortable: true,
      width: "170px",
    },
    {
      name: "URL",
      cell: row => (
        row.url ? (
          <a
            href={row.url.startsWith('http') ? row.url : `https://${row.url}`}
            target="_blank"
            rel="noopener noreferrer"
            title={row.url}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#1976d2",
            }}
          >
            <OpenInNewIcon fontSize="small" />
          </a>
        ) : (
          <span>—</span>
        )
      ),
      sortable: false,
      width: "70px",
      center: true,
    },
    {
      name: "File",
      cell: row => (
        row.uploadFile ? (
          <a
            href={`https://api.mfinindia.org/public/${row.uploadFile}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            <DownloadIcon />
          </a>
        ) : (
          <span>—</span>
        )
      ),
      center: true,
      sortable: true,
      width: "80px",
    },
    {
      name: "View",
      cell: row => (
        <Button
          variant="contained"
          color="info"
          size="small"
          onClick={() => handleViewClick(row)}
          sx={{ minWidth: "32px", px: 0 }}
        >
          <VisibilityIcon fontSize="small" />
        </Button>
      ),
      sortable: true,
      ignoreRowClick: true,
      width: "80px",
      center: true,
    },
    {
      name: "Edit",
      cell: row => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleEdit(row)}
          sx={{ minWidth: "32px", px: 0 }}
        >
          <EditIcon fontSize="small" />
        </Button>
      ),
      ignoreRowClick: true,
      width: "80px",
      center: true,
      omit: (userRole === "Admin" || userRole === "SuperAdmin"),
    },
    {
      name: "Update",
      cell: row => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleUpdateClick(row)}
          sx={{ minWidth: "32px", px: 0 }}
        >
          <EditIcon fontSize="small" />
        </Button>
      ),
      ignoreRowClick: true,
      width: "80px",
      center: true,
      omit: (userRole === "Admin" || userRole === "SuperAdmin"),
    },
    {
      name: "Delete",
      cell: row => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(row)}
          sx={{ minWidth: "32px", px: 0 }}
        >
          <DeleteIcon fontSize="small" />
        </Button>
      ),
      ignoreRowClick: true,
      width: "80px",
      center: true,
    },
    {
      name: "Track",
      cell: row => (
        <Button
          variant="contained"
          color="info"
          size="small"
          onClick={() => navigate(`/meeting-tracking/${row.id}`)}
          sx={{ minWidth: "32px", px: 0 }}
        >
          <InfoIcon fontSize="small" />
        </Button>
      ),
      ignoreRowClick: true,
      width: "80px",
      center: true,
    },
    {
      name: "Admin Update",
      cell: row => {
        const [comment, setComment] = useState(row.comment || "");
        const [status, setStatus] = useState(row.status || "");

        // Get the URL status parameter
        const urlStatus = searchParams.get("status") || "";

        const handleUpdate = async () => {
          if (!status) {
            alert("Please select a status");
            return;
          }
          try {
            await axios.post(
              `https://api.mfinindia.org/api/auth/meetings/archmeeting_update/${row.id}`,
              {
                regional_head:row.regional_head,
                hodObservation: status,
                statusUpdate: comment,
              }
            );
            alert("Data Updated Successfully!");
            fetchData(); // Refresh data
          } catch (error) {
            console.error("Update failed:", error);
            alert("Update failed. Please try again.");
          }
        };

        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                minWidth: "100px",
              }}
            >
              <option value="">Select Status</option>
              {row.hod_observation === "Open" ? (
                <option value="Closed">Closed</option>
              ) : (
                <option value="Open">Open</option>
              )}

            </select>

            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Comments..."
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
              sx={{ minWidth: "32px", px: 0 }}
            >
              <UpdateIcon fontSize="small" />
            </Button>
          </div>
        );
      },
      ignoreRowClick: true,
      width: "400px",
      center: true,
      omit: !(userRole === "Admin" || userRole === "SuperAdmin"),
    },
  ];

  const contextActions = (
    <Button
      key="delete"
      onClick={handleBulkDelete}
      variant="contained"
      color="error"
      startIcon={<DeleteIcon />}
      disabled={selectedRows.length === 0}
    >
      Delete Selected ({selectedRows.length})
    </Button>
  );

  return (
    <div className="AddMeeting mt-6">
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-12">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Button
                onClick={() => navigate(-1)}
                startIcon={<ArrowBackIcon />}
                sx={{ mr: 2 }}
              >
                {/* Back */}
              </Button>
              <Typography variant="h4" component="h1">
                Critical Incidents
              </Typography>

              {activeFiltersCount > 0 && (
                <Chip
                  label={`${activeFiltersCount} active filter(s)`}
                  color="primary"
                  size="small"
                  sx={{ ml: 2 }}
                />
              )}
            </Box>

            {/* Filter Section */}
            <Box
              sx={{
                mb: 3,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                backgroundColor: '#f9f9f9'
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Year</InputLabel>
                    <Select
                      name="year"
                      value={filters.year}
                      onChange={handleFilterChange}
                      label="Year"
                    >
                      <MenuItem value="">All Years</MenuItem>
                      {filterOptions.years.map(year => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Start Month</InputLabel>
                    <Select
                      name="startmonth"
                      value={filters.startmonth}
                      onChange={handleFilterChange}
                      label="Start Month"
                    >
                      <MenuItem value="">All Months</MenuItem>
                      {filterOptions.months.map(month => (
                        <MenuItem key={month} value={month}>
                          {month}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>End Month</InputLabel>
                    <Select
                      name="endmonth"
                      value={filters.endmonth}
                      onChange={handleFilterChange}
                      label="End Month"
                    >
                      <MenuItem value="">All Months</MenuItem>
                      {filterOptions.months.map(month => (
                        <MenuItem key={month} value={month}>
                          {month}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Region</InputLabel>
                    <Select
                      name="region"
                      value={filters.region}
                      onChange={handleFilterChange}
                      label="Region"
                    >
                      <MenuItem value="">All Regions</MenuItem>
                      {filterOptions.regions.map(region => (
                        <MenuItem key={region} value={region}>
                          {region}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>State</InputLabel>
                    <Select
                      name="state"
                      value={filters.state}
                      onChange={handleFilterChange}
                      label="State"
                    >
                      <MenuItem value="">All States</MenuItem>
                      {filterOptions.states.map(state => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Critical Event</InputLabel>
                    <Select
                      name="incidents"
                      value={filters.incidents}
                      onChange={handleFilterChange}
                      label="Critical Event"
                    >
                      <MenuItem value="">All Events</MenuItem>
                      {filterOptions.incidents.map(incident => (
                        <MenuItem key={incident} value={incident}>
                          {incident}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={applyFilters}
                    fullWidth
                    startIcon={<FilterAltIcon />}
                    disabled={loading}
                  >
                    Apply Filters
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    variant="outlined"
                    onClick={resetFilters}
                    fullWidth
                    startIcon={<FilterAltOffIcon />}
                    disabled={loading}
                  >
                    Reset
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    variant="outlined"
                    onClick={() => fetchData()}
                    fullWidth
                    startIcon={<RefreshIcon />}
                    disabled={loading}
                  >
                    Refresh
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<DownloadIcon />}
                    onClick={exportToExcel}
                    fullWidth
                    disabled={loading || data.length === 0}
                    style={{
                      backgroundColor: "rgb(25 118 210)",
                      fontWeight: "bold",
                    }}
                  >
                    Export Excel
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {/* Data Table */}
            {error ? (
              <Box sx={{
                p: 3,
                border: '1px solid #ffebee',
                backgroundColor: '#ffebee',
                borderRadius: 1,
                textAlign: 'center'
              }}>
                <Typography color="error">{error}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => fetchData()}
                  sx={{ mt: 2 }}
                >
                  Retry
                </Button>
              </Box>
            ) : loading ? (
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 3
              }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1">
                    Showing {data.length} records
                  </Typography>
                  {selectedRows.length > 0 && contextActions}
                </Box>

                <DataTable
                  columns={columns}
                  data={data}
                  pagination
                  highlightOnHover
                  progressPending={loading}
                  
                  paginationPerPage={10}
                  paginationRowsPerPageOptions={[10, 20, 30, 50]}
                  noDataComponent={
                    <Typography sx={{ p: 3, textAlign: 'center' }}>
                      No critical incidents found. Try adjusting your filters.
                    </Typography>
                  }
                  customStyles={{
                    table: {
                      style: {
                        border: "1px solid #e0e0e0",
                      },
                    },
                    headCells: {
                      style: {
                        backgroundColor: "#307eac",
                        fontWeight: "bold",
                        color: "#fff",
                        borderRight: "1px solid #fff",
                        borderBottom: "1px solid #e0e0e0",
                      },
                    },
                    cells: {
                      style: {
                        borderRight: "1px solid #e0e0e0",
                        borderBottom: "1px solid #e0e0e0",
                      },
                    },
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriticalEvent;