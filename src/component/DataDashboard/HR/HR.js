import "./HR.css";
import React from "react"

function Hr({ formData, handleChange ,handleNestedChange}) {
  return (
    <div
      style={{
        width: "80%",
        backgroundColor: "#fff",
        padding: "20px",
      }}
    >
      <form>
        <table
          class="table table-light table-bordered border-primary"
          style={{ width: "100%" }}
        >
          <tbody>
            {/* sub heading */}

            <tr class="blue-row">
              <td style={{ backgroundColor: "#1f4a90" }}>
                {" "}
                Active number of staff
              </td>
              
              <td></td>
              <td style={{ backgroundColor: "#1f4a90",columnSpan:"3"}}>
                {" "}
                As on 31 December 2024
              </td>
              <td></td>
            </tr>
            <tr class="blue-row ">
              <td style={{ backgroundColor: "#1f4a90", color: "#fff" }}>
                No of Staff
              </td>
              <td style={{ backgroundColor: "#1f4a90", color: "#fff" }}>
                HO level
              </td>
              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#fff",
                  backgroundColor: "#1f4a90",
                }}
              >
                Branch/Regional Level
              </td>
              <td style={{ backgroundColor: "#1f4a90", color: "#fff" }}>
                Total
              </td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                Field Officers
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.active.ho.field_officers || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.active.ho.field_officers", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.active.branch.field_officers || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.active.branch.field_officers", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              Management (BM Level)
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.active.ho.management || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.active.ho.management", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.active.branch.management || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.active.branch.management", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              Senior Management
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.active.ho.senior_management || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.active.ho.senior_management", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.active.branch.senior_management || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.active.branch.senior_management", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              Probational
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.active.ho.probational || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.active.ho.probational", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.active.branch.probational || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.active.branch.probational", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              Others (support staff)
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.active.ho.others || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.active.ho.others", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.recruitment.ho.field_officers || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.recruitment.ho.field_officers", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
             Total
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
0
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              {/* {formData.staff.active.ho.others || ""} */}
              0
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              {/* {formData.staff.recruitment.ho.field_officers || ""} */}
              0</td>
            </tr>

<br></br>
            {/* 2nd form */}

             {/* sub heading */}

             <tr class="blue-row">
              <td style={{ backgroundColor: "#1f4a90" }}>
                {" "}
                Staff Recruitment
              </td>
              
              <td></td>
              <td style={{ backgroundColor: "#1f4a90" }}>
                {" "}
                From 1 Jan 24 to 31 Dec 24		
              </td>
              <td></td>
            </tr>
            <tr class="blue-row ">
              <td style={{ backgroundColor: "#1f4a90", color: "fff" }}>
                No of Staff
              </td>
              <td style={{ backgroundColor: "#1f4a90", color: "#fff" }}>
                HO level
              </td>
              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#fff",
                  backgroundColor: "#1f4a90",
                }}
              >
                Branch/Regional Level
              </td>
              <td style={{ backgroundColor: "#1f4a90", color: "#fff" }}>
                Total
              </td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                Field Officers
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.active.ho.field_officers || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.recruitment.ho.field_officers", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.recruitment.branch.others || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.recruitment.branch.others", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              Management (BM Level)
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.recruitment.ho.management || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.recruitment.ho.management", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.recruitment.branch.management || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.recruitment.branch.management", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              Senior Management
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.recruitment.ho.senior_management || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.recruitment.ho.senior_management", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.recruitment.branch.senior_management || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.recruitment.branch.senior_management", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              Probational
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.recruitment.ho.probational || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.recruitment.ho.probational", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.recruitment.branch.probational || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.recruitment.branch.probational", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              Others (support staff)
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.recruitment.ho.others || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.recruitment.ho.others", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.recruitment.branch.others || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.recruitment.branch.others", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
             Total
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              {/* formData.staff.recruitment.branch.total */}
                   0
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              0
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>


            {/* 3rd form */}

           <br></br>

             {/* sub heading */}

             <tr class="blue-row">
              <td style={{ backgroundColor: "#1f4a90" }}>
                {" "}
                Staff Attrition
              </td>
              
              <td></td>
              <td style={{ backgroundColor: "#1f4a90" }}>
                {" "}
                From 1 Jan 24 to 31 Dec 24	
              </td>
              <td></td>
            </tr>
            <tr class="blue-row ">
              <td style={{ backgroundColor: "#1f4a90", color: "#fff" }}>
                No of Staff
              </td>
              <td style={{ backgroundColor: "#1f4a90", color: "#fff" }}>
                HO level
              </td>
              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#fff",
                  backgroundColor: "#1f4a90",
                }}
              >
                Branch/Regional Level
              </td>
              <td style={{ backgroundColor: "#1f4a90", color: "#fff" }}>
                Total
              </td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color:"black"}}>
                Field Officers
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.attrition.ho.field_officers || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.attrition.ho.field_officers", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.attrition.branch.field_officers || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.attrition.branch.field_officers", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              Management (BM Level)
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.attrition.ho.management || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.attrition.ho.management", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.attrition.branch.management || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.attrition.branch.management", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              Senior Management
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.attrition.ho.senior_management || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.attrition.ho.senior_management", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.attrition.branch.senior_management || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.attrition.branch.senior_management", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              Probational
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.attrition.ho.probational || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.attrition.ho.probational", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.attrition.branch.probational || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.attrition.branch.probational", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              Others (support staff)
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.attrition.ho.total || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.attrition.ho.total", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.staff.attrition.branch.total || ""}
                  onChange={(e) =>
                    handleNestedChange("staff.attrition.branch.total", e.target.value)
                  }
                />
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>

            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fff", color: "black" }}>
             Total
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              {/* {formData.staff.attrition.branch.total || ""} */}
0
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>
              0
              </td>
              <td style={{ backgroundColor: "#fff", color: "black" }}>0</td>
            </tr>

            <br></br>
          
          </tbody>
        </table>
      </form>
    </div>
  );
}
export default Hr;

