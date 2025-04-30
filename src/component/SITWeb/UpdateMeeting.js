

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./FormEntry.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UpdateMeeting = () => {
    const user = localStorage.getItem("user");
    let userName = "";
    let userRole = "";

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
                const showIncidentsOther = meetingData.incidents && !incidentsOptions.includes(meetingData.incidents);

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
                        incidents: showIncidentsOther ? "Others" : meetingData.incidents || "",
                        incidents_other: showIncidentsOther ? meetingData.incidents : "",
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

                setShowOtherIncidentInput(showIncidentsOther);
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

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            setFormData((prev) => ({
                ...prev,
                dynamicFields: {
                    ...prev.dynamicFields,
                    [name]: files[0],
                },
            }));
            return;
        }

        // Handle incidents dropdown
        if (name === "incidents") {
            const showOther = value === "Others";
            setShowOtherIncidentInput(showOther);
            setFormData((prev) => ({
                ...prev,
                dynamicFields: {
                    ...prev.dynamicFields,
                    [name]: value,
                    // Clear otherIncident when switching away from "Others"
                    ...(value !== "Others" ? { incidents_other: "" } : {}),
                },
            }));
            return;
        }

        // Handle sourceOfInformation dropdown
        if (name === "sourceOfInformation") {
            const showOther = value === "Others";
            setShowOtherSourceInput(showOther);
            setFormData((prev) => ({
                ...prev,
                dynamicFields: {
                    ...prev.dynamicFields,
                    [name]: value,
                    // Clear otherSource when switching away from "Others"
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
                if (value instanceof File) {
                    formDataToSend.append(key, value);
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
                `https://api.mfinindia.org/api/auth/meetings/archmeeting_update/${id}`,
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
                CI: "/critical-event",
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
            { name: "region", type: "dropdown", label: "Region", required: true, disabled: true },
            { name: "state", type: "dropdown", label: "State", required: true, disabled: true },
            {
                name: "districts",
                type: "multiselect",
                label: "District",
                required: true,
                disabled: true
            },
            {
                name: "dateOfMeeting",
                type: "date",
                label: "Meeting Date",
                required: true,
                disabled: true
            },
            {
                name: "type",
                type: "dropdown",
                options: ["Planned", "Unplanned"],
                label: "Planned/Unplanned",
                required: true,
                disabled: true
            },
            {
                name: "mode",
                type: "dropdown",
                options: ["Online", "Physical"],
                label: "Online/Physical",
                required: true,
                disabled: true
            },
            {
                name: "uploadFile",
                type: "file",
                label: "Upload File",
                helperText: "(Audio, video, Image, doc, pdf)",
                disabled: true
            },
            {
                name: "url",
                type: "text",
                label: "Link", disabled: true
            },
            { name: "personMeet", type: "text", label: "Person Met", disabled: true },
            {
                name: "activityDetails",
                type: "textarea",
                label: "Activity Details",
                required: true,
                disabled: true
            },
            {
                name: "importantDecision",
                type: "textarea",
                label: "Important Decision",
                disabled: true
            },
            { name: "statusUpdate", type: "textarea", label: "Status Update" },
            {
                name: "headAndSiRemark",
                type: "textarea",
                label: "Head,SI Remark",
                disabled: true
            },
            {
                name: "hodObservation",
                type: "dropdown",
                options: ["Open", "Closed"],
                label: "HOD Observation",
            },
        ],
        SCM: [
            {
                name: "region", type: "dropdown", label: "Region", required: true,
                disabled: true
            },
            {
                name: "state", type: "dropdown", label: "State", required: true,
                disabled: true
            },
            {
                name: "districts",
                type: "multiselect",
                label: "District",
                required: true,
                disabled: true
            },

            {
                name: "dateOfMeeting",
                type: "date",
                label: "Meeting Date",
                required: true,
                disabled: true
            },
            {
                name: "type",
                type: "dropdown",
                options: ["Planned", "Unplanned"],
                label: "Planned/Unplanned",
                disabled: true
            },
            {
                name: "mode",
                type: "dropdown",
                options: ["Online", "Physical"],
                label: "Online/Physical",
                disabled: true
            },
            {
                name: "placeOfMeeting",
                type: "text",
                label: "Meeting Place",
                disabled: true
            },
            {
                name: "uploadFile",
                type: "file",
                label: "Upload File",
                helperText: "(Audio, video, Image, doc, pdf)",
                disabled: true
            },
            {
                name: "url",
                type: "text",
                label: "Link",
                disabled: true
            },
            {
                name: "activityDetails",
                type: "textarea",
                label: "Activity Details",
                disabled: true
            },
            {
                name: "importantDecision",
                type: "textarea",
                label: "Important Decision",
                disabled: true
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
            { name: "region", type: "dropdown", label: "Region", required: true, disabled: true },
            { name: "state", type: "dropdown", label: "State", required: true, disabled: true },
            {
                name: "districts",
                type: "multiselect",
                label: "District",
                required: true,
                disabled: true
            },
            {
                name: "dateOfMeeting",
                type: "date",
                label: "Meeting Date",
                required: true,
                disabled: true
            },
            {
                name: "url",
                type: "text",
                label: "Link",
                disabled: true
            },
            {
                name: "type",
                type: "dropdown",
                options: ["Planned", "Unplanned"],
                label: "Planned/Unplanned",
                disabled: true
            },
            {
                name: "mode",
                type: "dropdown",
                options: ["Online", "Physical"],
                label: "Online/Physical",
                disabled: true
            },
            {
                name: "placeOfMeeting",
                type: "text",
                label: "Meeting Place",
                disabled: true
            },
            {
                name: "MomUploadedInRadar",
                type: "dropdown",
                options: ["Yes", "No"],
                label: "MOM Uploaded in Radar",
                disabled: true
            },
            {
                name: "activityDetails",
                type: "textarea",
                label: "Activity Details",
                disabled: true
            },
            {
                name: "importantDecision",
                type: "textarea",
                label: "Important Decision",
                disabled: true
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
                disabled: true
            },
            { name: "region", type: "dropdown", label: "Region", required: true, disabled: true },
            { name: "state", type: "dropdown", label: "State", required: true, disabled: true },
            {
                name: "districts",
                type: "multiselect",
                label: "District",
                required: true,
                disabled: true
            },
            { name: "village", type: "text", label: "Village", disabled: true },
            { name: "dateOfMeeting", type: "date", label: "Meeting Date", disabled: true },
            {
                name: "sourceOfInformation",
                type: "dropdown",
                options: ["MFI", "Newspaper", "TV News", "Social Media", "Others"],
                label: "Source of Information",
                disabled: true
            },
            { name: "shortDescription", type: "text", label: "Short Description", disabled: true },
            {
                name: "uploadFile",
                type: "file",
                label: "Upload File",
                helperText: "(Audio, video, Image, doc, pdf)",
                disabled: true
            },
            {
                name: "url",
                type: "text",
                label: "Link",
                disabled: true
            },
            {
                name: "activityDetails",
                type: "textarea",
                label: "Activity Details",
                disabled: true
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
            { name: "region", type: "dropdown", label: "Region", required: true, disabled: true },
            { name: "state", type: "dropdown", label: "State", required: true, disabled: true },
            {
                name: "districts",
                type: "multiselect",
                label: "District",
                required: true,
                disabled: true
            },
            {
                name: "dateOfMeeting",
                type: "date",
                label: "Meeting Date",
                required: true,
                disabled: true
            },
            {
                name: "type",
                type: "dropdown",
                options: ["Planned", "Unplanned"],
                label: "Planned/Unplanned",
                disabled: true
            },
            {
                name: "mode",
                type: "dropdown",
                options: ["Online", "Physical"],
                label: "Online/Physical",
                disabled: true
            },
            {
                name: "placeOfMeeting",
                type: "text",
                label: "Meeting Place",
                disabled: true
            },
            {
                name: "uploadFile",
                type: "file",
                label: "Upload File",
                helperText: "(Audio, video, Image, doc, pdf)",
                disabled: true
            },
            {
                name: "url",
                type: "text",
                label: "Link",
                disabled: true
            },
            {
                name: "activityDetails",
                type: "textarea",
                label: "Activity Details",
                disabled: true
            },
            {
                name: "importantDecision",
                type: "textarea",
                label: "Important Decision",
                disabled: true
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
            { name: "region", type: "dropdown", label: "Region", required: true, disabled: true },
            { name: "state", type: "dropdown", label: "State", required: true, disabled: true },
            {
                name: "districts",
                type: "multiselect",
                label: "District",
                required: true,
                disabled: true
            },
            { name: "village", type: "text", disabled: true },
            {
                name: "type",
                type: "dropdown",
                options: ["Planned", "Unplanned"],
                label: "Planned/Unplanned",
                disabled: true
            },
            {
                name: "mode",
                type: "dropdown",
                options: ["Online", "Physical"],
                label: "Online/Physical",
                disabled: true
            },
            { name: "dateOfMeeting", type: "date", label: "Meeting Date", disabled: true },
            { name: "feedback", type: "text", label: "Feedback" },
            {
                name: "uploadFile",
                type: "file",
                label: "Upload File",
                helperText: "(Audio, video, Image, doc, pdf)",
                disabled: true
            },

            {
                name: "url",
                type: "text",
                label: "Link",
                disabled: true
            },
            {
                name: "activityDetails",
                type: "textarea",
                label: "Activity Details",
                disabled: true
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
        const isDisabled = field.disabled || false;
        switch (field.type) {
            case "text":
                return (
                    <input
                        type="text"
                        name={field.name}
                        disabled={isDisabled}
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
                        disabled={isDisabled}
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
                        disabled={isDisabled}
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
                            disabled={isLoading.regions || isDisabled}
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
                            disabled={!formData.dynamicFields.region || isLoading.states || isDisabled}
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
                                disabled={isDisabled}
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
                                    placeholder="Please specify incident"
                                    required
                                    disabled={isDisabled}
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
                                disabled={isDisabled}
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
                                    placeholder="Please specify source"
                                    required
                                    disabled={isDisabled}
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
                            disabled={isDisabled}
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
                        <div className="district-select-container">
                            <button
                                type="button"
                                className="district-select-toggle"
                                onClick={() =>
                                    setIsDistrictDropdownOpen(!isDistrictDropdownOpen)
                                }
                                disabled={!formData.dynamicFields.state || isLoading.districts || isDisabled}
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
                                        />
                                    </div>
                                    <div className="district-actions">
                                        <button type="button" onClick={selectAllDistricts}>
                                            Select All
                                        </button>
                                        <button type="button" onClick={unselectAllDistricts}>
                                            Unselect All
                                        </button>
                                    </div>
                                    <div className="district-list">
                                        {filteredDistricts.length > 0 ? (
                                            filteredDistricts.map((district) => (
                                                <div key={district} className="district-item">
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                formData.dynamicFields.districts &&
                                                                formData.dynamicFields.districts.includes(
                                                                    district
                                                                )
                                                            }
                                                            onChange={() => handleDistrictSelect(district)}
                                                        />
                                                        {district}
                                                    </label>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="no-districts">No districts found</div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* {formData.dynamicFields.districts &&
                                formData.dynamicFields.districts.length > 0 && (
                                    <div className="selected-districts-preview">
                                        <small>
                                            Selected: {formData.dynamicFields.districts.join(", ")}
                                        </small>
                                    </div>
                                )} */}
                        </div>
                    );
                }
                break;
            case "file":
                return (
                    <input
                        type="file"
                        name={field.name}
                        onChange={handleChange}
                        className="form-control"
                        disabled={isDisabled}
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
                        <h4 className="mb-0">Update Activity / Event</h4>
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
                                    disabled
                                >
                                    <option value="SKM">SKM (Stakeholder Engagement)</option>
                                    <option value="SCM">SCM (State Chapter Meeting)</option>
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
                                    <option value="Sushrut Pandey">Sushrut Pandey</option>
                                    <option value="Habib Shaikh">Habib Shaikh</option>
                                    <option value="PM Kamalesh">PM Kamalesh</option>
                                    <option value="Sanjay Kumar">Sanjay Kumar</option>
                                    <option value="Dhiraj Soni">Dhiraj Soni</option>
                                    <option value="Devendra Shahapurkar">
                                        Devendra Shahapurkar
                                    </option>
                                    <option value="Vijay Wadhwa">Vijay Wadhwa</option>
                                    <option value="M S Manjunatha">M S Manjunatha</option>
                                </select>
                            </div>

                            {/* Dynamic Fields based on Activity Type */}
                            {activityFieldsMap[formData.activity_type] &&
                                activityFieldsMap[formData.activity_type].filter((field) => {
                                    // only show placeOfMeeting if mode is Physical
                                    if ((formData.activity_type === "DFM" || formData.activity_type === "SKM" || formData.activity_type === "SCM" || formData.activity_type === "SCC") && field.name === "placeOfMeeting") {
                                        return formData.dynamicFields.mode === "Physical";
                                    }
                                    if ((formData.activity_type === "SKM") && field.name === "personMeet") {
                                        return formData.dynamicFields.mode === "Physical";
                                    }
                                    // Show all fields for Admin
                                    if (userRole === "Admin" || userRole === "Vertical-Head") return true
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

export default UpdateMeeting;