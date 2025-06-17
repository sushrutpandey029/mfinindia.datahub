
// import React, { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import PropTypes from "prop-types";

// const PieChart = ({ data = {}, onFilterChange = () => { } }) => {
//   const shortMonthOptions = [
//     "Apr", "May", "Jun", "Jul", "Aug", "Sep",
//     "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"
//   ];

//   const fullMonthOptions = [
//     "Apr", "May", "Jun", "Jul", "Aug", "Sep",
//     "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"
//   ];

//   const getCurrentFinancialYear = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = today.getMonth() + 1;
//     return month >= 4
//       ? `FY ${String(year).slice(2)}-${String(year + 1).slice(2)}`
//       : `FY ${String(year - 1).slice(2)}-${String(year).slice(2)}`;
//   };

//   const generateFinancialYears = () => {
//     const currentYear = new Date().getFullYear();
//     const startYear = 2020;
//     const options = [];

//     for (let y = currentYear + 1; y >= startYear; y--) {
//       options.push(`FY ${String(y - 1).slice(2)}-${String(y).slice(2)}`);
//     }

//     return options;
//   };

//   const [selectedYear, setSelectedYear] = useState(getCurrentFinancialYear());
//   const [selectedMonth, setSelectedMonth] = useState("");

//   useEffect(() => {
//     onFilterChange(selectedYear, selectedMonth);
//   }, [selectedYear, selectedMonth]);

//   if (!data || !Array.isArray(data.data)) {
//     return (
//       <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
//         No data available or data is in incorrect format
//       </div>
//     );
//   }

//   const series = data.data.map(item => item.total);
//   const labels = data.data.map(item => item.activity_type);
//   const totalActivities = series.reduce((a, b) => a + b, 0);

//   const options = {
//     chart: {
//       type: "donut",
//       animations: {
//         enabled: true,
//         easing: "easeinout",
//         speed: 800,
//       },
//     },
//     labels: labels,
//     colors: [
//       "#3B82F6", "#10B981", "#F59E0B", "#6366F1", "#EC4899",
//       "#8B5CF6", "#14B8A6", "#EF4444", "#F43F5E", "#A855F7", "#0EA5E9"
//     ],
//     legend: {
//       position: "bottom",
//       horizontalAlign: "center",
//       fontSize: "14px",
//       markers: {
//         width: 12,
//         height: 12,
//         radius: 6,
//         offsetX: -5
//       },
//       itemMargin: {
//         horizontal: 10,
//         vertical: 5
//       },
//       formatter: function (legendName, opts) {
//         return `${legendName}: ${opts.w.globals.series[opts.seriesIndex]}`;
//       }
//     },
//     title: {
//       text: `Activity Type Distribution (${selectedMonth || "All Months"} ${selectedYear})`,
//       align: "center",
//       margin: 10,
//       offsetY: 10,
//       style: {
//         fontSize: "16px",
//         fontWeight: "bold",
//         color: "#374151"
//       }
//     },
//     tooltip: {
//       y: {
//         formatter: function (value) {
//           const percentage = ((value / totalActivities) * 100).toFixed(1);
//           return `${value} activities (${percentage}%)`;
//         }
//       }
//     },
//     plotOptions: {
//       pie: {
//         offsetY: 10,
//         donut: {
//           size: "70%",
//           labels: {
//             show: true,
//             name: {
//               show: true,
//               fontSize: "14px",
//               fontWeight: 600,
//               color: "#6B7280",
//               offsetY: -5
//             },
//             value: {
//               show: true,
//               fontSize: "22px",
//               fontWeight: 700,
//               color: "#111827",
//               offsetY: 5,
//               formatter: (val) => ((val / totalActivities) * 100).toFixed(1) + "%"
//             },
//             total: {
//               show: true,
//               showAlways: true,
//               label: "Total Activities",
//               color: "#6B7280",
//               fontSize: "14px",
//               fontWeight: 600,
//               formatter: () => totalActivities
//             }
//           }
//         }
//       }
//     },
//     dataLabels: {
//       enabled: false
//     },
//     responsive: [
//       {
//         breakpoint: 640,
//         options: {
//           plotOptions: {
//             pie: {
//               donut: {
//                 size: "60%"
//               }
//             }
//           },
//           legend: {
//             fontSize: "12px",
//             markers: {
//               width: 10,
//               height: 10
//             }
//           }
//         }
//       }
//     ]
//   };

//   const yearOptions = generateFinancialYears();

//   return (
//     <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col items-center justify-center">
//       <div className="w-full max-w-[500px]">
//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 justify-center mb-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
//             <select
//               value={selectedYear}
//               onChange={(e) => {
//                 setSelectedYear(e.target.value);
//                 setSelectedMonth("");
//               }}
//               className="p-2 border border-gray-300 rounded-md"
//             >
//               {yearOptions.map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
//             <select
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//               className="p-2 border border-gray-300 rounded-md"
//             >
//               <option value="">All Months</option>
//               {fullMonthOptions.map((month, index) => (
//                 <option key={month} value={shortMonthOptions[index]}>
//                   {month}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Chart */}
//         <ReactApexChart
//           options={options}
//           series={series}
//           type="donut"
//           width="100%"
//           height="400"
//         />
//       </div>
//     </div>
//   );
// };

// PieChart.propTypes = {
//   data: PropTypes.shape({
//     data: PropTypes.arrayOf(
//       PropTypes.shape({
//         activity_type: PropTypes.string,
//         total: PropTypes.number
//       })
//     ),
//     year: PropTypes.string,
//     month: PropTypes.string,
//     success: PropTypes.bool
//   }),
//   onFilterChange: PropTypes.func
// };

// PieChart.defaultProps = {
//   data: {
//     data: [],
//     year: "",
//     month: "",
//     success: false
//   },
//   onFilterChange: () => { }
// };

// export default PieChart;



import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";
import axios from "axios";

const PieChart = ({ BaseUrl, userRole, userName, endpoint }) => {
  const shortMonthOptions = [
    "Apr", "May", "Jun", "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"
  ];

  const fullMonthOptions = [
    "April", "May", "June", "July", "August", "September",
    "October", "November", "December", "January", "February", "March"
  ];

  const [countPieData, setCountPieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(getCurrentFinancialYear());
  const [selectedMonth, setSelectedMonth] = useState("");

  function getCurrentFinancialYear() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    return month >= 4
      ? `FY ${String(year).slice(2)}-${String(year + 1).slice(2)}`
      : `FY ${String(year - 1).slice(2)}-${String(year).slice(2)}`;
  }

  function generateFinancialYears() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;
    const options = [];
    for (let y = currentYear + 1; y >= startYear; y--) {
      options.push(`FY ${String(y - 1).slice(2)}-${String(y).slice(2)}`);
    }
    return options;
  }

  const fetchPieData = async (year, month) => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        user_role: userRole,
        username: userName,
        year: year || selectedYear
      };
      if (month) params.month = month;

      const response = await axios.get(`${BaseUrl}/${endpoint}`, { params });

      if (response.data.success) {
        setCountPieData(response.data);
      } else {
        throw new Error(response.data.message || "Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching pie data:", error);
      setError(error.message);
      setCountPieData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    fetchPieData(year, selectedMonth);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    fetchPieData(selectedYear, month);
  };

  useEffect(() => {
    fetchPieData(selectedYear, selectedMonth);
  }, []);

  const hasData = countPieData && Array.isArray(countPieData.data) && countPieData.data.length > 0;

  const sanitizedData = hasData
    ? countPieData.data.filter(item => typeof item.total === "number" && item.activity_type)
    : [];

  const series = sanitizedData.map(item => item.total);
  const labels = sanitizedData.map(item => item.activity_type);
  const totalActivities = series.reduce((a, b) => a + b, 0);

  const chartOptions = {
    chart: {
      type: "donut",
      animations: { enabled: true, easing: "easeinout", speed: 800 },
    },
    labels: labels,
    colors: ["#3B82F6", "#10B981", "#F59E0B", "#6366F1", "#EC4899", "#8B5CF6"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      formatter: function (legendName, opts) {
        return `${legendName}: ${opts.w.globals.series[opts.seriesIndex]}`;
      }
    },
    title: {
      text: `Activity Type Distribution (${selectedMonth || "All Months"} ${selectedYear})`,
      align: "center",
      style: { fontSize: "16px", fontWeight: "bold", color: "#374151" }
    },
    tooltip: {
      enabled: true,
      shared: false,
      y: {
        formatter: function (value) {
          if (totalActivities === 0) return "No data";
          const percentage = ((value / totalActivities) * 100).toFixed(1);
          return `${value} activities (${percentage}%)`;
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Activities",
              formatter: () => totalActivities
            }
          }
        }
      }
    },
    responsive: [{
      breakpoint: 640,
      options: {
        plotOptions: { pie: { donut: { size: "60%" } } },
        legend: { fontSize: "12px" }
      }
    }]
  };

  const yearOptions = generateFinancialYears();

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      {/* Filters */}
      <div className="mb-4 flex flex-wrap md:flex-nowrap gap-4 items-end">
        <div className="w-32">
          <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 mb-1 px-3">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            disabled={loading}
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-1 px-3 mt-2">Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={loading}
          >
            <option value="">All Months</option>
            {fullMonthOptions.map((month, index) => (
              <option key={month} value={shortMonthOptions[index]}>{month}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-grow flex flex-col items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-500">Loading data...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full text-red-500 p-4">
            <p>Error loading data</p>
            <p className="text-sm text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => fetchPieData(selectedYear, selectedMonth)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        ) : !hasData ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
            <p>No data available for selected filters</p>
            <button
              onClick={() => fetchPieData(selectedYear, selectedMonth)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="w-full max-w-[350px]">
            <ReactApexChart
              options={chartOptions}
              series={series}
              type="donut"
              width="100%"
              height="373"
            />
          </div>
        )}
      </div>
    </div>
  );
};

PieChart.propTypes = {
  BaseUrl: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired
};

export default PieChart;
