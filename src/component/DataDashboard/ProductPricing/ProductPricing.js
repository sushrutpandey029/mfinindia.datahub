import React, { useState } from "react";

function ProductPricing({
  formData,
  handleRepeaterChange,
  handleMicroFinanceRowChange,
}) {
  const [numOfMicroFinanceLoans, setNumOfMicroFinanceLoans] = useState(
    formData.MicrofinanceLoansPP.length || 1
  );
  const [numOfNonMicroFinanceLoans, setNumOfNonMicroFinanceLoans] = useState(
    formData.NonMicrofinanceLoansPP.length || 1
  );
  const [numOfOnBalanceMP, setNumOfOnBalanceMP] = useState(
    formData.ManagedPortfolioPP.length || 1
  );
  const [numOfOffBalanceMP, setNumOfOffBalanceMP] = useState(
    formData.OffBalanceManagedPortfolioPP.length || 1
  );

  return (
    <div
      style={{
        width: "80%",
        backgroundColor: "fff",
        padding: "20px",
      }}
    >
      <form>
        {/* On-Balance Sheet (Microfinance Loans) table */}
        <label>Choose number of rows : </label>
        <select
          value={numOfMicroFinanceLoans}
          onChange={(e) => {
            setNumOfMicroFinanceLoans(Number(e.target.value));
            handleMicroFinanceRowChange(e, "MicrofinanceLoansPP", {
              SNo: "",
              ProductName: "",
              AmountOutstanding: "",
              InterestRates: "",
            });
          }}
        >
          {[...Array(400)].map((_, i) => (
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
              <th colSpan={2}>List of products offered</th>
              <th colSpan={2}>As on 31 December 2024</th>
            </tr>
            <tr className="blue-row">
              <th></th>
              <th></th>
              <th colSpan={2}>On-Balance Sheet (Microfinance Loans)</th>
            </tr>
            <tr className="pink-row">
              <th>S. No.</th>
              <th>Product Name</th>
              <th>Amount of portfolio outstanding (in INR)</th>
              <th>
                Interest Rates (%) (declining basis), (NOT including any other
                fees)
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numOfMicroFinanceLoans }).map((_, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData.MicrofinanceLoansPP[index].ProductName || ""
                    }
                    onChange={(e) =>
                      handleRepeaterChange(
                        "MicrofinanceLoansPP",
                        index,
                        "ProductName",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData.MicrofinanceLoansPP[index].AmountOutstanding ||
                      ""
                    }
                    onChange={(e) =>
                      handleRepeaterChange(
                        "MicrofinanceLoansPP",
                        index,
                        "AmountOutstanding",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData.MicrofinanceLoansPP[index].InterestRates || ""
                    }
                    onChange={(e) =>
                      handleRepeaterChange(
                        "MicrofinanceLoansPP",
                        index,
                        "InterestRates",
                        e.target.value
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>

          {/* <tbody>
            {Array.from({ length: numOfMicroFinanceLoans }).map((_, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      (formData.MicrofinanceLoansPP.ProductName &&
                        formData.MicrofinanceLoansPP[index].ProductName) ||
                      ""
                    }
                    onChange={(e) =>
                      handleRepeaterChange(
                        "MicrofinanceLoansPP",
                        index,
                        "ProductName",
                        e.target.value
                      )
                    }
                  />
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
        <br />
        <br />

        {/* On-Balance Sheet (Non Microfinance Loans) table */}
        <label>Choose number of rows : </label>
        <select
          value={numOfNonMicroFinanceLoans}
          onChange={(e) => {
            setNumOfNonMicroFinanceLoans(Number(e.target.value));
            handleMicroFinanceRowChange(e, "NonMicrofinanceLoansPP", {
              SNo: "",
              ProductName: "",
              AmountOutstanding: "",
              InterestRates: "",
            });
          }}
        >
          {[...Array(400)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        {/* <select onChange={(e) => setNumOfNonMicroFinanceLoans(e.target.value)}>
          {[...Array(400)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select> */}

        <table
          class="table table-light table-bordered border-primary"
          style={{ width: "100%" }}
        >
          <thead>
            <tr className="blue-row">
              <th colSpan={2}>List of products offered</th>
              <th colSpan={2}>As on 31 December 2024</th>
            </tr>
            <tr className="blue-row">
              <th></th>
              <th></th>
              <th colSpan={2}>On-Balance Sheet (Non-Microfinance Loans)</th>
            </tr>
            <tr className="pink-row">
              <th>S. No.</th>
              <th>Product Name</th>
              <th>Amount of portfolio outstanding (in INR)</th>
              <th>
                Interest Rates (%) (declining basis), (NOT including any other
                fees)
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numOfNonMicroFinanceLoans }).map(
              (_, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        formData.NonMicrofinanceLoansPP[index].ProductName || ""
                      }
                      onChange={(e) =>
                        handleRepeaterChange(
                          "NonMicrofinanceLoansPP",
                          index,
                          "ProductName",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        formData.NonMicrofinanceLoansPP[index]
                          .AmountOutstanding || ""
                      }
                      onChange={(e) =>
                        handleRepeaterChange(
                          "NonMicrofinanceLoansPP",
                          index,
                          "AmountOutstanding",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        formData.NonMicrofinanceLoansPP[index].InterestRates ||
                        ""
                      }
                      onChange={(e) =>
                        handleRepeaterChange(
                          "NonMicrofinanceLoansPP",
                          index,
                          "InterestRates",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
          {/* <tbody>
            {Array.from({ length: numOfNonMicroFinanceLoans }).map(
              (_, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
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
              )
            )}
          </tbody> */}
        </table>
        <br />
        <br />

        {/* On-Balance Sheet Managed portfolio	
 table */}
        <label>Choose number of rows : </label>
        <select
          value={numOfOffBalanceMP}
          onChange={(e) => {
            setNumOfOnBalanceMP(Number(e.target.value));
            handleMicroFinanceRowChange(e, "ManagedPortfolioPP", {
              SNo: "",
              ProductName: "",
              ProductType: "",
              AmountOutstanding: "",
              InterestRate: "",
            });
          }}
        >
          {[...Array(400)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        {/* <select onChange={(e) => setNumOfOnBalanceMP(e.target.value)}>
          {[...Array(400)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select> */}

        <table
          class="table table-light table-bordered border-primary"
          style={{ width: "100%" }}
        >
          <thead>
            <tr className="blue-row">
              <th colSpan={2}>List of products offered</th>
              <th colSpan={3}>As on 31 December 2024</th>
            </tr>
            <tr className="blue-row">
              <th></th>
              <th></th>
              <th colSpan={3}>On-Balance Sheet Managed portfolio</th>
            </tr>
            <tr className="pink-row">
              <th>S. No.</th>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Amount of portfolio outstanding (in INR)</th>
              <th>
                Interest Rates (%) (declining basis), (NOT including any other
                fees)
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numOfOnBalanceMP }).map((_, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.ManagedPortfolioPP[index].ProductName || ""}
                    onChange={(e) =>
                      handleRepeaterChange(
                        "ManagedPortfolioPP",
                        index,
                        "ProductName",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.ManagedPortfolioPP[index].ProductType || ""}
                    onChange={(e) =>
                      handleRepeaterChange(
                        "ManagedPortfolioPP",
                        index,
                        "ProductType",
                        e.target.value
                      )
                    }
                  />
                </td>
                
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData.ManagedPortfolioPP[index].AmountOutstanding || ""
                    }
                    onChange={(e) =>
                      handleRepeaterChange(
                        "ManagedPortfolioPP",
                        index,
                        "AmountOutstanding",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData.ManagedPortfolioPP[index].InterestRate || ""
                    }
                    onChange={(e) =>
                      handleRepeaterChange(
                        "ManagedPortfolioPP",
                        index,
                        "InterestRate",
                        e.target.value
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
          {/* <tbody>
            {Array.from({ length: numOfOnBalanceMP }).map((_, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>
                  <input type="text" class="form-control" />
                </td>
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
        <br />
        <br />

        {/*Off-Balance Sheet Managed portfolio table
         */}
        <label>Choose number of rows : </label>
        {/* <select onChange={(e) => setNumOfOffBalanceMP(e.target.value)}>
          {[...Array(400)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select> */}
        <select
          value={numOfOffBalanceMP}
          onChange={(e) => {
            setNumOfOffBalanceMP(Number(e.target.value));
            handleMicroFinanceRowChange(e, "OffBalanceManagedPortfolioPP", {
              SNo: "",
              ProductName: "",
              AmountOutstanding: "",
              InterestRate: "",
            });
          }}
        >
          {[...Array(400)].map((_, i) => (
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
              <th colSpan={2}>List of products offered</th>
              <th colSpan={2}>As on 31 December 2024</th>
            </tr>
            <tr className="blue-row">
              <th></th>
              <th></th>
              <th colSpan={2}>Off-Balance Sheet Managed portfolio</th>
            </tr>
            <tr className="pink-row">
              <th>S. No.</th>
              <th>Product Name</th>
              <th>Amount of portfolio outstanding (in INR)</th>
              <th>
                Interest Rates (%) (declining basis), (NOT including any other
                fees)
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numOfOffBalanceMP }).map((_, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.OffBalanceManagedPortfolioPP[index].ProductName || ""}
                    onChange={(e) =>
                      handleRepeaterChange(
                        "OffBalanceManagedPortfolioPP",
                        index,
                        "ProductName",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData.OffBalanceManagedPortfolioPP[index].AmountOutstanding || ""
                    }
                    onChange={(e) =>
                      handleRepeaterChange(
                        "OffBalanceManagedPortfolioPP",
                        index,
                        "AmountOutstanding",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData.OffBalanceManagedPortfolioPP[index].InterestRate || ""
                    }
                    onChange={(e) =>
                      handleRepeaterChange(
                        "OffBalanceManagedPortfolioPP",
                        index,
                        "InterestRate",
                        e.target.value
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
          {/* <tbody>
            {Array.from({ length: numOfOffBalanceMP }).map((_, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
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
        <br />
        <br />
      </form>
    </div>
  );
}

export default ProductPricing;

// import React from "react";

// const ProductPricing = () => {
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
//           {/* sub heading */}
//           <b style={{ float: "left" }}>List of products offered</b>
//           <br />

//           {/* sub heading */}
//           <b style={{ float: "left" }}>On-Balance Sheet (Microfinance Loans)</b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               S. No.
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Product Name
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Amount of portfolio outstanding (in INR)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Interest Rates (%) (declining basis), (NOT including any other
//               fees)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           {/* sub heading */}
//           <b style={{ float: "left" }}>
//             On-Balance Sheet (Non-Microfinance Loans)
//           </b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               S. No.
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Product Name
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Amount of portfolio outstanding (in INR)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Interest Rates (%) (declining basis), (NOT including any other
//               fees)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           {/* sub heading */}
//           <b style={{ float: "left" }}>On-Balance Sheet Managed portfolio</b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               S. No.
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Product Name
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Product Type
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Amount of portfolio outstanding (in INR)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Interest Rates (%) (declining basis), (NOT including any other
//               fees)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           {/* sub heading */}
//           <b style={{ float: "left" }}>Off-Balance Sheet Managed portfolio</b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               S. No.
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Product Name
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Amount of portfolio outstanding (in INR)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Interest Rates (%) (declining basis), (NOT including any other
//               fees)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//            {/* submit button */}
//            <div class="mb-3">
//             <button type="submit" class="btn btn-primary">
//               Submit
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductPricing;
