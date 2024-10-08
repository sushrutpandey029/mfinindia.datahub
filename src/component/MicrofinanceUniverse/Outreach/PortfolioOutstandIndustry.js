import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func';
import { BaseUrl, GlpGrowthTrendsApi } from "../../url/url";
import axios from "axios";
import authHeaders from "../../Service/AuthHeaders";

class PortfolioOutstandIndustry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log('portfolio-outstanding', props);
    console.log('portfolio-series', props.portfolioOSeries);
    console.log('portfolio-labels', props.portfolioOLabels);

    // Convert string data to numbers
    const seriesData = props.portfolioOSeries.map(series => ({
      ...series,
      data: series.data.map(value => Number(value)) // Convert strings to numbers
    }));

    if (seriesData !== state.series) {
      return {
        series: seriesData,
        options: {
          chart: {
            type: 'line',
            stacked: false,
          },
          noData: {
            text: "Loading...",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: "#000000",
              fontSize: '15px',
              fontFamily: 'sans-serif',
              fontWeight: 500,
            }
          },
          tooltip: {
            y: {
              formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) }, // Ensure numbers are formatted
            },
            fixed: {
              enabled: true,
              position: 'top',
              offsetX: 0,
              offsetY: 0,
            }
          },
          plotOptions: {
            bar: {
              endingShape: "rounded",
              columnWidth: '50%',
              dataLabels: {
                orientation: 'vertical',
                position: 'bottom',
              },
            },
          },
          colors: ["#39B1AC", "#B853A0", "#BD1E22"],
          fill: {
            opacity: 1,
            colors: [
              '#39B1AC',
              '#B853A0',
              '#BD1E22'
            ],
            type: 'solid',
          },
          stroke: {
            show: true,
            width: [3, 3, 4],
            colors: ["#39B1AC", "#B853A0", "#BD1E22"]
          },
          title: {
            text: 'Portfolio Outstanding of the Microfinance Industry (Rs Cr)',
            style: {
              fontSize: '13px'
            }
          },
          markers: {
            size: [4]
          },
          dataLabels: {
            enabled: true,
            offsetX: 1,
            formatter: function (val) {
              return number_format(val);
            },
            background: {
              enabled: true,
              foreColor: '#fff',
              padding: 1,
              opacity: 0.9,
              borderWidth: 0,
              borderColor: '#fff'
            },
            style: {
              fontSize: '15px',
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
            },
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontSize: '15px',
            fontFamily: 'sans-serif',
            fontWeight: 500,
          },
          labels: props.portfolioOLabels,
          xaxis: {
            labels: {
              show: true,
              hideOverlappingLabels: true,
              minHeight: 50,
              maxHeight: 50,
              style: {
                fontSize: '15px',
                fontFamily: 'sans-serif',
                fontWeight: 500,
              },
            },
          },
          yaxis: [{
            title: {
              text: '',
            },
            labels: {
              // formatter: (val) => val.toFixed(2),
              show:false,
            },
            min: 0, // Set minimum value for y-axis
            max: Math.max(...seriesData.map(series => Math.max(...series.data))) * 1.1 // Dynamic max limit
          }, {
            opposite: true,
            title: {
              text: '',
            },
            labels: {
              // formatter: (val) => val.toFixed(2),
              show: false,
            },
          }]
        },
      };
    }
    return null;
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="line"
        height={450}
      />
    );
  }
}

export default PortfolioOutstandIndustry;