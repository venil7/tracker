import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// needs to be before routes for styled components to kick in
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoutes } from './routes';
import { newStore } from './store';
import registerServiceWorker from './registerServiceWorker';
import auth from './Auth/Auth';

// const routes = createRoutes(auth);
const store = newStore();

const App = () => <Provider store={store}>{createRoutes(auth)}</Provider>;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
