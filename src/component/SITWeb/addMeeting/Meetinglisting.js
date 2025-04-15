import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Meetinglisting.css";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Button, Card, CardContent } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const MeetingListing = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActivity, setFilterActivity] = useState("");

  function fetchData() {
    axios
      .get("https://api.mfinindia.org/api/auth/meetings")
      .then(function (response) {
        setData(response.data);
        console.log("resp", response.data);
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  }

  // Fetch meeting data
  useEffect(() => {
    fetchData();
  }, []);

  // Filter data based on activity selection and search query
  const filteredData = useMemo(() => {
    return data.filter(function (item) {
      // Check activity match
      var activityMatch = true;
      if (selectedActivity) {
        activityMatch = item.activity === selectedActivity;
      }

      // Check search query match (no optional chaining)
      var searchMatch = true;
      if (searchQuery) {
        searchMatch = Object.keys(item).some(function (key) {
          var value = item[key];
          if (value && typeof value === "string") {
            return (
              value.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
            );
          }
          return false;
        });
      }

      return activityMatch && searchMatch;
    });
  }, [data, filterActivity, searchQuery]);

  // Define columns
  const columns = useMemo(function () {
    return [
      {
        name: "Document",
        // cell: (row) => (
        //   <img
        //     src={`https://api.mfinindia.org/public/${row.upload_path}`}
        //     alt="img"
        //     style={{ height: "50px", width: "90px" }}
        //   />
        // ),
        cell: (row) => (
          <a
            href={`https://api.mfinindia.org/public/${row.upload_path}`}
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
        ),
        center: true,
      },
      {
        name: "Regional Head",
        selector: function (row) {
          return row.regional_head;
        },
      },
      {
        name: "Activity",
        selector: function (row) {
          return row.activity;
        },
      },

      {
        name: "Type",
        selector: function (row) {
          return row.type;
        },
      },
      {
        name: "Mode",
        selector: function (row) {
          return row.mode;
        },
      },
      {
        name: "Date of Activity",
        selector: function (row) {
          return row.date_of_activity;
        },
      },
      {
        name: "Region",
        selector: function (row) {
          return row.region;
        },
      },
      {
        name: "State",
        selector: function (row) {
          return row.state;
        },
      },
      {
        name: "District",
        selector: function (row) {
          return row.district;
        },
      },
      {
        name: "Activity Details",
        selector: function (row) {
          return row.activity_details;
        },
      },
      {
        name: "Status Update",
        selector: function (row) {
          return row.status_update;
        },
      },
      {
        name: "Head SI Remark",
        selector: function (row) {
          return row.head_si_remark;
        },
      },
      {
        name: "Remark Staus",
        selector: function (row) {
          return row.remark_status;
        },
      },
      {
        name: "Application Status",
        selector: function (row) {
          return row.application_status;
        },
      },
      {
        name: "Edit ",
        cell: (row) => (
          <Button
            onClick={() =>
              navigate(`/meeting-update/${row.id}`, {
                state: {
                  // title: row.p_title,
                  // heading: row.p_heading,
                  // content: row.Content,
                  // pdf: row.pdf_file,
                  // image: row.image,
                  // date: row.date,
                  // synopsis: row.synopsis,
                },
              })
            }
            // variant="outlined"
            color="primary"
            endIcon={<ModeEditIcon />}
          ></Button>
        ),
        center: true,
      },
      {
        name: "Delete ",
        cell: (row) => (
          <Button
            // variant="outlined"
            color="error"
            endIcon={<DeleteIcon />}
            onClick={() => handleDelete(row.id)}
          ></Button>
        ),
        center: true,
      },
    ];
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete ?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://api.mfinindia.org/api/auth/meetings/${id}`);
        fetchData(); // Refresh the list after deletion
      } catch (err) {
        console.log("delete-data-err", err);
      }
    }
  };

  const handleFilter = () => {
    setFilterActivity(selectedActivity);
  };

  const handleDownloadExcel = () => {
    if (filteredData.length === 0) {
      alert("No data to download!");
      return;
    }

    // Define worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Meeting Data");

    // Create Excel file and download
    XLSX.writeFile(workbook, "Meeting_Data.xlsx");
  };

  return (
    <div className="meeting-listing">
      {/* Heading Section */}
      <div className="container mt-5 text-start">
        <div className="row g-4 mt-5">
          <div className="col-sm-12">
            <h4 className="Heading">Meeting Listing</h4>
          </div>

          <div className="col-sm-6">
            {/* Left: Dropdown + Filter Button */}
            <div className="d-flex align-items-center gap-2 ">
              <select
                className="form-select"
                onChange={(e) => setSelectedActivity(e.target.value)}
                value={selectedActivity}
                style={{ width: "300px" }} // Adjust width as needed
              >
                <option selected value="">
                  {" "}
                  Select Activity
                </option>
                <option value="SCM">SCM (State Chapter Meeting)</option>
                <option value="SCC">SCC (State Coordination Committee)</option>
                <option value="DFM">DFM (District Forum Meeting)</option>
                <option value="SKM">SKM (Stake Holder Engagement)</option>
                <option value="KMA">KMA (Karza Mukti Abhiyan)</option>
                <option value="Suicide">Suicide</option>
                <option value="MCC">MCC</option>
                <option value="Ring Leader">Ring Leader</option>
                <option value="Staff Fraud">Staff Fraud</option>
                <option value="Staff Misbehavior">Staff Misbehavior</option>
                <option value="KYC Fraud">KYC Fraud</option>
                <option value="Other CI">Other CI</option>
              </select>
              <div className="d-flex justify-content-start">
                <button
                  type="button"
                  className="css-1vhaqj4-MuiButtonBase-root-MuiButton-root w-auto m-0 "
                  onClick={handleFilter}
                  style={{ marginLeft: "5px" }} // 5px gap between dropdown and button
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-12 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleDownloadExcel}
            >
              Download Excel
            </button>
          </div>

          {/* Data Table Section */}
          <div className="col-sm-12">
            <div className="table-responsive">
              <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                fixedHeader
                responsive
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingListing;
