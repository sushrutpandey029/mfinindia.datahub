import React, { useState } from "react";
import { loadUserFormData } from "../utils/StorageHelper";

function PricingForQuarter({
  formData,
  handleRepeaterChange,
  handleMicroFinanceRowChange,
}) {
  // const [numOfMicroFinance, setNumOfMicroFinance] = useState(1);
  const [numOfMicroFinance, setNumOfMicroFinance] = useState(
    formData.MicrofinanceLoans.length || 1
  );
  const [numOfNonMicroFinance, setNumOfNonMicroFinance] = useState(() => {
    const storedData = loadUserFormData();
    return storedData.NonMicrofinanceLoans
      ? storedData.NonMicrofinanceLoans.length
      : 1;
  });

  const [numOfOnBalanceMP, setNumOfOnBalanceMP] = useState(() => {
    const storedData = loadUserFormData();
    return storedData.ManagedPortfolio ? storedData.ManagedPortfolio.length : 1;
  });
  const [numOfOffBalanceMP, setNumOfOffBalanceMP] = useState(() => {
    const storedData = loadUserFormData();
    return storedData.OffBalanceManagedPortfolio
      ? storedData.OffBalanceManagedPortfolio.length
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
        {/* On-Balance Sheet (Microfinance Loans) table */}
        <label>Choose number of rows : </label>
        <select
          value={numOfMicroFinance}
          onChange={(e) => {
            setNumOfMicroFinance(Number(e.target.value));
            handleMicroFinanceRowChange(e, "MicrofinanceLoans", {
              SNo: "",
              ProductName: "",
              AmountDisbursed: "",
              NoOfAccounts: "",
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
              <th colSpan={3}>During the quarter Q3 FY 24-25</th>
            </tr>

            <tr className="blue-row">
              <th></th>
              <th></th>
              <th colSpan={3}>On-Balance Sheet (Microfinance Loans)</th>
            </tr>

            <tr className="pink-row">
              <th>S. No.</th>
              <th>Product Name</th>
              <th>Amount disbursed during the quarter (in INR)</th>
              <th>No. of accounts disbursed during the quarter</th>
              <th>
                Interest Rates (%) (declining basis), (NOT including any other
                fees)
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numOfMicroFinance }).map((_, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.MicrofinanceLoans[index].ProductName || ""}
                    onChange={(e) =>
                      handleRepeaterChange(
                        "MicrofinanceLoans",
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
                      formData.MicrofinanceLoans[index].AmountDisbursed || ""
                    }
                    onChange={(e) =>
                      handleRepeaterChange(
                        "MicrofinanceLoans",
                        index,
                        "AmountDisbursed",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.MicrofinanceLoans[index].NoOfAccounts || ""}
                    onChange={(e) =>
                      handleRepeaterChange(
                        "MicrofinanceLoans",
                        index,
                        "NoOfAccounts",
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
                      formData.MicrofinanceLoans[index].InterestRates || ""
                    }
                    onChange={(e) =>
                      handleRepeaterChange(
                        "MicrofinanceLoans",
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
            {Array.from({ length: numOfMicroFinance }).map((_, index) => (
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

        {/* On-Balance Sheet (Non-Microfinance Loans)		
 table */}

        <label>Choose number of rows : </label>
        <select
          value={numOfNonMicroFinance}
          onChange={(e) => {
            setNumOfNonMicroFinance(Number(e.target.value));
            handleMicroFinanceRowChange(e, "NonMicrofinanceLoans", {
              SNo: "",
              ProductName: "",
              AmountOutstanding: "",
              NoOfAccounts: "",
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
              <th colSpan={3}>During the quarter Q3 FY 24-25</th>
            </tr>

            <tr className="blue-row">
              <th></th>
              <th></th>
              <th colSpan={3}>On-Balance Sheet (Non-Microfinance Loans)</th>
            </tr>

            <tr className="pink-row">
              <th>S. No.</th>
              <th>Product Name</th>
              <th>Amount disbursed during the quarter (in INR)</th>
              <th>No. of accounts disbursed during the quarter</th>
              <th>
                Interest Rates (%) (declining basis), (NOT including any other
                fees)
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numOfNonMicroFinance }).map((_, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData.NonMicrofinanceLoans[index].ProductName || ""
                    }
                    onChange={(e) =>
                      handleRepeaterChange(
                        "NonMicrofinanceLoans",
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
                      formData.NonMicrofinanceLoans[index].AmountDisbursed || ""
                    }
                    onChange={(e) =>
                      handleRepeaterChange(
                        "NonMicrofinanceLoans",
                        index,
                        "AmountDisbursed",
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
                      formData.NonMicrofinanceLoans[index].NoOfAccounts || ""
                    }
                    onChange={(e) =>
                      handleRepeaterChange(
                        "NonMicrofinanceLoans",
                        index,
                        "NoOfAccounts",
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
                      formData.NonMicrofinanceLoans[index].InterestRate || ""
                    }
                    onChange={(e) =>
                      handleRepeaterChange(
                        "NonMicrofinanceLoans",
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
            {Array.from({ length: numOfNonMicroFinance }).map((_, index) => (
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

        {/* On-BS Managed portfolio table */}
        {/* <label>Choose number of rows : </label>
        <select onChange={(e) => setNumOfOnBalanceMP(e.target.value)}>
          {[...Array(400)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select> */}
        <label>Choose number of rows : </label>
        <select
          value={numOfOnBalanceMP}
          onChange={(e) => {
            setNumOfOnBalanceMP(Number(e.target.value));
            handleMicroFinanceRowChange(e, "ManagedPortfolio", {
              SNo: "",
              ProductName: "",
              AmountOutstanding: "",
              NoOfAccounts: "",
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
              <th colSpan={3}>During the quarter Q3 FY 24-25</th>
            </tr>

            <tr className="blue-row">
              <th></th>
              <th></th>
              <th colSpan={3}>On-BS Managed portfolio</th>
            </tr>

            <tr className="pink-row">
              <th>S. No.</th>
              <th>Product Name</th>
              <th>Amount disbursed during the quarter (in INR)</th>
              <th>No. of accounts disbursed during the quarter</th>
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
                    value={formData.ManagedPortfolio[index].ProductName || ""}
                    onChange={(e) =>
                      handleRepeaterChange(
                        "ManagedPortfolio",
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
                      formData.ManagedPortfolio[index].AmountDisbursed || ""
                    }
                    onChange={(e) =>
                      handleRepeaterChange(
                        "ManagedPortfolio",
                        index,
                        "AmountDisbursed",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.ManagedPortfolio[index].NoOfAccounts || ""}
                    onChange={(e) =>
                      handleRepeaterChange(
                        "ManagedPortfolio",
                        index,
                        "NoOfAccounts",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.ManagedPortfolio[index].InterestRate || ""}
                    onChange={(e) =>
                      handleRepeaterChange(
                        "ManagedPortfolio",
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

        {/* Off-BS Managed portfolio		 table */}
        {/* <label>Choose number of rows : </label>
        <select onChange={(e) => setNumOfOffBalanceMP(e.target.value)}>
          {[...Array(400)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select> */}
         <label>Choose number of rows : </label>
        <select
          value={numOfOffBalanceMP}
          onChange={(e) => {
            setNumOfOffBalanceMP(Number(e.target.value));
            handleMicroFinanceRowChange(e, "OffBalanceManagedPortfolio", {
              SNo: "",
              ProductName: "",
              AmountOutstanding: "",
              NoOfAccounts: "",
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
              <th colSpan={3}>During the quarter Q3 FY 24-25</th>
            </tr>

            <tr className="blue-row">
              <th></th>
              <th></th>
              <th colSpan={3}>Off-BS Managed portfolio</th>
            </tr>

            <tr className="pink-row">
              <th>S. No.</th>
              <th>Product Name</th>
              <th>Amount disbursed during the quarter (in INR)</th>
              <th>No. of accounts disbursed during the quarter</th>
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
                    value={formData.OffBalanceManagedPortfolio[index].ProductName || ""}
                    onChange={(e) =>
                      handleRepeaterChange(
                        "OffBalanceManagedPortfolio",
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
                      formData.OffBalanceManagedPortfolio[index].AmountOutstanding || ""
                    }
                    onChange={(e) =>
                      handleRepeaterChange(
                        "OffBalanceManagedPortfolio",
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
                    value={formData.OffBalanceManagedPortfolio[index].NoOfAccounts || ""}
                    onChange={(e) =>
                      handleRepeaterChange(
                        "OffBalanceManagedPortfolio",
                        index,
                        "NoOfAccounts",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.OffBalanceManagedPortfolio[index].InterestRate || ""}
                    onChange={(e) =>
                      handleRepeaterChange(
                        "OffBalanceManagedPortfolio",
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

export default PricingForQuarter;

// import React from "react";

// const PricingForQuarter = () => {
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
//           <b style={{ float: "left" }}>On-Balance Sheet (Microfinance Loans)</b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               On-Balance Sheet (Microfinance Loans)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

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
//               Amount disbursed during the quarter (in INR)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               No. of accounts disbursed during the quarter
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
//               On-Balance Sheet (Microfinance Loans)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

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
//               Amount disbursed during the quarter (in INR)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               No. of accounts disbursed during the quarter
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
//           <b style={{ float: "left" }}>On-BS Managed portfolio</b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               On-Balance Sheet (Microfinance Loans)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

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
//               Amount disbursed during the quarter (in INR)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               No. of accounts disbursed during the quarter
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
//           <b style={{ float: "left" }}>Off-BS Managed portfolio</b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               On-Balance Sheet (Microfinance Loans)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

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
//               Amount disbursed during the quarter (in INR)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               No. of accounts disbursed during the quarter
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

// export default PricingForQuarter;
