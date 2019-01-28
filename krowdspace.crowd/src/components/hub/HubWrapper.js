import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
class HubWrapper extends Component {
  render() {
    return (
      <Scrollbars autoHide={false} className="advertiser-campaigns-body-fixed">
        <div className="hub-wrapper">
          <h1>Krowdspace Hub</h1>
          <p>
            At Krowdspace, our goal is to unify the crowdfunding community.
            Krowdspace members will receive exclusive rewards for backing
            projects and project owners gain access to our easy to use
            promotional tools and resources to take their campaigns to the next
            level.
          </p>
        </div>
      </Scrollbars>
    );
  }
}
export default HubWrapper;
