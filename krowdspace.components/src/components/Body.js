import React, { Component } from 'react';
import '../core/body.css';

class Body extends Component {
  render() {
    return (
      <div className="body-container" style={{width: `calc(100%-${this.props.width}px)`, marginTop: this.props.top} }>
      { this.props.children }
      </div>
    );
  }
}
Body.defaultProps = {
  width: 0,
};
export default Body;