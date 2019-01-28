import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { unregister } from './resources/js/react.service_worker';
import App from './App';
import store from './store';
import './resources/scss/index.scss';
import './resources/js/krowdspace.api';

global.store = store;

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );

render(App);

if (module.hot) module.hot.accept('./App', () => render(App));
unregister();
