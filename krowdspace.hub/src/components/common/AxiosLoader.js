import React, { Component } from 'react';
import cognSpinner from '../../resources/images/cogn-spinner.gif';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    settings: state.settings
  };
};
const LoadingModal = () => {
  return (
    <div className="cogn-loading-flex">
      <img
        className="cogn-loading-spinner"
        src={cognSpinner}
        alt="Loading Cognitiv Dashboard"
      />
    </div>
  );
};
class AxiosLoaderConnected extends Component {
  render() {
    const { axios_loader } = this.props.settings;
    return axios_loader && <LoadingModal />;
  }
}

const AxiosLoader = connect(mapStateToProps)(AxiosLoaderConnected);
export default AxiosLoader;
