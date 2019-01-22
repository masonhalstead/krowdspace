import React, { Component } from 'react';
import '../core/sidepanel.css';

class SidePanel extends Component {
  render() {
    return (
      <div className="sidepanel-container" style={{width: this.props.width, marginTop: this.props.top}}>
      { this.props.children }
      </div>
    );
  }
}
SidePanel.defaultProps = {
  width: 0,
  top: 0
};
export default SidePanel;