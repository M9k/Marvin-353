import { connect } from 'react-redux';
import LoginButton from './view';
import { loginUser } from './action';

//magic function?
const mapStateToProps = (state, ownProps) => ({});


// dispatch action on click react to event LoginUser redux
const mapDispatchToProps = dispatch => ({
  onLoginUserClick: (event) => {
    event.preventDefault();
    console.log('clicked');
    dispatch(loginUser());
  },
});

// connection beetween react and redux
const container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginButton);

export default container;
