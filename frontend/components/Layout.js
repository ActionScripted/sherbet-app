import React from 'react';
import {
  Link,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import { Header } from 'Components/Header';
import { Users } from 'Components/Users';


export class Layout extends React.Component {
  render() {
    return (
      <>
        <Header />

        <section className="section">
          <div className="container">
          </div>
        </section>

        <section className="section">
          <div className="container">

          <Switch>
            <Route exact path="/login/" render={() => (window.location = AUTH_LOGIN_URL)} />
            <Route exact path="/users/">
              <Users />
            </Route>
            <Route path="/">
              <h1 className="title">Sherbet</h1>
              <p className="subtitle">Django, React, GraphQL...ready to rock.</p>
            </Route>
          </Switch>

          </div>
        </section>
      </>
    )
  }
}
