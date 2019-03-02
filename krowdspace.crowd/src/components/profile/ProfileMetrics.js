import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ProfileMetrics = ({
  likes,
  project_count,
  projects,
  viewed,
  comments
}) => {
  const metrics = [{
    text: 'Likes',
    class: 'profile-metric-icon-top',
    icon: ['fas', 'heart'],
    data: likes
  },{
    text: 'Viewed',
    class: 'profile-metric-icon',
    icon: ['fas', 'laptop'],
    data: viewed
  },{
    text: 'Total Projects',
    class: 'profile-metric-icon-right',
    icon: ['fas', 'chart-pie'],
    data: project_count
  },{
    text: 'Comments',
    class: 'profile-metric-icon-right',
    icon: ['far', 'thumbs-up'],
    data: comments
  },{
    text: 'Owned',
    class: 'profile-metric-icon',
    icon: ['fas', 'tasks'],
    data: projects
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
