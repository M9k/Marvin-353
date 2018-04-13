import React from 'react';
import PropTypes from 'prop-types';
import NavbarCustom from './NavbarCustom';
import Footer from './Footer';

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

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.children = props.children;
    // eslint-disable-next-line
    this.links = props.links;
    // eslint-disable-next-line
    this.loggedIn = props.loggedIn;
  }
  render() {
    return (
      <div>
        <NavbarCustom links={this.links} loggedIn={this.loggedIn} />
        <div className="container">
          {this.children}
        </div>
        <Footer />
      </div>
    );
  }
}

PageContainer.propType = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line
  links: PropTypes.array,
  loggedIn: PropTypes.bool,
};
export default (PageContainer);
