import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// TODO: capire il modo migliore di fare gli import per favorire i test - con mapDispatchToProps?
import { store } from '../../store';
import { userAction } from '../../reducers/user';

class Logging extends React.Component {
  componentDidMount() {
    store.dispatch({ type: userAction.USER_TRY_LOGIN });
  }

  render() {
    if (this.props.isGoing) {
      return (
        <div>
          Please wait for the blockchain...
        </div>
      );
    } else if (!this.props.isLogged) {
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
};

Logging.defaultProps = {
  isGoing: false,
  isLogged: false,
};

const mapStateToProps = state => ({
  isGoing: state.user.trylogin,
  isLogged: state.user.logged,
});

/*
const mapDispatchToProps = (dispatch) => {
  return {
    tryLogin: () => dispatch({
      type: userAction.USER_LOGGED_IN,
    }),
  };
};
*/

// , mapDispatchToProps se mi serve onclick
export default connect(mapStateToProps)(Logging);

