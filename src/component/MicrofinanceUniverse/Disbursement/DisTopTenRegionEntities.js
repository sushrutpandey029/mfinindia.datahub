import * as React from "react";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func'
class DisTopTenRegionEntities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  static getDerivedStateFromProps(props, state) {
    if (props.topTenRegionEntitiesSeries !== state.series) {
      return {

        series: props.topTenRegionEntitiesSeries,
        options: {
          chart: {
            type: 'bar',
            height: 650,
            stacked: true,
            toolbar: {
              show: true
            },
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: 0,
                offsetY: 0
              }
            }
          }],
          stroke: {
            width: 1,
            colors: ['#fff']
          },
          title: {
            text: props.topTenRegionEntitiesTitle,
            align: 'left'
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
          dataLabels: {
            formatter: (val) => {
              return val.toFixed(0) + '%'
            },
            style: {
              fontSize: '13px',
              colors: ['#000000'],
              fontWeight: 500,
              fontFamily: "sans-serif"
            }
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              columnWidth: '30%',
              dataLabels: {
                total: {
                  enabled: false,
                  style: {
                    fontSize: '13px',
                    fontFamily: "sans-serif",
                    fontWeight: 500
                  }
                },
              }
            },
          },
          xaxis: {
            //  type: 'datetime',
            categories: props.topTenRegionEntitiesLabels,
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
          },
          yaxis: {
            title: {
            },
            labels: {
              show:false,
              formatter: function (value) {
                return number_format(value);
              }
            },
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontSize: '15px',
            fontFamily: 'sans-serif',
            fontWeight: 500,
          },
          fill: {
            opacity: 1
          }
        }
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
export default DisTopTenRegionEntities;
