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
import { Query } from '@apollo/client/react/components';

import { AUTH_LOGIN_URL } from 'Constants';
import { client } from 'Client';
import { HistoryRouter } from 'Components/HistoryRouter';
import { UserContext } from 'Contexts';
import { Layout } from 'Components/Layout';


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
          <Query query={GET_USER}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>
              return (
                <UserContext.Provider value={data.user}>
                  <Layout />
                </UserContext.Provider>
              )
            }}
          </Query>
        </ApolloProvider>
      </HistoryRouter>
    )
  }
}
