import React from 'react';
import { branch, renderComponent } from 'recompose';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Home, Account, Callback, TopMenu } from './Components/index';
import history from './history';

const handleCallback = auth => nextState => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

const withAuthentication = branch(
  props => !props.authenticated,
  renderComponent(props => <Redirect to="/" />)
);

const AuthAccount = withAuthentication(Account);

const createRoutes = auth => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <TopMenu auth={auth} />
        <div className="container">
          <Switch>
            <Route
              path="/"
              exact={true}
              render={props => <Home {...props} />}
            />
            <Route
              path="/api"
              exact={true}
              render={props => {
                const authenticated = auth.isAuthenticated();
                return (
                  <AuthAccount
                    authenticated={authenticated}
                    auth={auth}
                    {...props}
                  />
                );
              }}
            />
            <Route
              path="/callback"
              render={props => {
                handleCallback(auth)(props);
                return <Callback auth={auth} {...props} />;
              }}
            />
          </Switch>
        </div>
      </div>
    </ConnectedRouter>
  );
};

export { createRoutes };
