import React from "react";
import "./FinancialRatio.css";

function FinancialRatio({formData,handleChange,handleNestedChange}) {
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
          <thead>
            <tr className="blue-row">
              <th>S No</th>
              <th>Parameter</th>
              <th>Formula</th>
              <th>Q3 FY 24-25</th>
            </tr>

            <tr className="note">
              <th colSpan={3} >
                Note: Gross NPA, Net NPA and LCR are as on date ratios. Please
                refer to the below formulae for calculation of average assets,
                average GLP and average AUM.
              </th>
              <th >As on 31 December 2024</th>
            </tr>
          </thead>
          <tbody>
            {/* subheading */}
            <tr className="subheading">
              <td colSpan={4}>Operational efficiency</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Personnel Expense Ratio (PER), %</td>
              <td>Personnel expense to Average AUM</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.operational_efficiency.personnel_expense_ratio || ""}
                  onChange={(e) =>
                    handleChange("operational_efficiency","personnel_expense_ratio", e.target.value)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>Operating Expense Ratio (OER), %</td>
              <td>Operating expense to Average AUM</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.operational_efficiency.per || ""}
                  onChange={(e) =>
                    handleChange("operational_efficiency","per", e.target.value)
                  }
                />              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>Cost of funds (CoF), % (Annualized)</td>
              <td>
                All Cost incurred on the borrowings (like interest, processing
                fee, GST, bank charges etc.) / Average borrowings balance O/s
              </td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.operational_efficiency.cost_of_funds || ""}
                  onChange={(e) =>
                    handleChange("operational_efficiency","cost_of_funds", e.target.value)
                  }
                />              </td>
            </tr>

            <tr>
              <td>4</td>
              <td>Funding Cost Ratio (FCR), %</td>
              <td>
                Interest and fee expense on funding liability to Average GLP
              </td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.operational_efficiency.funding_cost_ratio || ""}
                  onChange={(e) =>
                    handleChange("operational_efficiency","funding_cost_ratio", e.target.value)
                  }
                />              </td>
            </tr>

            <tr>
              <td>5</td>
              <td>Cost/Borrower, Rs</td>
              <td>Operating expense to Average number of active clients</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.operational_efficiency.cost_per_borrower || ""}
                  onChange={(e) =>
                    handleChange("operational_efficiency","cost_per_borrower", e.target.value)
                  }
                />              </td>
            </tr>

            {/* subheading */}
            <tr className="subheading">
              <td colSpan={4}>Capital adequacy & liquidity</td>
            </tr>

            <tr>
              <td>6</td>
              <td>Liquidity Coverage Ratio (LCR), %</td>
              <td>
                Stock of high quality liquid asset to Total net cash flows over
                the next 30 calendar days
              </td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.capital_adequacy.liquidity_coverage_ratio || ""}
                  onChange={(e) =>
                    handleChange("capital_adequacy","liquidity_coverage_ratio", e.target.value)
                  }
                />    
              </td>
            </tr>

            <tr>
              <td>7</td>
              <td>Capital Adequacy, %</td>
              <td>Tier 1 CRAR % (as reported to RBI)</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.capital_adequacy.tier_1_crar || ""}
                  onChange={(e) =>
                    handleChange("capital_adequacy","tier_1_crar", e.target.value)
                  }
                />               </td>
            </tr>

            <tr>
              <td>8</td>
              <td>Capital Adequacy, %</td>
              <td>Tier 2 CRAR % (as reported to RBI)</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.capital_adequacy.tier_2_crar || ""}
                  onChange={(e) =>
                    handleChange("capital_adequacy","tier_2_crar", e.target.value)
                  }
                />               </td>
            </tr>

            {/* subheading */}
            <tr className="subheading">
              <td colSpan={4}>Profitability</td>
            </tr>

            <tr>
              <td>9</td>
              <td>Return on Asset (RoA), %</td>
              <td>(Net operating income - Taxes) to Average Asset</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.profitability.return_on_asset || ""}
                  onChange={(e) =>
                    handleChange("profitability","return_on_asset", e.target.value)
                  }
                />  
              </td>
            </tr>

            <tr>
              <td>10</td>
              <td>Return on Equity (RoE), %</td>
              <td>(Net operating income - Taxes) to Average Equity</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.profitability.return_on_equity || ""}
                  onChange={(e) =>
                    handleChange("profitability","return_on_equity", e.target.value)
                  }
                />                </td>
            </tr>

            <tr>
              <td>11</td>
              <td>Yield on portfolio, %</td>
              <td>Total interest earned on all loans to Average GLP</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.profitability.yield_on_portfolio || ""}
                  onChange={(e) =>
                    handleChange("profitability","yield_on_portfolio", e.target.value)
                  }
                />                </td>
            </tr>

            <tr>
              <td>12</td>
              <td>NIM %</td>
              <td>(Interest income – Interest expenses) / Average GLP</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.profitability.net_interest_margin || ""}
                  onChange={(e) =>
                    handleChange("profitability","net_interest_margin", e.target.value)
                  }
                />                </td>
            </tr>

            <tr>
              <td>13</td>
              <td>Operating Self-Sufficiency (OSS), %</td>
              <td>
                Operating income (interest income + processing fee + any other
                income) to total expenses (Financial expense + Loan loss
                provision + Operating expense)
              </td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.profitability.operating_self_sufficiency || ""}
                  onChange={(e) =>
                    handleChange("profitability","operating_self_sufficiency", e.target.value)
                  }
                />                </td>
            </tr>

            <tr>
              <td>14</td>
              <td>Other income to total income, %</td>
              <td>Total other income to Total income for the period</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.profitability.other_income_to_total_income || ""}
                  onChange={(e) =>
                    handleChange("profitability","other_income_to_total_income", e.target.value)
                  }
                />                </td>
            </tr>

            {/* subheading */}
            <tr className="subheading">
              <td colSpan={4}>Portfolio quality</td>
            </tr>

            <tr>
              <td>15</td>
              <td>Gross NPA, %</td>
              <td>Gross NPA to GLP</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.portfolio_quality.gross_npa || ""}
                  onChange={(e) =>
                    handleChange("portfolio_quality","gross_npa", e.target.value)
                  }
                />                </td>
            </tr>

            <tr>
              <td>16</td>
              <td>Net NPA, %</td>
              <td>Net NPA to GLP</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.portfolio_quality.net_npa || ""}
                  onChange={(e) =>
                    handleChange("portfolio_quality","net_npa", e.target.value)
                  }
                />                 </td>
            </tr>

            <tr>
              <td>17</td>
              <td>Loan Loss Reserve Ratio (LLR), %</td>
              <td>Loan loss reserve to GLP</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.portfolio_quality.loan_loss_reserve_ratio || ""}
                  onChange={(e) =>
                    handleChange("portfolio_quality","loan_loss_reserve_ratio", e.target.value)
                  }
                />                 </td>
            </tr>

            <tr>
              <td>18</td>
              <td>Write-off- Value, Rs</td>
              <td>Amount of portfolio written off during the period</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.portfolio_quality.write_off_value || ""}
                  onChange={(e) =>
                    handleChange("portfolio_quality","write_off_value", e.target.value)
                  }
                />                 </td>
            </tr>

            <tr>
              <td>19</td>
              <td>Write-off ratio, %</td>
              <td>Write-off to average GLP</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.portfolio_quality.write_off_ratio || ""}
                  onChange={(e) =>
                    handleChange("portfolio_quality","write_off_ratio", e.target.value)
                  }
                />                 </td>
            </tr>

             {/* subheading */}
             <tr className="subheading">
              <td colSpan={4}>Pricing of loans			
              </td>
            </tr>

            <tr>
              <td>20</td>
              <td>Wt. Avg. lending rate
              </td>
              <td>(Reducing RoI * Loan disbursed during the quarter Product 1 + Reducing ROI * Loan disbursed during the quarter Product 2 +…& So on)/Total loans disbursed during the quarter
              </td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.pricing_of_loans.weighted_avg_lending_rate || ""}
                  onChange={(e) =>
                    handleChange("pricing_of_loans","weighted_avg_lending_rate", e.target.value)
                  }
                /> 
              </td>
            </tr>

            <tr>
              <td>21</td>
              <td>Wt. Avg. processing fee
              </td>
              <td>Total processing fee charged on all loans /Total loan amount disbursed during the quarter
              </td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.pricing_of_loans.weighted_avg_processing_fee || ""}
                  onChange={(e) =>
                    handleChange("pricing_of_loans","weighted_avg_processing_fee", e.target.value)
                  }
                />               </td>
            </tr>


          </tbody>
        </table>
      </form>
    </div>
  );
}

export default FinancialRatio;

// import React from "react";

// const FinancialRatio = () => {
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
//           <b style={{ float: "left" }}>Operational efficiency</b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Personnel Expense Ratio (PER), %
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Operating Expense Ratio (OER), %
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Cost of funds (CoF), % (quarter)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Cost of funds (CoF), % (FY)
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Funding Cost Ratio (FCR), %
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Cost/Borrower, Rs
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           {/* sub heading */}
//           <b style={{ float: "left" }}>Capital adequacy & liquidity</b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Liquidity Coverage Ratio (LCR), %
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Capital Adequacy, %
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Capital Adequacy, %
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           {/* sub heading */}
//           <b style={{ float: "left" }}>Profitability</b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Return on Asset (RoA), %
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Return on Equity (RoE), %
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Yield on portfolio, %
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Operating Self-Sufficiency (OSS), %
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Other income to total income, %
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           {/* sub heading */}
//           <b style={{ float: "left" }}>Portfolio quality</b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Gross NPA, %
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Net NPA, %
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Loan Loss Reserve Ratio (LLR), %
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Write-off- Value, Rs
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Write-off ratio, %
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           {/* sub heading */}
//           <b style={{ float: "left" }}>Pricing of loans</b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Wt. Avg. lending rate
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               Wt. Avg. processing fee
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           {/* submit button */}
//           <div class="mb-3">
//             <button type="button" class="btn btn-success">submit</button>

//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FinancialRatio;
