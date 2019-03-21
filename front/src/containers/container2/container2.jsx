import React from 'react';

import { Spinner } from '../../components';
import logo from '../../logo.svg';

export class Container2 extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        2
        <Spinner />
      </div>
    );
  }
}
