import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class ALMAnalysis extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        
          series: [
            {
              name: 'Q1 Budget',
              group: 'budget',
              data: [44000, 55000, 41000]
            },
            {
              name: 'Q1 Actual',
              group: 'actual',
              data: [48000, 50000, 40000]
            },
            {
              name: 'Q2 Budget',
              group: 'budget',
              data: [13000, 36000, 20000]
            },
            {
              name: 'Q2 Actual',
              group: 'actual',
              data: [20000, 40000, 25000]
            }
          ],
          options: {
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
            },
            stroke: {
              width: 1,
              colors: ['#fff']
            },
            dataLabels: {
              formatter: (val) => {
                return number_format(val);
              }
            },
            title: {
              text: 'ALM Analysis',
              align: 'left'
            },
            plotOptions: {
              bar: {
                horizontal: false
              }
            },
            xaxis: {
              categories: [
                'Small',
                'Medium',
                'Large'
              ],
              labels: {
                show: true,
                hideOverlappingLabels: true,
                minHeight: 50,
                maxHeight: 50,
                style: {
                    fontSize: '14px',
                    fontFamily: 'Roboto',
                    fontWeight: 800,
                },
              },
            },
            fill: {
              opacity: 1
            },
            colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
            yaxis: {
              labels: {
                formatter: (val) => {
                  return number_format(val);
                }
              }
            },
            legend: {
              position: "bottom",
              horizontalAlign: "center",
              //fontFamily: 'Roboto',
              fontSize: '14px',
              fontWeight: 600,
            },
          },
        
        
        };
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
export default ALMAnalysis;
