import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { core } from 'resources/js/krowdspace.core';

export const ProfileProjects = ({ projects }) => {
  return (
    <React.Fragment>
    <div className="profile-bottom-wrapper">
    <h2 className="profile-project-title">Projects</h2>
    <div className="projects-wrapper">
       { projects.map((project, index) => {
           const { metrics } = project;
           const percent = metrics.funded_total > 100 ? 100 : metrics.funded_total;
         return (
            <div key={index} className="profile-project-wrapper">
                <div className="profile-project-container">
                    <div className="profile-project-actions">
                    <Link to ={`/profile/projects/${project.uri}`}>
                        <img src={project.image_url} className="profile-project-image" alt={project.name} />
                    </Link>
                    <div>
                    <div className="profile-metric-icon-right">
                            <Link to ={`/profile/projects/${project.uri}`}>
                                <FontAwesomeIcon icon={['fas', 'chart-pie']} />
                            </Link>
                        </div>
                        <div className="profile-metric-icon-right profile-metric-margin">
                            <FontAwesomeIcon icon={['fas', 'sync-alt']} />
                        </div>
                    </div>
                    </div>
                    <div className="profile-project-content">
                        <h3 className="profile-project-header">{project.name}</h3>
                        <p className="profile-project-short-link" >
                            <a href={project.short_link} target="_blank" rel="noopener noreferrer">{project.short_link.toLowerCase()}</a>
                        </p>
                        <p className="profile-project-description">{project.description}</p>
                        <div className="profile-project-metrics">
                        <p>{metrics.currency_symbol}{Math.round(metrics.pledged_total).toLocaleString('en')} Funded</p>
                        <p>{core.formatNumber(metrics.funded_total, 'percentage')}</p>
                        </div>
                        <div className="profile-percent-bar">
                            <span className="profile-project-percent" style={{width: `${percent}%`}}></span>
                        </div>
                    </div>
                </div>
            </div>
         )
       })
       }
    </div>
    </div>
    </React.Fragment>
  );
};
