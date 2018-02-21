import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userAction } from '../../reducers/user';

class Logging extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cantLoginUntilReload: false };
  }
  componentDidMount() {
    this.props.tryLogin();
  }

  render() {
    if (!this.props.metamask) {
      this.setState({ cantLoginUntilReload: true });
      return (
        <div>
          Metamask not found! Please read the <a href="/help">guide</a> for more info!
        </div>
      );
    }
    if (this.props.account === null || this.state.cantLoginUntilReload) {
      this.setState({ cantLoginUntilReload: true });
      return (
        <div>
          Metamask locked or no address! Please unlock it or create an account and then <a href="/login">reload</a> this page!
        </div>
      );
    }
    if (this.props.isGoing) {
      return (
        <div>
          Please wait for the blockchain...
        </div>
      );
    }
    if (!this.props.isLogged) {
      return (
        <div>
          Logging...
        </div>
      );
    }
    setTimeout(window.location.replace('/'), 2000);
    return (<div>Logged! If you are not redirect to the homepage in 5 seconds <a href="/">click here</a></div>);
  }
}

Logging.propTypes = {
  isGoing: PropTypes.bool,
  isLogged: PropTypes.bool,
  metamask: PropTypes.bool,
  account: PropTypes.string,
  tryLogin: PropTypes.func,
};

Logging.defaultProps = {
  isGoing: false,
  isLogged: false,
  metamask: false,
  account: null,
  tryLogin: null,
};

const mapStateToProps = state => ({
  isGoing: state.user.trylogin,
  isLogged: state.user.logged,
  metamask: state.user.metamask,
  account: state.user.account,
});

function mapDispatchToProps(dispatch) {
  return {
    tryLogin: () => dispatch({
      type: userAction.USER_TRY_LOGIN,
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logging);

