import React, { Component } from 'react';

class Loading extends Component {
    render() {
        const { axios_loader, img } = this.props;
        return axios_loader && (
          <div className="cogn-loading-flex">
          <img
            className="cogn-loading-spinner"
            src={img}
            alt="Loading Cognitiv Dashboard"
          />
        </div>
        );
      }
}
export default Loading;