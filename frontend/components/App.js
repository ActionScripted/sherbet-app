
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
    <nav className="panel">
      <p className="panel-heading">Users</p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input className="input" type="text" placeholder="Search" />
          <span className="icon is-left">
            <span class="material-icons" aria-hidden="true">search</span>
          </span>
        </p>
      </div>
      <p className="panel-tabs">
        <a className="is-active">All</a>
        <a>Active</a>
        <a>Inactive</a>
      </p>
      <a className="panel-block" key={node.id}>
        {node.isActive
          ? <strong>{node.username}</strong>
          : <>{node.username}</>
        }
      </a>
    </nav>
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
        <section class="section">
          <div class="container">
            <h1 class="title">
              Sherbet
            </h1>
            <p class="subtitle">
              Django, React, GraphQL...ready to rock.
            </p>
          </div>
        </section>
        <section class="section">
          <div class="container">
            <Users />
          </div>
        </section>
      </ApolloProvider>
    )
  }
}
