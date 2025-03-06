import "./PortfolioBreakup.css";
import React, { useState } from "react";

function PortfolioBreakup({ formData, handleChange ,handleNestedChange}) {
  return (
    <div style={{ width: "80%", margin: "auto", padding: "20px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid black",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#2c3e50", color: "white" }}>
            {/* <th style={{ border: '1px solid black', padding: '10px', textAlign: 'left' }}></th> */}
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "#1f4a90",
              }}
              colSpan={2}
            ></th>
            <th style={{ padding: "10px", backgroundColor: "#1f4a90" }}>
              {" "}
              AUM(INR)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            style={{
              backgroundColor: "#2c3e50",
              color: "white",
              backgroundColor: "#1f4a90",
            }}
          >
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "1f4a90",
              }}
            >
              Purpose
            </th>

            <th style={{ float: "right", padding: "10px" }}></th>
            <th>As on 31 December 2024
            </th>
          </tr>

          <tr style={{ backgroundColor: "#ecf0f1", fontWeight: "bold" }}>
            <td className="TDCOLUMN"> A</td>
            <td style={{ border: "1px solid black", padding: "10px" }}>
              Agriculture and Allied Activities (total)
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {/*here: formData.AgricultureAndAlliedActivitiesTotal */}
              {formData.AgricultureAndAlliedActivitiesTotal || 0}
            </td>
          </tr>

          <tr style={{ fontWeight: "bold" }}>
            <td className="TDCOLUMN"></td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            >
              Agriculture and Allied Activities
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <input
                  type="text"
                  class="form-control"
                  value={formData.AgricultureAndAlliedActivities || ""}
                  onChange={(e) =>
                    handleChange("","AgricultureAndAlliedActivities", e.target.value)
                  }
                />
            </td>
          </tr>

          <tr style={{ backgroundColor: "#fff", fontWeight: "bold" }}>
            <td
              className="TDCOLUMN"
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              B
            </td>
            <td style={{ border: "1px solid black", padding: "10px" }}>
              Non-agriculture (total)
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {/* here : NonAgricultureTotal */}
              {formData.NonAgricultureTotal || 0}
            </td>
          </tr>

          <tr style={{ fontWeight: "bold" }}>
            <td className="TDCOLUMN"></td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            >
              Trade and services
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <input
                  type="text"
                  class="form-control"
                  value={formData.TradeAndServices || ""}
                  onChange={(e) =>
                    handleChange("","TradeAndServices", e.target.value)
                  }
                />
            </td>
          </tr>

          <tr style={{ fontWeight: "bold" }}>
            <td className="TDCOLUMN"></td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            >
              Manufacturing / production
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
             <input
                  type="text"
                  class="form-control"
                  value={formData.ManufacturingProduction || ""}
                  onChange={(e) =>
                    handleChange("","ManufacturingProduction", e.target.value)
                  }
                />
            </td>
          </tr>

          <tr style={{ backgroundColor: "#ecf0f1", fontWeight: "bold" }}>
            <td
              className="TDCOLUMN"
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              C
            </td>
            <td style={{ border: "1px solid black", padding: "10px" }}>
              Household Finance (total)
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {/* here : HouseholdFinanceTotal */}
              {formData.HouseholdFinanceTotal || 0}
            </td>
          </tr>

          <tr style={{ fontWeight: "bold" }}>
            <td className="TDCOLUMN"></td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            >
              Education
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <input
                  type="text"
                  class="form-control"
                  value={formData.Education || ""}
                  onChange={(e) =>
                    handleChange("","Education", e.target.value)
                  }
                />
            </td>
          </tr>
          <tr style={{ fontWeight: "bold" }}>
            <td className="TDCOLUMN"></td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            >
              Medical
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <input
                  type="text"
                  class="form-control"
                  value={formData.Medical || ""}
                  onChange={(e) =>
                    handleChange("","Medical", e.target.value)
                  }
                />
            </td>
          </tr>

          <tr style={{ fontWeight: "bold" }}>
            <td className="TDCOLUMN"></td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            >
              Housing / home improvement
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <input
                  type="text"
                  class="form-control"
                  value={formData.HousingHomeImprovement || ""}
                  onChange={(e) =>
                    handleChange("","HousingHomeImprovement", e.target.value)
                  }
                />
            </td>
          </tr>

          <tr style={{ fontWeight: "bold" }}>
            <td className="TDCOLUMN"></td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            >
              Other household finance
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <input
                  type="text"
                  class="form-control"
                  value={formData.OtherHouseholdFinance || ""}
                  onChange={(e) =>
                    handleChange("","OtherHouseholdFinance", e.target.value)
                  }
                />
            </td>
          </tr>

          <tr style={{ backgroundColor: "#ecf0f1", fontWeight: "bold" }}>
            <td
              className="TDCOLUMN"
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              {" "}
              D
            </td>
            <td style={{ border: "1px solid black", padding: "10px" }}>
              Total
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              {/* here : Total */}
              {formData.Total || 0}
            </td>
          </tr>

          <tr style={{ backgroundColor: "#ecf0f1", fontWeight: "bold" }}>
            <td
              className="TDCOLUMN"
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                background: "#1f4a90",
                color: "white",
              }}
            >
              {" "}
              Location
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                background: "#1f4a90",
              }}
            ></td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              {/* here : Location */}
              {formData.Location || 0}
            </td>
          </tr>

          <tr style={{ fontWeight: "bold" }}>
            <td className="TDCOLUMN"></td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            >
              Rural
            </td>

            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <input
                  type="text"
                  class="form-control"
                  value={formData.Location1.Rural || ""}
                  onChange={(e) =>
                    handleChange("Location1","Rural", e.target.value)
                  }
                />
            </td>
          </tr>

          <tr style={{ fontWeight: "bold" }}>
            <td className="TDCOLUMN"></td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            >
              Metropolitan / Urban / Semi-urban{" "}
            </td>

            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <input
                  type="text"
                  class="form-control"
                  value={formData.Location1.MetropolitanUrbanSemiUrban || ""}
                  onChange={(e) =>
                    handleChange("Location1","MetropolitanUrbanSemiUrban", e.target.value)
                  }
                />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PortfolioBreakup;

// import React from "react";

// const PortfolioBreakup = () => {
//   return (
//     <div
//       style={{
//         width: "80%",
//         backgroundColor: "#fff",
//         padding: "20px",
//       }}
//     >
//       <form>
//         <div>
//           <b>Purpose</b>
//           <br />
//           {/* sub heading */}
//           <b style={{ float: "left" }}>
//             A. Agriculture and Allied Activities (total) : 0
//           </b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Agriculture and Allied Activities
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           {/* sub heading */}
//           <b style={{ float: "left" }}>B. Non-agriculture (total) : 0</b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Trade and services
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Manufacturing / production
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           {/* sub heading */}
//           <b style={{ float: "left" }}>C. Household Finance (total) : 0</b>
//           <br />
//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Education
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Medical
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Housing / home improvement
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Other household finance
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           {/* sub heading */}
//           <b style={{ float: "left" }}>D. Total : 0</b>
//           <br />

//           <b>Location</b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Rural
//             </label>
//             <input type="text" class="form-control" />
//           </div>
//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Metropolitan / Urban / Semi-urban
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           {/* submit button */}
//           <div class="mb-3">
//             <button type="submit" class="btn btn-primary">
//               Submit
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PortfolioBreakup;
