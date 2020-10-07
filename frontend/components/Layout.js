import React from 'react';
import {
  Link,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import Header from 'Components/Header';
import Home from 'Components/Home';
import Login from 'Components/Login';
import Users from 'Components/Users';


export default class Layout extends React.Component {
  render() {
    return (
      <>
        <Header />
        <section className="section">
          <div className="container">
            <Switch>
              <Route exact path="/login/" component={Login} />
              <Route exact path="/users/" component={Users} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </section>
      </>
    )
  }
}
