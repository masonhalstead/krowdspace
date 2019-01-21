import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loading, Navigation } from 'krowdspace.components';
//import {Navigation} from './components/common/Navigation';
import krowdspace from './resources/images/krowdspace-logo.svg';

import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import * as async from './routes/index';

const mapStateToProps = state => {
  return {
    display: state.display
  };
};
class ConnectedApp extends Component {
  handleProfileClick = () => {
    console.log('dsfsdf');
  };
  handleLogoutClick = () => {
    console.log('dsfsdf');
  };
  handleMenuClick = () => {
    console.log('dsfsdf');
  };
  render() {
    const { navbar_height, side_panel_width } = this.props.display;
    return (
      <BrowserRouter basename="/">
        <div className="krowdspace-body">
          <Navigation
            height={44}
            padding={5}
            navigation={[
              {
                name: 'Hub',
                link: '/'
              },
              {
                name: 'Games',
                link: '/'
              },
              {
                name: 'Sports',
                link: '/'
              }
            ]}
            img={krowdspace}
            handleMenuClick={this.handleMenuClick}
            handleLogoutClick={this.handleLogoutClick}
            handleProfileClick={this.handleProfileClick}
          />
          <div className="row krowdspace-content">
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
                  <Route exact path="/hub" component={async.HubWrapper} />
                  {/* Redirect Routes */}
                  <Redirect exact from="/" push to="/hub" />
                  <Route component={async.HubWrapper} />
                </Switch>
              </div>
              {/* <Footer /> */}
            </div>
          </div>
          {/* Loading */}
          {/* <Loading axios_loader={false} img={krowdspace}/> */}
        </div>
      </BrowserRouter>
    );
  }
}

const App = connect(mapStateToProps)(ConnectedApp);
export default App;
