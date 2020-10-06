import React from 'react';
import {
  Link,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import { AUTH_LOGIN_URL } from 'Constants';
import { Header } from 'Components/Header';
import { UserContext } from 'Contexts';
import { Users } from 'Components/Users';


export class Layout extends React.Component {
  render() {
    return (
      <>
        <Header />
        <section className="section">
          <div className="container">
            <Switch>
              <Route exact path="/login/">
                <p>
                  <strong>You rock but...</strong> you need to <a href={AUTH_LOGIN_URL}>log in</a>.
                </p>
              </Route>

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
