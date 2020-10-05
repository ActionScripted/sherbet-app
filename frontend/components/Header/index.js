import React from 'react';

import NavBar from 'Components/Header/NavBar';
import { UserContext } from 'Contexts';

export class Header extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {user => (
          <NavBar user={user} />
        )}
      </UserContext.Consumer>
    );
  }
}
