import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./Calendar.css";

const Calendar = () => {
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [highlightedDate, setHighlightedDate] = useState(null);
  const [meetingDates, setMeetingDates] = useState(new Set());

  const token = "your_auth_token_here"; // Replace with real token

  const fetchMeetingForDate = async (date) => {
    try {
      const response = await fetch(
        `https://api.mfinindia.org/api/auth/meetings/by-exact-date?date=${date}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch meetings");

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success && Array.isArray(data.meetings)) {
        setSelectedDateEvents(data.meetings);
      } else {
        setSelectedDateEvents([]);
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const fetchAllMeetingsForMonth = async (startDate, endDate) => {
    try {
      const response = await fetch(
        `https://api.mfinindia.org/api/auth/meetings/by-range?start=${startDate}&end=${endDate}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch all meetings");

      const data = await response.json();
      console.log("Monthly meetings:", data);

      if (data.success && Array.isArray(data.meetings)) {
        const dateSet = new Set(data.meetings.map((m) => m.meetingDate));
        setMeetingDates(dateSet);
      }
    } catch (error) {
      console.error("Error fetching all meetings:", error);
    }
  };

  const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr;
    console.log("Clicked Date:", clickedDate);
    fetchMeetingForDate(clickedDate);
    setSelectedDate(clickedDate);
    setHighlightedDate(clickedDate);
  };

  const closePopup = () => {
    setSelectedDate(null);
    setSelectedDateEvents([]);
    setHighlightedDate(null);
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate="2025-01-01"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        dateClick={handleDateClick}
        height="auto"
        dayCellClassNames={(arg) => {
          const classes = [];
          if (arg.dateStr === highlightedDate) {
            classes.push("highlighted-date");
          }
          if (meetingDates.has(arg.dateStr)) {
            classes.push("meeting-date");
          }
          return classes;
        }}
        datesSet={(arg) => {
          fetchAllMeetingsForMonth(arg.startStr, arg.endStr);
        }}
      />

      {selectedDate && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h3>Meetings on {selectedDate}</h3>
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event, idx) => (
                <div key={idx} className="event-detail">
                  <p>
                    <strong>Activity Type:</strong>{" "}
                    {event.activity_type || "N/A"}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {event.short_description || "No Description"}
                  </p>
                  {event.placeOfMeeting && (
                    <p>
                      <strong>Place of Meeting:</strong> {event.placeOfMeeting}
                    </p>
                  )}
                  {event.region && (
                    <p>
                      <strong>Region:</strong> {event.region}
                    </p>
                  )}
                  {event.state && (
                    <p>
                      <strong>State:</strong> {event.state}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No meetings on this day</p>
            )}
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
