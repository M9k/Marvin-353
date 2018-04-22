/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import NavbarCustom from './custom/NavbarCustom';
import Footer from './custom/Footer';
import ErrorTaker from './custom/ErrorTaker';
import AlertDismissable from './custom/Alert';

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.children = props.children;
    this.links = props.route.links;
    this.loggedIn = props.route.loggedIn;
  }
  render() {
    let alertUrl;
    if (this.props.location.query !== null &&
      this.props.location.query.message !== null &&
      this.props.location.query.type) {
      alertUrl = (
        <AlertDismissable
          type={this.props.location.query.type}
          message={this.props.location.query.message}
        />
      );
    }
    return (
      <div>
        <NavbarCustom links={this.links} loggedIn={this.loggedIn} />
        <div className="container">
          {alertUrl}
          <ErrorTaker>
            {this.children}
          </ErrorTaker>
        </div>
        <Footer />
      </div>
    );
  }
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  route: PropTypes.object.isRequired, // eslint-disable-line
};
export default (PageContainer);
