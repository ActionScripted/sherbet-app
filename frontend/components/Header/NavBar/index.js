/**
 * Header: NavBar
 *
 * TODO: move/remove/abstract routes
 */

import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Logo from 'Images/logo.svg';


class BulmaNavLink extends React.Component {
  render() {
    return(
      <NavLink
        activeClassName="is-active"
        className="navbar-item"
        exact
        to={this.props.to}
      >{this.props.children}</NavLink>
    )
  }
}


export default class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={Logo} alt="Sherbet: Home" />
          </a>

          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <BulmaNavLink to="/">Home</BulmaNavLink>
            <BulmaNavLink to="/users/">Users</BulmaNavLink>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button is-primary" to="/register/">
                  <strong>Sign up</strong>
                </Link>
                <Link className="button is-light" to="/login/">Log in</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
