import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class DisburEntitiesWise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  static getDerivedStateFromProps(props, state) {
    if (props.dTopTenMfiLoanAmtSeries !== state.series) {
      return {
        series: props.dTopTenMfiLoanAmtSeries,
        options: {
          chart: {
            type: 'bar',
            height: 430,
          },
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                position: 'top',
              },
            }
          },
          tooltip: {
            y: {
              formatter: (value) => { return number_format(value) },
            },
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 500,
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [0],
            textAnchor: 'end',
            offsetX: 80,
            offsetY: 0,
            style: {
              fontFamily: 'sans-serif',
              fontSize: '15px',
              fontWeight: "bold",
              colors: ["#000000"],
            },
            formatter: function (val, opt) {
              return number_format(val)
            },
          },
          toolbar: {
            show: true //Disable toolbar
          },
          colors: ["#39B1AC", "#ED1590", "#F78F6D"],
          title: {
            text: 'Top 10 MFIs, Loan Amount Disbursed (Rs Cr)'
          },
          xaxis: {
            categories: props.dTopTenMfiLoanAmtLabels,
            labels: {
              formatter: function (value) {
                return number_format(value);
              },
              show: false,
              rotate: 0,
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
export default DisburEntitiesWise;
