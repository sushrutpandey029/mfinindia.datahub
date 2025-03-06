const formFields = {
  Infrastructure: {
    Employees: "",
    LoanOfficers: "",
    Districts: "",
    Branches: "",
  },
  BalanceSheetFigures: {
    AggregateLoanProvisions: "",
    TotalCash: "",
    TotalAssets: "",
    OutstandingBorrowings: "",
    TotalEquity: 0,
    ShareCapital: "",
    ReservesAndSurplus: "",
    GLP: 0,
    AUM: 0,
  },
  OnBalanceSheetPortfolio: "",//add in AUM
  OwnedLoanPortfolio: "",
  OutstandingLoansOnBSPortfolio: "",
  OnBalanceSheetManagedPortfolio: "",
  SPVPartOfPortfolio: "",
  SecuritizedCreatedThroughSPV: "",
  AssignedBilateralAgreement: "",
  OutstandingLoansOnBSManagedPortfolio: "",
  OffBalanceSheetManagedPortfolio: "", //add in AUM
  SPVPartOfPortfolioOffBS: "",
  SecuritizedCreatedThroughSPVOffBS: "",
  AssignedBilateralAgreementOffBS: "",
  LoanPortfolioCreatedBC: "",
  OutstandingLoansOffBSManagedPortfolio: "",
  AUM: 0,
  lastDateOfQuarter:"",
  AverageMonthlyPortfolio: "",
  TotalClients: "",
  PortfolioAtRisk30: "",
  PortfolioAtRisk60: "",
  PortfolioAtRisk90: "",
  PortfolioAtRisk180: "",
  OnBalanceSheetPortfolioAtRisk30: "",
  OnBalanceSheetPortfolioAtRisk60: "",
  OnBalanceSheetPortfolioAtRisk90: "",
  OnBalanceSheetPortfolioAtRisk180: "",
  OffBalanceSheetPortfolio: "", //not used
  OffBalanceSheetRisk1_30: "", //not used
  OffBalanceSheetPortfolioAtRisk30: "",
  OffBalanceSheetPortfolioAtRisk60: "",
  OffBalanceSheetPortfolioAtRisk90: "",
  OffBalanceSheetPortfolioAtRisk180: "",
  LoanDisbursedQuarter: "",
  LoanAmountDisbursedQuarter: "",
  RepaymentAmountDue: "",
  RepaymentAmountCollected: "",
  PrePaymentAmountCollected: "",
  TotalFundingReceived: "",
  FundingReceivedFromBanks: "",
  FundingReceivedFromOtherFIs: "",
  SecuritizationDuringPeriod: "",
  PercentLoanDisbursedCashless: "",
  PercentLoanCollectedCashless: "",
  States: [
    {
      StateName: "",
      NumberOfEmployees: "",
      NumberOfDistricts: "",
      NumberOfBranches: "",
      AssetsUnderManagement: "",
      NumberOfActiveBorrowers: "",
      PortfolioRisk1_30: "",
      PortfolioRisk30: "",
      PortfolioRisk60: "",
      PortfolioRisk90: "",
      PortfolioRisk180: "",
      NetLoanPortfolio: "",
      OnBalanceSheetRisk1_30: "",
      OnBalanceSheetRisk30: "",
      OnBalanceSheetRisk60: "",
      OnBalanceSheetRisk90: "",
      OnBalanceSheetRisk180: "",
      OffBalanceSheetPortfolio: "",
      OffBalanceSheetRisk1_30: "",
      OffBalanceSheetRisk30: "",
      OffBalanceSheetRisk60: "",
      OffBalanceSheetRisk90: "",
      OffBalanceSheetRisk180: "",
      LoanDisbursedQuarter: "",
      LoanAmountDisbursedQuarter: "",
      RepaymentAmountDue: "",
      RepaymentAmountCollected: "",
      PrePaymentAmountCollected: "",
      TotalFundingReceived: "",
      FundingReceivedFromBanks: "",
      FundingReceivedFromOtherFIs: "",
      SecuritizationDuringPeriod: "",
      PercentLoanDisbursedCashless: "",
      PercentLoanCollectedCashless: "", //excel format completed here
    },
  ],
  ShareholdersFunds: {
    ShareCapital: "",
    ReservesAndSurplus: "",
    ShareOfEquity: "",
    Foreign: {
      Total: "",
      FDI: "",
      FPI: "",
      FII: "",
      ForeignPromoter: "",
      Others: "",
    },
    Domestic: {
      Total: "",
      Others: "",
      DomesticPromoter: "",
    },
  },
  FreshEquityReceived: {
    Total: "",
    Foreign: {
      Total: "",
      FDI: "",
      FPI: "",
      FII: "",
      ForeignPromoter: "",
      others:""
    },
    Domestic: {
      Total: "",
      DomesticPromoter: "",
      Others: "",
    },
  },
  ExistingEquityProviders: [
    {
      Name: "",
      Type: "",
      AmountReported: "",
    },
  ],
  equityreceivedExistingEquityProviders: [
    {
      Name: "",
      Type: "",
      AmountReported: "",
    },
  ],
  equityboughtExistingEquityProviders: [
    {
      Name: "",
      Type: "",
      AmountReported: "",
    },
  ],
  AgricultureAndAlliedActivitiesTotal: 0,
  AgricultureAndAlliedActivities: 0,
  NonAgricultureTotal: 0,
  TradeAndServices: 0,
  ManufacturingProduction: 0,
  HouseholdFinanceTotal: 0,
  Education: 0,
  Medical: 0,
  HousingHomeImprovement: 0,
  OtherHouseholdFinance: 0,
  Total: 0,
  Location: "",
  Location1: {
    Rural: "",
    MetropolitanUrbanSemiUrban: "",
  },
  MostRecentRatingInformation: [
    {
      RatingAgency: "",
      RatingScale: "",
      Degree: "",
      Outlook: "",
      DateOfRating: "",
      ValidUpTo: "",
    },
  ],
  MostRecentGradingInformation: [
    {
      GradingAgency: "",
      GradingScale: "",
      DateOfGrading: "",
      ValidUpTo: "",
    },
  ],
  CodeOfConductAssessment: [
    {
      GradingAgency: "",
      CoCAGrade: "",
      DateOfGrading: "",
      ValidUpTo: "",
    },
  ], //start product pricing
  MicrofinanceLoansPP: [
    {
      SNo: "",
      ProductName: "",
      AmountOutstanding: "",
      InterestRates: "",
    },
  ],
  NonMicrofinanceLoansPP: [
    {
      SNo: "",
      ProductName: "",
      AmountOutstanding: "",
      InterestRates: "",
    },
  ],
  ManagedPortfolioPP: [
    {
      SNo: "",
      ProductName: "",
      ProductType: "",
      AmountOutstanding: "",
      InterestRate: "",
    },
  ],
  OffBalanceManagedPortfolioPP: [
    {
      SNo: "",
      ProductName: "",
      AmountOutstanding: "",
      InterestRate: "",
    },
  ], //product pricing end here
  MicrofinanceLoans: [
    {
      SNo: "",
      ProductName: "",
      AmountDisbursed: "",
      NoOfAccounts: "",
      InterestRates: "",
      AccountsDisbursed: "", //not in form
    },
  ],
  NonMicrofinanceLoans: [
    {
      SNo: "",
      ProductName: "",
      AmountOutstanding: "",
      NoOfAccounts: "",
      InterestRate: "",
    },
  ],
  ManagedPortfolio: [
    {
      SNo: "",
      ProductName: "",
      AmountOutstanding: "",
      NoOfAccounts: "",
      InterestRate: "",
    },
  ],
  OffBalanceManagedPortfolio: [
    {
      SNo: "",
      ProductName: "",
      AmountOutstanding: "", //amount of outstanding in pricing for quarter form
      NoOfAccounts: "",
      InterestRate: "",
    },
  ],
  MostRecentGradingInformation: [
    {
      GradingAgency: "",
      GradingScale: "",
      DateOfGrading: "",
      ValidUpTo: "",
    },
  ],
  CodeOfConductAssessment: [
    {
      GradingAgency: "",
      CoCAGrade: "",
      DateOfGrading: "",
      ValidUpTo: "",
    },
  ],
  staff: {
    active: {
      ho: {
        field_officers: "",
        management: "",
        senior_management: "",
        probational: "",
        others: "",
        total: "",
      },
      branch: {
        field_officers: "",
        management: "",
        senior_management: "",
        probational: "",
        others: "",
        total: "",
      },
    },
    recruitment: {
      ho: {
        field_officers: "",
        management: "",
        senior_management: "",
        probational: "",
        others: "",
        total: "",
      },
      branch: {
        field_officers: "",
        management: "",
        senior_management: "",
        probational: "",
        others: "",
        total: "",
      },
    },
    attrition: {
      ho: {
        field_officers: "",
        management: "",
        senior_management: "",
        probational: "",
        others: "",
        total: "",
      },
      branch: {
        field_officers: "",
        management: "",
        senior_management: "",
        probational: "",
        others: "",
        total: "",
      },
    },
  },
  assets: {
    amount_disbursed: "",
    cash_bank_balances: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
    cash_collateral: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
    investments: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
    on_balance_sheet_loan_portfolio: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
    interest_on_loan_portfolio: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
    fixed_assets: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
    other_assets: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
  },
  staff: {
    active: {
      ho: {
        field_officers: "",
        management: "",
        senior_management: "",
        probational: "",
        others: "",
        total: "",
      },
      branch: {
        field_officers: "",
        management: "",
        senior_management: "",
        probational: "",
        others: "",
        total: "",
      },
    },
    recruitment: {
      ho: {
        field_officers: "",
        management: "",
        senior_management: "",
        probational: "",
        others: "",
        total: "",
      },
      branch: {
        field_officers: "",
        management: "",
        senior_management: "",
        probational: "",
        others: "",
        total: "",
      },
    },
    attrition: {
      ho: {
        field_officers: "",
        management: "",
        senior_management: "",
        probational: "",
        others: "",
        total: "",
      },
      branch: {
        field_officers: "",
        management: "",
        senior_management: "",
        probational: "",
        others: "",
        total: "",
      },
    },
  },
  assets: {
    amount_disbursed: "", //not used this field in file
    cash_bank_balances: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
    cash_collateral: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
    investments: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
    on_balance_sheet_loan_portfolio: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
    interest_on_loan_portfolio: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
    fixed_assets: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
    other_assets: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
  },
  liabilities: {
    loan_repayable: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
    interest_payable: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
    operational_expenses_payable: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
    other_liabilities: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
  },
  total_equity: {
    "<1": "",
    "1_to_3": "",
    "3_to_6": "",
    "6_to_12": "",
    over_12: "",
  },
  total_liabilities_equity: {
    //not used till
    "<1": "",
    "1_to_3": "",
    "3_to_6": "",
    "6_to_12": "",
    over_12: "",
  },
  asset_gap: {
    //not used till
    "<1": "",
    "1_to_3": "",
    "3_to_6": "",
    "6_to_12": "",
    over_12: "",
  },
  funding_requirements: {
    loan_disbursements: {
      "<1": "",
      "1_to_3": "",
      "3_to_6": "",
      "6_to_12": "",
      over_12: "",
    },
  },
  //borrowing form field started
  borrowings: "",
  TotalOutstandingBorrowing: {
    AIFI: {
      TermLoan: "",
      Debentures: "",
      SubordinatedDebt: "",
      CommercialPaper: "",
      AnyOther: "",
      Total: "",
    },
    Bank: {
      TermLoan: "",
      Debentures: "",
      SubordinatedDebt: "",
      CommercialPaper: "",
      AnyOther: "",
      Total: "",
    },
    NonBankEntity: {
      TermLoan: "",
      Debentures: "",
      SubordinatedDebt: "",
      CommercialPaper: "",
      AnyOther: "",
      Total: "",
    },
    ExternalCBorrowing: {
      TermLoan: "",
      Debentures: "",
      SubordinatedDebt: "",
      CommercialPaper: "",
      AnyOther: "",
      Total: "",
    },
    Others: {
      TermLoan: "",
      Debentures: "",
      SubordinatedDebt: "",
      CommercialPaper: "",
      AnyOther: "",
      Total: "",
    },
    SpecifyOther: {
      TermLoan: "",
      Debentures: "",
      SubordinatedDebt: "",
      CommercialPaper: "",
      AnyOther: "",
      Total: "",
    },
  },
  BreakUpOfBorrowingOutstanding: [
    {
      SIDBI: "",
    },
    {
      NABARD: "",
    },
    {
      MUDRA: "",
    },
    {
      NHB: "",
    },
  ],
  TotalBorrowingObtained: {
    AIFI: {
      TermLoan: "",
      Debentures: "",
      SubordinatedDebt: "",
      CommercialPaper: "",
      AnyOther: "",
      Total: "",
    },
    Bank: {
      TermLoan: "",
      Debentures: "",
      SubordinatedDebt: "",
      CommercialPaper: "",
      AnyOther: "",
      Total: "",
    },
    NonBankEntity: {
      TermLoan: "",
      Debentures: "",
      SubordinatedDebt: "",
      CommercialPaper: "",
      AnyOther: "",
      Total: "",
    },
    ExternalCBorrowing: {
      TermLoan: "",
      Debentures: "",
      SubordinatedDebt: "",
      CommercialPaper: "",
      AnyOther: "",
      Total: "",
    },
    Others: {
      TermLoan: "",
      Debentures: "",
      SubordinatedDebt: "",
      CommercialPaper: "",
      AnyOther: "",
      Total: "",
    },
    SpecifyOther: {
      TermLoan: "",
      Debentures: "",
      SubordinatedDebt: "",
      CommercialPaper: "",
      AnyOther: "",
      Total: "",
    },
  },
  BreakUpOfBorrowingObtained: [
    {
      SIDBI: "",
    },
    {
      NABARD: "",
    },
    {
      MUDRA: "",
    },
    {
      NHB: "",
    },
  ],
  // borrowing form field end
  operational_efficiency: {
    personnel_expense_ratio: "",
    per: "",
    cost_of_funds: "",
    funding_cost_ratio: "",
    cost_per_borrower: "",
  },
  capital_adequacy: {
    liquidity_coverage_ratio: "",
    tier_1_crar: "",
    tier_2_crar: "",
  },
  profitability: {
    return_on_asset: "",
    return_on_equity: "",
    yield_on_portfolio: "",
    net_interest_margin: "",
    operating_self_sufficiency: "",
    other_income_to_total_income: "",
  },
  portfolio_quality: {
    gross_npa: "",
    net_npa: "",
    loan_loss_reserve_ratio: "",
    write_off_value: "",
    write_off_ratio: "",
  },
  pricing_of_loans: {
    weighted_avg_lending_rate: "",
    weighted_avg_processing_fee: "",
  },
};

export default formFields;
