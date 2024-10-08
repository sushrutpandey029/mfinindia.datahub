import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../Unqiue/Common_func'
class ClientAccountTrend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static getDerivedStateFromProps(props, state) {
    if (props.clientAccountTrendsSeries !== state.series) {
      return {
        series: props.clientAccountTrendsSeries,
        options: {
          chart: {
            height: 350,
            type: "line",
            toolbar: {
              show: true //Disable toolbar
            },
          },
          plotOptions: {
            line: {
              endingShape: "rounded",
              columnWidth: '50%',
              borderRadius: 2,
              dataLabels: {
                orientation: 'vertical',
                position: 'bottom',
              },
            },
          },
          fill: {
            opacity: 1,
            colors: [
              '#69AB44',
              '#BD1E22'
            ],
            type: 'solid',
          },
          colors: ["#69AB44", "#BD1E22"],
          dataLabels: {
            enabled: true,
            offsetY: -5.5,
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
            width: [4, 4],
            colors: ["#69AB44", "#BD1E22"]
          },
          title: {
            text: "Unique Borrowers and Accounts Trend",
            align: "left",
          },
          markers: {
            size: [4]
          },
          labels: props.xaxis,
          xaxis: {
            categories: props.xaxis,
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
            //type: 'datetime'
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
            },
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 500,
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
              fontWeight: 'bold',
            }
          },
        }
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
        height={410}
      />
    );
  }
}
export default ClientAccountTrend;
