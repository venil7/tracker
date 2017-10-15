import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StyledButton = styled.button`
  background-color: darkviolet;
  color: palevioletred;
  font-weight: bold;
`;

export class Account extends Component {
  constructor() {
    super();
    this.state = {
      message: 'no data'
    };
  }

  fetch() {
    const { getAccessToken } = this.props.auth;
    const headers = { Authorization: `Bearer ${getAccessToken()}` };
    axios
      .get(`${process.env.REACT_APP_API}/private`, { headers })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }

  render() {
    return (
      <div>
        <h3>api page</h3>
        <h5>api response:</h5>
        <div>
          <code>{this.state.message}</code>
        </div>
        <StyledButton onClick={() => this.fetch()}>fetch from api</StyledButton>
      </div>
    );
  }
}
