import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./FormEntry.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import back icon

const DistrictMultiselect = ({
  formData,
  isLoading,
  handleDistrictSelect,
  filteredDistricts,
  isDistrictDropdownOpen,
  setIsDistrictDropdownOpen,
  searchTerm,
  setSearchTerm,
  selectAllDistricts,
  unselectAllDistricts,
}) => {
  const dropdownRef = React.useRef(null);
  const searchInputRef = React.useRef(null);
  const districtListRef = React.useRef(null);
  const [lastPressedKey, setLastPressedKey] = React.useState("");
  const [keyPressCount, setKeyPressCount] = React.useState(0);
  const [currentlyHighlighted, setCurrentlyHighlighted] = React.useState(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDistrictDropdownOpen(false);
        setCurrentlyHighlighted(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsDistrictDropdownOpen]);

  // Handle keyboard navigation for letter jumping and selection
  const handleKeyDown = (e) => {
    if (!isDistrictDropdownOpen) return;

    // Don't handle if search input is focused
    if (document.activeElement === searchInputRef.current) return;

    // Close dropdown on Escape or Tab
    if (e.key === "Escape" || e.key === "Tab") {
      setIsDistrictDropdownOpen(false);
      if (e.key === "Escape") e.preventDefault();
      return;
    }

    // Handle selection with Spacebar or Enter
    if ((e.key === " " || e.key === "Enter") && currentlyHighlighted) {
      e.preventDefault();
      handleDistrictSelect(currentlyHighlighted);
      return;
    }

    // Handle letter key presses for jumping to districts
    if (/^[a-z0-9]$/i.test(e.key)) {
      e.preventDefault();
      const key = e.key.toLowerCase();

      if (key === lastPressedKey) {
        setKeyPressCount((prev) => prev + 1);
      } else {
        setLastPressedKey(key);
        setKeyPressCount(1);
      }

      // Safely filter districts
      const matchingDistricts = (filteredDistricts || []).filter((district) => {
        return (
          district &&
          typeof district === "string" &&
          district.toLowerCase().startsWith(key)
        );
      });

      if (matchingDistricts.length > 0) {
        const matchIndex = (keyPressCount - 1) % matchingDistricts.length;
        const districtToHighlight = matchingDistricts[matchIndex];

        // Validate district before proceeding
        if (!districtToHighlight || typeof districtToHighlight !== "string") {
          return;
        }

        setCurrentlyHighlighted(districtToHighlight);

        // Safely get DOM elements
        const districtElements = districtListRef.current
          ? Array.from(
              districtListRef.current.querySelectorAll(".district-item")
            )
          : [];

        // Clear previous highlights
        districtElements.forEach((el) => {
          if (el && el.classList) {
            el.classList.remove("keyboard-highlighted");
          }
        });

        // Find matching element with error handling
        let elementToHighlight = null;
        try {
          elementToHighlight = districtElements.find((el) => {
            if (!el) return false;
            const label = el.querySelector("label");
            if (!label || !label.textContent) return false;

            const labelText = label.textContent.trim().toLowerCase();
            return labelText === districtToHighlight.toLowerCase();
          });
        } catch (error) {
          console.error("Error finding district element:", error);
        }

        // Apply highlight and scroll if found
        if (elementToHighlight) {
          elementToHighlight.classList.add("keyboard-highlighted");
          elementToHighlight.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }
    }
  };

  return (
    <div
      className="district-select-container"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className="district-select-toggle"
        onClick={() => {
          setIsDistrictDropdownOpen(!isDistrictDropdownOpen);
          setSearchTerm("");
          setLastPressedKey("");
          setKeyPressCount(0);
          setCurrentlyHighlighted(null);
        }}
        disabled={!formData.dynamicFields.state || isLoading.districts}
        aria-haspopup="listbox"
        aria-expanded={isDistrictDropdownOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsDistrictDropdownOpen(true);
          }
        }}
      >
        {formData.dynamicFields.districts &&
        formData.dynamicFields.districts.length > 0
          ? `${formData.dynamicFields.districts.length} selected`
          : "Select Districts"}
        <span className="dropdown-arrow">
          {isDistrictDropdownOpen ? "▲" : "▼"}
        </span>
      </button>

      {isDistrictDropdownOpen && (
        <div className="district-dropdown">
          <div className="district-search">
            <input
              type="text"
              placeholder="Search districts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              ref={searchInputRef}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.preventDefault();
                  setIsDistrictDropdownOpen(false);
                } else if (e.key === "Tab") {
                  setIsDistrictDropdownOpen(false);
                }
              }}
            />
          </div>
          <div className="district-actions">
            <button
              type="button"
              onClick={selectAllDistricts}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  setIsDistrictDropdownOpen(false);
                }
              }}
            >
              Select All
            </button>
            <button
              type="button"
              onClick={unselectAllDistricts}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  setIsDistrictDropdownOpen(false);
                }
              }}
            >
              Unselect All
            </button>
          </div>
          <div
            className="district-list"
            ref={districtListRef}
            role="listbox"
            aria-multiselectable="true"
          >
            {(filteredDistricts || []).length > 0 ? (
              (filteredDistricts || []).map((district) =>
                district && typeof district === "string" ? (
                  <div
                    key={district}
                    className={`district-item ${
                      currentlyHighlighted === district
                        ? "keyboard-highlighted"
                        : ""
                    }`}
                    role="option"
                    aria-selected={
                      formData.dynamicFields.districts &&
                      formData.dynamicFields.districts.includes(district)
                    }
                  >
                    <label>
                      <input
                        type="checkbox"
                        checked={
                          formData.dynamicFields.districts &&
                          formData.dynamicFields.districts.includes(district)
                        }
                        onChange={() => handleDistrictSelect(district)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleDistrictSelect(district);
                            e.preventDefault();
                          } else if (e.key === "Tab") {
                            setIsDistrictDropdownOpen(false);
                          }
                        }}
                      />
                      {district}
                    </label>
                  </div>
                ) : null
              )
            ) : (
              <div className="no-districts">No districts found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const EditMeeting = () => {
  const user = localStorage.getItem("user");
  let userName = "";
  let userRole = "";

  const fileInputRef = React.useRef(null);


  if (user) {
    try {
      const userData = JSON.parse(user);
      if (
        userData &&
        userData.data &&
        userData.data.user &&
        userData.data.user.name
      ) {
        userName = userData.data.user.name;
      }
      if (userData && userData.data && userData.data.role_name) {
        userRole = userData.data.role_name;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  const [showOtherIncidentInput, setShowOtherIncidentInput] = useState(false);
  const [showOtherSourceInput, setShowOtherSourceInput] = useState(false);

  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const [regionalHead, setRegionalHead] = useState([]);

  const [isLoading, setIsLoading] = useState({
    regions: false,
    states: false,
    districts: false,
    submit: false,
  });

  const { id } = useParams();
  const [formData, setFormData] = useState({
    regional_head: "",
    activity_type: "",
    dynamicFields: {
      districts: [],
    },
  });

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const response = await axios.get(
          `https://api.mfinindia.org/api/auth/meetings/show/${id}`
        );
        const meetingData = response.data;
        console.log("meetingData", meetingData);

        // Check if incidents value exists in the dropdown options
        const incidentsOptions = [
          "Suicide",
          "Loan Waiver Campaign",
          "Protest/Rally",
          "Loan Pipelining",
          "Robbery/Theft",
          "Ring Leader",
          "Negative Press",
          "Others",
        ];
        const showIncidentOther = meetingData.incidents && !incidentsOptions.includes(meetingData.incidents);

        // Check if source_of_information value exists in the dropdown options
        const sourceOptions = ["MFI", "Newspaper", "TV News", "Social Media", "Others"];
        const showSourceOther = meetingData.source_of_information && !sourceOptions.includes(meetingData.source_of_information);

        // First set the region and let the effects handle states/districts
        setFormData((prev) => ({
          ...prev,
          regional_head: meetingData.regional_head || "",
          activity_type: meetingData.activity_type || "SCM",
          dynamicFields: {
            ...prev.dynamicFields,
            region: meetingData.region || "",
            state: meetingData.state || "",
            districts: meetingData.district
              ? meetingData.district.split(",").map((d) => d.trim())
              : [],
            placeOfMeeting: meetingData.placeOfMeeting || "",
            village: meetingData.village || "",
            dateOfMeeting: meetingData.dateOfMeeting || "",
            url: meetingData.url || "",
            type: meetingData.type || "",
            mode: meetingData.mode || "",
            incidents: showIncidentOther ? "Others" : meetingData.incidents || "",
            incidents_other: showIncidentOther ? meetingData.incidents : "",
            sourceOfInformation: showSourceOther ? "Others" : meetingData.source_of_information || "",
            sourceOfInformation_other: showSourceOther ? meetingData.source_of_information : "",
            shortDescription: meetingData.short_description || "",
            MomUploadedInRadar: meetingData.mom_uploaded_in_radar || "",
            importantDecision: meetingData.important_decision || "",
            activityDetails: meetingData.activity_details || "",
            statusUpdate: meetingData.status_update || "",
            headAndSiRemark: meetingData.head_and_si_remark || "",
            hodObservation: meetingData.hod_observation || "",
            feedback: meetingData.feedback || "",
            updates: meetingData.updates || "",
            dateCirculationMom: meetingData.dateCirculationMOM || "",
            personMeet: meetingData.personMeet || "",
          },
        }));

        setShowOtherIncidentInput(showIncidentOther);
        setShowOtherSourceInput(showSourceOther);

        // If we have a region, fetch its states
        if (meetingData.region) {
          const statesResponse = await axios.get(
            `https://api.mfinindia.org/api/auth/meetings/states/${meetingData.region}`
          );
          setStates(statesResponse.data.states || []);
        }

        // If we have a state, fetch its districts
        if (meetingData.state) {
          const districtsResponse = await axios.get(
            `https://api.mfinindia.org/api/auth/meetings/districts/${meetingData.state}`
          );
          setDistricts(districtsResponse.data.districts || []);
        }
      } catch (error) {
        console.error("Error fetching meeting data:", error);
        alert("Failed to load meeting data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetingData();
  }, [id]);

  useEffect(() => {
    const fetchRegions = async () => {
      setIsLoading((prev) => ({ ...prev, regions: true }));
      try {
        const response = await axios.get(
          "https://api.mfinindia.org/api/auth/meetings/locations"
        );
        if (response.data && response.data.regions) {
          setRegions(response.data.regions);
        }
      } catch (error) {
        console.error("Error fetching regions:", error);
      } finally {
        setIsLoading((prev) => ({ ...prev, regions: false }));
      }
    };
    fetchRegions();
  }, []);

  // Fetch states when region changes
  useEffect(() => {
    if (formData.dynamicFields.region) {
      const fetchStates = async () => {
        setIsLoading((prev) => ({ ...prev, states: true }));
        try {
          const response = await axios.get(
            `https://api.mfinindia.org/api/auth/meetings/states/${formData.dynamicFields.region}`
          );
          if (response.data && response.data.states) {
            setStates(response.data.states);
          }
        } catch (error) {
          console.error("Error fetching states:", error);
        } finally {
          setIsLoading((prev) => ({ ...prev, states: false }));
        }
      };
      fetchStates();
    } else {
      setStates([]);
    }
  }, [formData.dynamicFields.region]);

  // Fetch districts when state changes
  useEffect(() => {
    if (formData.dynamicFields.state) {
      const fetchDistricts = async () => {
        setIsLoading((prev) => ({ ...prev, districts: true }));
        try {
          const response = await axios.get(
            `https://api.mfinindia.org/api/auth/meetings/districts/${formData.dynamicFields.state}`
          );
          if (response.data && response.data.districts) {
            setDistricts(response.data.districts);
          }
        } catch (error) {
          console.error("Error fetching districts:", error);
        } finally {
          setIsLoading((prev) => ({ ...prev, districts: false }));
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [formData.dynamicFields.state]);

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

  const handleChange = (e) => {
    const { name, value, type, files, multiple } = e.target;

    // if (type === "file") {
    //   setFormData((prev) => ({
    //     ...prev,
    //     dynamicFields: {
    //       ...prev.dynamicFields,
    //       [name]: files[0],
    //     },
    //   }));
    //   return;
    // }

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        dynamicFields: {
          ...prev.dynamicFields,
          // Store ALL files as an array if 'multiple' is enabled, else just the first file
          [name]: multiple ? Array.from(files) : files[0],
        },
      }));
      return;
    }

    // Handle incidents dropdown
    if (name === "incidents") {
      setShowOtherIncidentInput(value === "Others");
      setFormData((prev) => ({
        ...prev,
        dynamicFields: {
          ...prev.dynamicFields,
          [name]: value,
          ...(value !== "Others" ? { incidents_other: "" } : {}),
        },
      }));
      return;
    }

    // Handle sourceOfInformation dropdown
    if (name === "sourceOfInformation") {
      setShowOtherSourceInput(value === "Others");
      setFormData((prev) => ({
        ...prev,
        dynamicFields: {
          ...prev.dynamicFields,
          [name]: value,
          ...(value !== "Others" ? { sourceOfInformation_other: "" } : {}),
        },
      }));
      return;
    }

    if (name === "regional_head" || name === "activity_type") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        dynamicFields: {
          ...prev.dynamicFields,
          ...(name === "activity_type"
            ? {
              region: "",
              state: "",
              districts: [],
            }
            : {}),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        dynamicFields: {
          ...prev.dynamicFields,
          [name]: value,
          ...(name === "region"
            ? {
              state: "",
              districts: [],
            }
            : {}),
          ...(name === "state"
            ? {
              districts: [],
            }
            : {}),
        },
      }));
    }
  };

  const handleDistrictSelect = (district) => {
    setFormData((prev) => {
      const currentDistricts = prev.dynamicFields.districts || [];
      const isSelected = currentDistricts.includes(district);
      const newDistricts = isSelected
        ? currentDistricts.filter((d) => d !== district)
        : [...currentDistricts, district];

      return {
        ...prev,
        dynamicFields: {
          ...prev.dynamicFields,
          districts: newDistricts,
        },
      };
    });
  };

  const selectAllDistricts = () => {
    setFormData((prev) => ({
      ...prev,
      dynamicFields: {
        ...prev.dynamicFields,
        districts: [...districts],
      },
    }));
  };

  const unselectAllDistricts = () => {
    setFormData((prev) => ({
      ...prev,
      dynamicFields: {
        ...prev.dynamicFields,
        districts: [],
      },
    }));
  };

  const filteredDistricts = districts.filter((district) => {
    return district.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.dynamicFields.districts ||
      formData.dynamicFields.districts.length === 0
    ) {
      alert("Please select at least one district");
      return;
    }

    setIsLoading((prev) => ({ ...prev, submit: true }));

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("regional_head", formData.regional_head);
      formDataToSend.append("activity_type", formData.activity_type);

      // Prepare the data to send
      const dynamicFields = {
        ...formData.dynamicFields,
        // If "Others" is selected for incidents, send the custom value instead
        incidents: showOtherIncidentInput
          ? formData.dynamicFields.incidents_other
          : formData.dynamicFields.incidents,
        // If "Others" is selected for source, send the custom value instead
        sourceOfInformation: showOtherSourceInput
          ? formData.dynamicFields.sourceOfInformation_other
          : formData.dynamicFields.sourceOfInformation
      };

      Object.entries(dynamicFields).forEach(([key, value]) => {
        if (key === "uploadFile") {
          if (Array.isArray(value)) {
            value.forEach((file) => {
              formDataToSend.append("uploadFile[]", file);
            });
          } else if (value instanceof File) {
            formDataToSend.append("uploadFile", value);
          }
        } else if (key === "districts" && Array.isArray(value)) {
          value.forEach((district) =>
            formDataToSend.append("district[]", district)
          );
        } else if (value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });

      // For debugging - show what's being sent
      console.log("FormData contents:");
      for (let [key, val] of formDataToSend.entries()) {
        console.log(key, val);
      }
      const response = await axios.post(
        `https://api.mfinindia.org/api/auth/meetings/update_new/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API response", response.data);

      let successMessage = "Submitted successfully";
      if (response && response.data && response.data.message) {
        successMessage = response.data.message;
      }
      alert(successMessage);

      // Reset form
      setFormData({
        regional_head: userName,
        activity_type: "SKM",
        dynamicFields: {
          region: "",
          state: "",
          districts: [],
          dateOfMeeting: "",
          type: "",
          mode: "",
          uploadFile: null,
          personMeet: "",
          activityDetails: "",
          importantDecision: "",
          statusUpdate: "",
          headAndSiRemark: "",
          hodObservation: "",
          incidents: "",
          village: "",
          sourceOfInformation: "",
          shortDescription: "",
          MomUploadedInRadar: "",
          feedback: "",
          incidents_other: "",
          sourceOfInformation_other: "",
        },
      });

      // Navigate based on activity type
      const activityRoutes = {
        SCM: "/scm",
        DFM: "/dfm",
        MFAP: "/mfap",
        CI: "/ci",
        SCC: "/scc",
        SKM: "/skm",
      };
      const route = activityRoutes[formData.activity_type] || "/sitdashboard";
      navigate(route);
    } catch (error) {
      let errorMessage = "Submission failed";
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = `Submission failed: ${error.response.data.message}`;
      } else if (error && error.message) {
        errorMessage = `Submission failed: ${error.message}`;
      }
      console.log("API failed", error);
      alert(errorMessage);
    } finally {
      setIsLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  const activityFieldsMap = {
    SKM: [
      { name: "region", type: "dropdown", label: "Region", required: true },
      { name: "state", type: "dropdown", label: "State", required: true },
      {
        name: "districts",
        type: "multiselect",
        label: "District",
        required: true,
      },
      {
        name: "dateOfMeeting",
        type: "date",
        label: "Meeting Date",
        required: true,
      },
      {
        name: "type",
        type: "dropdown",
        options: ["Planned", "Unplanned"],
        label: "Planned/Unplanned",
        required: true,
      },
      {
        name: "mode",
        type: "dropdown",
        options: ["Online", "Physical"],
        label: "Online/Physical",
        required: true,
      },
      {
        name: "uploadFile",
        type: "file",
        label: "Upload File",
        helperText: "(Audio, video, Image, doc, pdf)",
        multiple: true,
      },
      {
        name: "url",
        type: "text",
        label: "Link"
      },
      { name: "personMeet", type: "text", label: "Person Met" },
      {
        name: "activityDetails",
        type: "textarea",
        label: "Activity Details",
        required: true,
      },
      {
        name: "importantDecision",
        type: "textarea",
        label: "Important Decision",
      },
      { name: "statusUpdate", type: "textarea", label: "Status Update" },
      {
        name: "headAndSiRemark",
        type: "textarea",
        label: "Head,SI Remark",
      },
      {
        name: "hodObservation",
        type: "dropdown",
        options: ["Open", "Closed"],
        label: "HOD Observation",
      },
    ],
    SCM: [
      { name: "region", type: "dropdown", label: "Region", required: true },
      { name: "state", type: "dropdown", label: "State", required: true },
      {
        name: "districts",
        type: "multiselect",
        label: "District",
        required: true,
      },

      {
        name: "dateOfMeeting",
        type: "date",
        label: "Meeting Date",
        required: true,
      },
      {
        name: "type",
        type: "dropdown",
        options: ["Planned", "Unplanned"],
        label: "Planned/Unplanned",
      },
      {
        name: "mode",
        type: "dropdown",
        options: ["Online", "Physical"],
        label: "Online/Physical",
      },
      {
        name: "placeOfMeeting",
        type: "text",
        label: "Meeting Place"
      },
      {
        name: "uploadFile",
        type: "file",
        label: "Upload File",
        helperText: "(Audio, video, Image, doc, pdf)",
        multiple: true,
      },
      {
        name: "url",
        type: "text",
        label: "Link"
      },
      {
        name: "activityDetails",
        type: "textarea",
        label: "Activity Details",
      },
      {
        name: "importantDecision",
        type: "textarea",
        label: "Important Decision",
      },
      { name: "statusUpdate", type: "textarea", label: "Status Update" },
      {
        name: "headAndSiRemark",
        type: "textarea",
        label: "Head,SI Remark",
      },
      {
        name: "hodObservation",
        type: "dropdown",
        options: ["Open", "Closed"],
        label: "HOD Observation",
      },
    ],
    VSCM: [
      { name: "region", type: "dropdown", label: "Region", required: true },
      { name: "state", type: "dropdown", label: "State", required: true },
      {
        name: "districts",
        type: "multiselect",
        label: "District",
        required: true,
      },

      {
        name: "dateOfMeeting",
        type: "date",
        label: "Meeting Date",
        required: true,
      },
      {
        name: "type",
        type: "dropdown",
        options: ["Planned", "Unplanned"],
        label: "Planned/Unplanned",
      },
      {
        name: "mode",
        type: "dropdown",
        options: ["Online"],
        label: "Online/Physical",
      },
      {
        name: "placeOfMeeting",
        type: "text",
        label: "Meeting Place"
      },
      {
        name: "uploadFile",
        type: "file",
        label: "Upload File",
        helperText: "(audio, video, image, doc, pdf)",
        multiple: true,
      },
      {
        name: "url",
        type: "text",
        label: "Link"
      },
      {
        name: "activityDetails",
        type: "textarea",
        // helperText:
        // "SCM & DFM - Indicate critical issue(s) raised & MFIN action points; SKM - indicate the officer(s) details, purpose & outcome of the engagement; Critical Issues - Indicate source of Information, date reported to MFIN, MFIs affected, #Borrowers duped, amount, #Outstanding loans etc.",
        label: "Activity Details",
      },
      {
        name: "importantDecision",
        type: "textarea",
        label: "Important Decision",
      },
      { name: "statusUpdate", type: "textarea", label: "Status Update" },
      {
        name: "headAndSiRemark",
        type: "textarea",
        label: "Head,SI Remark",
      },
      {
        name: "hodObservation",
        type: "dropdown",
        options: ["Open", "Closed"],
        label: "HOD Observation",
      },
    ],
    DFM: [
      { name: "region", type: "dropdown", label: "Region", required: true },
      { name: "state", type: "dropdown", label: "State", required: true },
      {
        name: "districts",
        type: "multiselect",
        label: "District",
        required: true,
      },
      {
        name: "dateOfMeeting",
        type: "date",
        label: "Meeting Date",
        required: true,
      },
      {
        name: "url",
        type: "text",
        label: "Link"
      },
      {
        name: "type",
        type: "dropdown",
        options: ["Planned", "Unplanned"],
        label: "Planned/Unplanned",
      },
      {
        name: "mode",
        type: "dropdown",
        options: ["Online", "Physical"],
        label: "Online/Physical",
      },
      {
        name: "placeOfMeeting",
        type: "text",
        label: "Meeting Place"
      },
      {
        name: "MomUploadedInRadar",
        type: "dropdown",
        options: ["Yes", "No"],
        label: "MOM Uploaded in Radar",
      },
      {
        name: "activityDetails",
        type: "textarea",
        label: "Activity Details",
      },
      {
        name: "importantDecision",
        type: "textarea",
        label: "Important Decision",
      },

      { name: "statusUpdate", type: "textarea", label: "Status Update" },
      {
        name: "headAndSiRemark",
        type: "textarea",
        label: "Head,SI Remark",
      },
      {
        name: "hodObservation",
        type: "dropdown",
        options: ["Open", "Closed"],
        label: "HOD Observation",
      },
    ],
    CI: [
      {
        name: "incidents",
        type: "dropdown",
        options: [
          "Suicide",
          "Loan Waiver Campaign",
          "Protest/Rally",
          "Loan Pipelining",
          "Robbery/Theft",
          "Ring Leader",
          "Negative Press",
          "Others",
        ],
        label: "Incidents"
      },
      { name: "region", type: "dropdown", label: "Region", required: true },
      { name: "state", type: "dropdown", label: "State", required: true },
      {
        name: "districts",
        type: "multiselect",
        label: "District",
        required: true,
      },
      { name: "village", type: "text", label: "Village" },
      { name: "dateOfMeeting", type: "date", label: "Meeting Date" },
      {
        name: "sourceOfInformation",
        type: "dropdown",
        options: ["MFI", "Newspaper", "TV News", "Social Media", "Others"],
        label: "Source of Information",
      },
      { name: "shortDescription", type: "text", label: "Short Description" },
      {
        name: "uploadFile",
        type: "file",
        label: "Upload File",
        helperText: "(Audio, video, Image, doc, pdf)",
        multiple: true,
      },
      {
        name: "url",
        type: "text",
        label: "Link"
      },
      {
        name: "activityDetails",
        type: "textarea",
        label: "Activity Details",
      },
      { name: "statusUpdate", type: "textarea", label: "Status Update" },
      {
        name: "headAndSiRemark",
        type: "textarea",
        label: "Head,SI Remark",
      },
      {
        name: "hodObservation",
        type: "dropdown",
        options: ["Open", "Closed"],
        label: "HOD Observation",
      },
    ],
    SCC: [
      { name: "region", type: "dropdown", label: "Region", required: true },
      { name: "state", type: "dropdown", label: "State", required: true },
      {
        name: "districts",
        type: "multiselect",
        label: "District",
        required: true,
      },
      {
        name: "dateOfMeeting",
        type: "date",
        label: "Meeting Date",
        required: true,
      },
      {
        name: "type",
        type: "dropdown",
        options: ["Planned", "Unplanned"],
        label: "Planned/Unplanned",
      },
      {
        name: "mode",
        type: "dropdown",
        options: ["Online", "Physical"],
        label: "Online/Physical",
      },
      {
        name: "placeOfMeeting",
        type: "text",
        label: "Meeting Place"
      },
      {
        name: "uploadFile",
        type: "file",
        label: "Upload File",
        helperText: "(Audio, video, Image, doc, pdf)",
        multiple: true,
      },
      {
        name: "url",
        type: "text",
        label: "Link"
      },
      {
        name: "activityDetails",
        type: "textarea",
        label: "Activity Details",
      },
      {
        name: "importantDecision",
        type: "textarea",
        label: "Important Decision",
      },
      { name: "statusUpdate", type: "textarea", label: "Status Update" },
      {
        name: "headAndSiRemark",
        type: "textarea",
        label: "Head,SI Remark",
      },
      {
        name: "hodObservation",
        type: "dropdown",
        options: ["Open", "Closed"],
        label: "HOD Observation",
      },
    ],
    MFAP: [
      { name: "region", type: "dropdown", label: "Region", required: true },
      { name: "state", type: "dropdown", label: "State", required: true },
      {
        name: "districts",
        type: "multiselect",
        label: "District",
        required: true,
      },
      { name: "village", type: "text" },
      {
        name: "type",
        type: "dropdown",
        options: ["Planned", "Unplanned"],
        label: "Planned/Unplanned",
      },
      {
        name: "mode",
        type: "dropdown",
        options: ["Online", "Physical"],
        label: "Online/Physical",
      },
      { name: "dateOfMeeting", type: "date", label: "Meeting Date" },
      { name: "feedback", type: "text", label: "Feedback" },
      {
        name: "uploadFile",
        type: "file",
        label: "Upload File",
        helperText: "(Audio, video, Image, doc, pdf)",
        multiple: true,
      },

      {
        name: "url",
        type: "text",
        label: "Link"
      },
      {
        name: "activityDetails",
        type: "textarea",
        label: "Activity Details",
      },
      { name: "statusUpdate", type: "textarea", label: "Status Update" },
      {
        name: "headAndSiRemark",
        type: "textarea",
        label: "Head,SI Remark",
      },
      {
        name: "hodObservation",
        type: "dropdown",
        options: ["Open", "Closed"],
        label: "HOD Observation",
      },
    ],
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            name={field.name}
            value={formData.dynamicFields[field.name] || ""}
            onChange={handleChange}
            className="form-control"
            required={field.required}
          />
        );
      case "textarea":
        return (
          <textarea
            name={field.name}
            rows={4}
            value={formData.dynamicFields[field.name] || ""}
            onChange={handleChange}
            className="form-control"
            required={field.required}
          />
        );
      case "date":
        return (
          <input
            type="date"
            name={field.name}
            value={formData.dynamicFields[field.name] || ""}
            onChange={handleChange}
            className="form-control"
            required={field.required}
          />
        );
      case "dropdown":
        if (field.name === "region") {
          return (
            <select
              name={field.name}
              value={formData.dynamicFields[field.name] || ""}
              onChange={handleChange}
              className="form-select"
              required={field.required}
              disabled={isLoading.regions}
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          );
        } else if (field.name === "state") {
          return (
            <select
              name={field.name}
              value={formData.dynamicFields[field.name] || ""}
              onChange={handleChange}
              className="form-select"
              required={field.required}
              disabled={!formData.dynamicFields.region || isLoading.states}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          );
        } else if (field.name === "incidents") {
          return (
            <>
              <select
                name={field.name}
                value={formData.dynamicFields[field.name] || ""}
                onChange={handleChange}
                className="form-select"
                required={field.required}
              >
                <option value="">Select</option>
                {field.options &&
                  field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
              {showOtherIncidentInput && (
                <input
                  type="text"
                  name="incidents_other"
                  value={formData.dynamicFields.incidents_other || ""}
                  onChange={handleChange}
                  className="form-control mt-2"
                  // placeholder="Please specify incident"
                  required
                />
              )}
            </>
          );
        } else if (field.name === "sourceOfInformation") {
          return (
            <>
              <select
                name={field.name}
                value={formData.dynamicFields[field.name] || ""}
                onChange={handleChange}
                className="form-select"
                required={field.required}
              >
                <option value="">Select</option>
                {field.options &&
                  field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
              {showOtherSourceInput && (
                <input
                  type="text"
                  name="sourceOfInformation_other"
                  value={formData.dynamicFields.sourceOfInformation_other || ""}
                  onChange={handleChange}
                  className="form-control mt-2"
                  // placeholder="Please specify source"
                  required
                />
              )}
            </>
          );
        } else {
          return (
            <select
              name={field.name}
              value={formData.dynamicFields[field.name] || ""}
              onChange={handleChange}
              className="form-select"
              required={field.required}
            >
              <option value="">Select</option>
              {field.options &&
                field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          );
        }
        case "multiselect":
      if (field.name === "districts") {
        return (
          <DistrictMultiselect
            formData={formData}
            isLoading={isLoading}
            handleDistrictSelect={handleDistrictSelect}
            filteredDistricts={filteredDistricts}
            isDistrictDropdownOpen={isDistrictDropdownOpen}
            setIsDistrictDropdownOpen={setIsDistrictDropdownOpen}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectAllDistricts={selectAllDistricts}
            unselectAllDistricts={unselectAllDistricts}
          />
        );
      }
      break;
      // case "multiselect":
      //   if (field.name === "districts") {
      //     return (
      //       <div className="district-select-container">
      //         <button
      //           type="button"
      //           className="district-select-toggle"
      //           onClick={() =>
      //             setIsDistrictDropdownOpen(!isDistrictDropdownOpen)
      //           }
      //           disabled={!formData.dynamicFields.state || isLoading.districts}
      //         >
      //           {formData.dynamicFields.districts &&
      //             formData.dynamicFields.districts.length > 0
      //             ? `${formData.dynamicFields.districts.length} selected`
      //             : "Select Districts"}
      //           <span className="dropdown-arrow">
      //             {isDistrictDropdownOpen ? "▲" : "▼"}
      //           </span>
      //         </button>

      //         {isDistrictDropdownOpen && (
      //           <div className="district-dropdown">
      //             <div className="district-search">
      //               <input
      //                 type="text"
      //                 placeholder="Search districts..."
      //                 value={searchTerm}
      //                 onChange={(e) => setSearchTerm(e.target.value)}
      //               />
      //             </div>
      //             <div className="district-actions">
      //               <button type="button" onClick={selectAllDistricts}>
      //                 Select All
      //               </button>
      //               <button type="button" onClick={unselectAllDistricts}>
      //                 Unselect All
      //               </button>
      //             </div>
      //             <div className="district-list">
      //               {filteredDistricts.length > 0 ? (
      //                 filteredDistricts.map((district) => (
      //                   <div key={district} className="district-item">
      //                     <label>
      //                       <input
      //                         type="checkbox"
      //                         checked={
      //                           formData.dynamicFields.districts &&
      //                           formData.dynamicFields.districts.includes(
      //                             district
      //                           )
      //                         }
      //                         onChange={() => handleDistrictSelect(district)}
      //                       />
      //                       {district}
      //                     </label>
      //                   </div>
      //                 ))
      //               ) : (
      //                 <div className="no-districts">No districts found</div>
      //               )}
      //             </div>
      //           </div>
      //         )}
      //       </div>
      //     );
      //   }
      //   break;
      case "file":
        return (
          <input
            type="file"
            name={field.name}
            onChange={handleChange}
            className="form-control"
            ref={fileInputRef}
            multiple={field.multiple || false}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="AddMeeting">
      <div className="container mt-5 text-start">
        <div className="row g-4 mt-5">
          <div className="col-md-6">
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
            <h4 className="mb-0">Edit Activity / Event</h4>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <div className="row g-3">
              {/* Activity Type Dropdown */}
              <div className="col-md-4">
                <label className="form-label">Activity</label>
                <select
                  name="activity_type"
                  value={formData.activity_type}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="SKM">SKM (Stakeholder Engagement)</option>
                  <option value="SCM">SCM (State Chapter Meeting)</option>
                  <option value="VSCM">VSCM (Virtual State Chapter Meeting)</option>
                  <option value="SCC">
                    SCC (State Coordination Committee)
                  </option>
                  <option value="DFM">DFM (District Forum Meeting)</option>
                  <option value="MFAP">
                    MFAP (Microfinance Awareness Program)
                  </option>
                  <option value="CI">CI (Critical Incident)</option>
                </select>
              </div>

              {/* Regional Head Dropdown */}
              <div className="col-md-4">
                <label className="form-label">Regional Head</label>
                <select
                  name="regional_head"
                  value={formData.regional_head}
                  onChange={handleChange}
                  className="form-select"
                  disabled={!(userRole === "Admin" || userRole === "Vertical-Head")}
                  required
                >
                  <option value="">Select</option>
                  {(userRole === "Admin" || userRole === "Vertical-Head") ? (
                    <>
                      {regionalHead.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option value={userName}>{userName}</option>
                  )}
                </select>
              </div>

              {/* Dynamic Fields based on Activity Type */}
              {activityFieldsMap[formData.activity_type] &&
                activityFieldsMap[formData.activity_type].filter((field) => {
                  // For DFM, only show placeOfMeeting if mode is Physical
                  // only show placeOfMeeting if mode is Physical
                  if ((formData.activity_type === "DFM" || formData.activity_type === "SKM" || formData.activity_type === "SCM" || formData.activity_type === "SCC") && field.name === "placeOfMeeting") {
                    return formData.dynamicFields.mode === "Physical";
                  }
                  if ((formData.activity_type === "SKM") && field.name === "personMeet") {
                    return formData.dynamicFields.mode === "Physical";
                  }
                  // Show all fields for Admin
                  if (userRole === "Admin" || userRole === "Vertical-Head") return true;
                  // Hide these two fields for non-Admins
                  return !["headAndSiRemark", "hodObservation"].includes(
                    field.name
                  );
                }).map((field) => (
                  <div
                    key={field.name}
                    className={
                      field.type === "textarea" ? "col-12" : "col-md-4"
                    }
                  >
                    <label className="form-label">
                      {field.label || field.name}
                      {field.required && (
                        <span className="text-danger"> *</span>
                      )}
                      {field.helperText && (
                        <span className="file-helper-text">
                          {field.helperText}
                        </span>
                      )}
                    </label>
                    {renderField(field)}
                  </div>
                ))}

              {/* Submit Button */}
              <div className="col-12 mt-4" style={{ marginLeft: "5px" }}>
                <button
                  type="submit"
                  className="css-1vhaqj4-MuiButtonBase-root-MuiButton-root  w-auto m-0"
                  disabled={isLoading.submit}
                >
                  {isLoading.submit ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMeeting;