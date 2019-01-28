import React, { Component } from 'react';
import cognSpinner from '../../resources/images/cogn-spinner.gif';
export default class AxiosLoader extends Component {
  render() {
    const { axios_loader } = this.props;
    return (
      axios_loader && (
        <div className="cogn-loading-flex">
          <img
            className="cogn-loading-spinner"
            src={cognSpinner}
            alt="Loading Cognitiv Dashboard"
          />
        </div>
      )
    );
  }
}
