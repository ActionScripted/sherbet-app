/**
 * App
 * ---
 */

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import {
  Link,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import { AUTH_LOGIN_URL } from 'Constants';
import { client } from 'Client';
import { Header } from 'Components/Header';
import { HistoryRouter } from 'Components/HistoryRouter';
import { settings } from 'Settings';


const initialState = {
  onUnloadChecks: [],
};



const USERS = gql`
  query {
    users {
      edges {
        node {
          id
          isActive
          username
        }
      }
    }
  }
`;


function Users() {
  const { loading, error, data } = useQuery(USERS, {
    pollInterval: settings.graphql.query.poll_interval,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <nav className="panel">
      <p className="panel-heading">Users</p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input className="input" type="text" placeholder="Search" />
          <span className="icon is-left">
            <span className="material-icons" aria-hidden="true">search</span>
          </span>
        </p>
      </div>
      <p className="panel-tabs">
        <a className="is-active">All</a>
        <a>Active</a>
        <a>Inactive</a>
      </p>

      {data.users.edges.map(({ node }) => (
        <a className="panel-block" key={node.id}>
          {node.isActive
            ? <strong>{node.username}</strong>
            : <>{node.username}</>
          }
        </a>
      ))}
    </nav>
  );
}


export default class App extends React.Component {
  constructor(props) {
    super(props);

    // Window
    this.onUnload = this.onUnload.bind(this);
    // State
    this.state = {...initialState};
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

          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>

          <section className="section">
            <div className="container">

            <Switch>
              <Route exact path="/login" render={() => (window.location = AUTH_LOGIN_URL)} />
              <Route exact path="/users">
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
