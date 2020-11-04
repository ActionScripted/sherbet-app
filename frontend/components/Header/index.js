import React from 'react';

import NavBar from 'Components/Header/NavBar';
import { AuthContext } from 'Contexts';


export default class Header extends React.Component {
  render() {
    return (
      <AuthContext.Consumer>
        {user => (
          <NavBar user={user} />
        )}
      </AuthContext.Consumer>
    );
  }
}
