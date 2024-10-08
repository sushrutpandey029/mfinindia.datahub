import React from "react";
import { Card, CardContent, CardActionArea, Box, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";

class EBCategoryGpMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDonutChart: true, // Set to true by default to show the donut chart
    };
  }

  toggleDonutChartVisibility = () => {
    this.setState(prevState => ({
      showDonutChart: !prevState.showDonutChart,
    }));
  };

  render() {
    const { ebcategaryMemberSeries } = this.props;

    if (!ebcategaryMemberSeries || !ebcategaryMemberSeries.length || !ebcategaryMemberSeries[0].data) {
      return (
        <div style={{ paddingBottom: "20px" }}>
          <p>Loading...</p>
        </div>
      );
    }

    // Prepare data for pie chart
    const pieChartKeys = ["active", "non_standard", "others"];
    const pieChartData = {
      series: pieChartKeys.map(key => parseFloat(ebcategaryMemberSeries[0].data[key])),
      labels: pieChartKeys
    };

    const pieChartOptions = {
      chart: {
        width: 380,
        type: 'pie',
        events: {
          dataPointSelection: (event, chartContext, config) => {
            if (config.dataPointIndex === pieChartKeys.indexOf("others")) {
              this.toggleDonutChartVisibility();
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

    // Prepare data for donut chart
    const donutChartKeys = ["abscondingM", "deceasedM", "exitedM", "resignedM", "retiredM", "terminatedM"];
    const donutChartData = {
      series: donutChartKeys.map(key => parseFloat(ebcategaryMemberSeries[0].data[key])),
      labels: donutChartKeys
    };

    const donutChartOptions = {
      chart: {
        type: 'donut',
        height: 300,
      },
      labels: donutChartData.labels,
      title: {
        align: 'right',
        style: {
          fontSize: '20px',
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
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val.toFixed(2) + "%";
        },
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

              {/* Render donut chart for "Other" section */}
              {this.state.showDonutChart && (
                <Box ml={4} width={400}>
                  <Typography variant="h6" style={{ marginBottom: "10px" }}>Sub Set of Others</Typography>
                  <ReactApexChart
                    options={donutChartOptions}
                    series={donutChartData.series}
                    type="donut"
                    height={300}
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
