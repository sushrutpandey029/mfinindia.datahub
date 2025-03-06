import React from "react";
import "./ALM.css";

function ALM({ formData, handleChange ,handleNestedChange}) {
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
          <thead>
            <tr className="blue-row">
              <th>A</th>
              <th>Indicators - Liquidity position</th>
              <th>Remarks/ guidance to fill</th>
              <th colSpan={6}>
                Maturity buckets (months) In Rupees - As on 31 December 2024
              </th>
            </tr>
            <tr className="blue-row">
              <th></th>
              <th></th>
              <th>0</th>
              <th>{"<1"}</th>
              <th>{"1 to <3"}</th>
              <th>{"3 to <6"}</th>
              <th>{"6 to <12"}</th>
              <th>{">12"}</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <b>Assets</b>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>1.1</td>
              <td>Cash & bank balances</td>
              <td>
                Include cash, other bank deposits (savings/current account, FDs
                etc.)
              </td>
              <td>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.assets.cash_bank_balances["<1"] || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.cash_bank_balances.<1", e.target.value)
                  }
                />
              </td>
              <td>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.assets.cash_bank_balances["1_to_3"] || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.cash_bank_balances.1_to_3", e.target.value)
                  }
                />
              </td>
              <td>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.assets.cash_bank_balances["3_to_6"] || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.cash_bank_balances.3_to_6", e.target.value)
                  }
                />
              </td>
              <td>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.assets.cash_bank_balances["6_to_12"] || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.cash_bank_balances.6_to_12", e.target.value)
                  }
                />
              </td>
              <td>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.assets.cash_bank_balances.over_12 || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.cash_bank_balances.over_12", e.target.value)
                  }
                />
              </td>
              <td>0.0</td>
            </tr>

            <tr>
              <td>1.2</td>
              <td>Cash collateral</td>
              <td>
                Security deposits against loans - would have maturity similar to
                that of external loans
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.cash_collateral["<1"] || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.cash_collateral.<1", e.target.value)
                  }
                />
              </td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.assets.cash_collateral["1_to_3"] || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.cash_collateral.1_to_3", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.cash_collateral["3_to_6"] || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.cash_collateral.3_to_6", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.cash_collateral["6_to_12"] || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.cash_collateral.6_to_12", e.target.value)
                  }
                />
              </td>
             
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.cash_collateral.over_12 || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.cash_collateral.over_12", e.target.value)
                  }
                />
              </td>
              <td>0.0</td>
            </tr>

            <tr>
              <td>1.3</td>
              <td>Investments</td>
              <td>In equity, mutual funds etc.</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.assets.investments["<1"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.investments.<1", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.investments["1_to_3"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.investments.1_to_3", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.investments["3_to_6"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.investments.3_to_6", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.investments["6_to_12"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.investments.6_to_12", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.investments.over_12  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.investments.over_12", e.target.value)
                  }
                />
              </td>
              <td>0.0</td>
            </tr>

            <tr>
              <td>1.4</td>
              <td>On-balance sheet loan portfolio</td>
              <td>
                Principal amount of loans to clients maturing in various buckets
              </td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.assets.on_balance_sheet_loan_portfolio["<1"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.on_balance_sheet_loan_portfolio.<1", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.on_balance_sheet_loan_portfolio["1_to_3"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.on_balance_sheet_loan_portfolio.1_to_3", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.on_balance_sheet_loan_portfolio["3_to_6"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.on_balance_sheet_loan_portfolio.3_to_6", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.on_balance_sheet_loan_portfolio["6_to_12"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.on_balance_sheet_loan_portfolio.6_to_12", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.on_balance_sheet_loan_portfolio.over_12  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.on_balance_sheet_loan_portfolio.over_12", e.target.value)
                  }
                />
              </td>
              <td>0.0</td>
            </tr>

            <tr>
              <td>1.5</td>
              <td>Interest on loan portfolio</td>
              <td>
                Interest amount of loans to clients maturing in various buckets
              </td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.assets.interest_on_loan_portfolio["<1"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.interest_on_loan_portfolio.<1", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.interest_on_loan_portfolio["1_to_3"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.interest_on_loan_portfolio.1_to_3", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.interest_on_loan_portfolio["3_to_6"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.interest_on_loan_portfolio.3_to_6", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.interest_on_loan_portfolio["6_to_12"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.interest_on_loan_portfolio.6_to_12", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.interest_on_loan_portfolio.over_12  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.interest_on_loan_portfolio.over_12", e.target.value)
                  }
                />
              </td>
              <td>0.0</td>
            </tr>

            <tr>
              <td>1.6</td>
              <td>Fixed assets</td>
              <td>
                Total fixed assets of the MFI - would fall under the{" >"}12
                month category
              </td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.assets.fixed_assets["<1"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.fixed_assets.<1", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.fixed_assets["1_to_3"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.fixed_assets.1_to_3", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.fixed_assets["3_to_6"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.fixed_assets.3_to_6", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.fixed_assets["6_to_12"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.fixed_assets.6_to_12", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.fixed_assets.over_12  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.fixed_assets.over_12", e.target.value)
                  }
                />
              </td>
              <td>0.0</td>
            </tr>

            <tr>
              <td>1.7</td>
              <td>Other assets</td>
              <td>Includes other accounts receivable</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.assets.other_assets["<1"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.other_assets.<1", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.other_assets["1_to_3"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.other_assets.1_to_3", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.other_assets["3_to_6"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.other_assets.3_to_6", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.other_assets["6_to_12"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.other_assets.6_to_12", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.assets.other_assets.over_12  || ""}
                  onChange={(e) =>
                    handleNestedChange("assets.other_assets.over_12", e.target.value)
                  }
                />
              </td>
              <td>0.0</td>
            </tr>

            <tr className="pink-row">
              <td></td>
              <td>
                <b>Total assets</b>
              </td>
              <td></td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
            </tr>

            <tr className="pink-row">
              <td>2</td>
              <td>
                <b>Liabilities</b>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>2.1</td>
              <td>Loan repayable</td>
              <td>Principal amount of loans repayable to lenders</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.loan_repayable["<1"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.loan_repayable.<1", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.loan_repayable["1_to_3"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.loan_repayable.1_to_3", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.loan_repayable["3_to_6"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.loan_repayable.3_to_6", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.loan_repayable["6_to_12"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.loan_repayable.6_to_12", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.loan_repayable.over_12  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.loan_repayable.over_12", e.target.value)
                  }
                />
              </td>
              <td>0.0</td>
            </tr>

            <tr>
              <td>2.2</td>
              <td>Interest payable</td>
              <td>Interest payable on loans from lenders</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.interest_payable["<1"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.interest_payable.<1", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.interest_payable["1_to_3"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.interest_payable.1_to_3", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.interest_payable["3_to_6"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.interest_payable.3_to_6", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.interest_payable["6_to_12"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.interest_payable.6_to_12", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.interest_payable.over_12  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.interest_payable.over_12", e.target.value)
                  }
                />
              </td>
              <td>0.0</td>
            </tr>

            <tr>
              <td>2.3</td>
              <td>Operational expenses payable</td>
              <td>
                Staff salaries, rent, travel, communication and other fixed
                expenses payable
              </td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.operational_expenses_payable["<1"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.operational_expenses_payable.<1", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.operational_expenses_payable["1_to_3"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.operational_expenses_payable.1_to_3", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.operational_expenses_payable["3_to_6"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.operational_expenses_payable.3_to_6", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.operational_expenses_payable["6_to_12"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.operational_expenses_payable.6_to_12", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.operational_expenses_payable.over_12  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.operational_expenses_payable.over_12", e.target.value)
                  }
                />
              </td>
              <td>0.0</td>
            </tr>

            <tr>
              <td>2.4</td>
              <td>Other liabilities</td>
              <td>Includes other accounts payable</td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.other_liabilities["<1"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.other_liabilities.<1", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.other_liabilities["1_to_3"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.other_liabilities.1_to_3", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.other_liabilities["3_to_6"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.other_liabilities.3_to_6", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.other_liabilities["6_to_12"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.other_liabilities.6_to_12", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.liabilities.other_liabilities.over_12  || ""}
                  onChange={(e) =>
                    handleNestedChange("liabilities.other_liabilities.over_12", e.target.value)
                  }
                />
              </td>
              <td>0.0</td>
            </tr>

            <tr className="pink-row">
              <td></td>
              <td>
                <b>Total liabilities</b>
              </td>
              <td></td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
            </tr>

            <tr>
              <td>3</td>
              <td>
                <b>Total equity</b>
              </td>
              <td>
                Shareholder's equity + accumulated surplus - would fall under
                {" >"}12 month category
              </td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.total_equity["<1"] || ""}
                  onChange={(e) =>
                    handleChange("total_equity", "<1", e.target.value)
                  }
                />
              </td>
              <td>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.total_equity["1_to_3"] || ""}
                  onChange={(e) =>
                    handleChange("total_equity", "1_to_3", e.target.value)
                  }
                />
              </td>
              <td>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.total_equity["3_to_6"] || ""}
                  onChange={(e) =>
                    handleChange("total_equity", "3_to_6", e.target.value)
                  }
                />
              </td>
              <td>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.total_equity["6_to_12"] || ""}
                  onChange={(e) =>
                    handleChange("total_equity", "6_to_12", e.target.value)
                  }
                />
              </td>
              <td>
                 <input
                  type="text"
                  class="form-control"
                  value={formData.total_equity["over_12"] || ""}
                  onChange={(e) =>
                    handleChange("total_equity", "over_12", e.target.value)
                  }
                />
              </td>
              <td>0.0</td>
            </tr>

            <tr className="pink-row">
              <td>4</td>
              <td>
                <b>Total liabilities & equity</b> 
              </td>
              {/* implement logic */}
              <td></td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
            </tr>

            <tr className="pink-row">
              <td>5</td>
              <td>
                <b>Asset – (Total Liability + Equity) Gap</b>
              </td>
               {/* implement logic */}
              <td></td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
            </tr>

            {/* B section */}
            <tr className="blue-row">
              <td>B</td>
              <td>
                <b>Funding requirements</b>
              </td>
              <td></td>
              <td>{"<1"}</td>
              <td>{"1 to <3"}</td>
              <td>{"3 to <6"}</td>
              <td>{"6 to <12"}</td>
              <td>{">12"}</td>
              <td>Total</td>
            </tr>

            <tr>
              <td></td>
              <td>Loan disbursements</td>
              <td>
                Disbursement targets as per the MFI's business plan, in each
                bucket
              </td>
              <td>
              <input
                  type="text"
                  class="form-control"
                  value={formData.funding_requirements.loan_disbursements["<1"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("funding_requirements.loan_disbursements.<1", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.funding_requirements.loan_disbursements["1_to_3"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("funding_requirements.loan_disbursements.1_to_3", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.funding_requirements.loan_disbursements["3_to_6"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("funding_requirements.loan_disbursements.3_to_6", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.funding_requirements.loan_disbursements["6_to_12"]  || ""}
                  onChange={(e) =>
                    handleNestedChange("funding_requirements.loan_disbursements.6_to_12", e.target.value)
                  }
                />
              </td>
              <td>
               <input
                  type="text"
                  class="form-control"
                  value={formData.funding_requirements.loan_disbursements.over_12  || ""}
                  onChange={(e) =>
                    handleNestedChange("funding_requirements.loan_disbursements.over_12", e.target.value)
                  }
                />
              </td>
              <td>0.0</td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default ALM;

// import React from "react";

// const ALM = () => {
//   return (
//     <div
//       style={{
//         width: "80%",
//         backgroundColor: "#fff",
//         padding: "60px",
//       }}
//     >
//       <form>
//         <div>
//           <b style={{ float: "left" }}> 1:Aseets</b>
//           <br />
//           {/* sub heading */}
//           <b style={{ float: "left" }}>{/* (total) : 0 */}</b>
//           <br />
//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               1:1Cash & bank balances
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               1:2 Cash collateral
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               1:3 Investments
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               1:4 On-balance sheet loan portfolio
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               1:5 Interest on loan portfolio
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               1:6 Fixed assets
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left" }}
//             >
//               1:7 Other assets
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           {/* sub heading */}
//           <b style={{ float: "left" }}> Total Assets : 0</b>
//           <br />
//           <br></br>
//           <b style={{ float: "left" }}> 2:Liabilities</b>
//           <br />
//           {/* sub heading */}
//           <b style={{ float: "left" }}>{/* (total) : 0 */}</b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left", marginTop: "10px" }}
//             >
//               2:1Loan repayable
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left", marginTop: "10px" }}
//             >
//               2:2 Interest payable
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left", marginTop: "10px" }}
//             >
//               2:3 Operational expenses payable
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left", marginTop: "10px" }}
//             >
//               2:3 Other liabilities
//             </label>
//             <input type="text" class="form-control" />
//           </div>

//           <b style={{ float: "left" }}> Total liabilities: 0</b>
//           <br />

//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left", marginTop: "10px" }}
//             >
//               3 Total equity
//             </label>
//             <input type="text" class="form-control" />
//           </div>
//           <b style={{float: "left" }}>4.Total liabilities & equity: 0</b>
//           <br></br>

//           <br></br>
//           <b style={{ float: "left" }}>
//             5.Asset – (Total Liability + Equity) Gap:0
//           </b>

//           <br></br>
//           <b style={{ float: "left" }}> Funding requirements</b>
//           <br></br>
//           <br></br>
//           <div class="mb-3">
//             <label
//               for="formGroupExampleInput"
//               class="form-label"
//               style={{ float: "left", marginTop: "10px" }}
//             >
//               3 Loan disbursements
//             </label>
//             <input type="text" class="form-control" />
//           </div>
//           {/* submit button */}
//           <div class="mb-3">
//             <button
//               type="submit"
//               class="btn btn-primary"
//               style={{ marginTop: "10px" }}
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };
// export default ALM;
