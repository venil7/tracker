import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createRoutes } from './routes';
import { newStore } from './store';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';

const routes = createRoutes();
const store = newStore();

const App = () =>
  <Provider store={store}>
    {routes}
  </Provider>;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
