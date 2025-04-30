
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./ViewContent.css";
import axios from "axios";

const ViewContent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const rowData = location.state.rowData;
    const [imageData, setImageData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!rowData.id) return;

            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.mfinindia.org/api/auth/meetings/show_new/${rowData.id}`
                );
                setImageData(
                    Array.isArray(response.data) ? response.data : [response.data]
                );
                console.log("image data", response.data);
            } catch (err) {
                console.error("Error in getting view data", err);
                setError("Failed to load file data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [rowData]);

    const handleDeleteFile = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you to delete this file?"
        );
        if (confirmDelete) {
            try {
                const response = await axios.delete(
                    ` https://api.mfinindia.org/api/auth/meetings/destroyfile/${id}`
                );
                window.location.reload(true);
            } catch (err) {
                console.log("error in deleting file", err);
            }
        }
    };

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

                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h2 className="mb-4">Meeting Details : {rowData.activity_type}</h2>

                            <div className="table-responsive" style={{ textAlign: "left" }}>
                                <table className="table table-bordered">
                                    <tbody>
                                        {rowData.region && (
                                            <tr>
                                                <th style={{ width: '10%' }} >Region</th>
                                                <td>{rowData.region}</td>
                                            </tr>
                                        )}
                                        {rowData.regional_head && (
                                            <tr>
                                                <th >Regional Head</th>
                                                <td>{rowData.regional_head}</td>
                                            </tr>
                                        )}
                                        {rowData.state && (
                                            <tr>
                                                <th>State</th>
                                                <td>{rowData.state}</td>
                                            </tr>
                                        )}
                                        {rowData.district && (
                                            <tr>
                                                <th>District</th>
                                                <td>{rowData.activity_type === "SCM" ? "All" : rowData.district}</td>
                                            </tr>
                                        )}
                                        {rowData.dateOfMeeting && (
                                            <tr>
                                                <th>Date of Meeting</th>
                                                <td>{rowData.dateOfMeeting}</td>
                                            </tr>
                                        )}
                                        {rowData.type && (
                                            <tr>
                                                <th>Planned/Unplanned</th>
                                                <td>{rowData.type}</td>
                                            </tr>
                                        )}
                                        {rowData.mode && (
                                            <tr>
                                                <th>Online/Physical</th>
                                                <td>{rowData.mode}</td>
                                            </tr>
                                        )}
                                        {rowData.personMeet && (
                                            <tr>
                                                <th>Person Met</th>
                                                <td>{rowData.personMeet}</td>
                                            </tr>
                                        )}
                                        {rowData.activity_details && (
                                            <tr>
                                                <th>Activity Details</th>
                                                <td>{rowData.activity_details}</td>
                                            </tr>
                                        )}
                                        {rowData.important_decision && (
                                            <tr>
                                                <th>Important Decision(s)</th>
                                                <td>{rowData.important_decision}</td>
                                            </tr>
                                        )}
                                        {rowData.status_update && (
                                            <tr>
                                                <th>Status Update(s)</th>
                                                <td>{rowData.status_update}</td>
                                            </tr>
                                        )}
                                        {rowData.head_and_si_remark && (
                                            <tr>
                                                <th>HOD Remark</th>
                                                <td>{rowData.head_and_si_remark}</td>
                                            </tr>
                                        )}
                                        {rowData.hod_observation && (
                                            <tr>
                                                <th>HOD Observation</th>
                                                <td>{rowData.hod_observation}</td>
                                            </tr>
                                        )}
                                        <tr>
                                            <th>File(s)</th>
                                            <td>
                                                {loading ? (
                                                    <span>Loading files...</span>
                                                ) : error ? (
                                                    <span className="text-red-500">{error}</span>
                                                ) : imageData.length > 0 ? (
                                                    <div className="file-preview-container">
                                                        {imageData.map((image, index) => {
                                                            const fileUrl = `https://api.mfinindia.org/public/${image.uploadFile}`;
                                                            let extension = "";

                                                            if (image && image.uploadFile) {
                                                                const parts = image.uploadFile.split(".");
                                                                extension =
                                                                    parts.length > 1
                                                                        ? parts[parts.length - 1].toLowerCase()
                                                                        : "";
                                                            }

                                                            // Set MIME type
                                                            let mimeType = "";
                                                            if (
                                                                extension === "jpg" ||
                                                                extension === "jpeg" ||
                                                                extension === "png"
                                                            ) {
                                                                mimeType =
                                                                    extension === "jpg"
                                                                        ? "image/jpeg"
                                                                        : "image/" + extension;
                                                            } else if (extension === "pdf") {
                                                                mimeType = "application/pdf";
                                                            } else if (
                                                                extension === "doc" ||
                                                                extension === "docx"
                                                            ) {
                                                                mimeType = "application/msword";
                                                            } else {
                                                                mimeType = "";
                                                            }

                                                            return (
                                                                <div
                                                                    key={image.uploadFile || index}
                                                                    className="file-preview-item"
                                                                >
                                                                    {/* Preview */}
                                                                    <div className="file-preview">
                                                                        {mimeType.indexOf("image/") === 0 ? (
                                                                            <img
                                                                                src={fileUrl}
                                                                                alt="File preview"
                                                                                className="file-image"
                                                                            />
                                                                        ) : (
                                                                            <object
                                                                                data={fileUrl}
                                                                                type={mimeType}
                                                                                className="file-object"
                                                                            >
                                                                                <p>Cannot display the file.</p>
                                                                            </object>
                                                                        )}
                                                                    </div>

                                                                    {/* Buttons */}
                                                                    <div className="file-actions">
                                                                        <a
                                                                            href={fileUrl}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            <button className="btn-view">View</button>
                                                                        </a>
                                                                        <button
                                                                            className="btn-delete"
                                                                            onClick={() => handleDeleteFile(image.id)}
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-500">
                                                        No files available
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                        {/* <tr>
                                            <th>File</th>
                                            <td>
                                                <a
                                                    href={`https://api.mfinindia.org/public/${rowData.uploadFile}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                    style={{ color: 'blue', textDecoration: 'underline' }}
                                                >
                                                    Download File
                                                </a>
                                            </td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewContent;
