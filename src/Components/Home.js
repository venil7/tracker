import React from 'react';
import { connect } from 'react-redux';

const Home = props => {
  const isAuthenticated = props.auth.isAuthenticated();
  return isAuthenticated ? <div>this is home...</div> : <div>unathorized</div>;
};

const stateToProps = state => ({});
const ConnectedHome = connect(stateToProps)(Home);
export { ConnectedHome as Home };
