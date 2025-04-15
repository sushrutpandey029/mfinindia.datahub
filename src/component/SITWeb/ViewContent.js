import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ViewContent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const rowData = location.state.rowData;

    if (!rowData) {
        return <p>No data found. Please navigate properly.</p>;
    }

    return (
        <div className="AddMeeting mt-6">
            <div className="container-fluid">
                <div className="row g-0">
                    <div className="col-12">
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

                        {/* Add card container with padding and overflow handling */}
                        <div className="bg-white p-4 rounded-lg shadow-sm" style={{
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            whiteSpace: 'normal'
                        }}>
                            <h2 className="mb-4">Meeting Details</h2>

                            {/* Add text container with proper wrapping */}
                            <div className="space-y-3 text-left" style={{
                                maxWidth: '100%',
                                overflow: 'hidden',
                                textAlign: 'left'
                            }}>
                                {rowData.region && <p className="break-words"><strong>Region:</strong> {rowData.region}</p>}
                                {rowData.regional_head && <p className="break-words"><strong>Regional Head:</strong> {rowData.regional_head}</p>}
                                {rowData.state && <p className="break-words"><strong>State:</strong> {rowData.state}</p>}
                                {rowData.district && <p className="break-words"><strong>District:</strong> {rowData.district}</p>}
                                {rowData.dateOfMeeting && <p className="break-words"><strong>Date of Meeting:</strong> {rowData.dateOfMeeting}</p>}
                                {rowData.type && <p className="break-words"><strong>Type:</strong> {rowData.type}</p>}
                                {rowData.mode && <p className="break-words"><strong>Mode:</strong> {rowData.mode}</p>}
                                {rowData.personMeet && <p className="break-words"><strong>Person Meet:</strong> {rowData.personMeet}</p>}
                                {rowData.activity_details && <p className="break-words"><strong>Activity Details:</strong> {rowData.activity_details}</p>}
                                {rowData.important_decision && <p className="break-words"><strong>Important Decision(s):</strong> {rowData.important_decision}</p>}
                                {rowData.status_update && <p className="break-words"><strong>Status Update(s):</strong> {rowData.status_update}</p>}
                                {rowData.head_and_si_remark && <p className="break-words"><strong>HOD Remark:</strong> {rowData.head_and_si_remark}</p>}
                                {rowData.hod_observation && <p className="break-words"><strong>HOD Observation:</strong> {rowData.hod_observation}</p>}

                                <p className="break-words">
                                    <strong>File:</strong>{" "}
                                    <a href={`https://api.mfinindia.org/public/${rowData.uploadFile}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline">
                                        Download File
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewContent;
