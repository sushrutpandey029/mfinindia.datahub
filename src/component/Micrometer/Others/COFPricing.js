import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class COFPricing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [
        {
          data: [
            {
              x: 'Large',
              y: [54, 66, 69, 75, 88]
            },
            {
              x: 'Medium',
              y: [43, 65, 69, 76, 81]
            },
            {
              x: 'Small',
              y: [31, 39, 45, 51, 59]
            }
          ]
        }
      ],
      options: {
        chart: {
          type: 'boxPlot',
          height: 450
        },
        dataLabels: {
          enabled: true
        },
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          //fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 600,
        },
        title: {
          text: 'Cost of funds % Q2 FY 22-23',
          align: 'left'
        },
        plotOptions: {
          bar: {
            horizontal: false,
            barHeight: '100%'
          },
          boxPlot: {
            colors: {
              upper: '#3C90EB',
              lower: '#DF7D46'
            }
          }
        },
      },
    
    
    };
  }


  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="boxPlot"
        height={450}
      />
    );
  }
}
export default COFPricing;
