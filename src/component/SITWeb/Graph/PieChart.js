import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ data }) => {
  // Prepare chart data
  console.log("data in piechart", data);
  
  // Check if data exists
  if (!data || !Array.isArray(data.data)) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 p-4">
        No data available or data is in incorrect format
      </div>
    );
  }

  const series = data.data.map(item => item.total);
  const labels = data.data.map(item => item.activity_type);
  const totalActivities = series.reduce((a, b) => a + b, 0);

  // Chart options configuration
  const options = {
    chart: {
      type: 'donut',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    labels: labels,
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6', '#14B8A6'],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: {
        width: 12,
        height: 12,
        radius: 6,
        offsetX: -5
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      },
      formatter: function(legendName, opts) {
        return `${legendName}: ${opts.w.globals.series[opts.seriesIndex]}`;
      }
    },
    title: {
      text: `Activity Type Distribution (${data.year || ''})`,
      align: 'center',
      margin: 10,
      offsetY: 10,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#374151'
      }
    },
    tooltip: {
      y: {
        formatter: function(value) {
          const percentage = ((value / totalActivities) * 100).toFixed(1);
          return `${value} activities (${percentage}%)`;
        }
      }
    },
    plotOptions: {
      pie: {
        offsetY: 10, // Push chart down slightly to make room for title
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 600,
              color: '#6B7280',
              offsetY: -5
            },
            value: {
              show: true,
              fontSize: '22px',
              fontWeight: 700,
              color: '#111827',
              offsetY: 5,
              formatter: (val) => {
                return ((val / totalActivities) * 100).toFixed(1) + '%';
              }
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total Activities',
              color: '#6B7280',
              fontSize: '14px',
              fontWeight: 600,
              formatter: () => totalActivities
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    responsive: [{
      breakpoint: 640,
      options: {
        plotOptions: {
          pie: {
            donut: {
              size: '60%'
            }
          }
        },
        legend: {
          fontSize: '12px',
          markers: {
            width: 10,
            height: 10
          }
        }
      }
    }]
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col items-center justify-center">
      <div className="w-full h-full" style={{ maxWidth: '500px', minHeight: '400px' }}>
        <ReactApexChart 
          options={options} 
          series={series} 
          type="donut" 
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default PieChart;