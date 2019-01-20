import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
class ConnectedApp extends Component {
  render() {
    return (
      <React.Fragment>
        <p>TESRING</p>
      </React.Fragment>
    );
  }
}

const App = connect(mapStateToProps)(ConnectedApp);
export default App;
