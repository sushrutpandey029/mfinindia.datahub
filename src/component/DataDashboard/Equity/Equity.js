import "./Equity.css";
import { loadUserFormData } from "../utils/StorageHelper";
import React, { useState } from "react";

function Equity({
  formData,
  handleChange,
  handleNestedChange,
  handleRowCountChange,
  handleInputChange,
}) {
  // const [detailOfExistingNums, setDetailOfExistingNums] = useState(1);
  const [detailOfExistingNums, setDetailOfExistingNums] = useState(() => {
    const storedData = loadUserFormData();
    return storedData.ExistingEquityProviders
      ? storedData.ExistingEquityProviders.length
      : 1;
  });

  const [detailOfFreshNums, setDetailOfFreshNums] = useState(() => {
    const storedData = loadUserFormData();
    return storedData.equityreceivedExistingEquityProviders
      ? storedData.equityreceivedExistingEquityProviders.length
      : 1;
  });
  const [detailOfEquityNums, setDetailOfEquityNums] = useState(() => {
    const storedData = loadUserFormData();
    return storedData.equityboughtExistingEquityProviders
      ? storedData.equityboughtExistingEquityProviders.length
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
        <table
          class="table table-light table-bordered border-primary"
          style={{ width: "100%" }}
        >
          <tbody>
            {/* sub heading */}

            <tr class="blue-row">
              <td></td>
              <td style={{ backgroundColor: "#1f4a90" }}>
                {" "}
                As on 31 December 2024
              </td>
            </tr>
            <tr class="blue-row ">
              <td style={{ backgroundColor: "#fbe5fd", color: "black" }}>
                Shareholders' Funds
              </td>
              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "black",
                  backgroundColor: "#fbe5fd",
                }}
              >
                INR
              </td>
            </tr>
            <tr>
              <td>
                <label for="" class="form-label">
                  Share capital
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  
                  value={formData.ShareholdersFunds.ShareCapital || ""}
                  readOnly 
                  onChange={(e) =>
                    handleChange(
                      "ShareholdersFunds",
                      "ShareCapital",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Reserves and Surplus
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.ShareholdersFunds.ReservesAndSurplus || ""}
                  onChange={(e) =>
                    handleChange(
                      "ShareholdersFunds",
                      "ReservesAndSurplus",
                      e.target.value
                    )
                  }
                  readOnly 
                />
              </td>
            </tr>

            {/* <tr><td></td><td></td></tr> */}

            <tr>
              <td style={{ backgroundColor: "#fbe5fd", color: "black" }}>
                <label for="" class="form-label">
                  Share of equity (Rs)
                </label>
              </td>
              <td style={{ backgroundColor: "#fbe5fd", color: "black" }}>
                {/* here will be this: ShareOfEquity */}
                <b style={{ display: "flex", justifyContent: "center" }}>
                  {formData.ShareholdersFunds.ShareOfEquity || 0}
                </b>
              </td>
            </tr>

            <tr>
              <td style={{ backgroundColor: "#fbe5fd", color: "black" }}>
                <label for="" class="form-label">
                  Foreign (Total)
                </label>
              </td>
              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#fbe5fd",
                  color: "black",
                }}
              >
                {/* //ShareholdersFunds.Foreign.Total */}
                <b>{formData.ShareholdersFunds.Foreign.Total || 0}</b>
              </td>
            </tr>

            {/* sub heading */}
            <tr>
              <td>Foreign Direct Investment (FDI)</td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.ShareholdersFunds.Foreign.FDI || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "ShareholdersFunds.Foreign.FDI",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Foreign portfolio investment (FPI)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.ShareholdersFunds.Foreign.FPI || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "ShareholdersFunds.Foreign.FPI",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Foreign Institutional Investment (FII)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.ShareholdersFunds.Foreign.FII || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "ShareholdersFunds.Foreign.FII",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Foreign Promoter
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.ShareholdersFunds.Foreign.ForeignPromoter || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "ShareholdersFunds.Foreign.ForeignPromoter",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Others
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.ShareholdersFunds.Foreign.Others || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "ShareholdersFunds.Foreign.Others",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Domestic (Total)
                </label>
              </td>
              <td>
                {/* formData.ShareholdersFunds.Domestic.Total */}
                <b style={{ display: "flex", justifyContent: "center" }}>
                  {formData.ShareholdersFunds.Domestic.Total || 0}
                </b>
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Domestic Promoter
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.ShareholdersFunds.Domestic.DomesticPromoter || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "ShareholdersFunds.Domestic.DomesticPromoter",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Others
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.ShareholdersFunds.Domestic.Others || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "ShareholdersFunds.Domestic.Others",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            {/* sub heading */}

            {/* sub heading */}
            <br />
            <tr class="blue-row">
              <td style={{ backgroundColor: "#1f4a90" }}>
                Amount of fresh equity received during the Quarter (Rs)
              </td>
              <td>Q3 FY 24-25</td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Total
                </label>
              </td>
              <td>
                {/* FreshEquityReceived.Total */}
                <b style={{ display: "flex", justifyContent: "center" }}>{formData.FreshEquityReceived.Total || 0}</b>
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Foreign
                </label>
              </td>
              <td>
                {/* FreshEquityReceived.Foreign.Total */}
                <b style={{ display: "flex", justifyContent: "center" }}>{formData.FreshEquityReceived.Foreign.Total || 0}</b>
              </td>
            </tr>

            {/* sub heading */}
            <tr class="blue-r">
              <td>Foreign Direct Investment (FDI)</td>
              <td>
                {" "}
                <input
                  type="text"
                  class="form-control"
                  value={formData.FreshEquityReceived.Foreign.FDI || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "FreshEquityReceived.Foreign.FDI",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Foreign portfolio investment (FPI)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.FreshEquityReceived.Foreign.FPI || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "FreshEquityReceived.Foreign.FPI",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Foreign Institutional Investment (FII){" "}
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.FreshEquityReceived.Foreign.FII || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "FreshEquityReceived.Foreign.FII",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Promoter
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.FreshEquityReceived.Foreign.ForeignPromoter || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "FreshEquityReceived.Foreign.ForeignPromoter",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Others
                </label>
              </td>
              {/* this field is not in api */}
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.FreshEquityReceived.Foreign.Others || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "FreshEquityReceived.Foreign.Others",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            {/* sub heading */}
            <tr style={{ backgroundColor: "#f4a90" }}>
              <td>Domestic (Total)</td>
              <td>
                {/*here :  formData.FreshEquityReceived.Domestic.Total */}
                <b style={{ display: "flex", justifyContent: "center" }}>{formData.FreshEquityReceived.Domestic.Total || 0 }</b>
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Domestic Promoter
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.FreshEquityReceived.Domestic.DomesticPromoter || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "FreshEquityReceived.Domestic.DomesticPromoter",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Others
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.FreshEquityReceived.Domestic.Others || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "FreshEquityReceived.Domestic.Others",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* details of existing equity table */}
        <label>Choose number of rows : </label>
        {/* <select onChange={(e) => setDetailOfExistingNums(e.target.value)}>
          {[...Array(150)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select> */}
        <select
          onChange={(e) => {
            setDetailOfExistingNums(Number(e.target.value));
            handleRowCountChange(e, "ExistingEquityProviders");
          }}
          value={detailOfExistingNums}
        >
          {[...Array(150)].map((_, i) => (
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
              <th colSpan={3}>
                Details of existing equity (As on 31 December 2024)
              </th>
            </tr>
            <tr className="pink-row">
              <th>Equity provider</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {formData.ExistingEquityProviders.length > 0 &&
              formData.ExistingEquityProviders.map((provider, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      value={provider.Name}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "Name",
                          e.target.value,
                          "ExistingEquityProviders"
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      value={provider.Type}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "Type",
                          e.target.value,
                          "ExistingEquityProviders"
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      value={provider.AmountReported}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "AmountReported",
                          e.target.value,
                          "ExistingEquityProviders"
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
          </tbody>

          {/* <tbody>
            {Array.from({ length: detailOfExistingNums }).map((_, index) => (
              <tr key={index}>
                <td>
                  <input type="text" class="form-control" />
                </td>
                <td>
                  <input type="text" class="form-control" />
                </td>
                <td>
                  <input type="text" class="form-control" />
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>

        {/*  Details of fresh equity received during the quarter (1 Oct 2024
                - 31 Dec 2024) */}

        <label>Choose number of rows : </label>
        {/* <select onChange={(e) => setDetailOfFreshNums(e.target.value)}>
          {[...Array(150)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select> */}
        <select
          onChange={(e) => {
            setDetailOfFreshNums(Number(e.target.value));
            handleRowCountChange(e, "equityreceivedExistingEquityProviders");
          }}
          value={detailOfFreshNums}
        >
          {[...Array(150)].map((_, i) => (
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
              <th colSpan={3}>
                Details of fresh equity received during the quarter (1 Oct 2024
                - 31 Dec 2024)
              </th>
            </tr>
            <tr className="pink-row">
              <th>Equity provider</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {formData.equityreceivedExistingEquityProviders.length &&
              formData.equityreceivedExistingEquityProviders.map(
                (provider, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        value={provider.Name}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "Name",
                            e.target.value,
                            "equityreceivedExistingEquityProviders"
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        value={provider.Type}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "Type",
                            e.target.value,
                            "equityreceivedExistingEquityProviders"
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        value={provider.AmountReported}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "AmountReported",
                            e.target.value,
                            "equityreceivedExistingEquityProviders"
                          )
                        }
                      />
                    </td>
                  </tr>
                )
              )}
          </tbody>
          {/* <tbody>
            {Array.from({ length: detailOfFreshNums }).map((_, index) => (
              <tr key={index}>
                <td>
                  <input type="text" class="form-control" />
                </td>
                <td>
                  <input type="text" class="form-control" />
                </td>
                <td>
                  <input type="text" class="form-control" />
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>

        {/*  Details of equity bought back/redeemed during the quarter (1 Oct
                2024 - 31 Dec 2024) */}
        <label>Choose number of rows : </label>
        {/* <select onChange={(e) => setDetailOfEquityNums(e.target.value)}>
          {[...Array(150)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select> */}
        <select
          onChange={(e) => {
            setDetailOfEquityNums(Number(e.target.value));
            handleRowCountChange(e, "equityboughtExistingEquityProviders");
          }}
          value={detailOfEquityNums}
        >
          {[...Array(150)].map((_, i) => (
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
              <th colSpan={3}>
                Details of equity bought back/redeemed during the quarter (1 Oct
                2024 - 31 Dec 2024)
              </th>
            </tr>
            <tr className="pink-row">
              <th>Equity provider</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {formData.equityboughtExistingEquityProviders.length &&
              formData.equityboughtExistingEquityProviders.map(
                (provider, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        value={provider.Name}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "Name",
                            e.target.value,
                            "equityboughtExistingEquityProviders"
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        value={provider.Type}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "Type",
                            e.target.value,
                            "equityboughtExistingEquityProviders"
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        value={provider.AmountReported}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "AmountReported",
                            e.target.value,
                            "equityboughtExistingEquityProviders"
                          )
                        }
                      />
                    </td>
                  </tr>
                )
              )}
          </tbody>
          {/* <tbody>
            {Array.from({ length: detailOfEquityNums }).map((_, index) => (
              <tr key={index}>
                <td>
                  <input type="text" class="form-control" />
                </td>
                <td>
                  <input type="text" class="form-control" />
                </td>
                <td>
                  <input type="text" class="form-control" />
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </form>
    </div>
  );
}
export default Equity;
