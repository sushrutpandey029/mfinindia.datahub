// import React, { useState } from "react";

// const Dtable = () => {
//   // Fixed column heading
//   const fixedColumn = "ID";

//   // Other column headings (36 columns)
//   const columnHeadings = [
//     "Name", "Age", "City", "Email", "Phone", "Country", "Status", "Date", "Role",
//     "Department", "Salary", "Experience", "Joining Date", "Address", "Zip", "State", "Notes",
//     "Project", "Team", "Supervisor", "Rating", "Feedback", "Performance", "Target", "Achieved",
//     "Bonus", "Overtime", "Leaves", "Late", "Attendance", "Contract", "Skills", "Hobbies", "Remarks", "Reference"
//   ];

//   // Sample row data
//   const rowData = [
//     { ID: 1, Name: "Alice", Age: 25, City: "New York", Email: "alice@example.com", Phone: "1234567890", Country: "USA" },
//     { ID: 2, Name: "Bob", Age: 30, City: "Los Angeles", Email: "bob@example.com", Phone: "0987654321", Country: "USA" },
//     { ID: 3, Name: "Charlie", Age: 28, City: "Chicago", Email: "charlie@example.com", Phone: "1112223333", Country: "USA" },
//     { ID: 4, Name: "David", Age: 35, City: "Houston", Email: "david@example.com", Phone: "4445556666", Country: "USA" },
//     { ID: 5, Name: "Eve", Age: 22, City: "Miami", Email: "eve@example.com", Phone: "7778889999", Country: "USA" }
//   ];

//   // State to control dynamic columns (default: 5)
//   const [columns, setColumns] = useState(5);

//   return (
//     <div className="p-5">
//       {/* Dropdown to Select Number of Dynamic Columns */}
//       <label>Select Columns: </label>
//       <select 
//         value={columns} 
//         onChange={(e) => setColumns(Number(e.target.value))}
//       >
//         {[...Array(36)].map((_, index) => (
//           <option key={index + 1} value={index + 1}>
//             {index + 1}
//           </option>
//         ))}
//       </select>

//       {/* Dynamic Table */}
//       <table border="1" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             {/* Fixed Column */}
//             <th>{fixedColumn}</th>

//             {/* Dynamic Columns */}
//             {columnHeadings.slice(0, columns).map((heading, index) => (
//               <th key={index}>{heading}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {rowData.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {/* Fixed Column Data */}
//               <td>{row[fixedColumn]}</td>

//               {/* Dynamic Columns Data */}
//               {columnHeadings.slice(0, columns).map((heading, colIndex) => (
//                 <td key={colIndex}>{row[heading] || "-"}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dtable;


import React, { useState } from "react";

const Dtable = () => {
  const [numStates, setNumStates] = useState(2); // Default to 2 states

  const indicators = [
    "Number of Employees (in numbers)",
    "Number of Districts (in numbers)",
    "Number of Offices / Branches (in numbers)",
    "Assets under management AUM (On BS + Off BS) (in INR)",
    "Number of Active Borrowers (in numbers)",
    "Portfolio at Risk 1 - 30 days (in INR)",
    "Portfolio at Risk > 30 days (in INR)",
    "Portfolio at Risk > 60 days (in INR)",
    "Portfolio at Risk > 90 days (in INR)",
    "Portfolio at Risk > 180 days (in INR)",
    "Net Loan Portfolio (Balance Sheet Portfolio) (in INR)",
    "On Balance Sheet Portfolio at Risk 1 - 30 days (in INR)",
    "On Balance Sheet Portfolio at Risk > 30 days (in INR)",
    "On Balance Sheet Portfolio at Risk > 60 days (in INR)",
    "On Balance Sheet Portfolio at Risk > 90 days (in INR)",
    "On Balance Sheet Portfolio at Risk > 180 days (in INR)",
  ];

  // Handle dropdown change
  const handleStateChange = (e) => {
    setNumStates(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <label>Select Number of States: </label>
      <select onChange={handleStateChange} value={numStates}>
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <table border="1" style={{ marginTop: "10px", width: "100%", textAlign: "center" }}>
        <thead>
          <tr style={{ background: "#2b60ad", color: "white" }}>
            <th>Indicator</th>
            <th>As on 31 December 2024</th>
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
              <td>As on 31 December 2024</td>
              {[...Array(numStates)].map((_, i) => (
                <td key={i}>
                  <input type="number" placeholder="0" />
                </td>
              ))}
              <td>
                <input type="number" placeholder="0" readOnly />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dtable;

