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
    pledged_object: colors.purple,
    funding_object: colors.orange
  };
  const pledged_object = {
      chart: {
        borderWidth: 0,
        label: 'Daily Pledged',
        backgroundColor: chart_colors.pledged_object,
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
  const funding_object = {
      chart: {
        label: 'Daily Funded',
        data: [],
        type: 'line',
        fill: false,
        lineTension: 0,
        backgroundColor: chart_colors.funding_object,
        borderColor: chart_colors.funding_object,
        borderCapStyle: 'round',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        borderWidth: 0,
        pointBackgroundColor: chart_colors.funding_object,
        pointBorderColor: chart_colors.funding_object,
        pointBorderWidth: 1,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: chart_colors.funding_object,
        pointHoverBorderColor: chart_colors.funding_object,
        pointHoverBorderWidth: 1,
        pointRadius: 2,
        pointHitRadius: 10,
        yAxisID: 'funded-percent-data'
      },
      options: {
        id: 'funded-percent-data',
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
            return core.formatNumber(value, 'percentage-abbr');
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
export class ProfileFundingChart extends Component {
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
        const { funded, pledged, dates } = metrics;
        const tooltip_labels = [];

        chart.labels = [...dates];
        if(funded.length){
            funding_object.chart.data = [...funded];
            options_object.scales.yAxes.push(funding_object.options);
            chart.datasets.push(funding_object.chart);
            tooltip_labels.push({
                label: ` Funded:`,
                format: 'percentage'
            });
        }
        if(pledged.length){
            pledged_object.chart.data = [...pledged];
            options_object.scales.yAxes.push(pledged_object.options);
            chart.datasets.push(pledged_object.chart);
            tooltip_labels.push({
                label: ` Pledged:`,
                format: 'currency-int'
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
          <React.Fragment>
            <div className="profile-project-header-wrapper">
              <h2 className="profile-project-title">Funding Progress</h2>
              <h2 className="profile-project-title">{core.formatNumber(metrics.pledged_total, 'currency-int')} ({core.formatNumber(metrics.funded_total, 'percentage')})</h2>
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