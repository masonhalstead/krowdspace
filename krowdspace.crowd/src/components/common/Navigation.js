import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { toggleModal, userLogout } from '../../actions/';
import krowdspace from '../../resources/images/krowdspace-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const mapStateToProps = state => {
  return {
    user: state.user,
    display: state.display
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleModal: modal => dispatch(toggleModal(modal)),
    userLogout: user => dispatch(userLogout(user))
  };
};
class ConnectedNavigation extends Component {
  handleLogoutClick = () => this.props.userLogout();
  handleUserLogin = () => this.props.toggleModal({ user_login: true });
  handleCreateAccount = () => this.props.toggleModal({ create_account: true });
  createUser = () => {
    return (
      <React.Fragment>
        <Button
          onClick={this.handleCreateAccount}
          className="navigation-btn"
          variant="primary"
        >
          Create Account
        </Button>
        <div className="action-wrapper" onClick={this.handleUserLogin}>
          <FontAwesomeIcon
            icon={['fas', 'user-circle']}
            className="action-icon"
            size="lg"
          />
        </div>
        <div className="action-wrapper" onClick={this.handleUserLogin}>
          <FontAwesomeIcon
            icon={['fas', 'ellipsis-v']}
            className="action-icon"
            size="lg"
          />
        </div>
      </React.Fragment>
    );
  };
  activeUser = () => {
    return (
      <React.Fragment>
        <Link className="action-wrapper" to="/profile">
          <FontAwesomeIcon
            icon={['fas', 'user-circle']}
            className="action-icon"
            size="lg"
          />
        </Link>
        <div className="action-wrapper" onClick={this.handleLogoutClick}>
          <FontAwesomeIcon
            icon={['fas', 'sign-out-alt']}
            className="action-icon"
            size="lg"
          />
        </div>
      </React.Fragment>
    );
  };
  render() {
    const {
      padding,
      navigation,
      active_menu,
      user,
      display,
      handleMenuClick
    } = this.props;
    const style = {
      logo_block: {
        padding: `${padding}px`
      },
      navigation_block: {
        padding: `${padding}px 0px`
      }
    };
    const active = active_menu
      ? {
          borderLeft: '1px solid #c0c0c0',
          color: '#4472f8'
        }
      : {};
    return (
      <div className="navigation-container">
        <div className="flex-wrapper">
          <div className="logo-block" style={style.logo_block}>
            <Link to="/">
              <img
                className="logo-image"
                src={krowdspace}
                alt="Krowdspace Logo"
                height={display.navbar_height - padding * 2}
              />
            </Link>
          </div>
          <div className="navigation-block" style={style.navigation_block}>
            {navigation.map((item, index) => {
              switch(item.type) {
                case 'link':
                  return <Link to={item.link} key={index}>
                  <p className="navigation-item">{item.name}</p>
                </Link>
                case 'modal':
                  return <p key={index} onClick={() => this.props.toggleModal({ [item.link]: true })} className="navigation-item">{item.name}</p>
                
                default:
                  return null
              }
            })}
          </div>
          <div className="actions-block">
            {user.active ? this.activeUser() : this.createUser()}
            <div
              className="action-wrapper"
              style={active}
              onClick={handleMenuClick}
            >
              <FontAwesomeIcon
                icon={['fas', 'bars']}
                className="action-icon"
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ConnectedNavigation.defaultProps = {
  navigation: [],
  padding: 5,
  height: 44,
  border: false
};
const Navigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedNavigation);
export default Navigation;
