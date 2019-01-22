import React, { Component } from 'react';

class Body extends Component {
  render() {
    const style = {
      width: `calc(100%-${this.props.width}px)`,
      marginTop: this.props.top
    };
    return (
      <div
        className="body-container"
        style={{
          width: `calc(100%-${this.props.width}px)`,
          marginTop: this.props.top
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
Body.defaultProps = {
  width: 0
};
export { Body };
