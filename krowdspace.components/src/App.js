import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import krowdspace from './images/krowdspace-logo.svg';

export default class App extends Component {
  render() {
    return (
        <BrowserRouter basename="/">
        <div className="krowdspace-body">
            <Navigation 
            height={44} 
            padding={5}
            navigation={[{
              name: 'Hub',
              link: '/'
            },{
              name: 'Games',
              link: '/'
            },{
              name: 'Sports',
              link: '/'
            }]}
            img={krowdspace}
            handleMenuClick={this.handleMenuClick}
            handleLogoutClick={this.handleLogoutClick}
            handleProfileClick={this.handleProfileClick}
            />
        </div>
        </BrowserRouter>
    );
  }
}
