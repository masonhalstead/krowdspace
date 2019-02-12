import React, { Component } from 'react';
import spinner from '../../resources/images/ks-loading.gif';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    settings: state.settings
  };
};
const Loading = () => {
  return (
    <div className="ks-loading-flex">
      <img
        className="ks-loading-spinner"
        src={spinner}
        alt="Loading Krowdspace Dashboard"
      />
    </div>
  );
};
class LoadingOverlayConnected extends Component {
  render() {
    const { loading } = this.props.settings;
    return loading && <Loading />;
  }
}

const LoadingOverlay = connect(mapStateToProps)(LoadingOverlayConnected);
export default LoadingOverlay;
