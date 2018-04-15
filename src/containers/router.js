import { connect } from 'react-redux';
import router from '../components/Router';

const mapStateToProps = state => ({
  userType: state.user.role,
});

export default connect(mapStateToProps)(router);
