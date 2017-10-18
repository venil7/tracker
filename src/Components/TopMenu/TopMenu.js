import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { NavbarLogo } from './NavbarLogo';
import { logoutThunk, loginThunk } from '../../Redux/reducers';
import { AuthLink } from './AuthLink';
import { AuthButton } from './AuthButton';
import { Avatar } from './Avatar';

class TopMenu extends Component {
  login() {
    const { auth, dispatch } = this.props;
    dispatch(loginThunk(auth));
  }

  logout() {
    const { auth, dispatch } = this.props;
    dispatch(logoutThunk(auth));
  }

  render() {
    const { auth } = this.props;
    const authenticated = auth.isAuthenticated();
    // const user =
    //   authenticated && this.props.authentication.userDetails
    //     ? this.props.authentication.userDetails.name
    //     : '';
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavbarLogo />

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <AuthLink
              authenticated={!authenticated}
              onClick={() => this.login()}
            >
              Login
            </AuthLink>
            <AuthLink to="/api" href="/api" authenticated={authenticated}>
              API
            </AuthLink>
          </ul>
          <form className="form-inline">
            <Avatar auth={auth} authenticated={authenticated} />
            <AuthButton
              className="btn-success"
              authenticated={!authenticated}
              onClick={() => this.login()}
            >
              Login
            </AuthButton>
            <AuthLink
              authenticated={authenticated}
              onClick={() => this.logout()}
            >
              Logout
            </AuthLink>
          </form>
        </div>
      </nav>
    );
  }
}

const stateToProps = state => ({ authentication: state.authentication });
const enhanced = compose(connect(stateToProps));
const EnhancedTopMenu = enhanced(TopMenu);

export { EnhancedTopMenu as TopMenu };
