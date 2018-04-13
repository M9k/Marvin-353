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
    this.children = props.children;
    this.links = props.links;
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

PageContainer.defaultProps = {
  loggedIn: false,
};

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line
  links: PropTypes.array,
  loggedIn: PropTypes.bool,
};
export default (PageContainer);
