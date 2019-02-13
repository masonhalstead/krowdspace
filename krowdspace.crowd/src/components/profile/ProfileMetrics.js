import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ProfileMetrics = ({likes,project_count, projects, views, comments }) => {
    return (
        <React.Fragment>
<div className="profile-right-wrapper">
            <div className="profile-metric-icon">
            <FontAwesomeIcon icon={['fas', 'heart']} />
            </div>

            <div className="profile-metric-content">
              <p >{likes}</p>
              <p style={{fontSize: '12px'}}>Likes</p>
            </div>
        </div>
        <div className="profile-right-wrapper">
            <div className="profile-metric-icon">
            <FontAwesomeIcon icon={['fas', 'heart']} />
            </div>

            <div className="profile-metric-content">
              <p >{project_count}</p>
              <p style={{fontSize: '12px'}}>Projects</p>
            </div>
        </div>
        <div className="profile-right-wrapper">
            <div className="profile-metric-icon">
            <FontAwesomeIcon icon={['fas', 'heart']}/>
            </div>

            <div className="profile-metric-content">
              <p >{comments}</p>
              <p style={{fontSize: '12px'}}>Comments</p>
            </div>
        </div>
        <div className="profile-right-wrapper">
            <div className="profile-metric-icon">
            <FontAwesomeIcon icon={['fas', 'heart']} />
            </div>

            <div className="profile-metric-content">
              <p >{views}</p>
              <p style={{fontSize: '12px'}}>Views</p>
            </div>
        </div>
        <div className="profile-right-wrapper">
            <div className="profile-metric-icon">
            <FontAwesomeIcon icon={['fas', 'heart']}/>
            </div>

            <div className="profile-metric-content">
              <p >{projects}</p>
              <p style={{fontSize: '12px'}}>Owned</p>
            </div>
        </div>

        </React.Fragment>
    )
}