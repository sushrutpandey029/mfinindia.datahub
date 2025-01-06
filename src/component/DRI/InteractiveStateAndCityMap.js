import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./InteractiveStateAndCityMap.css";
import Loader from "../common/Loader";

const FilterDiv = ({
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    handleFilter,
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

                setMonths(data.months || []);
                setYears(data.years || []);
            } catch (error) {
                console.error("Error fetching filter data:", error);
            }
        };

        fetchFilterData();
    }, []);

    return (
        <div className="boxContainer">
            <div>
                <label htmlFor="month">Select Month</label>
                <select
                    id="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="">Select One</option>
                    {months && months.map((month, index) => (
                        <option key={index} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="year">Select Year</label>
                <select
                    id="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="">Select One</option>
                    {years && years.map((year, index) => (
                        <option key={index} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button onClick={handleFilter}>Filter</button>
            </div>
        </div>
    );
};

const InteractiveStateAndCityMap = () => {
    const [districtColors, setDistrictColors] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [loading, setLoading] = useState(false);

    const categoryColors = {
        "Very High": "#c20000",
        "Very Low": "#ffd966",
        "Low": "#aed643",
        "Moderate": "#9cb0e8",
        "High": "#ff5050",
    };

    const handleFilter =async () => {
        setLoading(true);
        await fetchDistrictColors();
        setLoading(false);
    };

    const fetchDistrictColors = async () => {
        try {
            const response = await fetch(
                "https://api.mfinindia.org/api/auth/getdisteictandcategory"
            );
            const data = await response.json();

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

    useEffect(() => {
        fetchDistrictColors();
    }, []);

    useEffect(() => {
        const width = 1200;
        const height = 1200;
        
        const projection = d3
            .geoMercator()
            .scale(1600)
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
                    d3.select(this).style("fill", "#00aaff");
                    tooltip.transition().duration(200).style("opacity", 1);
                    console.log("d.properties.st_nm", d.properties.st_nm);
                    if (d.properties.st_nm) {
                        const baseUrl = "https://api.mfinindia.org/api/auth/fetch_records";
                        const url =
                            selectedMonth && selectedYear
                                ? ` ${baseUrl}/${selectedMonth}/${selectedYear}`
                                : baseUrl;
                        // Replacing jQuery AJAX with fetch
                        fetch(url,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    type: "state",
                                    value: d.properties.st_nm,
                                }),
                            }
                        )
                            .then((response) => response.json())
                            .then((records) => {
                                if (records.length > 0) {
                                    let output = "";
                                    records.forEach((record) => {
                                        output += `<div class='map_data'>
                                        <strong>${record.State_Name}</strong>
                                        GLP (Rs Cr): ${record.GLP_RsCr} | No. of AC ('000): ${record.NoOfAccounts_K} No. of UB ('000): ${record.NoOfUB_K} | No. of Fis: ${record.NoOfFI}<br>
                                        <strong>RADAR</strong>
                                        Ring Leader: ${record.R_RL} | External Inciter:${record.R_EI} Risky Area: ${record.R_RA} | Negative Area: ${record.R_NA}
                                        <strong>MFIN-CGRM (during ${record.Date}):</strong> Query: ${record.CGRM_Q} | Complaints: ${record.CGRM_C} Resolved: ${record.CGRM_R} | Pending ${record.CGRM_P} (as on ${record.Date})
                                    </div>`;
                                    });
                                    tooltip
                                        .html(output)
                                        .style("left", `${event.pageX + 10}px`)
                                        .style("top", ` ${event.pageY - 28}px`);
                                }
                            })
                            .catch(() => {
                                tooltip.html("<p>Error fetching records</p>");
                            });
                    }
                })
                .on("mousemove", function (event) {
                    tooltip
                        .style("left", ` ${event.pageX + 10}px`)
                        .style("top", `${event.pageY - 28}px`);
                })
                .on("mouseout", function () {
                    d3.select(this).style("fill", "#d3d3d3");
                    tooltip.transition().duration(500).style("opacity", 0);
                })
                .on("click", function (event, d) {
                    const state_name = d.properties.st_nm;
                    loadCitiesForState(state_name);
                });

            svg
                .selectAll(".state-label")
                .data(statesGeojson.features)
                .enter()
                .append("text")
                .attr("class", "state-label")
                .attr("transform", function (d) {
                    const centroid = path.centroid(d);
                    return `translate(${centroid[0]},${centroid[1]})`;
                })
                .attr("dy", ".25em")
                .text(function (d) {
                    return d.properties.st_nm;
                });
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
                        fetch(
                            url,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    type: "district",
                                    value: d.properties.district,
                                }),
                                // body: JSON.stringify({ district_name: d.properties.district }),
                            }
                        )
                            .then((response) => response.json())
                            .then((records) => {
                                console.log("district_api", records);
                                if (records.length > 0) {
                                    let output = "";
                                    records.forEach((record) => {
                                        output += `<div class='map_data'>
                                        <strong>${record.District_Name}</strong>
                                       DRI_Category: ${record.DRI_Category} | GLP (Rs Cr): ${record.GLP_RsCr} | No. of AC ('000): ${record.NoOfAccounts_K} No. of UB ('000): ${record.NoOfUB_K} | No. of Fis: ${record.NoOfFI}<br>
                                        <strong>RADAR</strong>
                                        Ring Leader: ${record.R_RL} | External Inciter:${record.R_EI} Risky Area: ${record.R_RA} | Negative Area: ${record.R_NA}
                                        <strong>MFIN-CGRM (during ${record.Date}):</strong> Query: ${record.CGRM_Q} | Complaints: ${record.CGRM_C} Resolved: ${record.CGRM_R} | Pending ${record.CGRM_P} (as on ${record.Date})
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
                    tooltip.transition().duration(500).style("opacity", 0);
                });

            svg
                .selectAll(".city-label")
                .data(citiesGeojson.features)
                .enter()
                .append("text")
                .attr("class", "city-label")
                .attr("transform", function (d) {
                    const centroid = path.centroid(d);
                    return `translate(${centroid[0]},${centroid[1]})`;
                })
                .attr("dy", ".25em")
                .text(function (d) {
                    return d.properties.district;
                });
        }
    }, [districtColors]);

    if(loading) {
        return(
            <div>
                <Loader loader={loading} size={40} />
            </div>
        )
    }

    return (
        <div>
            <FilterDiv
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                setSelectedMonth={setSelectedMonth}
                setSelectedYear={setSelectedYear}
                handleFilter={handleFilter}
            />
            <svg id="map" width="1200" height="1200"></svg>
        </div>
    );
};

export default InteractiveStateAndCityMap;