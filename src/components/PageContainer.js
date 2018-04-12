import React from 'react';
import PropTypes from 'prop-types';
import NavbarCustom from './NavbarCustom';
import Footer from './Footer';


class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.children = props.children;
  }
  render() {
    return (
      <div>
        <NavbarCustom />
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
};
export default (PageContainer);
