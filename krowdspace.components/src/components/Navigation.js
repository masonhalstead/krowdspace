import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../core/navigation.css';

class Navigation extends Component {
  render() {
    const { height, img, padding, navigation, active_menu, logo_link } = this.props;
    const style = {
        logo_block: {
            padding: `${padding}px`
        },
        navigation_block: {
            padding: `${padding}px 0px`
        }
    }
    const active = active_menu ? {
        borderLeft: '1px solid #c0c0c0',
        color: '#4472f8'
    } : {}
    return (
        <div className="navigation-container">
            <div className="flex-wrapper">
                <div className="logo-block" style={style.logo_block}>
                <Link to={logo_link}>
                <img className="logo-image" src={img} alt="Krowdspace Logo" height={height-(padding*2)}/>
                </Link>
                </div>
                <div className="navigation-block" style={style.navigation_block}>
                { navigation.map((item, index) => {
                    return <Link to={item.link} key={index}><p className="navigation-item">{item.name}</p></Link>
                })}
                </div>
                <div className="actions-block">
                <div className="action-wrapper" onClick={this.props.handleProfileClick}>
                    <FontAwesomeIcon
                    icon={['fas', 'user-circle']}
                    className="action-icon"
                    size="lg"
                    />
                </div>
                <div className="action-wrapper" onClick={this.props.handleLogoutClick}>
                    <FontAwesomeIcon
                    icon={['fas', 'sign-out-alt']}
                    className="action-icon"
                    size="lg"
                    />
                </div>
                <div className="action-wrapper" style={active} onClick={this.props.handleMenuClick}>
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
Navigation.defaultProps = {
    navigation: [],
    padding: 5,
    height: 44,
    logo_link: '/',
    border: false
}
export default Navigation;