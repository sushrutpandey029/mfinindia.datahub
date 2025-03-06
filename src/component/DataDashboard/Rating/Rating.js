import React, { useState } from "react";
import { loadUserFormData } from "../utils/StorageHelper";

function Rating({
  formData,
  handleRowCountChangeRating,
  handleInputChangeRating,
}) {
  const [numOfRating, setNumOfRating] = useState(() => {
    const storedData = loadUserFormData();
    return storedData.MostRecentRatingInformation
      ? storedData.MostRecentRatingInformation.length
      : 1;
  });

  const [numOfGrading, setNumOfGrading] = useState(() => {
    const storedData = loadUserFormData();
    return storedData.MostRecentGradingInformation
      ? storedData.MostRecentGradingInformation.length
      : 1;
  });

  const [numOfConductA, setNumOfConductA] = useState(() => {
    const storedData = loadUserFormData();
    return storedData.CodeOfConductAssessment
      ? storedData.CodeOfConductAssessment.length
      : 1;
  });
  return (
    <div
      style={{
        width: "80%",
        backgroundColor: "fff",
        padding: "20px",
      }}
    >
      <form>
        {/* Most recent rating information (except the rating of debt instruments)						
 table */}
        <label>Choose number of rows: </label>
        <select
          onChange={(e) =>
            handleRowCountChangeRating(
              e,
              "MostRecentRatingInformation",
              setNumOfRating,
              {
                RatingAgency: "",
                RatingScale: "",
                Degree: "",
                Outlook: "",
                DateOfRating: "",
                ValidUpTo: "",
              }
            )
          }
          value={numOfRating}
        >
          {[...Array(4)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <table
          class="table table-light table-bordered border-primary"
          style={{ width: "100%" }}
        >
          <thead>
            <tr className="blue-row">
              <th>S. No.</th>
              <th colSpan={7}>
                Most recent rating information (except the rating of debt
                instruments){" "}
              </th>
            </tr>

            <tr className="pink-row">
              <th></th>
              <th></th>
              <th>Rating agency</th>
              <th>Rating Scale</th>
              <th>Degree</th>
              <th>Outlook</th>
              <th>Date of rating</th>
              <th>Valid up to (DD/MMM/YY)</th>
            </tr>
          </thead>
          <tbody>
            {formData.MostRecentRatingInformation.length &&
              formData.MostRecentRatingInformation.map((item, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>Rating</td>
                  <td>
                    {/* <input
                      type="text"
                      class="form-control"
                      value={item.RatingAgency}
                      placeholder="rat"
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "RatingAgency",
                          e.target.value,
                          "MostRecentRatingInformation"
                        )
                      }
                    /> */}
                    <select
                      className="form-control"
                      value={item.RatingAgency}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "RatingAgency",
                          e.target.value,
                          "MostRecentRatingInformation"
                        )
                      }
                    >
                      <option value="">Select Agency</option>
                      <option value="Acuite">Acuite</option>
                      <option value="Care">Care</option>
                      <option value="CRISIL">CRISIL</option>
                      <option value="ICRA">ICRA</option>
                      <option value="India Ratings">India Ratings</option>
                      <option value="Infomerics Rating">
                        Infomerics Rating
                      </option>
                    </select>
                  </td>
                  <td>
                    <select
                      className="form-control"
                      value={item.RatingScale}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "RatingScale",
                          e.target.value,
                          "MostRecentRatingInformation"
                        )
                      }
                    >
                      <option value="">Select Scale</option>
                      <option value="AAA">AAA</option>
                      <option value="AA">AA</option>
                      <option value="A">A</option>
                      <option value="BBB">BBB</option>
                      <option value="BB">BB</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                    {/* <input
                      type="text"
                      class="form-control"
                      value={item.RatingScale}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "RatingScale",
                          e.target.value,
                          "MostRecentRatingInformation"
                        )
                      }
                    /> */}
                  </td>
                  <td>
                    <select
                      className="form-control"
                      value={item.Degree}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "Degree",
                          e.target.value,
                          "MostRecentRatingInformation"
                        )
                      }
                    >
                      <option value="">Select Degree</option>
                      <option value="Neutral">Neutral</option>
                      <option value="Plus (+)">Plus (+)</option>
                      <option value="Double Plus (++)">Double Plus (++)</option>
                      <option value="Minus (-)">Minus (-)</option>
                    </select>
                    {/* <input
                      type="text"
                      class="form-control"
                      value={item.Degree}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "Degree",
                          e.target.value,
                          "MostRecentRatingInformation"
                        )
                      }
                    /> */}
                  </td>
                  <td>
                    <select
                      className="form-control"
                      value={item.Outlook}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "Outlook",
                          e.target.value,
                          "MostRecentRatingInformation"
                        )
                      }
                    >
                      <option value="">Select Outlook</option>
                      <option value="Stable">Stable</option>
                      <option value="Positive">Positive</option>
                      <option value="Negative">Negative</option>
                    </select>
                    {/* <input
                      type="text"
                      class="form-control"
                      value={item.Outlook}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "Outlook",
                          e.target.value,
                          "MostRecentRatingInformation"
                        )
                      }
                    /> */}
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      value={item.DateOfRating}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "DateOfRating",
                          e.target.value,
                          "MostRecentRatingInformation"
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      value={item.ValidUpTo}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "ValidUpTo",
                          e.target.value,
                          "MostRecentRatingInformation"
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <br />
        <br />

        {/* Most recent grading information
 table */}

        <label>Choose number of rows: </label>
        <select
          onChange={(e) =>
            handleRowCountChangeRating(
              e,
              "MostRecentGradingInformation",
              setNumOfGrading,
              {
                GradingAgency: "",
                GradingScale: "",
                DateOfGrading: "",
                ValidUpTo: "",
              }
            )
          }
          value={numOfGrading}
        >
          {[...Array(4)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <table
          class="table table-light table-bordered border-primary"
          style={{ width: "100%" }}
        >
          <thead>
            <tr className="blue-row">
              <th>S. No.</th>
              <th colSpan={7}>Most recent grading information</th>
            </tr>

            <tr className="pink-row">
              <th></th>
              <th></th>
              <th>Grading agency</th>
              <th>Grading Scale</th>
              <th>Date of grading</th>
              <th>Valid up to (DD/MMM/YY)</th>
            </tr>
          </thead>
          <tbody>
            {formData.MostRecentGradingInformation.length &&
              formData.MostRecentGradingInformation.map((item, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>Grading</td>
                  <td>
                    <select
                      className="form-control"
                      value={item.GradingAgency}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "GradingAgency",
                          e.target.value,
                          "MostRecentGradingInformation"
                        )
                      }
                    >
                      <option value="">Select Grading</option>
                      <option value="ICRA">ICRA</option>
                      <option value="CARE">CARE</option>
                      <option value="Acuite">Acuite</option>
                      <option value="CRISIL">CRISIL</option>
                      <option value="M-CRIL">M-CRIL</option>
                      <option value="IRR">IRR</option>
                      <option value="IVR">IVR</option>
                    </select>
                    {/* <input
                      type="text"
                      class="form-control"
                      value={item.GradingAgency}
                      placeholder="g drop"
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "GradingAgency",
                          e.target.value,
                          "MostRecentGradingInformation"
                        )
                      }
                    /> */}
                  </td>
                  <td>
                    <select
                      className="form-control"
                      value={item.GradingScale}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "GradingScale",
                          e.target.value,
                          "MostRecentGradingInformation"
                        )
                      }
                    >
                      <option value="">Select Scale</option>
                      <option value="M1">M1</option>
                      <option value="M2">M2</option>
                      <option value="M3">M3</option>
                      <option value="M4">M4</option>
                      <option value="M5">M5</option>
                      <option value="M6">M6</option>
                      <option value="M7">M7</option>
                      <option value="M8">M8</option>
                    </select>
                    {/* <input
                      type="text"
                      class="form-control"
                      value={item.GradingScale}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "GradingScale",
                          e.target.value,
                          "MostRecentGradingInformation"
                        )
                      }
                    /> */}
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      value={item.DateOfGrading}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "DateOfGrading",
                          e.target.value,
                          "MostRecentGradingInformation"
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      value={item.ValidUpTo}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "ValidUpTo",
                          e.target.value,
                          "MostRecentGradingInformation"
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <br />
        <br />

        {/* most recent grading information coca grade */}
        {/*  table */}
        <label>Choose number of rows: </label>
        <select
          onChange={(e) =>
            handleRowCountChangeRating(
              e,
              "CodeOfConductAssessment",
              setNumOfConductA,
              {
                GradingAgency: "",
                CoCAGrade: "",
                DateOfGrading: "",
                ValidUpTo: "",
              }
            )
          }
          value={numOfConductA}
        >
          {[...Array(4)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <table
          class="table table-light table-bordered border-primary"
          style={{ width: "100%" }}
        >
          <thead>
            <tr className="blue-row">
              <th>S. No.</th>
              <th colSpan={7}>Most recent grading information</th>
            </tr>

            <tr className="pink-row">
              <th></th>
              <th></th>
              <th>Grading agency</th>
              <th>CoCA Grade</th>
              <th>Date of grading</th>
              <th>Valid up to (DD/MMM/YY)</th>
            </tr>
          </thead>
          <tbody>
            {formData.CodeOfConductAssessment.length &&
              formData.CodeOfConductAssessment.map((item, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>Grading</td>
                  <td>
                    <select
                      className="form-control"
                      value={item.GradingAgency}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "GradingAgency",
                          e.target.value,
                          "CodeOfConductAssessment"
                        )
                      }
                    >
                      <option value="">Select Agency</option>
                      <option value="ICRA">ICRA</option>
                      <option value="CARE">CARE</option>
                      <option value="Acuite">Acuite</option>
                      <option value="CRISIL">CRISIL</option>
                      <option value="M-CRIL">M-CRIL</option>
                      <option value="IRR">IRR</option>
                      <option value="IVR">IVR</option>
                    </select>
                    {/* <input
                      type="text"
                      class="form-control"
                      value={item.GradingAgency}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "GradingAgency",
                          e.target.value,
                          "CodeOfConductAssessment"
                        )
                      }
                    /> */}
                  </td>
                  <td>
                    <select
                      className="form-control"
                      value={item.CoCAGrade}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "CoCAGrade",
                          e.target.value,
                          "CodeOfConductAssessment"
                        )
                      }
                    >
                      <option value="">Select Grading</option>
                      <option value="C1">C1</option>
                      <option value="C2">C2</option>
                      <option value="C3">C3</option>
                      <option value="C4">C4</option>
                      <option value="C5">C5</option>
                      <option value="C6">C6</option>
                      <option value="C7">C7</option>
                      <option value="C8">C8</option>
                    </select>
                    {/* <input
                      type="text"
                      class="form-control"
                      value={item.CoCAGrade}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "CoCAGrade",
                          e.target.value,
                          "CodeOfConductAssessment"
                        )
                      }
                    /> */}
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      value={item.DateOfGrading}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "DateOfGrading",
                          e.target.value,
                          "CodeOfConductAssessment"
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      value={item.ValidUpTo}
                      onChange={(e) =>
                        handleInputChangeRating(
                          index,
                          "ValidUpTo",
                          e.target.value,
                          "CodeOfConductAssessment"
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <br />
        <br />
      </form>
    </div>
  );
}

export default Rating;
