import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserDetailsThunk } from './../Redux/authReducer';

class Callback extends Component {
  render() {
    return <div>loading...</div>;
  }
  componentWillUnmount() {
    setTimeout(() => this.props.dispatch(getUserDetailsThunk(this.props.auth)));
  }
}

// const stateToProps = () => ({});
const ConnectedCallback = connect()(Callback);
export { ConnectedCallback as Callback };
