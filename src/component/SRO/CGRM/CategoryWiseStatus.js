import * as React from "react";
import number_format from "../../Unqiue/Common_func";
import ReactApexChart from "react-apexcharts";
class CategoryWiseStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          series: [44, 55],
          options: {
            chart: {
              width: 380,
              type: 'pie',
            },
            title: {
                text: "Category wise Status",
                align: "left",
              },
            noData: {
                text: "Loading...",
                align: "center",
                verticalAlign: "bottom",
                offsetX: 0,
                offsetY: 0,
                style: {
                  color: "#000000",
                  fontSize: "14px",
                  fontFamily: "Helvetica",
                },
              },
              legend: {
                position: "bottom",
                horizontalAlign: "center",
                fontFamily: 'sans-serif',
                fontSize: '15px',
                fontWeight: 500,
              },
            labels: ['Open', 'Close'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          }, 
        
        };
      }

  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="pie"
        height={528}
      />
    );
  }
}
export default CategoryWiseStatus;
