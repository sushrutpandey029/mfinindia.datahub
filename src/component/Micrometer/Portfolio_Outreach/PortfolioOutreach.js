import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class PortfolioOutreach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  static getDerivedStateFromProps(props, state) {
    if (props.pELOBThousandSeries !== state.series) {
      return {
        series: props.pELOBThousandSeries,
        options: {
          chart: {
            type: 'line',
            stacked: false,
            height:480
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
            y: {
              formatter: (value) => { return number_format(value) },
            },
          },
          plotOptions: {
            bar: {
              endingShape: "rounded",
              columnWidth: '35%',
            //  borderRadius: 2,
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
          colors: ["#2B60AD", "#39B1AC", "#FDBF11", "#B853A0", "#69AB44"],
          fill: {
            opacity: 1,
            colors: [
              '#2B60AD',
              '#39B1AC',
              "#FDBF11",
              "#B853A0",
              "#69AB44"
            ],
            type: 'solid',
          },
          stroke: {
            show: true,
            width: [4, 4, 4, 4, 4],
          },
          title: {
            text: 'Employee/Loan Officers/Branches in ‘000'
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
          markers: {
            size: [4]
          },
          labels: props.pELOBThousandLables,
          xaxis: {
            // type: 'datetime',
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
          }, {
            opposite: true,
            title: {
              text: ''
            },
            labels: {
              show: false,
               },
          },{
            seriesName: 'Clients',
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
          },]
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
export default PortfolioOutreach;
