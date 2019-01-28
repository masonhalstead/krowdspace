import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Body, Navigation, SidePanel } from 'krowdspace.components';
import {SideNav} from './components/common/SideNav';
import krowdspace from './resources/images/krowdspace-logo.svg';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import * as async from './routes/index';
import { setDisplay } from './actions/index';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faGamepad, faFutbol, faBook, faHeadphones, faUtensils, faFilm, faPalette, faDesktop } from '@fortawesome/free-solid-svg-icons';
library.add(far, fas, faGamepad, faFutbol, faBook, faHeadphones, faUtensils, faFilm, faPalette, faDesktop);
const mapStateToProps = state => {
  return {
    display: state.display
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setDisplay: display => dispatch(setDisplay(display))
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
    let { active_menu, side_panel_width } = this.props.display;
    side_panel_width = !!side_panel_width ? 0 : 46;
    this.props.setDisplay({
      active_menu: !active_menu,
      side_panel_width: side_panel_width
    });
  };
  render() {
    const { navbar_height, side_panel_width, active_menu } = this.props.display;
    return (
      <BrowserRouter basename="/">
        <div className="krowdspace-container">
          <Navigation
            height={navbar_height}
            img={krowdspace}
            logo_link={'/'}
            active_menu={active_menu}
            handleMenuClick={this.handleMenuClick}
            handleLogoutClick={this.handleLogoutClick}
            handleProfileClick={this.handleProfileClick}
            padding={5}
            navigation={[
              {
                name: 'Games',
                link: '/explore'
              },
              {
                name: 'Crowdfunding',
                link: '/'
              },
              {
                name: 'Sports',
                link: '/'
              }
            ]}
          />
          <Body width={side_panel_width} top={navbar_height}>
            <Switch>
              {/* First Level Routes */}
              <Route exact path="/hub" component={async.HubWrapper} />
              {/* Redirect Routes */}
              <Redirect exact from="/" push to="/hub" />
              <Route component={async.HubWrapper} />
            </Switch>
            {/* <Footer /> */}
          </Body>
          <SidePanel width={side_panel_width} top={navbar_height}>
            <SideNav side_nav={[
              {icon: 'book', title: 'Publishing, Comics', link: '/'},
              {icon: 'utensils', title: 'Publishing, Comics', link: '/'},
              {icon: 'film', title: 'Publishing, Comics', link: '/'},
              {icon: 'headphones', title: 'Publishing, Comics', link: '/'},
              {icon: 'gamepad', title: 'Publishing, Comics', link: '/'},
              {icon: 'palette', title: 'Publishing, Comics', link: '/'},
              {icon: 'desktop', title: 'Publishing, Comics', link: '/'}
            ]}/>
          </SidePanel>
        </div>
      </BrowserRouter>
    );
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedApp);
export default App;
