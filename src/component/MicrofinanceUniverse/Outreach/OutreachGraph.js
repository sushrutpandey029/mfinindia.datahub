import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class OutreachGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  static getDerivedStateFromProps(props, state) {
    if (props.disbursementGlp !== state.series) {
      return {
        series: [
          {
            name: 'GLP (Rs Cr)',
            type: 'column',
            data: props.disbursementGlp
          }, 
          {
            name: 'Unique Borrowers (Lk)',
            type: 'line',
            data: props.disbursementNumberOfUniqueBorrowers
          }, 
          {
            name: 'Loan accounts (Lk)',
            type: 'line',
            data: props.disbursementNumbersOfAccounts
          }
        ],
        options: {
          chart: {
            height: 350,
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
            show: true 
          },
          colors: ["#39B1AC", "#2B60AD", "#ED1590"],
          fill: {
            opacity: 1,
            colors: [
              '#39B1AC',
              '#2B60AD'
            ],
            type: 'solid',
          },
          stroke: {
          show: true,
          width: [3, 4, 6],
          colors: ["#39B1AC", "#2B60AD", "#ED1590"]
          },
          title: {
            text: 'Outreach'
          },
          tooltip: {
            y: {
              formatter: (val) => { return val > 100 ? number_format(val) : val.toFixed(2) },
            },
          },
          plotOptions: {
            bar: {
              endingShape: "rounded",
              columnWidth: '50%',
             // borderRadius: 2,
              dataLabels: {
                orientation: 'vertical',
                position: 'bottom',
              },
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
             // borderRadius: 2,
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
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 500,
          },
          markers: {
            size: [4]
          },
          labels: props.disbursementGraphLabels,
          xaxis: {
            categories: props.disbursementGraphLabels,
            labels: {
              show: true,
              //rotate: -90,
              // rotateAlways: true,
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
              show: false
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
export default OutreachGraph;
