/**
 * App
 */

import React from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import Layout from 'Components/Layout';
import { AuthContext } from 'Contexts';


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


export function AppNew() {
  const { loading, error } = useQuery(GET_USER);

  useEffect(() => {
    return function cleanup() {
      // TODO
    };
  });

  return (
    <AuthContext.Provider value={user}>
      <Layout
        error={error}
        loading={loading}
        user={user}
      />
    </AuthContext.Provider>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.onUnload = this.onUnload.bind(this);
    this.state = {onUnloadChecks: []};
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onUnload);
  }

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

  render() {
    return (
      <Query query={GET_USER}>{(result) => {
        let user = useContext(AuthContext);

        if (result.data && result.data.user) {
          user = result.data.user;
        }

        return (
          <AuthContext.Provider value={user}>
            <Layout
              error={result.error}
              loading={result.loading}
              user={user}
            />
          </AuthContext.Provider>
        );
      }}</Query>
    );
  }
}
