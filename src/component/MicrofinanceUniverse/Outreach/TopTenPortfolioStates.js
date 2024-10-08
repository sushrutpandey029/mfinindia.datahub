import * as React from "react";
import ReactDOM from "react-dom";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
import { BaseUrl,GlpGrowthTrendsApi } from "../../url/url";
import axios from "axios";
import authHeaders from "../../Service/AuthHeaders";
class TopTenPortfolioStates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  
  static getDerivedStateFromProps(props, state) {
    if (props.topTenStateSeries !== state.series) {
      return {
        series: props.topTenStateSeries,
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
              fontSize: '14px',
              fontFamily: "Helvetica"
            }
          },
          toolbar: {
            show: true //Disable toolbar
          },
          fill: {
            opacity: 1,
            colors: [
              '#2B60AD',
              '#39B1AC',
              '#B853A0',
              '#ED1590',
              '#BD1E22'
            ],
            type: 'solid',
          },
          stroke: {
            show: true,
            width: [4, 0],
            colors: ["white"]
          },
          title: {
            text: props.topTenStateTitle
          },
          dataLabels: {
            enabled: true,
           // offsetX: -2,
           // offsetY: -5,
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
              fontSize: '14px',
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
            },
          },
          plotOptions: {
            bar: {
              endingShape: "rounded",
              columnWidth: '60%',
              //borderRadius: 2,
              dataLabels: {
                orientation: 'vertical',
                position: 'bottom',
              },
            },
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 500,
          },
          colors: ["#2B60AD", "#39B1AC", "#B853A0", "#ED1590", "#BD1E22"],
          tooltip: {
            y: {
              formatter: (value) => { return number_format(value) },
            },              
          },
          labels: props.topTenStateLabels,
          xaxis: {
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
          yaxis: [{
            title: {
              text: '',
            },
            labels: {
              show: false,
               },
          
          }, {
            opposite: true,
            title: {
              text: ''
            },
            labels: {
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
export default TopTenPortfolioStates;
