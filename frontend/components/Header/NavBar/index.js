/**
 * Header: NavBar
 *
 * TODO: move/remove/abstract routes
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import Logo from 'Images/logo.svg';


function BulmaNavLink(props) {
  return (
    <NavLink
      activeClassName="is-active"
      className="navbar-item"
      exact
      to={props.to}
    >{props.children}</NavLink>
  );
}


export class UserMenu extends React.Component {
  constructor(props) {
    super(props);

    this.dropdown = React.createRef();

    this.handleClickOutside= this.handleClickOutside.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(evt) {
    if (this.dropdown.current && !this.dropdown.current.contains(evt.target)) {
      this.dropdown.current.classList.remove('is-active');
    }
  }

  handleDropdownClick() {
    this.dropdown.current.classList.toggle('is-active');
  }

  render() {
    const user = this.props.user;

    if (user.isAuthenticated) {
      return (
        <>
          <div className="navbar-item has-dropdown" ref={this.dropdown}>
            <a className="navbar-link" onClick={this.handleDropdownClick}>{user.username}</a>
            <div className="navbar-dropdown">
              <div className="navbar-item">Settings</div>
              <hr className="navbar-divider" />
              <Link className="button is-light" to="/logout/">Sign Out</Link>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="navbar-item">
          <div className="buttons">
            <Link className="button is-primary" to="/register/">
              <strong>Sign up</strong>
            </Link>
            <Link className="button is-light" to="/login/">Log in</Link>
          </div>
        </div>
      );
    }
  }
}


export default class NavBar extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={Logo} alt="Sherbet: Home" />
          </Link>

          <a
            aria-expanded="false"
            aria-label="menu"
            className="navbar-burger burger"
            data-target="navbarBasicExample"
            role="button"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <BulmaNavLink to="/">Home</BulmaNavLink>
            {user.isAuthenticated &&
              <BulmaNavLink to="/users/">Users</BulmaNavLink>
            }
          </div>

          <div className="navbar-end">
            <UserMenu user={user} />
          </div>
        </div>
      </nav>
    );
  }
}
