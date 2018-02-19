import { connect } from 'react-redux';
import LoginButton from './view';
import { loginUser } from './action';

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({
  onLoginUserClick: (event) => {
    event.preventDefault();
    console.log('clicked');
    dispatch(loginUser());
  },
});

const container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginButton);

export default container;
