import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

/* this.links EXAMPLE
  const links = [
    {
      path: 'courses',
      label: 'Manage courses',
    },
    {
      path: 'confirmteacher',
      label: 'Confirm Teachers',
    },
  ];
 */

class NavbarCustom extends React.Component {
  constructor(props) {
    super(props);
    this.loggedIn = props.loggedIn;
    this.links = props.links;
  }

  render() {
    let logout = null;
    const links = [];
    if (this.loggedIn) {
      logout = <NavItem>Logout</NavItem>;
      for (let i = 0; i < this.links.length; i += 1) {
        links.push(<NavItem href={this.links[i].path}>{this.links[i].label}</NavItem>);
      }
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
            <NavItem href="price">
              Price
            </NavItem>
            <NavItem href="help">
              Help
            </NavItem>
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
