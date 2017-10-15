import React from 'react';
import { Link } from 'react-router-dom';
import { branch, renderNothing } from 'recompose';

const authOnlyEnhancer = branch(props => !props.authenticated, renderNothing);
const AuthLink = authOnlyEnhancer(props => (
  <Link className="nav-link" to={props.to ? props.to : ''} {...props}>
    {props.children}
  </Link>
));

export { authOnlyEnhancer, AuthLink };
