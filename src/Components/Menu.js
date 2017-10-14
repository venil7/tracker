import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { branch, renderNothing } from 'recompose';

const authOnly = branch(props => !props.authenticated, renderNothing);

const AuthButton = authOnly(props => (
  <Button bsStyle="primary" className="btn-margin" {...props}>
    {props.children}
  </Button>
));

class Menu extends Component {
  goto(route: string = '') {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const authenticated = this.props.auth.isAuthenticated();
    const user =
      authenticated && this.props.authentication.userDetails
        ? this.props.authentication.userDetails.name
        : '';
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <span>{user}</span>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={() => this.goto()}
            >
              Home
            </Button>
            <AuthButton
              authenticated={authenticated}
              onClick={() => this.goto('account')}
            >
              account
            </AuthButton>
            <AuthButton
              authenticated={!authenticated}
              onClick={() => this.login()}
            >
              Log In
            </AuthButton>
            <AuthButton
              authenticated={authenticated}
              onClick={() => this.logout()}
            >
              Log out
            </AuthButton>
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

const stateToProps = state => ({ authentication: state.authentication });
const ConnectedMenu = connect(stateToProps)(Menu);
export { ConnectedMenu as Menu };
