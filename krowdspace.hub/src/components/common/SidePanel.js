import React, { Component } from 'react';

class SidePanel extends Component {
  render() {
    return (
      <div
        style={{
          width: this.props.width,
          marginTop: this.props.top,
          background: '#fff',
          zIndex: '1',
          boxShadow: '-2px 1px 4px 0 rgba(0, 0, 0, 0.12)'
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
SidePanel.defaultProps = {
  width: 0,
  top: 0
};
export { SidePanel };
