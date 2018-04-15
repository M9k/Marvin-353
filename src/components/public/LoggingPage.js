import React from 'react';
import PropTypes from 'prop-types';
import RedirectToHome from './RedirectToHome';

class Logging extends React.Component {
  componentDidMount() {
    this.props.performLogin();
  }

  render() {
    console.log(this.props.metamask, this.props.account, this.props.loginLoading);
    if (!this.props.metamask) {
      return (
        <div>
          Metamask not found! Please read the <a href="/help">guide</a> for more info!
          <RedirectToHome time={2000} />
        </div>
      );
    }
    if (this.props.account === '' || this.props.account === null) {
      return (
        <div>
          Metamask locked or no address! Please unlock it or create an account and then <a href="/login">reload</a> this page!
        </div>
      );
    }
    if (this.props.loginLoading) {
      return (
        <div>
          Logging...
        </div>
      );
    }
    if (this.props.loginFailed) {
      return (
        <div>
          No user found with this address!
          <RedirectToHome time={2000} />
        </div>
      );
    }
    return (
      <RedirectToHome time={2000} />
    );
  }
}

Logging.propTypes = {
  loginLoading: PropTypes.bool,
  loginFailed: PropTypes.bool,
  metamask: PropTypes.bool,
  account: PropTypes.string,
  performLogin: PropTypes.func,
};

Logging.defaultProps = {
  loginLoading: false,
  loginFailed: false,
  metamask: false,
  account: null,
  performLogin: () => {},
};

export default Logging;
