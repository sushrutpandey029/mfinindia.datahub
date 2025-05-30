// import React, { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import PropTypes from "prop-types";

// const BarChart = ({ data = {}, onFilterChange }) => {
//   const currentYear = new Date().getFullYear();
//   const [selectedYear, setSelectedYear] = useState(currentYear.toString());
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [showChart, setShowChart] = useState(true);

//   const yearOptions = Array.from(
//     { length: currentYear - 2019 },
//     (_, i) => currentYear - i
//   );

//   const monthOptions = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const handleMonthChange = (month) => {
//     setSelectedMonth(month);
//     setShowChart(true);
//     onFilterChange(selectedYear, month);
//   };

//   const [chartState, setChartState] = useState({
//     series: [{ name: "Meetings", data: [] }],
//     options: {
//       chart: {
//         type: "bar",
//         height: 450,
//         toolbar: {
//           show: true,
//           tools: {
//             download: true,
//             selection: true,
//             zoom: true,
//             zoomin: true,
//             zoomout: true,
//             pan: true,
//             reset: true,
//           },
//         },
//       },
//       title: {
//         text: `Monthly Meetings in ${currentYear}`,
//         align: "center",
//         style: {
//           fontSize: "16px",
//           fontWeight: "bold",
//         },
//       },
//       plotOptions: {
//         bar: {
//           horizontal: false,
//           columnWidth: "55%",
//           endingShape: "rounded",
//           dataLabels: {
//             position: "top", // Show labels on top of bars
//           },
//         },
//       },
//       dataLabels: {
//         enabled: true, // Enable data labels
//         formatter: function(val) {
//           return val; // Show the exact value
//         },
//         offsetY: -20, // Position above the bar
//         style: {
//           fontSize: "12px",
//           colors: ["#000"]
//         }
//       },
//       stroke: {
//         show: true,
//         width: 2,
//         colors: ["transparent"],
//       },
//       xaxis: {
//         categories: monthOptions,
//         labels: {
//           style: {
//             fontSize: "12px",
//             fontWeight: 600,
//           },
//           rotate: -45, // Rotate labels for better fit
//         },
//       },
//       yaxis: {
//         title: {
//           text: "Number of Meetings",
//           style: {
//             fontSize: "12px",
//             fontWeight: 600,
//           },
//         },
//         labels: {
//           formatter: function (val) {
//             return Math.round(val);
//           },
//         },
//       },
//       fill: {
//         opacity: 1,
//       },
//       tooltip: {
//         y: {
//           formatter: function (val) {
//             return val + (val === 1 ? " meeting" : " meetings");
//           },
//         },
//       },
//       colors: ["#3B82F6"],
//       responsive: [
//         {
//           breakpoint: 768,
//           options: {
//             chart: {
//               height: 400,
//             },
//             dataLabels: {
//               style: {
//                 fontSize: "10px"
//               }
//             },
//             xaxis: {
//               labels: {
//                 rotate: -45
//               }
//             },
//             yaxis: {
//               title: {
//                 style: {
//                   fontSize: "10px",
//                 },
//               },
//             },
//           },
//         },
//       ],
//     },
//   });

//   // Load current year data on component mount
//   useEffect(() => {
//     onFilterChange(currentYear.toString(), "");
//   }, []);

//   useEffect(() => {
//     if (!showChart) return;

//     const defaultTitle = {
//       text: "No data available",
//       align: "center",
//       style: { fontSize: "16px", fontWeight: "bold" },
//     };

//     const errorTitle = {
//       text: "Error loading data",
//       align: "center",
//       style: { fontSize: "16px", fontWeight: "bold", color: "#EF4444" },
//     };

//     if (!data || !Array.isArray(data.data)) {
//       setChartState((prev) => ({
//         ...prev,
//         series: [{ name: "Meetings", data: [] }],
//         options: {
//           ...prev.options,
//           title: defaultTitle,
//           xaxis: { ...prev.options.xaxis, categories: [] },
//         },
//       }));
//       return;
//     }

//     try {
//       if (data.view === "month_wise_count") {
//         const monthDataMap = {};
//         data.data.forEach(item => {
//           monthDataMap[item.month] = item.total_meetings;
//         });

//         const seriesData = monthOptions.map(month => monthDataMap[month] || 0);

//         setChartState({
//           series: [{ name: "Meetings", data: seriesData }],
//           options: {
//             ...chartState.options,
//             title: {
//               text: selectedMonth
//                 ? `Meetings by Type (${selectedMonth} ${selectedYear})`
//                 : `Monthly Meetings in ${selectedYear}`,
//               align: "center",
//               style: { fontSize: "16px", fontWeight: "bold" },
//             },
//             xaxis: {
//               ...chartState.options.xaxis,
//               categories: monthOptions,
//             },
//           },
//         });
//       }
//       else if (data.view === "activity_type_count") {
//         const categories = data.data
//           .map((item) => item.activity_type || "N/A")
//           .filter(Boolean);

//         const seriesData = data.data
//           .map((item) => item.total || 0)
//           .filter((num) => !isNaN(num));

//         setChartState({
//           series: [{ name: "Meetings", data: seriesData }],
//           options: {
//             ...chartState.options,
//             title: {
//               text: `Meetings by Type (${selectedMonth} ${selectedYear})`,
//               align: "center",
//               style: { fontSize: "16px", fontWeight: "bold" },
//             },
//             xaxis: { ...chartState.options.xaxis, categories },
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Error processing chart data:", error);
//       setChartState((prev) => ({
//         ...prev,
//         series: [{ name: "Meetings", data: [] }],
//         options: {
//           ...prev.options,
//           title: errorTitle,
//           xaxis: { ...prev.options.xaxis, categories: [] },
//         },
//       }));
//     }
//   }, [data, selectedMonth, selectedYear, showChart]);

//   return (
//     <div className="bg-white p-4 rounded-lg shadow h-full">
//       <div className="">
//         <div className="w-12">
//           <label
//             htmlFor="year-select"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Year
//           </label>
//           <select
//             id="year-select"
//             value={selectedYear}
//             onChange={(e) => {
//               setSelectedYear(e.target.value);
//               setSelectedMonth("");
//               onFilterChange(e.target.value, "");
//             }}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           >
//             {yearOptions.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>

//           <label
//             htmlFor="month-select"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Month
//           </label>
//           <select
//             id="month-select"
//             value={selectedMonth}
//             onChange={(e) => handleMonthChange(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">All Months</option>
//             {monthOptions.map((month) => (
//               <option key={month} value={month}>
//                 {month}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="h-[450px]">
//         {showChart ? (
//           <ReactApexChart
//             options={chartState.options}
//             series={chartState.series}
//             type="bar"
//             height="100%"
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-500">
//             {chartState.options.title.text}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// BarChart.propTypes = {
//   data: PropTypes.shape({
//     data: PropTypes.arrayOf(
//       PropTypes.shape({
//         activity_type: PropTypes.string,
//         month: PropTypes.string,
//         total: PropTypes.number,
//         total_meetings: PropTypes.number,
//       })
//     ),
//     view: PropTypes.string,
//     success: PropTypes.bool,
//     year: PropTypes.string,
//   }),
//   onFilterChange: PropTypes.func.isRequired,
// };

// BarChart.defaultProps = {
//   data: {
//     data: [],
//     view: "",
//     success: false,
//     year: "",
//   },
// };

// export default BarChart;

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";
import { Padding } from "@mui/icons-material";

const BarChart = ({ data = {}, onFilterChange }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showChart, setShowChart] = useState(true);

  const yearOptions = Array.from(
    { length: currentYear - 2019 },
    (_, i) => currentYear - i
  );

  const shortMonthOptions = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const fullMonthOptions = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setShowChart(true);
    onFilterChange(selectedYear, month);
  };

  const [chartState, setChartState] = useState({
    series: [{ name: "Meetings", data: [] }],
    options: {
      chart: {
        type: "bar",
        height: 400,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
      },
      grid: {
        show: false, // ✅ This hides horizontal and vertical grid lines
      },
      title: {
        text: `Monthly Meetings in ${currentYear}`,
        align: "center",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#000"],
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: shortMonthOptions,
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: 600,
          },
          rotate: -45,
        },
      },
      yaxis: {
        show: true,
        labels: {
          show: false,
        },
        title: {
          text: "",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + (val === 1 ? " meeting" : " meetings");
          },
        },
      },
      colors: ["#3B82F6"],
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 200,
            },
            dataLabels: {
              style: {
                fontSize: "10px",
              },
            },
            xaxis: {
              labels: {
                rotate: -45,
              },
            },
            yaxis: {
              title: {
                style: {
                  fontSize: "10px",
                },
              },
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    onFilterChange(currentYear.toString(), "");
  }, []);

  useEffect(() => {
    if (!showChart) return;

    const defaultTitle = {
      text: "No data available",
      align: "center",
      style: { fontSize: "16px", fontWeight: "bold" },
    };

    const errorTitle = {
      text: "Error loading data",
      align: "center",
      style: { fontSize: "16px", fontWeight: "bold", color: "#EF4444" },
    };

    if (!data || !Array.isArray(data.data)) {
      setChartState((prev) => ({
        ...prev,
        series: [{ name: "Meetings", data: [] }],
        options: {
          ...prev.options,
          title: defaultTitle,
          xaxis: { ...prev.options.xaxis, categories: [] },
        },
      }));
      return;
    }

    try {
      if (data.view === "month_wise_count") {
        const monthDataMap = {};

        data.data.forEach((item) => {
          const monthIndex = fullMonthOptions.indexOf(item.month);
          if (monthIndex !== -1) {
            monthDataMap[shortMonthOptions[monthIndex]] = item.total_meetings;
          }
        });

        const seriesData = shortMonthOptions.map(
          (month) => monthDataMap[month] || 0
        );

        setChartState({
          series: [{ name: "Meetings", data: seriesData }],
          options: {
            ...chartState.options,
            title: {
              text: selectedMonth
                ? `Meetings by Type (${fullMonthOptions[shortMonthOptions.indexOf(selectedMonth)]} ${selectedYear})`
                : `Monthly meetings during ${selectedYear}`,
              align: "center",
              style: { fontSize: "16px", fontWeight: "bold" },
            },
            xaxis: {
              ...chartState.options.xaxis,
              categories: shortMonthOptions,
            },
          },
        });
      } else if (data.view === "activity_type_count") {
        const categories = data.data
          .map((item) => item.activity_type || "N/A")
          .filter(Boolean);

        const seriesData = data.data
          .map((item) => item.total || 0)
          .filter((num) => !isNaN(num));

        setChartState({
          series: [{ name: "Meetings", data: seriesData }],
          options: {
            ...chartState.options,
            title: {
              text: `Meetings by Type (${fullMonthOptions[shortMonthOptions.indexOf(selectedMonth)]} ${selectedYear})`,
              align: "center",
              style: { fontSize: "16px", fontWeight: "bold" },
            },
            xaxis: { ...chartState.options.xaxis, categories },
          },
        });
      }
    } catch (error) {
      console.error("Error processing chart data:", error);
      setChartState((prev) => ({
        ...prev,
        series: [{ name: "Meetings", data: [] }],
        options: {
          ...prev.options,
          title: errorTitle,
          xaxis: { ...prev.options.xaxis, categories: [] },
        },
      }));
    }
  }, [data, selectedMonth, selectedYear, showChart]);

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      <div className="mb-4 flex flex-wrap md:flex-nowrap gap-4 items-end">
        <div className="w-32">
          <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 mb-1 px-3">
            Year
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setSelectedMonth("");
              onFilterChange(e.target.value, "");
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>


          <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-1 px-3">
            Month
          </label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Months</option>
            {fullMonthOptions.map((month, index) => (
              <option key={month} value={shortMonthOptions[index]}>
                {month}
              </option>
            ))}
          </select>
        </div>


        <div className="h-[500px]">
          {showChart ? (
            <ReactApexChart
              options={chartState.options}
              series={chartState.series}
              type="bar"
              height={325}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              {chartState.options.title.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        activity_type: PropTypes.string,
        month: PropTypes.string,
        total: PropTypes.number,
        total_meetings: PropTypes.number,
      })
    ),
    view: PropTypes.string,
    success: PropTypes.bool,
    year: PropTypes.string,
  }),
  onFilterChange: PropTypes.func.isRequired,
};

BarChart.defaultProps = {
  data: {
    data: [],
    view: "",
    success: false,
    year: "",
  },
};

export default BarChart;


