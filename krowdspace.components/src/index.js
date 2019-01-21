import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faBars, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import Navigation from './components/Navigation';
import Loading from './components/Loading';

library.add(far, fas, faBars, faUserCircle, faSignOutAlt);

ReactDOM.render(<App />, document.getElementById('root'));

export {
  Navigation,
  Loading
};