import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class NavbarCustom extends React.Component {
  constructor(props) {
    super(props);
    this.loggedIn = props.loggedIn;
    this.links = props.links;
  }

  render() {
    const links = [];
    for (let i = 0; i < this.links.length; i += 1) {
      const path = this.links[i].path.toString();
      if (path !== '/' && path !== 'help' && path !== 'price') {
        links.push( // eslint-disable-line
          <NavItem key={this.links[i].path} href={this.links[i].path}>
            {this.links[i].label}
          </NavItem>);
      }
    }
    let logout = null;
    if (this.loggedIn) {
      logout = <NavItem href="price">Price</NavItem>;
    }

    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Marvin</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {links}
          </Nav>
          <Nav pullRight>
            <NavItem href="price">Price</NavItem>
            <NavItem href="help">Help</NavItem>
            {logout}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavbarCustom.defaultProps = {
  loggedIn: false,
  links: [],
};

NavbarCustom.propTypes = {
  loggedIn: PropTypes.bool,
  // eslint-disable-next-line
  links: PropTypes.array,
};

export default (NavbarCustom);
