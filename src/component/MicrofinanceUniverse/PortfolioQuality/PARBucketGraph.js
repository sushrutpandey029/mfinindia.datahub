import * as React from "react";
import ReactDOM from "react-dom";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
import { BaseUrl,GlpGrowthTrendsApi } from "../../url/url"; 
import axios from "axios";
import authHeaders from "../../Service/AuthHeaders";
class PARBucketGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.parBucketGraphSeries !== state.series) {
      return {
        series: props.parBucketGraphSeries,
        options: {
          chart: {
            //height: 350,
            type: "line",
            toolbar: {
              show: true //Disable toolbar
            },
          },
            colors: ["#2B60AD", "#39B1AC", "#69AB44", "#ED1590"],
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
              colors: ["#2B60AD", "#39B1AC", "#69AB44", "#ED1590"]
            },
            markers: {
              size: [4]
            },
          title: {
            text: "PAR Bucket Analysis (%) : All India",
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
          yaxis: [{
            title: {
              text: 'PAR Bucket',
              style: {
                color: 'white',
              },
            },
            labels: {
              show: false,
              formatter: function (val) {
                //return val > 100 ? number_format(val) : val.toFixed(2)
              },
            },
          }],
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
export default PARBucketGraph;
