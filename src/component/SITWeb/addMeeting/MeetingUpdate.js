import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddMeeting.css";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "react-calendar";
import { useState } from "react";
import axios from "axios";
import { Button, Card, CardContent } from "@mui/material";
import LocationData from "./LocationData";

const MeetingUpdate = () => {
  const { id } = useParams();

  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [formData, setFormData] = useState({
    regional_head: "",
    activity: "",
    type: "",
    mode: "",
    date_of_activity: "",
    region: "",
    state: "",
    district: "",
    status_update: "",
    activity_details: "",
    head_si_remark: "",
    upload_path:"",
    remark_status:""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, upload_path: e.target.files[0] });
  };

  const handleRegionChange = (event) => {
    const region = event.target.value;
    setSelectedRegion(region);
    setSelectedState(""); // Reset state dropdown
    setSelectedDistrict(""); // Reset district dropdown
    setFormData((prevFormData) => ({
      ...prevFormData,
      region,
      state: "",
      district: "",
    }));
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedDistrict(""); // Reset district dropdown
    setFormData((prevFormData) => ({
      ...prevFormData,
      state,
      district: "",
    }));
  };

  const handleDistrictChange = (event) => {
    const district = event.target.value;
    setSelectedDistrict(district);
    setFormData((prevFormData) => ({
      ...prevFormData,
      district,
    }));
  };

  const handleSubmit = async () => {
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    // console.log("formdata", formData);
    try {
      await axios.post(
        `https://api.mfinindia.org/api/auth/meetings/update/${id}`,
        form
      );
      alert("Meeting updated successfully!");
      console.log("sumitted");
      navigate("/meetinglisting");
    } catch (error) {
      console.error("Error adding meeting:", error);
      alert("Failed to add meeting.");
    }
  };

  const fetchUserData = async () => {
    try {
      const apiResponse = await axios.get(
        `https://api.mfinindia.org/api/auth/meetings/${id}`
      );
      setApiData(apiResponse.data);
      console.log("apiresp", apiResponse);
    } catch (err) {
      console.log("getmeeting-err", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setFormData({
      regional_head: apiData.regional_head,
      activity: apiData.activity,
      type: apiData.type,
      mode: apiData.mode,
      date_of_activity: apiData.date_of_activity,
      region: apiData.region,
      state: apiData.state,
      district: apiData.district,
      status_update: apiData.status_update,
      activity_details: apiData.activity_details,
      head_si_remark: apiData.head_si_remark,
      upload_path: apiData.upload_path,
      remark_status:apiData.remark_status
    });
    setSelectedRegion(apiData.region);
    setSelectedState(apiData.state);
    setSelectedDistrict(apiData.district);
  }, [apiData]);

  return (
    <div className="AddMeeting">
      <div className="container mt-5 text-start">
        <div className="row g-4 mt-5">
          <h4 className="mb-0">Update Actvity / Event</h4>
          <div className="col-md-4">
            <label className="form-label">Regional Head</label>

            <select
              className="form-select"
              aria-label="Default select example"
              name="regional_head"
              value={formData.regional_head}
              onChange={handleChange}
            >
              <option value=""> Select One</option>
              <option value="Habib Shaikh"> Habib Shaikh</option>
              <option value="PM Kamalesh">PM Kamalesh</option>
              <option value="Sanjay Kumar">Sanjay Kumar</option>
              <option value="Dhiraj Soni">Dhiraj Soni</option>
              <option value="Devendra Shahapurkar">Devendra Shahapurkar</option>
              <option value="Vijay Wadhwa">Vijay Wadhwa</option>
              <option value="M S Manjunatha">M S Manjunatha</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Activity</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="activity"
              value={formData.activity}
              onChange={handleChange}
            >
              <option selected> Select Activity</option>
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
              {/* <option selected> Select Activity</option>
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
              <option value="Other CI">Other CI</option> */}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Planned/Special</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select One</option>
              <option value="planned">Planned</option>
              <option value="special">Special</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Online/Physical</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="mode"
              value={formData.mode}
              onChange={handleChange}
            >
              <option value="">Select One</option>
              <option value="online">Online</option>
              <option value="physical">Physical</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Date of Activity</label>
            <input
              type="date"
              className="form-control"
              name="date_of_activity"
              value={formData.date_of_activity}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Region</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={selectedRegion}
              onChange={handleRegionChange}
            >
              <option value="">Select Region</option>
              {Object.keys(LocationData).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">State</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={selectedState}
              onChange={handleStateChange}
              //   disabled={!selectedRegion}
            >
              <option value="">Select State</option>
              {selectedRegion &&
                Object.keys(LocationData[selectedRegion].states).map(
                  (state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  )
                )}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">District</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              //   disabled={!selectedState}
            >
              <option value="">Select District</option>
              {selectedState &&
              LocationData &&
              LocationData[selectedRegion] &&
              LocationData[selectedRegion].states &&
              LocationData[selectedRegion].states[selectedState]
                ? LocationData[selectedRegion].states[selectedState].map(
                    (district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    )
                  )
                : null}
            </select>
          </div>
          <div className="col-md-4">
            <div className="main">
              {" "}
              <label className="form-label">Upload File</label>
            </div>
            <div className="main">
              <p className="Discription"> (file limit-10mb,Audio, video,Image,doc,pdf)</p>
            </div>
            <input
              type="file"
              className="form-control"
              name="upload_path"
              // value={formData.upload_path}
              onChange={handleFileChange}
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">Activity Details</label>
            <p className="Discription">
              SCM & DFM - Indicate critical issue(s) raised & MFIN action
              points; SKM - indicate the officer(s) details, purpose & outcome
              of the engagement; Critical Issues - Indicate source of
              Information, date reported to MFIN, MFIs affected, #Borrowers
              duped, amount, # Outstanding loans etc
            </p>
            <textarea
              className="form-control"
              name="activity_details"
              rows="3"
              value={formData.activity_details}
              onChange={handleChange}
              // placeholder="Enter Activity Details"
            ></textarea>
          </div>
          <div className="col-md-12">
            <label className="form-label">Status Update</label>
            <textarea
              className="form-control"
              rows="3"
              // placeholder="Status Update"
              name="status_update"
              value={formData.status_update}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="col-md-12">
            <label className="form-label">Head And SI Remark <span style={{fontSize:"11px"}}> (remarks : {formData.remark_status})</span></label>
            <textarea
              className="form-control"
              name="head_si_remark"
              rows="3"
              value={formData.head_si_remark}
              onChange={handleChange}
              // placeholder="Enter Head & SI Remark"
            ></textarea>
          </div>
          <div className="col-md-4">
            <button
              onClick={() => handleSubmit()}
              type="button"
              class="css-1vhaqj4-MuiButtonBase-root-MuiButton-root"
            >
             Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MeetingUpdate;
