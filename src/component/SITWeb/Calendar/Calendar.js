import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import "./Calendar.css";
import * as XLSX from "xlsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";


const Calendar = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMeetings, setSelectedMeetings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigates = useNavigate();
  const calendarRef = useRef(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(
          "https://api.mfinindia.org/api/auth/meetings/allmeetings"
        );
        if (response.data.success) {
          const processed = response.data.meetings.map((meeting, idx) => ({
            ...meeting,
            id: idx,
            title: "", // Empty title to hide text
            date: meeting.dateOfMeeting || meeting.created_at,
            backgroundColor: getEventColor(meeting.activity_type),
            borderColor: getEventColor(meeting.activity_type),
            display: "background", // Show only background color
            className: "mfin-calendar-meeting-dot", // Updated class name
          }));
          setMeetings(processed);
        } else {
          setError("Failed to fetch meetings.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const getEventColor = (activityType) => {
    const colors = {
      // CI: "#ff4d4f",
      // SCM: "#52c41a",
      // DFM: "#faad14",
      // SCC: "#722ed1",
      // SKM: "#13c2c2",
      // MFAP: "#eb2f96",
    };
    return colors[activityType] || "#52c41a";
  };

  const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr;
    const selected = meetings.filter(
      (meeting) => meeting.date.split("T")[0] === clickedDate
    );
    setSelectedMeetings(selected);
    setShowModal(true);
  };

  const handleViewChange = (viewType) => {
    setCurrentView(viewType);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(viewType);
  };

  const navigate = (action) => {
    const calendarApi = calendarRef.current.getApi();
    switch (action) {
      case "prev":
        calendarApi.prev();
        setCurrentDate(new Date(calendarApi.getDate()));
        break;
      case "next":
        calendarApi.next();
        setCurrentDate(new Date(calendarApi.getDate()));
        break;
      case "today":
        calendarApi.today();
        setCurrentDate(new Date());
        break;
      default:
        break;
    }
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    const newDate = new Date(currentDate);
    newDate.setMonth(newMonth);
    setCurrentDate(newDate);
    calendarRef.current.getApi().gotoDate(newDate);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    const newDate = new Date(currentDate);
    newDate.setFullYear(newYear);
    setCurrentDate(newDate);
    calendarRef.current.getApi().gotoDate(newDate);
  };

  const downloadMeetingDetails = (meeting) => {
    const meetingText = `Meeting Details:
ID: ${meeting.id}
Activity Type: ${meeting.activity_type}
Date: ${meeting.date}
Region: ${meeting.region}
State: ${meeting.state}
District: ${meeting.district}
Type: ${meeting.type || "N/A"}
Mode: ${meeting.mode || "N/A"}`;

    const element = document.createElement("a");
    const file = new Blob([meetingText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = ` meeting-${meeting.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadAllMeetings = () => {
    // Prepare the data for Excel
    const excelData = meetings.map((meeting, index) => ({
      // "ID": meeting.id,
      "Activity Type": meeting.activity_type,
      Date: meeting.date,
      Region: meeting.region,
      State: meeting.state,
      District: meeting.district,
      Type: meeting.type || "N/A",
      Mode: meeting.mode || "N/A",
      "Important Decision": meeting.important_decision || "N/A",
      "Activity Details": meeting.activity_details || "N/A",
    }));

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Meetings");

    // Generate Excel file and download
    XLSX.writeFile(workbook, "all-meetings.xlsx", { compression: true });
  };

  const renderViewButtons = () => {
    const views = [
      { type: "dayGridMonth", label: "Month View" },
      { type: "timeGridWeek", label: "Week View" },
      { type: "timeGridDay", label: "Day View" },
    ];

    return (
      <div className="mfin-calendar-view-toggle-container">
        {views.map((view) => (
          <button
            key={view.type}
            className={`mfin-calendar-view-toggle-button ${currentView === view.type ? "mfin-calendar-active" : ""
              }`}
            onClick={() => handleViewChange(view.type)}
          >
            {view.label}
          </button>
        ))}
      </div>
    );
  };

  const renderMonthOptions = () => {
    return Array.from({ length: 12 }, (_, i) => (
      <option key={i} value={i}>
        {new Date(0, i).toLocaleString("default", { month: "long" })}
      </option>
    ));
  };

  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 1; i++) {
      years.push(i);
    }
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };

  const getCurrentDateRange = () => {
    if (!calendarRef.current) return "";
    const calendarApi = calendarRef.current.getApi();
    const view = calendarApi.view;

    if (currentView === "dayGridMonth") {
      return view.title;
    } else if (currentView === "timeGridWeek") {
      const start = view.currentStart;
      const end = view.currentEnd;
      return ` ${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    } else {
      return view.title;
    }
  };


  if (loading)
    return (
      <div className="mfin-calendar-loading-container">
        <div className="mfin-calendar-loading-message">Loading ...</div>
      </div>
    );
  if (error)
    return (
      <div className="mfin-calendar-error-container">
        <div className="mfin-calendar-error-message">Error: {error}</div>{" "}
      </div>
    );

  return (

    <div className="AddMeeting">
      <div className="container mt-5">
        <div className="row g-4 mt-5">
          <div className="col-sm-12 mt-0">
            <div className="mfin-calendar-container mt-0">
              <div className="mfin-calendar-controls">
                <div className="mfin-calendar-navigation-group">

                  <button
                    onClick={() => navigates(-1)} // Goes back to previous page
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
                  <button
                    className="mfin-calendar-nav-button"
                    onClick={() => navigate("today")}
                  >
                    Today
                  </button>
                  <div className="mfin-calendar-arrow-buttons">
                    <button
                      className="mfin-calendar-nav-button"
                      onClick={() => navigate("prev")}
                    >
                      &lt;
                    </button>
                    <button
                      className="mfin-calendar-nav-button"
                      onClick={() => navigate("next")}
                    >
                      &gt;
                    </button>
                  </div>
                  <div className="mfin-calendar-date-range">
                    {getCurrentDateRange()}
                  </div>
                </div>

                <div className="mfin-calendar-date-selectors">
                  <select
                    value={currentDate.getMonth()}
                    onChange={handleMonthChange}
                    className="mfin-calendar-month-selector"
                  >
                    {renderMonthOptions()}
                  </select>
                  <select
                    value={currentDate.getFullYear()}
                    onChange={handleYearChange}
                    className="mfin-calendar-year-selector"
                  >
                    {renderYearOptions()}
                  </select>
                </div>

                {renderViewButtons()}

                <button
                  className="mfin-calendar-download-all-button"
                  onClick={downloadAllMeetings}
                >
                  Download All Meetings
                </button>
              </div>


              { <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={currentView}
                events={meetings}
                dateClick={handleDateClick}
                height="auto"
                eventDisplay="background"
                headerToolbar={false}
                dayCellClassNames="mfin-calendar-white-background"
                eventBackgroundColor="#52c41a"
                eventBorderColor="transparent"
                eventClassNames="mfin-solid-event"
              /> }

              

              {showModal && selectedMeetings.length > 0 && (
                <div className="mfin-calendar-modal-overlay ">
                  <div className="mfin-calendar-modal-content mt-5">
                    <div className="mfin-calendar-modal-header">
                      <h4>Meetings on {selectedMeetings[0].date.split("T")[0]}</h4>
                      <button
                        className="mfin-calendar-close-button"
                        onClick={() => setShowModal(false)}
                      >
                        ×
                      </button>
                    </div>
                    <div className="mfin-calendar-modal-body">
                      <table className="mfin-calendar-meeting-table">
                        <thead>
                          <tr>
                            <th>Activity Type</th>
                            <th>Region</th>
                            <th>State</th>
                            <th>District</th>
                            <th>Planned/Unplanned</th>
                            <th>Physical/Online</th>
                            {/* <th>Important Decision</th>
                    <th>Activity Details</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {selectedMeetings.map((meeting, idx) => (
                            <tr key={idx}>
                              <td>{meeting.activity_type || "N/A"}</td>

                              <td>{meeting.region || "N/A"}</td>
                              <td>{meeting.state || "N/A"}</td>
                              <td>
                                {meeting.district && meeting.activity_type === "SCM"
                                  ? "All"
                                  : meeting.district || "N/A"}
                              </td>
                              <td>{meeting.type || "N/A"}</td>
                              <td>{meeting.mode || "N/A"}</td>
                              {/* <td>{meeting.important_decision || "N/A"}</td>
                      <td>{meeting.activity_details || "N/A"}</td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* {selectedMeetings.map((meeting, idx) => (
                <div key={idx} className="mfin-calendar-meeting-card">
                  <div className="mfin-calendar-meeting-details">
                    <p>
                      <strong>Activity Type:</strong> {meeting.activity_type}
                    </p>
                    <p>
                      <strong>Region:</strong> {meeting.region}
                    </p>
                    <p>
                      <strong>State:</strong> {meeting.state}
                    </p>
                    <p>
                      <strong>District:</strong> {meeting.district}
                    </p>
                    <p>
                      <strong>Type:</strong> {meeting.type || "N/A"}
                    </p>
                    <p>
                      <strong>Mode:</strong> {meeting.mode || "N/A"}
                    </p>
                    {meeting.important_decision && (
                      <p>
                        <strong>Important Decision:</strong>{" "}
                        {meeting.important_decision}
                      </p>
                    )}
                    {meeting.activity_details && (
                      <p>
                        <strong>Activity Details:</strong>{" "}
                        {meeting.activity_details}
                      </p>
                    )}
                  </div>
                </div>
              ))} */}
                    </div>
                    <div className="mfin-calendar-modal-footer">
                      {/* <button
                className="mfin-calendar-close-modal-button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;