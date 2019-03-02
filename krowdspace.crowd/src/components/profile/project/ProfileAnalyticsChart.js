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
    like_object: colors.purple,
    funding_object: colors.orange,
    view_object: colors.blue
  };
  const like_object = {
      chart: {
        borderWidth: 0,
        label: 'Pledged',
        backgroundColor: chart_colors.like_object,
        yAxisID: 'pledged-data'
      },
      options: {
        id: 'pledged-data',
        display: true,
        position: 'left',
        scaleLabel: {
          display: true,
          labelString: 'Daily Pledged'
        },
        ticks: {
          display: true,
          beginAtZero: true,
          suggestedMax: 100,
          userCallback: function(value) {
            return core.formatNumber(value, 'currency-abbr');
          }
        },
        gridLines: {
          display: false
        }
      }
  }
  const view_object = {
    chart: {
      borderWidth: 0,
      label: 'Pledged',
      backgroundColor: chart_colors.view_object,
      yAxisID: 'pledged-data'
    },
    options: {
      id: 'pledged-data',
      display: true,
      position: 'left',
      scaleLabel: {
        display: true,
        labelString: 'Daily Pledged'
      },
      ticks: {
        display: true,
        beginAtZero: true,
        suggestedMax: 100,
        userCallback: function(value) {
          return core.formatNumber(value, 'currency-abbr');
        }
      },
      gridLines: {
        display: false
      }
    }
}
  const backer_object = {
      chart: {
        borderWidth: 0,
      label: 'Pledged',
      backgroundColor: chart_colors.view_object,
      yAxisID: 'pledged-data'
      },
      options: {
        id: 'pledged-data',
        display: true,
        position: 'right',
        scaleLabel: {
          display: true,
          labelString: 'Funded Percent'
        },
        ticks: {
          display: true,
          beginAtZero: true,
          suggestedMax: 100,
          userCallback: function(value) {
            return core.formatNumber(value, 'percentage');
          }
        },
        gridLines: {
          display: true
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
            options_object.scales.yAxes.push(like_object.options);
            chart.datasets.push(like_object.chart);
            tooltip_labels.push({
                label: ` Likes -`,
                format: 'percentage'
            });
        }
        if(backers.length){
            backer_object.chart.data = [...backers];
            options_object.scales.yAxes.push(backer_object.options);
            chart.datasets.push(backer_object.chart);
            tooltip_labels.push({
                label: ` Backers -`,
                format: 'currency-abbr'
            });
        }
        if(views.length){
            view_object.chart.data = [...views];
            options_object.scales.yAxes.push(view_object.options);
            chart.datasets.push(view_object.chart);
            tooltip_labels.push({
                label: ` Views -`,
                format: 'currency-abbr'
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
        const { metrics } = this.props;
        return (
            <div className="profile-chart-wrapper">
            <div className="profile-project-header-wrapper">
            <h2 className="profile-project-title">Project Analytics</h2>
            <h2 className="profile-project-title">{core.formatNumber(metrics.pledged_total, 'currency-int')} ({core.formatNumber(metrics.funded_total, 'percentage')})</h2>
            </div>
            <Bar
                data={chart}
                options={options}
            />
             </div>
        )
    }
}