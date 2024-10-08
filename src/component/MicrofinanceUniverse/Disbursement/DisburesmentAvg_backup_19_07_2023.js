import * as React from "react";
import ReactDOM from "react-dom";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
import { BaseUrl, GlpGrowthTrendsApi } from "../../url/url";
import axios from "axios";
import authHeaders from "../../Service/AuthHeaders";
class DisburesmentAvg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {
        chart: {
          stacked: false,
          type: 'line',
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
            fontFamily: "sans-serif"
          }
        },
        toolbar: {
          show: true //Disable toolbar
        },
        fill: {
          opacity: 1,
          colors: [
            '#39B1AC',
            '#B853A0',
            '#2B60AD'
          ],
          type: 'solid',
        },
        stroke: {
        show: true,
        width: [4, 4, 4, 4],
        colors: ["#39B1AC", "#B853A0", "#2B60AD"]
        },
        title: {
          text: 'Disbursement : Monthly'
        },
        tooltip: {
          y: {
            formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: 5,
          formatter: function (val, opt) {
            return val > 100 ? number_format(val) : val.toFixed(2)
          },
          background: {
            enabled: true,
            foreColor: '#fff',
            //borderRadius: 2,
            padding: 4,
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
        plotOptions: {
          bar: {
            endingShape: "rounded",
            columnWidth: '50%',
            //borderRadius: 2,
            dataLabels: {
              orientation: 'vertical',
              position: 'bottom',
            },
          },
        },
        colors: ["#39B1AC", "#B853A0", "#2B60AD"],
        labels: [],
        xaxis: {
          //type: 'datetime'
          labels: {
            show: true,
           // rotate: -90,
            //rotateAlways: true,
            hideOverlappingLabels: true,
            minHeight: 50,
            maxHeight: 50,
            style: {
              fontSize: '15px',
              fontFamily: 'sans-serif',
              fontWeight: 500,
            },
            axisTicks: {
              show: false,
              borderType: 'solid',
              color: '#78909C',
              height: 6,
              offsetX: 0,
              offsetY: 0
            },
          },
        },
        yaxis: [
          {
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
              color: '#DA7007'
            },
            labels: {
              show : false,
              style: {
                colors: '#DA7007',
              },
              formatter: function (value) {
                return number_format(value);
              }
            },
            title: {
              text: "",
              style: {
                color: '#DA7007',
              }
            },
            tooltip: {
              enabled: true
            }
          },
          {
            seriesName: 'Average loan size (Rs)',
            opposite: true,
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
              color: '#A9A8A7'
            },
            labels: {
              show : false,
              style: {
                colors: '#A9A8A7',
              },
              formatter: function (value) {
                return number_format(value);
              },
            },
            title: {
              text: "",
              style: {
                color: '#A9A8A7',
              }
            },
          },
          {
            seriesName: 'No. of loans disbursed (Lakh)',
            opposite: true,
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
              color: '#0713AD'
            },
            labels: {
              show : false,
              style: {
                colors: '#0713AD',
              },
              formatter: function (value) {
                return number_format(value);
              },
            },
            title: {
              text: "",
              style: {
                color: '#0713AD',
              }
            }
          },
        ],
        markers: {
          size: [4]
        },
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          fontFamily: 'sans-serif',
          fontSize: '15px',
          fontWeight: 500,
        },
      },


    };
  }
  componentDidMount() {
    this.getMicrodisbursementGraphDataMonth();
  }
  async getMicrodisbursementGraphDataMonth() {
    const api = `api/auth/disbursement-disbursement-graph-month`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      this.setState(prevState => ({
        series: response.data.data.series,
        options: {
          ...prevState.options,
          labels: response.data.data.labels,
          xaxis: {
            categories: response.data.data.labels,
          }
        }
      }))
    }).catch((error) => {
      console.log('err', error)
    });
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
export default DisburesmentAvg;
