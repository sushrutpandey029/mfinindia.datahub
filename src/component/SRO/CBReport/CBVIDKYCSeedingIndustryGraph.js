import * as React from "react";
import {
  Card,
  CardContent,
  CardActionArea
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func';
class CBVIDKYCSeedingIndustryGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    if (props.iKycSeedingSeries !== state.series) {
      return {
        series: props.iKycSeedingSeries,
        options: {
          chart: {
            type: "line",
          },
          colors: ["#083EC1", "#E3800A"],
          tooltip: {
            y: {
              formatter: (value) => { return value > 100 ? number_format(value) : value.toFixed(2) },
            },              
          },
          dataLabels: {
            enabled: true,
           //offsetY: -5,
            formatter: function (val, opt) {
              return val > 100 ? val.toFixed(2) : val.toFixed(2)
            },
            background: {
              enabled: true,
              foreColor: '#fff',
              borderRadius: 1,
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
          stroke: {
            width: [4, 4]
          },
          title: {
            text: "KYC and VID fill rate – Industry",
            align: "left",
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
          xaxis: {
            categories: props.iDataSubmissionLabels,
            title: {
            },
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
              text: "Number of records",
              style: {
                color: 'white',
              },
            },
            labels: {
              show: false,
              formatter: function (value) {
                return value;
              }
            },
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 500,
          },
        },
      };
    }
    return null;
  }

  render() {
    return (
      <>

        <Card style={{ paddingBottom: "20px" }}>
          <CardActionArea>
            <CardContent>
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="line"
                height={450}
              />
            </CardContent>
          </CardActionArea>
        </Card>

      </>
    );
  }
}
export default CBVIDKYCSeedingIndustryGraph;
