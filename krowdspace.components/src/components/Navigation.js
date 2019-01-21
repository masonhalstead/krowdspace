import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../core/navigation.css';

class Navigation extends Component {
  render() {
    const { height, img, padding, navigation } = this.props;
    const style = {
        container: {
            height: height,
            padding: `0px ${padding}px`
        },
        logo_block: {
            padding: `${padding}px 0px`
        },
        navigation_block: {
            padding: `${padding}px 0px`
        },
        actions_block: {
            paddingLeft: padding
        }
    }
    return (
        <div className="navigation-container" style={style.container}>
            <div className="flex-wrapper">
                <div className="logo-block" style={style.logo_block}>
                    <img src={img} alt="Krowdspace Logo" height={height-(padding*2)}/>
                </div>
                <div className="navigation-block" style={style.navigation_block}>
                { navigation.map((item, index) => {
                    return <Link to={item.link} key={index}><p className="navigation-item">{item.name}</p></Link>
                })}
                </div>
                <div className="actions-block" style={style.actions_block}>
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
                <div className="action-wrapper" onClick={this.props.handleMenuClick}>
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
    height: 44
}
export default Navigation;