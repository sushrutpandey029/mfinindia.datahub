import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Box,
  Typography,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";

class EBCategoryIndustryGp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBarChart: true, // Show bar chart by default
    };
  }

  toggleBarChartVisibility = () => {
    this.setState((prevState) => ({
      showBarChart: !prevState.showBarChart,
    }));
  };

  render() {
    const { categoryIndustrySeries } = this.props;

    if (
      !categoryIndustrySeries ||
      !categoryIndustrySeries.length ||
      !categoryIndustrySeries[0].data
    ) {
      return (
        <div style={{ paddingBottom: "20px" }}>
          <p>Loading...</p>
        </div>
      );
    }

    const data = categoryIndustrySeries[0].data;

    // Pie chart data
    const pieChartKeys = ["active", "non_standard", "others"];
    const pieChartData = {
      series: pieChartKeys.map((key) => parseFloat(data[key]) || 0),
      labels: ["Active", "Non-Standard", "Others"],
    };

    const pieChartOptions = {
      chart: {
        type: "pie",
        height: 300,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            if (config.dataPointIndex === pieChartKeys.indexOf("others")) {
              this.toggleBarChartVisibility();
            }
          },
        },
      },
      labels: pieChartData.labels,
      title: {
        text: "Category - Industry",
        align: "center",
        style: { fontSize: "16px", fontWeight: "bold", color: "#263238" },
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "14px",
      },
    };

    // Stacked Bar Chart Data (Breakdown of "Others")
    const barChartSeries = [
      { name: "Absconding", data: [parseFloat(data["absconding"]) || 0] },
      { name: "Deceased", data: [parseFloat(data["deceased"]) || 0] },
      { name: "Exited", data: [parseFloat(data["exited"]) || 0] },
      { name: "Resigned", data: [parseFloat(data["resigned"]) || 0] },
      { name: "Retired", data: [parseFloat(data["retired"]) || 0] },
      { name: "Terminated", data: [parseFloat(data["terminated"]) || 0] },
    ];

    const barChartOptions = {
      chart: {
        type: "bar",
        height: 300,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "60%", // Adjust column width
        },
      },
      // title: {
      //   text: "Breakdown of Others",
      //   align: "center",
      //   style: { fontSize: "16px", fontWeight: "bold", color: "#263238" },
      // },
      xaxis: {
        categories: [""], // Single vertical bar
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "14px",
      },
    };

    return (
      <Card style={{ paddingBottom: "20px" }}>
        <CardActionArea>
          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center">
              {/* Stacked Bar Chart (Initially Visible) */}
              {this.state.showBarChart && (
                <Box width="50%">
                  <Typography variant="h6" align="center" gutterBottom>
                    Breakdown of "Others"
                  </Typography>
                  <ReactApexChart
                    options={barChartOptions}
                    series={barChartSeries}
                    type="bar"
                    height={300}
                  />
                </Box>
              )}

              {/* Pie Chart */}
              <Box width="50%">
                <ReactApexChart
                  options={pieChartOptions}
                  series={pieChartData.series}
                  type="pie"
                  height={300}
                />
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default EBCategoryIndustryGp;