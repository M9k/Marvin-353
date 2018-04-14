import { connect } from 'react-redux';
import router from '../components/Router';
import { isLogged } from '../ducks/Session';

const mapStateToProps = state => ({
  userType: state.user.role,
  isLogged: isLogged(state),
});

export default connect(mapStateToProps)(router);
