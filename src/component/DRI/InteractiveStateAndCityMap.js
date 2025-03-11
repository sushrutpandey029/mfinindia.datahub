import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./InteractiveStateAndCityMap.css";
import Loader from "../common/Loader";
import RestoreIcon from "@mui/icons-material/Restore";

const FilterDiv = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  handleFilter,
  handleReset,
}) => {
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const response = await fetch(
          "https://api.mfinindia.org/api/auth/fetchMonthsYears",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data from the API.");
        }

        const data = await response.json();
        console.log("fdata", data);

        setMonths(data.months || []);
        setYears(data.years || []);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchFilterData();
  }, []);

  return (
    <div className="container">
      <div className="firstContainer">
        <div>
          <label htmlFor="year" className="select-label">
            <strong>Select Year :&nbsp;</strong>
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="custom-select"
          >
            <option value="">select</option>
            {years &&
              years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="month" className="select-label">
            <strong>Select Month :&nbsp; </strong>
          </label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="custom-select"
          >
            <option value="">select</option>
            {months &&
              months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
          </select>
        </div>
        <div>
          <button onClick={handleFilter} className="btn btn-primary">
            Filter
          </button>
          {/* <i className="refresh"></i> */}
        </div>
      </div>

      <div className="resetDiv">
        <button onClick={handleReset} className="resetBtn" title="reset">
          <RestoreIcon />
        </button>
      </div>
    </div>
  );
};

const InteractiveStateAndCityMap = () => {
  const [districtColors, setDistrictColors] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(false);

  const categoryColors = {
    "Very High": "#c20000",
    "Very Low": "#ffd966",
    Low: "#aed643",
    Moderate: "#9cb0e8",
    High: "#ff5050",
  };

  const handleFilter = async () => {
    setLoading(true);
    await fetchDistrictColors();
    setLoading(false);
  };

  const handleReset = async () => {
    setLoading(true);
    setSelectedMonth("");
    setSelectedYear("");
    await fetchDistrictColors();
    setLoading(false);
  };

  const fetchDistrictColors = async () => {
    try {
      const response = await fetch(
        "https://api.mfinindia.org/api/auth/getdisteictandcategory"
      );
      const data = await response.json();
      console.log("nameandcategory", data);

      // Process data to map district names to category colors
      const districtWithColors = data.map((district) => ({
        district_name: district.district_name,
        color: categoryColors[district.dri_category] || "#fff", // Default to '#fff' if category is not mapped
      }));

      console.log("districtWithColors", districtWithColors);
      setDistrictColors(districtWithColors);
    } catch (error) {
      console.error("Error fetching district colors:", error);
    }
  };

  function formatNumber(value) {
    if (value !== null) {
      return Math.trunc(value).toLocaleString("en-IN");
    } else {
      return value;
    }
  }

  function formatNumberDigits(value) {
    if (value !== null) {
      return value.toFixed(2).toLocaleString("en-IN");
    } else {
      return value;
    }
  }

  function formatNumberDigitsOne(value) {
    if (value !== null) {
      return value.toFixed(1).toLocaleString("en-IN");
    } else {
      return value;
    }
  }

  const extractYearAndMonth = (datestring) => {
    const [year, month] = datestring.split("-");
    setSelectedYear(year);
    setSelectedMonth(getMonthName(month));
  };

  const getMonthName = (monthNumber) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[parseInt(monthNumber, 10) - 1];
  };

  useEffect(() => {
    fetchDistrictColors();
  }, []);

  useEffect(() => {
    // const width = 1200;
    // const height = 1200;
    const width = 800;
    const height = 800;

    const projection = d3
      .geoMercator()
      .scale(1200)
      .center([80, 22])
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);
    const svg = d3.select("#map");

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Load India's state GeoJSON
    d3.json("/mapFiles/india_state_geo.json").then((statesGeojson) => {
      renderStates(statesGeojson);
    });

    function renderStates(statesGeojson) {
      svg.selectAll("*").remove();

      svg
        .selectAll("path")
        .data(statesGeojson.features)
        .enter()
        .append("path")
        .attr("class", "state")
        .attr("d", path)
        .on("mouseover", function (event, d) {
          tooltip.html("");
          d3.select(this).style("fill", "#00aaff");
          tooltip.transition().duration(200).style("opacity", 1);
          console.log("d.properties.st_nm", d.properties.st_nm);
          if (d.properties.st_nm) {
            const baseUrl = "https://api.mfinindia.org/api/auth/fetch_records";
            const url =
              selectedMonth && selectedYear
                ? `${baseUrl}/${selectedMonth}/${selectedYear}`
                : baseUrl;
            // Replacing jQuery AJAX with fetch
            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                type: "state",
                value: d.properties.st_nm,
              }),
            })
              .then((response) => response.json())
              .then((records) => {
                console.log("state", records);

                if (records.length > 0) {
                  let output = "";
                  records.forEach((record) => {
                    console.log("stated", record.Date);
                    extractYearAndMonth(record.Date);
                    output += `<div class='map_data'>
                                        <strong>${record.State_Name}</strong>
                                        GLP (Rs Cr): <span class="record-value">${formatNumber(
                                          record.GLP_RsCr
                                        )}</span> | No. of AC ('000): <span class="record-value">${formatNumber(
                      record.NoOfAccounts_K
                    )}</span><br>
                                         No. of UB ('000): <span class="record-value">${formatNumber(
                                           record.NoOfUB_K
                                         )}</span> | No. of FIs: <span class="record-value">${formatNumber(
                      record.NoOfFI
                    )}</span><br>
                                        <b><br>MFIN-RADAR</b><br>
                                        Ring Leader: <span class="record-value">${formatNumber(
                                          record.R_RL
                                        )}</span> | External Inciter: <span class="record-value">${formatNumber(
                      record.R_EI
                    )}</span> <br>
                                        Risky Area: <span class="record-value">${formatNumber(
                                          record.R_RA
                                        )}</span> |  Negative Area: <span class="record-value">${formatNumber(
                      record.R_NA
                    )}</span><br>
                                        
                                        <b><br>MFIN-CGRM (as on <span class="record-value">${
                                          record.Date
                                        }</span>)</b><br> Query: <span class="record-value">${formatNumber(
                      record.CGRM_Q
                    )}</span> | Complaints: <span class="record-value">${formatNumber(
                      record.CGRM_C
                    )}</span> <br> Resolved: <span class="record-value">${formatNumber(
                      record.CGRM_R
                    )}</span> | Pending: <span class="record-value">${formatNumber(
                      record.CGRM_P
                    )}</span>
                                    </div>`;
                  });
                  tooltip
                    .html(output)
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 28}px`);
                }
              })
              .catch(() => {
                tooltip.html("<p>Error fetching records</p>");
              });
          }
        })
        .on("mousemove", function (event) {
          tooltip
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", function () {
          d3.select(this).style("fill", "#d3d3d3");
          tooltip.transition().duration(500).style("opacity", 0);
          tooltip.html("");
        })
        .on("click", function (event, d) {
          const state_name = d.properties.st_nm;
          loadCitiesForState(state_name);
        });
      const usedPositions = [];

      // Helper function to check for overlap
      function isOverlapping(x, y, width, height) {
        return usedPositions.some((pos) => {
          const [px, py, pwidth, pheight] = pos;
          return (
            x < px + pwidth &&
            x + width > px &&
            y < py + pheight &&
            y + height > py
          );
        });
      }

      svg
        .selectAll(".state-label")
        .data(statesGeojson.features)
        .enter()
        .append("text")
        .attr("class", "state-label")
        .attr("transform", function (d) {
          const centroid = path.centroid(d);
          let x = centroid[0];
          let y = centroid[1];
          const text = d.properties.st_nm;

          // Get approximate width of the text
          const textWidth = text.length * 6; // Assuming ~6px per character
          const textHeight = 12; // Approximate height of the text

          // Adjust position if overlap is detected
          while (isOverlapping(x, y, textWidth, textHeight)) {
            y += 10; // Move the label down by 10px if overlapping
          }

          // Store position for future overlap checks
          usedPositions.push([x, y, textWidth, textHeight]);

          return `translate(${x},${y})`;
        })
        .attr("dy", ".35em") // Better vertical alignment
        .text(function (d) {
          return d.properties.st_nm;
        })
        .style("font-size", "11px") // Small font to reduce overlap chances
        .style("pointer-events", "none"); // Prevent text from interfering with mouse events
    }

    function loadCitiesForState(stateName) {
      const state_Name = stateName.replace(/\s/g, "");
      d3.json(`/mapFiles/states/${state_Name}.json`).then(function (
        citiesGeojson
      ) {
        renderCities(citiesGeojson);
      });
    }

    function renderCities(citiesGeojson) {
      svg.selectAll("*").remove();

      const bounds = d3.geoBounds(citiesGeojson);
      const widthScale = width / Math.abs(bounds[1][0] - bounds[0][0]);
      const heightScale = height / Math.abs(bounds[1][1] - bounds[0][1]);
      const scale = Math.min(widthScale, heightScale) * 45;

      projection
        .scale(scale)
        .center([
          (bounds[0][0] + bounds[1][0]) / 2,
          (bounds[0][1] + bounds[1][1]) / 2,
        ])
        .translate([width / 2, height / 2]);

      const districtColorMap = {};
      districtColors.forEach((item) => {
        districtColorMap[item.district_name] = item.color;
      });

      const path = d3.geoPath().projection(projection);

      svg
        .selectAll("path")
        .data(citiesGeojson.features)
        .enter()
        .append("path")
        .attr("class", "city")
        .attr("d", path)
        .style("fill", function (d) {
          return districtColorMap[d.properties.district] || "#fff";
        })
        .on("mouseover", function (event, d) {
          tooltip.transition().duration(200).style("opacity", 1);
          if (d.properties.district) {
            const baseUrl = "https://api.mfinindia.org/api/auth/fetch_records";
            const url =
              selectedMonth && selectedYear
                ? `${baseUrl}/${selectedMonth}/${selectedYear}`
                : baseUrl;
            // Replacing jQuery AJAX with fetch
            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                type: "district",
                value: d.properties.district,
              }),
              // body: JSON.stringify({ district_name: d.properties.district }),
            })
              .then((response) => response.json())
              .then((records) => {
                console.log("district_api", records);
                if (records.length > 0) {
                  let output = "";
                  records.forEach((record) => {
                    output += `<div class='map_data'>
                                        <strong>${record.State_Name}, ${
                      record.District_Name
                    }</strong>
                                       DRI Category: <span class="record-value">${
                                         record.DRI_Category
                                       }</span> | DRI Scrore: <span class="record-value">${(
                      record.DRI_Score * 100
                    ).toFixed(2)}%</span><br> 
                                       GLP (Rs Cr): <span class="record-value">${formatNumberDigits(
                                         record.GLP_RsCr
                                       )}</span> | GLP Rank: <span class="record-value">${formatNumber(
                      record.GLP_Rank
                    )}</span><br>
                                        No. of AC ('000): <span class="record-value">${formatNumberDigitsOne(
                                          record.NoOfAccounts_K
                                        )}</span> | No. of UB ('000): <span class="record-value">${formatNumberDigitsOne(
                      record.NoOfUB_K
                    )}</span> | No. of FIs: <span class="record-value">${formatNumber(
                      record.NoOfFI
                    )}</span><br><br>

                                        Density of FI: <span class="record-value">${formatNumberDigitsOne(
                                          record.DensityOfFIs
                                        )}</span> (Percentile: <span class="record-value">${(
                      record.DensityOfFIs_P * 100
                    ).toFixed(2)}%</span>)<br>
                                        Accounts/UB: <span class="record-value">${formatNumberDigitsOne(
                                          record.AcperUB
                                        )}</span> (Percentile: <span class="record-value">${(
                      record.AcperUB_P * 100
                    ).toFixed(2)}%</span>)<br>
                                        Depth of Outreach: <span class="record-value">${(
                                          record.DepthOfOutreach * 100
                                        ).toFixed(
                                          2
                                        )}%</span> (Percentile: <span class="record-value">${(
                      record.DepthOfOutreach_P * 100
                    ).toFixed(2)}%</span>)<br>

                    Portfolio/GDPP (per HH): <span class="record-value">${(
                      record.PerCapita * 100
                    ).toFixed(
                      2
                    )}%</span> (Percentile: <span class="record-value">${(
                      record.PerCapita_P * 100
                    ).toFixed(2)}%</span>)<br>

                                        PAR >60 Days: <span class="record-value">${(
                                          record.PAR60 * 100
                                        ).toFixed(
                                          2
                                        )}%</span> (Percentile: <span class="record-value">${(
                      record.PAR60_P * 100
                    ).toFixed(2)}%</span>) <br><br>
                  
                                        <b>MFIN-RADAR</b> <br>
                                        Ring Leader: <span class="record-value">${formatNumber(
                                          record.R_RL
                                        )}</span> | External Inciter: <span class="record-value">${formatNumber(
                      record.R_EI
                    )}</span><br>
                                        Risky Area: <span class="record-value">${formatNumber(
                                          record.R_RA
                                        )}</span> | Negative Area: <span class="record-value">${formatNumber(
                      record.R_NA
                    )}</span><br><br>

                                        <b>MFIN-CGRM (as on <span class="record-value">${
                                          record.Date
                                        }</span>)</b> <br>
                                        Query: <span class="record-value">${formatNumber(
                                          record.CGRM_Q
                                        )}</span> | Complaints: <span class="record-value">${formatNumber(
                      record.CGRM_C
                    )}</span><br>
                                         Resolved: <span class="record-value">${formatNumber(
                                           record.CGRM_R
                                         )}</span> | Pending <span class="record-value">${formatNumber(
                      record.CGRM_P
                    )}</span> 
                                    </div>`;
                  });
                  tooltip
                    .html(output)
                    .style("left",` ${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 28}px`);
                }
              })
              .catch(() => {
                tooltip.html("<p>Error fetching records</p>");
              });
          }
        })
        .on("mousemove", function (event) {
          tooltip
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", function () {
          tooltip.transition().duration(500).style("opacity", 0);
        });

      const labels = svg
        .selectAll(".city-label")
        .data(citiesGeojson.features)
        .enter()
        .append("text")
        .attr("class", "city-label")
        .attr("transform", function (d, i) {
          const centroid = path.centroid(d);
          const offset = i % 2 === 0 ? -14 : 14; // Stagger labels vertically
          return `translate(${centroid[0]},${centroid[1] + offset})`;
        })
        .attr("dy", ".25em")
        .text((d) => d.properties.district);
    }
  }, [districtColors]);

  if (loading) {
    return (
      <div>
        <Loader loader={loading} size={30} />
      </div>
    );
  }

  return (
    <div class="svg-container">
      <FilterDiv
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
        handleFilter={handleFilter}
        handleReset={handleReset}
      />
      <div className="indiamap">
        <svg id="map" width="1200" height="900"></svg>
      </div>

      <FooterContent />
    </div>
  );
};

export default InteractiveStateAndCityMap;

const FooterContent = () => {
  return (
    <div className="colorContainer">
      <div className="inContainer">
        <p>Very High</p>
        <div className="veryHigh"></div>
      </div>

      <div className="inContainer">
        <p>High</p>
        <div className="high"></div>
      </div>

      <div className="inContainer">
        <p>Moderate</p>
        <div className="moderate"></div>
      </div>

      <div className="inContainer">
        <p>Low</p>
        <div className="low"></div>
      </div>

      <div className="inContainer">
        <p>Very Low</p>
        <div className="veryLow"></div>
      </div>
    </div>
  );
};

// import React, { useEffect, useState } from "react";
// import * as d3 from "d3";
// import "./InteractiveStateAndCityMap.css";
// import Loader from "../common/Loader";
// import RestoreIcon from "@mui/icons-material/Restore";

// const FilterDiv = ({
//   selectedMonth,
//   setSelectedMonth,
//   selectedYear,
//   setSelectedYear,
//   handleFilter,
//   handleReset,
// }) => {
//   const [months, setMonths] = useState([]);
//   const [years, setYears] = useState([]);

//   useEffect(() => {
//     const fetchFilterData = async () => {
//       try {
//         const response = await fetch(
//           "https://api.mfinindia.org/api/auth/fetchMonthsYears",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch data from the API.");
//         }

//         const data = await response.json();

//         setMonths(data.months || []);
//         setYears(data.years || []);
//       } catch (error) {
//         console.error("Error fetching filter data:", error);
//       }
//     };

//     fetchFilterData();
//   }, []);

//   return (
//     <div className="container">
//       <div className="firstContainer">
//         <div>
//           <label htmlFor="month">Select Month : </label>
//           <select
//             id="month"
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//           >
//             <option value="">Select One</option>
//             {months &&
//               months.map((month, index) => (
//                 <option key={index} value={month}>
//                   {month}
//                 </option>
//               ))}
//           </select>
//         </div>
//         <div>
//           <label htmlFor="year">Select Year : </label>
//           <select
//             id="year"
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//           >
//             <option value="">Select One</option>
//             {years &&
//               years.map((year, index) => (
//                 <option key={index} value={year}>
//                   {year}
//                 </option>
//               ))}
//           </select>
//         </div>
//         <div>
//           <button onClick={handleFilter} className="btn btn-sm btn-primary">
//             Filter
//           </button>
//           <i className="refresh"></i>
//         </div>
//       </div>

//       <div className="resetDiv">
//         <button onClick={handleReset} className="resetBtn">
//           <RestoreIcon />
//         </button>
//       </div>
//     </div>
//   );
// };

// const InteractiveStateAndCityMap = () => {
//   const [districtColors, setDistrictColors] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [loading, setLoading] = useState(false);

//   const categoryColors = {
//     "Very High": "#c20000",
//     "Very Low": "#ffd966",
//     Low: "#aed643",
//     Moderate: "#9cb0e8",
//     High: "#ff5050",
//   };

//   const handleFilter = async () => {
//     setLoading(true);
//     await fetchDistrictColors();
//     setLoading(false);
//   };

//   const handleReset = async () => {
//     setLoading(true);
//     setSelectedMonth("");
//     setSelectedYear("");
//     await fetchDistrictColors();
//     setLoading(false);
//   };

//   const fetchDistrictColors = async () => {
//     try {
//       const response = await fetch(
//         "https://api.mfinindia.org/api/auth/getdisteictandcategory"
//       );
//       const data = await response.json();
//       console.log("nameandcategory", data);

//       // Process data to map district names to category colors
//       const districtWithColors = data.map((district) => ({
//         district_name: district.district_name,
//         color: categoryColors[district.dri_category] || "#fff", // Default to '#fff' if category is not mapped
//       }));

//       console.log("districtWithColors", districtWithColors);
//       setDistrictColors(districtWithColors);
//     } catch (error) {
//       console.error("Error fetching district colors:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDistrictColors();
//   }, []);

//   useEffect(() => {
//     const width = 1200;
//     const height = 1200;

//     const projection = d3
//       .geoMercator()
//       .scale(1200)
//       .center([80, 22])
//       .translate([width / 2, height / 2]);

//     const path = d3.geoPath().projection(projection);
//     const svg = d3.select("#map");

//     const tooltip = d3
//       .select("body")
//       .append("div")
//       .attr("class", "tooltip")
//       .style("opacity", 0);

//     // Load India's state GeoJSON
//     d3.json("/mapFiles/india_state_geo.json").then((statesGeojson) => {
//       renderStates(statesGeojson);
//     });

//     function renderStates(statesGeojson) {
//       svg.selectAll("*").remove();

//       svg
//         .selectAll("path")
//         .data(statesGeojson.features)
//         .enter()
//         .append("path")
//         .attr("class", "state")
//         .attr("d", path)
//         .on("mouseover", function (event, d) {
//           tooltip.html("");
//           d3.select(this).style("fill", "#00aaff");
//           tooltip.transition().duration(200).style("opacity", 1);
//           console.log("d.properties.st_nm", d.properties.st_nm);
//           if (d.properties.st_nm) {
//             const baseUrl = "https://api.mfinindia.org/api/auth/fetch_records";
//             const url =
//               selectedMonth && selectedYear
//                 ? `${baseUrl}/${selectedMonth}/${selectedYear}`
//                 : baseUrl;
//             // Replacing jQuery AJAX with fetch
//             fetch(url, {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 type: "state",
//                 value: d.properties.st_nm,
//               }),
//             })
//               .then((response) => response.json())
//               .then((records) => {
//                 if (records.length > 0) {
//                   let output = "";
//                   records.forEach((record) => {
//                     output += `<div class='map_data'>
//                                         <strong>${record.State_Name}</strong>
//                                         GLP (Rs Cr): <span class="record-value">${
//                                           record.GLP_RsCr
//                                         }</span> | No. of AC ('000): <span class="record-value">${record.NoOfAccounts_K.toFixed(
//                       2
//                     )}</span> |<br>
//                                          No. of UB ('000): <span class="record-value">${record.NoOfUB_K.toFixed(
//                                            2
//                                          )}</span> | No. of FIS: <span class="record-value">${
//                       record.NoOfFI
//                     }</span><br>
//                                         <strong>MFIN-RADAR</strong>
//                                         Ring Leader: <span class="record-value">${
//                                           record.R_RL
//                                         }</span> | External Inciter:<span class="record-value">${
//                       record.R_EI
//                     }</span> | Risky Area: <span class="record-value">${
//                       record.R_RA
//                     }</span> |<br>
//                                          Negative Area: <span class="record-value">${
//                                            record.R_NA
//                                          }</span>
//                                         <strong>MFIN-CGRM (as on <span class="record-value">${
//                                           record.Date
//                                         }</span>)</strong> Query: <span class="record-value">${
//                       record.CGRM_Q
//                     }</span> | Complaints: <span class="record-value">${
//                       record.CGRM_C
//                     }</span> | Resolved: <span class="record-value">${
//                       record.CGRM_R
//                     }</span> | <br>
//                                          Pending: <span class="record-value">${
//                                            record.CGRM_P
//                                          }</span>
//                                     </div>`;
//                   });
//                   tooltip
//                     .html(output)
//                     .style("left",` ${event.pageX + 10}px`)
//                     .style("top", `${event.pageY - 28}px`);
//                 }
//               })
//               .catch(() => {
//                 tooltip.html("<p>Error fetching records</p>");
//               });
//           }
//         })
//         .on("mousemove", function (event) {
//           tooltip
//             .style("left", `${event.pageX + 10}px`)
//             .style("top", `${event.pageY - 28}px`);
//         })
//         .on("mouseout", function () {
//           d3.select(this).style("fill", "#d3d3d3");
//           tooltip.transition().duration(500).style("opacity", 0);
//           tooltip.html("");
//         })
//         .on("click", function (event, d) {
//           const state_name = d.properties.st_nm;
//           loadCitiesForState(state_name);
//         });
//         const usedPositions = [];

//         // Helper function to check for overlap
//         function isOverlapping(x, y, width, height) {
//           return usedPositions.some((pos) => {
//             const [px, py, pwidth, pheight] = pos;
//             return (
//               x < px + pwidth &&
//               x + width > px &&
//               y < py + pheight &&
//               y + height > py
//             );
//           });
//         }
        
//         svg
//           .selectAll(".state-label")
//           .data(statesGeojson.features)
//           .enter()
//           .append("text")
//           .attr("class", "state-label")
//           .attr("transform", function (d) {
//             const centroid = path.centroid(d);
//             let x = centroid[0];
//             let y = centroid[1];
//             const text = d.properties.st_nm;
        
//             // Get approximate width of the text
//             const textWidth = text.length * 6; // Assuming ~6px per character
//             const textHeight = 12; // Approximate height of the text
        
//             // Adjust position if overlap is detected
//             while (isOverlapping(x, y, textWidth, textHeight)) {
//               y += 10; // Move the label down by 10px if overlapping
//             }
        
//             // Store position for future overlap checks
//             usedPositions.push([x, y, textWidth, textHeight]);
        
//             return` translate(${x},${y})`;
//           })
//           .attr("dy", ".35em") // Better vertical alignment
//           .text(function (d) {
//             return d.properties.st_nm;
//           })
//           .style("font-size", "11px") // Small font to reduce overlap chances
//           .style("pointer-events", "none"); // Prevent text from interfering with mouse events
        
//     }

//     function loadCitiesForState(stateName) {
//       const state_Name = stateName.replace(/\s/g, "");
//       d3.json(`/mapFiles/states/${state_Name}.json`).then(function (
//         citiesGeojson
//       ) {
//         renderCities(citiesGeojson);
//       });
//     }

//     function renderCities(citiesGeojson) {
//       svg.selectAll("*").remove();

//       const bounds = d3.geoBounds(citiesGeojson);
//       const widthScale = width / Math.abs(bounds[1][0] - bounds[0][0]);
//       const heightScale = height / Math.abs(bounds[1][1] - bounds[0][1]);
//       const scale = Math.min(widthScale, heightScale) * 45;

//       projection
//         .scale(scale)
//         .center([
//           (bounds[0][0] + bounds[1][0]) / 2,
//           (bounds[0][1] + bounds[1][1]) / 2,
//         ])
//         .translate([width / 2, height / 2]);

//       const districtColorMap = {};
//       districtColors.forEach((item) => {
//         districtColorMap[item.district_name] = item.color;
//       });

//       const path = d3.geoPath().projection(projection);

//       svg
//         .selectAll("path")
//         .data(citiesGeojson.features)
//         .enter()
//         .append("path")
//         .attr("class", "city")
//         .attr("d", path)
//         .style("fill", function (d) {
//           return districtColorMap[d.properties.district] || "#fff";
//         })
//         .on("mouseover", function (event, d) {
//           tooltip.transition().duration(200).style("opacity", 1);
//           if (d.properties.district) {
//             const baseUrl = "https://api.mfinindia.org/api/auth/fetch_records";
//             const url =
//               selectedMonth && selectedYear
//                 ?` ${baseUrl}/${selectedMonth}/${selectedYear}`
//                 : baseUrl;
//             // Replacing jQuery AJAX with fetch
//             fetch(url, {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 type: "district",
//                 value: d.properties.district,
//               }),
//               // body: JSON.stringify({ district_name: d.properties.district }),
//             })
//               .then((response) => response.json())
//               .then((records) => {
//                 console.log("district_api", records);
//                 if (records.length > 0) {
//                   let output = "";
//                   records.forEach((record) => {
//                     output += `<div class='map_data'>
//                                         <strong>${record.State_Name}, ${record.District_Name}</strong>
//                                        DRI_Category:<span class="record-value">${record.DRI_Category}</span>  | DRI Scrore: <span class="record-value">${record.DRI_Score}</span> |<br> 
//                                        GLP (Rs Cr): <span class="record-value">${record.GLP_RsCr}</span> | GLP Rank: <span class="record-value">${record.GLP_Rank}</span> | <br>
//                                         No. of AC ('000): <span class="record-value">${record.NoOfAccounts_K.toFixed(2)}</span> | No. of UB ('000): <span class="record-value">${record.NoOfUB_K.toFixed(2)}</span> | No. of FIS: <span class="record-value">${record.NoOfFI}</span><br><br>

//                                         Density of FI: <span class="record-value">${record.DensityOfFIs.toFixed(2)}</span> (Percentile: <span class="record-value">${record.DensityOfFIs_P.toFixed(2)}%</span>) |<br>
//                                         Accounts/UB: <span class="record-value">${record.AcperUB.toFixed(2)}</span> (Percentile: <span class="record-value">${record.AcperUB_P.toFixed(2)}%</span>) |<br>
//                                         Depth of Outreach: <span class="record-value">${record.DepthOfOutreach.toFixed(2)}</span>% (Percentile: <span class="record-value">${record.DepthOfOutreach_P.toFixed(2)}%</span>) |<br>
//                                         PAR >60 Days: <span class="record-value">${record.PAR60.toFixed(2)}</span>% (Percentile: <span class="record-value">${record.PAR60.toFixed(2)}%</span>) <br><br>
                  
//                                         <strong>MFIN-RADAR</strong> 
//                                         Ring Leader: <span class="record-value">${record.R_RL}</span> | External Inciter:<span class="record-value">${record.R_EI}</span> |<br>
//                                         Risky Area: <span class="record-value">${record.R_RA}</span> | Negative Area: <span class="record-value">${record.R_NA}</span><br><br>

//                                         <strong>MFIN-CGRM (as on <span class="record-value">${record.Date}</span>)</strong> 
//                                         Query: <span class="record-value">${record.CGRM_Q}</span> | Complaints: <span class="record-value">${record.CGRM_C}</span> |<br>
//                                          Resolved: <span class="record-value">${record.CGRM_R}</span> | Pending <span class="record-value">${record.CGRM_P}</span> 
//                                     </div>`;
//                   });
//                   tooltip
//                     .html(output)
//                     .style("left", `${event.pageX + 10}px`)
//                     .style("top", `${event.pageY - 28}px`);
//                 }
//               })
//               .catch(() => {
//                 tooltip.html("<p>Error fetching records</p>");
//               });
//           }
//         })
//         .on("mousemove", function (event) {
//           tooltip
//             .style("left", `${event.pageX + 10}px`)
//             .style("top", `${event.pageY - 28}px`);
//         })
//         .on("mouseout", function () {
//           tooltip.transition().duration(500).style("opacity", 0);
//         });

//       const labels = svg
//         .selectAll(".city-label")
//         .data(citiesGeojson.features)
//         .enter()
//         .append("text")
//         .attr("class", "city-label")
//         .attr("transform", function (d, i) {
//           const centroid = path.centroid(d);
//           const offset = i % 2 === 0 ? -14 : 14; // Stagger labels vertically
//           return `translate(${centroid[0]},${centroid[1] + offset})`;
//         })
//         .attr("dy", ".25em")
//         .text((d) => d.properties.district);
//     }
//   }, [districtColors]);

//   if (loading) {
//     return (
//       <div>
//         <Loader loader={loading} size={30} />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <FilterDiv
//         selectedMonth={selectedMonth}
//         selectedYear={selectedYear}
//         setSelectedMonth={setSelectedMonth}
//         setSelectedYear={setSelectedYear}
//         handleFilter={handleFilter}
//         handleReset={handleReset}
//       />

//       <svg id="map" width="1200" height="1200"></svg>

//       <FooterContent />
//     </div>
//   );
// };

// export default InteractiveStateAndCityMap;

// const FooterContent = () => {
//   return (
//     <div className="colorContainer">
//       <div className="inContainer">
//         <p>Very High</p>
//         <div className="veryHigh"></div>
//       </div>

//       <div className="inContainer">
//         <p>High</p>
//         <div className="high"></div>
//       </div>

//       <div className="inContainer">
//         <p>Moderate</p>
//         <div className="moderate"></div>
//       </div>

//       <div className="inContainer">
//         <p>Low</p>
//         <div className="low"></div>
//       </div>

//       <div className="inContainer">
//         <p>Very Low</p>
//         <div className="veryLow"></div>
//       </div>
//     </div>
//   );
// };

// // records.forEach((record) => {
// //   output += `<div class='map_data'>
// //                       <strong>${record.State_Name}, ${record.District_Name}</strong>
// //                      DRI_Category: ${record.DRI_Category} | DRI Scrore : ${record.DRI_Score}<br>
// //                      GLP (Rs Cr): ${record.GLP_RsCr} | No. of AC ('000): ${record.NoOfAccounts_K} No. of UB ('000): ${record.NoOfUB_K} | No. of Fis: ${record.NoOfFI}<br>
// //                       <strong>RADAR</strong>
// //                       Ring Leader: ${record.R_RL} | External Inciter:${record.R_EI} Risky Area: ${record.R_RA} | Negative Area: ${record.R_NA}
// //                       <strong>MFIN-CGRM (during ${record.Date}):</strong> Query: ${record.CGRM_Q} | Complaints: ${record.CGRM_C} Resolved: ${record.CGRM_R} | Pending ${record.CGRM_P} (as on ${record.Date})
// //                   </div>`;
// // });