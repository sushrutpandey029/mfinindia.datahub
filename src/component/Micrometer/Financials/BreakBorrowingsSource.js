import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class BreakBorrowingsSource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    if (props.BreakupBorrowSeries !== state.series) {
      return {
          series:props.BreakupBorrowSeries,
        options: {
          chart: {
            type: 'bar',
            stacked: true,
            height:450
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
              //endingShape: "rounded",
              columnWidth: '30%',
             // borderRadius: 2,
              dataLabels: {
               // orientation: 'vertical',
                position: 'bottom',
              },
            },
          },
          toolbar: {
            show: true //Disable toolbar
          },
          colors: ["#ED1590", "#69AB44", "#2B60AD", "#39B1AC", "#B853A0"],
          fill: {
            opacity: 1,
            colors: [
              '#ED1590',
              '#69AB44',
              '#2B60AD',
              '#39B1AC',
              '#B853A0'
            ],
            type: 'solid',
          },
          stroke: {
          show: true,
          //width: [3, 3, 3, 3],
          colors: ["#ED1590", "#69AB44", "#2B60AD", "#39B1AC", "#B853A0"]
          },
          title: {
            text: 'Breakup of O/S  borrowing (Rs Cr) (as on quarter end)'
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 500,
          },
          dataLabels: {
            enabled: false,
            //offsetY: -8,
            formatter: function (val, opt) {
              return val > 100 ? number_format(val) : val.toFixed(2)
            },
            style: {
              fontSize: '15px',
              color: "#000000",
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
            },
          },
          labels: props.BreakupBorrowLabels,
          xaxis: {
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
          yaxis: [{
            title: {
              text: '',
            },
            labels: {
              show:true,
              formatter: function (value) {
                return number_format(value);
              }
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
        type="bar"
        height={450}
      />
    );
  }
}
export default BreakBorrowingsSource;
