import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import * as async from './routes/index';
import AxiosLoader from './components/common/AxiosLoader';

const mapStateToProps = state => {
  return {
    display: state.display
  };
};
class ConnectedApp extends Component {
  render() {
    const { navbar_height, side_panel_width } = this.props.display;
    return (
      <BrowserRouter basename="/">
        <div className="container-fluid cogn-body">
          {/* <AdminPanel navbar_height={navbar_height} /> */}
          <div className="row cogn-content">
            {/* <AdminSidePanel
              navbar_height={navbar_height}
              side_panel_width={side_panel_width}
            /> */}
            <div
              className="cogn-views"
              id="body-content"
              style={{
                marginTop: navbar_height,
                marginRight: side_panel_width,
                width: `calc(100% - ${side_panel_width}px)`
              }}
            >
              <div className="cogn-react-switch">
                <Switch>
                  {/* First Level Routes */}
                  <Route exact path="/hub" component={async.LandingWrapper} />
                  {/* Redirect Routes */}
                  <Redirect exact from="/" push to="/hub" />
                  <Route component={async.LandingWrapper} />
                </Switch>
              </div>
              {/* <Footer /> */}
            </div>
          </div>
          {/* Loading */}
          <AxiosLoader />
        </div>
      </BrowserRouter>
    );
  }
}

const App = connect(mapStateToProps)(ConnectedApp);
export default App;
