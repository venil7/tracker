import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Home, Account, Callback, Menu } from './Components/index';
import history from './history';
import auth from './Auth/Auth';

const handleCallback = nextState => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

const createRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={props => <Menu auth={auth} {...props} />} />
        <Route
          path="/"
          exact={true}
          render={props => <Home auth={auth} {...props} />}
        />
        <Route
          path="/account"
          exact={true}
          render={props => <Account auth={auth} {...props} />}
        />
        <Route
          path="/callback"
          render={props => {
            handleCallback(props);
            return <Callback auth={auth} {...props} />;
          }}
        />
      </div>
    </Router>
  );
};

export { createRoutes };
