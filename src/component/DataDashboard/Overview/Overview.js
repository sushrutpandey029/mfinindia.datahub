import "./Overview.css";
import React, { useState, useEffect } from "react";
import { loadUserFormData } from "../utils/StorageHelper";

function Overview({
  formData,
  handleChange,
  handleStateDataChange,
  setFormData,
}) {
  const [numStates, setNumStates] = useState(() => {
    const storedData = loadUserFormData();
    return storedData && storedData.States ? storedData.States.length : 1;
  });

  const [selectedStates, setSelectedStates] = useState(
    Array(numStates).fill("")
  );

  const indicators = [
    "State",
    "Number of Employees (in numbers)",
    "Number of Districts (in numbers)",
    "Number of Offices / Branches (in numbers)",
    "Assets under management AUM (On BS + Off BS) (in INR)",
    "Number of Active Borrowers (in numbers)",
    "Portfolio at Risk 1 -30 days (in INR)",
    "Portfolio at Risk > 30 days (in INR)",
    "Portfolio at Risk > 60 days (in INR)",
    "Portfolio at Risk > 90 days (in INR)",
    "Portfolio at Risk > 180 days (in INR)",
    "Net Loan Portfolio (Balance Sheet Portfolio) (in INR)",
    "On Balance Sheet Portfolio at Risk 1 -30 days (in INR)",
    "On Balance Sheet Portfolio at Risk > 30 days (in INR)",
    "On Balance Sheet Portfolio at Risk > 60 days (in INR)",
    "On Balance Sheet Portfolio at Risk > 90 days (in INR)",
    "On Balance Sheet Portfolio at Risk > 180 days (in INR)",
    "Off Balance Sheet Portfolio / Managed Portfolio (in INR)",
    "Off Balance Sheet Portfolio at Risk 1 -30 days (in INR)",
    "Off Balance Sheet Portfolio at Risk > 30 days (in INR)",
    "Off Balance Sheet Portfolio at Risk > 60 days (in INR)",
    "Off Balance Sheet Portfolio at Risk > 90 days (in INR)",
    "Off Balance Sheet Portfolio at Risk > 180 days (in INR)",
    "Number of Loan Disbursed (in Numbers) (Quarter)",
    "Loan Amount Disbursed (in INR) (Quarter)",
    "Repayment amount due (excluding overdue, prepayment and foreclosure demand) (in INR)",
    "Repayment amount collected (excluding overdue, prepayment and foreclosure collected) (in INR)",
    "Pre-payment amount collected (in INR)",
  ];

  const stateList = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const mapIndicatorToKey = (indicator) => {
    const mappings = {
      State: "StateName",
      "Number of Employees (in numbers)": "NumberOfEmployees",
      "Number of Districts (in numbers)": "NumberOfDistricts",
      "Number of Offices / Branches (in numbers)": "NumberOfBranches",
      "Assets under management AUM (On BS + Off BS) (in INR)":
        "AssetsUnderManagement",
      "Number of Active Borrowers (in numbers)": "NumberOfActiveBorrowers",
      "Portfolio at Risk 1 -30 days (in INR)": "PortfolioRisk1_30",
      "Portfolio at Risk > 30 days (in INR)": "PortfolioRisk30",
      "Portfolio at Risk > 60 days (in INR)": "PortfolioRisk60",
      "Portfolio at Risk > 90 days (in INR)": "PortfolioRisk90",
      "Portfolio at Risk > 180 days (in INR)": "PortfolioRisk180",
      "Net Loan Portfolio (Balance Sheet Portfolio) (in INR)":
        "NetLoanPortfolio",
      "On Balance Sheet Portfolio at Risk 1 -30 days (in INR)":
        "OnBalanceSheetRisk1_30",
      "On Balance Sheet Portfolio at Risk > 30 days (in INR)":
        "OnBalanceSheetRisk30",
      "On Balance Sheet Portfolio at Risk > 60 days (in INR)":
        "OnBalanceSheetRisk60",
      "On Balance Sheet Portfolio at Risk > 90 days (in INR)":
        "OnBalanceSheetRisk90",
      "On Balance Sheet Portfolio at Risk > 180 days (in INR)":
        "OnBalanceSheetRisk180",
      "Off Balance Sheet Portfolio / Managed Portfolio (in INR)":
        "OffBalanceSheetPortfolio",
      "Off Balance Sheet Portfolio at Risk 1 -30 days (in INR)":
        "OffBalanceSheetRisk1_30",
      "Off Balance Sheet Portfolio at Risk > 30 days (in INR)":
        "OffBalanceSheetRisk30",
      "Off Balance Sheet Portfolio at Risk > 60 days (in INR)":
        "OffBalanceSheetRisk60",
      "Off Balance Sheet Portfolio at Risk > 90 days (in INR)":
        "OffBalanceSheetRisk90",
      "Off Balance Sheet Portfolio at Risk > 180 days (in INR)":
        "OffBalanceSheetRisk180",
      "Number of Loan Disbursed (in Numbers) (Quarter)": "LoanDisbursedQuarter",
      "Loan Amount Disbursed (in INR) (Quarter)": "LoanAmountDisbursedQuarter",
      "Repayment amount due (excluding overdue, prepayment and foreclosure demand) (in INR)":
        "RepaymentAmountDue",
      "Repayment amount collected (excluding overdue, prepayment and foreclosure collected) (in INR)":
        "RepaymentAmountCollected",
      "Pre-payment amount collected (in INR)": "PrePaymentAmountCollected",
      "Total Funding Received (in INR)": "TotalFundingReceived",
      "Funding Received from Banks (in INR)": "FundingReceivedFromBanks",
      "Funding Received from Other Financial Institutions (in INR)":
        "FundingReceivedFromOtherFIs",
      "Securitization During Period (in INR)": "SecuritizationDuringPeriod",
      "Percentage of Loans Disbursed Cashless (%)":
        "PercentLoanDisbursedCashless",
      "Percentage of Loans Collected Cashless (%)":
        "PercentLoanCollectedCashless",
    };

    return mappings[indicator] || indicator; // Return the mapped key or default to itself
  };

  // Update formData.States whenever numStates changes
  useEffect(() => {
    setFormData((prevData) => {
      let updatedStates = [...(prevData.States || [])];

      // Increase array length if needed
      while (updatedStates.length < numStates) {
        updatedStates.push({ StateName: "" });
      }

      // Trim array if numStates is reduced
      updatedStates = updatedStates.slice(0, numStates);

      return { ...prevData, States: updatedStates };
    });
  }, [numStates]);

  const handleStateChange = (index, value) => {
    const newStates = [...selectedStates];
    newStates[index] = value;
    setSelectedStates(newStates);
  };

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
              <td>Particulars</td>
              <td></td>
            </tr>

            <tr class="pink-row">
              <td>Infrastructure</td>
              <td>As on 31 December 2024</td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Employees (in Numbers)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.Infrastructure.Employees || ""}
                  onChange={(e) =>
                    handleChange("Infrastructure", "Employees", e.target.value)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Loan Officers (in Numbers)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.Infrastructure.LoanOfficers || ""}
                  onChange={(e) =>
                    handleChange(
                      "Infrastructure",
                      "LoanOfficers",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Districts (in Numbers)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.Infrastructure.Districts || ""}
                  onChange={(e) =>
                    handleChange("Infrastructure", "Districts", e.target.value)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Branches (in Numbers)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.Infrastructure.Branches || ""}
                  onChange={(e) =>
                    handleChange("Infrastructure", "Branches", e.target.value)
                  }
                />
              </td>
            </tr>

            {/* sub heading */}
            <tr class="pink-row">
              <td>Balance Sheet Figures</td>
              <td>As on 31 December 2024</td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Aggregate Loan Provisions (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.BalanceSheetFigures.AggregateLoanProvisions || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "BalanceSheetFigures",
                      "AggregateLoanProvisions",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Total cash in hand and in bank (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.BalanceSheetFigures.TotalCash || ""}
                  onChange={(e) =>
                    handleChange(
                      "BalanceSheetFigures",
                      "TotalCash",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Total Assets (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.BalanceSheetFigures.TotalAssets || ""}
                  onChange={(e) =>
                    handleChange(
                      "BalanceSheetFigures",
                      "TotalAssets",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Outstanding Borrowings (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={
                    formData.BalanceSheetFigures.OutstandingBorrowings || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "BalanceSheetFigures",
                      "OutstandingBorrowings",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            {/* to count total equity and display here and send */}
            <tr class="pink-row-sm">
              <td>
                <label for="" class="form-label">
                  Total Equity
                </label>
              </td>
              <td>{formData.BalanceSheetFigures.TotalEquity || 0}</td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Share capital (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.BalanceSheetFigures.ShareCapital || ""}
                  onChange={(e) =>
                    handleChange(
                      "BalanceSheetFigures",
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
                  Reserves and surplus (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.BalanceSheetFigures.ReservesAndSurplus || ""}
                  onChange={(e) =>
                    handleChange(
                      "BalanceSheetFigures",
                      "ReservesAndSurplus",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            {/* sub heading */}
            <tr class="pink-row">
              <td>Loan</td>
              <td>As on 31 December 2024</td>
            </tr>

            {/* sub heading */}
            <tr class="blue-row">
              <td>On balance sheet portfolio</td>
              {/*here will be this :  OnBalanceSheetPortfolio */}
              <td>{formData.OnBalanceSheetPortfolio || 0}</td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Owned Loan Portfolio (Balance Sheet Portfolio) (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.OwnedLoanPortfolio || ""}
                  onChange={(e) =>
                    handleChange("", "OwnedLoanPortfolio", e.target.value)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Outstanding loans for On-BS portfolio (in Numbers)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.OutstandingLoansOnBSPortfolio || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "OutstandingLoansOnBSPortfolio",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            {/* sub heading */}
            <tr class="blue-row">
              <td>On balance sheet managed portfolio</td>
              {/* this will be here :  OnBalanceSheetManagedPortfolio */}
              <td>{formData.OnBalanceSheetManagedPortfolio || 0}</td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  SPV part of Portfolio (PTC) (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.SPVPartOfPortfolio || ""}
                  onChange={(e) =>
                    handleChange("", "SPVPartOfPortfolio", e.target.value)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Securitized (Created thru SPV) (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.SecuritizedCreatedThroughSPV || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "SecuritizedCreatedThroughSPV",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Assigned / Bilateral Agreement (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.AssignedBilateralAgreement || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "AssignedBilateralAgreement",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Outstanding loans for On-BS managed portfolio (in Numbers)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.OutstandingLoansOnBSManagedPortfolio || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "OutstandingLoansOnBSManagedPortfolio",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            {/* sub heading */}
            <tr class="blue-row">
              <td>Off balance sheet managed Portfolio</td>
              {/* this will be here : OffBalanceSheetManagedPortfolio */}
              <td>{formData.OffBalanceSheetManagedPortfolio || 0}</td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  SPV part of Portfolio (PTC) (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.SPVPartOfPortfolioOffBS || ""}
                  onChange={(e) =>
                    handleChange("", "SPVPartOfPortfolioOffBS", e.target.value)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Securitized (Created thru SPV) (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.SecuritizedCreatedThroughSPVOffBS || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "SecuritizedCreatedThroughSPVOffBS",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Assigned / Bilateral Agreement (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.AssignedBilateralAgreementOffBS || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "AssignedBilateralAgreementOffBS",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Loan portfolio created as BC (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.LoanPortfolioCreatedBC || ""}
                  onChange={(e) =>
                    handleChange("", "LoanPortfolioCreatedBC", e.target.value)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Outstanding Loans for Off-BS Managed portfolio (in Numbers)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.OutstandingLoansOffBSManagedPortfolio || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "OutstandingLoansOffBSManagedPortfolio",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Assets under management AUM (On BS + Off BS) (in INR)
                </label>
              </td>
              {/* this is here : AUM */}
              <td>{formData.AUM || 0}</td>
            </tr>

            {/* <tr>
              <td>
                <label for="" class="form-label">
                  Average monthly portfolio (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.AverageMonthlyPortfolio || ""}
                  onChange={(e) =>
                    handleChange("", "AverageMonthlyPortfolio", e.target.value)
                  }
                />
              </td>
            </tr> */}

            <tr>
              <td>
                <label for="" class="form-label">
                  Total clients (Active Borrowers) (in Numbers)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.TotalClients || ""}
                  onChange={(e) =>
                    handleChange("", "TotalClients", e.target.value)
                  }
                />
              </td>
            </tr>

            <tr class="pink-row">
              <td>Portfolio at Risk</td>
              <td>As on 31 December 2024</td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Portfolio at Risk {">"} 30 days (in INR)
                </label>
              </td>
              <td>{formData.PortfolioAtRisk30 || 0}</td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Portfolio at Risk {">"} 60 days (in INR)
                </label>
              </td>
              <td>{formData.PortfolioAtRisk60 || 0}</td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Portfolio at Risk {">"} 90 days (in INR)
                </label>
              </td>
              <td>{formData.PortfolioAtRisk90 || 0}</td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Portfolio at Risk {">"} 180 days (in INR)
                </label>
              </td>
              <td>{formData.PortfolioAtRisk180 || 0}</td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  On Balance Sheet Portfolio at Risk {">"} 30 days (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.OnBalanceSheetPortfolioAtRisk30 || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "OnBalanceSheetPortfolioAtRisk30",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  On Balance Sheet Portfolio at Risk {">"} 60 days (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.OnBalanceSheetPortfolioAtRisk60 || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "OnBalanceSheetPortfolioAtRisk60",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  On Balance Sheet Portfolio at Risk {">"} 90 days (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.OnBalanceSheetPortfolioAtRisk90 || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "OnBalanceSheetPortfolioAtRisk90",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  On Balance Sheet Portfolio at Risk {">"} 180 days (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.OnBalanceSheetPortfolioAtRisk180 || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "OnBalanceSheetPortfolioAtRisk180",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Off Balance Sheet Portfolio at Risk {">"} 30 days (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.OffBalanceSheetPortfolioAtRisk30 || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "OffBalanceSheetPortfolioAtRisk30",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Off Balance Sheet Portfolio at Risk {">"} 60 days (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.OffBalanceSheetPortfolioAtRisk60 || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "OffBalanceSheetPortfolioAtRisk60",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Off Balance Sheet Portfolio at Risk {">"} 90 days (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.OffBalanceSheetPortfolioAtRisk90 || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "OffBalanceSheetPortfolioAtRisk90",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Off Balance Sheet Portfolio at Risk {">"} 180 days (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.OffBalanceSheetPortfolioAtRisk180 || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "OffBalanceSheetPortfolioAtRisk180",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            {/* sub heading */}
            <tr class="pink-row">
              <td>Disbursements - During quarter</td>
              <td>1 Oct 2024 - 31 Dec 2024</td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Number of Loan Disbursed (in Numbers)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.LoanDisbursedQuarter || ""}
                  onChange={(e) =>
                    handleChange("", "LoanDisbursedQuarter", e.target.value)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Loan Amount Disbursed (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.LoanAmountDisbursedQuarter || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "LoanAmountDisbursedQuarter",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            {/* sub heading */}
            <tr class="pink-row">
              <td>Collections - During quarter</td>
              <td>1 Oct 2024 - 31 Dec 2024</td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Repayment amount due (excluding overdue, prepayment and
                  foreclosure demand) (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.RepaymentAmountDue || ""}
                  onChange={(e) =>
                    handleChange("", "RepaymentAmountDue", e.target.value)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Repayment amount collected (excluding overdue, prepayment and
                  foreclosure collected) (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.RepaymentAmountCollected || ""}
                  onChange={(e) =>
                    handleChange("", "RepaymentAmountCollected", e.target.value)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Pre-payment amount collected (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.PrePaymentAmountCollected || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "PrePaymentAmountCollected",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            {/* sub heading */}
            <tr class="pink-row">
              <td>Total funding/Borrowing received - During quarter</td>
              <td>1 Oct 2024 - 31 Dec 2024</td>
            </tr>

            {/* sub heading */}
            <tr class="pink-row-sm">
              <td>Total</td>
              {/* this is to be here: TotalFundingReceived */}
              <td>0</td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Funding received from Banks (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.FundingReceivedFromBanks || ""}
                  onChange={(e) =>
                    handleChange("", "FundingReceivedFromBanks", e.target.value)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Funding received from other FIs (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.FundingReceivedFromOtherFIs || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "FundingReceivedFromOtherFIs",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  Securitization during the period (in INR)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.SecuritizationDuringPeriod || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "SecuritizationDuringPeriod",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            {/* sub heading */}
            <tr class="pink-row">
              <td>Cashless operations During quarter</td>
              <td>1 Oct 2024 - 31 Dec 2024</td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  % Loan amount disbursed in cash-less mode
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.PercentLoanDisbursedCashless || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "PercentLoanDisbursedCashless",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="" class="form-label">
                  % Loan amount collected in cash-less mode
                </label>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  value={formData.PercentLoanCollectedCashless || ""}
                  onChange={(e) =>
                    handleChange(
                      "",
                      "PercentLoanCollectedCashless",
                      e.target.value
                    )
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* state data started */}
        <table
          className="table table-light table-bordered border-primary"
          style={{ width: "100%" }}
        >
          <thead>
            <tr className="blue-row">
              <th>Number of States and Union Territories Operational</th>
              <th>
                <select
                  value={numStates}
                  onChange={(e) => setNumStates(Number(e.target.value))}
                >
                  {[...Array(36)].map((_, index) => (
                    <option value={index + 1} key={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </th>
            </tr>

            <tr className="blue-row">
              <th>
                <label className="form-label">Indicator</label>
              </th>
              <th></th>
              {[...Array(numStates)].map((_, i) => (
                <th key={i}>State {i + 1}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {indicators.map((indicator, rowIndex) => (
              <tr key={rowIndex}>
                <td>{indicator}</td>
                <td>{indicator === "State" ? "" : "As on 31 December 2024"}</td>

                {[...Array(numStates)].map((_, i) => (
                  <td key={i}>
                    <td key={i}>
                      {indicator === "State" ? (
                        <select
                          value={
                            formData.States[i] && formData.States[i].StateName
                              ? formData.States[i].StateName
                              : ""
                          }
                          onChange={(e) =>
                            handleStateDataChange(
                              i,
                              "StateName",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select State</option>
                          {stateList.map((state, index) => (
                            <option key={index} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          value={
                            formData.States[i] &&
                            formData.States[i][mapIndicatorToKey(indicator)]
                              ? formData.States[i][mapIndicatorToKey(indicator)]
                              : ""
                          }
                          onChange={(e) =>
                            handleStateDataChange(
                              i,
                              mapIndicatorToKey(indicator),
                              e.target.value
                            )
                          }
                        />
                      )}
                    </td>

                    {/* {indicator === "State" ? (
                      <select
                        value={formData.States[i].StateName || ""}
                        onChange={(e) =>
                          handleStateDataChange(i, "StateName", e.target.value)
                        }
                      >
                        <option value="">Select State</option>
                        {stateList.map((state, index) => (
                          <option key={index} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        // value={formData.States[i][indicator] || ""}
                        value={
                          formData.States[i][mapIndicatorToKey(indicator)] || ""
                        }
                        onChange={
                          (e) =>
                            handleStateDataChange(
                              i,
                              mapIndicatorToKey(indicator),
                              e.target.value
                            )
                          // handleStateDataChange(i, indicator, e.target.value)
                        }
                      />
                    )} */}
                  </td>
                ))}

                <td>0</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <table
          class="table table-light table-bordered border-primary"
          style={{ width: "100%" }}
        >
          <thead>
            <tr class="blue-row">
              <th>Number of States and Union Territories Operational</th>
              <th>
                <select
                  value={numStates}
                  onChange={(e) => setNumStates(Number(e.target.value))}
                >
                  {[...Array(36)].map((_, index) => (
                    <option value={index + 1} key={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </th>
            </tr>

            <tr class="blue-row">
              <th>
                <label for="" class="form-label">
                  Indicator
                </label>
              </th>
              <th></th>
              {[...Array(numStates)].map((_, i) => (
                <th key={i}>State {i + 1}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {indicators.map((indicator, rowIndex) => (
              <tr key={rowIndex}>
                <td>{indicator}</td>
                {indicator === "State" ? (
                  <td></td>
                ) : (
                  <td>As on 31 December 2024</td>
                )}

                {[...Array(numStates)].map((_, i) => (
                  <td key={i}>
                    {indicator === "State" ? (
                      <select
                        value={selectedStates[i] || ""}
                        onChange={(e) => handleStateChange(i, e.target.value)}
                      >
                        <option value={""} class="form-control">
                          select state
                        </option>
                        {stateList.map((state, index) => (
                          <option key={index} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input type="text" class="form-control" />
                    )}
                  </td>
                ))}
                <td>0</td>
              </tr>
            ))}
          </tbody>
        </table> */}

        {/* <Dtable /> */}
      </form>
    </div>
  );
}

export default Overview;
