import * as XLSX from "xlsx";
import formFields from "../data/FormFields";

//save formdata to local storage
export const saveUserFormData = (data) => {
  localStorage.setItem("userFormData", JSON.stringify(data));
};

//retrieve userFormData from local storage
export const loadUserFormData = () => {
  const data = localStorage.getItem("userFormData");
  return data ? JSON.parse(data) : null;
};

//clear local storage data after final submission
export const clearUserFormData = () => {
  localStorage.removeItem("userFormData");
};

// function to handle excel upload file


// export const handleFileUpload = (selectedFile, setFormData) => {
//   if (!selectedFile) {
//     alert("Please select an Excel file first!");
//     return;
//   }

//   saveUserFormData(formFields);

//   const reader = new FileReader();
//   reader.onload = (e) => {
//     const data = new Uint8Array(e.target.result);
//     const workbook = XLSX.read(data, { type: "array" });
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//     const headers = jsonData[0]; // First row as headers
//     const values = jsonData.slice(1); // Remaining rows as values

//     if (!headers || !values.length) return;

//     const formFields = loadUserFormData(); // Load existing form fields

//     // Helper function to map Excel data to form structure
//     const mapData = (objStructure, rowValues) => {
//       if (!objStructure || typeof objStructure !== "object") return {};
      
//       const mappedData = {};

//       Object.keys(objStructure).forEach((key) => {
//         if (Array.isArray(objStructure[key])) {
//           // Handle arrays dynamically (States, ExistingEquityProviders)
//           const arrayKey = key; // Array name from form structure

//           // Filter rows that match this array
//           const arrayValues = values.map((row) => {
//             const item = objStructure[key][0]; // Use the first object as a reference
//             return mapData(item, row); // Recursively map array elements
//           });

//           mappedData[arrayKey] = arrayValues.filter((item) => Object.values(item).some((val) => val !== "")); // Remove empty objects
//         } else if (typeof objStructure[key] === "object") {
//           // Recursively map nested objects
//           mappedData[key] = mapData(objStructure[key], rowValues);
//         } else {
//           // Map single values from Excel
//           mappedData[key] =
//             rowValues[headers.indexOf(key)] !== undefined
//               ? rowValues[headers.indexOf(key)]
//               : "";
//         }
//       });

//       return mappedData;
//     };

//     // Map the first row of Excel data to form fields
//     const updatedFormData = mapData(formFields, values[0]);

//     setFormData(updatedFormData);
//     saveUserFormData(updatedFormData);

//     alert("Form data filled successfully!");
//     console.log("Excel Data Mapped:", updatedFormData);
//   };

//   reader.readAsArrayBuffer(selectedFile);
// };

// export const handleFileUpload = (selectedFile, setFormData) => {
//   if (!selectedFile) {
//     alert("Please select an Excel file first!");
//     return;
//   }

//   const reader = new FileReader();
//   reader.onload = (e) => {
//     const data = new Uint8Array(e.target.result);
//     const workbook = XLSX.read(data, { type: "array" });
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//     if (!jsonData.length) {
//       alert("No data found in the Excel file!");
//       return;
//     }

//     const headers = jsonData[0]; // First row contains headers
//     const values = jsonData.slice(1); // Remaining rows contain data

//     if (!headers || !values.length) return;

//     const formFields = loadUserFormData(); // Load existing form fields

//     // Function to map Excel headers like 'Infrastructure.Employees' to form structure
//     const mapData = (objStructure, headers, rowValues) => {
//       if (!objStructure || typeof objStructure !== "object") return {};

//       const mappedData = {};

//       Object.keys(objStructure).forEach((key) => {
//         if (typeof objStructure[key] === "object" && !Array.isArray(objStructure[key])) {
//           // Recursively map nested objects
//           mappedData[key] = mapData(objStructure[key], headers, rowValues);
//         } else {
//           // Handle flat values, match header key with dot notation support
//           const headerKey = headers.find((h) => h === key || h.endsWith(`.${key}`));

//           if (headerKey) {
//             const columnIndex = headers.indexOf(headerKey);
//             mappedData[key] = columnIndex !== -1 ? rowValues[columnIndex] || "" : "";
//           } else {
//             mappedData[key] = "";
//           }
//         }
//       });

//       return mappedData;
//     };

//     // Map the first row of Excel data to form fields
//     const updatedFormData = mapData(formFields, headers, values[0]);

//     setFormData(updatedFormData);
//     saveUserFormData(updatedFormData);

//     alert("Form data filled successfully!");
//     console.log("Excel Data Mapped:", updatedFormData);
//   };

//   reader.readAsArrayBuffer(selectedFile);
// };

export const handleFileUpload = (selectedFile, setFormData) => {
  if (!selectedFile) {
    alert("Please select an Excel file first!");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (!jsonData.length) {
      alert("No data found in the Excel file!");
      return;
    }

    const headers = jsonData[0]; // First row contains headers
    const values = jsonData.slice(1); // Remaining rows contain data

    if (!headers || !values.length) return;

    const formFields = loadUserFormData(); // Load existing form fields

    // Function to map Excel headers like 'Infrastructure.Employees' to form structure
    const mapData = (objStructure, headers, values) => {
      if (!objStructure || typeof objStructure !== "object") return {};

      const mappedData = {};

      Object.keys(objStructure).forEach((key) => {
        if (Array.isArray(objStructure[key])) {
          // Handle array (like States)
          const arrayPrefix = key + "."; // Example: "States."

          // Find all headers that belong to this array (e.g., "States.StateName", "States.NumberOfEmployees")
          const arrayHeaders = headers.filter((h) => h.startsWith(arrayPrefix));

          if (arrayHeaders.length > 0) {
            // Create an array of objects by mapping each row
            mappedData[key] = values.map((row) => {
              let obj = {};
              arrayHeaders.forEach((header) => {
                const fieldName = header.replace(arrayPrefix, ""); // Extract "StateName" from "States.StateName"
                obj[fieldName] = row[headers.indexOf(header)] || ""; // Map value
              });
              return obj;
            }).filter((obj) => Object.values(obj).some((val) => val !== "")); // Remove empty objects
          }
        } else if (typeof objStructure[key] === "object") {
          // Recursively map nested objects
          mappedData[key] = mapData(objStructure[key], headers, values);
        } else {
          // Handle flat values
          const headerKey = headers.find((h) => h === key || h.endsWith(`.${key}`));

          if (headerKey) {
            const columnIndex = headers.indexOf(headerKey);
            mappedData[key] = columnIndex !== -1 ? values[0][columnIndex] || "" : "";
          } else {
            mappedData[key] = "";
          }
        }
      });

      return mappedData;
    };

    // Map the entire Excel data to form fields
    const updatedFormData = mapData(formFields, headers, values);

    setFormData(updatedFormData);
    saveUserFormData(updatedFormData);

    alert("Form data filled successfully!");
    console.log("Excel Data Mapped:", updatedFormData);
  };

  reader.readAsArrayBuffer(selectedFile);
};



