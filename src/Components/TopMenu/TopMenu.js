import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { NavbarLogo } from './NavbarLogo';
import { logoutThunk, loginThunk } from '../../Redux/authReducer';
import { AuthLink } from './AuthLink';

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
    const authenticated = this.props.auth.isAuthenticated();
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
            <AuthLink
              authenticated={authenticated}
              onClick={() => this.logout()}
            >
              Logout
            </AuthLink>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
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
