import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SidePanel } from 'krowdspace.components';
import Navigation from './components/common/Navigation';
import CreateAccount from './components/modals/CreateAccount';
import Body from 'components/common/Body';
import UserLogin from './components/modals/UserLogin';
import ErrorMessage from './components/modals/ErrorMessage';
import SubmitProject from './components/modals/SubmitProject';
import LoadingOverlay from './components/common/LoadingOverlay';
import { SideNav } from './components/common/SideNav';
import { Scrollbars } from 'react-custom-scrollbars';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import * as async from './routes/index';
import { setDisplay, checkUserAuth } from './actions/index';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faLaptop } from '@fortawesome/free-solid-svg-icons';
import { far, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { fab, faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  faGamepad,
  faFutbol,
  faBook,
  faHeadphones,
  faUtensils,
  faFilm,
  faPalette,
  faDesktop,
  faSignInAlt,
  faEllipsisH,
  faLongArrowAltLeft,
  faHeart,
  faChartPie,
  faTasks,
  faSyncAlt
} from '@fortawesome/free-solid-svg-icons';
library.add(
  far,
  fas,
  fab,
  faGamepad,
  faFutbol,
  faBook,
  faGoogle,
  faHeadphones,
  faUtensils,
  faFilm,
  faPalette,
  faDesktop,
  faSignInAlt,
  faEllipsisH,
  faLongArrowAltLeft,
  faHeart,
  faLaptop,
  faChartPie,
  faThumbsUp,
  faTasks,
  faSyncAlt
);
const mapStateToProps = state => {
  return {
    display: state.display,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setDisplay: display => dispatch(setDisplay(display)),
    checkUserAuth: user => dispatch(checkUserAuth(user))
  };
};
class ConnectedApp extends Component {
  state = {
    navigation: [
      {
        name: 'Explore',
        link: '/explore',
        type: 'link'
      },
      {
        name: 'Project Submission',
        link: 'submit_project',
        type: 'modal'
      },
      {
        name: 'Resources',
        link: '/',
        type: 'link'
      }
    ],
    side_nav: [
      { icon: 'book', title: 'Publishing, Comics', link: '/' },
      { icon: 'utensils', title: 'Publishing, Comics', link: '/' },
      { icon: 'film', title: 'Publishing, Comics', link: '/' },
      { icon: 'headphones', title: 'Publishing, Comics', link: '/' },
      { icon: 'gamepad', title: 'Publishing, Comics', link: '/' },
      { icon: 'palette', title: 'Publishing, Comics', link: '/' },
      { icon: 'desktop', title: 'Publishing, Comics', link: '/' }
    ]
  };
  handleMenuClick = () => {
    const { setDisplay } = this.props;
    let { active_menu, side_panel_width } = this.props.display;

    // Check to see if side panel has a width
    side_panel_width = !!side_panel_width ? 0 : 46;

    // Set display properties
    setDisplay({
      active_menu: !active_menu,
      side_panel_width: side_panel_width
    });
  };
  componentDidMount() {
    const { checkUserAuth } = this.props;
    checkUserAuth();
  }
  render() {
    const { navigation, side_nav } = this.state;
    const { navbar_height, side_panel_width, active_menu } = this.props.display;
    const active = !!localStorage.getItem('token');
    const PrivateRoutes = () => {
      return active ? (
        <React.Fragment>
        <Route exact path="/profile" component={async.ProfileWrapper} />
        <Route exact path="/profile/projects/:project_id" component={async.ProfileProjectWrapper} />
        </React.Fragment>
      ) : (
        <React.Fragment>
        <Redirect from="/profile" push to="/" />
        <Redirect from="/profile/projects/:project_id" push to="/" />
        </React.Fragment>
      );
    };
    return (
      <BrowserRouter basename="/">
        <div className="krowdspace-container">
          <Navigation
            active_menu={active_menu}
            handleMenuClick={this.handleMenuClick}
            padding={5}
            navigation={navigation}
          />
          <Body width={side_panel_width} top={navbar_height}>
            <Scrollbars autoHide={false}>
              <Switch>
                <Route exact path="/" component={async.HomeWrapper} />
                <PrivateRoutes />
                <Route component={async.HomeWrapper} />
              </Switch>
            </Scrollbars>
          </Body>
          <SidePanel width={side_panel_width} top={navbar_height}>
            <SideNav side_nav={side_nav} />
          </SidePanel>
          {/* Loading */}
          <LoadingOverlay />
          {/* Modals */}
          <UserLogin />
          <ErrorMessage />
          <CreateAccount />
          <SubmitProject />
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
