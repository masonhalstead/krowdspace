import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { core } from 'resources/js/krowdspace.core';

export const ProfileProjectMetrics = ({
  likes,
  backers,
  pledged,
  views,
  comments
}) => {
  const metrics = [{
    text: 'Likes',
    class: 'profile-metric-icon-top',
    icon: ['fas', 'heart'],
    data: core.formatNumber(likes, 'number-abbr') || 0
  },{
    text: 'Views',
    class: 'profile-metric-icon',
    icon: ['fas', 'laptop'],
    data: core.formatNumber(views, 'number-abbr') || 0
  },{
    text: 'Backers',
    class: 'profile-metric-icon-right',
    icon: ['fas', 'tasks'],
    data: core.formatNumber(backers, 'number-abbr') || 0
  },{
    text: 'Comments',
    class: 'profile-metric-icon-right',
    icon: ['far', 'thumbs-up'],
    data: core.formatNumber(comments, 'number-abbr') || 0
  },{
    text: 'Pledged',
    class: 'profile-metric-icon',
    icon: ['far', 'money-bill-alt'],
    data: core.formatNumber(pledged, 'currency-abbr') || 0
  }];
  return (
    <div className="profile-metrics-container">
       { metrics.map((metric, index) => {
         return (
          <div key={index} className="profile-metrics-wrapper">
          <div className={metric.class}>
            <FontAwesomeIcon icon={metric.icon} />
          </div>
  
          <div className="profile-metric-content">
            <p>{metric.data}</p>
            <p className="profile-metrics-text">{metric.text}</p>
          </div>
        </div>
         )
       })
       }
    </div>
  );
};
