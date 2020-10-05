/**
 * App
 * ---
 */

import React from 'react';
import {
  ApolloProvider,
  gql,
  useQuery
} from '@apollo/client';
import {
  Link,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { Query } from '@apollo/client/react/components';

import { AUTH_LOGIN_URL } from 'Constants';
import { client } from 'Client';
import { Header } from 'Components/Header';
import { HistoryRouter } from 'Components/HistoryRouter';
import { Users } from 'Components/Users';


const GET_USER = gql`
  query {
    user {
      dateJoined
      email
      firstName
      isActive
      isAuthenticated
      lastName
      username
    }
  }
`;


export default class App extends React.Component {
  constructor(props) {
    super(props);

    // Window
    this.onUnload = this.onUnload.bind(this);

    // State
    this.state = {
      onUnloadChecks: [],
      user: null,
    };
  }

  /**
   * Component added to tree.
   * Runs once.
   */
  componentDidMount() {
    window.addEventListener('beforeunload', this.onUnload);
  }

  /**
   * Component queued for removal from tree.
   * Runs once.
   */
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload);
  }


  /**
   * App-level unload; runs checks (if any).
   * Keep people from losing changes, mostly.
   * Or do other evil stuff.
   */
  onUnload(evt) {
    if (this.state.onUnloadChecks.length > 0) {
      let blockUnload = false;

      // Check our checks
      this.state.onUnloadChecks.forEach(unloadCheck => {
        if (unloadCheck()) blockUnload = true;
      });

      if (blockUnload) {
        // Per the spec, prevent default
        evt.preventDefault();
        // Older browsers and chrome need this
        evt.returnValue = 'You have unsaved changes! Are you sure you want to leave?';
      }
    }
  }


  /**
   * THE MAIN EVENT (well...not an event).
   */
  render() {
    return (
      <HistoryRouter>
        <ApolloProvider client={client}>

          <Header />

          <section className="section">
            <div className="container">
              <Query query={GET_USER}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                  return (
                    <div>Hey, {data.user.username}</div>
                  )
                }}
              </Query>
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
        </ApolloProvider>
      </HistoryRouter>
    )
  }
}
