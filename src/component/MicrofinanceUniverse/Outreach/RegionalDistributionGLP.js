import * as React from "react";
import ReactDOM from "react-dom";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
import { BaseUrl,GlpGrowthTrendsApi } from "../../url/url";
import axios from "axios";
import authHeaders from "../../Service/AuthHeaders";
class RegionalDistributionGLP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      
    };
  }

  componentDidMount() {
    this.getRegionalDistribution();
  }
  async getRegionalDistribution() {
    const api = `api/auth/outreach-regional-distribution-graph-data`;
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

  static getDerivedStateFromProps(props, state) {
    if (props.regionalGraphSeries !== state.series) {
      return {
        series: props.regionalGraphSeries,
        options: {
          chart: {
            //height: 350,
            type: "line",
            toolbar: {
              show: true //Disable toolbar
            },
          },
          colors: ["#ED1590", "#69AB44", "#2B60AD", "#FDBF11", "#BD1E22"],
          tooltip: {
              y: {
                formatter: (value) => { return value+'%' },
              },              
            },
            dataLabels: {
              enabled: true,
              offsetX: 2,
              formatter: function (val, opt) {
                return val > 100 ? number_format(val) : val.toFixed(2)
              },
              background: {
                enabled: true,
                foreColor: '#fff',
                //borderRadius: 2,
                padding: 2,
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
            markers: {
              size: [5, 5, 5, 5, 5]
            },
          stroke: {
            show: true,
            width: [4, 4, 4, 4, 4],
            colors: ["#ED1590", "#69AB44", "#2B60AD", "#FDBF11", "#BD1E22"],
          },
          title: {
            text: "Regional Distribution of GLP",
            align: "left",
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
          labels: props.regionGraphOptionsLabel,
          xaxis: {
            categories:  props.regionGraphOptionsLabel,
            title: {
             // text: "",
            },
            //type: 'datetime',
            labels: {
              show: true,
              hideOverlappingLabels: true,
              minHeight: 50,
              maxHeight: 50,
              style: {
                fontFamily: 'sans-serif',
                fontSize: '15px',
                fontWeight: 500,
              },
            },
          },
          yaxis: {
            title: {
              text: "Number of records",
              style: {
                color: 'white',
              },
            },
            labels: {
              show: false,
              formatter: function (value) {
                return value+'%';
              }
            },
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 500,
          },
        }
      }

    }
    return null; // No change to state
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
export default RegionalDistributionGLP;
