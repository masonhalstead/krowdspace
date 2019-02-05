import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SideNav extends Component {
  render() {
    return (
      <div className="side-nav-container">
      {this.props.side_nav.map((nav, index) => {
        return (
          <div key={index} className="side-nav-wrapper">
          <FontAwesomeIcon
              icon={['fas', nav.icon]}
              className="action-icon"
              size="lg"
              />
          </div>
        )
      })}
      </div>
    );
  }
}
SideNav.defaultProps = {
  side_nav: []
};
export { SideNav };
