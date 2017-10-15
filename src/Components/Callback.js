import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserDetailsThunk } from './../Redux/authReducer';

class Callback extends Component {
  render() {
    return <div>loading...</div>;
  }
  componentWillUnmount() {
    const { auth, dispatch } = this.props;
    setTimeout(() => dispatch(getUserDetailsThunk(auth)));
  }
}

const ConnectedCallback = connect()(Callback);
export { ConnectedCallback as Callback };
