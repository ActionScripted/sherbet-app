
/**
 * App
 * ---
 */

import React from 'react';
import { ApolloClient } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';


const initialState = {
  onUnloadChecks: [],
};

// TODO: MOVE THIS
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/graphql'
});


const USERS = gql`
  query {
    allUsers {
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
  const { loading, error, data } = useQuery(USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allUsers.edges.map(({ node }) => (
    <div key={node.id}>
      <p>
        {node.username} (active: {node.isActive ? 'true' : 'false'})
      </p>
    </div>
  ));
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
      <ApolloProvider client={client}>
        <h1>App (React)</h1>
        <p>Hello, I'm the app.</p>
        <Users />
      </ApolloProvider>
    )
  }
}
