import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import { core } from 'resources/js/krowdspace.core';

const colors = {
    red: '#f74f6f',
    orange: '#ffc966',
    grey: '#777777',
    blue: 'rgba(55, 160, 225, .8)',
    purple: 'rgba(147,112,219, .8)',
    green: '#71eeb8',
    blue_opacity: 'rgba(255, 255, 255, 0.4)'
  };
  const chart_colors = {
    like_object: colors.red,
    backer_object: colors.orange,
    view_object: colors.purple
  };
  const like_object = {
      chart: {
        borderWidth: 0,
        label: 'Daily Likes',
        backgroundColor: chart_colors.like_object,
        yAxisID: 'pledged-data'
      }
  }
  const view_object = {
    chart: {
      borderWidth: 0,
      label: 'Daily Views',
      backgroundColor: chart_colors.view_object,
      yAxisID: 'pledged-data'
    },
    options: {
      id: 'pledged-data',
      display: true,
      position: 'right',
      scaleLabel: {
        display: true,
        labelString: 'Internal Analytics'
      },
      ticks: {
        display: true,
        beginAtZero: true,
        suggestedMax: 100,
        userCallback: function(value) {
          return core.formatNumber(value, 'number-abbr');
        }
      },
      gridLines: {
        display: true
      }
    }

}
  const backer_object = {
      chart: {
        data: [],
        type: 'line',
        label: 'Daily Backers',
        fill: false,
        lineTension: 0,
        backgroundColor: chart_colors.backer_object,
        borderColor: chart_colors.backer_object,
        borderCapStyle: 'round',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        borderWidth: 0,
        pointBackgroundColor: chart_colors.backer_object,
        pointBorderColor: chart_colors.backer_object,
        pointBorderWidth: 1,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: chart_colors.backer_object,
        pointHoverBorderColor: chart_colors.backer_object,
        pointHoverBorderWidth: 1,
        pointRadius: 2,
        pointHitRadius: 10,
      yAxisID: 'external-data'
      },
      options: {
        id: 'external-data',
        display: true,
        position: 'left',
        scaleLabel: {
          display: true,
          labelString: 'External Analytics'
        },
        ticks: {
          display: true,
          beginAtZero: true,
          suggestedMax: 100,
          userCallback: function(value) {
            return core.formatNumber(value, 'number-abbr');
          }
        },
        gridLines: {
          display: false
        }
      }
  }
  const options_object = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        boxWidth: 13,
        fontSize: 12
      }
    },
    layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10
        }
    },
    tooltips: {
      mode: 'label',
      position: 'nearest',
      xPadding: 20,
      callbacks: {}
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: true,
            userCallback: function(value) {
                return core.formatNumber(value, 'date');
              }
          },
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: []
    }
  }
export class ProfileAnalyticsChart extends Component {
    state = {
        data: [],
        chart: {
            labels: [],
            datasets: []
          },
        options: options_object
    }
    setInitialChart = () => {
        const { metrics } = this.props;
        const { chart } = this.state;
        const { likes, backers, views, dates } = metrics;
        const tooltip_labels = [];


        chart.labels = [...dates];
        if(likes.length){
            like_object.chart.data = [...likes];
            chart.datasets.push(like_object.chart);
            tooltip_labels.push({
                label: ` Likes:`,
                format: 'number-int'
            });
        }
        if(backers.length){
            backer_object.chart.data = [...backers];
            options_object.scales.yAxes.push(backer_object.options);
            chart.datasets.push(backer_object.chart);
            tooltip_labels.push({
                label: ` Backers:`,
                format: 'number-int'
            });
        }
        if(views.length){
            view_object.chart.data = [...views];
            chart.datasets.push(view_object.chart);
            options_object.scales.yAxes.push(view_object.options);
            tooltip_labels.push({
                label: ` Views:`,
                format: 'number-int'
            });
        }

        options_object.tooltips.callbacks = {
            title: function(label) {
                return moment(label[0].xLabel).format('MMM D');
            },
            label: function(label) {
              if (!isNaN(label.yLabel)) {
                return `${
                  tooltip_labels[label.datasetIndex].label
                } ${core.formatNumber(
                  label.yLabel,
                  tooltip_labels[label.datasetIndex].format
                )}`;
              }
              return;
            }
          };
        this.setState({
            data: metrics,
            chart: chart,
            options: options_object
        });
    }
    componentDidMount(){
        this.setInitialChart();
    }
    componentDidUpdate(){
        const { metrics } = this.props;
        const { data } = this.state;
        if(JSON.stringify(metrics) !== JSON.stringify(data)){
            this.setInitialChart();
        }
    }
    render() {
        const { chart , options} = this.state;
        return (
          <React.Fragment>
            <div className="profile-project-header-wrapper">
              <h2 className="profile-project-title">Project Analytics</h2>
              <h2 className="profile-project-title"></h2>
            </div>
            <div className="profile-chart-wrapper">
              <div className="profile-chart-container">
                <Bar
                    data={chart}
                    options={options}
                />
              </div>
             </div>
          </React.Fragment>
        )
    }
}