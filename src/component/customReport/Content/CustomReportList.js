 export const customReportList = [
                {
                    id:1,
                    name:"Historical GLP",
                    description:"Entity-wise breakup of GLP for all entities for the last 12 months.",
                    link:"/custom-historical-glp-report"
                },
                {
                    id:2,
                    name:"PAR Analysis",
                    description:"PAR levels of all entities across the last 12 months.",
                    link:"/custom-par-analysis-report"
                },
                {
                    id:3,
                    name:"PAR Bucket",
                    description:"PAR Buckets of all entities across the last 12 months.",
                    link:"/custom-dpd-bucket-report"
                },
                {
                    id:4,
                    name:"Disbursement",
                    description:"Loan amount disbursed by all entities for the last 12 months.",
                    link:"/custom-disbursement-amount-report"
                },
                // {
                //     id:5,
                //     name:"Disbursement Account",
                //     description:"Number of Loan accounts disbursed by all entities for the last 12 months.",
                //     link:"/custom-disbursement-account-report"
                // },
                {
                    id:6,
                    name:"Universe Portfolio : Top 20 States",
                    description:" Portfolio of top 20 states in terms of GLP for the selected month.",
                    link:"/custom-universe-portfolio-top-states-report"
                }
                // {
                //     id:7,
                //     name:"Universe PAR : Top 20 States",
                //     description:"PAR levels for the top 20 states (according to GLP) for the selected month.",
                //     link:"/custom-universe-par-top-states-report"
                // }           
];   

export const dataPointsRecords = [
                {
                    value:"GLP (Rs Cr)",
                    text:"GLP (Rs Cr)"
                },
                {
                    value:"Accounts (Cr)",
                    text:"Accounts (Cr)"
                },
                {
                    value:"Unique borrowers (Cr)",
                    text:"Unique borrowers (Cr)"
                },
                {
                    value:"Entities (No.)",
                    text:"Entities (No.)"
                },
                {
                    value:"Branches (No)",
                    text:"Branches (No)"
                },
                {
                    value:"PAR Bucket 31-60",
                    text:"PAR Bucket 31-60"
                },
                {
                    value:"PAR Bucket 61-90",
                    text:"PAR Bucket 61-90"
                },
                {
                    value:"PAR Bucket 91-180",
                    text:"PAR Bucket 91-180"
                },
                {
                    value:"PAR Bucket 180+",
                    text:"PAR Bucket 180+"
                },
                {
                    value:"PAR>30",
                    text:"PAR>30"
                },
                {
                    value:"PAR>60",
                    text:"PAR>60"
                },
                {
                    value:"PAR>90",
                    text:"PAR>90"
                },
                {
                    value:"PAR>180",
                    text:"PAR>180"
                },
                {
                    value:"Disbursement (Rs Cr)",
                    text:"Disbursement (Rs Cr)"
                },
                {
                    value:"Disbursement accounts (Lk)",
                    text:"Disbursement accounts (Lk)"
                },
                {
                    value:"Disbursement unique borrowers (Lk)",
                    text:"Disbursement unique borrowers (Lk)"
                },
                /* {
                    value:"State level",
                    text:"State level"
                } */
];
export const MFINdataPointsRecords = [
    {
        value:"AUM (Rs Cr)",
        text:"AUM (Rs Cr)"
    },
    {
        value:"Accounts (Cr)",
        text:"Accounts (Cr)"
    },
    {
        value:"Branches (No)",
        text:"Branches (No)"
    },
    {
        value:"PAR Bucket 31-60",
        text:"PAR Bucket 31-60"
    },
    {
        value:"PAR Bucket 61-90",
        text:"PAR Bucket 61-90"
    },
    {
        value:"PAR Bucket 91-180",
        text:"PAR Bucket 91-180"
    },
    {
        value:"PAR Bucket 180+",
        text:"PAR Bucket 180+"
    },
    {
        value:"PAR>30",
        text:"PAR>30"
    },
    {
        value:"PAR>60",
        text:"PAR>60"
    },
    {
        value:"PAR>90",
        text:"PAR>90"
    },
    {
        value:"PAR>180",
        text:"PAR>180"
    },
    {
        value:"Disbursement (Rs Cr)",
        text:"Disbursement (Rs Cr)"
    },
    {
        value:"Disbursement accounts (Lk)",
        text:"Disbursement accounts (Lk)"
    }
];


// export const geographyList = ["National","Region","State"];
// export const geographyList = ["National","Region","State","District"];



//  user Autherization
let userdetails = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

var geographyList;

if(userdetails && userdetails.data && userdetails.data.role_name) {
    const roleName = userdetails.data.role_name;
    if(roleName === "Admin") {
        geographyList = ["National", "Region", "State", "District"];
    } else {
        geographyList = ["National", "Region", "State"];
    }
} else {
    geographyList = ["National", "Region", "State"];
}

export { geographyList };

