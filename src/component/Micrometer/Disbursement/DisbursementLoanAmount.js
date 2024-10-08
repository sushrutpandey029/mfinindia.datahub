import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class DisbursementLoanAmount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    if (props.pDisbursementSeries !== state.series) {
      return {
        series: props.pDisbursementSeries,
        options: {
          chart: {
            type: 'bar',
            height: 350,
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
              fontSize: '14px',
              fontFamily: "Helvetica"
            }
          },
          tooltip: {
            x: {
              format: "dd MMM yyyy"
            },
            y: {
              formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
            },
          },
          plotOptions: {
            bar: {
              endingShape: "rounded",
              columnWidth: '20%',
             // borderRadius: 2,
              dataLabels: {
                orientation: 'vertical',
                position: 'bottom',
              },
            },
          },
          toolbar: {
            show: true //Disable toolbar
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 500,
          },
          markers: {
            size: [3, 3]
          },
          fill: {
            opacity: 1,
            colors: [
              '#2B60AD',
              '#39B1AC'
            ],
            type: 'solid',
          },
          colors: ["#2B60AD", "#39B1AC"],
          stroke: {
            show: true,
            width: [3, 4],
            colors: ["#2B60AD", "#39B1AC"]
            },
          title: {
            text: 'Disbursement (Rs Cr)'
          },
          dataLabels: {
            enabled: true,
            //offsetX: 5,
            formatter: function (val, opt) {
              return val > 100 ? number_format(val) : val.toFixed(2)
            },
            background: {
              enabled: true,
              foreColor: '#fff',
             // borderRadius: 2,
              padding: 2,
              opacity: 0.9,
              borderWidth: 0,
              borderColor: '#fff'
            },
            style: {
              fontSize: '15px',
              fontFamily: 'sans-serif',
              fontWeight: 500,
            },
          },
          labels: props.pDisbursementLabels,
          xaxis: {
            //type: 'datetime',
            labels: {
              show: true,
              rotate: 0,
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
export default DisbursementLoanAmount;
