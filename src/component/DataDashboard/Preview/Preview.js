import React from "react";
import "./Preview.css";

function Preview({ formData, setActiveStep, handleSubmit }) {
  // console.log("preview", formData);
  return (
    <div>
      <h2>Review Your Information</h2>

      <div className="containers-in">
        <div style={{ marginTop: "20px" }}>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => setActiveStep(0)}
          >
            Edit
          </button>
          <button className="btn btn-sm btn-primary" onClick={handleSubmit}>
            Confirm and Submit
          </button>
        </div>
        {/* <h5>Overview</h5>
        <h6>Particulars</h6>
        <b>Infrastructure         As on 31 December 2024</b>
        <p>Employees (in Numbers) : {formData && formData.Infrastructure.Employees}</p>
        <p>Loan Officers (in Numbers) : {}</p>
        <p>Districts (in Numbers) : {}</p>
        <p>Branches (in Numbers) : {}</p>

        <b>Balance Sheet Figures          As on 31 December 2024</b> */}
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Preview;
