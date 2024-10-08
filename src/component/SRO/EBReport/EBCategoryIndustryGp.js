import React from "react";
import { Card, CardContent, CardActionArea, Box, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";

class EBCategoryGpMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBarChart: false, // State to manage visibility of the bar chart
    };
  }

  toggleBarChartVisibility = () => {
    this.setState(prevState => ({
      showBarChart: !prevState.showBarChart,
    }));
  };

  render() {
    const { categoryIndustrySeries } = this.props;

    // Ensure categoryIndustrySeries is defined and has the expected structure
    if (!categoryIndustrySeries || !categoryIndustrySeries.length || !categoryIndustrySeries[0].data) {
      return (
        <div style={{ paddingBottom: "20px" }}>
          <p>Loading...</p>
        </div>
      );
    }

    // Prepare data for pie chart
    const pieChartKeys = ["active", "non_standard", "others"];
    const pieChartData = {
      series: pieChartKeys.map(key => parseFloat(categoryIndustrySeries[0].data[key])),
      labels: pieChartKeys
    };

    // ApexCharts options for the pie chart
    const pieChartOptions = {
      chart: {
        width: 380,
        type: 'pie',
        events: {
          // Event handler for clicking on a pie chart segment
          dataPointSelection: (event, chartContext, config) => {
            // If the clicked segment is the "Others" section, toggle the visibility of the bar chart
            if (config.dataPointIndex === pieChartKeys.indexOf("others")) {
              this.toggleBarChartVisibility();
            }
          },
        },
      },
      labels: pieChartData.labels,
      title: {
        text: "Employees category - Member",
        align: "left",
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          color: '#263238'
        }
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontFamily: 'sans-serif',
        fontSize: '15px',
        fontWeight: 500,
      },
    };

    // Prepare data for line chart
    const lineChartKeys = ["abscondingM", "deceasedM", "exitedM", "resignedM", "retiredM", "terminatedM"];
    const lineChartData = {
      series: [
        {
          name: 'Percentage',
          data: lineChartKeys.map(key => parseFloat(categoryIndustrySeries[0].data[key]))
        }
      ],
      categories: lineChartKeys
    };

    // ApexCharts options for the line chart
    const lineChartOptions = {
      chart: {
        type: 'bar',
        height: 100,
        toolbar: {
          show: false,
        },
        stacked: true,
        stackType: '100%',
      },
      title: {
        text: 'Reasons for Employee Attrition',
        align: 'left',
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          color: '#263238'
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '100%',
          distributed: true,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#fff'],
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val + "%";
        },
        offsetX: 0,
        dropShadow: {
          enabled: true,
        },
      },
      xaxis: {
        categories: lineChartData.categories,
        show: false,
      },
      yaxis: {
        show: false,
      },
    };

    return (
      <Card style={{ paddingBottom: "20px" }}>
        <CardActionArea>
          <CardContent>
            <Box display="flex" alignItems="center">
              {/* Render pie chart */}
              <ReactApexChart
                options={pieChartOptions}
                series={pieChartData.series}
                type="pie"
                height={300}
              />

              {/* Render line chart for "Other" section */}
              {this.state.showBarChart && (
                <Box ml={4} width={400}>
                  <Typography variant="h6" style={{ marginBottom: "10px" }}>Reasons for Employee Attrition</Typography>
                  <ReactApexChart
                    options={lineChartOptions}
                    series={lineChartData.series}
                    type="bar"
                    height={100}
                  />
                </Box>
              )}

            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default EBCategoryGpMember;
