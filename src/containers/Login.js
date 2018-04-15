import { connect } from 'react-redux';
import { creators } from '../sagas/SessionSaga';
import LoggingPage from '../components/public/LoggingPage';

const mapStateToProps = state => ({
  loginLoading: state.user.loading,
  loginFailed: state.user.errored,
  metamask: state.metamask.present,
  account: state.metamask.account,
});

function mapDispatchToProps(dispatch) {
  return {
    performLogin: () => dispatch(creators.loginAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggingPage);
