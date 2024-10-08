import * as React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import number_format from '../../Unqiue/Common_func';


class EBMonthlyEnquirynhitMemberGp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  static getDerivedStateFromProps(props, state) {
    console.log('ebIInquiryHitSeries',props.ebIInquiryHitSeries);
    if (props.ebIInquiryHitSeries !== state.series) {
      return {
        series: props.ebIInquiryHitSeries,
        options: {
          chart: {
            type: 'bar',
            height: 650,
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
          colors: ["#083EC1", "#E3800A"],
          fill: {
            opacity: 1,
            colors: [
              '#083EC1',
              '#E3800A'
            ],
            type: 'solid',
          },
          plotOptions: {
            bar: {
              // borderRadius: 10,
               columnWidth: '70%',
               dataLabels: {
                 orientation: 'vertical',
                 position: 'bottom',
               }
             },
          },
          tooltip: {
            y: {
              formatter: (value) => { return number_format(value); },
            },
          },
          dataLabels: {
            formatter: (val) => {
              return number_format(val)
            },
            style: {
              fontSize: '15px',
              colors: ['#ffffff'],
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
            }
          },
          stroke: {
            width: [4, 4]
          },
          title: {
            text: "Industry : Monthly Total Enquiries and hit volume",
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
            categories: props.ebIndustryLabels,
            title: {
              // text: "",
            },
            //type: 'datetime',
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
        },
      };
    }
    return null;
  }

  render() {
    console.log("ebIInquiryHitSeries", this.props.ebIInquiryHitSeries)
    return (
      <>
        <Card style={{ paddingBottom: "20px" }}>
          <CardActionArea>
            <CardContent>
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                height={450}
              />
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
  }
}
export default EBMonthlyEnquirynhitMemberGp;
