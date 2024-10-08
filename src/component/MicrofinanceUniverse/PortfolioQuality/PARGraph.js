import * as React from "react";
import ReactDOM from "react-dom";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
import { BaseUrl, GlpGrowthTrendsApi } from "../../url/url";
import axios from "axios";
import authHeaders from "../../Service/AuthHeaders";
class PARGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],

    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.parGraphSeries !== state.series) {
      return {
        series: props.parGraphSeries,
        options: {
          chart: {
            //height: 350,
            type: "line",
            toolbar: {
              show: true //Disable toolbar
            },
          },
          colors: ["#BD1E22", "#FDBF11", "#69AB44", "#39B1AC"],
          tooltip: {
            y: {
              formatter: (value) => { return value.toFixed(2) + '%' },
            },
          },
          dataLabels: {
            enabled: true,
            offsetY: -5,
            formatter: function (val, opt) {
              return val > 100 ? number_format(val) : val.toFixed(2)
            },
            background: {
              enabled: true,
              foreColor: '#fff',
              borderRadius: 2,
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
          stroke: {
            show: true,
            width: [4, 4, 4, 4],
            colors: ["#BD1E22", "#FDBF11", "#69AB44", "#39B1AC"]
          },
          markers: {
            size: [4]
          },
          title: {
            text: "PAR Analysis (%)  : All India",
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
              fontFamily: 'sans-serif',
              fontSize: '15px',
              fontWeight: 500,
            }
          },
          markers: {
            size: 5,
          },
          xaxis: {
            categories: props.parGraphLabels,
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
            title: {
              // text: "",
            },
            //type: 'datetime',
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
                return value.toFixed(2) + '%';
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
        },
      }

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
export default PARGraph;
