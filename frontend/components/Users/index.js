import React from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

import { settings } from 'Settings';


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


export default function Users() {
  const { loading, error, data } = useQuery(USERS, {
    pollInterval: settings.graphql.query.pollInterval,
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
