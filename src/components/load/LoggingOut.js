import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userAction } from '../../reducers/user';
import RedirectToHome from './RedirectToHome';

class LoggingOut extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.logOut();
  }
  render() {
    return (
      <div>
      <h3>Logging out...</h3>
      <RedirectToHome time={2000}/>
      </div>
    )
  }
}

LoggingOut.propTypes = {
  isLogged: PropTypes.bool,
  logOut: PropTypes.func,
};

LoggingOut.defaultProps = {
  isLogged: true,
  logOut: null
};

const mapStateToProps = state => ({
  isLogged: state.user.logged
});

function mapDispatchToProps(dispatch) {
  return {
    logOut: () => dispatch({
      type: userAction.USER_LOGGED_OUT,
    }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoggingOut);
