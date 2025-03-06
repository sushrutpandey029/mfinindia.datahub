import React from "react";
import "./Borrowing.css";

function Borrowing({ formData, handleChange, handleNestedChange,handleArrayChange }) {
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
              <th>Total outstanding borrowings </th>
              <th>AIFIs</th>
              <th>Banks</th>
              <th>Non Bank Entities</th>
              <th>External commercial borrowing</th>
              <th>Others</th>
              <th>Specify others (if any)</th>
            </tr>

            <tr className="blue-row">
              <th>(In INR)</th>
              <th>As on 31 December 2024</th>
              <th>As on 31 December 2024</th>
              <th>As on 31 December 2024</th>
              <th>As on 31 December 2024</th>
              <th>As on 31 December 2024</th>
              <th>As on 31 December 2024</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Term loan</td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.TotalOutstandingBorrowing.AIFI.TermLoan || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.AIFI.TermLoan",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.TotalOutstandingBorrowing.Bank.TermLoan || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.Bank.TermLoan",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.NonBankEntity.TermLoan ||
                    ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.NonBankEntity.TermLoan",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.ExternalCBorrowing
                      .TermLoan || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.ExternalCBorrowing.TermLoan",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.Others.TermLoan || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.Others.TermLoan",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.SpecifyOther.TermLoan ||
                    ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.SpecifyOther.TermLoan",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>Debentures</td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.AIFI.Debentures || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.AIFI.Debentures",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.Bank.Debentures || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.Bank.Debentures",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.NonBankEntity
                      .Debentures || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.NonBankEntity.Debentures",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.ExternalCBorrowing
                      .Debentures || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.ExternalCBorrowing.Debentures",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.Others.Debentures || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.Others.Debentures",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.SpecifyOther
                      .Debentures || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.SpecifyOther.Debentures",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>Subordinated Debt</td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.AIFI.SubordinatedDebt ||
                    ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.AIFI.SubordinatedDebt",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.Bank.SubordinatedDebt ||
                    ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.Bank.SubordinatedDebt",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.NonBankEntity
                      .SubordinatedDebt || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.NonBankEntity.SubordinatedDebt",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.ExternalCBorrowing
                      .SubordinatedDebt || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.ExternalCBorrowing.SubordinatedDebt",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.Others
                      .SubordinatedDebt || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.Others.SubordinatedDebt",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.SpecifyOther
                      .SubordinatedDebt || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.SpecifyOther.SubordinatedDebt",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>Commercial Papers</td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.AIFI.CommercialPaper ||
                    ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.AIFI.CommercialPaper",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.Bank.CommercialPaper ||
                    ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.Bank.CommercialPaper",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.NonBankEntity
                      .CommercialPaper || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.NonBankEntity.CommercialPaper",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.ExternalCBorrowing
                      .CommercialPaper || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.ExternalCBorrowing.CommercialPaper",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.Others.CommercialPaper ||
                    ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.Others.CommercialPaper",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.SpecifyOther
                      .CommercialPaper || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.SpecifyOther.CommercialPaper",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>Any other (specify)</td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.TotalOutstandingBorrowing.AIFI.AnyOther || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.AIFI.AnyOther",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.TotalOutstandingBorrowing.Bank.AnyOther || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.Bank.AnyOther",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.NonBankEntity.AnyOther ||
                    ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.NonBankEntity.AnyOther",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.ExternalCBorrowing
                      .AnyOther || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.ExternalCBorrowing.AnyOther",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.Others.AnyOther || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.Others.AnyOther",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalOutstandingBorrowing.SpecifyOther.AnyOther ||
                    ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalOutstandingBorrowing.SpecifyOther.AnyOther",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr className="pink-row">
              <td>Total</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <br />
        <p>
          Note: All India Financial Institutions (AIFIs) include EXIM Bank,
          NABARD, NHB and SIDBI/MUDRA and other similar institutions (Master
          Direction DBR.FID.No.108/01.02.000/2015-16)
        </p>
        <br />
        <br />

        <table
          class="table table-light table-bordered border-primary"
          style={{ width: "100%" }}
        >
          <thead>
            <tr className="blue-row">
              <th>Break-up of borrowing outstanding</th>
              <th>Name of AIFI</th>
              <th>
                Total outstanding borrowing (in INR) As on 31 December 2024
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>SIDBI</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={
                    formData.BreakUpOfBorrowingOutstanding &&
                    formData.BreakUpOfBorrowingOutstanding[0] &&
                    formData.BreakUpOfBorrowingOutstanding[0]["SIDBI"]
                      ? formData.BreakUpOfBorrowingOutstanding[0]["SIDBI"]
                      : ""
                  }
                  onChange={(e) =>
                    handleArrayChange(
                      "BreakUpOfBorrowingOutstanding",
                      0,
                      "SIDBI",
                      e.target.value
                    )
                  }
                />
              </td>

              {/* <td>
                <input
                  type="text"
                  class="form-control"
                   value={
                    formData.BreakUpOfBorrowingOutstanding.length > 0
                      ? formData.BreakUpOfBorrowingOutstanding[0]["SIDBI"] || ""
                      : ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "BreakUpOfBorrowingOutstanding",
                      "SIDBI",
                      e.target.value
                    )
                  }
                />
                
              </td> */}
            </tr>

            <tr>
              <td>2</td>
              <td>NABARD</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={
                    formData.BreakUpOfBorrowingOutstanding &&
                    formData.BreakUpOfBorrowingOutstanding[0] &&
                    formData.BreakUpOfBorrowingOutstanding[0]["NABARD"]
                      ? formData.BreakUpOfBorrowingOutstanding[0]["NABARD"]
                      : ""
                  }
                  onChange={(e) =>
                    handleArrayChange(
                      "BreakUpOfBorrowingOutstanding",
                      0,
                      "NABARD",
                      e.target.value
                    )
                  }
                />
              </td>
              {/* <td>
                <input
                  type="text"
                  class="form-control"
                  // value={formData.BreakUpOfBorrowingOutstanding.NABARD || ""}
                  value={
                    formData.BreakUpOfBorrowingOutstanding.length > 0
                      ? formData.BreakUpOfBorrowingOutstanding[0]["NABARD"] ||
                        ""
                      : ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "BreakUpOfBorrowingOutstanding",
                      "NABARD",
                      e.target.value
                    )
                  }
                />
              </td> */}
            </tr>

            <tr>
              <td>3</td>
              <td>MUDRA</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={
                    formData.BreakUpOfBorrowingOutstanding &&
                    formData.BreakUpOfBorrowingOutstanding[0] &&
                    formData.BreakUpOfBorrowingOutstanding[0]["MUDRA"]
                      ? formData.BreakUpOfBorrowingOutstanding[0]["MUDRA"]
                      : ""
                  }
                  onChange={(e) =>
                    handleArrayChange(
                      "BreakUpOfBorrowingOutstanding",
                      0,
                      "MUDRA",
                      e.target.value
                    )
                  }
                />
              </td>
              {/* <td>
                <input
                  type="text"
                  class="form-control"
                  // value={formData.BreakUpOfBorrowingOutstanding.MUDRA || ""}
                  value={
                    formData.BreakUpOfBorrowingOutstanding.length > 0
                      ? formData.BreakUpOfBorrowingOutstanding[0]["MUDRA"] || ""
                      : ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "BreakUpOfBorrowingOutstanding",
                      "MUDRA",
                      e.target.value
                    )
                  }
                />
              </td> */}
            </tr>

            <tr>
              <td>4</td>
              <td>NHB</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={
                    formData.BreakUpOfBorrowingOutstanding &&
                    formData.BreakUpOfBorrowingOutstanding[0] &&
                    formData.BreakUpOfBorrowingOutstanding[0]["NHB"]
                      ? formData.BreakUpOfBorrowingOutstanding[0]["NHB"]
                      : ""
                  }
                  onChange={(e) =>
                    handleArrayChange(
                      "BreakUpOfBorrowingOutstanding",
                      0,
                      "NHB",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* table borrowngs obtainer */}
        <table
          class="table table-light table-bordered border-primary"
          style={{ width: "100%" }}
        >
          <thead>
            <tr className="grey-row">
              <th>Total borrowings obtained</th>
              <th>AIFIs</th>
              <th>Banks</th>
              <th>Non Bank Entities</th>
              <th>External commercial borrowing</th>
              <th>Others/Individuals</th>
              <th>Specify others (if any)</th>
            </tr>

            <tr className="grey-row">
              <th>(In INR)</th>
              <th>1 Oct 2024 - 31 Dec 2024</th>
              <th>1 Oct 2024 - 31 Dec 2024</th>
              <th>1 Oct 2024 - 31 Dec 2024</th>
              <th>1 Oct 2024 - 31 Dec 2024</th>
              <th>1 Oct 2024 - 31 Dec 2024</th>
              <th>1 Oct 2024 - 31 Dec 2024</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Term loan</td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.TotalBorrowingObtained.AIFI.TermLoan || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.AIFI.TermLoan",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.TotalBorrowingObtained.Bank.TermLoan || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.Bank.TermLoan",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.NonBankEntity.TermLoan || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.NonBankEntity.TermLoan",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.ExternalCBorrowing
                      .TermLoan || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.ExternalCBorrowing.TermLoan",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.TotalBorrowingObtained.Others.TermLoan || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.Others.TermLoan",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.SpecifyOther.TermLoan || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.SpecifyOther.TermLoan",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>Debentures</td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.TotalBorrowingObtained.AIFI.Debentures || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.AIFI.Debentures",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.TotalBorrowingObtained.Bank.Debentures || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.Bank.Debentures",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.NonBankEntity.Debentures ||
                    ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.NonBankEntity.Debentures",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.ExternalCBorrowing
                      .Debentures || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.ExternalCBorrowing.Debentures",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.Others.Debentures || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.Others.Debentures",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.SpecifyOther.Debentures ||
                    ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.SpecifyOther.Debentures",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>Subordinated Debt</td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.AIFI.SubordinatedDebt || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.AIFI.SubordinatedDebt",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.Bank.SubordinatedDebt || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.Bank.SubordinatedDebt",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.NonBankEntity
                      .SubordinatedDebt || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.NonBankEntity.SubordinatedDebt",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.ExternalCBorrowing
                      .SubordinatedDebt || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.ExternalCBorrowing.SubordinatedDebt",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.Others.SubordinatedDebt ||
                    ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.Others.SubordinatedDebt",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.SpecifyOther
                      .SubordinatedDebt || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.SpecifyOther.SubordinatedDebt",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>Commercial Papers</td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.AIFI.CommercialPaper || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.AIFI.CommercialPaper",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.Bank.CommercialPaper || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.Bank.CommercialPaper",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.NonBankEntity
                      .CommercialPaper || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.NonBankEntity.CommercialPaper",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.ExternalCBorrowing
                      .CommercialPaper || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.ExternalCBorrowing.CommercialPaper",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.Others.CommercialPaper || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.Others.CommercialPaper",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.SpecifyOther
                      .CommercialPaper || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.SpecifyOther.CommercialPaper",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>Any other (specify)</td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.TotalBorrowingObtained.AIFI.AnyOther || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.AIFI.AnyOther",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.TotalBorrowingObtained.Bank.AnyOther || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.Bank.AnyOther",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.NonBankEntity.AnyOther || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.NonBankEntity.AnyOther",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.ExternalCBorrowing
                      .AnyOther || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.ExternalCBorrowing.AnyOther",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.TotalBorrowingObtained.Others.AnyOther || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.Others.AnyOther",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.TotalBorrowingObtained.SpecifyOther.AnyOther || ""
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      "TotalBorrowingObtained.SpecifyOther.AnyOther",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr className="pink-row">
              <td>Total</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <br></br>

        {/* breakup of borrowing obtained */}
        <table
          class="table table-light table-bordered border-primary"
          style={{ width: "100%" }}
        >
          <thead>
            <tr className="grey-row">
              <th>Break-up of borrowings obtained</th>
              <th>Name of AIFI</th>
              <th>"Total borrowing from1 Oct 2024 - 31 Dec 2024"</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>SIDBI</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={
                    formData.BreakUpOfBorrowingObtained &&
                    formData.BreakUpOfBorrowingObtained[0] &&
                    formData.BreakUpOfBorrowingObtained[0]["SIDBI"]
                      ? formData.BreakUpOfBorrowingObtained[0]["SIDBI"]
                      : ""
                  }
                  onChange={(e) =>
                    handleArrayChange(
                      "BreakUpOfBorrowingObtained",
                      0,
                      "SIDBI",
                      e.target.value
                    )
                  }
                />
              </td>
              {/* <td>
                <input
                  type="text"
                  class="form-control"
                  // value={formData.BreakUpOfBorrowingObtained.SIDBI || ""}
                  value={
                    formData.BreakUpOfBorrowingObtained.length > 0
                      ? formData.BreakUpOfBorrowingObtained[0]["SIDBI"] || ""
                      : ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "BreakUpOfBorrowingObtained",
                      "SIDBI",
                      e.target.value
                    )
                  }
                />
              </td> */}
            </tr>
            <tr>
              <td>2</td>
              <td>NABARD</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={
                    formData.BreakUpOfBorrowingObtained &&
                    formData.BreakUpOfBorrowingObtained[0] &&
                    formData.BreakUpOfBorrowingObtained[0]["NABARD"]
                      ? formData.BreakUpOfBorrowingObtained[0]["NABARD"]
                      : ""
                  }
                  onChange={(e) =>
                    handleArrayChange(
                      "BreakUpOfBorrowingObtained",
                      0,
                      "NABARD",
                      e.target.value
                    )
                  }
                />
              </td>
              {/* <td>
                <input
                  type="text"
                  class="form-control"
                  // value={formData.BreakUpOfBorrowingObtained.NABARD || ""}
                  value={
                    formData.BreakUpOfBorrowingObtained.length > 0
                      ? formData.BreakUpOfBorrowingObtained[0]["NABARD"] || ""
                      : ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "BreakUpOfBorrowingObtained",
                      "NABARD",
                      e.target.value
                    )
                  }
                />
              </td> */}
            </tr>
            <tr>
              <td>3</td>
              <td>MUDRA</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={
                    formData.BreakUpOfBorrowingObtained &&
                    formData.BreakUpOfBorrowingObtained[0] &&
                    formData.BreakUpOfBorrowingObtained[0]["MUDRA"]
                      ? formData.BreakUpOfBorrowingObtained[0]["MUDRA"]
                      : ""
                  }
                  onChange={(e) =>
                    handleArrayChange(
                      "BreakUpOfBorrowingObtained",
                      0,
                      "MUDRA",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>NHB</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={
                    formData.BreakUpOfBorrowingObtained &&
                    formData.BreakUpOfBorrowingObtained[0] &&
                    formData.BreakUpOfBorrowingObtained[0]["NHB"]
                      ? formData.BreakUpOfBorrowingObtained[0]["NHB"]
                      : ""
                  }
                  onChange={(e) =>
                    handleArrayChange(
                      "BreakUpOfBorrowingObtained",
                      0,
                      "NHB",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>
                    
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default Borrowing;
